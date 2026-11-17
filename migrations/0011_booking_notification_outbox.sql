-- Preserve existing jobs, including their IDs, delivery state and attempts.
-- Each reservation can now have one student confirmation AND one instructor job.
CREATE TABLE booking_emails_new (
  id TEXT PRIMARY KEY,
  reservation_id TEXT NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
  email_type TEXT NOT NULL DEFAULT 'booking_confirmation'
    CHECK (email_type IN ('booking_confirmation','instructor_notification')),
  recipient_email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','sending','sent','failed')),
  attempts INTEGER NOT NULL DEFAULT 0 CHECK (attempts >= 0),
  next_attempt_at TEXT NOT NULL,
  locked_until TEXT,
  provider_message_id TEXT,
  last_error TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  sent_at TEXT,
  UNIQUE(reservation_id,email_type)
);
INSERT INTO booking_emails_new
  (id,reservation_id,email_type,recipient_email,status,attempts,next_attempt_at,
   locked_until,provider_message_id,last_error,created_at,updated_at,sent_at)
SELECT id,reservation_id,email_type,recipient_email,status,attempts,next_attempt_at,
  locked_until,provider_message_id,last_error,created_at,updated_at,sent_at
FROM booking_emails;
DROP TABLE booking_emails;
ALTER TABLE booking_emails_new RENAME TO booking_emails;
CREATE INDEX idx_booking_emails_queue ON booking_emails(status,next_attempt_at);
