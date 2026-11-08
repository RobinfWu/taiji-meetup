"use client";

import React, { useEffect, useRef, useState } from "react";
import { Send, CheckCircle2, Mail } from "lucide-react";
import { TAIJI_DATA } from "../data/taijiData";

interface ContactFormProps {
  className?: string;
  darkVariant?: boolean;
  heading?: string;
  showEyebrow?: boolean;
  description?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  className = "",
  heading = "Interested in joining?",
  description = "Ask about training, accessibility, or anything you would like to know before attending. To reserve a place, use the booking form on the Classes page. If you’re interested in joining, let me know which Saturday or Sunday time windows generally work for you.",
  darkVariant = false
}) => {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const widget = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey) return;
    let active = true;
    const render = () => {
      if (!active || !widget.current || widgetId.current !== undefined || !window.turnstile) return;
      widgetId.current = window.turnstile.render(widget.current, {
        sitekey: siteKey,
        callback: (value: string) => setToken(value),
        "expired-callback": () => setToken(""),
        "error-callback": () => setToken(""),
      });
      if (poll) clearInterval(poll);
    };
    let script = document.querySelector<HTMLScriptElement>('script[data-taiji-turnstile]');
    if (!script) {
      script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.dataset.taijiTurnstile = "true";
      document.head.appendChild(script);
    }
    script.addEventListener("load", render);
    const poll = setInterval(render, 250);
    render();
    return () => {
      active = false;
      script?.removeEventListener("load", render);
      if (poll) clearInterval(poll);
      if (widgetId.current !== undefined) window.turnstile?.remove(widgetId.current);
      widgetId.current = undefined;
    };
  }, [siteKey]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    setError("");
    if (!siteKey || !token) {
      setError("Please complete the verification before sending.");
      return;
    }
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const response = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"), email: data.get("email"),
          message: data.get("message"), website: data.get("website"), turnstileToken: token,
        }),
      });
      const result: { error?: string } = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to send your message.");
      setStatus("sent");
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Unable to send your message.");
      setToken("");
      if (widgetId.current !== undefined) window.turnstile?.reset(widgetId.current);
    }
  }

  const inputClass = `w-full px-4 py-3 rounded-2xl text-sm transition-colors outline-none border ${
    darkVariant
      ? "bg-[#242725] text-[#E8E4DA] border-[#303331] focus:border-[#9B3D2E]"
      : "bg-[#E8E4DA] text-[#171918] border-[#D5CEBF] focus:border-[#243B45]"
  }`;



  return (
    <div
      className={`rounded-3xl p-8 sm:p-12 border shadow-xs transition-all duration-300 ${
        darkVariant
          ? "bg-[#171918] text-[#E8E4DA] border-[#303331]"
          : "bg-[#DFD9CC] text-[#171918] border-[#D5CEBF]"
      } ${className}`}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl font-light">
            {heading}
          </h2>
          <p
            className={`text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed ${
              darkVariant ? "text-[#DFD9CC]" : "text-[#303331]"
            }`}
          >
            {description}
          </p>
        </div>

        {status === "sent" ? (
          /* Success state */
          <div className="py-10 text-center space-y-4 animate-in fade-in duration-300">
            <div className="w-14 h-14 rounded-full bg-[#243B45]/20 text-[#243B45] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-[#9B3D2E]" />
            </div>
            <h3 className="font-serif text-2xl font-semibold">Message Sent!</h3>
            <p className="text-sm font-light max-w-md mx-auto">
              Thanks for reaching out. Your message has been delivered.
            </p>
            <div className="pt-2">
              <a
                href={`mailto:${TAIJI_DATA.contact.email}`}
                className="text-xs text-[#8A7250] underline hover:text-[#9B3D2E] transition-colors inline-flex items-center space-x-1"
              >
                <Mail className="w-3 h-3" />
                <span>Or email us directly at {TAIJI_DATA.contact.email}</span>
              </a>
            </div>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            {error && <p role="alert" className="text-sm text-[#C87567]">{error}</p>}
            <div className="absolute -left-[10000px]" aria-hidden="true">
              <label htmlFor="contact-website">Website</label>
              <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-[#8A7250]">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  className={inputClass}
                />

              </div>

              {/* Email */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[#8A7250]">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className={inputClass}
                />

              </div>
            </div>

            {/* Message */}
            <div className="space-y-1.5 text-left">
              <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-[#8A7250]">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                required
                maxLength={4000}
                placeholder="Ask a question or let us know when you'd like to drop in..."
                className={`${inputClass} resize-none`}
              />

            </div>

            <div ref={widget} aria-label="Spam protection verification" />
            {!siteKey && <p role="alert" className="text-sm text-[#C87567]">Contact form is not configured yet.</p>}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="submit"
                disabled={status === "sending" || !siteKey || !token}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#9B3D2E] hover:bg-[#7D3024] disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-3.5 rounded-full text-sm font-bold shadow-md transition-all cursor-pointer active:scale-98 border border-[#9B3D2E]"
              >
                <span>{status === "sending" ? "Sending…" : "Send"}</span>
                <Send className="w-4 h-4 text-white" />
              </button>

              <a
                href={`mailto:${TAIJI_DATA.contact.email}`}
                className="text-xs text-[#8A7250] hover:text-[#9B3D2E] transition-colors flex items-center space-x-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email us directly</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// Cloudflare Turnstile is loaded at runtime (no additional npm dependency).
declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement, options: Record<string, unknown>) => string;
      reset: (id: string) => void;
      remove: (id: string) => void;
    };
  }
}
