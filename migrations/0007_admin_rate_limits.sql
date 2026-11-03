-- Migration: 0007_admin_rate_limits.sql
-- Description: Rate limiting table for instructor login attempts across Cloudflare edge instances.
-- Stores HMAC-derived client identifiers instead of raw IP addresses for privacy.

CREATE TABLE IF NOT EXISTS admin_login_attempts (
    key TEXT PRIMARY KEY,
    attempts INTEGER NOT NULL DEFAULT 1,
    window_start TEXT NOT NULL,
    blocked_until TEXT,
    updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_admin_login_attempts_blocked_until 
    ON admin_login_attempts(blocked_until);

CREATE INDEX IF NOT EXISTS idx_admin_login_attempts_updated_at
    ON admin_login_attempts(updated_at);
