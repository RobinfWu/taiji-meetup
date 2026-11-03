import type { AppPagesFunction } from "../../../types/env";
import { getDb } from "../../../types/env";
import { authenticateAdmin } from "../../../lib/auth";

// All figures are calculated from the database on each request. This endpoint
// intentionally returns no student contact details or payment references.
export const onRequestGet: AppPagesFunction = async (context) => {
  const auth = await authenticateAdmin(context.request, context.env);
  if (!auth.authorized) return auth.response!;

  try {
    const db = getDb(context);
    const now = new Date();
    const nowIso = now.toISOString();
    const todayToronto = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Toronto", year: "numeric", month: "2-digit", day: "2-digit",
    }).format(now);

    const [classes, pending, memberships, reservations] = await Promise.all([
      db.prepare(`SELECT s.id, s.start_at, s.end_at, s.location, s.capacity,
          t.title, COALESCE(COUNT(r.id), 0) AS reserved_count
        FROM class_sessions s
        JOIN class_templates t ON t.id = s.template_id
        LEFT JOIN reservations r ON r.session_id = s.id AND r.status = 'confirmed'
        WHERE s.status = 'scheduled' AND s.end_at >= ?
        GROUP BY s.id, s.start_at, s.end_at, s.location, s.capacity, t.title
        ORDER BY s.start_at ASC, s.id ASC LIMIT 5`).bind(nowIso).all<{
          id: string; start_at: string; end_at: string; location: string;
          capacity: number; title: string; reserved_count: number;
        }>(),
      db.prepare(`SELECT COUNT(*) AS count, COALESCE(SUM(amount_cents), 0) AS amount_cents
        FROM payments WHERE status = 'unpaid'`).first<{count: number; amount_cents: number}>(),
      db.prepare(`SELECT COUNT(*) AS count FROM memberships
        WHERE status = 'active' AND start_date <= ? AND (end_date IS NULL OR end_date >= ?)`)
        .bind(todayToronto, todayToronto).first<{count: number}>(),
      db.prepare(`SELECT COUNT(*) AS count FROM reservations r
        JOIN class_sessions s ON s.id = r.session_id
        WHERE r.status = 'confirmed' AND s.status = 'scheduled' AND s.end_at >= ?`)
        .bind(nowIso).first<{count: number}>(),
    ]);

    return Response.json({
      upcoming_classes: classes.results ?? [],
      upcoming_reservations: reservations?.count ?? 0,
      pending_payments: {
        count: pending?.count ?? 0,
        amount_cents: pending?.amount_cents ?? 0,
        currency: "CAD",
      },
      active_memberships: memberships?.count ?? 0,
      generated_at: nowIso,
    }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Admin overview failed", error);
    return Response.json({ error: "Unable to load dashboard overview." }, {
      status: 500, headers: { "Cache-Control": "no-store" },
    });
  }
};

export const onRequest: AppPagesFunction = (context) => {
  if (context.request.method === "GET") return onRequestGet(context);
  return Response.json({ error: "Method not allowed." }, {
    status: 405, headers: { Allow: "GET", "Cache-Control": "no-store" },
  });
};
