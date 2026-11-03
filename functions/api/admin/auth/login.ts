import type { AppPagesFunction } from "../../../types/env";
import { getDb } from "../../../types/env";
import {
  verifyPassword,
  createSessionToken,
  createSessionCookieHeader,
  isRequestSecure,
  verifyCsrf,
} from "../../../lib/auth";
import {
  deriveClientKey,
  reserveLoginAttempt,
} from "../../../lib/rateLimit";

interface LoginBody {
  password?: unknown;
}

export const onRequestPost: AppPagesFunction = async (context) => {
  const { request, env } = context;

  // 1. Reject inappropriate cross-origin requests
  if (!verifyCsrf(request)) {
    return Response.json(
      { error: "Forbidden: Cross-origin request not allowed." },
      { status: 403, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } }
    );
  }

  // 2. Fail closed if database is unavailable
  let db;
  try {
    db = getDb(context);
  } catch {
    return Response.json(
      { error: "Authentication service is currently unavailable." },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  // Validate configuration before any cryptographic operation.
  const sessionSecret = env.INSTRUCTOR_SESSION_SECRET;
  if (!sessionSecret || !sessionSecret.trim()) {
    return Response.json({ error: "Authentication service is currently unavailable." }, { status: 500, headers: { "Cache-Control": "no-store" } });
  }

  // Reserve an attempt atomically before password verification.
  // Both successful and unsuccessful attempts count; do not reset on success.
  try {
    const clientKey = await deriveClientKey(request, sessionSecret);
    const admission = await reserveLoginAttempt(db, clientKey);
    if (!admission.allowed) {
      return Response.json(
        { error: "Too many login attempts. Please try again later." },
        { status: 429, headers: { "Retry-After": String(admission.retryAfter ?? 900), "Cache-Control": "no-store" } }
      );
    }
  } catch (err) {
    console.error("Login admission unavailable:", err);
    return Response.json({ error: "Authentication service is currently unavailable." }, { status: 500, headers: { "Cache-Control": "no-store" } });
  }

  // 3. Parse and validate JSON request body
  let body: LoginBody;
  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return Response.json(
      { error: "Invalid credentials." },
      { status: 401, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } }
    );
  }

  const password = body?.password;
  if (typeof password !== "string" || password.length === 0) {
    return Response.json(
      { error: "Invalid credentials." },
      { status: 401, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } }
    );
  }

  // 4. Verify password against PBKDF2 hash
  const isMatch = await verifyPassword(password, env.INSTRUCTOR_PASSWORD_HASH);

  if (!isMatch) {
    return Response.json({ error: "Invalid credentials." }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }

  // Generate signed 12-hour session token
  const token = await createSessionToken(sessionSecret.trim());
  const isSecure = isRequestSecure(request);
  const cookieHeader = createSessionCookieHeader(token, isSecure);

  return Response.json(
    { success: true, message: "Authenticated." },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": cookieHeader,
        "Cache-Control": "no-store",
      },
    }
  );
};

export const onRequest: AppPagesFunction = async (context) => {
  const method = context.request.method.toUpperCase();
  if (method === "POST") return onRequestPost(context);
  return Response.json(
    { error: `Method ${method} not allowed.` },
    { status: 405, headers: { Allow: "POST", "Cache-Control": "no-store" } }
  );
};
