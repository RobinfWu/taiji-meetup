import { authenticateAdmin } from "./auth";
import { getDb, type AppEventContext } from "../types/env";
import { jsonError, plainObject, validId, positiveInt } from "./membership";
import type { Payment } from "../types/schema";

export { jsonError, plainObject, validId, positiveInt };
export type PaymentRow = Payment;
export async function authorizedDb(ctx: AppEventContext) {
  const auth = await authenticateAdmin(ctx.request, ctx.env);
  return auth.authorized ? { db: getDb(ctx), response: null } : { db: null, response: auth.response! };
}
export function paymentId(ctx: AppEventContext): string | null {
  const raw = ctx.params.id;
  const id = Array.isArray(raw) ? raw[0] : raw;
  return validId(id) ? id.trim() : null;
}
export function isPaymentConstraint(error: unknown): boolean {
  const msg = String(error);
  return msg.includes("SQLITE_CONSTRAINT") || msg.includes("payment_target_invalid") || msg.includes("payment_update_invalid");
}
