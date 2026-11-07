"use client";

import React from "react";
import Link from "next/link";
import { TAIJI_DATA, ClassSession } from "../data/taijiData";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onNavigateTab?: (tabId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const primaryClass: ClassSession = TAIJI_DATA.classes[0];

  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-[#E8E4DA]">
      {/* Ink & Iron ambient subtle background shapes */}
      <div className="absolute top-10 right-[-5%] w-96 h-96 rounded-full bg-[#243B45]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-[-8%] w-80 h-80 rounded-full bg-[#8A7250]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Hero Text */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#171918] leading-[1.15]">
              Traditional <span className="italic font-normal text-[#243B45]">Taijiquan.</span>{" "}
              <span className="block font-normal border-b-2 border-[#9B3D2E]/50 pb-1 mt-1 sm:mt-2">
                Taught as a physical skill.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[#303331] max-w-2xl leading-relaxed font-light">
              {TAIJI_DATA.hero.subText}
            </p>

            {/* First-class guidance and training information */}
            <div className="flex flex-col items-start gap-x-6 gap-y-4 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/start"
                className="text-sm font-semibold text-[#243B45] hover:text-[#9B3D2E] underline decoration-current decoration-1 underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#243B45]"
              >
                What to expect at your first class
              </Link>

              <Link
                href="/method"
                className="text-sm font-semibold text-[#243B45] hover:text-[#9B3D2E] underline decoration-current decoration-1 underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#243B45]"
              >
                How we train
              </Link>
            </div>
          </div>

          {/* Hero Right Column: Class Overview Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#DFD9CC] to-[#D5CEBF]/60 border border-[#D5CEBF] shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#9B3D2E]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#243B45]">
                    Weekly Class Overview
                  </span>
                </div>
                <span className="text-xs text-[#8A7250] font-serif italic">
                  All Levels Welcome
                </span>
              </div>

              {/* Main Routine Overview Box */}
              <div className="bg-[#E8E4DA] p-5 rounded-2xl border border-[#D5CEBF] space-y-3 shadow-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[#171918]">
                      Kingston Chen Taijiquan Practice Group
                    </h3>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-[#303331] font-light pt-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#243B45]" />
                    <span>Form (Yilu) + optional Push Hands</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8A7250]" />
                    <span>Beginners welcome</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#D5CEBF] text-xs text-[#303331] flex flex-wrap items-center gap-x-3 gap-y-1">
                  <div><strong>{primaryClass.day}:</strong> {primaryClass.time}</div>
                  <span className="font-semibold text-[#9B3D2E]">First class free</span>
                </div>

                <Link
                  href="/classes#reserve"
                  className="w-full mt-3 py-2.5 bg-[#9B3D2E] hover:bg-[#7D3024] text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
                  <span>Book a class</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
