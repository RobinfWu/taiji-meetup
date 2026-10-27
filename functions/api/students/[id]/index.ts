import type { AppPagesFunction } from "../../../types/env";
import { getDb } from "../../../types/env";
import { authenticateAdmin } from "../../../lib/auth";
import type { Student } from "../../../types/schema";
import {
  STUDENT_LIMITS,
  validateName,
  validateEmail,
  validatePhone,
  validateNotes,
} from "../../../lib/validation";

// Fields a caller may supply in a PATCH body
const ALLOWED_UPDATE_FIELDS = new Set(["first_name", "last_name", "email", "phone", "notes"]);

// Fields that are immutable and must never appear in a PATCH body
const IMMUTABLE_FIELDS = new Set(["id", "created_at", "updated_at"]);

// ---------------------------------------------------------------------------
// GET /api/students/:id — Fetch a single student
// ---------------------------------------------------------------------------

async function handleGet(context: Parameters<AppPagesFunction<"id">>[0]): Promise<Response> {
  // 1. Authenticate before any database access
  const auth = await authenticateAdmin(context.request, context.env);
  if (!auth.authorized) return auth.response!;

  // 2. Validate student ID
  const rawId = context.params.id;
  const studentId = Array.isArray(rawId) ? rawId[0] : rawId;

  if (!studentId || typeof studentId !== "string" || studentId.trim().length === 0 || studentId.length > 100) {
    return Response.json({ error: "Missing or invalid student ID." }, { status: 400 });
  }

  const cleanId = studentId.trim();

  try {
    const db = getDb(context);
    const student = await db
      .prepare("SELECT * FROM students WHERE id = ?")
      .bind(cleanId)
      .first<Student>();

    if (!student) {
      return Response.json({ error: "Student not found." }, { status: 404 });
    }

    return Response.json(student, { status: 200 });
  } catch {
    console.error("Failed to fetch student");
    return Response.json({ error: "Internal server error." }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// PATCH /api/students/:id — Partial update of a student
// ---------------------------------------------------------------------------

async function handlePatch(context: Parameters<AppPagesFunction<"id">>[0]): Promise<Response> {
  // 1. Authenticate before any database access
  const auth = await authenticateAdmin(context.request, context.env);
  if (!auth.authorized) return auth.response!;

  // 2. Validate student ID
  const rawId = context.params.id;
  const studentId = Array.isArray(rawId) ? rawId[0] : rawId;

  if (!studentId || typeof studentId !== "string" || studentId.trim().length === 0 || studentId.length > 100) {
    return Response.json({ error: "Missing or invalid student ID." }, { status: 400 });
  }

  const cleanId = studentId.trim();

  // 3. Parse JSON body
  let body: Record<string, unknown>;
  try {
    body = (await context.request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid JSON request body." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ error: "Request body must be a JSON object." }, { status: 400 });
  }

  // 4. Reject unknown and immutable fields
  for (const key of Object.keys(body)) {
    if (IMMUTABLE_FIELDS.has(key)) {
      return Response.json(
        { error: `Field '${key}' is immutable and cannot be updated.` },
        { status: 400 }
      );
    }
    if (!ALLOWED_UPDATE_FIELDS.has(key)) {
      return Response.json(
        { error: `Unknown field '${key}'. Allowed fields: first_name, last_name, email, phone, notes.` },
        { status: 400 }
      );
    }
  }

  // 5. Require at least one field to update
  if (Object.keys(body).length === 0) {
    return Response.json({ error: "Request body must contain at least one field to update." }, { status: 400 });
  }

  // 6. Validate each supplied field
  const updates: Record<string, string | null> = {};

  if ("first_name" in body) {
    const result = validateName(body.first_name, "first_name", STUDENT_LIMITS.FIRST_NAME_MAX);
    if ("error" in result) return Response.json({ error: result.error.message }, { status: 400 });
    updates.first_name = result.value;
  }

  if ("last_name" in body) {
    const result = validateName(body.last_name, "last_name", STUDENT_LIMITS.LAST_NAME_MAX);
    if ("error" in result) return Response.json({ error: result.error.message }, { status: 400 });
    updates.last_name = result.value;
  }

  if ("email" in body) {
    const result = validateEmail(body.email);
    if ("error" in result) return Response.json({ error: result.error.message }, { status: 400 });
    updates.email = result.value;
  }

  if ("phone" in body) {
    const result = validatePhone(body.phone);
    if ("error" in result) return Response.json({ error: result.error.message }, { status: 400 });
    updates.phone = result.value;  // may be null (clearing the field)
  }

  if ("notes" in body) {
    const result = validateNotes(body.notes);
    if ("error" in result) return Response.json({ error: result.error.message }, { status: 400 });
    updates.notes = result.value;  // may be null (clearing the field)
  }

  const nowIso = new Date().toISOString();

  try {
    const db = getDb(context);

    // 7. Verify student exists before attempting update
    const existing = await db
      .prepare("SELECT id FROM students WHERE id = ?")
      .bind(cleanId)
      .first<{ id: string }>();

    if (!existing) {
      return Response.json({ error: "Student not found." }, { status: 404 });
    }

    // 8. Build parameterized UPDATE — only the supplied fields + updated_at
    const setClauses: string[] = [];
    const bindings: (string | null)[] = [];

    for (const [field, value] of Object.entries(updates)) {
      setClauses.push(`${field} = ?`);
      bindings.push(value);
    }
    setClauses.push("updated_at = ?");
    bindings.push(nowIso);

    // WHERE clause binding
    bindings.push(cleanId);

    await db
      .prepare(`UPDATE students SET ${setClauses.join(", ")} WHERE id = ?`)
      .bind(...bindings)
      .run();

    // 9. Return the updated student record
    const updated = await db
      .prepare("SELECT * FROM students WHERE id = ?")
      .bind(cleanId)
      .first<Student>();

    return Response.json(updated, { status: 200 });
  } catch (err: unknown) {
    const errorStr = String(err);
    const isDuplicateEmail =
      (errorStr.includes("UNIQUE constraint failed") ||
        errorStr.includes("SQLITE_CONSTRAINT_UNIQUE")) &&
      (errorStr.includes("idx_students_email") || errorStr.includes("students.email"));

    if (isDuplicateEmail) {
      return Response.json(
        { error: "A student with that email already exists." },
        { status: 409 }
      );
    }

    console.error("Failed to update student");
    return Response.json({ error: "Internal server error." }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// Route dispatcher
// ---------------------------------------------------------------------------

export const onRequestGet: AppPagesFunction<"id"> = (context) => handleGet(context);
export const onRequestPatch: AppPagesFunction<"id"> = (context) => handlePatch(context);

// Reject all other HTTP methods explicitly
export const onRequest: AppPagesFunction<"id"> = async (context) => {
  const method = context.request.method.toUpperCase();
  if (method === "GET") return handleGet(context);
  if (method === "PATCH") return handlePatch(context);
  return Response.json(
    { error: `Method ${method} not allowed.` },
    { status: 405, headers: { Allow: "GET, PATCH" } }
  );
};
