import type { AppPagesFunction } from "../../../types/env";
import { authorizedDb, jsonError, paymentId, type PaymentRow } from "../../../lib/payment";

// The instructor calls this ONLY after checking actual cash or bank receipt.
// No automatic membership activation or reservation changes occur here.
export const onRequestPost: AppPagesFunction = async (ctx) => {
  const { db, response } = await authorizedDb(ctx);
  if (!db) return response!;
  const id = paymentId(ctx);
  if (!id) return jsonError("Invalid payment ID.", 400);
  let body: unknown;
  try { body = await ctx.request.json(); } catch { return jsonError("Invalid JSON.", 400); }
  if (body === null || typeof body !== "object" || Array.isArray(body) || Object.keys(body).length !== 0)
    return jsonError("Expected an empty JSON object.", 400);
  try {
    const now = new Date().toISOString();
    const result = await db.prepare(`UPDATE payments SET status = 'paid', received_at = ?, updated_at = ?
      WHERE id = ? AND status = 'unpaid'`)
      .bind(now, now, id).run();
    if (result.meta.changes !== 1) {
      const existing = await db.prepare("SELECT status FROM payments WHERE id = ?").bind(id).first<{status:string}>();
      return existing ? jsonError("Payment has already been confirmed.", 409) : jsonError("Payment not found.", 404);
    }
    const payment = await db.prepare("SELECT * FROM payments WHERE id = ?").bind(id).first<PaymentRow>();
    return Response.json(payment);
  } catch (error) {
    console.error("Payment confirmation failed", error);
    return jsonError("Internal server error.", 500);
  }
};
