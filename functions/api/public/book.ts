import { hash } from "../../lib/emailVerification";
import type { AppPagesFunction } from "../../types/env";
import { getDb } from "../../types/env";
import { validateName, validateEmail, validatePhone, STUDENT_LIMITS } from "../../lib/validation";

// Public, drop-in-only MVP. Membership bookings are deliberately not accepted.
const reply = (message: string, status: number) => Response.json({ error: message }, { status, headers: { "Cache-Control": "no-store" } });
const isObject = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);

export const onRequestPost: AppPagesFunction = async (ctx) => {
  // Explicit kill switch: do not enable public booking before reviewing the
  // payment instructions, pricing, and anti-abuse controls.
  if (ctx.env.PUBLIC_BOOKING_ENABLED !== "true") return reply("Online booking is not available yet.", 503);
  const origin = ctx.request.headers.get("Origin");
  const requestOrigin = new URL(ctx.request.url).origin;
  if (origin && origin !== requestOrigin && origin !== "http://localhost:8788") return reply("Origin not allowed.", 403);
  const len = Number(ctx.request.headers.get("content-length") || "0");
  if (len > 4096) return reply("Request too large.", 413);
  let body: unknown;
  try { const raw = await ctx.request.text(); if (raw.length > 4096) return reply("Request too large.", 413); body = JSON.parse(raw); }
  catch { return reply("Invalid JSON.", 400); }
  if (!isObject(body)) return reply("Expected a JSON object.", 400);
  const allowed = ["first_name", "last_name", "email", "phone", "session_id", "method", "pricing_category", "website", "verification_token"];
  if (Object.keys(body).some(k => !allowed.includes(k))) return reply("Unknown request field.", 400);
  // Honeypot for basic bot filtering; use Turnstile / Cloudflare rate limiting before launch.
  if (body.website) return reply("Unable to process booking.", 400);
  const first = validateName(body.first_name, "first_name", STUDENT_LIMITS.FIRST_NAME_MAX);
  const last = validateName(body.last_name, "last_name", STUDENT_LIMITS.LAST_NAME_MAX);
  const email = validateEmail(body.email);
  const phone = body.phone === undefined ? { value: null } : validatePhone(body.phone);
  if ("error" in first) return reply(first.error.message, 400);
  if ("error" in last) return reply(last.error.message, 400);
  if ("error" in email) return reply(email.error.message, 400);
  if ("error" in phone) return reply(phone.error.message, 400);
  if (typeof body.session_id !== "string" || !/^[a-zA-Z0-9_-]{1,100}$/.test(body.session_id)) return reply("Invalid class session.", 400);
  if (body.method !== "cash" && body.method !== "etransfer") return reply("Choose cash or e-Transfer.", 400);
  const category = body.pricing_category === undefined ? "regular" : body.pricing_category;
  if (category !== "regular" && category !== "senior" && category !== "student") return reply("Invalid pricing category.", 400);
  if (typeof body.verification_token !== "string" || !/^[a-f0-9-]{72}$/.test(body.verification_token)) return reply("Verify your email before booking.", 403);
  const tokenHash = await hash(body.verification_token);
  const db = getDb(ctx);
  const now = new Date().toISOString();
  const studentId = `stu_${crypto.randomUUID()}`;
  const reservationId = `res_${crypto.randomUUID()}`;
  const paymentId = `pay_${crypto.randomUUID()}`;
  const bookingEmailId = `bem_${crypto.randomUUID()}`;
  const reference = `TJ-${crypto.randomUUID().replace(/-/g, "").slice(0, 16).toUpperCase()}`;
  try {
    // This is only a user-friendly preflight. The INSERT below rechecks capacity.
    const session = await db.prepare(`SELECT s.id, s.status, s.end_at, s.start_at, s.capacity,
      (SELECT COUNT(*) FROM reservations r WHERE r.session_id=s.id AND r.status='confirmed') AS booked
      FROM class_sessions s JOIN class_templates t ON t.id=s.template_id
      WHERE s.id=? AND t.is_active=1`).bind(body.session_id).first<{id:string;status:string;end_at:string;start_at:string;capacity:number;booked:number}>();
    if (!session || session.status !== "scheduled" || session.end_at <= now) return reply("This class is unavailable.", 409);
    if (session.booked >= session.capacity) return reply("This class is full.", 409);

    // Never trust a price supplied by the browser. The first-ever reservation
    // (including a previously cancelled reservation) is free. Later bookings
    // use the self-declared category; no discounts stack.
    const paidAmountCents = category === "regular" ? 2000 : 1700;
    // D1 batch runs transactionally. The student insert is idempotent for
    // existing emails; existing personal data is not overwritten.
    const results = await db.batch([
      db.prepare(`INSERT INTO students(id,first_name,last_name,email,phone,notes,created_at,updated_at)
        SELECT ?,?,?,?,?,NULL,?,?
        WHERE EXISTS (
          SELECT 1 FROM email_verifications ev
          WHERE ev.email=? AND ev.token_hash=? AND ev.verified_until>?
        )
        ON CONFLICT(email) DO NOTHING`)
        .bind(studentId, first.value, last.value, email.value, phone.value, now, now,
          email.value, tokenHash, now),
      db.prepare(`INSERT INTO reservations(id,student_id,session_id,source,status,membership_id,cancellation_reason,cancelled_at,created_at,updated_at)
        SELECT ?, st.id, s.id, 'drop_in', 'confirmed', NULL,NULL,NULL,?,?
        FROM students st JOIN class_sessions s ON s.id=?
        JOIN class_templates t ON t.id=s.template_id
        WHERE st.email=? COLLATE NOCASE AND s.status='scheduled' AND s.end_at>? AND t.is_active=1
          AND (SELECT COUNT(*) FROM reservations r WHERE r.session_id=s.id AND r.status='confirmed') < s.capacity
          AND EXISTS (SELECT 1 FROM email_verifications ev WHERE ev.email=st.email AND ev.token_hash=? AND ev.verified_until>?)`)
        .bind(reservationId,now,now,body.session_id,email.value,now,tokenHash,now),
      // Only insert a payment if this student has at least one OTHER reservation.
      // The newly inserted reservation is excluded. This SQL runs within the
      // same D1 transaction as reservation creation, avoiding a preflight race.
      db.prepare(`INSERT INTO payments(id,student_id,target_type,target_id,method,amount_cents,reference,created_at,updated_at)
        SELECT ?,r.student_id,'reservation',r.id,?,?,?, ?,?
        FROM reservations r
        WHERE r.id=? AND EXISTS (
          SELECT 1 FROM reservations prior
          WHERE prior.student_id=r.student_id AND prior.id<>r.id
        )`)
        .bind(paymentId,body.method,paidAmountCents,reference,now,now,reservationId),
      db.prepare("UPDATE email_verifications SET token_hash=NULL, verified_until=NULL WHERE email=? AND token_hash=? AND verified_until>? AND EXISTS (SELECT 1 FROM reservations WHERE id=?)").bind(email.value,tokenHash,now,reservationId),
      // Queue the confirmation in the same transaction as the reservation.
      // A delivery failure later will not roll back the booking.
      db.prepare(`INSERT INTO booking_emails
        (id,reservation_id,email_type,recipient_email,status,attempts,next_attempt_at,created_at,updated_at)
        SELECT ?,r.id,'booking_confirmation',?,'pending',0,?,?,?
        FROM reservations r WHERE r.id=?`)
        .bind(bookingEmailId,email.value,now,now,now,reservationId),
    ]);
    if (results[1].meta.changes !== 1 || results[3].meta.changes !== 1 || results[4].meta.changes !== 1) {
      // Rare race: no reservation/payment. A new student may have been created;
      // this does not occupy a seat or charge money.
      return reply("Booking could not be completed. Check your verification code and class availability, then try again.", 409);
    }
    const isPaidBooking = results[2].meta.changes === 1;
    return Response.json({
      reservation_id: reservationId,
      session_id: body.session_id,
      status: "confirmed",
      pricing: {
        category,
        first_reservation_free: !isPaidBooking,
        amount_cents: isPaidBooking ? paidAmountCents : 0,
        currency: "CAD",
      },
      payment: isPaidBooking
        ? { method: body.method, status: "unpaid", amount_cents: paidAmountCents, currency: "CAD", reference }
        : null,
    }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    const msg = String(err);
    if (msg.includes("UNIQUE constraint failed") || msg.includes("SQLITE_CONSTRAINT_UNIQUE"))
      return reply("A booking or payment already exists for this class and email address.", 409);
    console.error("Public booking failed", err);
    return reply("Unable to complete the booking. Please try again later.", 500);
  }
};
