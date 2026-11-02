import type { AppPagesFunction } from "../../../types/env";
import { authorizedDb, jsonError, paymentId, type PaymentRow } from "../../../lib/payment";

export const onRequestGet: AppPagesFunction = async (ctx) => {
  const { db, response } = await authorizedDb(ctx);
  if (!db) return response!;
  const id = paymentId(ctx);
  if (!id) return jsonError("Invalid payment ID.", 400);
  try {
    const payment = await db.prepare("SELECT * FROM payments WHERE id = ?").bind(id).first<PaymentRow>();
    return payment ? Response.json(payment) : jsonError("Payment not found.", 404);
  } catch (error) {
    console.error("Payment lookup failed", error);
    return jsonError("Internal server error.", 500);
  }
};
