import type { AppPagesFunction } from "../../../types/env";
import { createLogoutCookieHeader, isRequestSecure, verifyCsrf } from "../../../lib/auth";

export const onRequestPost: AppPagesFunction = async (context) => {
  const { request } = context;

  // Verify CSRF protection for browser logout actions
  if (!verifyCsrf(request)) {
    return Response.json(
      { error: "Forbidden: CSRF validation failed." },
      { status: 403, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } }
    );
  }

  const isSecure = isRequestSecure(request);
  const cookieHeader = createLogoutCookieHeader(isSecure);

  return Response.json(
    { success: true, message: "Logged out." },
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
