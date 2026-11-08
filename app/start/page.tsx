"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ContactForm } from "../components/ContactForm";
import {
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function StartPage() {

  return (
    <main className="min-h-screen bg-[#E8E4DA] text-[#171918] relative flex flex-col font-sans selection:bg-[#9B3D2E]/15 selection:text-[#9B3D2E]">
      <Navbar />

      <div className="flex-1 pt-28 pb-20">
        {/* Page Hero Header */}
        <section className="py-12 md:py-16 bg-[#DFD9CC]/60 border-b border-[#D5CEBF] relative overflow-hidden text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#9B3D2E]/10 text-[#9B3D2E] text-xs font-bold uppercase tracking-widest border border-[#9B3D2E]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Welcoming All Beginners</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#171918]">
              Your First <span className="font-normal italic text-[#9B3D2E]">Taijiquan Class</span>
            </h1>
            <p className="text-xl sm:text-2xl text-[#243B45] font-serif italic">
              You don&apos;t need any previous experience.
            </p>
          </div>
        </section>

        {/* 4 Simple Reassuring Sections */}
        <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* Section 1: Come as you are */}
          <div className="bg-[#DFD9CC] p-8 sm:p-10 rounded-3xl border border-[#D5CEBF] shadow-xs flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-14 h-14 rounded-2xl bg-[#9B3D2E] text-white flex items-center justify-center shrink-0 shadow-md font-serif text-xl font-bold">
              1
            </div>
            <div className="space-y-2 flex-1">
              <h2 className="font-serif text-2xl font-semibold text-[#171918]">
                Come as you are
              </h2>
              <p className="text-base text-[#303331] leading-relaxed font-light">
                Comfortable clothes. Flat shoes. No uniform. No special flexibility or prior Tai Chi experience required.
              </p>
            </div>
          </div>

          {/* Section 2: We'll teach you from the beginning */}
          <div className="bg-[#DFD9CC] p-8 sm:p-10 rounded-3xl border border-[#D5CEBF] shadow-xs flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-14 h-14 rounded-2xl bg-[#243B45] text-white flex items-center justify-center shrink-0 shadow-md font-serif text-xl font-bold">
              2
            </div>
            <div className="space-y-2 flex-1">
              <h2 className="font-serif text-2xl font-semibold text-[#171918]">
                We&apos;ll teach you from the beginning
              </h2>
              <p className="text-base text-[#303331] leading-relaxed font-light">
                Your first class will introduce stance, weight shifting, posture and basic movement. Nobody expects you to know the form.
              </p>
            </div>
          </div>

          {/* Section 3: Choose your intensity */}
          <div className="bg-[#DFD9CC] p-8 sm:p-10 rounded-3xl border border-[#D5CEBF] shadow-xs flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-14 h-14 rounded-2xl bg-[#8A7250] text-white flex items-center justify-center shrink-0 shadow-md font-serif text-xl font-bold">
              3
            </div>
            <div className="space-y-2 flex-1">
              <h2 className="font-serif text-2xl font-semibold text-[#171918]">
                Choose your intensity
              </h2>
              <p className="text-base text-[#303331] leading-relaxed font-light">
                You can start gently. If you want more physical challenge, we can show you how to increase the demands of the exercise.
              </p>
            </div>
          </div>

          {/* Primary path: reserve a place using the single booking form. */}
          <section aria-labelledby="start-booking-heading" className="rounded-3xl bg-[#243B45] px-8 py-12 text-center text-[#E8E4DA] space-y-5">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#E0C9A2]">Ready to begin?</span>
            <h2 id="start-booking-heading" className="font-serif text-3xl sm:text-4xl">Experience Your First Class</h2>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-[#DFD9CC]">
              Your first class is free. No experience or special equipment needed.
              Choose an available class and reserve your place.
            </p>
            <Link href="/classes#reserve" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#9B3D2E] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#7D3024]">
              Reserve Your Free Class <ArrowRight className="h-4 w-4" />
            </Link>
          </section>

          {/* Questions remain welcome, but booking is the primary action. */}
          <section id="ask-robin" aria-label="Ask Robin a question" className="scroll-mt-28 space-y-3 pt-4">
            <ContactForm darkVariant={true} />
          </section>

        </section>
      </div>

      <Footer />
    </main>
  );
}
