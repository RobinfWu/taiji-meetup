import type { AppPagesFunction } from "../../../types/env";
import { getDb } from "../../../types/env";
import { authenticateAdmin } from "../../../lib/auth";

// Read-only instructor roster. Never expose this endpoint without admin authentication.
export const onRequestGet: AppPagesFunction = async (context) => {
  const auth = await authenticateAdmin(context.request, context.env);
  if (!auth.authorized) return auth.response!;
  const headers = { "Cache-Control": "no-store" };
  try {
    const db = getDb(context);
    const url = new URL(context.request.url);
    const sessionId = url.searchParams.get("session_id");
    if (sessionId !== null) {
      if (!sessionId || sessionId.length > 200) {
        return Response.json({ error: "Invalid session ID." }, { status: 400, headers });
      }
      const session = await db.prepare(`
        SELECT s.id, s.start_at, s.end_at, s.location, s.capacity, s.status,
               t.title,
               (SELECT COUNT(*) FROM reservations r WHERE r.session_id = s.id AND r.status = 'confirmed') AS reserved_count
        FROM class_sessions s JOIN class_templates t ON t.id = s.template_id
        WHERE s.id = ?`).bind(sessionId).first();
      if (!session) return Response.json({ error: "Class not found." }, { status: 404, headers });
      const reservations = await db.prepare(`
        SELECT r.id, r.status, r.source, r.created_at, r.cancelled_at,
               st.id AS student_id, st.first_name, st.last_name, st.email, st.phone
        FROM reservations r JOIN students st ON st.id = r.student_id
        WHERE r.session_id = ?
        ORDER BY CASE WHEN r.status = 'confirmed' THEN 0 ELSE 1 END,
                 st.last_name COLLATE NOCASE, st.first_name COLLATE NOCASE, r.created_at DESC
        LIMIT 500`).bind(sessionId).all();
      return Response.json({ session, reservations: reservations.results ?? [] }, { headers });
    }
    const classes = await db.prepare(`
      SELECT s.id, s.start_at, s.end_at, s.location, s.capacity, s.status, t.title,
             (SELECT COUNT(*) FROM reservations r WHERE r.session_id = s.id AND r.status = 'confirmed') AS reserved_count
      FROM class_sessions s JOIN class_templates t ON t.id = s.template_id
      ORDER BY CASE WHEN s.end_at >= ? THEN 0 ELSE 1 END,
               CASE WHEN s.end_at >= ? THEN s.start_at END ASC,
               CASE WHEN s.end_at < ? THEN s.start_at END DESC,
               s.id ASC LIMIT 100`).bind(new Date().toISOString(), new Date().toISOString(), new Date().toISOString()).all();
    return Response.json({ classes: classes.results ?? [] }, { headers });
  } catch (error) {
    console.error("Admin classes query failed", error);
    return Response.json({ error: "Unable to load classes." }, { status: 500, headers });
  }
};

export const onRequest: AppPagesFunction = (context) => {
  if (context.request.method === "GET") return onRequestGet(context);
  return Response.json({ error: "Method not allowed." }, { status: 405, headers: { Allow: "GET", "Cache-Control": "no-store" } });
};
