"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { WhatIsTaijiSection } from "./components/WhatIsTaijiSection";
import { LineageSection } from "./components/LineageSection";
import { ClassesScheduleSection } from "./components/ClassesScheduleSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("home");

  const handleNavigateTab = (tabId: string) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll spy to highlight active section in Navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "what-is-taiji", "lineage", "classes", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#E8E4DA] text-[#171918] relative flex flex-col font-sans selection:bg-[#9B3D2E]/15 selection:text-[#9B3D2E]">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigateTab}
      />

      {/* Main Content Sections */}
      <div className="flex-1">
        <HeroSection
          onNavigateTab={handleNavigateTab}
        />

        <WhatIsTaijiSection />

        <LineageSection />

        <ClassesScheduleSection
          onNavigateTab={handleNavigateTab}
        />

        <ContactSection />
      </div>

      {/* Footer */}
      <Footer
        onNavigateTab={handleNavigateTab}
      />
    </main>
  );
}