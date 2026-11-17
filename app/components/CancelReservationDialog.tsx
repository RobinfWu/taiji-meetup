"use client";

import { useEffect, useRef } from "react";

export function CancelReservationDialog({ student, className, date, busy, error, onConfirm, onKeep }: {
  student: string; className: string; date: string; busy: boolean; error: string;
  onConfirm: () => void; onKeep: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);
  return <dialog ref={ref} aria-labelledby="cancel-reservation-title" aria-describedby="cancel-reservation-description"
    onCancel={event => { event.preventDefault(); if (!busy) onKeep(); }}
    className="fixed m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-[#B9B1A3] bg-[#E8E4DA] p-6 text-[#171918] shadow-lg backdrop:bg-black/40">
    <h2 id="cancel-reservation-title" className="font-serif text-2xl">Cancel Reservation</h2>
    <p id="cancel-reservation-description" className="mt-4 text-sm leading-relaxed">Cancel the reservation for <strong>{student}</strong> for <strong>{className}</strong> on {date}? This will release their seat.</p>
    <p className="mt-3 text-xs text-[#5A5E5B]">The booking history will be retained. No cancellation email will be sent.</p>
    {error && <p role="alert" className="mt-4 text-sm text-[#9B3D2E]">{error}</p>}
    <div className="mt-6 flex flex-wrap gap-3">
      <button type="button" disabled={busy} onClick={onKeep} className="rounded-full border border-[#B9B1A3] px-5 py-2 text-sm font-semibold disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#243B45]">Keep Reservation</button>
      <button type="button" disabled={busy} onClick={onConfirm} className="rounded-full bg-[#9B3D2E] px-5 py-2 text-sm font-semibold text-white disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#243B45]">{busy ? "Cancelling…" : "Confirm"}</button>
    </div>
  </dialog>;
}
