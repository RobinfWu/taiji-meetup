import type { AppPagesFunction } from "../../../types/env";
import { getDb } from "../../../types/env";
import { authenticateAdmin } from "../../../lib/auth";
import { confirmationText } from "../../../lib/bookingConfirmation";

const MAX_ATTEMPTS = 5;
const respond = (body: object, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

type Job = { id: string; reservation_id: string; recipient_email: string; attempts: number };
type Details = { first_name: string; session_title: string; start_at: string; end_at: string; location: string; amount_cents: number | null; method: string | null; reference: string | null };

// Manual admin-only processor. A scheduled Worker can invoke the same authenticated endpoint later.
export const onRequestPost: AppPagesFunction = async ctx => {
  const auth = await authenticateAdmin(ctx.request, ctx.env);
  if (!auth.authorized) return auth.response!;
  if (!ctx.env.RESEND_API_KEY || !ctx.env.BOOKING_FROM_EMAIL) return respond({ error: "Email delivery is not configured." }, 503);
  const db = getDb(ctx);
  const now = new Date();
  const nowIso = now.toISOString();
  // The claim is atomic: a concurrent request cannot claim the same unlocked row.
  const candidate = await db.prepare(`SELECT id, reservation_id, recipient_email, attempts FROM booking_emails
    WHERE attempts < ? AND next_attempt_at <= ?
      AND (status IN ('pending','failed') OR (status='sending' AND locked_until <= ?))
    ORDER BY next_attempt_at, created_at LIMIT 1`).bind(MAX_ATTEMPTS, nowIso, nowIso).first<Job>();
  if (!candidate) return respond({ processed: 0, message: "No eligible emails." });
  const lockUntil = new Date(now.getTime() + 120_000).toISOString();
  const claim = await db.prepare(`UPDATE booking_emails SET status='sending', locked_until=?, attempts=attempts+1, updated_at=?
    WHERE id=? AND attempts=? AND next_attempt_at<=?
      AND (status IN ('pending','failed') OR (status='sending' AND locked_until<=?))`)
    .bind(lockUntil, nowIso, candidate.id, candidate.attempts, nowIso, nowIso).run();
  if (claim.meta.changes !== 1) return respond({ processed: 0, message: "Another worker claimed this job." });

  const details = await db.prepare(`SELECT st.first_name, t.title AS session_title, s.start_at, s.end_at, s.location,
      p.amount_cents, p.method, p.reference
    FROM reservations r JOIN students st ON st.id=r.student_id
    JOIN class_sessions s ON s.id=r.session_id JOIN class_templates t ON t.id=s.template_id
    LEFT JOIN payments p ON p.target_type='reservation' AND p.target_id=r.id
    WHERE r.id=? AND r.status='confirmed'`).bind(candidate.reservation_id).first<Details>();
  if (!details) {
    await db.prepare(`UPDATE booking_emails SET status='failed', locked_until=NULL, next_attempt_at=?, last_error='Reservation not found or not confirmed', updated_at=? WHERE id=? AND status='sending' AND locked_until=?`)
      .bind(new Date(now.getTime() + 86400000).toISOString(), nowIso, candidate.id, lockUntil).run();
    return respond({ processed: 1, status: "failed", reason: "Reservation not found or not confirmed" });
  }
const receivingEmail = ctx.env.ETRANSFER_RECEIVING_EMAIL?.trim();

if (details.amount_cents !== null && details.method === "etransfer") {
  if (!receivingEmail) {
    const attempts = candidate.attempts + 1;
    const next = new Date(Date.now() + 60 * 60_000).toISOString();

    await db.prepare(`
      UPDATE booking_emails
      SET status='failed',
          locked_until=NULL,
          next_attempt_at=?,
          last_error=?,
          updated_at=?
      WHERE id=? AND status='sending' AND locked_until=?
    `).bind(
      next,
      "Interac receiving email is not configured",
      new Date().toISOString(),
      candidate.id,
      lockUntil
    ).run();

    console.error(
      "Booking email delivery blocked: Interac receiving email missing",
      candidate.id
    );

    return respond({
      processed: 1,
      status: "failed",
      attempts,
      retry_eligible: attempts < MAX_ATTEMPTS,
      reason: "Payment configuration missing"
    });
  }
}

const content = confirmationText(details, receivingEmail);
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ctx.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `booking-confirmation-${candidate.reservation_id}`,
      },
      body: JSON.stringify({ from: ctx.env.BOOKING_FROM_EMAIL, to: [candidate.recipient_email], ...content }),
    });
    if (!response.ok) throw new Error(`Resend HTTP ${response.status}`);
    const data: unknown = await response.json();
    const providerId = typeof data === 'object' && data !== null && 'id' in data && typeof data.id === 'string' ? data.id : null;
    await db.prepare(`UPDATE booking_emails SET status='sent', sent_at=?, provider_message_id=?, last_error=NULL,
      locked_until=NULL, updated_at=? WHERE id=? AND status='sending' AND locked_until=?`)
      .bind(new Date().toISOString(), providerId, new Date().toISOString(), candidate.id, lockUntil).run();
    return respond({ processed: 1, status: "sent", reservation_id: candidate.reservation_id });
  } catch (err) {
    const attempts = candidate.attempts + 1;
    const delayMinutes = Math.min(60, 2 ** attempts);
    const next = new Date(Date.now() + delayMinutes * 60_000).toISOString();
    const reason = err instanceof Error ? err.message.slice(0, 160) : 'Unknown delivery error';
    await db.prepare(`UPDATE booking_emails SET status='failed', locked_until=NULL, next_attempt_at=?, last_error=?, updated_at=?
      WHERE id=? AND status='sending' AND locked_until=?`)
      .bind(next, reason, new Date().toISOString(), candidate.id, lockUntil).run();
    console.error('Booking confirmation delivery failed', candidate.id, reason);
    return respond({ processed: 1, status: "failed", attempts, retry_eligible: attempts < MAX_ATTEMPTS });
  }
};
