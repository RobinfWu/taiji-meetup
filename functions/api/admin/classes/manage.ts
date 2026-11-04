import type { AppPagesFunction } from "../../../types/env";
import { getDb } from "../../../types/env";
import { authenticateAdmin } from "../../../lib/auth";

const headers = { "Cache-Control": "no-store" };
const reply = (error: string, status: number) => Response.json({ error }, { status, headers });
type Input = Record<string, unknown>;
const string = (v: unknown, max = 200) => typeof v === "string" && v.trim().length > 0 && v.trim().length <= max ? v.trim() : null;
const date = (v: unknown) => {
  if (typeof v !== "string" || !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(v)) return null;
  const d = new Date(v);
  return !Number.isNaN(d.getTime()) && d.toISOString() === v ? v : null;
};
const capacity = (v: unknown) => typeof v === "number" && Number.isInteger(v) && v >= 1 && v <= 500 ? v : null;

export const onRequestGet: AppPagesFunction = async (context) => {
  const auth = await authenticateAdmin(context.request, context.env);
  if (!auth.authorized) return auth.response!;
  try {
    const templates = await getDb(context).prepare("SELECT id, title, location, capacity FROM class_templates WHERE is_active=1 ORDER BY title").all();
    return Response.json({ templates: templates.results ?? [] }, { headers });
  } catch (error) { console.error("Class template query failed", error); return reply("Unable to load class templates.", 500); }
};

export const onRequestPost: AppPagesFunction = async (context) => {
  const auth = await authenticateAdmin(context.request, context.env);
  if (!auth.authorized) return auth.response!;
  let body: Input;
  try { body = await context.request.json() as Input; } catch { return reply("Invalid JSON.", 400); }
  const templateId = string(body.template_id);
  const start = date(body.start_at), end = date(body.end_at);
  const location = string(body.location, 300), seats = capacity(body.capacity);
  if (!templateId || !start || !end || !location || seats === null || end <= start || start <= new Date().toISOString()) return reply("Invalid class details. Use a future start, later end, venue and capacity from 1 to 500.", 400);
  if (Date.parse(end) - Date.parse(start) > 12 * 3600000) return reply("A class cannot exceed 12 hours.", 400);
  try {
    const db = getDb(context);
    const id = crypto.randomUUID(), now = new Date().toISOString();
    const result = await db.prepare(`INSERT INTO class_sessions (id,template_id,start_at,end_at,location,capacity,status,created_at,updated_at)
      SELECT ?,id,?,?,?,?,'scheduled',?,? FROM class_templates WHERE id=? AND is_active=1`).bind(id,start,end,location,seats,now,now,templateId).run();
    if (!result.meta.changes) return reply("Class template not found or inactive.", 404);
    return Response.json({ id }, { status: 201, headers });
  } catch (error) { console.error("Class creation failed", error); return reply("Unable to create class.", 500); }
};

export const onRequestPatch: AppPagesFunction = async (context) => {
  const auth = await authenticateAdmin(context.request, context.env);
  if (!auth.authorized) return auth.response!;
  let body: Input;
  try { body = await context.request.json() as Input; } catch { return reply("Invalid JSON.", 400); }
  const id = string(body.id), action = body.action;
  if (!id || (action !== "edit" && action !== "cancel")) return reply("Invalid class action.", 400);
  try {
    const db = getDb(context), now = new Date().toISOString();
    if (action === "cancel") {
      const reason = body.reason === "" || body.reason == null ? null : string(body.reason, 500);
      if (body.reason != null && body.reason !== "" && !reason) return reply("Invalid cancellation reason.", 400);
      const result = await db.prepare(`UPDATE class_sessions SET status='cancelled', cancellation_reason=?, updated_at=?
        WHERE id=? AND status='scheduled' AND end_at>?`).bind(reason,now,id,now).run();
      if (!result.meta.changes) return reply("Only upcoming scheduled classes can be canceled.", 409);
      return Response.json({ ok: true }, { headers });
    }
    const start = date(body.start_at), end = date(body.end_at);
    const location = string(body.location, 300), seats = capacity(body.capacity);
    if (!start || !end || !location || seats === null || end <= start || start <= now || Date.parse(end)-Date.parse(start)>12*3600000) return reply("Invalid class details.", 400);
    // The seat-count condition is checked in the UPDATE itself to avoid stale UI overwriting bookings.
    const result = await db.prepare(`UPDATE class_sessions SET start_at=?,end_at=?,location=?,capacity=?,updated_at=?
      WHERE id=? AND status='scheduled' AND end_at>?
        AND ? >= (SELECT COUNT(*) FROM reservations WHERE session_id=? AND status='confirmed')`)
      .bind(start,end,location,seats,now,id,now,seats,id).run();
    if (!result.meta.changes) return reply("Class unavailable or capacity is below confirmed reservations. Refresh and try again.", 409);
    return Response.json({ ok: true }, { headers });
  } catch (error) { console.error("Class update failed", error); return reply("Unable to update class.", 500); }
};

export const onRequest: AppPagesFunction = (context) => {
  if (context.request.method === "GET") return onRequestGet(context);
  if (context.request.method === "POST") return onRequestPost(context);
  if (context.request.method === "PATCH") return onRequestPatch(context);
  return reply("Method not allowed.", 405);
};
