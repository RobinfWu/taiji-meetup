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
                Our group practices outdoors with structured instruction in traditional Gongfu Jia Yilu (First Road) and Push Hands. Find everything you need to know about schedule, location, attire, and FAQs.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          {/* Section 1: Offered Classes */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#243B45]">
                Weekly Sessions
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#171918]">
                What Classes Are Offered
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TAIJI_DATA.classes.map((session: ClassSession) => (
                <div
                  key={session.id}
                  className="bg-[#DFD9CC] p-8 rounded-3xl border border-[#D5CEBF] space-y-6 flex flex-col justify-between shadow-xs hover:border-[#171918]/40 transition-all duration-200"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold px-3 py-1 rounded-md bg-[#243B45]/10 text-[#243B45] border border-[#243B45]/20">
                        {session.level}
                      </span>
                      <span className="text-xs font-serif italic text-[#8A7250]">
                        Traditional Practice
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-semibold text-[#171918] leading-snug">
                      {session.title}
                    </h3>

                    <p className="text-sm text-[#303331] leading-relaxed font-light">
                      {session.description}
                    </p>

                    <div className="pt-4 border-t border-[#D5CEBF] space-y-2.5 text-xs text-[#303331]">
                      <div className="flex items-center space-x-2.5">
                        <Calendar className="w-4 h-4 text-[#8A7250]" />
                        <span className="font-semibold text-[#171918]">
                          {session.day}, {session.time}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2.5">
                        <MapPin className="w-4 h-4 text-[#243B45]" />
                        <span>{session.location}</span>
                      </div>

                      <div className="flex items-center space-x-2.5">
                        <Users className="w-4 h-4 text-[#303331]" />
                        <span>Taught by {session.instructor}</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={`mailto:${TAIJI_DATA.contact.email}?subject=Inquiry for ${session.title}`}
                    className="w-full mt-4 py-3 bg-[#171918] hover:bg-[#303331] text-[#E8E4DA] text-xs font-semibold rounded-2xl transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-xs border border-[#303331]"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#8A7250]" />
                    <span>Inquire via Email for {session.day} Session</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: What Training is Like & Scalable Exertion */}
          <div className="bg-[#DFD9CC] p-8 sm:p-12 rounded-3xl border border-[#D5CEBF] shadow-xs space-y-6">
            <h2 className="font-serif text-3xl font-semibold text-[#171918]">
              What Training Looks Like
            </h2>
            <p className="text-[#303331] leading-relaxed font-light text-base sm:text-lg">
              All students learn the same core routine progressively, with stance depth and physical exertion adapted to individual comfort and goals. Practitioners of all experience levels train together in the same supportive environment.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {TAIJI_DATA.scalableTiers.map((tier) => (
                <div key={tier.id} className="p-5 rounded-2xl bg-[#E8E4DA] border border-[#D5CEBF] space-y-2">
                  <h4 className="text-sm font-semibold font-serif text-[#171918]">
                    {tier.title}
                  </h4>
                  <p className="text-[11px] font-semibold text-[#8A7250] uppercase tracking-wider">
                    {tier.subtitle}
                  </p>
                  <p className="text-xs text-[#5A5E5B] leading-relaxed">
                    {tier.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

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

          {/* Section 4: Complete FAQ Accordion */}
          <div className="bg-[#DFD9CC] p-8 sm:p-12 rounded-3xl border border-[#D5CEBF] shadow-xs space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D5CEBF] pb-6">
              <div>
                <h2 className="font-serif text-3xl font-semibold text-[#171918]">
                  Frequently Asked Questions
                </h2>
                <p className="text-sm text-[#303331] mt-1 font-light">
                  Common questions on footwear, age stereotypes, Qi energy, and partner work.
                </p>
              </div>

              <a
                href={TAIJI_DATA.contact.teacherWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-[#243B45]/10 hover:bg-[#243B45]/20 text-[#243B45] px-4 py-2.5 rounded-xl text-xs font-semibold border border-[#243B45]/20 transition-colors self-start sm:self-auto"
              >
                <span>Teacher&apos;s Site: Mo Ling Taiji</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TAIJI_DATA.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-[#E8E4DA] rounded-2xl border border-[#D5CEBF] overflow-hidden transition-all duration-200 self-start"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full text-left p-5 flex items-center justify-between space-x-3 cursor-pointer hover:bg-[#DFD9CC]/50"
                    >
                      <span className="font-serif text-base font-semibold text-[#171918]">
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#9B3D2E] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#5A5E5B] shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#303331] leading-relaxed border-t border-[#D5CEBF]/60 font-light">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation CTA */}
          <div className="bg-[#171918] text-[#E8E4DA] p-8 sm:p-12 rounded-3xl border border-[#303331] text-center space-y-6">
            <h3 className="font-serif text-3xl font-light">
              Thinking about trying your first class?
            </h3>
            <p className="text-sm text-[#DFD9CC] max-w-xl mx-auto font-light">
              Visit our Start Here page for a simple, zero-philosophy guide to what to expect on your first day.
            </p>
            <div className="pt-2">
              <Link
                href="/start"
                className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-[#9B3D2E] text-white text-sm font-bold hover:bg-[#7D3024] transition-colors shadow-md"
              >
                <span>Start Here — Your First Class</span>
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
