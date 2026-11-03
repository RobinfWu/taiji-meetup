"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CalendarDays, CheckCircle2, LoaderCircle } from "lucide-react";

type Session = {
  id: string;
  start_at: string;
  end_at: string;
  location: string | null;
  available_spots: number;
  template: { title: string; location: string | null; timezone: string };
};
type BookingResult = {
  reservation_id: string;
  session_id: string;
  status: string;
  pricing: { category: string; first_reservation_free: boolean; amount_cents: number; currency: string };
  payment: null | { method: "cash" | "etransfer"; status: string; amount_cents: number; currency: string; reference: string };
};

const currency = (cents: number) => new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(cents / 100);
const formatSession = (session: Session) => {
  const timezone = session.template.timezone || "America/Toronto";
  const day = new Intl.DateTimeFormat("en-CA", { timeZone: timezone, weekday: "long", month: "long", day: "numeric", year: "numeric" }).format(new Date(session.start_at));
  const time = (iso: string) => new Intl.DateTimeFormat("en-CA", { timeZone: timezone, hour: "numeric", minute: "2-digit" }).format(new Date(iso));
  return `${day}, ${time(session.start_at)}–${time(session.end_at)}`;
};

export function PublicBookingForm() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("regular");
  const [method, setMethod] = useState("etransfer");
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<BookingResult | null>(null);
  const [verificationStep, setVerificationStep] = useState<"details" | "code">("details");
  const [verificationCode, setVerificationCode] = useState("");
  const [devCode, setDevCode] = useState("");

  async function refreshSessions(signal?: AbortSignal) {
    const response = await fetch("/api/classes", { cache: "no-store", signal });
    if (!response.ok) throw new Error("Unable to load upcoming classes right now.");
    const data: unknown = await response.json();
    if (!Array.isArray(data)) throw new Error("Unexpected class schedule response.");
    const upcoming = (data as Session[]).filter(s => s && typeof s.id === "string" && typeof s.available_spots === "number" && new Date(s.end_at).getTime() > Date.now());
    setSessions(upcoming);
    setSessionId(current => upcoming.some(s => s.id === current) ? current : (upcoming.find(s => s.available_spots > 0)?.id ?? ""));
  }

  useEffect(() => {
    const controller = new AbortController();

    async function loadInitialSessions() {
      try {
        const response = await fetch("/api/classes", {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load upcoming classes right now.");
        }

        const data: unknown = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Unexpected class schedule response.");
        }

        const upcoming = (data as Session[]).filter(
          s =>
            s &&
            typeof s.id === "string" &&
            typeof s.available_spots === "number" &&
            new Date(s.end_at).getTime() > Date.now()
        );

        if (controller.signal.aborted) return;

        setSessions(upcoming);
        setSessionId(current =>
          upcoming.some(s => s.id === current)
            ? current
            : (upcoming.find(s => s.available_spots > 0)?.id ?? "")
        );
        setLoadError("");
      } catch (err) {
        if (!controller.signal.aborted) {
          setLoadError(
            err instanceof Error
              ? err.message
              : "Unable to load classes."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadInitialSessions();

    return () => controller.abort();
  }, []);

  async function postJson(url: string, payload: Record<string, unknown>) {
    const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data: unknown = await response.json();
    if (!response.ok) {
      const message = typeof data === "object" && data !== null && "error" in data && typeof data.error === "string" ? data.error : "Request failed. Please try again.";
      throw new Error(message);
    }
    return data as Record<string, unknown>;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setError(""); setSubmitting(true);
    try {
      if (verificationStep === "details") {
        const data = await postJson("/api/public/verification/request", { email: email.trim() });
        setDevCode(typeof data.dev_code === "string" ? data.dev_code : "");
        setVerificationStep("code");
      } else {
        const verified = await postJson("/api/public/verification/confirm", { email: email.trim(), code: verificationCode.trim() });
        const token = verified.verification_token;
        if (typeof token !== "string") throw new Error("Verification response was invalid.");
        const booking = await postJson("/api/public/book", { first_name: firstName.trim(), last_name: lastName.trim(), email: email.trim(), ...(phone.trim() ? { phone: phone.trim() } : {}), session_id: sessionId, method, pricing_category: category, website, verification_token: token });
        setResult(booking as BookingResult);
        refreshSessions().catch(() => {});
      }
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to complete the request."); }
    finally { setSubmitting(false); }
  }

  const field = "w-full rounded-xl border border-[#C8C1B2] bg-[#F3EFE7] px-4 py-3 text-sm text-[#171918] outline-none focus:border-[#243B45] focus:ring-2 focus:ring-[#243B45]/15";
  const label = "block text-sm font-semibold text-[#303331] mb-1.5";
  const selected = sessions.find(s => s.id === sessionId);

  return (
    <section id="reserve" aria-labelledby="reserve-heading" className="scroll-mt-28 max-w-3xl mx-auto">
      <div className="text-center space-y-3 mb-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#243B45]">Reserve a place</span>
        <h2 id="reserve-heading" className="font-serif text-3xl sm:text-4xl font-light">Book a Class</h2>
        <p className="text-sm text-[#57625B]">Your first-ever reservation is free. No account required.</p>
      </div>
      <div className="bg-[#DFD9CC] rounded-3xl border border-[#D5CEBF] p-6 sm:p-9 shadow-xs">
        {result ? (
          <div className="space-y-5" role="status" aria-live="polite">
            <div className="flex items-center gap-3"><CheckCircle2 className="w-8 h-8 text-[#365F46]"/><h3 className="font-serif text-2xl">Reservation confirmed</h3></div>
            <p className="text-sm text-[#303331]">Your place has been reserved. Keep the reservation number below for your records.</p>
            <div className="rounded-xl bg-[#F3EFE7] border border-[#D5CEBF] p-4 space-y-2 text-sm break-words">
              <p><strong>Reservation:</strong> {result.reservation_id}</p>
              <p><strong>Class:</strong> {sessions.find(s => s.id === result.session_id)?.template.title ?? result.session_id}</p>
              <p><strong>Amount:</strong> {currency(result.pricing.amount_cents)} {result.pricing.first_reservation_free ? "(first reservation free)" : ""}</p>
              {result.payment && <><p><strong>Payment:</strong> {result.payment.method === "cash" ? "Cash at class" : "Interac e-Transfer"} — awaiting payment</p><p><strong>Reference:</strong> {result.payment.reference}</p></>}
            </div>
            {result.payment?.method === "etransfer" && <p className="text-sm text-[#303331]">Include the reference above when sending your e-Transfer. Contact the instructor for the transfer destination; do not send funds to an unverified address.</p>}
            {result.payment?.method === "cash" && <p className="text-sm text-[#303331]">Please bring cash to your class. Your seat is reserved while payment is pending.</p>}
            {result.payment === null && <p className="text-sm text-[#303331]">No payment is required for this reservation.</p>}
            <p className="text-xs text-[#57625B]">This page does not send an email confirmation yet. Save your reservation details before leaving.</p>
            <button type="button" onClick={() => { setResult(null); setError(""); setVerificationStep("details"); setVerificationCode(""); setDevCode(""); }} className="text-sm underline underline-offset-4 text-[#243B45]">Make another reservation</button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5">
            {verificationStep === "code" ? <div className="space-y-3">
              <p className="text-sm">We sent a six-digit verification code to <strong>{email}</strong>. Enter it below to confirm your email before reserving your seat. Codes expire after 10 minutes.</p>
              {devCode && <p className="text-sm text-[#365F46]">Local development test code: <strong>{devCode}</strong> (never shown on the live site).</p>}
              <label className={label} htmlFor="booking-code">Verification code *</label>
              <input id="booking-code" className={field} inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} required value={verificationCode} onChange={e => setVerificationCode(e.target.value)} />
              <button type="button" className="text-sm underline text-[#243B45]" onClick={() => { setVerificationStep("details"); setVerificationCode(""); setError(""); }}>Edit booking details or request another code</button>
            </div> : loading ? <p className="text-sm text-[#57625B]">Loading available classes…</p> : loadError ? <p role="alert" className="text-sm text-[#9B3D2E]">{loadError}</p> : sessions.length === 0 ? <p className="text-sm text-[#57625B]">No upcoming sessions are scheduled yet. Please check back later.</p> : <>
              <div><label className={label} htmlFor="booking-session">Class session *</label><select className={field} id="booking-session" required value={sessionId} onChange={e => setSessionId(e.target.value)}><option value="">Choose a session</option>{sessions.map(s => <option key={s.id} value={s.id} disabled={s.available_spots < 1}>{formatSession(s)} — {s.available_spots < 1 ? "Full" : `${s.available_spots} spots available`}</option>)}</select>{selected && <p className="mt-2 text-xs text-[#57625B]">{selected.template.title}{selected.location || selected.template.location ? ` · ${selected.location || selected.template.location}` : ""}</p>}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label className={label} htmlFor="booking-first">First name *</label><input className={field} id="booking-first" autoComplete="given-name" required maxLength={100} value={firstName} onChange={e => setFirstName(e.target.value)}/></div><div><label className={label} htmlFor="booking-last">Last name *</label><input className={field} id="booking-last" autoComplete="family-name" required maxLength={100} value={lastName} onChange={e => setLastName(e.target.value)}/></div></div>
              <div><label className={label} htmlFor="booking-email">Email *</label><input className={field} id="booking-email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)}/></div>
              <div><label className={label} htmlFor="booking-phone">Phone (optional)</label><input className={field} id="booking-phone" type="tel" autoComplete="tel" value={phone} onChange={e => setPhone(e.target.value)}/></div>
              <div><label className={label} htmlFor="booking-category">Pricing category *</label><select className={field} id="booking-category" value={category} onChange={e => setCategory(e.target.value)}><option value="regular">Regular — $20 per paid drop-in</option><option value="senior">Senior (65+) — $17 per paid drop-in</option><option value="student">Full-time student — $17 per paid drop-in</option></select><p className="mt-2 text-xs text-[#57625B]">Your first-ever reservation is free regardless of category. Discounts are self-declared and may be verified in person.</p></div>
              <div><label className={label} htmlFor="booking-method">Payment preference *</label><select className={field} id="booking-method" value={method} onChange={e => setMethod(e.target.value)}><option value="etransfer">Interac e-Transfer</option><option value="cash">Cash at class</option></select><p className="mt-2 text-xs text-[#57625B]">Payment is only required for returning students. Your final amount is determined by the server.</p></div>
              <div className="absolute -left-[9999px]" aria-hidden="true"><label htmlFor="booking-website">Website</label><input id="booking-website" tabIndex={-1} autoComplete="off" value={website} onChange={e => setWebsite(e.target.value)}/></div>
            </>}
              {error && <p role="alert" className="rounded-xl border border-[#9B3D2E]/30 bg-[#9B3D2E]/10 p-3 text-sm text-[#9B3D2E]">{error}</p>}
              <button type="submit" disabled={submitting || !sessionId} className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#171918] hover:bg-[#303331] disabled:opacity-50 text-[#E8E4DA] px-5 py-3.5 text-sm font-semibold transition-colors">{submitting && <LoaderCircle className="w-4 h-4 animate-spin"/>}{submitting ? "Processing…" : verificationStep === "details" ? <><CalendarDays className="w-4 h-4"/>Send verification code</> : "Verify email and reserve seat"}</button>
              <p className="text-xs text-[#57625B] text-center">A confirmed reservation holds your seat. Paid reservations are recorded as unpaid until verified by the instructor.</p>
          </form>
        )}
      </div>
    </section>
  );
}
