import type { AppPagesFunction } from "../../../types/env";
import { getDb } from "../../../types/env";
import { allowRequest, devMode, emailFromBody, hash, jsonError, parseBody } from "../../../lib/emailVerification";

const COOLDOWN_MS = 60_000;
const WINDOW_MS = 86_400_000;
const CODE_TTL_MS = 10 * 60_000;
const MAX_CODES_PER_WINDOW = 5;

export const onRequestPost: AppPagesFunction = async ctx => {
  const denied = allowRequest(ctx);
  if (denied) return denied;

  const body = await parseBody(ctx.request);
  if (!body || Object.keys(body).some(k => k !== "email")) return jsonError("Invalid request.", 400);
  const email = emailFromBody(body);
  if ("error" in email) return jsonError(email.error.message, 400);

  const db = getDb(ctx);
  const now = new Date();
  const iso = now.toISOString();
  const cooldownBoundary = new Date(now.getTime() - COOLDOWN_MS).toISOString();
  const windowBoundary = new Date(now.getTime() - WINDOW_MS).toISOString();
  const code = String(crypto.getRandomValues(new Uint32Array(1))[0] % 1_000_000).padStart(6, "0");
  const codeHash = await hash(`${email.value}:${code}`);
  const expires = new Date(now.getTime() + CODE_TTL_MS).toISOString();

  // Atomic claim: the INSERT or conditional UPDATE happens as one D1 statement.
  // A competing request cannot pass a stale read of the cooldown or quota.
  // Failed deliveries deliberately retain their claimed slot to avoid mail-provider retry storms.
  const claim = await db.prepare(`
    INSERT INTO email_verifications
      (email, code_hash, token_hash, expires_at, verified_until, attempts,
       sent_count, window_started_at, last_sent_at, created_at)
    VALUES (?, ?, NULL, ?, NULL, 0, 1, ?, ?, ?)
    ON CONFLICT(email) DO UPDATE SET
      code_hash = excluded.code_hash,
      token_hash = NULL,
      expires_at = excluded.expires_at,
      verified_until = NULL,
      attempts = 0,
      sent_count = CASE
        WHEN email_verifications.window_started_at > ? THEN email_verifications.sent_count + 1
        ELSE 1
      END,
      window_started_at = CASE
        WHEN email_verifications.window_started_at > ? THEN email_verifications.window_started_at
        ELSE excluded.window_started_at
      END,
      last_sent_at = excluded.last_sent_at
    WHERE email_verifications.last_sent_at <= ?
      AND (email_verifications.window_started_at <= ? OR email_verifications.sent_count < ?)
  `).bind(
    email.value, codeHash, expires, iso, iso, iso,
    windowBoundary, windowBoundary, cooldownBoundary, windowBoundary, MAX_CODES_PER_WINDOW
  ).run();

  if (claim.meta.changes !== 1) {
    // This read is for choosing the message only, not for enforcing the limit.
    const existing = await db.prepare(
      "SELECT last_sent_at, sent_count, window_started_at FROM email_verifications WHERE email=?"
    ).bind(email.value).first<{ last_sent_at: string; sent_count: number; window_started_at: string }>();
    if (existing && now.getTime() - Date.parse(existing.last_sent_at) < COOLDOWN_MS) {
      return jsonError("Please wait a minute before requesting another code.", 429);
    }
    return jsonError("Too many codes requested for this address. Try again tomorrow.", 429);
  }

  if (!devMode(ctx)) {
    if (!ctx.env.RESEND_API_KEY || !ctx.env.BOOKING_FROM_EMAIL) {
      return jsonError("Email delivery is not configured.", 503);
    }
    try {
      const send = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ctx.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: ctx.env.BOOKING_FROM_EMAIL,
          to: [email.value],
          subject: "Your Taijiquan booking verification code",
          text: `Your verification code is ${code}. It expires in 10 minutes. If you did not request this, ignore this message.`,
        }),
      });
      if (!send.ok) {
        console.error("Verification email provider error", send.status);
        return jsonError("Unable to send the verification email. Please try again later.", 503);
      }
    } catch (error) {
      console.error("Verification email delivery failed", error);
      return jsonError("Unable to send the verification email. Please try again later.", 503);
    }
  }

  return Response.json(
    { message: "Verification code sent.", ...(devMode(ctx) ? { dev_code: code } : {}) },
    { headers: { "Cache-Control": "no-store" } }
  );
};
