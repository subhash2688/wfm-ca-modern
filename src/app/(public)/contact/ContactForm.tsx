"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    // Simulate network delay
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center rounded-3xl border border-[#D4A853]/30 bg-[#D4A853]/5 px-8 py-16 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#D4A853]/10">
              <svg
                className="h-8 w-8 text-[#D4A853]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="font-heading mt-6 text-2xl font-bold text-[#1A1A1A]">
              Message sent!
            </h3>
            <p className="mt-2 max-w-sm text-[#4B5563]">
              Thank you for reaching out. Our team will get back to you within
              1-2 business days.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-8 text-sm font-semibold text-[#D4A853] transition-colors hover:text-[#C49A48]"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-[#1A1A1A]"
              >
                Full name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full rounded-xl border border-[#E5E2DD] bg-white px-4 py-3 text-[#1A1A1A] placeholder-[#6B7280]/50 outline-none transition-all focus:border-[#D4A853] focus:ring-2 focus:ring-[#D4A853]/20"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-[#1A1A1A]"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[#E5E2DD] bg-white px-4 py-3 text-[#1A1A1A] placeholder-[#6B7280]/50 outline-none transition-all focus:border-[#D4A853] focus:ring-2 focus:ring-[#D4A853]/20"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="mb-1.5 block text-sm font-medium text-[#1A1A1A]"
              >
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                required
                value={form.subject}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#E5E2DD] bg-white px-4 py-3 text-[#1A1A1A] outline-none transition-all focus:border-[#D4A853] focus:ring-2 focus:ring-[#D4A853]/20"
              >
                <option value="">Select a topic</option>
                <option value="general">General Inquiry</option>
                <option value="donate">Donations</option>
                <option value="volunteer">Volunteering</option>
                <option value="partnership">Campus Partnership</option>
                <option value="media">Press / Media</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-medium text-[#1A1A1A]"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="How can we help?"
                className="w-full resize-none rounded-xl border border-[#E5E2DD] bg-white px-4 py-3 text-[#1A1A1A] placeholder-[#6B7280]/50 outline-none transition-all focus:border-[#D4A853] focus:ring-2 focus:ring-[#D4A853]/20"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#D4A853] px-10 py-4 text-base font-bold text-[#1A3D5C] transition-all hover:bg-[#C49A48] hover:shadow-xl hover:shadow-[#D4A853]/20 disabled:opacity-60"
            >
              {sending ? (
                <>
                  <svg
                    className="h-5 w-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Send message
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
