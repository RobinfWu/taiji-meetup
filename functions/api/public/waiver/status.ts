import { PAID_DROP_IN_RATES } from "../../../lib/publicBookingPricing";
import { allowRequest, hash } from "../../../lib/emailVerification";
import { getDb, type AppPagesFunction } from "../../../types/env";

export const onRequestPost: AppPagesFunction = async ctx => {
  const denied = allowRequest(ctx);
  if (denied) return denied;
  const { request, env } = ctx;
  const origin = request.headers.get("Origin");
  if (origin && origin !== new URL(request.url).origin) return Response.json({error:"Origin not allowed."},{status:403});
  let payload: unknown;
  try { const raw = await request.text(); if (raw.length > 2048) throw new Error(); payload = JSON.parse(raw); } catch { return Response.json({error:"Invalid request."},{status:400}); }
  if (!payload || typeof payload !== "object") return Response.json({error:"Invalid request."},{status:400});
  const { email, verification_token, session_id } = payload as Record<string,unknown>;
  if (session_id !== undefined && (typeof session_id !== "string" || !/^[a-zA-Z0-9_-]{1,100}$/.test(session_id))) return Response.json({error:"Invalid class session."},{status:400});
  if (typeof email !== "string" || typeof verification_token !== "string" || !/^[a-f0-9-]{72}$/.test(verification_token)) return Response.json({error:"Invalid verification."},{status:400});
  const tokenHash = await hash(verification_token);
  const db = getDb({env});
  const version = env.WAIVER_APPROVED_VERSION;
  if (!version) return Response.json({error:"Waiver is not approved for bookings."},{status:503});
  const valid = await db.prepare("SELECT 1 AS ok FROM email_verifications WHERE email=? COLLATE NOCASE AND token_hash=? AND verified_until>?").bind(email,tokenHash,new Date().toISOString()).first();
  if (!valid) return Response.json({error:"Verify your email again."},{status:403});
  const waiver = await db.prepare("SELECT title,body FROM waiver_versions WHERE version=?").bind(version).first<{title:string;body:string}>();
  if (!waiver) return Response.json({error:"Waiver configuration unavailable."},{status:503});
  const signed = await db.prepare("SELECT 1 AS ok FROM student_waivers w JOIN students s ON s.id=w.student_id WHERE s.email=? COLLATE NOCASE AND w.version=?").bind(email,version).first();
  // Match booking eligibility: any earlier reservation counts, even if cancelled.
  // This information is returned only after validating email ownership above.
  const prior = await db.prepare("SELECT 1 AS ok FROM reservations r JOIN students s ON s.id=r.student_id WHERE s.email=? COLLATE NOCASE LIMIT 1").bind(email).first();
  let amount = prior ? PAID_DROP_IN_RATES.regular : 0;
  if (typeof session_id === "string") {
    const session = await db.prepare(`SELECT s.price_cents FROM class_sessions s JOIN class_templates t ON t.id=s.template_id
      WHERE s.id=? AND s.is_public=1 AND s.status='scheduled' AND s.start_at>? AND t.is_active=1`).bind(session_id,new Date().toISOString()).first<{price_cents:number|null}>();
    if (!session) return Response.json({error:"This class is unavailable."},{status:409,headers:{"Cache-Control":"no-store"}});
    amount = session.price_cents ?? amount;
  }
  return Response.json({version,title:waiver.title,body:waiver.body,already_signed:!!signed,pricing:{first_reservation_free:!prior,amount_cents:amount,paid_rates:PAID_DROP_IN_RATES,currency:"CAD"}},{headers:{"Cache-Control":"no-store"}});
};
