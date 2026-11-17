-- Apply AFTER 0010_public_session_booking.sql, with public bookings disabled.
-- Review the runbook first. No reservations, students or payments are changed.
-- Guard against ambiguous dates and against inventing an unconfigured capacity.
CREATE TABLE IF NOT EXISTS _intro_publish_guard (ok INTEGER NOT NULL CHECK (ok=1));
DELETE FROM _intro_publish_guard;
INSERT INTO _intro_publish_guard(ok)
SELECT CASE WHEN
  (SELECT COUNT(*) FROM class_sessions WHERE date(start_at,'-5 hours')='2026-11-21') <= 1
  AND (
    EXISTS (SELECT 1 FROM class_sessions WHERE date(start_at,'-5 hours')='2026-11-21')
    OR EXISTS (SELECT 1 FROM class_templates WHERE id='tpl-saturday-form-pushhands')
  )
  AND NOT EXISTS (SELECT 1 FROM class_sessions WHERE id='sess-2026-11-21-saturday' AND date(start_at,'-5 hours')<>'2026-11-21')
THEN 1 ELSE 0 END;

-- A dedicated template changes only this event, not the recurring template.
INSERT INTO class_templates (id,title,description,weekday,start_time,end_time,timezone,location,capacity,is_active)
SELECT 'tpl-intro-2026-11-21','First Free Introductory Chen Taijiquan Class',
  'One-time outdoor introductory class with Robin Wu. Beginners welcome. Foundational movements, posture, weight shifting and leg mechanics; optional introductory Push Hands.',
  6,'11:00','12:30','America/Toronto','Lake Ontario Park, 920 King St. W., Kingston, Ontario',
  COALESCE((SELECT capacity FROM class_sessions WHERE date(start_at,'-5 hours')='2026-11-21'),
    (SELECT capacity FROM class_templates WHERE id='tpl-saturday-form-pushhands')),1
ON CONFLICT(id) DO UPDATE SET title=excluded.title,description=excluded.description,
  start_time=excluded.start_time,end_time=excluded.end_time,timezone=excluded.timezone,
  location=excluded.location,is_active=1;

-- Reuse the existing November 21 row, whatever its ID. Preserve capacity and all
-- references to its reservations. A missing row is created only once below.
UPDATE class_sessions SET template_id='tpl-intro-2026-11-21',
  start_at='2026-11-21T16:00:00.000Z',end_at='2026-11-21T17:30:00.000Z',
  location='Lake Ontario Park, 920 King St. W., Kingston, Ontario',
  status='scheduled',cancellation_reason=NULL,is_public=1,price_cents=0,
  updated_at=strftime('%Y-%m-%dT%H:%M:%fZ','now')
WHERE date(start_at,'-5 hours')='2026-11-21';

INSERT INTO class_sessions (id,template_id,start_at,end_at,location,capacity,status,is_public,price_cents)
SELECT 'sess-2026-11-21-saturday','tpl-intro-2026-11-21',
  '2026-11-21T16:00:00.000Z','2026-11-21T17:30:00.000Z',
  'Lake Ontario Park, 920 King St. W., Kingston, Ontario',capacity,'scheduled',1,0
FROM class_templates WHERE id='tpl-saturday-form-pushhands'
  AND NOT EXISTS (SELECT 1 FROM class_sessions WHERE date(start_at,'-5 hours')='2026-11-21');

DROP TABLE _intro_publish_guard;
