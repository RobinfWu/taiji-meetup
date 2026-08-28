"use client";

import React, { useState, useEffect } from "react";
import { TAIJI_DATA } from "../data/taijiData";
import { Menu, X, Mail, ExternalLink } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
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
    { id: "contact", label: "Contact" },
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
          ? "bg-[#E8E4DA]/95 backdrop-blur-md shadow-xs border-b border-[#D5CEBF] py-3.5"
          : "bg-[#E8E4DA]/80 backdrop-blur-xs py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Emblem */}
        <button
          onClick={() => handleNavClick("home")}
          className="flex items-center space-x-3 text-left group focus:outline-none cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-[#171918] text-[#E8E4DA] flex items-center justify-center font-serif text-xl font-bold border border-[#303331] group-hover:border-[#9B3D2E] transition-colors shadow-xs">
            ☯
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-serif text-xl font-semibold tracking-wide text-[#171918]">
                {TAIJI_DATA.groupName}
              </span>
            </div>
            <p className="text-xs text-[#303331] font-light hidden md:block">
              {TAIJI_DATA.tagline}
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5 bg-[#DFD9CC]/90 p-1.5 rounded-full border border-[#D5CEBF]">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#171918] text-[#E8E4DA] shadow-xs"
                    : "text-[#303331] hover:text-[#171918] hover:bg-[#D5CEBF]/60"
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
            onClick={() => handleNavClick("contact")}
            className="inline-flex items-center space-x-2 bg-[#171918] hover:bg-[#303331] text-[#E8E4DA] px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-xs cursor-pointer active:scale-98 border border-[#303331]"
          >
            <Mail className="w-3.5 h-3.5 text-[#8A7250]" />
            <span>Contact Instructor</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={() => handleNavClick("contact")}
            className="p-2 rounded-full bg-[#171918] text-white text-xs font-medium"
            title="Contact"
          >
            <Mail className="w-4 h-4 text-[#8A7250]" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#171918] hover:bg-[#DFD9CC] focus:outline-none"
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
        <div className="md:hidden bg-[#E8E4DA] border-b border-[#D5CEBF] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-[#171918] text-[#E8E4DA]"
                      : "text-[#171918] hover:bg-[#DFD9CC]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-[#D5CEBF]">
            <button
              onClick={() => handleNavClick("contact")}
              className="w-full flex items-center justify-center space-x-2 bg-[#171918] text-[#E8E4DA] py-3 rounded-xl text-sm font-semibold"
            >
              <Mail className="w-4 h-4 text-[#8A7250]" />
              <span>Contact Instructor Email</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
