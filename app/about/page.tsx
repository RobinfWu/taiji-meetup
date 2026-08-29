"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { TAIJI_DATA } from "../data/taijiData";
import { GitCommit, Info, ExternalLink, Award, ArrowRight, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  const { lineageInfo, lineageTree } = TAIJI_DATA;

  return (
    <main className="min-h-screen bg-[#E8E4DA] text-[#171918] relative flex flex-col font-sans selection:bg-[#9B3D2E]/15 selection:text-[#9B3D2E]">
      <Navbar />

      <div className="flex-1 pt-28 pb-20">
        {/* Page Hero Header */}
        <section className="py-12 md:py-16 bg-[#DFD9CC]/60 border-b border-[#D5CEBF] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#8A7250]/10 text-[#8A7250] text-xs font-semibold uppercase tracking-widest border border-[#8A7250]/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Credibility & Authentic Transmission</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#171918]">
                About <span className="font-normal italic text-[#243B45]">Robin Wu</span> & Lineage
              </h1>
              <p className="text-lg text-[#303331] leading-relaxed font-light">
                Traditional Taijiquan relies on direct teacher-to-student transmission. Discover the history, lineage roots, and commitment to authentic Gongfu Jia transmission.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          {/* Robin Wu Bio & Philosophy */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 bg-[#DFD9CC] p-8 sm:p-10 rounded-3xl border border-[#D5CEBF] shadow-xs space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-[#171918] text-[#E8E4DA] flex items-center justify-center font-serif text-3xl font-bold border border-[#303331]">
                  ☯
                </div>
                <div>
                  <h2 className="font-serif text-3xl font-semibold text-[#171918]">
                    {lineageInfo.instructorName}
                  </h2>
                  <p className="text-sm font-semibold text-[#243B45]">
                    {lineageInfo.title}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#E8E4DA] border border-[#D5CEBF] space-y-2">
                <div className="flex items-center space-x-2 text-xs font-semibold text-[#8A7250] uppercase tracking-wider">
                  <Info className="w-4 h-4" />
                  <span>Instructor Training History</span>
                </div>
                <p className="text-base text-[#303331] leading-relaxed font-light">
                  {lineageInfo.bio}
                </p>
              </div>
            </div>

            {/* Lineage Teacher & Photos */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-3xl bg-[#243B45]/10 border border-[#243B45]/25 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#243B45] uppercase tracking-wider">
                    Lineage Teacher & Academy
                  </span>
                  <ExternalLink className="w-4 h-4 text-[#243B45]" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#171918]">
                  {lineageInfo.teacherName} (Mo Ling Taiji)
                </h3>
                <p className="text-xs text-[#303331] leading-relaxed">
                  Robin Wu trained directly under <strong>{lineageInfo.teacherName}</strong> as an indoor student/disciple. Marin Spivack is a senior disciple of Master Chen Yu, the only son of Chen Zhaokui.
                </p>
                <a
                  href={lineageInfo.teacherWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#243B45] hover:text-[#171918] hover:underline pt-1"
                >
                  <span>Visit Mo Ling Taiji Official Website ({lineageInfo.teacherSiteName})</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Photo Gallery */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-[#5A5E5B] uppercase tracking-wider px-1">
                  Marin Spivack and Robin Wu
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl overflow-hidden border border-[#D5CEBF] bg-[#DFD9CC] shadow-xs group">
                    <img
                      src="/IMG_2499.jpg"
                      alt="Marin Spivack and Robin Wu"
                      className="w-full h-48 object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-[#D5CEBF] bg-[#DFD9CC] shadow-xs group">
                    <img
                      src="/IMG_2503.jpg"
                      alt="Baishi Ceremony"
                      className="w-full h-48 object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Traditional Chen Zhaokui / Chen Yu Lineage */}
          <div className="bg-[#DFD9CC] p-8 sm:p-12 rounded-3xl border border-[#D5CEBF] shadow-xs space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#9B3D2E]">
              <Award className="w-4 h-4 text-[#9B3D2E]" />
              <span>Gongfu Jia Tradition</span>
            </div>
            <h2 className="font-serif text-3xl font-light text-[#171918]">
              The Chen Yu / Chen Zhaokui Tradition
            </h2>
            <p className="text-[#303331] leading-relaxed font-light">
              Master Chen Zhaokui (1928–1981), younger son of Chen Fake, preserved the intricate Gongfu Jia (&ldquo;Gongfu Frame&rdquo;) method. His son, Master Chen Yu (1962–Present), began training at age 7 and continues to transmit this precise, highly detailed physical methodology.
            </p>
          </div>

          {/* Full Lineage Tree Timeline */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8A7250]">
                Lineage Lineage Transmission
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#171918]">
                Historical Lineage Tree
              </h2>
              <p className="text-sm text-[#303331]">
                From 17th Century Chenjiagou origin down to local instruction today.
              </p>
            </div>

            <div className="bg-[#DFD9CC] p-6 sm:p-10 rounded-3xl border border-[#D5CEBF] shadow-xs space-y-6">
              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[#B8B0A0]">
                {lineageTree.map((item, idx) => (
                  <div key={idx} className="relative flex items-start space-x-4 pl-2">
                    <div className="w-4 h-4 rounded-full bg-[#171918] border-2 border-[#E8E4DA] shadow-xs shrink-0 mt-1 z-10" />
                    
                    <div className="bg-[#E8E4DA] p-5 rounded-2xl border border-[#D5CEBF] space-y-2 flex-1 shadow-xs">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <span className="font-serif text-lg font-semibold text-[#171918]">
                          {item.generation}
                        </span>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-[#243B45]/10 text-[#243B45]">
                          {item.era}
                        </span>
                      </div>
                      
                      <div className="text-sm font-semibold text-[#9B3D2E]">
                        {item.figures.join(", ")}
                      </div>

                      <p className="text-xs sm:text-sm text-[#303331] leading-relaxed pt-1 font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation CTA */}
          <div className="bg-[#171918] text-[#E8E4DA] p-8 sm:p-12 rounded-3xl border border-[#303331] text-center space-y-6">
            <h3 className="font-serif text-3xl font-light">
              Interested in joining a practice session?
            </h3>
            <p className="text-sm text-[#DFD9CC] max-w-xl mx-auto font-light">
              Check out our class schedule, training location, and what to expect in your very first class.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/classes"
                className="px-6 py-3 rounded-full bg-[#DFD9CC] text-[#171918] text-xs font-semibold hover:bg-[#D5CEBF] transition-colors"
              >
                View Classes & Schedule →
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
