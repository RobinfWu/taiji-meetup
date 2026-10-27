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

export interface Student {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export type MembershipStatus = "active" | "paused" | "cancelled" | "expired";

export interface Membership {
  id: string;
  student_id: string;
  template_id: string;
  status: MembershipStatus;
  start_date: string; // YYYY-MM-DD
  end_date: string | null; // YYYY-MM-DD
  created_at: string;
  updated_at: string;
}

export type ReservationSource = "membership" | "drop_in";
export type ReservationStatus = "confirmed" | "cancelled";

export interface Reservation {
  id: string;
  student_id: string;
  session_id: string;
  source: ReservationSource;
  status: ReservationStatus;
  membership_id: string | null;
  cancellation_reason: string | null;
  cancelled_at: string | null;
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
  reserved_count: number;
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
  reserved_count: number;
  available_spots: number;
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
