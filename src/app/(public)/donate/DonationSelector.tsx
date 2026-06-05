"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PRESETS = [
  { amount: 5, label: "$5", impact: "1 student, 1 day" },
  { amount: 10, label: "$10", impact: "2 students, 1 day" },
  { amount: 25, label: "$25", impact: "1 student, 5 days" },
  { amount: 50, label: "$50", impact: "2 students, 5 days" },
  { amount: 100, label: "$100", impact: "1 student, 20 days" },
];

type Frequency = "one-time" | "monthly";

export function DonationSelector() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [frequency, setFrequency] = useState<Frequency>("one-time");

  const activeAmount = isCustom
    ? parseFloat(customAmount) || 0
    : selectedAmount || 0;

  const mealsPerDay = Math.floor(activeAmount / 5);

  function handlePresetClick(amount: number) {
    setSelectedAmount(amount);
    setIsCustom(false);
    setCustomAmount("");
  }

  function handleCustomClick() {
    setIsCustom(true);
    setSelectedAmount(null);
  }

  function handleDonate() {
    if (activeAmount < 1) {
      alert("Please select or enter a donation amount.");
      return;
    }
    alert(
      `Stripe integration coming soon! You selected a ${frequency} donation of $${activeAmount}.`,
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Frequency toggle */}
      <div className="mb-10 flex justify-center">
        <div className="inline-flex rounded-full border border-[#E5E2DD] bg-white p-1.5 shadow-sm">
          {(["one-time", "monthly"] as Frequency[]).map((freq) => (
            <button
              key={freq}
              onClick={() => setFrequency(freq)}
              className={`relative rounded-full px-8 py-3 text-sm font-semibold transition-all ${
                frequency === freq
                  ? "text-[#1A3D5C]"
                  : "text-[#6B7280] hover:text-[#1A1A1A]"
              }`}
            >
              {frequency === freq && (
                <motion.div
                  layoutId="frequency-pill"
                  className="absolute inset-0 rounded-full bg-[#D4A853]/15 ring-1 ring-[#D4A853]/30"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10 capitalize">
                {freq === "one-time" ? "One-time" : "Monthly"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Amount grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {PRESETS.map((preset) => {
          const isSelected = !isCustom && selectedAmount === preset.amount;
          return (
            <motion.button
              key={preset.amount}
              onClick={() => handlePresetClick(preset.amount)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative overflow-hidden rounded-2xl border-2 p-6 text-left transition-all ${
                isSelected
                  ? "border-[#D4A853] bg-[#D4A853]/5 shadow-lg shadow-[#D4A853]/10"
                  : "border-[#E5E2DD] bg-white hover:border-[#D4A853]/40 hover:shadow-md"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="amount-selected"
                  className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#D4A853]"
                  transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
                >
                  <svg
                    className="h-3.5 w-3.5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              )}
              <span
                className={`font-heading text-3xl font-bold ${
                  isSelected ? "text-[#D4A853]" : "text-[#1A3D5C]"
                }`}
              >
                {preset.label}
              </span>
              <span className="mt-2 block text-sm text-[#6B7280]">
                {preset.impact}
              </span>
            </motion.button>
          );
        })}

        {/* Custom amount */}
        <motion.button
          onClick={handleCustomClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`group relative overflow-hidden rounded-2xl border-2 p-6 text-left transition-all ${
            isCustom
              ? "border-[#D4A853] bg-[#D4A853]/5 shadow-lg shadow-[#D4A853]/10"
              : "border-[#E5E2DD] bg-white hover:border-[#D4A853]/40 hover:shadow-md"
          }`}
        >
          {isCustom && (
            <motion.div
              layoutId="amount-selected"
              className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#D4A853]"
              transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
            >
              <svg
                className="h-3.5 w-3.5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
          )}
          <span
            className={`font-heading text-3xl font-bold ${
              isCustom ? "text-[#D4A853]" : "text-[#1A3D5C]"
            }`}
          >
            Custom
          </span>
          <span className="mt-2 block text-sm text-[#6B7280]">
            Enter any amount
          </span>
        </motion.button>
      </div>

      {/* Custom amount input */}
      <AnimatePresence>
        {isCustom && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-6 flex items-center gap-3 rounded-2xl border-2 border-[#D4A853] bg-[#D4A853]/5 px-6 py-4">
              <span className="font-heading text-2xl font-bold text-[#D4A853]">
                $
              </span>
              <input
                type="number"
                min="1"
                step="1"
                placeholder="Enter amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                autoFocus
                className="w-full bg-transparent font-heading text-2xl font-bold text-[#1A1A1A] placeholder-[#6B7280]/40 outline-none"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Impact summary */}
      <AnimatePresence>
        {activeAmount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-8 rounded-2xl border border-[#E5E2DD] bg-[#FAFAF8] p-6 text-center"
          >
            <p className="text-sm text-[#6B7280]">
              Your{" "}
              <span className="font-semibold text-[#1A1A1A]">
                ${activeAmount}
                {frequency === "monthly" ? "/month" : ""}
              </span>{" "}
              donation will provide
            </p>
            <p className="font-heading mt-2 text-3xl font-bold text-[#1A3D5C]">
              {mealsPerDay > 0
                ? `${mealsPerDay} nutritious meal${mealsPerDay > 1 ? "s" : ""}`
                : "a contribution to meals"}
            </p>
            {frequency === "monthly" && mealsPerDay > 0 && (
              <p className="mt-1 text-sm text-[#D4A853]">
                That&apos;s {mealsPerDay * 12} meals over the next year
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Donate button */}
      <motion.button
        onClick={handleDonate}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-[#D4A853] px-10 py-5 text-lg font-bold text-[#1A3D5C] shadow-xl shadow-[#D4A853]/20 transition-all hover:bg-[#C49A48] hover:shadow-2xl hover:shadow-[#D4A853]/30"
      >
        Donate{activeAmount > 0 ? ` $${activeAmount}` : ""} now
        <svg
          className="h-5 w-5 transition-transform group-hover:translate-x-1"
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
      </motion.button>

      {/* Security line */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#6B7280]">
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        Secure payment powered by Stripe. Your information is encrypted.
      </div>
    </div>
  );
}
