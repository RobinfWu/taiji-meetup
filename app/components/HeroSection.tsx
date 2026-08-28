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
              Traditional <span className="italic font-normal text-[#243B45]">Chen Family</span>{" "}
              <span className="font-normal border-b-2 border-[#9B3D2E]/50 pb-1">Taijiquan</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#303331] max-w-2xl leading-relaxed font-light">
              {TAIJI_DATA.hero.subText}
            </p>

            {/* Philosophy quote callout */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#DFD9CC]/90 border border-[#D5CEBF] border-l-4 border-l-[#9B3D2E] space-y-1">
              <p className="font-serif italic text-base sm:text-lg text-[#171918]">
                &ldquo;{TAIJI_DATA.hero.philosophyQuote}&rdquo;
              </p>
              <p className="text-xs text-[#8A7250] font-semibold tracking-wider uppercase">
                ~ Robin Wu
              </p>
            </div>

            {/* CTA Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                href="/start"
                className="inline-flex items-center justify-center space-x-2 bg-[#9B3D2E] hover:bg-[#7D3024] text-white px-7 py-3.5 rounded-full text-sm font-bold shadow-md transition-all duration-200 cursor-pointer active:scale-98 border border-[#9B3D2E]"
              >
                <span>Start Here — Your First Class</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>

              <Link
                href="/method"
                className="inline-flex items-center justify-center space-x-2 bg-[#DFD9CC] hover:bg-[#D5CEBF] border border-[#D5CEBF] text-[#171918] px-6 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#243B45]" />
                <span>{TAIJI_DATA.hero.ctaSecondary}</span>
              </Link>
            </div>

            {/* Quick Stats Grid */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#D5CEBF]">
              {TAIJI_DATA.hero.quickStats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-sm font-semibold text-[#171918] font-serif">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#5A5E5B]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Right Column: Traditional System Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#DFD9CC] to-[#D5CEBF]/60 border border-[#D5CEBF] shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#9B3D2E]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#243B45]">
                    Traditional Training Focus
                  </span>
                </div>
                <span className="text-xs text-[#8A7250] font-serif italic">
                  Chen Zhaokui Lineage
                </span>
              </div>

              {/* Main Routine Overview Box */}
              <div className="bg-[#E8E4DA] p-5 rounded-2xl border border-[#D5CEBF] space-y-3 shadow-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[#171918]">
                      {primaryClass.title}
                    </h3>
                    <p className="text-xs text-[#243B45] font-semibold mt-0.5">
                      {primaryClass.level} • Taught by {primaryClass.instructor}
                    </p>
                  </div>
                  <span className="px-2 py-0.5 bg-[#9B3D2E]/10 text-[#9B3D2E] text-[11px] rounded font-semibold border border-[#9B3D2E]/20">
                    Traditional Form
                  </span>
                </div>

                <p className="text-xs text-[#303331] leading-relaxed font-light">
                  {primaryClass.description}
                </p>

                <div className="pt-2 border-t border-[#D5CEBF] text-xs text-[#303331] space-y-1">
                  <div><strong>Schedule:</strong> {primaryClass.day}, {primaryClass.time}</div>
                  <div><strong>Location:</strong> {primaryClass.location}</div>
                </div>

                <Link
                  href="/start"
                  className="w-full mt-3 py-2.5 bg-[#171918] hover:bg-[#303331] text-[#E8E4DA] text-xs font-semibold rounded-xl transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-[#8A7250]" />
                  <span>Inquire via Email for Training</span>
                </Link>
              </div>

              {/* Martial Lineage Banner */}
              <div className="flex items-center space-x-3 p-4 rounded-xl bg-[#243B45]/10 border border-[#243B45]/20">
                <div className="w-10 h-10 rounded-full bg-[#171918] text-[#E8E4DA] flex items-center justify-center font-serif text-lg">
                  ☯
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#171918]">
                    Authentic Transmission
                  </h4>
                  <p className="text-xs text-[#303331]">
                    Trained directly under Marin Spivack (Mo Ling Taiji), senior disciple of Master Chen Yu.
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
