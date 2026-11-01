import type { AppPagesFunction } from "../../../types/env";
import { getDb } from "../../../types/env";
import { authenticateAdmin } from "../../../lib/auth";
import { jsonError, memberId, plainObject, exactFields, type MemberRow } from "../../../lib/membership";

export const onRequestGet: AppPagesFunction<"id"> = async (ctx) => {
  const auth = await authenticateAdmin(ctx.request, ctx.env);
  if (!auth.authorized) return auth.response!;
  const id = memberId(ctx);
  if (!id) return jsonError("Invalid membership ID.", 400);
  try {
    const member = await getDb(ctx).prepare("SELECT * FROM memberships WHERE id = ?").bind(id).first<MemberRow>();
    return member ? Response.json(member) : jsonError("Membership not found.", 404);
  } catch (err) { console.error("Membership retrieval failed", err); return jsonError("Internal server error.", 500); }
};

// Only a paused membership with no confirmed reservations may be cancelled.
// Activation and paid-status changes are deliberately excluded until payment and seat allocation exist.
export const onRequestPatch: AppPagesFunction<"id"> = async (ctx) => {
  const auth = await authenticateAdmin(ctx.request, ctx.env);
  if (!auth.authorized) return auth.response!;
  const id = memberId(ctx);
  if (!id) return jsonError("Invalid membership ID.", 400);
  let body: unknown;
  try { body = await ctx.request.json(); } catch { return jsonError("Invalid JSON.", 400); }
  if (!plainObject(body) || !exactFields(body, ["status"]) || Object.keys(body).length !== 1 || body.status !== "cancelled")
    return jsonError("Only status='cancelled' is supported; activation requires a future payment workflow.", 400);
  try {
    const db = getDb(ctx);
    const now = new Date().toISOString();
    const result = await db.prepare(`UPDATE memberships SET status='cancelled', updated_at=?
      WHERE id=? AND status='paused' AND NOT EXISTS (
        SELECT 1 FROM reservations WHERE membership_id=? AND status='confirmed'
      )`).bind(now, id, id).run();
    if (result.meta.changes) {
      return Response.json(await db.prepare("SELECT * FROM memberships WHERE id=?").bind(id).first<MemberRow>());
    }
    const current = await db.prepare("SELECT * FROM memberships WHERE id=?").bind(id).first<MemberRow>();
    if (!current) return jsonError("Membership not found.", 404);
    if (current.status === "cancelled") return Response.json(current);
    return jsonError("Only a paused membership without confirmed reservations may be cancelled.", 409);
  } catch (err) { console.error("Membership update failed", err); return jsonError("Internal server error.", 500); }
};
