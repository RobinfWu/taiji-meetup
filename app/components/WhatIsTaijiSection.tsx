"use client";

import React, { useState } from "react";
import { TAIJI_DATA } from "../data/taijiData";
import { Shield, Feather, Activity, Sun, Play, Pause, Sparkles, RefreshCw, CheckCircle2 } from "lucide-react";

export const WhatIsTaijiSection: React.FC = () => {
  const [activeDifferenceId, setActiveDifferenceId] = useState(TAIJI_DATA.differences[0].id);

  const activeDifference = TAIJI_DATA.differences.find(
    (p) => p.id === activeDifferenceId
  ) || TAIJI_DATA.differences[0];

  const getBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case "Shield": return <Shield className="w-5 h-5 text-[#4A6B5D]" />;
      case "Feather": return <Feather className="w-5 h-5 text-[#9E7B56]" />;
      case "Activity": return <Activity className="w-5 h-5 text-[#4C6275]" />;
      case "Sun": return <Sun className="w-5 h-5 text-[#57625B]" />;
      default: return <Sparkles className="w-5 h-5 text-[#4A6B5D]" />;
    }
  };

  return (
    <section id="what-is-taiji" className="py-20 bg-[#F3EFEA]/50 border-y border-[#E8E2D9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#4A6B5D]/10 text-[#4A6B5D] text-xs font-semibold uppercase tracking-widest">
            <span>The Progenitor of Tai Chi</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#1F2421]">
            What is <span className="font-normal italic text-[#4A6B5D]">Chen Style Taijiquan</span>?
          </h2>
          <p className="text-[#57625B] text-base sm:text-lg leading-relaxed font-light">
            Originating in Henan, China over 350 years ago, Chen Style is the foundational root of all major Tai Chi styles. It is distinguished by its continuous spiral movement, deep rooting, and fluid harmony between softness and explosive vitality.
          </p>
        </div>

        {/* 4 Differences to Mainstream Tai Chi */}
        <div className="mb-20">
          <h3 className="font-serif text-2xl text-[#1F2421] font-normal mb-8 text-center sm:text-left flex items-center justify-center sm:justify-start space-x-3">
            <span className="w-8 h-px bg-[#9E7B56]" />
            <span>Four Core Differences to Mainstream Tai Chi</span>
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Difference Selector Tabs */}
            <div className="lg:col-span-5 space-y-3">
              {TAIJI_DATA.differences.map((differences) => {
                const isSelected = differences.id === activeDifferenceId;
                return (
                  <button
                    key={differences.id}
                    onClick={() => setActiveDifferenceId(differences.id)}
                    className={`w-full text-left p-5 rounded-2xl transition-all duration-200 border cursor-pointer ${
                      isSelected
                        ? "bg-[#FBF9F5] border-[#4A6B5D] shadow-sm transform translate-x-1"
                        : "bg-[#F3EFEA]/70 border-[#E4DED5] hover:bg-[#FBF9F5]/70 hover:border-[#D5CDC2]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-serif text-lg font-semibold text-[#1F2421]">
                        {differences.title}
                      </span>
                    </div>
                    <p className="text-xs text-[#57625B] line-clamp-2">
                      {differences.summary}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Difference Detail Display */}
            <div className="lg:col-span-7 bg-[#FBF9F5] p-6 sm:p-8 rounded-3xl border border-[#E8E2D9] shadow-xs space-y-6">
              <div className="flex items-center space-x-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-serif text-2xl font-bold shadow-xs"
                  style={{ backgroundColor: activeDifference.accentColor }}
                >
                  ☯
                </div>
                <div>
                  <h4 className="font-serif text-2xl font-semibold text-[#1F2421]">
                    {activeDifference.title}
                  </h4>
                  <p className="text-xs text-[#808B84] uppercase tracking-wider font-semibold">
                    Kinetic & Internal Concept
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-[#57625B] text-base leading-relaxed font-light">
                <p>{activeDifference.description}</p>
                <div className="p-4 rounded-xl bg-[#F3EFEA] border border-[#E4DED5] space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#1F2421] block">
                    How We Practice This In Class:
                  </span>
                  <p className="text-xs text-[#57625B]">
                    Students practice slow repetition with hands-on biomechanical alignment cues, allowing the mind to track joint spiral mechanics without strain.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Health Benefits Grid */}
        <div>
          <h3 className="font-serif text-2xl text-[#1F2421] font-normal mb-8 text-center sm:text-left flex items-center justify-center sm:justify-start space-x-3">
            <span className="w-8 h-px bg-[#9E7B56]" />
            <span>Health & Mind Benefits</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TAIJI_DATA.benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-[#FBF9F5] p-6 rounded-2xl border border-[#E8E2D9] space-y-3 shadow-xs hover:border-[#4A6B5D]/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F3EFEA] border border-[#E4DED5] flex items-center justify-center">
                  {getBenefitIcon(benefit.icon)}
                </div>
                <h4 className="font-serif text-lg font-semibold text-[#1F2421]">
                  {benefit.title}
                </h4>
                <p className="text-xs text-[#57625B] leading-relaxed">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
