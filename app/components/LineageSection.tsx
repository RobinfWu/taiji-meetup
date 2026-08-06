"use client";

import React from "react";
import { TAIJI_DATA } from "../data/taijiData";
import { UserCheck, Award, GitCommit, Heart, CheckCircle2, Info, ExternalLink } from "lucide-react";

export const LineageSection: React.FC = () => {
  const { lineageInfo, lineageTree } = TAIJI_DATA;

  return (
    <section id="lineage" className="py-20 bg-[#FBF9F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#9E7B56]/10 text-[#9E7B56] text-xs font-semibold uppercase tracking-widest">
            <span>Rooted Tradition • Authentic Heritage</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#1F2421]">
            Lineage & <span className="font-normal italic text-[#9E7B56]">Teaching Philosophy</span>
          </h2>
          <p className="text-[#57625B] text-base sm:text-lg leading-relaxed font-light">
            Taijiquan is passed down from heart to heart. We honor the deep historical traditions of Chenjiagou Village while maintaining an open, accessible, and supportive atmosphere for modern practitioners.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Instructor Bio & Profile */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#F3EFEA] border border-[#E4DED5] space-y-6 shadow-xs relative">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-[#4A6B5D] text-white flex items-center justify-center font-serif text-3xl font-bold shadow-sm">
                  ☯
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-[#1F2421]">
                    {lineageInfo.instructorName}
                  </h3>
                  <p className="text-sm font-medium text-[#4A6B5D]">
                    {lineageInfo.title}
                  </p>
                </div>
              </div>

              {/* Bio Note */}
              <div className="p-4 rounded-2xl bg-[#4A6B5D]/10 border border-[#4A6B5D]/25 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#4A6B5D] uppercase tracking-wider">
                    Instructor Bio
                  </span>
                  <ExternalLink className="w-4 h-4 text-[#4A6B5D]" />
                </div>
                <p className="text-xs text-[#57625B] leading-relaxed">
                  I trained under <strong className="text-[#1F2421]">Marin Spivack</strong>, senior disciple of Chen Yu.
                </p>
                <a
                  href="https://molingtaiji.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#4A6B5D] hover:text-[#3B574B] hover:underline pt-1"
                >
                  <span>Visit Mo Ling Taiji Official Website (molingtaiji.com)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Images Running Parallel to Lineage Tree Visualizer */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-[#808B84] uppercase tracking-wider px-1">
                Marin Spivack and Robin Wu
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden border border-[#E4DED5] bg-[#F3EFEA] shadow-xs group">
                  <img
                    src="/IMG_2499.jpg"
                    alt="Chen Family Taijiquan Form Alignment - IMG_2499.jpg"
                    className="w-full h-52 object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                </div>

                <div className="rounded-2xl overflow-hidden border border-[#E4DED5] bg-[#F3EFEA] shadow-xs group">
                  <img
                    src="/IMG_2503.jpg"
                    alt="Chen Family Taijiquan Silk Reeling - IMB_2503.jpg"
                    className="w-full h-52 object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Lineage Tree Visualizer */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#F3EFEA]/80 border border-[#E4DED5] space-y-6 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-[#1F2421]">
                    Historical Lineage Tree
                  </h3>
                  <p className="text-xs text-[#808B84]">
                    Transmission from 17th Century Henan to Present
                  </p>
                </div>
                <GitCommit className="w-6 h-6 text-[#9E7B56]" />
              </div>

              {/* Lineage Steps Timeline */}
              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[#D5CDC2]">
                {lineageTree.map((item, idx) => (
                  <div key={idx} className="relative flex items-start space-x-4 pl-2">
                    {/* Timeline Node */}
                    <div className="w-4 h-4 rounded-full bg-[#4A6B5D] border-2 border-[#FBF9F5] shadow-xs shrink-0 mt-1 z-10" />
                    
                    <div className="bg-[#FBF9F5] p-4 rounded-2xl border border-[#E8E2D9] space-y-1.5 flex-1 shadow-xs">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <span className="font-serif text-base font-semibold text-[#1F2421]">
                          {item.generation}
                        </span>
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#4C6275]/10 text-[#4C6275]">
                          {item.era}
                        </span>
                      </div>
                      
                      <div className="text-xs font-medium text-[#4A6B5D]">
                        Key Figures: {item.figures.join(", ")}
                      </div>

                      <p className="text-xs text-[#57625B] leading-relaxed pt-1">
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
