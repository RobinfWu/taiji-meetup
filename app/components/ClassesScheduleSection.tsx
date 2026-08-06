"use client";

import React, { useState } from "react";
import { TAIJI_DATA, ClassSession } from "../data/taijiData";
import { Calendar, MapPin, Clock, Users, ChevronDown, ChevronUp, CheckCircle, Mail, Phone, Send, Info } from "lucide-react";

interface ClassesScheduleSectionProps {
  onOpenRSVP: (classId?: string) => void;
}

export const ClassesScheduleSection: React.FC<ClassesScheduleSectionProps> = ({
  onOpenRSVP,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedClassId, setSelectedClassId] = useState<string>(TAIJI_DATA.classes[0].id);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "Beginner (No prior experience)",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmitRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
  };

  return (
    <section id="classes" className="py-20 bg-[#F3EFEA]/40 border-t border-[#E8E2D9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#4A6B5D]/10 text-[#4A6B5D] text-xs font-semibold uppercase tracking-widest">
            <span>Weekly Sessions & Locations</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#1F2421]">
            Classes & <span className="font-normal italic text-[#4A6B5D]">Schedule</span>
          </h2>
          <p className="text-[#57625B] text-base sm:text-lg leading-relaxed font-light">
            We offer outdoor park practices and indoor studio sessions. Classes maintain a relaxed, small-group atmosphere so everyone receives personal attention.
          </p>
        </div>

        {/* Schedule Cards Grid */}
        <div className="mb-20">
          <h3 className="font-serif text-2xl text-[#1F2421] font-normal mb-8 flex items-center space-x-3">
            <span className="w-8 h-px bg-[#4A6B5D]" />
            <span>Weekly Class Roster</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TAIJI_DATA.classes.map((session: ClassSession) => (
              <div
                key={session.id}
                className="bg-[#FBF9F5] p-6 rounded-3xl border border-[#E8E2D9] space-y-5 flex flex-col justify-between shadow-xs hover:border-[#4A6B5D]/50 transition-all duration-200"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#4A6B5D]/10 text-[#4A6B5D] border border-[#4A6B5D]/20">
                      {session.level}
                    </span>
                    <span className="text-xs font-medium text-[#808B84]">
                      {session.openSpots} spots remaining
                    </span>
                  </div>

                  <h4 className="font-serif text-xl font-semibold text-[#1F2421] leading-snug">
                    {session.title}
                  </h4>

                  <p className="text-xs text-[#57625B] leading-relaxed font-light">
                    {session.description}
                  </p>

                  <div className="pt-3 border-t border-[#E8E2D9] space-y-2 text-xs text-[#57625B]">
                    <div className="flex items-center space-x-2.5">
                      <Calendar className="w-4 h-4 text-[#9E7B56]" />
                      <span className="font-medium text-[#1F2421]">
                        {session.day}, {session.time}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2.5">
                      <MapPin className="w-4 h-4 text-[#4C6275]" />
                      <span>{session.location}</span>
                    </div>

                    <div className="flex items-center space-x-2.5">
                      <Users className="w-4 h-4 text-[#4A6B5D]" />
                      <span>Led by {session.instructor}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onOpenRSVP(session.id)}
                  className="w-full mt-4 py-3 bg-[#1F2421] hover:bg-[#333A3E] text-white text-xs font-medium rounded-2xl transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
                >
                  <Clock className="w-3.5 h-3.5 text-[#9E7B56]" />
                  <span>RSVP For {session.day} Session</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Location Cards Section */}
        <div className="mb-20">
          <h3 className="font-serif text-2xl text-[#1F2421] font-normal mb-8 flex items-center space-x-3">
            <span className="w-8 h-px bg-[#4C6275]" />
            <span>Practice Locations & Guidelines</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TAIJI_DATA.locations.map((loc, idx) => (
              <div
                key={idx}
                className="bg-[#FBF9F5] p-6 sm:p-8 rounded-3xl border border-[#E8E2D9] space-y-4 shadow-xs"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#4C6275]/10 text-[#4C6275] flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-semibold text-[#1F2421]">
                      {loc.name}
                    </h4>
                    <p className="text-xs text-[#4C6275] font-medium">
                      {loc.scheduleNote}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F3EFEA] border border-[#E4DED5] text-xs space-y-1">
                  <span className="text-[#808B84] font-medium block uppercase tracking-wider text-[10px]">
                    Address Details (Editable Placeholder)
                  </span>
                  <p className="font-medium text-[#1F2421]">
                    {loc.address}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FBF9F5] border border-[#E8E2D9] text-xs text-[#57625B]">
                  <span className="font-semibold text-[#1F2421] block mb-1">
                    Tips for Attendees:
                  </span>
                  <p>{loc.tips}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Functional RSVP & Contact Form + FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Column */}
          <div className="lg:col-span-7 bg-[#FBF9F5] p-6 sm:p-8 rounded-3xl border border-[#E8E2D9] shadow-xs space-y-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-[#4A6B5D]/10 text-[#4A6B5D] text-xs font-semibold uppercase mb-2">
                <span>Free Trial Class RSVP</span>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[#1F2421]">
                Reserve Your Spot or Ask a Question
              </h3>
              <p className="text-xs text-[#57625B] mt-1">
                Your first introductory session is free. Please submit your details below to confirm class availability.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-8 rounded-2xl bg-[#4A6B5D]/10 border border-[#4A6B5D]/30 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-[#4A6B5D] text-white flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-2xl font-semibold text-[#1F2421]">
                  RSVP Received!
                </h4>
                <p className="text-sm text-[#57625B] max-w-md mx-auto">
                  Thank you, <strong className="text-[#1F2421]">{formData.name}</strong>. We look forward to seeing you at practice! A confirmation details note has been saved.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-5 py-2 bg-[#1F2421] text-white rounded-full text-xs font-medium cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitRSVP} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#1F2421] mb-1">
                    Select Class Session *
                  </label>
                  <select
                    value={selectedClassId}
                    onChange={(e) => setSelectedClassId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F3EFEA] border border-[#E4DED5] text-sm text-[#1F2421] focus:outline-none focus:border-[#4A6B5D]"
                  >
                    {TAIJI_DATA.classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.title} ({cls.day} - {cls.time})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#1F2421] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F3EFEA] border border-[#E4DED5] text-sm text-[#1F2421] focus:outline-none focus:border-[#4A6B5D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1F2421] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F3EFEA] border border-[#E4DED5] text-sm text-[#1F2421] focus:outline-none focus:border-[#4A6B5D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#1F2421] mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="(555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F3EFEA] border border-[#E4DED5] text-sm text-[#1F2421] focus:outline-none focus:border-[#4A6B5D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1F2421] mb-1">
                      Experience Level
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F3EFEA] border border-[#E4DED5] text-sm text-[#1F2421] focus:outline-none focus:border-[#4A6B5D]"
                    >
                      <option value="Beginner (No prior experience)">Beginner (First Time)</option>
                      <option value="Some Qigong/Taiji experience">Some Qigong / Taiji Experience</option>
                      <option value="Experienced practitioner">Experienced Practitioner</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1F2421] mb-1">
                    Notes or Questions for Instructor
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Mention any physical considerations, questions, or preferences..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F3EFEA] border border-[#E4DED5] text-sm text-[#1F2421] focus:outline-none focus:border-[#4A6B5D]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#4A6B5D] hover:bg-[#3B574B] text-white rounded-xl font-medium text-sm transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-sm active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Free Trial RSVP</span>
                </button>
              </form>
            )}
          </div>

          {/* FAQ Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="font-serif text-2xl font-semibold text-[#1F2421]">
                Frequently Asked Questions
              </h3>
              <p className="text-xs text-[#57625B] mt-1">
                Common questions for new prospective students.
              </p>
            </div>

            <div className="space-y-3">
              {TAIJI_DATA.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-[#FBF9F5] rounded-2xl border border-[#E8E2D9] overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full text-left p-4.5 flex items-center justify-between space-x-3 cursor-pointer hover:bg-[#F3EFEA]/50"
                    >
                      <span className="font-serif text-base font-semibold text-[#1F2421]">
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#4A6B5D] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#808B84] shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-4.5 pb-4 pt-1 text-xs text-[#57625B] leading-relaxed border-t border-[#E8E2D9]/60">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
