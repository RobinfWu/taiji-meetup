"use client";

import React, { useState, useEffect } from "react";
import { TAIJI_DATA } from "../data/taijiData";
import { Menu, X, CalendarCheck, Sparkles } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenRSVP: (classId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenRSVP,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "what-is-taiji", label: "What is Taiji?" },
    { id: "lineage", label: "Lineage & About" },
    { id: "classes", label: "Classes & Schedule" },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FBF9F5]/90 backdrop-blur-md shadow-sm border-b border-[#E8E2D9] py-3.5"
          : "bg-[#FBF9F5]/70 backdrop-blur-xs py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Emblem */}
        <button
          onClick={() => handleNavClick("home")}
          className="flex items-center space-x-3 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full bg-[#4A6B5D]/10 border border-[#4A6B5D]/30 flex items-center justify-center text-[#4A6B5D] font-serif text-xl font-bold group-hover:bg-[#4A6B5D] group-hover:text-white transition-all duration-300 shadow-xs">
            ☯
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-serif text-xl font-semibold tracking-wide text-[#1F2421]">
                {TAIJI_DATA.groupName}
              </span>
              <span className="text-xs font-serif px-2 py-0.5 rounded bg-[#4A6B5D]/10 text-[#4A6B5D] hidden sm:inline-block border border-[#4A6B5D]/20">
                {TAIJI_DATA.chineseTitle}
              </span>
            </div>
            <p className="text-xs text-[#57625B] font-light hidden md:block">
              {TAIJI_DATA.tagline}
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-[#F3EFEA]/80 p-1.5 rounded-full border border-[#E4DED5]">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#4A6B5D] text-white shadow-xs"
                    : "text-[#57625B] hover:text-[#1F2421] hover:bg-[#EBE5DD]/60"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center space-x-3">
          <button
            onClick={() => onOpenRSVP()}
            className="inline-flex items-center space-x-2 bg-[#1F2421] hover:bg-[#333A3E] text-[#FBF9F5] px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer active:scale-98"
          >
            <CalendarCheck className="w-4 h-4 text-[#9E7B56]" />
            <span>Reserve Class</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={() => onOpenRSVP()}
            className="p-2 rounded-full bg-[#1F2421] text-white text-xs font-medium"
            title="RSVP"
          >
            <CalendarCheck className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#1F2421] hover:bg-[#F3EFEA] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FBF9F5] border-b border-[#E8E2D9] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? "bg-[#4A6B5D] text-white"
                      : "text-[#1F2421] hover:bg-[#F3EFEA]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-[#E8E2D9]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRSVP();
              }}
              className="w-full flex items-center justify-center space-x-2 bg-[#1F2421] text-white py-3 rounded-xl font-medium"
            >
              <CalendarCheck className="w-5 h-5 text-[#9E7B56]" />
              <span>RSVP For Next Class (Free)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
