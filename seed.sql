-- =============================================================================
-- Seed Data: seed.sql
-- Description: Sample recurring class template and upcoming sessions
-- Source reference: app/data/taijiData.ts (classes array)
--
-- Note on Capacity:
-- A capacity of 15 is used here as a documented development placeholder.
-- Replace with the authoritative venue capacity once finalized.
--
-- Idempotency:
-- All statements use `ON CONFLICT (id) DO NOTHING` to prevent duplicate records
-- if this seed file is executed multiple times.
-- =============================================================================

-- 1. Insert sample recurring Saturday class template
INSERT INTO class_templates (
    id,
    title,
    description,
    weekday,
    start_time,
    end_time,
    timezone,
    location,
    capacity,
    is_active,
    created_at,
    updated_at
) VALUES (
    'tpl-saturday-form-pushhands',
    'Taijiquan — Form (Yilu) & Push Hands (Tuishou)',
    'A single, comprehensive training session combining both form practice and Tuishou (Push Hands). Followed by optional open practice.',
    6, -- 6 = Saturday
    '10:30',
    '12:00',
    'America/Toronto',
    '1786 Bath Road Unit #13, Kingston, ON',
    10, -- Sample development capacity
    1,
    '2026-10-27T00:00:00.000Z',
    '2026-10-27T00:00:00.000Z'
)
ON CONFLICT (id) DO NOTHING;

-- 2. Insert sample upcoming sessions
-- Saturday, Oct 31, 2026 (10:30 AM - 12:00 PM EDT / UTC-4 -> 14:30 to 16:00 UTC)
INSERT INTO class_sessions (
    id,
    template_id,
    start_at,
    end_at,
    location,
    capacity,
    status,
    cancellation_reason,
    created_at,
    updated_at
) VALUES (
    'sess-2026-10-31-saturday',
    'tpl-saturday-form-pushhands',
    '2026-10-31T14:30:00.000Z',
    '2026-10-31T16:00:00.000Z',
    '1786 Bath Road Unit #13, Kingston, ON',
    10,
    'scheduled',
    NULL,
    '2026-10-27T00:00:00.000Z',
    '2026-10-27T00:00:00.000Z'
)
ON CONFLICT (id) DO NOTHING;

-- Saturday, Nov 7, 2026 (10:30 AM - 12:00 PM EST / UTC-5 -> 15:30 to 17:00 UTC)
INSERT INTO class_sessions (
    id,
    template_id,
    start_at,
    end_at,
    location,
    capacity,
    status,
    cancellation_reason,
    created_at,
    updated_at
) VALUES (
    'sess-2026-11-07-saturday',
    'tpl-saturday-form-pushhands',
    '2026-11-07T15:30:00.000Z',
    '2026-11-07T17:00:00.000Z',
    '1786 Bath Road Unit #13, Kingston, ON',
    10,
    'scheduled',
    NULL,
    '2026-10-27T00:00:00.000Z',
    '2026-10-27T00:00:00.000Z'
)
ON CONFLICT (id) DO NOTHING;

-- Saturday, Nov 14, 2026 (10:30 AM - 12:00 PM EST / UTC-5 -> 15:30 to 17:00 UTC)
INSERT INTO class_sessions (
    id,
    template_id,
    start_at,
    end_at,
    location,
    capacity,
    status,
    cancellation_reason,
    created_at,
    updated_at
) VALUES (
    'sess-2026-11-14-saturday',
    'tpl-saturday-form-pushhands',
    '2026-11-14T15:30:00.000Z',
    '2026-11-14T17:00:00.000Z',
    '1786 Bath Road Unit #13, Kingston, ON',
    10,
    'scheduled',
    NULL,
    '2026-10-27T00:00:00.000Z',
    '2026-10-27T00:00:00.000Z'
)
ON CONFLICT (id) DO NOTHING;

-- Saturday, Nov 21, 2026 (10:30 AM - 12:00 PM EST / UTC-5 -> 15:30 to 17:00 UTC)
INSERT INTO class_sessions (
    id,
    template_id,
    start_at,
    end_at,
    location,
    capacity,
    status,
    cancellation_reason,
    created_at,
    updated_at
) VALUES (
    'sess-2026-11-21-saturday',
    'tpl-saturday-form-pushhands',
    '2026-11-21T15:30:00.000Z',
    '2026-11-21T17:00:00.000Z',
    '1786 Bath Road Unit #13, Kingston, ON',
    10,
    'scheduled',
    NULL,
    '2026-10-27T00:00:00.000Z',
    '2026-10-27T00:00:00.000Z'
)
ON CONFLICT (id) DO NOTHING;
