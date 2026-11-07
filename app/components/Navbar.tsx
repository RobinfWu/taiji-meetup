"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TAIJI_DATA } from "../data/taijiData";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const pathname = usePathname();
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
    { href: "/", label: "Home" },
    { href: "/method", label: "How We Train" },
    { href: "/about", label: "About" },
    { href: "/classes", label: "Classes" },
    { href: "/start", label: "Your First Class" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#E8E4DA]/95 backdrop-blur-md shadow-xs border-b border-[#D5CEBF] py-3.5"
          : "bg-[#E8E4DA]/80 backdrop-blur-xs py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Emblem (TAIJI LAB) */}
        <Link
          href="/"
          className="flex items-center space-x-3 text-left group focus:outline-none cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full border border-[#303331] group-hover:border-[#9B3D2E] transition-colors shadow-xs overflow-hidden">
            <img src="/icon.png" alt="Taiji Lab logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-serif text-xl font-bold tracking-wide text-[#171918]">
                Chen Taijiquan
              </span>
            </div>
            <p className="text-xs text-[#303331] font-light hidden md:block">
              {TAIJI_DATA.groupName}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 lg:space-x-1.5 bg-[#DFD9CC]/90 p-1.5 rounded-full border border-[#D5CEBF]">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#171918] text-[#E8E4DA] shadow-xs"
                    : "text-[#303331] hover:text-[#171918] hover:bg-[#D5CEBF]/60"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#171918] hover:bg-[#DFD9CC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#243B45]"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
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
        <nav id="mobile-navigation" className="lg:hidden bg-[#E8E4DA] border-b border-[#D5CEBF] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-[#171918] text-[#E8E4DA]"
                      : "text-[#171918] hover:bg-[#DFD9CC]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

        </nav>
      )}
    </header>
  );
};

