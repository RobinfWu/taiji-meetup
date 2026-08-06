"use client";

import React from "react";
import { TAIJI_DATA } from "../data/taijiData";
import { Mail, Phone, Heart, Calendar, Compass, BookOpen } from "lucide-react";

interface FooterProps {
  onNavigateTab: (tabId: string) => void;
  onOpenRSVP: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab, onOpenRSVP }) => {
  return (
    <footer className="bg-[#1F2421] text-[#FBF9F5] pt-16 pb-12 border-t border-[#333A3E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#333A3E]">
          {/* Brand & Philosophy Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#4A6B5D] text-white flex items-center justify-center font-serif text-xl font-bold">
                ☯
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold tracking-wide">
                  {TAIJI_DATA.groupName}
                </h3>
                <p className="text-xs text-[#8DA399] font-serif">
                  {TAIJI_DATA.chineseTitle} • Authentic Lineage Practice
                </p>
              </div>
            </div>

            <p className="text-xs text-[#D5CDC2] leading-relaxed max-w-sm font-light">
              Open to all members of our local community.
            </p>

            <div className="p-3.5 rounded-xl bg-[#2A302D] border border-[#3A433F] text-xs text-[#8DA399] italic font-serif">
              &ldquo;Rooted like a mountain, moving like a river.&rdquo;
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-semibold text-[#8DA399] uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#D5CDC2]">
              <li>
                <button
                  onClick={() => onNavigateTab("home")}
                  className="hover:text-[#4A6B5D] transition-colors cursor-pointer"
                >
                  Home / Welcome
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab("what-is-taiji")}
                  className="hover:text-[#4A6B5D] transition-colors cursor-pointer"
                >
                  What is Taiji? (Principles & Health)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab("lineage")}
                  className="hover:text-[#4A6B5D] transition-colors cursor-pointer"
                >
                  Lineage Tree & Instructor Bio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab("classes")}
                  className="hover:text-[#4A6B5D] transition-colors cursor-pointer"
                >
                  Classes & Location Schedule
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details & Placeholders */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif text-sm font-semibold text-[#8DA399] uppercase tracking-wider">
              Contact & Inquiries
            </h4>
            <div className="space-y-2 text-xs text-[#D5CDC2]">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#9E7B56]" />
                <span>{TAIJI_DATA.contact.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#4C6275]" />
                <span>{TAIJI_DATA.contact.phone}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenRSVP}
                className="inline-flex items-center space-x-2 bg-[#4A6B5D] hover:bg-[#3B574B] text-white px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>RSVP First Free Class</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#808B84] gap-4">
          <p>© {new Date().getFullYear()} {TAIJI_DATA.groupName}. Built with Next.js & Tailwind CSS.</p>
          <div className="flex items-center space-x-4">
            <span className="hover:text-[#D5CDC2] cursor-pointer">Chen Zhaokui Association</span>
            <span>•</span>
            <span className="hover:text-[#D5CDC2] cursor-pointer">Traditional Internal Arts</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
