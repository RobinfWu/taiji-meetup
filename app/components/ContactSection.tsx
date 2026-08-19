"use client";

import React, { useState } from "react";
import { TAIJI_DATA } from "../data/taijiData";
import { Mail, Phone, ExternalLink, Copy, Check, Info, MessageSquare } from "lucide-react";

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const emailAddress = TAIJI_DATA.contact.email;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 bg-[#E8E4DA] relative border-t border-[#D5CEBF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#9B3D2E]/10 text-[#9B3D2E] text-xs font-semibold uppercase tracking-widest border border-[#9B3D2E]/20">
            <span>Direct Email Communication</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#171918]">
            Contact & <span className="font-normal italic text-[#243B45]">Training Inquiries</span>
          </h2>
          <p className="text-[#303331] text-base sm:text-lg leading-relaxed font-light">
            If you have questions about our practice sessions, training methodology, park locations, or footwear recommendations, please reach out directly via email.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Direct Email Card */}
          <div className="lg:col-span-7 bg-[#DFD9CC] p-6 sm:p-10 rounded-3xl border border-[#D5CEBF] shadow-xs space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-[#171918] text-[#E8E4DA] flex items-center justify-center border border-[#303331]">
                <Mail className="w-6 h-6 text-[#8A7250]" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-semibold text-[#171918]">
                  Email the Instructor
                </h3>
                <p className="text-xs text-[#5A5E5B]">
                  Primary contact method for prospective students
                </p>
              </div>
            </div>

            <p className="text-sm text-[#303331] leading-relaxed font-light">
              {TAIJI_DATA.contact.note}
            </p>

            {/* Email Address Display Box */}
            <div className="p-5 rounded-2xl bg-[#E8E4DA] border border-[#D5CEBF] space-y-3 shadow-xs">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8A7250]">
                Official Contact Email (Editable Placeholder)
              </span>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                <span className="font-serif text-lg sm:text-xl font-bold text-[#171918] break-all">
                  {emailAddress}
                </span>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#DFD9CC] hover:bg-[#D5CEBF] text-[#171918] text-xs font-semibold border border-[#D5CEBF] transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#243B45]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#303331]" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${emailAddress}`}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#171918] hover:bg-[#303331] text-[#E8E4DA] text-xs font-semibold transition-colors cursor-pointer border border-[#303331]"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#8A7250]" />
                    <span>Send Email</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Inquiry Topics Guidance */}
            <div className="p-4 rounded-xl bg-[#DFD9CC]/50 border border-[#D5CEBF] space-y-2 text-xs text-[#303331]">
              <span className="font-semibold text-[#171918] block">
                Suggested Information to Include in Your Email:
              </span>
              <ul className="list-disc list-inside space-y-1 text-[#5A5E5B]">
                <li>Your name and general interest in Chen Family Taijiquan.</li>
                <li>Any prior martial arts, Qigong, or athletic background (optional).</li>
                <li>Questions regarding training times, park weather backup, or footwear.</li>
              </ul>
            </div>
          </div>

          {/* Secondary Details & Lineage Link Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Phone & Social Card */}
            <div className="bg-[#DFD9CC] p-6 sm:p-8 rounded-3xl border border-[#D5CEBF] shadow-xs space-y-5">
              <h4 className="font-serif text-xl font-semibold text-[#171918]">
                Additional Contact Channels
              </h4>

              <div className="space-y-3 text-xs text-[#303331]">
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#E8E4DA] border border-[#D5CEBF]">
                  <Phone className="w-4 h-4 text-[#243B45]" />
                  <div>
                    <span className="text-[10px] text-[#8A7250] font-semibold block uppercase">Phone (Placeholder)</span>
                    <span className="font-semibold text-[#171918]">{TAIJI_DATA.contact.phone}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#E8E4DA] border border-[#D5CEBF]">
                  <MessageSquare className="w-4 h-4 text-[#9B3D2E]" />
                  <div>
                    <span className="text-[10px] text-[#8A7250] font-semibold block uppercase">Social Handles</span>
                    <span className="text-[#303331]">{TAIJI_DATA.contact.social.instagram} • {TAIJI_DATA.contact.social.youtube}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lineage Teacher Site Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#243B45]/10 border border-[#243B45]/25 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#243B45] uppercase tracking-wider">
                  Teacher Lineage Website
                </span>
                <ExternalLink className="w-4 h-4 text-[#243B45]" />
              </div>
              
              <h4 className="font-serif text-lg font-semibold text-[#171918]">
                {TAIJI_DATA.contact.teacherSiteName}
              </h4>
              
              <p className="text-xs text-[#303331] leading-relaxed">
                For deeper articles on traditional Gongfu Jia mechanics, lineage history, and Master Chen Yu&apos;s teachings, visit Master Marin Spivack&apos;s official website.
              </p>

              <a
                href={TAIJI_DATA.contact.teacherWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-[#171918] hover:bg-[#303331] text-[#E8E4DA] px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors mt-2"
              >
                <span>Visit molingtaiji.com</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#8A7250]" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
