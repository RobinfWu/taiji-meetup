"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { Footer } from "./components/Footer";
import { ContactForm } from "./components/ContactForm";
import { TAIJI_DATA } from "./data/taijiData";
import {
  Compass,
  ArrowRight,
  BookOpen,
  Calendar,
  MapPin,
  Mail,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon
} from "lucide-react";

export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const primaryClass = TAIJI_DATA.classes[0];

  return (
    <main className="min-h-screen bg-[#E8E4DA] text-[#171918] relative flex flex-col font-sans selection:bg-[#9B3D2E]/15 selection:text-[#9B3D2E]">
      <Navbar />

      <div className="flex-1">
        {/* Step 1: Hero */}
        <HeroSection />

        {/* Step 2: What Makes This Practice Different? (Editorial Numbered List) */}
        <section className="py-20 sm:py-28 bg-[#DFD9CC]/40 border-y border-[#D5CEBF] relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#FAF8F5] rounded-3xl border border-[#D5CEBF] p-7 sm:p-10 md:p-12 shadow-xs">
              <div className="space-y-2 mb-8 sm:mb-10">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#5A5E5B]">
                  WHY TAIJIQUAN?
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#171918]">
                  With So Many Ways to Move, Why Taijiquan?
                </h2>
                <p className="text-sm sm:text-base text-[#5A5E5B] font-light leading-relaxed">
                  A traditional craft with accessible beginnings and considerable depth.
                </p>
              </div>

              <div className="border-t border-[#D5CEBF] divide-y divide-[#D5CEBF]">
                {TAIJI_DATA.editorialPractices.map((practice) => (
                  <div
                    key={practice.number}
                    className="py-6 sm:py-7 flex items-start"
                  >
                    <span className="w-14 sm:w-16 shrink-0 text-lg sm:text-xl font-normal text-[#8A7250] tabular-nums select-none pt-0.5">
                      {practice.number}
                    </span>
                    <div className="space-y-1.5 flex-1">
                      <h3 className="text-base sm:text-lg font-semibold text-[#171918]">
                        {practice.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#5A5E5B] font-light leading-relaxed">
                        {practice.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#FAF8F5] rounded-3xl border border-[#D5CEBF] p-7 sm:p-10 md:p-12 shadow-xs">
              <div className="space-y-2 mb-8 sm:mb-10">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#5A5E5B]">
                  WHY OUR APPROACH?
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#171918]">
                  Not All Taijiquan Is the Same.
                </h2>
                <p className="text-sm sm:text-base text-[#5A5E5B] font-light leading-relaxed">
                  Taijiquan encompasses different styles, training methods, and interpretations. Here's what we emphasize in our approach.
                </p>
              </div>

              <div className="border-t border-[#D5CEBF] divide-y divide-[#D5CEBF]">
                {TAIJI_DATA.specialPractices.map((practice) => (
                  <div
                    key={practice.number}
                    className="py-6 sm:py-7 flex items-start"
                  >
                    <span className="w-14 sm:w-16 shrink-0 text-lg sm:text-xl font-normal text-[#8A7250] tabular-nums select-none pt-0.5">
                      {practice.number}
                    </span>
                    <div className="space-y-1.5 flex-1">
                      <h3 className="text-base sm:text-lg font-semibold text-[#171918]">
                        {practice.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#5A5E5B] font-light leading-relaxed">
                        {practice.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Step 3: How We Teach (Doorway to /method) */}
        <section className="py-20 bg-[#DFD9CC]/50 border-t border-[#D5CEBF] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#9B3D2E]/10 text-[#9B3D2E] text-xs font-semibold uppercase tracking-widest border border-[#9B3D2E]/20">
                  <span>Physical Methodology</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#171918]">
                  How We Teach
                </h2>
                <p className="text-lg text-[#303331] leading-relaxed font-light">
                  Our training follows a progressive physical methodology that develops the body from the ground up. Each stage builds the specific structure, mechanics, and physical capabilities needed for the next, providing a clear path.
                </p>
                <div className="pt-2">
                  <Link
                    href="/method"
                    className="inline-flex items-center space-x-2.5 bg-[#171918] hover:bg-[#303331] text-[#E8E4DA] px-7 py-3.5 rounded-full text-sm font-semibold shadow-md transition-all cursor-pointer border border-[#303331]"
                  >
                    <span>Explore Our Training Method</span>
                    <ArrowRight className="w-4 h-4 text-[#8A7250]" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#DFD9CC] p-8 rounded-3xl border border-[#D5CEBF] space-y-4 shadow-xs">
                <div className="flex items-center space-x-3 text-[#9B3D2E]">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Methodology Preview</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#171918]">
                  {TAIJI_DATA.differences[0].title}
                </h3>
                <p className="text-xs text-[#303331] leading-relaxed font-light">
                  {TAIJI_DATA.differences[0].summary}
                </p>
                <div className="pt-2 border-t border-[#D5CEBF] flex justify-between items-center text-xs">
                  <Link href="/method" className="text-[#9B3D2E] font-semibold hover:underline">
                    Read deep dive →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Step 5: Meet Robin (Doorway to /about) */}
        <section className="py-20 bg-[#E8E4DA] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-3xl overflow-hidden border border-[#D5CEBF] shadow-md bg-[#DFD9CC]">
                  <img
                    src="/IMG_2499.jpg"
                    alt="Marin Spivack and Robin Wu"
                    className="w-full h-72 object-cover"
                  />
                </div>
                <p className="text-xs text-[#8A7250] italic text-center font-serif">
                  Marin Spivack & Robin Wu
                </p>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#171918]">
                  Meet Robin
                </h2>
                <p className="text-base sm:text-lg text-[#303331] leading-relaxed font-light">
                  Robin Wu is a Chen Family Taijiquan practitioner who has trained directly under Marin Spivack as an indoor student/disciple. Marin Spivack is a senior disciple of Master Chen Yu, only son of Chen Zhaokui.
                </p>
                <div className="pt-2">
                  <Link
                    href="/about"
                    className="inline-flex items-center space-x-2.5 bg-[#171918] hover:bg-[#303331] text-[#E8E4DA] px-7 py-3.5 rounded-full text-sm font-semibold shadow-md transition-all cursor-pointer border border-[#303331]"
                  >
                    <span>Learn About Robin & Lineage</span>
                    <ArrowRight className="w-4 h-4 text-[#8A7250]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 6: Your First Class (Doorway to /start) */}
        <section className="py-20 bg-[#DFD9CC]/50 border-y border-[#D5CEBF] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#E8E4DA] p-8 sm:p-12 rounded-3xl border border-[#D5CEBF] shadow-xs space-y-8">
              <div className="max-w-2xl space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[#9B3D2E]">
                  No Experience Needed
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#171918]">
                  Your First Class
                </h2>
                <p className="text-base text-[#303331] font-light">
                  We make starting as straightforward and reassuring as possible. No uniform, no special flexibility, no expectations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-[#DFD9CC] p-5 rounded-2xl border border-[#D5CEBF] space-y-2">
                  <span className="font-serif text-xl font-bold text-[#9B3D2E]">1. Come as you are</span>
                  <p className="text-xs text-[#303331] leading-relaxed font-light">
                    Comfortable clothes and flat shoes. No uniform required.
                  </p>
                </div>
                <div className="bg-[#DFD9CC] p-5 rounded-2xl border border-[#D5CEBF] space-y-2">
                  <span className="font-serif text-xl font-bold text-[#243B45]">2. Step-by-step instruction</span>
                  <p className="text-xs text-[#303331] leading-relaxed font-light">
                    Basic stance, posture, weight shifting, and movement fundamentals.
                  </p>
                </div>
                <div className="bg-[#DFD9CC] p-5 rounded-2xl border border-[#D5CEBF] space-y-2">
                  <span className="font-serif text-xl font-bold text-[#8A7250]">3. Scalable exertion</span>
                  <p className="text-xs text-[#303331] leading-relaxed font-light">
                    This line of Taijiquan can be practiced light or intense, depending if you want a maintenance practice or a developmental practice.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/start"
                  className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-full bg-[#9B3D2E] text-white text-sm font-bold hover:bg-[#7D3024] transition-colors shadow-md"
                >
                  <span>What to Expect in Your First Class →</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Step 7: Schedule / Location */}
        <section className="py-20 bg-[#E8E4DA] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#243B45]">
                  Practice Details
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#171918]">
                  Schedule & Location
                </h2>
              </div>
              <Link
                href="/classes"
                className="inline-flex items-center space-x-2 text-xs font-semibold text-[#243B45] hover:underline"
              >
                <span>See complete class details & footwear advice</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#DFD9CC] p-6 rounded-3xl border border-[#D5CEBF] space-y-3 shadow-xs">
                <div className="flex items-center space-x-3 text-[#171918]">
                  <Calendar className="w-5 h-5 text-[#8A7250]" />
                  <h3 className="font-serif text-lg font-semibold">Weekly Schedule</h3>
                </div>
                <div className="text-xs text-[#303331] space-y-1.5 font-light">
                  <p><strong>Saturdays:</strong> 10:30 AM – 12:00 PM</p>
                </div>
              </div>

              <div className="bg-[#DFD9CC] p-6 rounded-3xl border border-[#D5CEBF] space-y-3 shadow-xs">
                <div className="flex items-center space-x-3 text-[#171918]">
                  <MapPin className="w-5 h-5 text-[#243B45]" />
                  <h3 className="font-serif text-lg font-semibold">Location</h3>
                </div>
                <div className="text-xs text-[#303331] space-y-1 font-light">
                  <p className="font-semibold text-[#171918]">Outdoor Park Location</p>
                  <p>{TAIJI_DATA.locations[0].address}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 10: Try a Class CTA */}
        <section className="py-20 bg-[#171918] text-[#E8E4DA] relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#9B3D2E]/20 text-[#9B3D2E] text-xs font-bold uppercase tracking-widest border border-[#9B3D2E]/40">
              <span>Take the First Step</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light">
              Try Your First Class
            </h2>
            <p className="text-base text-[#DFD9CC] max-w-xl mx-auto font-light leading-relaxed">
              No long-term commitment or prior experience required. Come experience Chen Family Taijiquan practice for yourself.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/start"
                className="px-9 py-4 rounded-full bg-[#9B3D2E] text-white text-base font-bold hover:bg-[#7D3024] transition-colors shadow-lg flex items-center space-x-2"
              >
                <span>Try a Class</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </main>
  );
}