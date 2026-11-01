import type { AppPagesFunction } from "../../../types/env";
import { getDb } from "../../../types/env";
import { authenticateAdmin } from "../../../lib/auth";
import { conflict, exactFields, jsonError, memberId, plainObject, validDate, type MemberRow } from "../../../lib/membership";

// Administrative extension only. This does NOT mark a payment as received or allocate seats.
export const onRequestPost: AppPagesFunction<"id"> = async (ctx) => {
  const auth = await authenticateAdmin(ctx.request, ctx.env);
  if (!auth.authorized) return auth.response!;
  const id = memberId(ctx);
  if (!id) return jsonError("Invalid membership ID.", 400);
  let body: unknown;
  try { body = await ctx.request.json(); } catch { return jsonError("Invalid JSON.", 400); }
  if (!plainObject(body) || !exactFields(body, ["end_date"]) || Object.keys(body).length !== 1 || !validDate(body.end_date))
    return jsonError("Provide only a valid end_date (YYYY-MM-DD).", 400);
  try {
    const db = getDb(ctx);
    const now = new Date().toISOString();
    const result = await db.prepare(`UPDATE memberships SET end_date=?, updated_at=?
      WHERE id=? AND status='paused' AND end_date IS NOT NULL AND end_date < ?`)
      .bind(body.end_date, now, id, body.end_date).run();
    if (result.meta.changes) {
      const updated = await db.prepare("SELECT * FROM memberships WHERE id=?").bind(id).first<MemberRow>();
      return Response.json(updated);
    }
    const current = await db.prepare("SELECT * FROM memberships WHERE id=?").bind(id).first<MemberRow>();
    if (!current) return jsonError("Membership not found.", 404);
    return jsonError("Only paused memberships may be extended, and end_date must increase.", 409);
  } catch (err) {
    if (conflict(err)) return jsonError("Renewal overlaps another membership.", 409);
    console.error("Membership renewal failed", err);
    return jsonError("Internal server error.", 500);
  }
};
