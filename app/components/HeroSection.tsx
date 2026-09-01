"use client";

import React from "react";
import Link from "next/link";
import { TAIJI_DATA, ClassSession } from "../data/taijiData";
import { ArrowRight, Mail, Compass, Shield, Flame, BookOpen } from "lucide-react";

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

            {/* Tagline banner */}
            <div className="inline-flex flex-wrap items-center gap-2 px-4 py-2 rounded-full bg-[#DFD9CC]/90 border border-[#D5CEBF] text-xs sm:text-sm font-medium text-[#243B45]">
              <span>Traditional practice</span>
              <span className="text-[#9B3D2E]">•</span>
              <span>Scalable intensity</span>
              <span className="text-[#9B3D2E]">•</span>
              <span>All experience levels</span>
            </div>

            {/* CTA Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                href="/start"
                className="inline-flex items-center justify-center space-x-2 bg-[#9B3D2E] hover:bg-[#7D3024] text-white px-7 py-3.5 rounded-full text-sm font-bold shadow-md transition-all duration-200 cursor-pointer active:scale-98 border border-[#9B3D2E]"
              >
                <span>Try a Class</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>

              <Link
                href="/method"
                className="inline-flex items-center justify-center space-x-2 bg-[#DFD9CC] hover:bg-[#D5CEBF] border border-[#D5CEBF] text-[#171918] px-6 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#243B45]" />
                <span>How We Train →</span>
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
                    <p className="text-xs text-[#243B45] font-semibold mt-0.5">
                      Weekly group practice • Train with Robin
                    </p>
                  </div>
                  <span className="px-2 py-0.5 bg-[#9B3D2E]/10 text-[#9B3D2E] text-[11px] rounded font-semibold border border-[#9B3D2E]/20">
                    Open Group
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-[#303331] font-light pt-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9B3D2E]" />
                    <span>Weekly group practice</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#243B45]" />
                    <span>Traditional Gongfu Jia Yilu + Push Hands</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8A7250]" />
                    <span>Beginners welcome</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#D5CEBF] text-xs text-[#303331]">
                  <div><strong>Saturdays:</strong> 10:00 AM – 11:30 AM</div>
                </div>

                <Link
                  href="/start"
                  className="w-full mt-3 py-2.5 bg-[#171918] hover:bg-[#303331] text-[#E8E4DA] text-xs font-semibold rounded-xl transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-[#8A7250]" />
                  <span>Try a Class — Get Started</span>
                </Link>
              </div>

              {/* Training Focus Banner */}
              <div className="flex items-center space-x-3 p-4 rounded-xl bg-[#243B45]/10 border border-[#243B45]/20">
                <div className="w-10 h-10 rounded-full bg-[#171918] text-[#E8E4DA] flex items-center justify-center font-serif text-lg">
                  ☯
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#171918]">
                    Structured Physical Skill
                  </h4>
                  <p className="text-xs text-[#303331]">
                    Developing real movement quality, balance, leg strength, and joint coordination through clear instruction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
