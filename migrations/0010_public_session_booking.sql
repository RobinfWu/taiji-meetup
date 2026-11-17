-- Existing sessions stay private until explicitly reviewed and published.
ALTER TABLE class_sessions ADD COLUMN is_public INTEGER NOT NULL DEFAULT 0 CHECK (is_public IN (0, 1));
-- NULL retains existing first-visit/returning pricing. 0 explicitly makes a
-- session free for everyone. Paid event overrides are not introduced here.
ALTER TABLE class_sessions ADD COLUMN price_cents INTEGER CHECK (price_cents IS NULL OR price_cents = 0);
