export interface ClassTemplate {
  id: string;
  title: string;
  description: string;
  weekday: number; // 0 = Sunday, ..., 6 = Saturday
  start_time: string; // 24-hr 'HH:MM'
  end_time: string; // 24-hr 'HH:MM'
  timezone: string;
  location: string;
  capacity: number;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export type SessionStatus = "scheduled" | "cancelled" | "completed";

export interface ClassSession {
  id: string;
  template_id: string;
  start_at: string; // ISO 8601 UTC
  end_at: string; // ISO 8601 UTC
  location: string;
  capacity: number;
  status: SessionStatus;
  cancellation_reason: string | null;
  created_at: string;
  updated_at: string;
}

// Flat row returned from SQLite JOIN
export interface ClassSessionJoinRow {
  id: string;
  template_id: string;
  start_at: string;
  end_at: string;
  location: string;
  capacity: number;
  status: SessionStatus;
  cancellation_reason: string | null;
  created_at: string;
  updated_at: string;
  template_title: string;
  template_description: string;
  template_weekday: number;
  template_start_time: string;
  template_end_time: string;
  template_timezone: string;
  template_location: string;
  template_capacity: number;
}

// Structured JSON returned by GET /api/classes
export interface UpcomingClassSessionItem {
  id: string;
  template_id: string;
  start_at: string;
  end_at: string;
  location: string;
  capacity: number;
  status: SessionStatus;
  cancellation_reason: string | null;
  template: {
    id: string;
    title: string;
    description: string;
    weekday: number;
    start_time: string;
    end_time: string;
    timezone: string;
    location: string;
    capacity: number;
  };
}
