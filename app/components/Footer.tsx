"use client";

import React from "react";
import { TAIJI_DATA } from "../data/taijiData";
import { Mail, Phone, ExternalLink } from "lucide-react";

interface FooterProps {
  onNavigateTab: (tabId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  return (
    <footer className="bg-[#171918] text-[#E8E4DA] pt-16 pb-12 border-t border-[#303331] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#303331]">
          {/* Brand & Philosophy Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#E8E4DA] text-[#171918] flex items-center justify-center font-serif text-xl font-bold">
                ☯
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold tracking-wide">
                  {TAIJI_DATA.groupName}
                </h3>
                <p className="text-xs text-[#8A7250] font-serif">
                  • Gongfu Jia
                </p>
              </div>
            </div>

            <p className="text-xs text-[#DFD9CC] leading-relaxed max-w-sm font-light">
              Dedicated to preserving the structural integrity, spiral mechanics, and traditional martial heritage of Chen Family Taijiquan.
            </p>

            <div className="p-3.5 rounded-xl bg-[#243B45]/20 border border-[#243B45]/40 text-xs text-[#8A7250] italic font-serif">
              &ldquo;Rooted in structure, expressed through spiraling force.&rdquo;
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-semibold text-[#8A7250] uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#DFD9CC]">
              <li>
                <button
                  onClick={() => onNavigateTab("home")}
                  className="hover:text-[#9B3D2E] transition-colors cursor-pointer"
                >
                  Home / Welcome
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab("what-is-taiji")}
                  className="hover:text-[#9B3D2E] transition-colors cursor-pointer"
                >
                  What is Taiji? (Internal Mechanics)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab("lineage")}
                  className="hover:text-[#9B3D2E] transition-colors cursor-pointer"
                >
                  Lineage Tree & Instructor Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab("classes")}
                  className="hover:text-[#9B3D2E] transition-colors cursor-pointer"
                >
                  Classes & Location Schedule
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab("contact")}
                  className="hover:text-[#9B3D2E] transition-colors cursor-pointer font-semibold text-[#E8E4DA]"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details & Placeholders */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif text-sm font-semibold text-[#8A7250] uppercase tracking-wider">
              Contact Email & Teacher Site
            </h4>
            <div className="space-y-2 text-xs text-[#DFD9CC]">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#8A7250]" />
                <span>{TAIJI_DATA.contact.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#243B45]" />
                <span>{TAIJI_DATA.contact.phone}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={TAIJI_DATA.contact.teacherWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-[#243B45] hover:bg-[#304B57] text-[#E8E4DA] px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border border-[#304B57]"
              >
                <span>Teacher&apos;s Site: Mo Ling Taiji</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#8A7250]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A7250] gap-4">
          <p>© {new Date().getFullYear()} {TAIJI_DATA.groupName}. Built with Next.js & Tailwind CSS.</p>
          <div className="flex items-center space-x-4">
            <a
              href="https://molingtaiji.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#DFD9CC] hover:text-white transition-colors underline"
            >
              Mo Ling Taiji (molingtaiji.com)
            </a>
            <span>•</span>
            <span className="hover:text-[#DFD9CC] cursor-pointer">Traditional Gongfu Jia</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
