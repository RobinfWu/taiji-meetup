import type { AppPagesFunction } from "../types/env";
import { getDb } from "../types/env";
import type { ClassSessionJoinRow, UpcomingClassSessionItem } from "../types/schema";

const UPCOMING_SESSIONS_QUERY = `
  SELECT 
    s.id,
    s.template_id,
    s.start_at,
    s.end_at,
    s.location,
    s.capacity,
    s.status,
    s.cancellation_reason,
    s.created_at,
    s.updated_at,
    t.title AS template_title,
    t.description AS template_description,
    t.weekday AS template_weekday,
    t.start_time AS template_start_time,
    t.end_time AS template_end_time,
    t.timezone AS template_timezone,
    t.location AS template_location,
    t.capacity AS template_capacity,
    COALESCE(r.confirmed_count, 0) AS reserved_count
  FROM class_sessions s
  INNER JOIN class_templates t ON s.template_id = t.id
  LEFT JOIN (
    SELECT session_id, COUNT(*) AS confirmed_count
    FROM reservations
    WHERE status = 'confirmed'
    GROUP BY session_id
  ) r ON s.id = r.session_id
  WHERE s.status = 'scheduled'
    AND s.end_at >= ?
  ORDER BY s.start_at ASC
`;

export const onRequestGet: AppPagesFunction = async (context) => {
  try {
    const db = getDb(context);
    const nowIso = new Date().toISOString();

    const stmt = db.prepare(UPCOMING_SESSIONS_QUERY).bind(nowIso);
    const result = await stmt.all<ClassSessionJoinRow>();

    const rows = result.results ?? [];
    const sessions: UpcomingClassSessionItem[] = rows.map((row) => {
      const reservedCount = Number(row.reserved_count ?? 0);
      const availableSpots = Math.max(0, row.capacity - reservedCount);

      return {
        id: row.id,
        template_id: row.template_id,
        start_at: row.start_at,
        end_at: row.end_at,
        location: row.location,
        capacity: row.capacity,
        status: row.status,
        cancellation_reason: row.cancellation_reason,
        reserved_count: reservedCount,
        available_spots: availableSpots,
        template: {
          id: row.template_id,
          title: row.template_title,
          description: row.template_description,
          weekday: row.template_weekday,
          start_time: row.template_start_time,
          end_time: row.template_end_time,
          timezone: row.template_timezone,
          location: row.template_location,
          capacity: row.template_capacity,
        },
      };
    });

    return Response.json(sessions, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // Log detailed diagnostics server-side only; never leak query or stack details to clients
    console.error("Failed to query upcoming classes from D1:", error);
    return Response.json(
      { error: "Failed to retrieve upcoming classes." },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
