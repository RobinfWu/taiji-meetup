import { PAID_DROP_IN_RATES } from "../../lib/publicBookingPricing";
import { allowRequest, hash } from "../../lib/emailVerification";
import type { AppPagesFunction } from "../../types/env";
import { getDb } from "../../types/env";
import { validateName, validateEmail, validatePhone, STUDENT_LIMITS } from "../../lib/validation";

// Public, drop-in-only MVP. Membership bookings are deliberately not accepted.
const reply = (message: string, status: number) => Response.json({ error: message }, { status, headers: { "Cache-Control": "no-store" } });
const isObject = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);

export const onRequestPost: AppPagesFunction = async (ctx) => {
  const denied = allowRequest(ctx);
  if (denied) return denied;
  const origin = ctx.request.headers.get("Origin");
  const requestOrigin = new URL(ctx.request.url).origin;
  if (origin && origin !== requestOrigin && origin !== "http://localhost:8788") return reply("Origin not allowed.", 403);
  const len = Number(ctx.request.headers.get("content-length") || "0");
  if (len > 4096) return reply("Request too large.", 413);
  let body: unknown;
  try { const raw = await ctx.request.text(); if (raw.length > 4096) return reply("Request too large.", 413); body = JSON.parse(raw); }
  catch { return reply("Invalid JSON.", 400); }
  if (!isObject(body)) return reply("Expected a JSON object.", 400);
  const allowed = ["first_name", "last_name", "email", "phone", "session_id", "method", "pricing_category", "website", "verification_token", "waiver_version", "waiver_signed_name", "waiver_accepted", "waiver_adult_confirmed", "expected_amount_cents"];
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
  if (body.expected_amount_cents !== undefined && (typeof body.expected_amount_cents !== "number" || !Number.isSafeInteger(body.expected_amount_cents) || body.expected_amount_cents < 0)) return reply("Invalid expected amount.", 400);
  if (typeof body.verification_token !== "string" || !/^[a-f0-9-]{72}$/.test(body.verification_token)) return reply("Verify your email before booking.", 403);
  const waiverVersion = ctx.env.WAIVER_APPROVED_VERSION;
  if (!waiverVersion) return reply("Waiver is not approved for bookings.", 503);
  if (body.waiver_version !== waiverVersion) return reply("Please review the current waiver.", 409);
  const signedName = typeof body.waiver_signed_name === "string" ? body.waiver_signed_name.trim() : "";
  if (signedName && (signedName.length > 201 || signedName !== `${first.value} ${last.value}`)) return reply("Signature must match your full name.", 400);
  if (body.waiver_accepted !== undefined && body.waiver_accepted !== true) return reply("Invalid waiver acknowledgment.", 400);
  if (body.waiver_adult_confirmed !== undefined && body.waiver_adult_confirmed !== true) return reply("Invalid age confirmation.", 400);
  const tokenHash = await hash(body.verification_token);
  const db = getDb(ctx);
  const now = new Date().toISOString();
  const studentId = `stu_${crypto.randomUUID()}`;
  const reservationId = `res_${crypto.randomUUID()}`;
  const paymentId = `pay_${crypto.randomUUID()}`;
  const waiverId = `wav_${crypto.randomUUID()}`;
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

    const versionExists = await db.prepare("SELECT 1 AS ok FROM waiver_versions WHERE version=?").bind(waiverVersion).first();
    if (!versionExists) return reply("Waiver configuration unavailable.", 503);
    // Never trust a price supplied by the browser. The first-ever reservation
    // (including a previously cancelled reservation) is free. Later bookings
    // use the self-declared category; no discounts stack.
    const paidAmountCents = PAID_DROP_IN_RATES[category];
    // D1 batch runs transactionally. The student insert is idempotent for
    // existing emails; existing personal data is not overwritten.
    const results = await db.batch([
      db.prepare(`INSERT INTO students(id,first_name,last_name,email,phone,notes,created_at,updated_at)
        SELECT ?,?,?,?,?,NULL,?,?
        WHERE EXISTS (
          SELECT 1 FROM email_verifications ev
          WHERE ev.email=? AND ev.token_hash=? AND ev.verified_until>?
        ) AND (
          EXISTS (SELECT 1 FROM students st JOIN student_waivers w ON w.student_id=st.id
                  WHERE st.email=? COLLATE NOCASE AND w.version=?)
          OR (?=1 AND ?=1 AND ?<>'')
        )
        ON CONFLICT(email) DO NOTHING`)
        .bind(studentId, first.value, last.value, email.value, phone.value, now, now,
          email.value, tokenHash, now, email.value, waiverVersion,
          body.waiver_accepted === true ? 1 : 0, body.waiver_adult_confirmed === true ? 1 : 0, signedName),
      // For a first signature, insert the immutable waiver record in the same
      // transaction as the booking. Existing signed students do not sign again.
      db.prepare(`INSERT INTO student_waivers(id,student_id,version,signed_name,signed_at,verification_email,adult_confirmed,release_acknowledged)
        SELECT ?,st.id,?,?,?,?,1,1 FROM students st
        WHERE st.email=? COLLATE NOCASE AND ?=1 AND ?=1 AND ?<>''
          AND EXISTS (SELECT 1 FROM email_verifications ev WHERE ev.email=st.email AND ev.token_hash=? AND ev.verified_until>?)
          AND NOT EXISTS (SELECT 1 FROM student_waivers w WHERE w.student_id=st.id AND w.version=?)
        ON CONFLICT(student_id,version) DO NOTHING`)
        .bind(waiverId,waiverVersion,signedName,now,email.value,email.value,body.waiver_accepted === true ? 1 : 0,body.waiver_adult_confirmed === true ? 1 : 0,signedName,tokenHash,now,waiverVersion),
      // The optional displayed amount is a precondition, never the source of a charge.
      db.prepare(`INSERT INTO reservations(id,student_id,session_id,source,status,membership_id,cancellation_reason,cancelled_at,created_at,updated_at)
        SELECT ?, st.id, s.id, 'drop_in', 'confirmed', NULL,NULL,NULL,?,?
        FROM students st JOIN class_sessions s ON s.id=?
        JOIN class_templates t ON t.id=s.template_id
        WHERE st.email=? COLLATE NOCASE AND s.status='scheduled' AND s.end_at>? AND t.is_active=1
          AND (SELECT COUNT(*) FROM reservations r WHERE r.session_id=s.id AND r.status='confirmed') < s.capacity
          AND EXISTS (SELECT 1 FROM email_verifications ev WHERE ev.email=st.email AND ev.token_hash=? AND ev.verified_until>?)
          AND EXISTS (SELECT 1 FROM student_waivers w WHERE w.student_id=st.id AND w.version=?)
          AND (? IS NULL OR ? = CASE WHEN EXISTS (
            SELECT 1 FROM reservations prior WHERE prior.student_id=st.id
          ) THEN ? ELSE 0 END)`)
        .bind(reservationId,now,now,body.session_id,email.value,now,tokenHash,now,waiverVersion,body.expected_amount_cents ?? null,body.expected_amount_cents ?? null,paidAmountCents),
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
    if (results[2].meta.changes !== 1 || results[4].meta.changes !== 1 || results[5].meta.changes !== 1) {
      // Rare race: no reservation/payment. A new student may have been created;
      // this does not occupy a seat or charge money.
      return reply("Booking details changed. Review your verification, session availability, and price before confirming again.", 409);
    }
    const isPaidBooking = results[3].meta.changes === 1;
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
