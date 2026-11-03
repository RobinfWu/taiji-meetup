import type { AppPagesFunction } from "../../../types/env";
import { authenticateAdmin } from "../../../lib/auth";

export const onRequestGet: AppPagesFunction = async (context) => {
  const auth = await authenticateAdmin(context.request, context.env);

  if (!auth.authorized) {
    return Response.json(
      { authenticated: false },
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
  }

  return Response.json(
    {
      authenticated: true,
      authType: auth.authType,
    },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    }
  );
};

export const onRequest: AppPagesFunction = async (context) => {
  const method = context.request.method.toUpperCase();
  if (method === "GET") return onRequestGet(context);
  return Response.json(
    { error: `Method ${method} not allowed.` },
    { status: 405, headers: { Allow: "GET", "Cache-Control": "no-store" } }
  );
};
