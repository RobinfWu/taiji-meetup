-- Confirmed by instructor: same park/pavilion, capacity 12, normal pricing.
-- Preserve the November 21 event and all reservation/payment history.
CREATE TABLE IF NOT EXISTS _nov28_publish_guard (ok INTEGER NOT NULL CHECK(ok=1));
DELETE FROM _nov28_publish_guard;
INSERT INTO _nov28_publish_guard SELECT CASE WHEN
  (SELECT COUNT(*) FROM class_sessions WHERE date(start_at,'-5 hours')='2026-11-28')<=1
  AND NOT EXISTS(SELECT 1 FROM class_sessions WHERE id='sess-2026-11-28-saturday' AND date(start_at,'-5 hours')<>'2026-11-28')
THEN 1 ELSE 0 END;

INSERT INTO class_templates(id,title,description,weekday,start_time,end_time,timezone,location,capacity,is_active)
VALUES('tpl-park-2026-11-28','Chen Taijiquan with Robin Wu',
  'Outdoor Chen Taijiquan instruction. Beginners welcome; foundational movements, posture, weight shifting and leg mechanics, with optional partner practice.',
  6,'13:00','14:00','America/Toronto','Lake Ontario Park, 920 King St. W., Kingston, Ontario',12,1)
ON CONFLICT(id) DO UPDATE SET title=excluded.title,description=excluded.description,
  start_time=excluded.start_time,end_time=excluded.end_time,timezone=excluded.timezone,location=excluded.location,is_active=1;

UPDATE class_sessions SET template_id='tpl-park-2026-11-28',
  start_at='2026-11-28T18:00:00.000Z',end_at='2026-11-28T19:00:00.000Z',
  location='Lake Ontario Park, 920 King St. W., Kingston, Ontario',
  status='scheduled',cancellation_reason=NULL,is_public=1,price_cents=NULL,
  updated_at=strftime('%Y-%m-%dT%H:%M:%fZ','now')
WHERE date(start_at,'-5 hours')='2026-11-28';

INSERT INTO class_sessions(id,template_id,start_at,end_at,location,capacity,status,is_public,price_cents)
SELECT 'sess-2026-11-28-saturday','tpl-park-2026-11-28',
 '2026-11-28T18:00:00.000Z','2026-11-28T19:00:00.000Z',
 'Lake Ontario Park, 920 King St. W., Kingston, Ontario',12,'scheduled',1,NULL
WHERE NOT EXISTS(SELECT 1 FROM class_sessions WHERE date(start_at,'-5 hours')='2026-11-28');
DROP TABLE _nov28_publish_guard;
