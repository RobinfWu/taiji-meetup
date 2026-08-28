"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TAIJI_DATA } from "../data/taijiData";
import { Menu, X, ArrowRight } from "lucide-react";

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
    { href: "/method", label: "Method" },
    { href: "/about", label: "About" },
    { href: "/classes", label: "Classes" },
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
          <div className="w-10 h-10 rounded-full bg-[#171918] text-[#E8E4DA] flex items-center justify-center font-serif text-xl font-bold border border-[#303331] group-hover:border-[#9B3D2E] transition-colors shadow-xs">
            ☯
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-serif text-xl font-bold tracking-wide text-[#171918]">
                TAIJI LAB
              </span>
            </div>
            <p className="text-xs text-[#303331] font-light hidden md:block">
              {TAIJI_DATA.groupName}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5 bg-[#DFD9CC]/90 p-1.5 rounded-full border border-[#D5CEBF]">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
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

        {/* Action Button: Start Here */}
        <div className="hidden sm:flex items-center space-x-3">
          <Link
            href="/start"
            className="inline-flex items-center space-x-2 bg-[#9B3D2E] hover:bg-[#7D3024] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-md cursor-pointer active:scale-98 border border-[#9B3D2E]"
          >
            <span>Start Here</span>
            <ArrowRight className="w-3.5 h-3.5 text-white/90" />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center space-x-2">
          <Link
            href="/start"
            className="px-3 py-1.5 rounded-full bg-[#9B3D2E] text-white text-xs font-bold flex items-center space-x-1"
          >
            <span>Start Here</span>
          </Link>
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
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
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

          <div className="mt-4 pt-4 border-t border-[#D5CEBF]">
            <Link
              href="/start"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 bg-[#9B3D2E] text-white py-3 rounded-xl text-sm font-bold shadow-md"
            >
              <span>Start Here — Your First Class</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

