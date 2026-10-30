"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { TAIJI_DATA, ClassSession } from "../data/taijiData";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  ChevronDown,
  ChevronUp,
  Mail,
  Info,
  ExternalLink,
  Shield,
  ArrowRight
} from "lucide-react";

export default function ClassesPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-[#E8E4DA] text-[#171918] relative flex flex-col font-sans selection:bg-[#9B3D2E]/15 selection:text-[#9B3D2E]">
      <Navbar />

      <div className="flex-1 pt-28 pb-20">
        {/* Page Hero Header */}
        <section className="py-12 md:py-16 bg-[#DFD9CC]/60 border-b border-[#D5CEBF] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#243B45]/10 text-[#243B45] text-xs font-semibold uppercase tracking-widest border border-[#243B45]/20">
                <Calendar className="w-3.5 h-3.5" />
                <span>Practical Class & Location Information</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#171918]">
                Classes & <span className="font-normal italic text-[#243B45]">Schedule</span>
              </h1>
              <p className="text-lg text-[#303331] leading-relaxed font-light">
                Our group practices outdoors with structured instruction in traditional form and Push Hands. Find everything you need to know about schedule, location, and attire.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          {/* Section 1: Offered Classes */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#243B45]">
                Weekly Practice
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#171918]">
                Our Weekly Training Class
              </h2>
              <p className="text-sm text-[#57625B] font-light">
                We offer one unified weekly session combining progressive form mechanics and cooperative Push Hands partner drills.
              </p>
            </div>

            <div className="flex justify-center w-full">
              <div className="max-w-2xl w-full mx-auto" style={{ marginLeft: "auto", marginRight: "auto" }}>
              {TAIJI_DATA.classes.map((session: ClassSession) => (
                <div
                  key={session.id}
                  className="bg-[#DFD9CC] p-8 sm:p-10 rounded-3xl border border-[#D5CEBF] space-y-6 flex flex-col justify-between items-center text-center shadow-xs hover:border-[#171918]/40 transition-all duration-200"
                >
                  <div className="space-y-4 w-full flex flex-col items-center">
                    <div className="flex items-center justify-center space-x-3">
                      <span className="text-xs font-semibold px-3 py-1 rounded-md bg-[#243B45]/10 text-[#243B45] border border-[#243B45]/20">
                        {session.level}
                      </span>
                      <span className="text-xs font-serif italic text-[#8A7250]">
                        Traditional Practice
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#171918] leading-snug max-w-xl mx-auto">
                      {session.title}
                    </h3>

                    <p className="text-sm text-[#303331] leading-relaxed font-light max-w-lg mx-auto">
                      {session.description}
                    </p>

                    <div className="pt-4 border-t border-[#D5CEBF] space-y-2.5 text-xs text-[#303331] w-full flex flex-col items-center">
                      <div className="flex items-center justify-center space-x-2.5">
                        <Calendar className="w-4 h-4 text-[#8A7250]" />
                        <span className="font-semibold text-[#171918]">
                          {session.day}, {session.time}
                        </span>
                      </div>

                      <div className="flex items-center justify-center space-x-2.5">
                        <MapPin className="w-4 h-4 text-[#243B45]" />
                        <span>{session.location}</span>
                      </div>

                      <div className="flex items-center justify-center space-x-2.5">
                        <Users className="w-4 h-4 text-[#303331]" />
                        <span>Train with {session.instructor}</span>
                      </div>

                      {session.openPracticeNote && (() => {
                        const note = session.openPracticeNote!;
                        const dashIdx = note.indexOf(".");
                        const headline = note.slice(0, dashIdx + 1);
                        const body = note.slice(dashIdx + 1).trim();
                        return (
                          <div className="w-full mt-2 pt-3 border-t border-dashed border-[#C8C1B2] text-left space-y-1.5">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-3.5 h-3.5 text-[#8A7250] shrink-0" />
                              <span className="font-semibold text-[#171918] text-xs">{headline}</span>
                            </div>
                            <p className="text-xs text-[#57625B] leading-relaxed font-light pl-5">{body}</p>
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  <Link
                    href="/start"
                    className="w-full max-w-md mx-auto mt-4 py-3 bg-[#171918] hover:bg-[#303331] text-[#E8E4DA] text-xs font-semibold rounded-2xl transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-xs border border-[#303331]"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#8A7250]" />
                    <span>Get in Touch for {session.day} Practice</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          </div>


        {/* Fees & Membership */}
        <section aria-labelledby="fees-heading" className="space-y-8">
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
              Your first class is free — no commitment required. All prices are in CAD.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
                Covers all weekly Saturday classes that month. Members may send me their practice videos between classes for personalized written feedback.
              </p>
            </div>

            <div className="bg-[#243B45] text-[#E8E4DA] rounded-3xl border border-[#243B45] p-7 space-y-3">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-[#E0C9A2]">
                Early Student Offer
              </span>
              <h3 className="font-serif text-xl font-semibold">Founding Members</h3>
              <p className="font-serif text-4xl">
                $55<span className="text-base text-[#DFD9CC]"> / month</span>
              </p>
              <p className="text-sm text-[#DFD9CC]">
                All monthly membership benefits at a special introductory rate for our earliest students.
                $55/month for your first three months, then $70/month.
              </p>
            </div>
          </div>

          <div className="bg-[#DFD9CC] rounded-2xl border border-[#D5CEBF] p-6 sm:p-8 space-y-3 text-sm text-[#303331]">
            <p>
              <strong className="text-[#171918]">
                Student & senior discount:
              </strong>{" "}
              Full-time students and adults aged 65+ receive 15% off regular
              drop-in or monthly fees (not combined with the founding-member offer).
            </p>
            <p>
              <strong className="text-[#171918]">Payment:</strong>{" "}
              Interac e-Transfer or cash accepted.
            </p>
            <p className="text-xs text-[#57625B]">
              Discounted regular rates: $17 per drop-in class or $59.50 per month.
            </p>
          </div>
        </section>

          {/* Section 3: Location Details & What to Wear */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8A7250]">
                Preparation & Details
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#171918]">
                Location & What to Wear
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {TAIJI_DATA.locations.map((loc, idx) => (
                <div
                  key={idx}
                  className="bg-[#DFD9CC] p-8 rounded-3xl border border-[#D5CEBF] space-y-5 shadow-xs"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#243B45]/10 text-[#243B45] flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-[#171918]">
                        {loc.name}
                      </h3>
                      <p className="text-xs text-[#243B45] font-semibold">
                        {loc.scheduleNote}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#E8E4DA] border border-[#D5CEBF] text-xs space-y-1">
                    <span className="text-[#5A5E5B] font-semibold block uppercase tracking-wider text-[10px]">
                      Address Details
                    </span>
                    <p className="font-semibold text-[#171918] text-sm">
                      {loc.address}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#E8E4DA] border border-[#D5CEBF] text-xs text-[#303331]">
                    <span className="font-semibold text-[#171918] block mb-1 text-sm">
                      Attire & Footwear Advice:
                    </span>
                    <p className="leading-relaxed font-light">{loc.tips}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation CTA */}
          <div className="bg-[#171918] text-[#E8E4DA] p-8 sm:p-12 rounded-3xl border border-[#303331] text-center space-y-6">
            <h3 className="font-serif text-3xl font-light">
              Thinking about trying your first class?
            </h3>
            <p className="text-sm text-[#DFD9CC] max-w-xl mx-auto font-light">
              Visit our Start Here page for a simple guide to what to expect on your first day.
            </p>
            <div className="pt-2">
              <Link
                href="/start"
                className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-[#9B3D2E] text-white text-sm font-bold hover:bg-[#7D3024] transition-colors shadow-md"
              >
                <span>Try a Class</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </section>
      </div>

      <Footer />
    </main>
  );
}
