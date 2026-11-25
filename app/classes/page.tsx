import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { PublicBookingForm } from "../components/PublicBookingForm";
import { IntroClassLocation } from "../components/IntroClassLocation";
import { upcomingClass } from "../../functions/lib/introClass";

export const metadata: Metadata = {
  title: "Tai Chi Classes & Schedule in Kingston | Chen Taiji Lab",
};

export default function ClassesPage() {
  return (
    <main className="min-h-screen bg-[#E8E4DA] text-[#171918] relative flex flex-col font-sans selection:bg-[#9B3D2E]/15 selection:text-[#9B3D2E]">
      <Navbar />
      <div className="flex-1 pt-28 pb-20">
        <section className="py-12 md:py-16 bg-[#DFD9CC]/60 border-b border-[#D5CEBF] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#243B45]">Beginners welcome</span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light">Classes & <span className="font-normal italic text-[#243B45]">Schedule</span></h1>
              <p className="text-lg text-[#303331] leading-relaxed font-light">Join Robin Wu for Chen Taijiquan in Kingston. Our first introductory class has taken place, and beginners are welcome at the next session. No prior experience required.</p>
              <p className="text-sm text-[#57625B] leading-relaxed">{upcomingClass.future}</p>
            </div>
          </div>
        </section>
        <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <section aria-labelledby="intro-heading" className="max-w-3xl mx-auto bg-[#DFD9CC] p-6 sm:p-10 rounded-3xl border border-[#D5CEBF] space-y-6 shadow-xs">
            <h2 id="intro-heading" className="font-serif text-2xl sm:text-3xl font-semibold">{upcomingClass.title}</h2>
            <div className="space-y-2 text-base text-[#303331]">
              <p className="flex items-start gap-3"><Calendar aria-hidden="true" className="w-5 h-5 mt-0.5 shrink-0 text-[#8A7250]" /><span className="font-semibold">{upcomingClass.date}<br />{upcomingClass.time}</span></p>
              <p className="font-semibold text-[#365F46]">{upcomingClass.priceNote} · Booking required</p>
              <p>{upcomingClass.description}</p>

            </div>
            <div className="border-t border-[#C8C1B2] pt-5 space-y-3">
              <h3 className="font-serif text-xl flex items-center gap-2"><MapPin aria-hidden="true" className="w-5 h-5 text-[#243B45]" />Where we meet</h3>
              <IntroClassLocation />
              <p className="text-sm leading-relaxed text-[#303331]">{upcomingClass.weather}</p>
            </div>
            <Link href="#reserve" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#9B3D2E] px-6 py-3 text-sm font-semibold text-white hover:bg-[#7D3024]">Reserve Your Spot <ArrowRight aria-hidden="true" className="w-4 h-4" /></Link>
          </section>
          <PublicBookingForm />
        {/* Fees & Membership */}
        <section aria-labelledby="fees-heading" className="max-w-3xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#243B45]">
              Simple, Transparent Pricing
            </span>
            <h2
              id="fees-heading"
              className="font-serif text-3xl sm:text-4xl font-light text-[#171918]"
            >
              Fees & Membership
            </h2>
            <p className="text-sm text-[#57625B] font-light">
              Your first visit is free, with no commitment required. Returning students can book a drop-in class for $20. All prices are in CAD.
            </p>
          </div>

          <p className="text-center text-sm text-[#57625B]">Drop-in booking is available for the announced session. Monthly memberships are not yet available; the monthly price below remains planned and will be confirmed before memberships begin.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-[#DFD9CC] rounded-3xl border border-[#D5CEBF] p-7 space-y-3">
              <h3 className="font-serif text-xl font-semibold">Drop-in</h3>
              <p className="font-serif text-4xl text-[#171918]">
                $20<span className="text-base text-[#57625B]"> / class</span>
              </p>
              <p className="text-sm text-[#57625B]">
                Pay for individual classes as you attend.
              </p>
            </div>

            <div className="bg-[#DFD9CC] rounded-3xl border border-[#D5CEBF] p-7 space-y-3">
              <h3 className="font-serif text-xl font-semibold">Monthly</h3>
              <p className="font-serif text-4xl text-[#171918]">
                $70<span className="text-base text-[#57625B]"> / month</span>
              </p>
              <p className="text-sm text-[#57625B]">
                Covers all weekly classes that month. Members may send their practice videos between classes for personalized written feedback.
              </p>
            </div>

          </div>

          <div className="bg-[#DFD9CC] rounded-2xl border border-[#D5CEBF] p-6 sm:p-8 space-y-3 text-sm text-[#303331]">
            <p>
              <strong className="text-[#171918]">Payment method for future paid classes:</strong>{" "}
              Interac e-Transfer to <strong>chentaijilab@gmail.com</strong> or cash in person.
            </p>
          </div>
        </section>


          <section aria-labelledby="preparation-heading" className="max-w-3xl mx-auto bg-[#DFD9CC] p-6 sm:p-10 rounded-3xl border border-[#D5CEBF] space-y-4">
            <h2 id="preparation-heading" className="font-serif text-2xl sm:text-3xl font-light">What to wear & bring</h2>
            <p className="text-sm text-[#303331] leading-relaxed">{upcomingClass.preparation}</p>
            <p className="text-sm text-[#303331] leading-relaxed">Your first class introduces stance, posture, weight shifting and movement fundamentals. You can start gently and ask how to adjust the intensity. Partner work is optional.</p>
            <Link href="/start" className="inline-block text-sm font-semibold text-[#243B45] underline underline-offset-4">What to expect at your first class</Link>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
