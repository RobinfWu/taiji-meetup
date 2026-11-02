import type { AppPagesFunction } from "../../types/env";
import { authorizedDb, isPaymentConstraint, jsonError, plainObject, positiveInt, validId, type PaymentRow } from "../../lib/payment";

const CREATE_FIELDS = ["student_id", "target_type", "target_id", "method", "amount_cents"];

export const onRequestPost: AppPagesFunction = async (ctx) => {
  const { db, response } = await authorizedDb(ctx);
  if (!db) return response!;
  let body: unknown;
  try { body = await ctx.request.json(); } catch { return jsonError("Invalid JSON.", 400); }
  if (!plainObject(body) || Object.keys(body).some(k => !CREATE_FIELDS.includes(k)) ||
      CREATE_FIELDS.some(k => !Object.prototype.hasOwnProperty.call(body, k)))
    return jsonError("Expected student_id, target_type, target_id, method, amount_cents only.", 400);
  if (!validId(body.student_id) || !validId(body.target_id) ||
      !["reservation", "membership"].includes(String(body.target_type)) ||
      !["cash", "etransfer"].includes(String(body.method)) ||
      typeof body.amount_cents !== "number" || !Number.isSafeInteger(body.amount_cents) || body.amount_cents < 1 ||
      body.amount_cents > 100000000)
    return jsonError("Invalid payment fields. amount_cents must be a positive integer.", 400);
  const studentId = body.student_id.trim(), targetId = body.target_id.trim();
  const targetType = body.target_type as string;
  const table = targetType === "reservation" ? "reservations" : "memberships";
  try {
    const target = await db.prepare(`SELECT id FROM ${table} WHERE id = ? AND student_id = ?`)
      .bind(targetId, studentId).first();
    if (!target) return jsonError("Payment target not found for this student.", 404);
    const id = `pay_${crypto.randomUUID()}`;
    const reference = `TJ-${crypto.randomUUID().replace(/-/g, "").slice(0, 16).toUpperCase()}`;
    const now = new Date().toISOString();
    await db.prepare(`INSERT INTO payments
      (id, student_id, target_type, target_id, method, amount_cents, reference, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .bind(id, studentId, targetType, targetId, body.method, body.amount_cents, reference, now, now).run();
    const created = await db.prepare("SELECT * FROM payments WHERE id = ?").bind(id).first<PaymentRow>();
    return Response.json(created, { status: 201 });
  } catch (error) {
    if (isPaymentConstraint(error)) return jsonError("Payment already exists for this target or violates a constraint.", 409);
    console.error("Payment creation failed", error);
    return jsonError("Internal server error.", 500);
  }
};

export const onRequestGet: AppPagesFunction = async (ctx) => {
  const { db, response } = await authorizedDb(ctx);
  if (!db) return response!;
  const params = new URL(ctx.request.url).searchParams;
  const allowed = ["student_id", "target_type", "target_id", "status", "method", "limit", "offset"];
  if ([...params.keys()].some(k => !allowed.includes(k)) || [...params.keys()].some(k => params.getAll(k).length > 1))
    return jsonError("Unknown or duplicate query parameter.", 400);
  const filters: string[] = [], binds: string[] = [];
  for (const key of ["student_id", "target_type", "target_id", "status", "method"]) {
    const value = params.get(key);
    if (value === null) continue;
    const valid = key === "student_id" || key === "target_id" ? validId(value) :
      key === "target_type" ? ["reservation", "membership"].includes(value) :
      key === "status" ? ["unpaid", "paid"].includes(value) : ["cash", "etransfer"].includes(value);
    if (!valid) return jsonError("Invalid filter.", 400);
    filters.push(`${key} = ?`); binds.push(value.trim());
  }
  const limit = positiveInt(params.get("limit"), 20, 100);
  const offset = positiveInt(params.get("offset"), 0, 1000000);
  if (limit === null || limit < 1 || offset === null) return jsonError("Invalid pagination.", 400);
  const where = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
  try {
    const count = await db.prepare(`SELECT COUNT(*) AS total FROM payments ${where}`).bind(...binds).first<{total:number}>();
    const rows = await db.prepare(`SELECT * FROM payments ${where} ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?`)
      .bind(...binds, limit, offset).all<PaymentRow>();
    return Response.json({ payments: rows.results, total: count?.total ?? 0, limit, offset });
  } catch (error) {
    console.error("Payment listing failed", error);
    return jsonError("Internal server error.", 500);
  }
};
