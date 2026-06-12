"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { WFM_CAMPUSES } from "@/lib/data/campuses";

type VolunteerType = "individual" | "regular" | "group";

const AVAILABILITY_OPTIONS = [
  { id: "weekday-mornings", label: "Weekday mornings" },
  { id: "weekday-evenings", label: "Weekday evenings" },
  { id: "saturday", label: "Saturday" },
  { id: "sunday", label: "Sunday" },
];

export function InterestForm() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type") as VolunteerType | null;

  const [volunteerType, setVolunteerType] = useState<VolunteerType>(
    typeParam === "regular" || typeParam === "group" ? typeParam : "individual"
  );
  const [availability, setAvailability] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Re-sync if URL param changes after mount (e.g. clicking path cards)
  useEffect(() => {
    if (typeParam === "individual" || typeParam === "regular" || typeParam === "group") {
      setVolunteerType(typeParam);
    }
  }, [typeParam]);

  function toggleAvailability(id: string) {
    setAvailability((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/volunteer/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, availability, volunteerType }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#D4A853]/15">
          <svg className="h-8 w-8 text-[#D4A853]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <div>
          <h3 className="font-heading text-2xl font-bold text-white">You&apos;re on the list!</h3>
          <p className="mt-2 max-w-sm text-white/60">
            We&apos;ll reach out to schedule your orientation. Check your phone — we&apos;ll text you.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {/* Name row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-1.5 block text-sm font-semibold text-white/80">
            First name <span className="text-[#D4A853]">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            placeholder="Priya"
            className="w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-white placeholder:text-white/25 focus:border-[#D4A853]/60 focus:outline-none focus:ring-2 focus:ring-[#D4A853]/20 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1.5 block text-sm font-semibold text-white/80">
            Last name <span className="text-[#D4A853]">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            placeholder="Sharma"
            className="w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-white placeholder:text-white/25 focus:border-[#D4A853]/60 focus:outline-none focus:ring-2 focus:ring-[#D4A853]/20 transition-colors"
          />
        </div>
      </div>

      {/* Phone + Email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-white/80">
            Phone number <span className="text-[#D4A853]">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="(510) 555-0100"
            className="w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-white placeholder:text-white/25 focus:border-[#D4A853]/60 focus:outline-none focus:ring-2 focus:ring-[#D4A853]/20 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-white/80">
            Email <span className="text-white/35 font-normal">(optional)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="priya@example.com"
            className="w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-white placeholder:text-white/25 focus:border-[#D4A853]/60 focus:outline-none focus:ring-2 focus:ring-[#D4A853]/20 transition-colors"
          />
        </div>
      </div>

      {/* Campus preference */}
      <div>
        <label htmlFor="campus" className="mb-1.5 block text-sm font-semibold text-white/80">
          Campus preference <span className="text-[#D4A853]">*</span>
        </label>
        <select
          id="campus"
          name="campus"
          required
          className="w-full rounded-xl border border-white/15 bg-[#0F1F30] px-4 py-3 text-white focus:border-[#D4A853]/60 focus:outline-none focus:ring-2 focus:ring-[#D4A853]/20 transition-colors appearance-none cursor-pointer"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff40' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", backgroundSize: "18px" }}
        >
          <option value="" disabled>Select a campus...</option>
          {WFM_CAMPUSES.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name} — {c.city}
            </option>
          ))}
        </select>
      </div>

      {/* Volunteer type */}
      <div>
        <p className="mb-3 text-sm font-semibold text-white/80">
          Volunteer type <span className="text-[#D4A853]">*</span>
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {(["individual", "regular", "group"] as VolunteerType[]).map((t) => {
            const labels: Record<VolunteerType, string> = {
              individual: "Individual",
              regular: "Regular",
              group: "Group",
            };
            const descs: Record<VolunteerType, string> = {
              individual: "One-time or occasional shifts",
              regular: "Recurring weekly commitment",
              group: "5+ people, club or company",
            };
            const selected = volunteerType === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setVolunteerType(t)}
                className={`flex flex-col gap-1 rounded-xl border px-4 py-3.5 text-left transition-all ${
                  selected
                    ? "border-[#D4A853] bg-[#D4A853]/10 ring-1 ring-[#D4A853]/30"
                    : "border-white/15 bg-white/[0.04] hover:border-white/30"
                }`}
              >
                <span className={`text-sm font-bold ${selected ? "text-[#D4A853]" : "text-white/80"}`}>
                  {labels[t]}
                </span>
                <span className="text-xs text-white/40 leading-snug">{descs[t]}</span>
              </button>
            );
          })}
        </div>
        {/* Hidden input to submit volunteerType */}
        <input type="hidden" name="volunteerType" value={volunteerType} />
      </div>

      {/* Group-only fields */}
      {volunteerType === "group" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="orgName" className="mb-1.5 block text-sm font-semibold text-white/80">
              Organization name <span className="text-[#D4A853]">*</span>
            </label>
            <input
              id="orgName"
              name="orgName"
              type="text"
              required
              placeholder="Berkeley CS Club"
              className="w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-white placeholder:text-white/25 focus:border-[#D4A853]/60 focus:outline-none focus:ring-2 focus:ring-[#D4A853]/20 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="groupSize" className="mb-1.5 block text-sm font-semibold text-white/80">
              Estimated group size <span className="text-[#D4A853]">*</span>
            </label>
            <input
              id="groupSize"
              name="groupSize"
              type="number"
              required
              min={5}
              placeholder="10"
              className="w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-white placeholder:text-white/25 focus:border-[#D4A853]/60 focus:outline-none focus:ring-2 focus:ring-[#D4A853]/20 transition-colors"
            />
          </div>
        </div>
      )}

      {/* Availability */}
      <div>
        <p className="mb-3 text-sm font-semibold text-white/80">
          Availability <span className="text-white/35 font-normal">(check all that apply)</span>
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {AVAILABILITY_OPTIONS.map((opt) => {
            const checked = availability.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggleAvailability(opt.id)}
                className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                  checked
                    ? "border-[#D4A853] bg-[#D4A853]/10 text-[#D4A853]"
                    : "border-white/15 bg-white/[0.04] text-white/60 hover:border-white/30 hover:text-white/80"
                }`}
              >
                <span className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border transition-colors ${checked ? "border-[#D4A853] bg-[#D4A853]" : "border-white/30"}`}>
                  {checked && (
                    <svg className="h-2.5 w-2.5 text-[#1A3D5C]" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                </span>
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-[#D4A853] px-8 py-4 text-base font-bold text-[#1A3D5C] transition-all hover:bg-[#E4BC6A] hover:shadow-xl hover:shadow-[#D4A853]/20 hover:-translate-y-0.5 disabled:opacity-60 disabled:pointer-events-none"
      >
        {submitting ? "Submitting…" : "Submit interest"}
      </button>

      <p className="text-center text-xs text-white/30">
        We&apos;ll reach out within 2 business days to schedule orientation.
      </p>
    </form>
  );
}
