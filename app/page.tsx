"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { Footer } from "./components/Footer";
import { TAIJI_DATA } from "./data/taijiData";
import {
  Shield,
  Feather,
  Activity,
  Sun,
  Flame,
  ArrowRight,
  Sparkles,
  BookOpen,
  Calendar,
  MapPin,
  Mail,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const getBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case "Shield": return <Shield className="w-5 h-5 text-[#243B45]" />;
      case "Feather": return <Feather className="w-5 h-5 text-[#8A7250]" />;
      case "Activity": return <Activity className="w-5 h-5 text-[#9B3D2E]" />;
      case "Sun": return <Sun className="w-5 h-5 text-[#303331]" />;
      default: return <Sparkles className="w-5 h-5 text-[#243B45]" />;
    }
  };

  const primaryClass = TAIJI_DATA.classes[0];

  return (
    <main className="min-h-screen bg-[#E8E4DA] text-[#171918] relative flex flex-col font-sans selection:bg-[#9B3D2E]/15 selection:text-[#9B3D2E]">
      <Navbar />

      <div className="flex-1">
        {/* Step 1: Hero */}
        <HeroSection />

        {/* Step 2: What Taijiquan Offers */}
        <section className="py-20 bg-[#DFD9CC]/50 border-y border-[#D5CEBF] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#243B45]/10 text-[#243B45] text-xs font-semibold uppercase tracking-widest border border-[#243B45]/20">
                <span>Concrete Health & Physical Benefits</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#171918]">
                What <span className="font-normal italic text-[#243B45]">Taijiquan</span> Offers
              </h2>
              <p className="text-[#303331] text-base sm:text-lg leading-relaxed font-light">
                Chen Family Taijiquan is the original progenitor of &ldquo;Tai Chi&rdquo;—a traditional northern Chinese discipline originating from Chenjiagou in Henan Province.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TAIJI_DATA.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="bg-[#E8E4DA] p-6 rounded-2xl border border-[#D5CEBF] space-y-3 shadow-xs hover:border-[#243B45]/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#DFD9CC] border border-[#D5CEBF] flex items-center justify-center">
                    {getBenefitIcon(benefit.icon)}
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#171918]">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-[#303331] leading-relaxed font-light">
                    {benefit.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Step 3: One Art / Scalable Intensity */}
        <section className="py-20 bg-[#E8E4DA] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#243B45]/10 via-[#DFD9CC] to-[#8A7250]/10 p-8 sm:p-12 rounded-3xl border border-[#D5CEBF] relative overflow-hidden">
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#243B45]">
                  <Flame className="w-4 h-4 text-[#9B3D2E]" />
                  <span>One Routine • Scalable Intensity for All Goals</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#171918]">
                  One Art / Scalable Intensity
                </h2>

                <p className="text-base text-[#303331] leading-relaxed font-light">
                  All students learn the same core Gongfu Jia skeleton (First Road / Yilu), but stance depth and exertion level are customized. Health seekers and challenge seekers train in the same supportive environment, learning from one another without force or pressure.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {TAIJI_DATA.scalableTiers.map((tier) => (
                    <div key={tier.id} className="p-5 rounded-2xl bg-[#E8E4DA] border border-[#D5CEBF] space-y-2">
                      <div className="flex items-center space-x-2 text-[#171918]">
                        {tier.icon === "Shield" ? <Shield className="w-4 h-4 text-[#243B45]" /> : <Flame className="w-4 h-4 text-[#9B3D2E]" />}
                        <h3 className="text-sm font-semibold font-serif text-[#171918]">
                          {tier.title}
                        </h3>
                      </div>
                      <p className="text-[11px] font-semibold text-[#8A7250] uppercase tracking-wider">
                        {tier.subtitle}
                      </p>
                      <p className="text-xs text-[#5A5E5B] leading-relaxed font-light">
                        {tier.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 4: How We Teach (Doorway to /method) */}
        <section className="py-20 bg-[#DFD9CC]/60 border-y border-[#D5CEBF] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#9B3D2E]/10 text-[#9B3D2E] text-xs font-semibold uppercase tracking-widest border border-[#9B3D2E]/20">
                  <span>Physical Methodology</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#171918]">
                  How We Teach
                </h2>
                <p className="text-lg text-[#303331] leading-relaxed font-light">
                  Taijiquan contains many principles—but principles alone don&apos;t tell someone how to acquire the skill. Our teaching emphasizes a progressive physical methodology: clear stance mechanics, leg root stability, selective relaxation (*sōng*), and reciprocal Yin/Yang partner work.
                </p>
                <div className="pt-2">
                  <Link
                    href="/method"
                    className="inline-flex items-center space-x-2.5 bg-[#171918] hover:bg-[#303331] text-[#E8E4DA] px-7 py-3.5 rounded-full text-sm font-semibold shadow-md transition-all cursor-pointer border border-[#303331]"
                  >
                    <span>Explore Our Training Method</span>
                    <ArrowRight className="w-4 h-4 text-[#8A7250]" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#E8E4DA] p-8 rounded-3xl border border-[#D5CEBF] space-y-4 shadow-xs">
                <div className="flex items-center space-x-3 text-[#9B3D2E]">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Methodology Preview</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#171918]">
                  {TAIJI_DATA.differences[0].title}
                </h3>
                <p className="text-xs text-[#303331] leading-relaxed font-light">
                  {TAIJI_DATA.differences[0].summary}
                </p>
                <div className="pt-2 border-t border-[#D5CEBF] flex justify-between items-center text-xs">
                  <span className="text-[#8A7250] font-serif italic">Yin & Yang Mechanics</span>
                  <Link href="/method" className="text-[#9B3D2E] font-semibold hover:underline">
                    Read deep dive →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 5: What Training Looks Like */}
        <section className="py-20 bg-[#E8E4DA] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#243B45]">
                Inside the Class
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#171918]">
                What Training Looks Like
              </h2>
              <p className="text-[#303331] text-base sm:text-lg leading-relaxed font-light">
                We train outdoors in small, dedicated groups. Instruction is divided into two primary disciplines: classic 89-movement Gongfu Jia Yilu routine practice and cooperative Push Hands partner drills.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TAIJI_DATA.classes.map((session) => (
                <div
                  key={session.id}
                  className="bg-[#DFD9CC] p-7 rounded-3xl border border-[#D5CEBF] space-y-4 flex flex-col justify-between shadow-xs"
                >
                  <div className="space-y-3">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-[#243B45]/10 text-[#243B45]">
                      {session.level}
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-[#171918]">
                      {session.title}
                    </h3>
                    <p className="text-xs text-[#303331] leading-relaxed font-light">
                      {session.description}
                    </p>
                    <div className="text-xs text-[#8A7250] font-semibold pt-1">
                      {session.day}, {session.time}
                    </div>
                  </div>
                  <Link
                    href="/classes"
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#171918] hover:text-[#9B3D2E] transition-colors pt-2"
                  >
                    <span>View full class & schedule details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Step 6: Meet Robin (Doorway to /about) */}
        <section className="py-20 bg-[#DFD9CC]/50 border-y border-[#D5CEBF] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-3xl overflow-hidden border border-[#D5CEBF] shadow-md bg-[#E8E4DA]">
                  <img
                    src="/IMG_2499.jpg"
                    alt="Marin Spivack and Robin Wu"
                    className="w-full h-72 object-cover"
                  />
                </div>
                <p className="text-xs text-[#8A7250] italic text-center font-serif">
                  Marin Spivack & Robin Wu
                </p>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#8A7250]/10 text-[#8A7250] text-xs font-semibold uppercase tracking-widest border border-[#8A7250]/20">
                  <span>Authentic Lineage Transmission</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#171918]">
                  Meet Robin
                </h2>
                <p className="text-base sm:text-lg text-[#303331] leading-relaxed font-light">
                  Robin Wu is a Chen Family Taijiquan practitioner who has trained directly under Marin Spivack (Mo Ling Taiji) as an indoor student/disciple since the year 2020. Marin Spivack is a senior disciple of Master Chen Yu, only son of Chen Zhaokui.
                </p>
                <div className="pt-2">
                  <Link
                    href="/about"
                    className="inline-flex items-center space-x-2.5 bg-[#171918] hover:bg-[#303331] text-[#E8E4DA] px-7 py-3.5 rounded-full text-sm font-semibold shadow-md transition-all cursor-pointer border border-[#303331]"
                  >
                    <span>Learn About Robin & Lineage</span>
                    <ArrowRight className="w-4 h-4 text-[#8A7250]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 7: Your First Class (Doorway to /start) */}
        <section className="py-20 bg-[#E8E4DA] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#DFD9CC] p-8 sm:p-12 rounded-3xl border border-[#D5CEBF] shadow-xs space-y-8">
              <div className="max-w-2xl space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[#9B3D2E]">
                  No Experience Needed
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#171918]">
                  Your First Class
                </h2>
                <p className="text-base text-[#303331] font-light">
                  We make starting as straightforward and reassuring as possible. No uniform, no special flexibility, no expectations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-[#E8E4DA] p-5 rounded-2xl border border-[#D5CEBF] space-y-2">
                  <span className="font-serif text-xl font-bold text-[#9B3D2E]">1. Come as you are</span>
                  <p className="text-xs text-[#303331] leading-relaxed font-light">
                    Comfortable clothes and flat shoes. No uniform required.
                  </p>
                </div>
                <div className="bg-[#E8E4DA] p-5 rounded-2xl border border-[#D5CEBF] space-y-2">
                  <span className="font-serif text-xl font-bold text-[#243B45]">2. Step-by-step instruction</span>
                  <p className="text-xs text-[#303331] leading-relaxed font-light">
                    Basic stance, posture, weight shifting, and movement fundamentals.
                  </p>
                </div>
                <div className="bg-[#E8E4DA] p-5 rounded-2xl border border-[#D5CEBF] space-y-2">
                  <span className="font-serif text-xl font-bold text-[#8A7250]">3. Scalable exertion</span>
                  <p className="text-xs text-[#303331] leading-relaxed font-light">
                    High or low stance height based on your personal comfort.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/start"
                  className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-full bg-[#9B3D2E] text-white text-sm font-bold hover:bg-[#7D3024] transition-colors shadow-md"
                >
                  <span>What to Expect in Your First Class →</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Step 8: Schedule / Location */}
        <section className="py-20 bg-[#DFD9CC]/50 border-t border-[#D5CEBF] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#243B45]">
                  Practice Details
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#171918]">
                  Schedule & Location
                </h2>
              </div>
              <Link
                href="/classes"
                className="inline-flex items-center space-x-2 text-xs font-semibold text-[#243B45] hover:underline"
              >
                <span>See complete class details & footwear advice</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#E8E4DA] p-6 rounded-3xl border border-[#D5CEBF] space-y-3 shadow-xs">
                <div className="flex items-center space-x-3 text-[#171918]">
                  <Calendar className="w-5 h-5 text-[#8A7250]" />
                  <h3 className="font-serif text-lg font-semibold">Weekly Schedule</h3>
                </div>
                <div className="text-xs text-[#303331] space-y-1.5 font-light">
                  <p><strong>Saturdays:</strong> 10:00 AM – 11:30 AM (Gongfu Jia Yilu)</p>
                  <p><strong>Sundays:</strong> 6:30 PM – 7:45 PM (Push Hands & Drills)</p>
                </div>
              </div>

              <div className="bg-[#E8E4DA] p-6 rounded-3xl border border-[#D5CEBF] space-y-3 shadow-xs">
                <div className="flex items-center space-x-3 text-[#171918]">
                  <MapPin className="w-5 h-5 text-[#243B45]" />
                  <h3 className="font-serif text-lg font-semibold">Location</h3>
                </div>
                <div className="text-xs text-[#303331] space-y-1 font-light">
                  <p className="font-semibold text-[#171918]">Outdoor Park Location</p>
                  <p>{TAIJI_DATA.locations[0].address}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 9: FAQ Highlights */}
        <section className="py-20 bg-[#E8E4DA] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#9B3D2E]">
                  Questions & Answers
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#171918]">
                  FAQ Highlights
                </h2>
              </div>
              <Link
                href="/classes"
                className="inline-flex items-center space-x-2 text-xs font-semibold text-[#9B3D2E] hover:underline"
              >
                <span>Read all FAQs on our Classes page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TAIJI_DATA.faqs.slice(0, 2).map((faq, idx) => (
                <div key={idx} className="bg-[#DFD9CC] p-6 rounded-2xl border border-[#D5CEBF] space-y-2 shadow-xs">
                  <h3 className="font-serif text-base font-semibold text-[#171918]">
                    {faq.question}
                  </h3>
                  <p className="text-xs text-[#303331] leading-relaxed font-light">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Step 10: Try a Class CTA */}
        <section className="py-20 bg-[#171918] text-[#E8E4DA] relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#9B3D2E]/20 text-[#9B3D2E] text-xs font-bold uppercase tracking-widest border border-[#9B3D2E]/40">
              <span>Take the First Step</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light">
              Try Your First Class
            </h2>
            <p className="text-base text-[#DFD9CC] max-w-xl mx-auto font-light leading-relaxed">
              No long-term commitment or prior experience required. Come experience traditional Chen Family Taijiquan practice for yourself.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/start"
                className="px-9 py-4 rounded-full bg-[#9B3D2E] text-white text-base font-bold hover:bg-[#7D3024] transition-colors shadow-lg flex items-center space-x-2"
              >
                <span>Start Here — Your First Class</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </main>
  );
}