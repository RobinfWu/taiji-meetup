import type { AppPagesFunction } from "../../types/env";

const json = (error: string, status: number) => Response.json({ error }, { status, headers: { "Cache-Control": "no-store" } });
const escapeHtml = (s: string) => s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] || c);
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

export const onRequestPost: AppPagesFunction = async ctx => {
  const origin = ctx.request.headers.get("Origin");
  if (origin && origin !== new URL(ctx.request.url).origin) return json("Origin not allowed.", 403);
  if (!ctx.request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return json("Invalid request.", 415);
  if (Number(ctx.request.headers.get("content-length") || 0) > 12000) return json("Message too long.", 413);
  let body: Record<string, unknown>;
  try {
    const raw = await ctx.request.text();
    if (raw.length > 12000) return json("Message too long.", 413);
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return json("Invalid request.", 400);
    body = parsed as Record<string, unknown>;
  } catch { return json("Invalid request.", 400); }

  // A filled honeypot is silently discarded so bots do not learn what triggered it.
  if (body.website) return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const token = typeof body.turnstileToken === "string" ? body.turnstileToken : "";
  if (!name || name.length > 120 || !emailPattern.test(email) || email.length > 254 || !message || message.length > 4000) return json("Please provide a valid name, email, and message.", 400);
  if (!token || token.length > 2048) return json("Please complete the verification.", 400);
  const { TURNSTILE_SECRET_KEY, RESEND_API_KEY, BOOKING_FROM_EMAIL, CONTACT_TO_EMAIL, CONTACT_RATE_LIMIT_SECRET } = ctx.env;
  if (!TURNSTILE_SECRET_KEY || !RESEND_API_KEY || !BOOKING_FROM_EMAIL || !CONTACT_TO_EMAIL || !CONTACT_RATE_LIMIT_SECRET || !ctx.env.DB) {
    return json("Contact form is not configured.", 503);
  }

  try {
    const check = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: TURNSTILE_SECRET_KEY, response: token, remoteip: ctx.request.headers.get("CF-Connecting-IP") || undefined }),
    });
    if (!check.ok) return json("Verification is temporarily unavailable.", 503);
    const result = await check.json() as {
      success?: boolean;
      hostname?: string;
      "error-codes"?: string[];
    };

    if (!result.success) {
      console.warn("Turnstile verification rejected:", result["error-codes"]);
      return json("Verification failed. Please try again.", 400);
    }

    const hostname = new URL(ctx.request.url).hostname;

    const isOfficialLocalTest =
      (hostname === "localhost" || hostname === "127.0.0.1") &&
      TURNSTILE_SECRET_KEY === "1x0000000000000000000000000000000AA";

    if (!isOfficialLocalTest && result.hostname !== hostname) {
      console.warn("Turnstile hostname mismatch.");
      return json("Verification failed. Please try again.", 400);
    }
    // Atomic per-IP hourly limit, keyed by a salted hash (no raw IP stored).
    const ip = ctx.request.headers.get("CF-Connecting-IP") || "unknown";
    const input = new TextEncoder().encode(`${CONTACT_RATE_LIMIT_SECRET}:${ip}`);
    const digest = await crypto.subtle.digest("SHA-256", input);
    const key = Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, "0")).join("");
    const bucket = Math.floor(Date.now() / 3600000);
    const claim = await ctx.env.DB.prepare(`INSERT INTO contact_rate_limits (visitor_hash, hour_bucket, attempts)
      VALUES (?, ?, 1) ON CONFLICT(visitor_hash, hour_bucket) DO UPDATE SET attempts=attempts+1
      WHERE attempts < 5`).bind(key, bucket).run();
    if (claim.meta.changes !== 1) return json("Too many messages. Please try again later.", 429);

    const sent = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: BOOKING_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `Website inquiry from ${name.replace(/[\r\n]/g, " ")}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      }),
    });
    if (!sent.ok) {
      console.error("Contact email provider rejected request", sent.status);
      return json("Unable to deliver your message right now. Please try later.", 502);
    }
    return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Contact endpoint failed", error instanceof Error ? error.message : "unknown error");
    return json("Contact service is temporarily unavailable.", 503);
  }
};
