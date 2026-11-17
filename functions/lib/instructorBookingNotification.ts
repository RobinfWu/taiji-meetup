import type { D1Database } from "@cloudflare/workers-types";
import { validateEmail } from "./validation";

// Append to the same batch as the confirmed reservation INSERT. A random new
// reservation ID plus the outbox's per-type uniqueness prevents retry duplicates.
export function instructorBookingJob(db: D1Database, reservationId: string, now: string, configuredEmail?: string) {
  const email = validateEmail(configuredEmail);
  const recipient = "error" in email ? null : email.value;
  return db.prepare(`INSERT INTO booking_emails
    (id,reservation_id,email_type,recipient_email,status,attempts,next_attempt_at,created_at,updated_at)
    SELECT ?,r.id,'instructor_notification',?,'pending',0,?,?,?
    FROM reservations r WHERE r.id=? AND r.status='confirmed' AND ? IS NOT NULL
    ON CONFLICT(reservation_id,email_type) DO NOTHING`)
    .bind(`bem_${crypto.randomUUID()}`,recipient,now,now,now,reservationId,recipient);
}

export function instructorNotificationText(info: {
  first_name: string; last_name: string; session_title: string; start_at: string; end_at: string; location: string;
}) {
  const clean = (value: string) => value.replace(/[\r\n]+/g, " ").trim();
  const name = clean(`${info.first_name} ${info.last_name}`);
  const date = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto", weekday: "long", month: "long", day: "numeric", year: "numeric",
    hour: "numeric", minute: "2-digit", timeZoneName: "short",
  }).format(new Date(info.start_at));
  const end = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto", hour: "numeric", minute: "2-digit", timeZoneName: "short",
  }).format(new Date(info.end_at));
  return {
    subject: `New booking: ${name} — ${date}`,
    text: `${name} has a confirmed reservation.\n\nClass: ${info.session_title}\nWhen: ${date} – ${end} (Kingston local time)\nLocation: ${info.location}\n\nView the class roster in the instructor dashboard.`,
  };
}
