-- Pending email challenges do not reserve seats or create students.
CREATE TABLE IF NOT EXISTS email_verifications (
 email TEXT PRIMARY KEY COLLATE NOCASE,
 code_hash TEXT NOT NULL,
 token_hash TEXT,
 expires_at TEXT NOT NULL,
 verified_until TEXT,
 attempts INTEGER NOT NULL DEFAULT 0,
 sent_count INTEGER NOT NULL DEFAULT 1,
 window_started_at TEXT NOT NULL,
 last_sent_at TEXT NOT NULL,
 created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_email_verifications_expiry ON email_verifications(expires_at);
