"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { WhatIsTaijiSection } from "./components/WhatIsTaijiSection";
import { LineageSection } from "./components/LineageSection";
import { ClassesScheduleSection } from "./components/ClassesScheduleSection";
import { Footer } from "./components/Footer";
import { RSVPModal } from "./components/RSVPModal";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false);
  const [rsvpInitialClassId, setRsvpInitialClassId] = useState<string | undefined>(undefined);

  const handleOpenRSVP = (classId?: string) => {
    setRsvpInitialClassId(classId);
    setIsRSVPModalOpen(true);
  };

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
      const sections = ["home", "what-is-taiji", "lineage", "classes"];
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
    <main className="min-h-screen bg-[#FBF9F5] text-[#1F2421] relative flex flex-col font-sans selection:bg-[#4A6B5D]/20 selection:text-[#3D5A4C]">
      {/* Sleek Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigateTab}
        onOpenRSVP={handleOpenRSVP}
      />

      {/* Page Content Sections */}
      <div className="flex-1">
        <HeroSection
          onOpenRSVP={handleOpenRSVP}
          onNavigateTab={handleNavigateTab}
        />

        <WhatIsTaijiSection />

        <LineageSection />

        <ClassesScheduleSection onOpenRSVP={handleOpenRSVP} />
      </div>

      {/* Footer */}
      <Footer
        onNavigateTab={handleNavigateTab}
        onOpenRSVP={() => handleOpenRSVP()}
      />

      {/* RSVP Popup Modal */}
      <RSVPModal
        isOpen={isRSVPModalOpen}
        onClose={() => setIsRSVPModalOpen(false)}
        initialClassId={rsvpInitialClassId}
      />
    </main>
  );
}