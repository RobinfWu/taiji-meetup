"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Lock, Eye, EyeOff, LoaderCircle, AlertCircle, LogOut, CalendarDays, Users, CreditCard, RefreshCw, ChevronRight, ArrowLeft } from "lucide-react";

type UpcomingClass = {
  id: string;
  title: string;
  start_at: string;
  end_at: string;
  location: string;
  capacity: number;
  reserved_count: number;
};
type Overview = {
  upcoming_classes: UpcomingClass[];
  upcoming_reservations: number;
  pending_payments: { count: number; amount_cents: number; currency: string };
  active_memberships: number;
  generated_at: string;
};

type ClassSession = UpcomingClass & { status: string };
type ClassReservation = {
  id: string; status: string; source: string; created_at: string; cancelled_at: string | null;
  student_id: string; first_name: string; last_name: string; email: string; phone: string | null;
};

type ClassTemplate = { id: string; title: string; location: string; capacity: number };

// Convert between Toronto wall-clock times and UTC, checking for DST gaps/ambiguity.
function torontoLocal(iso: string): string {
  if (!iso) return "";
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date(iso));
  const get = (type: string) => parts.find(p => p.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`;
}
function toUtc(local: string): string {
  if (!/^\d{4}-\d\d-\d\dT\d\d:\d\d$/.test(local)) throw new Error("Enter a valid local date and time.");
  const target = Date.parse(`${local}:00Z`);
  if (Number.isNaN(target)) throw new Error("Invalid date/time.");
  const matches: string[] = [];
  // Both standard and daylight offsets are possible around clock changes.
  for (const hours of [4, 5]) {
    const candidate = new Date(target + hours * 3600000).toISOString();
    if (torontoLocal(candidate) === local) matches.push(candidate);
  }
  if (matches.length !== 1) throw new Error("This local time is invalid or ambiguous due to daylight saving. Choose another time.");
  return matches[0];
}
function ClassEditor({ existing, onSaved, onUnauthorized, onClose }: {
  existing?: ClassSession; onSaved: () => void; onUnauthorized: () => void; onClose: () => void;
}) {
  const [templates, setTemplates] = useState<ClassTemplate[]>([]);
  const [templateId, setTemplateId] = useState("");
  const initialStart = torontoLocal(existing?.start_at ?? "");
  const initialEnd = torontoLocal(existing?.end_at ?? "");
  const [startDate, setStartDate] = useState(initialStart.slice(0, 10));
  const [startTime, setStartTime] = useState(initialStart.slice(11));
  const [endDate, setEndDate] = useState(initialEnd.slice(0, 10));
  const [endTime, setEndTime] = useState(initialEnd.slice(11));
  const [location, setLocation] = useState(existing?.location ?? "");
  const [capacity, setCapacity] = useState(String(existing?.capacity ?? 15));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [reason, setReason] = useState("");
  useEffect(() => {
    if (existing) return;
    void fetch("/api/admin/classes/manage", { credentials: "same-origin", cache: "no-store" })
      .then(async r => { if (r.status === 401 || r.status === 403) { onUnauthorized(); return null; } if (!r.ok) throw new Error("Unable to load class types."); return r.json(); })
      .then((data: {templates: ClassTemplate[]} | null) => { if (data) setTemplates(data.templates); })
      .catch(() => setError("Unable to load class types."));
  }, [existing, onUnauthorized]);
  const inputClass = "w-full rounded-xl border border-[#B9B1A3] bg-[#E8E4DA] px-3 py-2 text-sm";
  async function request(action: "edit" | "cancel" | "create") {
    if (busy) return;
    if (action === "cancel" && !window.confirm("Cancel this class? It will disappear from public booking. Existing reservations remain recorded. You must notify attendees yourself.")) return;
    setBusy(true); setError("");
    try {
      const body = action === "cancel" ? { id: existing?.id, action, reason } : {
        ...(existing ? { id: existing.id, action: "edit" } : { template_id: templateId }),
        start_at: toUtc(`${startDate}T${startTime}`), end_at: toUtc(`${endDate}T${endTime}`), location: location.trim(), capacity: Number(capacity),
      };
      const res = await fetch("/api/admin/classes/manage", {
        method: action === "create" ? "POST" : "PATCH", credentials: "same-origin",
        headers: { "Content-Type": "application/json", "X-Admin-Action": "1" }, body: JSON.stringify(body),
      });
      if (res.status === 401 || res.status === 403) { onUnauthorized(); return; }
      const result = await res.json() as {error?: string};
      if (!res.ok) throw new Error(result.error ?? "Unable to save class.");
      onSaved();
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to save class."); }
    finally { setBusy(false); }
  }
  return <form onSubmit={e => { e.preventDefault(); void request(existing ? "edit" : "create"); }} className="rounded-2xl border border-[#B9B1A3] bg-[#DFD9CC] p-5 space-y-4">
    <h2 className="font-serif text-2xl">{existing ? "Edit class" : "Add class"}</h2>
    {!existing && <label className="block text-sm font-semibold">Class type
      <select required className={inputClass} value={templateId} onChange={e => {
        const id = e.target.value; setTemplateId(id);
        const template = templates.find(t => t.id === id);
        if (template) { setLocation(template.location); setCapacity(String(template.capacity)); }
      }}><option value="">Select class type</option>{templates.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}</select>
    </label>}
    <p className="text-xs text-[#5A5E5B]">All times are in Kingston (America/Toronto). Daylight-saving transitions are checked.</p>
    <div className="grid gap-3 sm:grid-cols-2">
      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold">Start (Kingston time)</legend>
        <label className="block text-xs font-medium">Date (YYYY-MM-DD)
          <input required type="text" inputMode="numeric" autoComplete="off" placeholder="2026-11-07" maxLength={10} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" title="Enter a date as YYYY-MM-DD" className={inputClass} value={startDate} onChange={e => setStartDate(e.target.value)} />
        </label>
        <label className="block text-xs font-medium">Time (24-hour HH:MM)
          <input required type="text" inputMode="numeric" autoComplete="off" placeholder="10:30" maxLength={5} pattern="(?:[01][0-9]|2[0-3]):[0-5][0-9]" title="Enter a 24-hour time as HH:MM" className={inputClass} value={startTime} onChange={e => setStartTime(e.target.value)} />
        </label>
      </fieldset>
      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold">End (Kingston time)</legend>
        <label className="block text-xs font-medium">Date (YYYY-MM-DD)
          <input required type="text" inputMode="numeric" autoComplete="off" placeholder="2026-11-07" maxLength={10} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" title="Enter a date as YYYY-MM-DD" className={inputClass} value={endDate} onChange={e => setEndDate(e.target.value)} />
        </label>
        <label className="block text-xs font-medium">Time (24-hour HH:MM)
          <input required type="text" inputMode="numeric" autoComplete="off" placeholder="12:00" maxLength={5} pattern="(?:[01][0-9]|2[0-3]):[0-5][0-9]" title="Enter a 24-hour time as HH:MM" className={inputClass} value={endTime} onChange={e => setEndTime(e.target.value)} />
        </label>
      </fieldset>
    </div>
    <label className="block text-sm font-semibold">Venue / meeting point<input required maxLength={300} className={inputClass} value={location} onChange={e => setLocation(e.target.value)} placeholder="Lake Ontario Park Pavilion (outdoors)" /></label>
    <label className="block text-sm font-semibold">Capacity<input required type="number" min={1} max={500} step={1} className={inputClass} value={capacity} onChange={e => setCapacity(e.target.value)} /></label>
    {existing && <p className="text-xs text-[#5A5E5B]">{existing.reserved_count} confirmed reservations. Capacity cannot be reduced below this number.</p>}
    {error && <p role="alert" className="text-sm text-[#9B3D2E]">{error}</p>}
    <div className="flex flex-wrap gap-2"><button disabled={busy} type="submit" className="rounded-full bg-[#243B45] text-white px-5 py-2 text-sm font-semibold disabled:opacity-50">{busy ? "Saving…" : existing ? "Save changes" : "Create class"}</button>
      <button type="button" onClick={onClose} className="rounded-full border border-[#B9B1A3] px-5 py-2 text-sm">Close</button></div>
    {existing && <div className="border-t border-[#B9B1A3] pt-4 space-y-2">
      <label className="block text-sm font-semibold">Cancellation reason (optional)<input maxLength={500} className={inputClass} value={reason} onChange={e => setReason(e.target.value)} /></label>
      <button type="button" disabled={busy} onClick={() => void request("cancel")} className="rounded-full border border-[#9B3D2E] text-[#9B3D2E] px-5 py-2 text-sm font-semibold disabled:opacity-50">Cancel this class</button>
      <p className="text-xs text-[#5A5E5B]">No automatic notifications are sent. Contact registered students manually.</p>
    </div>}
  </form>;
}

function InstructorClasses({ onUnauthorized, initialSessionId, onSessionOpen }: {
  onUnauthorized: () => void; initialSessionId: string | null; onSessionOpen: (id: string | null) => void;
}) {
  const [classes, setClasses] = useState<ClassSession[]>([]);
  const [session, setSession] = useState<ClassSession | null>(null);
  const [reservations, setReservations] = useState<ClassReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);
  const [editing, setEditing] = useState<"new" | "current" | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true); setError("");
      try {
        const path = initialSessionId
          ? `/api/admin/classes?session_id=${encodeURIComponent(initialSessionId)}`
          : "/api/admin/classes";
        const res = await fetch(path, { cache: "no-store", credentials: "same-origin", signal: controller.signal });
        if (res.status === 401 || res.status === 403) { onUnauthorized(); return; }
        if (!res.ok) throw new Error(res.status === 404 ? "Class not found." : "Unable to load classes.");
        if (initialSessionId) {
          const payload = (await res.json()) as { session: ClassSession; reservations: ClassReservation[] };
          setSession(payload.session); setReservations(payload.reservations);
        } else {
          const payload = (await res.json()) as { classes: ClassSession[] };
          setClasses(payload.classes); setSession(null); setReservations([]);
        }
      } catch (err) {
        if (!controller.signal.aborted) setError(err instanceof Error ? err.message : "Unable to load classes.");
      } finally { if (!controller.signal.aborted) setLoading(false); }
    }
    void load();
    return () => controller.abort();
  }, [initialSessionId, onUnauthorized, reload]);
  const formatDate = (iso: string) => new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto", weekday: "short", month: "short", day: "numeric", year: "numeric",
    hour: "numeric", minute: "2-digit",
  }).format(new Date(iso));
  return <section className="w-full max-w-5xl space-y-6" aria-label="Class management">
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9B3D2E]">Instructor workspace / Classes</p>
        <h1 className="font-serif text-4xl mt-1">{initialSessionId ? "Class Roster" : "Class Management"}</h1>
        <p className="text-sm text-[#5A5E5B] mt-2">Create, edit or cancel individual sessions. Changes appear on the public booking form.</p>
      </div>
      <button type="button" onClick={() => setReload(n => n + 1)} disabled={loading}
        className="inline-flex items-center gap-2 rounded-full border border-[#B9B1A3] px-4 py-2 text-sm font-semibold disabled:opacity-50">
        <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
      </button>
    </div>
    {!initialSessionId && <button type="button" onClick={() => setEditing("new")} className="rounded-full bg-[#243B45] text-white px-5 py-2 text-sm font-semibold">+ Add class</button>}
    {initialSessionId && session?.status === "scheduled" && <button type="button" onClick={() => setEditing("current")} className="rounded-full bg-[#243B45] text-white px-5 py-2 text-sm font-semibold">Edit / Cancel class</button>}
    {editing && <ClassEditor key={editing + (session?.id ?? "")} existing={editing === "current" ? session ?? undefined : undefined} onUnauthorized={onUnauthorized} onClose={() => setEditing(null)} onSaved={() => { setEditing(null); setReload(n => n + 1); }} />}
    {initialSessionId && <button type="button" onClick={() => { setEditing(null); onSessionOpen(null); }} className="inline-flex items-center gap-2 text-sm font-semibold text-[#243B45] hover:underline"><ArrowLeft className="w-4 h-4"/> All classes</button>}
    {error && <p role="alert" className="rounded-xl border border-[#9B3D2E]/40 p-4 text-sm text-[#9B3D2E]">{error}</p>}
    {loading ? <p role="status" className="text-sm text-[#5A5E5B]">Loading class information…</p> : !error && (
      initialSessionId ? (session && <div className="rounded-2xl border border-[#D5CEBF] bg-[#DFD9CC] overflow-hidden">
        <div className="px-5 sm:px-6 py-5 border-b border-[#D5CEBF] space-y-2">
          <h2 className="font-serif text-2xl">{session.title}</h2>
          <p className="text-sm text-[#5A5E5B]">{formatDate(session.start_at)} · {session.location}</p>
          <p className="text-sm font-semibold">{session.reserved_count} / {session.capacity} confirmed seats · Class {session.status}</p>
        </div>
        <div className="px-5 sm:px-6 py-4 border-b border-[#D5CEBF]">
          <h3 className="font-semibold">Reservations ({reservations.length})</h3>
          <p className="text-xs text-[#5A5E5B] mt-1">Cancelled reservations appear for reference but do not occupy seats. Attendance tracking is not enabled yet.</p>
        </div>
        {reservations.length === 0 ? <p className="p-6 text-sm text-[#5A5E5B]">No reservations for this class.</p> :
          <ul className="divide-y divide-[#D5CEBF]">{reservations.map(r => <li key={r.id} className="px-5 sm:px-6 py-4 flex flex-wrap justify-between gap-3">
            <div className="min-w-0 space-y-1">
              <p className="font-semibold text-sm">{r.first_name} {r.last_name}</p>
              <p className="text-xs text-[#5A5E5B] break-all">{r.email}{r.phone ? ` · ${r.phone}` : ""}</p>
              <p className="text-xs text-[#5A5E5B]">{r.source === "membership" ? "Membership" : "Drop-in"} · Booked {formatDate(r.created_at)}</p>
            </div>
            <span className="self-start rounded-full bg-[#E8E4DA] border border-[#D5CEBF] px-3 py-1 text-xs font-semibold capitalize">{r.status}</span>
          </li>)}</ul>}
      </div>) : <div className="rounded-2xl border border-[#D5CEBF] bg-[#DFD9CC] overflow-hidden">
        <div className="px-5 sm:px-6 py-5 border-b border-[#D5CEBF]">
          <h2 className="font-serif text-2xl">Scheduled sessions</h2>
          <p className="text-xs text-[#5A5E5B] mt-1">Up to 100 upcoming and recent sessions. Select one to view its roster.</p>
        </div>
        {classes.length === 0 ? <p className="p-6 text-sm text-[#5A5E5B]">No classes found.</p> : <ul className="divide-y divide-[#D5CEBF]">{classes.map(cls =>
          <li key={cls.id}><button type="button" onClick={() => onSessionOpen(cls.id)} className="w-full text-left px-5 sm:px-6 py-4 flex items-center justify-between gap-4 hover:bg-[#E8E4DA]/60 focus-visible:outline-2 focus-visible:outline-[#243B45]">
            <div className="min-w-0"><p className="font-semibold text-sm">{cls.title}</p><p className="text-xs text-[#5A5E5B] mt-1">{formatDate(cls.start_at)} · {cls.location}</p><p className="text-xs text-[#5A5E5B] mt-1 capitalize">{cls.status}</p></div>
            <div className="flex items-center gap-2 shrink-0"><span className="rounded-full bg-[#E8E4DA] border border-[#D5CEBF] px-3 py-1.5 text-xs font-semibold">{cls.reserved_count} / {cls.capacity}</span><ChevronRight className="w-4 h-4"/></div>
          </button></li>)}</ul>}
      </div>
    )}
  </section>;
}

function InstructorOverview({ onUnauthorized, onSessionOpen }: { onUnauthorized: () => void; onSessionOpen: (id: string) => void }) {
  const [data, setData] = useState<Overview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/admin/overview", {
          cache: "no-store", credentials: "same-origin", signal: controller.signal,
        });
        if (res.status === 401 || res.status === 403) {
          onUnauthorized();
          return;
        }
        if (!res.ok) throw new Error("Unable to load overview. Please retry.");
        setData((await res.json()) as Overview);
      } catch (err) {
        if (!controller.signal.aborted) setError(err instanceof Error ? err.message : "Unable to load overview.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void load();
    return () => controller.abort();
  }, [reload, onUnauthorized]);

  const money = (cents: number) => new Intl.NumberFormat("en-CA", {
    style: "currency", currency: "CAD",
  }).format(cents / 100);
  const dateTime = (iso: string) => new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto", weekday: "short", month: "short", day: "numeric",
    hour: "numeric", minute: "2-digit",
  }).format(new Date(iso));

  return (
    <section className="w-full max-w-5xl space-y-7" aria-label="Instructor dashboard">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9B3D2E]">Instructor workspace</p>
          <h1 className="font-serif text-4xl text-[#171918] mt-1">School Overview</h1>
          <p className="text-sm text-[#5A5E5B] mt-2">Current reservations, payments, and memberships.</p>
        </div>
        <button type="button" onClick={() => setReload(v => v + 1)} disabled={loading}
          className="inline-flex items-center gap-2 rounded-full border border-[#B9B1A3] px-4 py-2 text-sm font-semibold hover:bg-[#DFD9CC] disabled:opacity-50">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>
      {error && <div role="alert" className="rounded-xl border border-[#9B3D2E]/40 bg-[#9B3D2E]/10 p-4 text-sm text-[#9B3D2E]">{error}</div>}
      {loading && !data ? <p role="status" className="text-sm text-[#5A5E5B]">Loading overview…</p> : data && <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Next classes listed", value: String(data.upcoming_classes.length), note: "Next five shown below", icon: CalendarDays },
            { label: "Confirmed reservations", value: String(data.upcoming_reservations), note: "For upcoming classes", icon: Users },
            { label: "Unpaid payments", value: String(data.pending_payments.count), note: `${money(data.pending_payments.amount_cents)} outstanding`, icon: CreditCard },
            { label: "Active memberships", value: String(data.active_memberships), note: "Currently within date range", icon: Users },
          ].map(card => <div key={card.label} className="rounded-2xl bg-[#DFD9CC] border border-[#D5CEBF] p-5 space-y-3">
            <div className="flex items-center justify-between text-[#243B45]"><span className="text-xs uppercase tracking-wider font-semibold">{card.label}</span><card.icon className="w-5 h-5" /></div>
            <p className="font-serif text-4xl text-[#171918]">{card.value}</p>
            <p className="text-xs text-[#5A5E5B]">{card.note}</p>
          </div>)}
        </div>
        <div className="rounded-2xl bg-[#DFD9CC] border border-[#D5CEBF] overflow-hidden">
          <div className="px-5 sm:px-6 py-5 border-b border-[#D5CEBF]">
            <h2 className="font-serif text-2xl">Next scheduled classes</h2>
            <p className="text-xs text-[#5A5E5B] mt-1">Confirmed seats only; cancelled reservations are excluded.</p>
          </div>
          {data.upcoming_classes.length === 0 ? <p className="px-6 py-8 text-sm text-[#5A5E5B]">No upcoming scheduled classes.</p> :
            <ul className="divide-y divide-[#D5CEBF]">
              {data.upcoming_classes.map(cls => <li key={cls.id} className="px-5 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                <div><p className="font-semibold text-sm">{cls.title}</p><p className="text-xs text-[#5A5E5B] mt-1">{dateTime(cls.start_at)} · {cls.location}</p></div>
                <button type="button" onClick={() => onSessionOpen(cls.id)} className="rounded-full bg-[#E8E4DA] border border-[#D5CEBF] px-3 py-1.5 text-xs font-semibold whitespace-nowrap hover:bg-white focus-visible:outline-2 focus-visible:outline-[#243B45]">{cls.reserved_count} / {cls.capacity} reserved · View roster</button>
              </li>)}
            </ul>}
        </div>
        <p className="text-xs text-[#5A5E5B]">Updated {dateTime(data.generated_at)} (Kingston time). Read-only overview; no booking or payment changes are made here.</p>
      </>}
    </section>
  );
}

export default function AdminPage() {
  const [checkingSession, setCheckingSession] = useState(true);
  const [adminView, setAdminView] = useState<"overview" | "classes">("overview");
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const onUnauthorized = React.useCallback(() => setIsAuthenticated(false), []);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [retryAfterSeconds, setRetryAfterSeconds] = useState<number | null>(null);

  // Check existing session status on mount
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/admin/auth/session", {
          cache: "no-store",
        });
        if (res.ok) {
          const data = (await res.json()) as { authenticated?: boolean };
          setIsAuthenticated(Boolean(data.authenticated));
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setCheckingSession(false);
      }
    }

    checkSession();
  }, []);

  // Countdown timer for rate limiting lockout
  useEffect(() => {
    if (retryAfterSeconds === null || retryAfterSeconds <= 0) return;
    const interval = setInterval(() => {
      setRetryAfterSeconds((prev) => (prev !== null && prev > 1 ? prev - 1 : null));
    }, 1000);
    return () => clearInterval(interval);
  }, [retryAfterSeconds]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!password || submitting) return;

    setSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Action": "1",
        },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setPassword("");
        setIsAuthenticated(true);
        setErrorMessage("");
        setRetryAfterSeconds(null);
      } else if (res.status === 429) {
        const retryHeader = res.headers.get("Retry-After");
        const seconds = retryHeader ? parseInt(retryHeader, 10) : 900;
        setRetryAfterSeconds(isNaN(seconds) ? 900 : seconds);
        setErrorMessage("Too many failed attempts. Login is temporarily locked.");
      } else {
        setErrorMessage("Invalid credentials.");
      }
    } catch {
      setErrorMessage("Network error. Unable to reach server.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLogout() {
    setSubmitting(true);
    try {
      await fetch("/api/admin/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Action": "1",
        },
      });
      setIsAuthenticated(false);
      setPassword("");
      setErrorMessage("");
    } catch (err) {
      console.error("Logout request failed:", err);
      setIsAuthenticated(false);
    } finally {
      setSubmitting(false);
    }
  }

  if (checkingSession) {
    return (
      <main className="min-h-screen bg-[#E8E4DA] text-[#171918] flex items-center justify-center p-4">
        <div className="flex flex-col items-center space-y-3">
          <LoaderCircle className="w-8 h-8 animate-spin text-[#243B45]" />
          <p className="text-xs uppercase tracking-widest text-[#5A5E5B] font-semibold">
            Checking session...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#E8E4DA] text-[#171918] flex flex-col justify-between selection:bg-[#9B3D2E]/15 selection:text-[#9B3D2E]">
      {/* Top Bar */}
      <header className="border-b border-[#D5CEBF] bg-[#DFD9CC]/50 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 text-left group">
            <div className="w-8 h-8 rounded-full bg-[#171918] text-[#E8E4DA] flex items-center justify-center font-serif text-base font-bold border border-[#303331] group-hover:border-[#9B3D2E] transition-colors">
              ☯
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-wide text-[#171918]">
                TAIJI LAB
              </span>
              <span className="text-xs text-[#5A5E5B] ml-2 font-mono uppercase">
                / Instructor
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="text-xs text-[#5A5E5B] hover:text-[#171918] transition-colors font-medium"
          >
            ← Back to Public Site
          </Link>
        </div>
      </header>

      {/* Main Content Card */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className={isAuthenticated ? "w-full max-w-5xl space-y-6" : "w-full max-w-md bg-[#DFD9CC] rounded-3xl border border-[#D5CEBF] p-8 sm:p-10 shadow-xs space-y-6"}>
          {isAuthenticated ? (
            <div className="space-y-5">
              <nav aria-label="Instructor sections" className="flex gap-2 border-b border-[#D5CEBF] pb-4">
                <button type="button" onClick={() => { setAdminView("overview"); setSelectedSessionId(null); }} aria-current={adminView === "overview" ? "page" : undefined} className={`rounded-full px-4 py-2 text-sm font-semibold ${adminView === "overview" ? "bg-[#243B45] text-white" : "border border-[#B9B1A3]"}`}>Overview</button>
                <button type="button" onClick={() => { setAdminView("classes"); setSelectedSessionId(null); }} aria-current={adminView === "classes" ? "page" : undefined} className={`rounded-full px-4 py-2 text-sm font-semibold ${adminView === "classes" ? "bg-[#243B45] text-white" : "border border-[#B9B1A3]"}`}>Classes</button>
              </nav>
              {adminView === "overview" ? <InstructorOverview onUnauthorized={onUnauthorized} onSessionOpen={(id) => { setSelectedSessionId(id); setAdminView("classes"); }} /> : <InstructorClasses onUnauthorized={onUnauthorized} initialSessionId={selectedSessionId} onSessionOpen={setSelectedSessionId} />}
              <div className="flex justify-end">
                <button type="button" onClick={handleLogout} disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-full bg-[#171918] text-[#E8E4DA] px-5 py-3 text-xs font-semibold disabled:opacity-50">
                  <LogOut className="w-4 h-4" /> {submitting ? "Signing Out..." : "Sign Out"}
                </button>
              </div>
            </div>
          ) : (
            /* Minimal Ink Login Form */
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#243B45]/10 text-[#243B45] flex items-center justify-center mx-auto border border-[#243B45]/20 mb-3">
                  <Lock className="w-5 h-5" />
                </div>
                <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#171918]">
                  Instructor Sign In
                </h1>
                <p className="text-xs text-[#5A5E5B] leading-relaxed font-light">
                  Chen Taiji Lab school management and reservation portal.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3.5 rounded-2xl bg-[#9B3D2E]/10 border border-[#9B3D2E]/30 flex items-start space-x-3 text-xs text-[#9B3D2E]">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold">{errorMessage}</p>
                    {retryAfterSeconds !== null && (
                      <p className="text-xs opacity-90">
                        Retry in {Math.floor(retryAfterSeconds / 60)}m {retryAfterSeconds % 60}s
                      </p>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-1.5">
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#303331]"
                  >
                    Instructor Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={submitting || retryAfterSeconds !== null}
                      placeholder="••••••••••••"
                      autoComplete="current-password"
                      className="w-full px-4 py-3 bg-[#E8E4DA] border border-[#D5CEBF] rounded-2xl text-sm text-[#171918] placeholder-[#5A5E5B]/50 focus:outline-hidden focus:border-[#243B45] focus:ring-1 focus:ring-[#243B45] transition-all disabled:opacity-50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={submitting || retryAfterSeconds !== null}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5A5E5B] hover:text-[#171918] cursor-pointer"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting || !password || retryAfterSeconds !== null}
                  className="w-full flex items-center justify-center space-x-2 bg-[#9B3D2E] hover:bg-[#7D3024] text-white py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed border border-[#9B3D2E]"
                >
                  {submitting ? (
                    <>
                      <LoaderCircle className="w-4 h-4 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <span>Sign In</span>
                  )}
                </button>
              </form>

              <div className="text-center pt-2">
                <p className="text-[11px] text-[#5A5E5B]">
                  Sessions expire automatically after 12 hours.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Note */}
      <footer className="text-center py-4 text-xs text-[#5A5E5B] border-t border-[#D5CEBF]/50">
        Chen Taiji Lab &middot; Kingston, Ontario &middot; All Rights Reserved
      </footer>
    </main>
  );
}
