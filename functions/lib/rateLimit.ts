import type { D1Database, Request as WorkerRequest } from "@cloudflare/workers-types";

export interface RateLimitResult {
  allowed: boolean;
  retryAfter?: number;
  attempts?: number;
}

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000;

/** Never accept an untrusted, missing client IP on a deployed hostname. */
export async function deriveClientKey(request: Request | WorkerRequest, secret: string): Promise<string> {
  if (!secret || !secret.trim()) throw new Error("Rate-limit signing key is missing.");
  const url = new URL(request.url);
  const local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
  const cfIp = request.headers.get("CF-Connecting-IP")?.trim();
  if (!cfIp && !local) throw new Error("Trusted client IP is unavailable.");
  const rawIp = cfIp || "127.0.0.1";
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(`rate-limit:${rawIp}`));
  return Array.from(new Uint8Array(signature), b => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Atomically reserves a login attempt BEFORE password verification.
 * All attempts (successful or not) count. The fifth attempt is admitted and
 * locks the key for 15 minutes; further attempts are rejected. No success reset.
 * Millisecond epoch timestamps are stored as decimal text, compatible with the
 * existing TEXT schema and safe for SQLite CAST(... AS INTEGER).
 */
export async function reserveLoginAttempt(db: D1Database, clientKey: string): Promise<RateLimitResult> {
  if (!db) throw new Error("Rate limiting database is not configured.");
  const now = Date.now();
  const nowStr = String(now);
  // Cleanup is optional and must never weaken enforcement.
  try {
    await db.prepare("DELETE FROM admin_login_attempts WHERE CAST(updated_at AS INTEGER) > 1000000000000 AND CAST(updated_at AS INTEGER) < ?")
      .bind(now - 24 * 60 * 60 * 1000).run();
  } catch { /* best-effort cleanup */ }
  const sql = `
    INSERT INTO admin_login_attempts (key, attempts, window_start, blocked_until, updated_at)
    VALUES (?1, 1, ?2, NULL, ?2)
    ON CONFLICT(key) DO UPDATE SET
      attempts = CASE
        WHEN CAST(blocked_until AS INTEGER) > CAST(excluded.updated_at AS INTEGER) THEN 6
        WHEN CAST(blocked_until AS INTEGER) > 0 OR CAST(window_start AS INTEGER) + ${WINDOW_MS} <= CAST(excluded.updated_at AS INTEGER) THEN 1
        ELSE attempts + 1 END,
      window_start = CASE
        WHEN CAST(blocked_until AS INTEGER) > CAST(excluded.updated_at AS INTEGER) THEN window_start
        WHEN CAST(blocked_until AS INTEGER) > 0 OR CAST(window_start AS INTEGER) + ${WINDOW_MS} <= CAST(excluded.updated_at AS INTEGER) THEN excluded.updated_at
        ELSE window_start END,
      blocked_until = CASE
        WHEN CAST(blocked_until AS INTEGER) > CAST(excluded.updated_at AS INTEGER) THEN blocked_until
        WHEN CAST(blocked_until AS INTEGER) > 0 OR CAST(window_start AS INTEGER) + ${WINDOW_MS} <= CAST(excluded.updated_at AS INTEGER) THEN NULL
        WHEN attempts + 1 >= ${MAX_ATTEMPTS} THEN CAST(CAST(excluded.updated_at AS INTEGER) + ${LOCKOUT_MS} AS TEXT)
        ELSE NULL END,
      updated_at = excluded.updated_at
    RETURNING attempts, window_start, blocked_until`;
  const row = await db.prepare(sql).bind(clientKey, nowStr).first<{
    attempts: number; window_start: string; blocked_until: string | null;
  }>();
  if (!row) throw new Error("Failed to reserve login attempt.");
  const blockedUntil = row.blocked_until ? Number(row.blocked_until) : 0;
  // The fifth attempt is allowed; a sixth attempt sees the pre-existing lockout.
  // A request with attempts > MAX_ATTEMPTS is always rejected.
  if (blockedUntil > now && row.attempts > MAX_ATTEMPTS) {
    return { allowed: false, retryAfter: Math.max(1, Math.ceil((blockedUntil - now) / 1000)), attempts: row.attempts };
  }
  return { allowed: true, attempts: row.attempts };
}
