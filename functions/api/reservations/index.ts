import type { AppPagesFunction } from "../../types/env";
import { getDb } from "../../types/env";
import { authenticateAdmin } from "../../lib/auth";
import type { Reservation, ReservationSource } from "../../types/schema";

interface CreateReservationBody {
  student_id: string;
  session_id: string;
  source: ReservationSource;
  membership_id?: string | null;
}

/**
 * Formats a UTC ISO timestamp into a YYYY-MM-DD calendar date in the specified
 * venue timezone (America/Toronto), accounting for daylight-saving transitions (EDT vs EST).
 */
function getSessionLocalDate(utcIsoString: string, timeZone: string = "America/Toronto"): string {
  const date = new Date(utcIsoString);
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

const ATOMIC_INSERT_QUERY = `
  INSERT INTO reservations (
    id,
    student_id,
    session_id,
    source,
    status,
    membership_id,
    cancellation_reason,
    cancelled_at,
    created_at,
    updated_at
  )
  SELECT
    ?, ?, ?, ?, 'confirmed', ?, NULL, NULL, ?, ?
  WHERE (
    SELECT COUNT(*)
    FROM reservations
    WHERE session_id = ?
      AND status = 'confirmed'
  ) < (
    SELECT capacity
    FROM class_sessions
    WHERE id = ?
  )
`;

export const onRequestPost: AppPagesFunction = async (context) => {
  // 1. Require instructor/admin bearer token before performing any database operations
  const auth = await authenticateAdmin(context.request, context.env);
  if (!auth.authorized) {
    return auth.response!;
  }

  // 2. Validate JSON request body
  let body: CreateReservationBody;
  try {
    body = await context.request.json();
  } catch {
    return Response.json(
      { error: "Invalid JSON request body." },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!body || typeof body !== "object") {
    return Response.json(
      { error: "Request body must be a valid JSON object." },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { student_id, session_id, source, membership_id } = body;

  // Validate student_id
  if (
    !student_id ||
    typeof student_id !== "string" ||
    student_id.trim().length === 0 ||
    student_id.length > 100
  ) {
    return Response.json(
      { error: "Missing or invalid 'student_id'." },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Validate session_id
  if (
    !session_id ||
    typeof session_id !== "string" ||
    session_id.trim().length === 0 ||
    session_id.length > 100
  ) {
    return Response.json(
      { error: "Missing or invalid 'session_id'." },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Validate source
  if (source !== "drop_in" && source !== "membership") {
    return Response.json(
      { error: "Invalid reservation 'source'. Must be 'drop_in' or 'membership'." },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Validate source and membership_id consistency
  if (source === "membership") {
    if (!membership_id || typeof membership_id !== "string" || membership_id.trim().length === 0) {
      return Response.json(
        { error: "'membership_id' is required when source is 'membership'." },
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
  } else {
    // drop_in
    if (membership_id !== undefined && membership_id !== null && membership_id !== "") {
      return Response.json(
        { error: "'membership_id' must not be provided when source is 'drop_in'." },
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  const cleanStudentId = student_id.trim();
  const cleanSessionId = session_id.trim();
  const cleanMembershipId = source === "membership" ? membership_id!.trim() : null;

  try {
    const db = getDb(context);

    // 3. Verify student exists
    const student = await db
      .prepare("SELECT id FROM students WHERE id = ?")
      .bind(cleanStudentId)
      .first<{ id: string }>();

    if (!student) {
      return Response.json(
        { error: "Student not found." },
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // 4. Verify class session exists, is scheduled, and has not ended
    const session = await db
      .prepare(
        `SELECT 
           s.id, 
           s.template_id, 
           s.start_at, 
           s.end_at, 
           s.capacity, 
           s.status,
           t.timezone AS template_timezone
         FROM class_sessions s
         INNER JOIN class_templates t ON s.template_id = t.id
         WHERE s.id = ?`
      )
      .bind(cleanSessionId)
      .first<{
        id: string;
        template_id: string;
        start_at: string;
        end_at: string;
        capacity: number;
        status: string;
        template_timezone: string;
      }>();

    if (!session) {
      return Response.json(
        { error: "Class session not found." },
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    if (session.status !== "scheduled") {
      return Response.json(
        { error: `Cannot reserve a ${session.status} class session.` },
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const nowIso = new Date().toISOString();
    if (session.end_at < nowIso) {
      return Response.json(
        { error: "Cannot reserve a past class session." },
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 5. If membership-sourced, validate membership rules
    if (source === "membership" && cleanMembershipId) {
      const membership = await db
        .prepare("SELECT id, student_id, template_id, status, start_date, end_date FROM memberships WHERE id = ?")
        .bind(cleanMembershipId)
        .first<{
          id: string;
          student_id: string;
          template_id: string;
          status: string;
          start_date: string;
          end_date: string | null;
        }>();

      if (!membership) {
        return Response.json(
          { error: "Membership not found." },
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      if (membership.student_id !== cleanStudentId) {
        return Response.json(
          { error: "Membership does not belong to the specified student." },
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      if (membership.template_id !== session.template_id) {
        return Response.json(
          { error: "Membership does not cover this class template." },
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      if (membership.status !== "active") {
        return Response.json(
          { error: `Membership is not active (current status: ${membership.status}).` },
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      // Check effective date against session occurrence date in America/Toronto
      const timeZone = session.template_timezone || "America/Toronto";
      const sessionLocalDate = getSessionLocalDate(session.start_at, timeZone);

      if (sessionLocalDate < membership.start_date) {
        return Response.json(
          { error: "Session date is prior to membership start date." },
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      if (membership.end_date && sessionLocalDate > membership.end_date) {
        return Response.json(
          { error: "Membership has expired for this session date." },
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // 6. Atomic capacity-checked insert
    const reservationId = `res_${crypto.randomUUID()}`;

    const insertResult = await db
      .prepare(ATOMIC_INSERT_QUERY)
      .bind(
        reservationId,
        cleanStudentId,
        cleanSessionId,
        source,
        cleanMembershipId,
        nowIso,
        nowIso,
        cleanSessionId,
        cleanSessionId
      )
      .run();

    // If changes is 0, session capacity was reached
    if (!insertResult.meta.changes || insertResult.meta.changes === 0) {
      return Response.json(
        { error: "Class session is at full capacity." },
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    // Fetch the created reservation record
    const created = await db
      .prepare("SELECT * FROM reservations WHERE id = ?")
      .bind(reservationId)
      .first<Reservation>();

    return Response.json(created, {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    const errorStr = String(err);

    // Detect duplicate active reservation rejected by partial unique index ONLY.
    // Do not confuse foreign key or check constraint violations with duplicate reservations.
    const isDuplicateActiveReservation =
      (errorStr.includes("UNIQUE constraint failed") || errorStr.includes("SQLITE_CONSTRAINT_UNIQUE")) &&
      (errorStr.includes("idx_reservations_active_student_session") ||
        (errorStr.includes("student_id") && errorStr.includes("session_id")));

    if (isDuplicateActiveReservation) {
      return Response.json(
        { error: "Student already has a confirmed reservation for this class session." },
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    console.error("Failed to create reservation:", err);
    return Response.json(
      { error: "Internal server error." },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
