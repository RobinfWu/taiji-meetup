-- =============================================================================
-- Migration: 0002_reservations.sql
-- Description: Students, memberships, and reservations schema for Taiji Lab
--
-- Timezone & Timestamp Convention:
-- 1. All `created_at`, `updated_at`, and `cancelled_at` timestamps are stored
--    in UTC ISO 8601 format (YYYY-MM-DDTHH:MM:SS.SSSZ).
-- 2. `start_date` and `end_date` in memberships are stored in ISO 8601 date
--    format (YYYY-MM-DD).
-- 3. Reservations are the authoritative mechanism for occupying capacity;
--    memberships grant entitlement to book but do not occupy a seat without
--    an explicit confirmed reservation.
-- 4. A partial unique index prevents duplicate active ('confirmed') reservations
--    for the same student and session, while allowing re-booking if a prior
--    reservation was cancelled.
-- =============================================================================

-- 1. Students table
CREATE TABLE IF NOT EXISTS students (
    id TEXT PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL COLLATE NOCASE,
    phone TEXT,
    notes TEXT,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_students_email ON students(email COLLATE NOCASE);
CREATE INDEX IF NOT EXISTS idx_students_created_at ON students(created_at);

-- 2. Memberships table
CREATE TABLE IF NOT EXISTS memberships (
    id TEXT PRIMARY KEY,
    student_id TEXT NOT NULL REFERENCES students(id) ON DELETE RESTRICT,
    template_id TEXT NOT NULL REFERENCES class_templates(id) ON DELETE RESTRICT,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'cancelled', 'expired')),
    start_date TEXT NOT NULL,
    end_date TEXT,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    CHECK (end_date IS NULL OR end_date >= start_date)
);

CREATE INDEX IF NOT EXISTS idx_memberships_student_id ON memberships(student_id);
CREATE INDEX IF NOT EXISTS idx_memberships_template_id ON memberships(template_id);
CREATE INDEX IF NOT EXISTS idx_memberships_status ON memberships(status);
CREATE INDEX IF NOT EXISTS idx_memberships_student_template_status ON memberships(student_id, template_id, status);

-- 3. Reservations table
CREATE TABLE IF NOT EXISTS reservations (
    id TEXT PRIMARY KEY,
    student_id TEXT NOT NULL REFERENCES students(id) ON DELETE RESTRICT,
    session_id TEXT NOT NULL REFERENCES class_sessions(id) ON DELETE RESTRICT,
    source TEXT NOT NULL CHECK (source IN ('membership', 'drop_in')),
    status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled')),
    membership_id TEXT REFERENCES memberships(id) ON DELETE SET NULL,
    cancellation_reason TEXT,
    cancelled_at TEXT,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- Partial unique index: prevents duplicate active ('confirmed') reservations
-- for the same student in the same session. Cancelled reservations are excluded,
-- permitting a student to re-reserve if their previous booking was cancelled.
CREATE UNIQUE INDEX IF NOT EXISTS idx_reservations_active_student_session 
    ON reservations(student_id, session_id) 
    WHERE status = 'confirmed';

-- Query indexes
CREATE INDEX IF NOT EXISTS idx_reservations_session_status ON reservations(session_id, status);
CREATE INDEX IF NOT EXISTS idx_reservations_student_id ON reservations(student_id);
CREATE INDEX IF NOT EXISTS idx_reservations_membership_id ON reservations(membership_id);
