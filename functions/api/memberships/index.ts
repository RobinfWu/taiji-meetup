import type { AppPagesFunction } from "../../types/env";
import { getDb } from "../../types/env";
import { authenticateAdmin } from "../../lib/auth";
import { conflict, exactFields, jsonError, plainObject, positiveInt, validDate, validId, type MemberRow } from "../../lib/membership";

export const onRequestPost: AppPagesFunction = async (ctx) => {
  const auth = await authenticateAdmin(ctx.request, ctx.env);
  if (!auth.authorized) return auth.response!;
  let body: unknown;
  try { body = await ctx.request.json(); } catch { return jsonError("Invalid JSON.", 400); }
  if (!plainObject(body) || !exactFields(body, ["student_id", "template_id", "start_date", "end_date"]))
    return jsonError("Expected an object with only student_id, template_id, start_date, end_date.", 400);
  if (!validId(body.student_id) || !validId(body.template_id) || !validDate(body.start_date) || !validDate(body.end_date) || body.end_date < body.start_date)
    return jsonError("Invalid student, template, or membership dates.", 400);
  const studentId = body.student_id.trim(), templateId = body.template_id.trim();
  const db = getDb(ctx);
  try {
    const student = await db.prepare("SELECT id FROM students WHERE id = ?").bind(studentId).first();
    if (!student) return jsonError("Student not found.", 404);
    const template = await db.prepare("SELECT id FROM class_templates WHERE id = ?").bind(templateId).first();
    if (!template) return jsonError("Class template not found.", 404);
    const id = `mem_${crypto.randomUUID()}`;
    const now = new Date().toISOString();
    await db.prepare(`INSERT INTO memberships
      (id, student_id, template_id, status, start_date, end_date, created_at, updated_at)
      VALUES (?, ?, ?, 'paused', ?, ?, ?, ?)`)
      .bind(id, studentId, templateId, body.start_date, body.end_date, now, now).run();
    const created = await db.prepare("SELECT * FROM memberships WHERE id = ?").bind(id).first<MemberRow>();
    return Response.json(created, { status: 201 });
  } catch (err) {
    if (conflict(err)) return jsonError("Membership conflicts with an existing membership or related record.", 409);
    console.error("Membership creation failed", err);
    return jsonError("Internal server error.", 500);
  }
};

export const onRequestGet: AppPagesFunction = async (ctx) => {
  const auth = await authenticateAdmin(ctx.request, ctx.env);
  if (!auth.authorized) return auth.response!;
  const params = new URL(ctx.request.url).searchParams;
  const allowed = ["student_id", "template_id", "status", "limit", "offset"];
  if ([...params.keys()].some(k => !allowed.includes(k))) return jsonError("Unknown query parameter.", 400);
  const student = params.get("student_id"), template = params.get("template_id"), status = params.get("status");
  if ((student !== null && !validId(student)) || (template !== null && !validId(template)) ||
      (status !== null && !["active", "paused", "cancelled", "expired"].includes(status)))
    return jsonError("Invalid filter.", 400);
  const limit = positiveInt(params.get("limit"), 20, 100);
  const offset = positiveInt(params.get("offset"), 0, 1000000);
  if (limit === null || limit < 1 || offset === null) return jsonError("Invalid pagination.", 400);
  const conditions: string[] = [];
  const args: string[] = [];
  if (student !== null) { conditions.push("student_id = ?"); args.push(student.trim()); }
  if (template !== null) { conditions.push("template_id = ?"); args.push(template.trim()); }
  if (status !== null) { conditions.push("status = ?"); args.push(status); }
  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  try {
    const db = getDb(ctx);
    const count = await db.prepare(`SELECT COUNT(*) AS total FROM memberships ${where}`).bind(...args).first<{total: number}>();
    const results = await db.prepare(`SELECT * FROM memberships ${where} ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?`)
      .bind(...args, limit, offset).all<MemberRow>();
    return Response.json({ memberships: results.results, total: count?.total ?? 0, limit, offset });
  } catch (err) { console.error("Membership listing failed", err); return jsonError("Internal server error.", 500); }
};
