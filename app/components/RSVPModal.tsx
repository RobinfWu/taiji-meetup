"use client";

import React, { useState, useEffect } from "react";
import { TAIJI_DATA, ClassSession } from "../data/taijiData";
import { X, CalendarCheck, CheckCircle2, Send, Clock, MapPin } from "lucide-react";

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialClassId?: string;
}

export const RSVPModal: React.FC<RSVPModalProps> = ({
  isOpen,
  onClose,
  initialClassId,
}) => {
  const [selectedClassId, setSelectedClassId] = useState<string>(
    initialClassId || TAIJI_DATA.classes[0].id
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("Beginner");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (initialClassId) {
      setSelectedClassId(initialClassId);
    }
  }, [initialClassId]);

  if (!isOpen) return null;

  const selectedClass =
    TAIJI_DATA.classes.find((c) => c.id === selectedClassId) ||
    TAIJI_DATA.classes[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsSuccess(true);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setName("");
    setEmail("");
    setPhone("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1F2421]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FBF9F5] border border-[#E8E2D9] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-6 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#808B84] hover:text-[#1F2421] hover:bg-[#F3EFEA] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#4A6B5D] uppercase tracking-wider">
            <CalendarCheck className="w-4 h-4" />
            <span>Class Reservation</span>
          </div>
          <h3 className="font-serif text-2xl font-semibold text-[#1F2421]">
            RSVP For Introductory Class
          </h3>
          <p className="text-xs text-[#57625B]">
            Free trial session • Small group instruction
          </p>
        </div>

        {isSuccess ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#4A6B5D] text-white flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-2xl font-semibold text-[#1F2421]">
              You&apos;re Registered!
            </h4>
            <p className="text-xs text-[#57625B] leading-relaxed max-w-xs mx-auto">
              We saved a spot for <strong className="text-[#1F2421]">{name}</strong> for the{" "}
              <strong className="text-[#4A6B5D]">{selectedClass.title}</strong> on {selectedClass.day}.
            </p>
            <div className="p-3 bg-[#F3EFEA] rounded-xl text-xs text-[#57625B] text-left space-y-1">
              <div className="flex items-center space-x-2">
                <Clock className="w-3.5 h-3.5 text-[#9E7B56]" />
                <span>{selectedClass.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#4C6275]" />
                <span>{selectedClass.location}</span>
              </div>
            </div>
            <button
              onClick={handleResetAndClose}
              className="w-full py-2.5 bg-[#1F2421] text-white text-xs font-medium rounded-xl cursor-pointer"
            >
              Done & Return to Site
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Selected Class Summary Box */}
            <div className="p-3.5 rounded-2xl bg-[#F3EFEA] border border-[#E4DED5] space-y-1">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#808B84]">
                Choose Class:
              </label>
              <select
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="w-full bg-transparent font-serif text-base font-semibold text-[#1F2421] focus:outline-none cursor-pointer"
              >
                {TAIJI_DATA.classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.title} ({cls.day} {cls.time})
                  </option>
                ))}
              </select>
              <div className="text-[11px] text-[#57625B] pt-1">
                📍 {selectedClass.location}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#1F2421] mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#F3EFEA] border border-[#E4DED5] text-sm text-[#1F2421] focus:outline-none focus:border-[#4A6B5D]"
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#F3EFEA] border border-[#E4DED5] text-sm text-[#1F2421] focus:outline-none focus:border-[#4A6B5D]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#1F2421] mb-1">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="(555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F3EFEA] border border-[#E4DED5] text-sm text-[#1F2421] focus:outline-none focus:border-[#4A6B5D]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1F2421] mb-1">
                  Experience
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F3EFEA] border border-[#E4DED5] text-xs text-[#1F2421] focus:outline-none focus:border-[#4A6B5D]"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Some Experience">Some Experience</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#4A6B5D] hover:bg-[#3B574B] text-white rounded-xl text-xs font-medium transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-sm active:scale-98"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Confirm Free Spot RSVP</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
