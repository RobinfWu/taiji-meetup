-- =============================================================================
-- Migration: 0001_initial_schema.sql
-- Description: Initial schema for Chen Taijiquan class scheduling
--
-- Timezone & Timestamp Convention:
-- 1. All `created_at` and `updated_at` columns store UTC timestamps in ISO 8601
--    format (YYYY-MM-DDTHH:MM:SS.SSSZ).
-- 2. `class_sessions.start_at` and `class_sessions.end_at` store unambiguous
--    UTC ISO 8601 timestamps (YYYY-MM-DDTHH:MM:SS.SSSZ).
-- 3. `class_templates` stores recurring schedule rules with local wall-clock
--    times (`start_time`, `end_time` in 24-hr 'HH:MM') and the IANA `timezone`
--    identifier (e.g. 'America/Toronto'). When recurring sessions are generated,
--    wall-clock times are converted to UTC based on that date's daylight saving
--    offset.
-- 4. `weekday` is an integer: 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday,
--    4 = Thursday, 5 = Friday, 6 = Saturday (matching standard JavaScript
--    Date.prototype.getDay()).
-- =============================================================================

-- Recurring class templates
CREATE TABLE IF NOT EXISTS class_templates (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    weekday INTEGER NOT NULL CHECK (weekday BETWEEN 0 AND 6),
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    timezone TEXT NOT NULL DEFAULT 'America/Toronto',
    location TEXT NOT NULL,
    capacity INTEGER NOT NULL CHECK (capacity > 0),
    is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1)),
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- Scheduled class sessions (instances)
CREATE TABLE IF NOT EXISTS class_sessions (
    id TEXT PRIMARY KEY,
    template_id TEXT NOT NULL REFERENCES class_templates(id) ON DELETE RESTRICT,
    start_at TEXT NOT NULL,
    end_at TEXT NOT NULL,
    location TEXT NOT NULL,
    capacity INTEGER NOT NULL CHECK (capacity > 0),
    status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'cancelled', 'completed')),
    cancellation_reason TEXT,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- Indexes for performance and query optimization
CREATE INDEX IF NOT EXISTS idx_class_sessions_start_at ON class_sessions(start_at);
CREATE INDEX IF NOT EXISTS idx_class_sessions_template_id ON class_sessions(template_id);
CREATE INDEX IF NOT EXISTS idx_class_sessions_status_start_at ON class_sessions(status, start_at);
