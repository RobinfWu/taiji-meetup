import type { AppPagesFunction } from "../../../types/env";
import { getDb } from "../../../types/env";
import { authenticateAdmin } from "../../../lib/auth";
import type { Reservation } from "../../../types/schema";

const headers = { "Cache-Control": "no-store" };
const reply = (error: string, status: number) => Response.json({error},{status,headers});

export const onRequestPost: AppPagesFunction<"id"> = async context => {
  const auth = await authenticateAdmin(context.request,context.env);
  if (!auth.authorized) return auth.response!;
  const id = context.params.id;
  if (typeof id !== "string" || !/^[a-zA-Z0-9_-]{1,100}$/.test(id)) return reply("Invalid reservation ID.",400);
  let reason: string | null = null;
  try {
    const raw = await context.request.text();
    if (raw.length > 2048) return reply("Request too large.",413);
    const body: unknown = raw.trim() ? JSON.parse(raw) : {};
    if (!body || typeof body !== "object" || Array.isArray(body) || Object.keys(body).some(k => k !== "cancellation_reason")) return reply("Invalid cancellation request.",400);
    const value = (body as {cancellation_reason?: unknown}).cancellation_reason;
    if (value != null && (typeof value !== "string" || value.length > 500)) return reply("Cancellation reason must be at most 500 characters.",400);
    reason = typeof value === "string" ? value.trim() || null : null;
  } catch { return reply("Invalid cancellation request.",400); }
  try {
    const db = getDb(context);
    const now = new Date().toISOString();
    // Conditional UPDATE is the sole state transition. Competing/repeated calls
    // cannot overwrite the first cancellation timestamp or reason.
    await db.prepare(
      "UPDATE reservations SET status='cancelled', cancellation_reason=?, cancelled_at=?, updated_at=? WHERE id=? AND status='confirmed'"
    ).bind(reason,now,now,id).run();
    const reservation = await db.prepare(`SELECT r.*,
      (SELECT COUNT(*) FROM reservations confirmed WHERE confirmed.session_id=r.session_id AND confirmed.status='confirmed') AS reserved_count
      FROM reservations r WHERE r.id=?`).bind(id).first<Reservation & { reserved_count: number }>();
    if (!reservation) return reply("Reservation not found.",404);
    if (reservation.status !== "cancelled") return reply("Reservation cannot be cancelled from its current status.",409);
    return Response.json(reservation,{headers});
  } catch {
    console.error("Reservation cancellation failed.");
    return reply("Unable to cancel reservation. Please try again.",500);
  }
};

export const onRequest: AppPagesFunction<"id"> = context => {
  if (context.request.method === "POST") return onRequestPost(context);
  return Response.json({error:"Method not allowed."},{status:405,headers:{...headers,Allow:"POST"}});
};
