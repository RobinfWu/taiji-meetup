"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { TAIJI_DATA } from "../data/taijiData";
import {
  Compass,
  Shield,
  Feather,
  Activity,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  GitMerge,
  Layers
} from "lucide-react";

export default function MethodPage() {
  const [activeTab, setActiveTab] = useState(TAIJI_DATA.differences[0].id);

  const activeDifference =
    TAIJI_DATA.differences.find((d) => d.id === activeTab) ||
    TAIJI_DATA.differences[0];

  return (
    <main className="min-h-screen bg-[#E8E4DA] text-[#171918] relative flex flex-col font-sans selection:bg-[#9B3D2E]/15 selection:text-[#9B3D2E]">
      <Navbar />

      <div className="flex-1 pt-28 pb-20">
        {/* Page Hero Header */}
        <section className="py-12 md:py-16 bg-[#DFD9CC]/60 border-b border-[#D5CEBF] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#243B45]/10 text-[#243B45] text-xs font-semibold uppercase tracking-widest border border-[#243B45]/20">
                <Compass className="w-3.5 h-3.5" />
                <span>Our Approach to Taijiquan</span>
              </div>
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#171918]">
                  How We <span className="font-normal italic text-[#243B45]">Train</span>
                </h1>
                <p className="text-lg text-[#303331] leading-relaxed font-light">
                  Taijiquan contains forms, partner work, martial applications, body mechanics, and training principles. These can seem like separate subjects at first. They are easier to understand as parts of one system.
                </p>
            </div>
          </div>
        </section>

        {/* Core Methodology Sections */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          {/* Section 1: What is Taijiquan & Approach */}
        <div className="bg-[#DFD9CC] p-8 sm:p-12 rounded-3xl border border-[#D5CEBF] shadow-xs space-y-8">
          <div className="space-y-3">
            <h2 className="font-serif text-3xl font-semibold text-[#171918]">
              Taijiquan as a Language of the Body
            </h2>

            <p className="text-[#303331] text-base sm:text-lg leading-relaxed font-light">
              Learning <strong className="font-semibold text-[#171918]">this</strong>{" "}
              Taijiquan is like learning a language for the body.
            </p>
          </div>

          <div className="space-y-6">
            {/* Principles */}
            <div className="border-l-2 border-[#A94432] pl-5">
              <h3 className="font-serif text-xl font-semibold text-[#171918]">
                Principles{" "}
                <span className="font-sans text-sm font-normal italic text-[#7A6D5A]">
                  — the grammar
                </span>
              </h3>
              <p className="mt-2 text-[#303331] text-base sm:text-lg leading-relaxed font-light">
                Principles describe that which is fundamental to the system. Examples include Peng Jin and the interplay of Yin and Yang. They are like the grammar of the art.
              </p>
            </div>

            {/* Jins */}
            <div className="border-l-2 border-[#A94432] pl-5">
              <h3 className="font-serif text-xl font-semibold text-[#171918]">
                Jins{" "}
                <span className="font-sans text-sm font-normal italic text-[#7A6D5A]">
                  — the vocabulary
                </span>
              </h3>
              <p className="mt-2 text-[#303331] text-base sm:text-lg leading-relaxed font-light">
                Jins refer to cultivated energies or forces that Taijiquan categorizes according to their qualities and desired effects. They are the building blocks from which sequences and martial applications are constructed by stringing them together, much like arranging vocabulary to form sentences.
              </p>
            </div>

            {/* Sequences */}
            <div className="border-l-2 border-[#A94432] pl-5">
              <h3 className="font-serif text-xl font-semibold text-[#171918]">
                Sequences{" "}
                <span className="font-sans text-sm font-normal italic text-[#7A6D5A]">
                  — the sentences
                </span>
              </h3>
              <p className="mt-2 text-[#303331] text-base sm:text-lg leading-relaxed font-light">
                A sequence of movement strings together several jins.
                Traditional forms contain many named sequences; for example,
                Yilu (First Road) is traditionally organized into 83 sequences, while Erlu (Second Road) contains
                71. By design, sequences train multiple applications at the same time.
              </p>
            </div>

            {/* Form */}
            <div className="border-l-2 border-[#A94432] pl-5">
              <h3 className="font-serif text-xl font-semibold text-[#171918]">
                Form (Taolu){" "}
                <span className="font-sans text-sm font-normal italic text-[#7A6D5A]">
                  — the textbook
                </span>
              </h3>
              <p className="mt-2 text-[#303331] text-base sm:text-lg leading-relaxed font-light">
                A form is a structured collection of sequences. It preserves the lexicon of the art,
                mechanics, and relationships in a repeatable training format for cultivation.
              </p>
            </div>

            {/* Martial Applications */}
            <div className="border-l-2 border-[#A94432] pl-5">
              <h3 className="font-serif text-xl font-semibold text-[#171918]">
                Martial Applications{" "}
                <span className="font-sans text-sm font-normal italic text-[#7A6D5A]">
                  — speaking with the language
                </span>
              </h3>
              <p className="mt-2 text-[#303331] text-base sm:text-lg leading-relaxed font-light">
                Some applications are traditionally taught, much like a language has established sayings and expressions that are passed down. But those examples do not exhaust what the language can express. The same jins can be recombined to create new applications appropriate to the situation.
                Asking whether something is "the official application" is therefore a little like asking whether something is "the official English sentence".
              </p>
            </div>

            {/* Push Hands */}
            <div className="border-l-2 border-[#A94432] pl-5">
              <h3 className="font-serif text-xl font-semibold text-[#171918]">
                Push Hands (Tuishou){" "}
                <span className="font-sans text-sm font-normal italic text-[#7A6D5A]">
                  — the conversation
                </span>
              </h3>
              <p className="mt-2 text-[#303331] text-base sm:text-lg leading-relaxed font-light">
                Push Hands is like a conversation between two people. It refers to a collection of partnered practices built around sustained physical contact. Some Push Hand drills are patterned, with a prescribed "script" for each player—but mistakes can still be punished.
                Freestyle Push Hands removes the script, allowing both players to respond freely to each other while remaining within the constraints of the practice.
              </p>
            </div>
          </div>
        </div>
          {/* Section 3: You May Be Surprised That... */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#243B45]">
                Nuance & Tradition
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#171918]">
                You May Be Surprised That...
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TAIJI_DATA.mythsAndRealities.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#DFD9CC] rounded-3xl p-7 border border-[#D5CEBF] shadow-xs space-y-4 flex flex-col justify-between hover:border-[#243B45]/40 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#243B45]/10 text-[#243B45] text-xs font-semibold border border-[#243B45]/20">
                      <Sparkles className="w-3 h-3 text-[#8A7250]" />
                      <span>{item.badge}</span>
                    </div>

                    <h3 className="font-serif text-xl font-semibold text-[#171918] pt-1">
                      {item.myth}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#303331] leading-relaxed font-light">
                      {item.reality}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Step CTA */}
          <div className="bg-[#171918] text-[#E8E4DA] p-8 sm:p-12 rounded-3xl border border-[#303331] text-center space-y-6">
            <h3 className="font-serif text-3xl font-light">
              Ready to see how this translates into practice?
            </h3>
            <p className="text-sm text-[#DFD9CC] max-w-xl mx-auto font-light">
              Now that you understand our methodology, learn about our lineage and instructor, or find out what your first class will be like.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/about"
                className="px-6 py-3 rounded-full bg-[#DFD9CC] text-[#171918] text-xs font-semibold hover:bg-[#D5CEBF] transition-colors"
              >
                Learn About Robin & Lineage →
              </Link>
              <Link
                href="/start"
                className="px-6 py-3 rounded-full bg-[#9B3D2E] text-white text-xs font-bold hover:bg-[#7D3024] transition-colors flex items-center space-x-2"
              >
                <span>Start Here — Your First Class</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </section>
      </div>

      <Footer />
    </main>
  );
}
