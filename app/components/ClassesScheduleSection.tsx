"use client";

import React, { useState } from "react";
import { TAIJI_DATA, ClassSession } from "../data/taijiData";
import { Calendar, MapPin, Clock, Users, ChevronDown, ChevronUp, Mail, Info, ExternalLink } from "lucide-react";

interface ClassesScheduleSectionProps {
  onNavigateTab: (tabId: string) => void;
}

export const ClassesScheduleSection: React.FC<ClassesScheduleSectionProps> = ({
  onNavigateTab,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <section id="classes" className="py-20 bg-[#DFD9CC]/40 border-t border-[#D5CEBF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#243B45]/10 text-[#243B45] text-xs font-semibold uppercase tracking-widest border border-[#243B45]/20">
            <span>Training Schedule & Location</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#171918]">
            Classes & <span className="font-normal italic text-[#243B45]">Schedule</span>
          </h2>
          <p className="text-[#303331] text-base sm:text-lg leading-relaxed font-light">
            Our group practices outdoors with structured instruction in traditional Gongfu Jia Yilu (First Road) and Push Hands. We keep groups focused and dedicated.
          </p>
        </div>

        {/* Schedule Cards Grid */}
        <div className="mb-20">
          <h3 className="font-serif text-2xl text-[#171918] font-normal mb-8 flex items-center space-x-3">
            <span className="w-8 h-px bg-[#243B45]" />
            <span>Weekly Practice Schedule</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TAIJI_DATA.classes.map((session: ClassSession) => (
              <div
                key={session.id}
                className="bg-[#E8E4DA] p-6 rounded-3xl border border-[#D5CEBF] space-y-5 flex flex-col justify-between shadow-xs hover:border-[#171918]/40 transition-all duration-200"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#243B45]/10 text-[#243B45] border border-[#243B45]/20">
                      {session.level}
                    </span>
                    <span className="text-xs font-serif italic text-[#8A7250]">
                      Traditional Practice
                    </span>
                  </div>

                  <h4 className="font-serif text-xl font-semibold text-[#171918] leading-snug">
                    {session.title}
                  </h4>

                  <p className="text-xs text-[#303331] leading-relaxed font-light">
                    {session.description}
                  </p>

                  <div className="pt-3 border-t border-[#D5CEBF] space-y-2 text-xs text-[#303331]">
                    <div className="flex items-center space-x-2.5">
                      <Calendar className="w-4 h-4 text-[#8A7250]" />
                      <span className="font-semibold text-[#171918]">
                        {session.day}, {session.time}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2.5">
                      <MapPin className="w-4 h-4 text-[#243B45]" />
                      <span>{session.location}</span>
                    </div>

                    <div className="flex items-center space-x-2.5">
                      <Users className="w-4 h-4 text-[#303331]" />
                      <span>Taught by {session.instructor}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onNavigateTab("contact")}
                  className="w-full mt-4 py-3 bg-[#171918] hover:bg-[#303331] text-[#E8E4DA] text-xs font-semibold rounded-2xl transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-xs border border-[#303331]"
                >
                  <Mail className="w-3.5 h-3.5 text-[#8A7250]" />
                  <span>Inquire via Email for {session.day} Session</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Location Cards Section */}
        <div className="mb-20">
          <h3 className="font-serif text-2xl text-[#171918] font-normal mb-8 flex items-center space-x-3">
            <span className="w-8 h-px bg-[#8A7250]" />
            <span>Practice Location & Equipment Guidelines</span>
          </h3>

          <div className="grid grid-cols-1 gap-6">
            {TAIJI_DATA.locations.map((loc, idx) => (
              <div
                key={idx}
                className="bg-[#E8E4DA] p-6 sm:p-8 rounded-3xl border border-[#D5CEBF] space-y-4 shadow-xs"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#243B45]/10 text-[#243B45] flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-semibold text-[#171918]">
                      {loc.name}
                    </h4>
                    <p className="text-xs text-[#243B45] font-semibold">
                      {loc.scheduleNote}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#DFD9CC] border border-[#D5CEBF] text-xs space-y-1">
                  <span className="text-[#5A5E5B] font-semibold block uppercase tracking-wider text-[10px]">
                    Address Details (Editable Placeholder)
                  </span>
                  <p className="font-semibold text-[#171918]">
                    {loc.address}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#E8E4DA] border border-[#D5CEBF] text-xs text-[#303331]">
                  <span className="font-semibold text-[#171918] block mb-1">
                    Attire & Footwear Advice:
                  </span>
                  <p>{loc.tips}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Frequently Asked Questions Section */}
        <div className="bg-[#E8E4DA] p-6 sm:p-10 rounded-3xl border border-[#D5CEBF] shadow-xs space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D5CEBF] pb-6">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#171918]">
                Frequently Asked Questions
              </h3>
              <p className="text-xs sm:text-sm text-[#303331] mt-1">
                Details on footwear, training philosophy, and how to get started.
              </p>
            </div>

            <a
              href="https://molingtaiji.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-[#243B45]/10 hover:bg-[#243B45]/20 text-[#243B45] px-4 py-2.5 rounded-xl text-xs font-semibold border border-[#243B45]/20 transition-colors self-start sm:self-auto"
            >
              <span>Teacher&apos;s Site: Mo Ling Taiji (molingtaiji.com)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TAIJI_DATA.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#DFD9CC]/70 rounded-2xl border border-[#D5CEBF] overflow-hidden transition-all duration-200 self-start"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4.5 flex items-center justify-between space-x-3 cursor-pointer hover:bg-[#DFD9CC]"
                  >
                    <span className="font-serif text-base font-semibold text-[#171918]">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#9B3D2E] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#5A5E5B] shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4.5 pb-4 pt-1 text-xs text-[#303331] leading-relaxed border-t border-[#D5CEBF]/60 font-light">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
