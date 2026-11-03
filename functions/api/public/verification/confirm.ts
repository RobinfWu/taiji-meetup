import type { AppPagesFunction } from "../../../types/env";
import { getDb } from "../../../types/env";
import { allowRequest, emailFromBody, hash, jsonError, parseBody } from "../../../lib/emailVerification";

export const onRequestPost: AppPagesFunction = async ctx => {
  const denied = allowRequest(ctx); if (denied) return denied;
  const body = await parseBody(ctx.request);
  if (!body || Object.keys(body).some(k => !["email", "code"].includes(k))) return jsonError("Invalid request.",400);
  const email = emailFromBody(body); if ("error" in email) return jsonError(email.error.message,400);
  if (typeof body.code !== "string" || !/^\d{6}$/.test(body.code)) return jsonError("Enter the six-digit code.",400);
  const db = getDb(ctx); const now = new Date().toISOString(); const codeHash = await hash(`${email.value}:${body.code}`);
  const token = crypto.randomUUID()+crypto.randomUUID(); const tokenHash = await hash(token);
  const result = await db.prepare(`UPDATE email_verifications SET token_hash=?, verified_until=?, attempts=attempts+1
    WHERE email=? AND code_hash=? AND expires_at>? AND verified_until IS NULL AND attempts<5`).bind(tokenHash,new Date(Date.now()+15*60_000).toISOString(),email.value,codeHash,now).run();
  if (result.meta.changes !== 1) {
    await db.prepare("UPDATE email_verifications SET attempts=attempts+1 WHERE email=? AND expires_at>? AND verified_until IS NULL AND attempts<5").bind(email.value,now).run();
    return jsonError("Invalid or expired code. Request a new code if necessary.",400);
  }
  return Response.json({ verification_token: token }, { headers: { "Cache-Control": "no-store" } });
};
