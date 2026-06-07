"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Variant = "dark" | "light";
type Status = "idle" | "loading" | "success" | "error";

interface EmailSignupProps {
  variant?: Variant;
  source: string;
  placeholder?: string;
  buttonLabel?: string;
  successMessage?: string;
  className?: string;
}

export function EmailSignup({
  variant = "dark",
  source,
  placeholder = "you@example.com",
  buttonLabel = "Subscribe",
  successMessage = "You're in. We'll send you the next impact update.",
  className = "",
}: EmailSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    setError(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data.error ?? "Something went wrong.");
        return;
      }
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  const isDark = variant === "dark";

  const inputClass = isDark
    ? "flex-1 rounded-full border border-white/20 bg-white/[0.06] px-5 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#D4A853] focus:bg-white/[0.1]"
    : "flex-1 rounded-full border border-[#E5E2DD] bg-white px-5 py-3 text-sm text-[#1A1A1A] placeholder-[#9CA3AF] outline-none transition focus:border-[#D4A853]";

  const buttonClass =
    "rounded-full bg-[#D4A853] px-6 py-3 text-sm font-bold text-[#1A3D5C] transition-all hover:bg-[#C49A48] disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm ${
              isDark ? "bg-[#D4A853]/15 text-[#D4A853]" : "bg-[#D4A853]/10 text-[#A07F30]"
            }`}
          >
            <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">{successMessage}</span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              disabled={status === "loading"}
              className={inputClass}
              aria-label="Email address"
            />
            <button type="submit" disabled={status === "loading" || !email} className={buttonClass}>
              {status === "loading" ? "..." : buttonLabel}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
      {status === "error" && error && (
        <p className={`mt-2 text-xs ${isDark ? "text-red-300" : "text-red-600"}`}>
          {error}
        </p>
      )}
    </div>
  );
}
