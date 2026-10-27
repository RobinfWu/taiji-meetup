import type { Request as WorkerRequest } from "@cloudflare/workers-types";
import type { Env } from "../types/env";

/**
 * Timing-safe string comparison to mitigate timing attacks.
 *
 * To avoid leaking token length via execution time on length mismatch,
 * both inputs are hashed with SHA-256 into fixed 32-byte digests before
 * comparing in constant time.
 */
export async function timingSafeCompare(a: string, b: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const aBuf = encoder.encode(a);
  const bBuf = encoder.encode(b);

  // SHA-256 normalizes both inputs to fixed 32-byte buffers,
  // preventing length leakage through early-exit or variable-length buffers.
  const [aHash, bHash] = await Promise.all([
    crypto.subtle.digest("SHA-256", aBuf),
    crypto.subtle.digest("SHA-256", bBuf),
  ]);

  const subtle = crypto.subtle as unknown as {
    timingSafeEqual?: (a: ArrayBufferView | ArrayBuffer, b: ArrayBufferView | ArrayBuffer) => boolean;
  };

  if (typeof subtle?.timingSafeEqual === "function") {
    return subtle.timingSafeEqual(new Uint8Array(aHash), new Uint8Array(bHash));
  }

  // Constant-time XOR fallback across fixed 32-byte digests
  const aArr = new Uint8Array(aHash);
  const bArr = new Uint8Array(bHash);
  let mismatch = 0;
  for (let i = 0; i < 32; i++) {
    mismatch |= aArr[i] ^ bArr[i];
  }
  return mismatch === 0;
}

/**
 * Validates the Instructor/Admin Bearer token against ADMIN_API_TOKEN.
 *
 * Security guarantees:
 * 1. Fails closed (401) if ADMIN_API_TOKEN is missing, undefined, empty, whitespace-only, or not a string.
 * 2. Uses SHA-256 normalized constant-time comparison to prevent timing attacks.
 * 3. Never leaks token values in headers, logs, or response bodies.
 */
export async function authenticateAdmin(
  request: Request | WorkerRequest,
  env: Env
): Promise<{ authorized: boolean; response?: Response }> {
  const rawToken = env.ADMIN_API_TOKEN;

  // Fail closed if ADMIN_API_TOKEN is missing, non-string, or empty/whitespace
  if (typeof rawToken !== "string" || rawToken.trim().length === 0) {
    return {
      authorized: false,
      response: Response.json(
        { error: "Unauthorized: Server authentication is not configured." },
        { status: 401, headers: { "Content-Type": "application/json" } }
      ),
    };
  }

  const adminToken = rawToken.trim();

  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      authorized: false,
      response: Response.json(
        { error: "Unauthorized: Missing or malformed Authorization header." },
        { status: 401, headers: { "Content-Type": "application/json" } }
      ),
    };
  }

  const providedToken = authHeader.slice(7).trim();
  if (providedToken.length === 0) {
    return {
      authorized: false,
      response: Response.json(
        { error: "Unauthorized: Missing token in Authorization header." },
        { status: 401, headers: { "Content-Type": "application/json" } }
      ),
    };
  }

  const isMatch = await timingSafeCompare(providedToken, adminToken);
  if (!isMatch) {
    return {
      authorized: false,
      response: Response.json(
        { error: "Unauthorized: Invalid credentials." },
        { status: 401, headers: { "Content-Type": "application/json" } }
      ),
    };
  }

  return { authorized: true };
}
