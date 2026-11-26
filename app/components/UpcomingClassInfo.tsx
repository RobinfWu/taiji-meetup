"use client";

import Link from "next/link";
import { usePublicClasses } from "./PublicClassesProvider";
import { parkClassDetails } from "../../functions/lib/introClass";
import { PAID_DROP_IN_RATES } from "../../functions/lib/publicBookingPricing";

export function UpcomingClassInfo({ variant = "summary" }: { variant?: "hero" | "schedule" | "location" | "summary" | "full" }) {
  const { sessions, loading, error, refresh } = usePublicClasses();
  const session = sessions[0];
  const wrapper = variant === "full" ? "max-w-3xl mx-auto bg-[#DFD9CC] p-6 sm:p-10 rounded-3xl border border-[#D5CEBF] space-y-5" : "space-y-3";
  if (loading || error || !session) return <div className={wrapper} role="status">
    <p className="text-sm text-[#303331]">{loading ? "Loading upcoming class details…" : error || "No upcoming classes are currently published. Please check back for the next date."}</p>
    {error && <button type="button" onClick={() => void refresh()} className="text-sm text-[#243B45] underline underline-offset-4">Try again</button>}
  </div>;
  const date = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", weekday: "long", month: "long", day: "numeric", year: "numeric" }).format(new Date(session.start_at));
  const time = (iso: string) => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", hour: "numeric", minute: "2-digit", timeZoneName: "short" }).format(new Date(iso));
  const location = session.location || session.template.location;
  const park = parkClassDetails({ ...session, location });
  const maps = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location)}`;
  const price = session.price_cents === 0 ? "Free class · CAD $0" : `First visit free · Returning students $${PAID_DROP_IN_RATES.regular/100} CAD`;
  const locationInfo = <div className="space-y-3 text-sm leading-relaxed text-[#303331]">
    <p className="font-semibold text-[#171918]">{location}</p>
    {park && <p>{park.meeting}</p>}
    {location && <a href={maps} target="_blank" rel="noopener noreferrer" className="inline-block text-[#243B45] underline underline-offset-4">Directions to class</a>}
    {park && <p>{park.weather}</p>}
  </div>;
  if (variant === "location") return locationInfo;
  return <div className={wrapper}>
    {variant === "full" ? <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#171918]">{session.template.title}</h2> : variant !== "schedule" && <h3 className="font-serif text-lg sm:text-2xl font-semibold text-[#171918]">{session.template.title}</h3>}
    <div className={variant === "hero" ? "text-xs text-[#303331] space-y-2" : "text-sm text-[#303331] space-y-2"}>
      <p className="font-semibold">{date}</p>
      <p>{time(session.start_at)}–{time(session.end_at)}</p>
      <p className="font-semibold text-[#365F46]">{price}</p>
      <p>{session.available_spots > 0 ? `${session.available_spots} places available · Booking required` : "This class is full."}</p>
      {variant === "hero" && <p>{location}</p>}
      {variant === "full" && <p className="leading-relaxed">{session.template.description}</p>}
    </div>
    {(variant === "summary" || variant === "full") && locationInfo}
    {(variant === "hero" || variant === "full") && <Link href={variant === "full" ? "#reserve" : "/classes#reserve"} className="inline-flex w-full sm:w-auto justify-center rounded-full bg-[#9B3D2E] px-6 py-3 text-sm font-semibold text-white hover:bg-[#7D3024]">{session.available_spots > 0 ? "Reserve Your Spot →" : "View booking availability →"}</Link>}
  </div>;
}
