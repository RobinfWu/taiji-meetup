-- Waivers are immutable records of the exact version accepted.
CREATE TABLE IF NOT EXISTS waiver_versions (
  version TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS student_waivers (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL REFERENCES students(id) ON DELETE RESTRICT,
  version TEXT NOT NULL REFERENCES waiver_versions(version) ON DELETE RESTRICT,
  signed_name TEXT NOT NULL,
  signed_at TEXT NOT NULL,
  verification_email TEXT NOT NULL,
  adult_confirmed INTEGER NOT NULL CHECK(adult_confirmed=1),
  release_acknowledged INTEGER NOT NULL CHECK(release_acknowledged=1),
  UNIQUE(student_id, version)
);
CREATE INDEX IF NOT EXISTS idx_student_waivers_student ON student_waivers(student_id);
