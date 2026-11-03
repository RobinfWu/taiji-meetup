import type { AppPagesFunction } from "../../types/env";
import { authenticateAdmin } from "../../lib/auth";

export const onRequestPost: AppPagesFunction = async (ctx) => {
  const auth = await authenticateAdmin(ctx.request, ctx.env);

  if (!auth.authorized) {
    return auth.response ?? Response.json(
      { error: "Unauthorized." },
      { status: 401 }
    );
  }

  const { RESEND_API_KEY, BOOKING_FROM_EMAIL } = ctx.env;

  if (!RESEND_API_KEY || !BOOKING_FROM_EMAIL) {
    return Response.json(
      { error: "Email delivery is not configured." },
      { status: 503 }
    );
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: BOOKING_FROM_EMAIL,
        to: ["chentaijilab@gmail.com"],
        subject: "Chen Taiji Lab - Cloudflare Integration Test",
        text:
          "This email was sent directly from your Cloudflare Pages " +
          "Function using the configured Resend secrets.",
      }),
    });

    if (!response.ok) {
      console.error("Resend integration test failed", response.status);

      return Response.json(
        { error: "Email delivery failed.", provider_status: response.status },
        { status: 502 }
      );
    }

    return Response.json(
      { message: "Test email accepted by Resend." },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Resend integration test error", error);

    return Response.json(
      { error: "Unable to contact email provider." },
      { status: 502 }
    );
  }
};
