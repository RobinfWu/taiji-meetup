"use client";

import React from "react";
import { TAIJI_DATA, ClassSession } from "../data/taijiData";
import { ArrowRight, Calendar, MapPin, Sparkles, Users, Compass, Award } from "lucide-react";

interface HeroSectionProps {
  onOpenRSVP: (classId?: string) => void;
  onNavigateTab: (tabId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenRSVP,
  onNavigateTab,
}) => {
  const nextClass: ClassSession = TAIJI_DATA.classes[0];

  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Serene organic background accent shapes */}
      <div className="absolute top-12 right-[-5%] w-96 h-96 rounded-full bg-[#4A6B5D]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-[-8%] w-80 h-80 rounded-full bg-[#9E7B56]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Hero Text */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#1F2421] leading-[1.15]">
              Cultivate <span className="italic font-normal text-[#4A6B5D]">Pain</span> in{" "}
              <span className="font-normal border-b-2 border-[#9E7B56]/40 pb-1">Every Movement</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#57625B] max-w-2xl leading-relaxed font-light">
              Welcome to our local teaching circle. We practice traditional{" "}
              <strong className="font-medium text-[#1F2421]">Chen Family Taijiquan</strong>—a northern Chinese martial art.
            </p>

            {/* Philosophy quote callout */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F3EFEA]/80 border border-[#E4DED5] border-l-4 border-l-[#4A6B5D] space-y-1">
              <p className="font-serif italic text-base sm:text-lg text-[#1F2421]">
                &ldquo;{TAIJI_DATA.hero.philosophyQuote}&rdquo;
              </p>
              <p className="text-xs text-[#808B84] font-medium tracking-wide uppercase">
                Core Chen Family Principle
              </p>
            </div>

            {/* CTA Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => onOpenRSVP(nextClass.id)}
                className="inline-flex items-center justify-center space-x-2 bg-[#4A6B5D] hover:bg-[#3B574B] text-white px-7 py-3.5 rounded-full font-medium shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-98"
              >
                <span>{TAIJI_DATA.hero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigateTab("what-is-taiji")}
                className="inline-flex items-center justify-center space-x-2 bg-[#F3EFEA] hover:bg-[#EBE5DD] border border-[#E4DED5] text-[#1F2421] px-6 py-3.5 rounded-full font-medium transition-all duration-200 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#4C6275]" />
                <span>{TAIJI_DATA.hero.ctaSecondary}</span>
              </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#E8E2D9]">
              {TAIJI_DATA.hero.quickStats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-sm font-semibold text-[#1F2421] font-serif">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#808B84]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Snapshot Card & Visual Graphic */}
          <div className="lg:col-span-5 space-y-6">
            {/* Visual Yin-Yang Meditative Card */}
            <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#F3EFEA] to-[#EBE5DD]/60 border border-[#E4DED5] shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-[#4A6B5D] animate-ping opacity-75" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#4A6B5D]">
                    Upcoming Highlight
                  </span>
                </div>
                <span className="text-xs text-[#808B84] font-serif italic">
                  Chen Village Lineage
                </span>
              </div>

              {/* Next Class Snapshot */}
              <div className="bg-[#FBF9F5] p-5 rounded-2xl border border-[#E8E2D9] space-y-3 mb-6 shadow-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[#1F2421]">
                      {nextClass.title}
                    </h3>
                    <p className="text-xs text-[#4A6B5D] font-medium mt-0.5">
                      {nextClass.level} • Led by {nextClass.instructor}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 bg-[#4A6B5D]/10 text-[#4A6B5D] text-xs rounded-md font-medium border border-[#4A6B5D]/20">
                    {nextClass.openSpots} spots left
                  </span>
                </div>

                <div className="space-y-1.5 pt-2 text-xs text-[#57625B]">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3.5 h-3.5 text-[#9E7B56]" />
                    <span>{nextClass.day}, {nextClass.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-[#4C6275]" />
                    <span>{nextClass.location}</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenRSVP(nextClass.id)}
                  className="w-full mt-3 py-2 bg-[#1F2421] hover:bg-[#333A3E] text-white text-xs font-medium rounded-xl transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>RSVP For This Class</span>
                  <ArrowRight className="w-3 h-3 text-[#9E7B56]" />
                </button>
              </div>

              {/* Serene Zen Aesthetic Feature */}
              <div className="flex items-center space-x-3 p-4 rounded-xl bg-[#4A6B5D]/10 border border-[#4A6B5D]/20">
                <div className="w-10 h-10 rounded-full bg-[#4A6B5D] text-white flex items-center justify-center font-serif text-lg">
                  ☯
                </div>
                <div>
                  <h4 className="text-sm font-medium text-[#1F2421]">
                    Beginners Welcome
                  </h4>
                  <p className="text-xs text-[#57625B]">
                    No prior experience required.
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
