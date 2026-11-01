-- Reject overlapping non-cancelled membership intervals for the same student/template.
-- Triggers run within the INSERT/UPDATE statement, preventing check-then-write races.
-- Existing overlapping records, if any, must be reviewed separately.
CREATE TRIGGER IF NOT EXISTS memberships_no_overlap_insert
BEFORE INSERT ON memberships
WHEN NEW.status != 'cancelled'
BEGIN
  SELECT RAISE(ABORT, 'membership_overlap')
  WHERE EXISTS (
    SELECT 1 FROM memberships m
    WHERE m.student_id = NEW.student_id AND m.template_id = NEW.template_id
      AND m.status != 'cancelled'
      AND m.start_date <= COALESCE(NEW.end_date, '9999-12-31')
      AND NEW.start_date <= COALESCE(m.end_date, '9999-12-31')
  );
END;

CREATE TRIGGER IF NOT EXISTS memberships_no_overlap_update
BEFORE UPDATE OF student_id, template_id, status, start_date, end_date ON memberships
WHEN NEW.status != 'cancelled'
BEGIN
  SELECT RAISE(ABORT, 'membership_overlap')
  WHERE EXISTS (
    SELECT 1 FROM memberships m
    WHERE m.id != NEW.id
      AND m.student_id = NEW.student_id AND m.template_id = NEW.template_id
      AND m.status != 'cancelled'
      AND m.start_date <= COALESCE(NEW.end_date, '9999-12-31')
      AND NEW.start_date <= COALESCE(m.end_date, '9999-12-31')
  );
END;
