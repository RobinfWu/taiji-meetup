"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { TAIJI_DATA } from "../data/taijiData";
import {
  Shirt,
  Compass,
  Flame,
  Calendar,
  MapPin,
  Mail,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from "lucide-react";

export default function StartPage() {
  const primaryClass = TAIJI_DATA.classes[0];
  const emailAddress = TAIJI_DATA.contact.email;

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
                Comfortable clothes. Flat shoes. No uniform. No special flexibility or martial arts experience required.
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
                You can practice in a comfortable higher stance or challenge yourself with deeper positions. You don&apos;t need to &ldquo;keep up&rdquo; with anyone.
              </p>
            </div>
          </div>

          {/* Section 4: Come experience it */}
          <div className="bg-[#DFD9CC] p-8 sm:p-10 rounded-3xl border border-[#D5CEBF] shadow-xs flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-14 h-14 rounded-2xl bg-[#171918] text-[#E8E4DA] flex items-center justify-center shrink-0 shadow-md font-serif text-xl font-bold">
              4
            </div>
            <div className="space-y-2 flex-1">
              <h2 className="font-serif text-2xl font-semibold text-[#171918]">
                Come experience it
              </h2>
              <div className="text-base text-[#303331] leading-relaxed font-light space-y-1">
                <p className="font-semibold text-[#171918]">
                  {primaryClass.day} · {primaryClass.time}
                </p>
                <p className="text-xs text-[#243B45]">{primaryClass.location}</p>
              </div>
            </div>
          </div>

          {/* Action CTA Block */}
          <div className="bg-[#171918] text-[#E8E4DA] p-10 sm:p-14 rounded-3xl border border-[#303331] text-center space-y-6 shadow-xl mt-12">
            <h3 className="font-serif text-3xl sm:text-4xl font-light">
              Ready to Join Us This Saturday?
            </h3>
            <p className="text-base text-[#DFD9CC] max-w-lg mx-auto font-light">
              Send us a quick email to confirm your attendance or ask any remaining questions. We look forward to meeting you!
            </p>
            
            <div className="pt-2">
              <a
                href={`mailto:${emailAddress}?subject=Attending First Taijiquan Class Inquiry`}
                className="inline-flex items-center space-x-3 bg-[#9B3D2E] hover:bg-[#7D3024] text-white px-9 py-4 rounded-full text-base font-bold transition-all shadow-lg cursor-pointer border border-[#9B3D2E] transform hover:-translate-y-0.5"
              >
                <Mail className="w-5 h-5 text-white/90" />
                <span>Try Your First Class →</span>
              </a>
            </div>

            <p className="text-xs text-[#8A7250] pt-2">
              Direct contact email: <strong className="text-[#DFD9CC]">{emailAddress}</strong>
            </p>
          </div>

        </section>
      </div>

      <Footer />
    </main>
  );
}
