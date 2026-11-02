-- Phase 3C.1: manual payment tracking. Amounts are CAD cents.
-- Payment records do NOT change membership status or reserve seats.
CREATE TABLE payments (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL REFERENCES students(id) ON DELETE RESTRICT,
  target_type TEXT NOT NULL CHECK (target_type IN ('reservation', 'membership')),
  target_id TEXT NOT NULL,
  method TEXT NOT NULL CHECK (method IN ('cash', 'etransfer')),
  amount_cents INTEGER NOT NULL CHECK (typeof(amount_cents) = 'integer' AND amount_cents > 0 AND amount_cents <= 100000000),
  currency TEXT NOT NULL DEFAULT 'CAD' CHECK (currency = 'CAD'),
  status TEXT NOT NULL DEFAULT 'unpaid' CHECK (status IN ('unpaid', 'paid')),
  reference TEXT NOT NULL UNIQUE,
  received_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  CHECK ((status = 'unpaid' AND received_at IS NULL) OR (status = 'paid' AND received_at IS NOT NULL))
);
-- One payment record per target for this MVP. Renewal charges will need a
-- separate billing-period/invoice model before repeat payments can be recorded.
CREATE UNIQUE INDEX idx_payments_target ON payments(target_type, target_id);
CREATE INDEX idx_payments_student ON payments(student_id, created_at);
CREATE INDEX idx_payments_status ON payments(status, created_at);
-- Enforce target ownership and existence even for direct database writes.
CREATE TRIGGER payments_validate_target_insert BEFORE INSERT ON payments
BEGIN
  SELECT RAISE(ABORT, 'payment_target_invalid') WHERE NOT (
    (NEW.target_type = 'reservation' AND EXISTS (
      SELECT 1 FROM reservations r WHERE r.id = NEW.target_id AND r.student_id = NEW.student_id
    )) OR
    (NEW.target_type = 'membership' AND EXISTS (
      SELECT 1 FROM memberships m WHERE m.id = NEW.target_id AND m.student_id = NEW.student_id
    ))
  );
END;
-- Disallow repointing payments after creation; admin can only mark unpaid -> paid.
CREATE TRIGGER payments_immutable_update BEFORE UPDATE ON payments
WHEN NEW.id != OLD.id OR NEW.student_id != OLD.student_id OR
     NEW.target_type != OLD.target_type OR NEW.target_id != OLD.target_id OR
     NEW.method != OLD.method OR NEW.amount_cents != OLD.amount_cents OR
     NEW.currency != OLD.currency OR NEW.reference != OLD.reference OR
     NEW.created_at != OLD.created_at OR
     NEW.status != 'paid' OR OLD.status != 'unpaid' OR
     NEW.received_at IS NULL OR NEW.updated_at = OLD.updated_at
BEGIN
  SELECT RAISE(ABORT, 'payment_update_invalid');
END;
