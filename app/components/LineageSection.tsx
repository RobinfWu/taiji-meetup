"use client";

import React from "react";
import { TAIJI_DATA } from "../data/taijiData";
import { GitCommit, Info, ExternalLink, Award } from "lucide-react";

export const LineageSection: React.FC = () => {
  const { lineageInfo, lineageTree } = TAIJI_DATA;

  return (
    <section id="lineage" className="py-20 bg-[#E8E4DA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#8A7250]/10 text-[#8A7250] text-xs font-semibold uppercase tracking-widest border border-[#8A7250]/20">
            <span>Direct Lineage Transmission</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#171918]">
            Lineage & <span className="font-normal italic text-[#243B45]">Instructor Profile</span>
          </h2>
          <p className="text-[#303331] text-base sm:text-lg leading-relaxed font-light">
            Traditional Taijiquan relies on direct teacher-to-student transmission.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Instructor Bio & Profile + Parallel Images */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#DFD9CC] border border-[#D5CEBF] space-y-6 shadow-xs relative">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-[#171918] text-[#E8E4DA] flex items-center justify-center font-serif text-3xl font-bold shadow-sm border border-[#303331]">
                  ☯
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-[#171918]">
                    {lineageInfo.instructorName}
                  </h3>
                  <p className="text-sm font-semibold text-[#243B45]">
                    {lineageInfo.title}
                  </p>
                </div>
              </div>

              {/* Bio Note */}
              <div className="p-4 rounded-xl bg-[#E8E4DA] border border-[#D5CEBF] space-y-2">
                <div className="flex items-center space-x-2 text-xs font-semibold text-[#8A7250] uppercase tracking-wider">
                  <Info className="w-4 h-4" />
                  <span>Instructor Training History</span>
                </div>
                <p className="text-sm text-[#303331] leading-relaxed font-light">
                  {lineageInfo.bio}
                </p>
              </div>

              {/* Lineage Teacher Reference Link */}
              <div className="p-4 rounded-2xl bg-[#243B45]/10 border border-[#243B45]/25 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#243B45] uppercase tracking-wider">
                    Lineage Teacher & Academy
                  </span>
                  <ExternalLink className="w-4 h-4 text-[#243B45]" />
                </div>
                <p className="text-xs text-[#303331] leading-relaxed">
                  Trained directly under <strong className="text-[#171918]">{lineageInfo.teacherName}</strong>, senior disciple of Master Chen Yu.
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
            </div>

            {/* Images Running Parallel to Lineage Tree Visualizer */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-[#5A5E5B] uppercase tracking-wider px-1">
                Marin Spivack and Robin Wu
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden border border-[#D5CEBF] bg-[#DFD9CC] shadow-xs group">
                  <img
                    src="/IMG_2499.jpg"
                    alt="Marin Spivack and Robin Wu"
                    className="w-full h-52 object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                </div>

                <div className="rounded-2xl overflow-hidden border border-[#D5CEBF] bg-[#DFD9CC] shadow-xs group">
                  <img
                    src="/IMG_2503.jpg"
                    alt="Baishi Ceremony"
                    className="w-full h-52 object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Lineage Tree Visualizer */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#DFD9CC]/90 border border-[#D5CEBF] space-y-6 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-[#171918]">
                    Historical Lineage Transmission
                  </h3>
                  <p className="text-xs text-[#5A5E5B]">
                    Chenjiagou 17th Century Origin to Present
                  </p>
                </div>
                <GitCommit className="w-6 h-6 text-[#8A7250]" />
              </div>

              {/* Lineage Steps Timeline */}
              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[#B8B0A0]">
                {lineageTree.map((item, idx) => (
                  <div key={idx} className="relative flex items-start space-x-4 pl-2">
                    {/* Timeline Node */}
                    <div className="w-4 h-4 rounded-full bg-[#171918] border-2 border-[#E8E4DA] shadow-xs shrink-0 mt-1 z-10" />
                    
                    <div className="bg-[#E8E4DA] p-4 rounded-2xl border border-[#D5CEBF] space-y-1.5 flex-1 shadow-xs">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <span className="font-serif text-base font-semibold text-[#171918]">
                          {item.generation}
                        </span>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#243B45]/10 text-[#243B45]">
                          {item.era}
                        </span>
                      </div>
                      
                      <div className="text-xs font-semibold text-[#9B3D2E]">
                        {item.figures.join(", ")}
                      </div>

                      <p className="text-xs text-[#303331] leading-relaxed pt-1 font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
