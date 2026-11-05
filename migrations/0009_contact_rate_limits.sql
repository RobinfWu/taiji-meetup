-- Per-visitor hourly contact-form throttling. No raw IP addresses are stored.
CREATE TABLE IF NOT EXISTS contact_rate_limits (
  visitor_hash TEXT NOT NULL,
  hour_bucket INTEGER NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (visitor_hash, hour_bucket)
);
