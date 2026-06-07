"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Frequency = "monthly" | "one-time";

interface Preset {
  amount: number;
  label: string;
  impact: string;
}

const MONTHLY_PRESETS: Preset[] = [
  { amount: 24, label: "$24", impact: "A weekly meal — all year long" },
  { amount: 40, label: "$40", impact: "Two meals a week for a student" },
  { amount: 96, label: "$96", impact: "Feed a student all school year" },
  { amount: 200, label: "$200", impact: "A weekday meal for a student" },
  { amount: 500, label: "$500", impact: "Sponsor a small cohort" },
];

const ONETIME_PRESETS: Preset[] = [
  { amount: 8, label: "$8", impact: "1 meal for 1 student" },
  { amount: 24, label: "$24", impact: "3 meals" },
  { amount: 40, label: "$40", impact: "5 meals" },
  { amount: 80, label: "$80", impact: "10 meals" },
  { amount: 240, label: "$240", impact: "A month of daily meals" },
];

const FOUNDING_GOAL = 100;
const FOUNDING_CURRENT = 17;

export function DonationSelector() {
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(96);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);

  const presets = frequency === "monthly" ? MONTHLY_PRESETS : ONETIME_PRESETS;
  const defaultByFreq = frequency === "monthly" ? 96 : 40;

  const activeAmount = isCustom
    ? parseFloat(customAmount) || 0
    : selectedAmount || 0;

  const mealsPerCycle = Math.floor(activeAmount / 8);
  const annualMeals = frequency === "monthly" ? mealsPerCycle * 12 : mealsPerCycle;

  function handleFrequencyChange(freq: Frequency) {
    setFrequency(freq);
    setSelectedAmount(freq === "monthly" ? 96 : 40);
    setIsCustom(false);
    setCustomAmount("");
  }

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

  const foundingProgress = Math.min((FOUNDING_CURRENT / FOUNDING_GOAL) * 100, 100);

  return (
    <div className="mx-auto max-w-2xl">
      {/* Founding 100 social proof card — only on monthly */}
      <AnimatePresence>
        {frequency === "monthly" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mb-8 overflow-hidden rounded-2xl border border-[#D4A853]/30 bg-gradient-to-r from-[#D4A853]/8 to-[#D4A853]/3 p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-xs font-bold tracking-wider text-[#A07F30] uppercase">
                  Join the Founding 100
                </p>
                <p className="mt-1.5 text-sm font-semibold text-[#1A1A1A]">
                  {FOUNDING_CURRENT} monthly donors are funding our path to 1M meals.
                </p>
                <p className="mt-0.5 text-xs text-[#6B7280]">
                  Be among the first 100. Your name on our founding wall, forever.
                </p>
              </div>
              <div className="hidden sm:block">
                <div className="font-heading text-3xl font-black text-[#D4A853]">
                  {FOUNDING_CURRENT}
                  <span className="text-base font-bold text-[#6B7280]">/{FOUNDING_GOAL}</span>
                </div>
              </div>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/60">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${foundingProgress}%` }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-[#D4A853] to-[#E4BC6A]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Frequency toggle */}
      <div className="mb-10 flex justify-center">
        <div className="relative inline-flex rounded-full border border-[#E5E2DD] bg-white p-1.5 shadow-sm">
          {(["monthly", "one-time"] as Frequency[]).map((freq) => (
            <button
              key={freq}
              onClick={() => handleFrequencyChange(freq)}
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
              {freq === "monthly" && (
                <span className="absolute -top-2.5 -right-2 z-20 rounded-full bg-[#D4A853] px-2 py-0.5 text-[9px] font-bold tracking-wider text-[#1A3D5C] uppercase shadow-sm">
                  5× Impact
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* One-time soft nudge */}
      <AnimatePresence>
        {frequency === "one-time" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="-mt-6 mb-8 overflow-hidden"
          >
            <button
              onClick={() => handleFrequencyChange("monthly")}
              className="group flex w-full items-start gap-3 rounded-xl border border-[#E5E2DD] bg-[#FAFAF8] p-4 text-left transition-all hover:border-[#D4A853]/40 hover:bg-white"
            >
              <span className="mt-0.5 text-lg">💡</span>
              <span className="flex-1 text-sm text-[#4B5563]">
                Monthly donors feed{" "}
                <span className="font-bold text-[#1A1A1A]">5× more students</span>{" "}
                over a lifetime — and we can plan kitchens around predictable funding.{" "}
                <span className="font-semibold text-[#1A3D5C] underline decoration-[#D4A853] decoration-2 underline-offset-4 group-hover:text-[#D4A853]">
                  Switch to monthly →
                </span>
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Amount grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {presets.map((preset) => {
          const isSelected = !isCustom && selectedAmount === preset.amount;
          const isRecommended = frequency === "monthly" && preset.amount === defaultByFreq;
          return (
            <motion.button
              key={`${frequency}-${preset.amount}`}
              onClick={() => handlePresetClick(preset.amount)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative overflow-hidden rounded-2xl border-2 p-6 text-left transition-all ${
                isSelected
                  ? "border-[#D4A853] bg-[#D4A853]/5 shadow-lg shadow-[#D4A853]/10"
                  : "border-[#E5E2DD] bg-white hover:border-[#D4A853]/40 hover:shadow-md"
              }`}
            >
              {isRecommended && !isSelected && (
                <span className="absolute top-3 right-3 rounded-full bg-[#1A3D5C] px-2 py-0.5 text-[9px] font-bold tracking-wider text-white uppercase">
                  Most Loved
                </span>
              )}
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
                {frequency === "monthly" && (
                  <span className="text-base font-medium text-[#6B7280]">/mo</span>
                )}
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
                className="font-heading w-full bg-transparent text-2xl font-bold text-[#1A1A1A] placeholder-[#6B7280]/40 outline-none"
              />
              {frequency === "monthly" && customAmount && (
                <span className="text-sm font-medium text-[#6B7280]">/mo</span>
              )}
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
              {frequency === "monthly" ? "funds" : "provides"}
            </p>
            <p className="font-heading mt-2 text-3xl font-bold text-[#1A3D5C]">
              {frequency === "monthly"
                ? `${annualMeals} meals over the next year`
                : mealsPerCycle > 0
                  ? `${mealsPerCycle} nutritious meal${mealsPerCycle > 1 ? "s" : ""}`
                  : "a contribution to meals"}
            </p>
            {frequency === "monthly" && mealsPerCycle > 0 && (
              <p className="mt-2 text-sm text-[#6B7280]">
                That&apos;s{" "}
                <span className="font-semibold text-[#D4A853]">
                  {mealsPerCycle} meals every month
                </span>{" "}
                — predictable funding we can plan around.
              </p>
            )}
            {frequency === "one-time" && mealsPerCycle > 0 && (
              <p className="mt-2 text-sm text-[#6B7280]">
                Make it monthly and you&apos;ll feed{" "}
                <span className="font-semibold text-[#D4A853]">
                  {mealsPerCycle * 12} students
                </span>{" "}
                this year alone.
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
        {frequency === "monthly"
          ? `Become a monthly donor${activeAmount > 0 ? ` · $${activeAmount}/mo` : ""}`
          : `Donate${activeAmount > 0 ? ` $${activeAmount}` : ""} now`}
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

      {/* Security + cancel-anytime line */}
      <div className="mt-4 flex flex-col items-center justify-center gap-1 text-xs text-[#6B7280] sm:flex-row sm:gap-3">
        <div className="flex items-center gap-2">
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
          Secure payment via Stripe
        </div>
        {frequency === "monthly" && (
          <>
            <span className="hidden sm:inline">·</span>
            <span>Cancel or change anytime</span>
          </>
        )}
      </div>
    </div>
  );
}
