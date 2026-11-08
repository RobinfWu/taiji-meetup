import type { AppEventContext } from "../types/env";
import { validateEmail } from "./validation";

export const jsonError = (message: string, status: number) => Response.json({ error: message }, { status, headers: { "Cache-Control": "no-store" } });
export const hash = async (value: string) => Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)))).map(x => x.toString(16).padStart(2, "0")).join("");
export const isRecord = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === "object" && !Array.isArray(value);
export async function parseBody(request: {
  text(): Promise<string>;
  headers: {
    get(name: string): string | null;
  };
}): Promise<Record<string, unknown> | null> {
  if (Number(request.headers.get("content-length") || 0) > 4096) return null;
  try { const raw = await request.text(); if (raw.length > 4096) return null; const obj: unknown = JSON.parse(raw); return isRecord(obj) ? obj : null; } catch { return null; }
}
export function allowRequest(ctx: AppEventContext): Response | null {
  // Temporary planning hold: no public dates or venue are confirmed. Keep the
  // existing flow testable only with explicit dev mode on localhost. Reopening
  // needs a reviewed code change, not merely an old production environment flag.
  if (!devMode(ctx) || ctx.env.PUBLIC_BOOKING_ENABLED !== "true") return jsonError("Booking opens once the first sessions are confirmed. Please share your availability using the contact form.", 503);
  const origin = ctx.request.headers.get("Origin");
  if (origin && origin !== new URL(ctx.request.url).origin) return jsonError("Origin not allowed.", 403);
  return null;
}
export function emailFromBody(body: Record<string, unknown>) { return validateEmail(body.email); }
export function devMode(ctx: AppEventContext) {
  const hostname = new URL(ctx.request.url).hostname;

  return (
    ctx.env.EMAIL_VERIFICATION_DEV_MODE === "true" &&
    (hostname === "localhost" || hostname === "127.0.0.1")
  );
}
