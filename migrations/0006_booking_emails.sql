
-- 0006_booking_emails.sql
-- Durable outbox for booking confirmation emails.

CREATE TABLE IF NOT EXISTS booking_emails (
    id TEXT PRIMARY KEY,

    reservation_id TEXT NOT NULL UNIQUE
        REFERENCES reservations(id)
        ON DELETE CASCADE,

    email_type TEXT NOT NULL DEFAULT 'booking_confirmation'
        CHECK (email_type = 'booking_confirmation'),

    recipient_email TEXT NOT NULL,

    status TEXT NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'sending', 'sent', 'failed')),

    attempts INTEGER NOT NULL DEFAULT 0
        CHECK (attempts >= 0),

    next_attempt_at TEXT NOT NULL,

    locked_until TEXT,

    provider_message_id TEXT,

    last_error TEXT,

    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    sent_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_booking_emails_queue
ON booking_emails(status, next_attempt_at);
