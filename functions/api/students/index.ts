import type { AppPagesFunction } from "../../types/env";
import { getDb } from "../../types/env";
import { authenticateAdmin } from "../../lib/auth";
import type { Student } from "../../types/schema";
import {
  STUDENT_LIMITS,
  validateName,
  validateEmail,
  validatePhone,
  validateNotes,
  escapeLikeWildcards,
} from "../../lib/validation";

// ---------------------------------------------------------------------------
// POST /api/students — Create a student
// ---------------------------------------------------------------------------

interface CreateStudentBody {
  first_name?: unknown;
  last_name?: unknown;
  email?: unknown;
  phone?: unknown;
  notes?: unknown;
  [key: string]: unknown;
}

const IMMUTABLE_OR_UNKNOWN_FIELDS_CREATE = new Set(["id", "created_at", "updated_at"]);

async function handlePost(context: Parameters<AppPagesFunction>[0]): Promise<Response> {
  // 1. Authenticate before any database access
  const auth = await authenticateAdmin(context.request, context.env);
  if (!auth.authorized) return auth.response!;

  // 2. Parse JSON body
  let body: CreateStudentBody;
  try {
    body = (await context.request.json()) as CreateStudentBody;
  } catch {
    return Response.json({ error: "Invalid JSON request body." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ error: "Request body must be a JSON object." }, { status: 400 });
  }

  // Reject unknown / immutable fields to avoid silent data loss
  for (const key of Object.keys(body)) {
    if (IMMUTABLE_OR_UNKNOWN_FIELDS_CREATE.has(key)) {
      return Response.json(
        { error: `Field '${key}' is not allowed in a create request.` },
        { status: 400 }
      );
    }
  }

  // 3. Validate required fields
  const firstNameResult = validateName(body.first_name, "first_name", STUDENT_LIMITS.FIRST_NAME_MAX);
  if ("error" in firstNameResult)
    return Response.json({ error: firstNameResult.error.message }, { status: 400 });

  const lastNameResult = validateName(body.last_name, "last_name", STUDENT_LIMITS.LAST_NAME_MAX);
  if ("error" in lastNameResult)
    return Response.json({ error: lastNameResult.error.message }, { status: 400 });

  const emailResult = validateEmail(body.email);
  if ("error" in emailResult)
    return Response.json({ error: emailResult.error.message }, { status: 400 });

  // 4. Validate optional fields (present = must be valid; absent = null)
  let phone: string | null = null;
  if (body.phone !== undefined) {
    const phoneResult = validatePhone(body.phone);
    if ("error" in phoneResult)
      return Response.json({ error: phoneResult.error.message }, { status: 400 });
    phone = phoneResult.value;
  }

  let notes: string | null = null;
  if (body.notes !== undefined) {
    const notesResult = validateNotes(body.notes);
    if ("error" in notesResult)
      return Response.json({ error: notesResult.error.message }, { status: 400 });
    notes = notesResult.value;
  }

  const studentId = `stu_${crypto.randomUUID()}`;
  const nowIso = new Date().toISOString();

  try {
    const db = getDb(context);

    await db
      .prepare(
        `INSERT INTO students (id, first_name, last_name, email, phone, notes, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        studentId,
        firstNameResult.value,
        lastNameResult.value,
        emailResult.value,
        phone,
        notes,
        nowIso,
        nowIso
      )
      .run();

    const created = await db
      .prepare("SELECT * FROM students WHERE id = ?")
      .bind(studentId)
      .first<Student>();

    return Response.json(created, { status: 201 });
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

    console.error("Failed to create student");
    return Response.json({ error: "Internal server error." }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// GET /api/students — List / search students
// ---------------------------------------------------------------------------

async function handleGet(context: Parameters<AppPagesFunction>[0]): Promise<Response> {
  // 1. Authenticate before any database access
  const auth = await authenticateAdmin(context.request, context.env);
  if (!auth.authorized) return auth.response!;

  const url = new URL(context.request.url);

  // 2. Parse and validate pagination parameters
  const rawLimit = url.searchParams.get("limit") ?? "20";
  const rawOffset = url.searchParams.get("offset") ?? "0";

  const limit = parseInt(rawLimit, 10);
  const offset = parseInt(rawOffset, 10);

  if (!Number.isInteger(limit) || isNaN(limit) || limit < 1 || limit > 100) {
    return Response.json(
      { error: "'limit' must be an integer between 1 and 100." },
      { status: 400 }
    );
  }
  if (!Number.isInteger(offset) || isNaN(offset) || offset < 0) {
    return Response.json(
      { error: "'offset' must be a non-negative integer." },
      { status: 400 }
    );
  }

  const emailParam = url.searchParams.get("email");
  const qParam = url.searchParams.get("q");

  try {
    const db = getDb(context);
    let students: Student[];

    if (emailParam !== null) {
      // Exact email lookup — uses the NOCASE unique index
      const normalized = emailParam.trim().toLowerCase();
      const result = await db
        .prepare(
          `SELECT * FROM students
           WHERE email = ? COLLATE NOCASE
           ORDER BY created_at ASC, id ASC
           LIMIT ? OFFSET ?`
        )
        .bind(normalized, limit, offset)
        .all<Student>();
      students = result.results ?? [];
    } else if (qParam !== null && qParam.trim().length > 0) {
      // Free-text search across first_name, last_name, email
      // Wildcard characters are escaped so users get literal matches
      const escaped = escapeLikeWildcards(qParam.trim());
      const pattern = `%${escaped}%`;
      const result = await db
        .prepare(
          `SELECT * FROM students
           WHERE first_name LIKE ? ESCAPE '\\'
              OR last_name  LIKE ? ESCAPE '\\'
              OR email      LIKE ? ESCAPE '\\'
           ORDER BY created_at ASC, id ASC
           LIMIT ? OFFSET ?`
        )
        .bind(pattern, pattern, pattern, limit, offset)
        .all<Student>();
      students = result.results ?? [];
    } else {
      // No filter — return all students ordered deterministically
      const result = await db
        .prepare(
          `SELECT * FROM students
           ORDER BY created_at ASC, id ASC
           LIMIT ? OFFSET ?`
        )
        .bind(limit, offset)
        .all<Student>();
      students = result.results ?? [];
    }

    return Response.json({ students, limit, offset }, { status: 200 });
  } catch {
    console.error("Failed to list students");
    return Response.json({ error: "Internal server error." }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// Route dispatcher
// ---------------------------------------------------------------------------

export const onRequestGet: AppPagesFunction = (context) => handleGet(context);
export const onRequestPost: AppPagesFunction = (context) => handlePost(context);

// Reject all other HTTP methods explicitly
export const onRequest: AppPagesFunction = async (context) => {
  const method = context.request.method.toUpperCase();
  if (method === "GET") return handleGet(context);
  if (method === "POST") return handlePost(context);
  return Response.json(
    { error: `Method ${method} not allowed.` },
    { status: 405, headers: { Allow: "GET, POST" } }
  );
};
