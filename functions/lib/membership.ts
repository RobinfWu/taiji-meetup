import type { AppPagesFunction } from "../types/env";

export type Ctx = Parameters<AppPagesFunction>[0];
export type MemberRow = {
  id: string; student_id: string; template_id: string;
  status: "active" | "paused" | "cancelled" | "expired";
  start_date: string; end_date: string | null;
  created_at: string; updated_at: string;
};
export const jsonError = (error: string, status: number) => Response.json({ error }, { status });
export function plainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
export function exactFields(body: Record<string, unknown>, allowed: string[]): boolean {
  return Object.keys(body).every((key) => allowed.includes(key));
}
export function validId(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0 && v.length <= 100;
}
export function validDate(v: unknown): v is string {
  if (typeof v !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  const [y, m, d] = v.split("-").map(Number);
  if (y < 1 || y > 9999 || m < 1 || m > 12 || d < 1 || d > 31) return false;
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}
export function positiveInt(v: string | null, fallback: number, max: number): number | null {
  if (v === null) return fallback;
  if (!/^(0|[1-9]\d*)$/.test(v)) return null;
  const n = Number(v);
  return Number.isSafeInteger(n) && n <= max ? n : null;
}
export function conflict(err: unknown): boolean {
  const message = String(err);
  return message.includes("membership_overlap") || message.includes("SQLITE_CONSTRAINT") || message.includes("FOREIGN KEY constraint failed");
}
export function memberId(ctx: { params: Record<string, string | string[]> }): string | null {
  const raw = ctx.params.id;
  const id = Array.isArray(raw) ? raw[0] : raw;
  return validId(id) ? id.trim() : null;
}
