"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Mail, Sparkles } from "lucide-react";
import { TAIJI_DATA } from "../data/taijiData";

interface ContactFormProps {
  className?: string;
  darkVariant?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  className = "",
  darkVariant = false
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    // Simulate lightweight client submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleMailtoFallback = () => {
    const subject = encodeURIComponent(`Training Inquiry from ${formData.name || "Website Visitor"}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${TAIJI_DATA.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div
      className={`rounded-3xl p-8 sm:p-12 border shadow-xs transition-all duration-300 ${
        darkVariant
          ? "bg-[#171918] text-[#E8E4DA] border-[#303331]"
          : "bg-[#DFD9CC] text-[#171918] border-[#D5CEBF]"
      } ${className}`}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#9B3D2E]/10 text-[#9B3D2E] text-xs font-bold uppercase tracking-widest border border-[#9B3D2E]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-light">
            Interested in Training With Us?
          </h2>
          <p
            className={`text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed ${
              darkVariant ? "text-[#DFD9CC]" : "text-[#303331]"
            }`}
          >
            Whether you&apos;re ready to try a class or just have a question, feel free to get in touch. No experience is necessary, and there&apos;s no commitment.
          </p>
        </div>

        {submitted ? (
          <div className="py-10 text-center space-y-4 animate-in fade-in duration-300">
            <div className="w-14 h-14 rounded-full bg-[#243B45]/20 text-[#243B45] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-[#9B3D2E]" />
            </div>
            <h3 className="font-serif text-2xl font-semibold">Thank You!</h3>
            <p className="text-sm font-light max-w-md mx-auto">
              We&apos;ve received your message and will reach out to you shortly with class details and location info.
            </p>
            <div className="pt-2">
              <button
                onClick={handleMailtoFallback}
                className="text-xs text-[#8A7250] underline hover:text-[#9B3D2E] transition-colors cursor-pointer"
              >
                Or click here to open in your mail app directly
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A7250]">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-2xl text-sm transition-colors outline-none border ${
                    darkVariant
                      ? "bg-[#242725] text-[#E8E4DA] border-[#303331] focus:border-[#9B3D2E]"
                      : "bg-[#E8E4DA] text-[#171918] border-[#D5CEBF] focus:border-[#243B45]"
                  }`}
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A7250]">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-2xl text-sm transition-colors outline-none border ${
                    darkVariant
                      ? "bg-[#242725] text-[#E8E4DA] border-[#303331] focus:border-[#9B3D2E]"
                      : "bg-[#E8E4DA] text-[#171918] border-[#D5CEBF] focus:border-[#243B45]"
                  }`}
                />
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A7250]">
                Message
              </label>
              <textarea
                rows={3}
                placeholder="Ask a question or let us know when you'd like to drop in..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`w-full px-4 py-3 rounded-2xl text-sm transition-colors outline-none resize-none border ${
                  darkVariant
                    ? "bg-[#242725] text-[#E8E4DA] border-[#303331] focus:border-[#9B3D2E]"
                    : "bg-[#E8E4DA] text-[#171918] border-[#D5CEBF] focus:border-[#243B45]"
                }`}
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#9B3D2E] hover:bg-[#7D3024] text-white px-8 py-3.5 rounded-full text-sm font-bold shadow-md transition-all cursor-pointer active:scale-98 border border-[#9B3D2E]"
              >
                <span>{isSubmitting ? "Sending..." : "Send"}</span>
                <Send className="w-4 h-4 text-white" />
              </button>

              <button
                type="button"
                onClick={handleMailtoFallback}
                className="text-xs text-[#8A7250] hover:text-[#9B3D2E] transition-colors flex items-center space-x-1.5 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Prefer standard email? Click here</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
