import type { AppPagesFunction } from "../../../types/env";
import { getDb } from "../../../types/env";
import { authenticateAdmin } from "../../../lib/auth";
import type { Reservation } from "../../../types/schema";

interface CancelReservationBody {
  cancellation_reason?: string | null;
}

export const onRequestPost: AppPagesFunction<"id"> = async (context) => {
  // 1. Require instructor/admin bearer token
  const auth = await authenticateAdmin(context.request, context.env);
  if (!auth.authorized) {
    return auth.response!;
  }

  // 2. Validate reservation ID parameter
  const rawId = context.params.id;
  const reservationId = Array.isArray(rawId) ? rawId[0] : rawId;

  if (
    !reservationId ||
    typeof reservationId !== "string" ||
    reservationId.trim().length === 0 ||
    reservationId.length > 100
  ) {
    return Response.json(
      { error: "Missing or invalid reservation ID." },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const cleanId = reservationId.trim();

  try {
    const db = getDb(context);

    // 3. Verify reservation exists
    const existing = await db
      .prepare("SELECT * FROM reservations WHERE id = ?")
      .bind(cleanId)
      .first<Reservation>();

    if (!existing) {
      return Response.json(
        { error: "Reservation not found." },
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // 4. Idempotency: If already cancelled, return existing record without modifying timestamps
    if (existing.status === "cancelled") {
      return Response.json(existing, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Optional cancellation_reason from request body
    let cancellationReason: string | null = null;
    try {
      const body = (await context.request.json()) as CancelReservationBody;
      if (body && typeof body === "object" && typeof body.cancellation_reason === "string") {
        cancellationReason = body.cancellation_reason.trim() || null;
      }
    } catch {
      // Body is optional on cancellation
    }

    const nowIso = new Date().toISOString();

    // 5. Update status to cancelled, setting cancelled_at and updated_at
    await db
      .prepare(
        `UPDATE reservations
         SET status = 'cancelled',
             cancellation_reason = COALESCE(?, cancellation_reason),
             cancelled_at = ?,
             updated_at = ?
         WHERE id = ? AND status = 'confirmed'`
      )
      .bind(cancellationReason, nowIso, nowIso, cleanId)
      .run();

    // Fetch updated reservation record
    const updated = await db
      .prepare("SELECT * FROM reservations WHERE id = ?")
      .bind(cleanId)
      .first<Reservation>();

    return Response.json(updated, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    console.error("Failed to cancel reservation:", err);
    return Response.json(
      { error: "Internal server error." },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
