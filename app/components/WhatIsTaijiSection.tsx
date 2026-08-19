"use client";

import React, { useState } from "react";
import { TAIJI_DATA } from "../data/taijiData";
import { Shield, Feather, Activity, Sun, Flame, Sparkles, ChevronRight } from "lucide-react";

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
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#243B45]/10 text-[#243B45] text-xs font-semibold uppercase tracking-widest border border-[#243B45]/20">
            <span>Traditional Chinese Internal Martial Discipline</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#171918]">
            What is <span className="font-normal italic text-[#243B45]">Chen Family Taijiquan</span>?
          </h2>
          <p className="text-[#303331] text-base sm:text-lg leading-relaxed font-light">
            You've probably heard of "Tai Chi" before.
          </p>
          <p className="text-[#303331] text-base sm:text-lg leading-relaxed font-light">
            Traditionally, it was passed down in a family. Such families included Chen, Yang, Wu, etc...
          </p>
          <p className="text-[#303331] text-base sm:text-lg leading-relaxed font-light">
            Chen Family Taijiquan is the oldest. You can think of it as the progenitor of "Tai Chi". It is a northern Chinese martial art originating in the Chen Village of Henan province.
          </p>
        </div>

        {/* 4 Pillars of Internal Principles */}
        <div className="mb-20">
          <h3 className="font-serif text-2xl text-[#171918] font-normal mb-8 text-center sm:text-left flex items-center justify-center sm:justify-start space-x-3">
            <span className="w-8 h-px bg-[#9B3D2E]" />
            <span>Four Core Martial Movement Principles</span>
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
                        ? "bg-[#E8E4DA] border-[#171918] shadow-sm transform translate-x-1"
                        : "bg-[#DFD9CC]/70 border-[#D5CEBF] hover:bg-[#E8E4DA]/70 hover:border-[#B8B0A0]"
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
                  <p className="text-xs text-[#8A7250] uppercase tracking-wider font-semibold">
                    Kinetic & Internal Mechanics Pillar
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-[#303331] text-base leading-relaxed font-light">
                <p>{activeDifference.description}</p>
                <div className="p-4 rounded-xl bg-[#DFD9CC] border border-[#D5CEBF] space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#171918] block">
                    Gongfu Application & Form Practice:
                  </span>
                  <p className="text-xs text-[#303331]">
                    Practiced through slow, rigorous repetition in traditional Gongfu Jia Yilu. Body alignment and joint rotation are tested to ensure power travels uninterrupted from heels through waist to fingertips.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gongfu Mechanics Focus Box */}
        <div className="mb-20 bg-gradient-to-r from-[#243B45]/10 via-[#E8E4DA] to-[#8A7250]/10 p-8 sm:p-10 rounded-3xl border border-[#D5CEBF] relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#9B3D2E]">
              <Flame className="w-4 h-4 text-[#9B3D2E]" />
              <span>Martial Tradition vs Modern Adaptations</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#171918]">
              Preserving Authentic Martial Gongfu Jia
            </h3>

            <p className="text-sm text-[#303331] leading-relaxed font-light">
              Unlike modern simplified health routines or spa-oriented adaptations, traditional Chen Family Taijiquan maintains its full martial integrity. Training develops real physical power, joint resilience, and rooted balance through precise body mechanics rather than passive relaxation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#E8E4DA] border border-[#D5CEBF] space-y-1">
                <h4 className="text-xs font-semibold text-[#171918] uppercase tracking-wider">
                  Gongfu Jia (First Road / Yilu)
                </h4>
                <p className="text-xs text-[#5A5E5B]">
                  Classic routine establishing whole-body connection, leg strength, and waist-driven movement.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#E8E4DA] border border-[#D5CEBF] space-y-1">
                <h4 className="text-xs font-semibold text-[#171918] uppercase tracking-wider">
                  Push Hands (Tui Shou)
                </h4>
                <p className="text-xs text-[#5A5E5B]">
                  Cooperative two-person drills testing structure, sensitivity, and force deflection.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div>
          <h3 className="font-serif text-2xl text-[#171918] font-normal mb-8 text-center sm:text-left flex items-center justify-center sm:justify-start space-x-3">
            <span className="w-8 h-px bg-[#8A7250]" />
            <span>Physical & Internal Benefits of Training</span>
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
