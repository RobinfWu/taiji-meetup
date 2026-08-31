"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { TAIJI_DATA } from "../data/taijiData";
import {
  Compass,
  Shield,
  Feather,
  Activity,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  GitMerge,
  Layers
} from "lucide-react";

export default function MethodPage() {
  const [activeTab, setActiveTab] = useState(TAIJI_DATA.differences[0].id);

  const activeDifference =
    TAIJI_DATA.differences.find((d) => d.id === activeTab) ||
    TAIJI_DATA.differences[0];

  return (
    <main className="min-h-screen bg-[#E8E4DA] text-[#171918] relative flex flex-col font-sans selection:bg-[#9B3D2E]/15 selection:text-[#9B3D2E]">
      <Navbar />

      <div className="flex-1 pt-28 pb-20">
        {/* Page Hero Header */}
        <section className="py-12 md:py-16 bg-[#DFD9CC]/60 border-b border-[#D5CEBF] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#243B45]/10 text-[#243B45] text-xs font-semibold uppercase tracking-widest border border-[#243B45]/20">
                <Compass className="w-3.5 h-3.5" />
                <span>About Our Method</span>
              </div>
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#171918]">
                  How We <span className="font-normal italic text-[#243B45]">Train</span>
                </h1>
                <p className="text-lg text-[#303331] leading-relaxed font-light">
                  Let's dive deeper into what this Taijiquan method is about.
                </p>
            </div>
          </div>
        </section>

        {/* Core Methodology Sections */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          {/* Section 1: What is Taijiquan & Approach */}
          <div className="bg-[#DFD9CC] p-8 sm:p-12 rounded-3xl border border-[#D5CEBF] shadow-xs space-y-6">
            <h2 className="font-serif text-3xl font-semibold text-[#171918]">
              What is Taijiquan?
            </h2>
            <p className="text-[#303331] text-base sm:text-lg leading-relaxed font-light">
              Many Chinese martial arts follow a naming scheme: Taiji<strong className="font-semibold text-[#171918]">quan</strong>, Xingyi<strong className="font-semibold text-[#171918]">quan</strong>, Baiji<strong className="font-semibold text-[#171918]">quan</strong>, Tanglang<strong className="font-semibold text-[#171918]">quan</strong>, Hung Ga <strong className="font-semibold text-[#171918]">Kuen</strong>, etc...
            </p>
            <p className="text-[#303331] text-base sm:text-lg leading-relaxed font-light">
              "Quan" or "Kuen" translates to mean fist which denotes a martial art. Taijiquan therefore means “Taiji Fist” — a martial art named after the concept of Taiji (the interplay of Yin and Yang). It is a Northern Chinese martial art that originated from the Chen Village (Chenjiagou) in Henan Province.
            </p>
            <p className="text-[#303331] text-base sm:text-lg leading-relaxed font-light">
              Taijiquan is a family art. It was commonly passed down from father to son or from “master” to “apprentice”. The Chen family developed it first. The founder of the Yang family learned from the Chen family; the founder of the Wu family later learned from the Yang family.
            </p>
            <p className="text-[#303331] text-base sm:text-lg leading-relaxed font-light">
              This is the historical root of what most people today simply call “Tai Chi.”
            </p>
          </div>
          <div className="bg-[#DFD9CC] p-8 sm:p-12 rounded-3xl border border-[#D5CEBF] shadow-xs space-y-6">
            <h2 className="font-serif text-3xl font-semibold text-[#171918]">
              What is Gongfu Jia?
            </h2>
            <p className="text-[#303331] text-base sm:text-lg leading-relaxed font-light">
              If Taijiquan refers to a martial art “style” and Chen Family Taijiquan refers to a “substyle” (hence Chen “Style” Taijiquan), then “Gongfu Jia” (Gongfu Frame) refers to a specific lineage and training approach within the Chen Family.
            </p>
            <p className="text-[#303331] text-base sm:text-lg leading-relaxed font-light">
              That lineage can be traced to Chen Zhaokui (son of Chen Fake).
            </p>
          </div>

          {/* Section 2: Deep Dive into Differences (Methodology vs Principles, Leg Foundation, Yin/Yang, Push Hands) */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#243B45]">
                Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#171918]">
                Our Approach to Taijiquan
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Tab Navigation */}
              <div className="lg:col-span-4 space-y-3">
                {TAIJI_DATA.differences.map((diff) => {
                  const isSelected = diff.id === activeTab;
                  return (
                    <button
                      key={diff.id}
                      onClick={() => setActiveTab(diff.id)}
                      className={`w-full text-left p-5 rounded-2xl transition-all duration-200 border cursor-pointer ${
                        isSelected
                          ? "bg-[#171918] text-[#E8E4DA] border-[#171918] shadow-md transform translate-x-1"
                          : "bg-[#DFD9CC]/70 border-[#D5CEBF] text-[#171918] hover:bg-[#E8E4DA]/70"
                      }`}
                    >
                      <div className="font-serif text-lg font-semibold mb-1">
                        {diff.title}
                      </div>
                      <p className={`text-xs ${isSelected ? "text-[#DFD9CC]" : "text-[#57625B]"}`}>
                        {diff.summary}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Active Tab Full Content */}
              <div className="lg:col-span-8 bg-[#DFD9CC] p-8 sm:p-10 rounded-3xl border border-[#D5CEBF] shadow-xs space-y-6">
                <div className="flex items-center space-x-4 border-b border-[#D5CEBF] pb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#171918] text-[#E8E4DA] flex items-center justify-center font-serif text-2xl font-bold shadow-xs">
                    ☯
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-[#171918]">
                      {activeDifference.title}
                    </h3>
                    <p className="text-xs text-[#8A7250] font-semibold">
                      {activeDifference.summary}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-[#303331] text-base leading-relaxed font-light whitespace-pre-line">
                  {activeDifference.description}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Common Misconceptions (Myths vs Reality) */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#9B3D2E]">
                Clearing Misconceptions
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#171918]">
                Common Misconceptions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TAIJI_DATA.mythsAndRealities.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#DFD9CC] rounded-3xl p-6 border border-[#D5CEBF] shadow-xs space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#9B3D2E]/10 text-[#9B3D2E] text-[11px] font-semibold border border-[#9B3D2E]/20">
                      <span>{item.badge}</span>
                    </div>

                    <div className="flex items-start space-x-2.5 text-[#9B3D2E] bg-[#E8E4DA] p-3 rounded-xl border border-[#D5CEBF]">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider block text-[#9B3D2E]">
                          Misconception:
                        </span>
                        <p className="text-xs font-medium text-[#303331]">
                          &ldquo;{item.myth}&rdquo;
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2.5 text-[#243B45] bg-[#E2DCD0] p-3 rounded-xl border border-[#D5CEBF]">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#243B45]" />
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider block text-[#243B45]">
                          Our Approach:
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

          {/* Next Step CTA */}
          <div className="bg-[#171918] text-[#E8E4DA] p-8 sm:p-12 rounded-3xl border border-[#303331] text-center space-y-6">
            <h3 className="font-serif text-3xl font-light">
              Ready to see how this translates into practice?
            </h3>
            <p className="text-sm text-[#DFD9CC] max-w-xl mx-auto font-light">
              Now that you understand our methodology, learn about our lineage and instructor, or find out what your first class will be like.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/about"
                className="px-6 py-3 rounded-full bg-[#DFD9CC] text-[#171918] text-xs font-semibold hover:bg-[#D5CEBF] transition-colors"
              >
                Learn About Robin & Lineage →
              </Link>
              <Link
                href="/start"
                className="px-6 py-3 rounded-full bg-[#9B3D2E] text-white text-xs font-bold hover:bg-[#7D3024] transition-colors flex items-center space-x-2"
              >
                <span>Start Here — Your First Class</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </section>
      </div>

      <Footer />
    </main>
  );
}
