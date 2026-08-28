"use client";

import React, { useState } from "react";
import { TAIJI_DATA } from "../data/taijiData";
import { Shield, Feather, Activity, Sun, Flame, Sparkles, AlertCircle, CheckCircle2, Trees } from "lucide-react";

export const WhatIsTaijiSection: React.FC = () => {
  const [activeDifferenceId, setActiveDifferenceId] = useState(TAIJI_DATA.differences[0].id);

  const activeDifference = TAIJI_DATA.differences.find(
    (p) => p.id === activeDifferenceId
  ) || TAIJI_DATA.differences[0];

  const getBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case "Shield": return <Shield className="w-5 h-5 text-[#243B45]" />;
      case "Feather": return <Feather className="w-5 h-5 text-[#8A7250]" />;
      case "Activity": return <Activity className="w-5 h-5 text-[#9B3D2E]" />;
      case "Sun": return <Sun className="w-5 h-5 text-[#303331]" />;
      default: return <Sparkles className="w-5 h-5 text-[#243B45]" />;
    }
  };

  return (
    <section id="what-is-taiji" className="py-20 bg-[#DFD9CC]/50 border-y border-[#D5CEBF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#243B45]/10 text-[#243B45] text-xs font-semibold uppercase tracking-widest border border-[#243B45]/20">
            <span>Methodology-Oriented Internal Art</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#171918]">
            What is <span className="font-normal italic text-[#243B45]">Chen Family Taijiquan</span>?
          </h2>
          <p className="text-[#303331] text-base sm:text-lg leading-relaxed font-light">
            Chen Family Taijiquan is the original progenitor of "Tai Chi"—a traditional northern Chinese discipline originating from Chenjiagou in Henan Province.
          </p>
          <p className="text-[#303331] text-base sm:text-lg leading-relaxed font-light">
            Our school advocates for a <strong className="font-semibold text-[#171918]">methodology-oriented practice</strong>. We teach the concrete physical "how"—providing a clear roadmap built on solid leg foundation and scalable physical intensity for all ages.
          </p>
        </div>

        {/* 4 Our Approach to Taijiquan */}
        <div className="mb-20">
          <h3 className="font-serif text-2xl text-[#171918] font-normal mb-8 text-center sm:text-left flex items-center justify-center sm:justify-start space-x-3">
            <span className="w-8 h-px bg-[#9B3D2E]" />
            <span>Our Approach to Taijiquan</span>
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Difference Selector Tabs */}
            <div className="lg:col-span-5 space-y-3">
              {TAIJI_DATA.differences.map((diff) => {
                const isSelected = diff.id === activeDifferenceId;
                return (
                  <button
                    key={diff.id}
                    onClick={() => setActiveDifferenceId(diff.id)}
                    className={`w-full text-left p-5 rounded-2xl transition-all duration-200 border cursor-pointer ${
                      isSelected
                        ? "bg-[#E8E4DA] border-[#171918] shadow-sm transform translate-x-1"
                        : "bg-[#DFD9CC]/70 border-[#D5CEBF] hover:bg-[#E8E4DA]/70 hover:border-[#B8B0A0]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-serif text-lg font-semibold text-[#1F2421]">
                        {diff.title}
                      </span>
                    </div>
                    <p className="text-xs text-[#57625B] line-clamp-2">
                      {diff.summary}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Principle Detail Display */}
            <div className="lg:col-span-7 bg-[#E8E4DA] p-6 sm:p-8 rounded-3xl border border-[#D5CEBF] shadow-xs space-y-6">
              <div className="flex items-center space-x-4">
                <div
                  className="w-12 h-12 rounded-2xl bg-[#171918] text-[#E8E4DA] flex items-center justify-center font-serif text-2xl font-bold shadow-xs border border-[#303331]"
                >
                  ☯
                </div>
                <div>
                  <h4 className="font-serif text-2xl font-semibold text-[#1F2421]">
                    {activeDifference.title}
                  </h4>
                </div>
              </div>

              <div className="space-y-4 text-[#303331] text-base leading-relaxed font-light">
                  <p className="whitespace-pre-line">
                    {activeDifference.description}
                  </p>
              </div>
            </div>
          </div>
        </div>

        {/* Myths vs. Authentic Practice Card Grid */}
        <div className="mb-20 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#9B3D2E]">
              Clearing Misconceptions
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#171918]">
              Taijiquan may not be what you think.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TAIJI_DATA.mythsAndRealities.map((item) => (
              <div
                key={item.id}
                className="bg-[#E8E4DA] rounded-3xl p-6 border border-[#D5CEBF] shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#9B3D2E]/10 text-[#9B3D2E] text-[11px] font-semibold border border-[#9B3D2E]/20">
                    <span>{item.badge}</span>
                  </div>

                  {/* Myth Statement */}
                  <div className="flex items-start space-x-2.5 text-[#9B3D2E] bg-[#DFD9CC]/60 p-3 rounded-xl border border-[#D5CEBF]">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider block text-[#9B3D2E]">
                        Misconception:
                      </span>
                      <p className="text-xs font-medium text-[#303331]">
                        "{item.myth}"
                      </p>
                    </div>
                  </div>

                  {/* Reality Statement */}
                  <div className="flex items-start space-x-2.5 text-[#243B45] bg-[#E2DCD0] p-3 rounded-xl border border-[#D5CEBF]">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#243B45]" />
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider block text-[#243B45]">
                        Our View:
                      </span>
                      <p className="text-xs text-[#303331] leading-relaxed">
                        {item.reality}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scalable Practice Showcase */}
        <div className="mb-20 bg-gradient-to-r from-[#243B45]/10 via-[#E8E4DA] to-[#8A7250]/10 p-8 sm:p-10 rounded-3xl border border-[#D5CEBF] relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#243B45]">
              <Flame className="w-4 h-4 text-[#9B3D2E]" />
              <span>One Routine • Scalable Intensity for All Goals</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#171918]">
              Adaptable Exertion: Health Seekers & Challenge Seekers
            </h3>

            <p className="text-sm text-[#303331] leading-relaxed font-light">
              All students learn the same core Gongfu Jia skeleton (First Road / Yilu), but stance depth and exertion level are customized. Health seekers and challenge seekers train in the same supportive environment, learning from one another without force or pressure.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {TAIJI_DATA.scalableTiers.map((tier) => (
                <div key={tier.id} className="p-5 rounded-2xl bg-[#E8E4DA] border border-[#D5CEBF] space-y-2">
                  <div className="flex items-center space-x-2 text-[#171918]">
                    {tier.icon === "Shield" ? <Shield className="w-4 h-4 text-[#243B45]" /> : <Flame className="w-4 h-4 text-[#9B3D2E]" />}
                    <h4 className="text-sm font-semibold font-serif text-[#171918]">
                      {tier.title}
                    </h4>
                  </div>
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
        </div>

        {/* Benefits Grid */}
        <div>
          <h3 className="font-serif text-2xl text-[#171918] font-normal mb-8 text-center sm:text-left flex items-center justify-center sm:justify-start space-x-3">
            <span className="w-8 h-px bg-[#8A7250]" />
            <span>Concrete Health & Physical Benefits</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TAIJI_DATA.benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-[#E8E4DA] p-6 rounded-2xl border border-[#D5CEBF] space-y-3 shadow-xs hover:border-[#243B45]/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#DFD9CC] border border-[#D5CEBF] flex items-center justify-center">
                  {getBenefitIcon(benefit.icon)}
                </div>
                <h4 className="font-serif text-lg font-semibold text-[#171918]">
                  {benefit.title}
                </h4>
                <p className="text-xs text-[#303331] leading-relaxed">
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
