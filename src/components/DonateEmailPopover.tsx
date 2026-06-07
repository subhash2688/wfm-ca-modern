"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EmailSignup } from "@/components/EmailSignup";

const DISMISS_KEY = "wfm-donate-popover-dismissed";
const DELAY_MS = 30_000;

export function DonateEmailPopover() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(DISMISS_KEY)) return;

    const timer = window.setTimeout(() => setOpen(true), DELAY_MS);

    function onExit(e: MouseEvent) {
      if (e.clientY <= 0 && !localStorage.getItem(DISMISS_KEY)) {
        setOpen(true);
      }
    }
    document.addEventListener("mouseleave", onExit);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseleave", onExit);
    };
  }, []);

  function dismiss() {
    setOpen(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(DISMISS_KEY, Date.now().toString());
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ type: "spring", duration: 0.45, bounce: 0.25 }}
          className="fixed right-4 bottom-4 z-50 w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-2xl border border-[#E5E2DD] bg-white shadow-2xl sm:right-6 sm:bottom-6"
          role="dialog"
          aria-label="Stay in touch"
        >
          <div className="relative p-6">
            <button
              onClick={dismiss}
              aria-label="Close"
              className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full text-[#6B7280] transition-colors hover:bg-[#FAFAF8] hover:text-[#1A1A1A]"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#D4A853]/15">
              <svg className="h-5 w-5 text-[#D4A853]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>

            <h3 className="font-heading mt-4 text-xl font-bold text-[#1A1A1A]">
              Not ready to give today?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">
              Get our monthly impact update — real students, real meals, two minutes to read. We&apos;ll be here when you&apos;re ready.
            </p>

            <div className="mt-5">
              <EmailSignup
                source="donate-popover"
                variant="light"
                placeholder="you@email.com"
                buttonLabel="Get updates"
                successMessage="Thank you. We'll be in touch."
              />
            </div>

            <button
              onClick={dismiss}
              className="mt-3 text-xs text-[#6B7280] underline-offset-2 hover:underline"
            >
              No thanks
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
