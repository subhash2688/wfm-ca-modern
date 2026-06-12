import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { WFM_CAMPUSES } from "@/lib/data/campuses";
import { InterestForm } from "./InterestForm";
import { ScrollLink } from "./ScrollLink";

export const metadata: Metadata = {
  title: "Volunteer — World Food Movement",
  description:
    "Volunteers power everything we do. Join our team at campuses across the Bay Area and help deliver meals to students facing food insecurity.",
};

/* ── Static placeholder shifts ── */
const PLACEHOLDER_SHIFTS = [
  {
    campus: "De Anza College",
    city: "Cupertino",
    date: "Saturday, Jun 14",
    time: "9:00 – 11:30 AM",
    type: "Meal prep & packing",
    spots: 4,
  },
  {
    campus: "Chabot College",
    city: "Hayward",
    date: "Saturday, Jun 14",
    time: "11:00 AM – 1:30 PM",
    type: "Distribution",
    spots: 2,
  },
  {
    campus: "Foothill College",
    city: "Los Altos Hills",
    date: "Sunday, Jun 15",
    time: "10:00 AM – 12:30 PM",
    type: "Delivery",
    spots: 6,
  },
];

const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Fill out the interest form",
    desc: "Takes less than 2 minutes. Tell us your campus and when you're free.",
  },
  {
    step: 2,
    title: "Attend a short orientation",
    desc: "Required before your first shift. It's about 2 hours and covers food safety, logistics, and what to expect.",
  },
  {
    step: 3,
    title: "Get your welcome text when approved",
    desc: "Once orientation is complete, we'll send you a text with your volunteer portal access.",
  },
  {
    step: 4,
    title: "Sign up for shifts in the volunteer portal",
    desc: "Browse open shifts at your campus, claim a spot, and show up. It's that simple.",
  },
];

const FAQS = [
  {
    q: "Do I need prior experience?",
    a: "No experience needed. We train everyone before their first shift — meal prep, food safety, and delivery logistics are all covered during orientation.",
  },
  {
    q: "Is orientation really required?",
    a: "Yes. Orientation is required by California food handling law and takes about 2 hours. We run them regularly at most campuses, so you won't wait long.",
  },
  {
    q: "Can I bring my kids?",
    a: "Youth volunteers under 18 are welcome with a signed parental consent form. Please note that younger volunteers may be assigned to non-kitchen tasks only.",
  },
  {
    q: "How do I know when I'm approved?",
    a: "You'll receive a text from us as soon as your orientation is complete. Keep an eye on your phone — we move quickly.",
  },
];

export default function VolunteerPage() {
  return (
    <main className="overflow-x-hidden bg-[#0A1118]">

      {/* ── 1. Hero ── */}
      <section className="relative flex min-h-[88vh] items-end pb-24 md:pb-36">
        {/* Background gradient + texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1118] via-[#0F1D2C] to-[#1A3D5C]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Gold accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4A853]/40 to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pt-36">
          <div className="max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[#D4A853]/40 bg-[#D4A853]/10 px-5 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4A853]" />
              <span className="text-xs font-semibold text-[#D4A853] tracking-wide">
                Join our volunteer team
              </span>
            </div>
            <h1 className="font-heading text-6xl leading-[0.95] font-black tracking-tight text-white md:text-7xl lg:text-[88px]">
              Volunteers power
              <br />
              <em className="not-italic text-[#D4A853]">everything</em> we do.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60 md:text-xl">
              Every meal we deliver starts with someone like you giving a few hours. Join our team at campuses across the Bay Area.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#interest-form"
                className="group inline-flex items-center gap-3 rounded-full bg-[#D4A853] px-10 py-4 text-base font-bold text-[#1A3D5C] transition-all hover:bg-[#E4BC6A] hover:shadow-2xl hover:shadow-[#D4A853]/30 hover:-translate-y-0.5"
              >
                Get started
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <Link
                href="/v/login"
                className="inline-flex items-center gap-2 text-[15px] font-semibold text-white/60 transition-colors hover:text-white"
              >
                Already a volunteer? Sign in
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25 pointer-events-none">
          <span className="text-[10px] font-semibold text-white">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* ── 2. Impact strip ── */}
      <section className="bg-[#0A1118]">
        <div className="h-px bg-gradient-to-r from-transparent via-[#D4A853]/50 to-transparent" />
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <div className="grid grid-cols-1 gap-px sm:grid-cols-3">
            {[
              { number: "500+", label: "Volunteer shifts completed", sub: "since we launched" },
              { number: "8", label: "Bay Area campuses", sub: "across Silicon Valley & East Bay" },
              { number: "20,000+", label: "Meals served by volunteers", sub: "and counting" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center px-8 py-10 text-center ${i < 2 ? "sm:border-r sm:border-white/[0.06]" : ""}`}
              >
                <div className="font-heading text-6xl font-black text-[#D4A853] md:text-7xl">
                  {stat.number}
                </div>
                <div className="mt-2 text-sm font-bold text-white/80">{stat.label}</div>
                <div className="mt-0.5 text-xs text-white/35">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-[#D4A853]/20 to-transparent" />
      </section>

      {/* ── 3. Three volunteer paths ── */}
      <section className="bg-[#0A1118] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold text-[#D4A853]">Choose your path</p>
            <h2 className="font-heading mt-4 text-5xl font-black text-white md:text-6xl">
              How do you want to help?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/50">
              Whether you&apos;ve got a morning free or you&apos;re bringing your whole team — there&apos;s a place for you.
            </p>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {/* Individual */}
            <div className="group flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:border-[#D4A853]/30 hover:bg-white/[0.05] hover:-translate-y-1">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4A853]/10 ring-1 ring-[#D4A853]/20 transition-all group-hover:bg-[#D4A853]/15 group-hover:ring-[#D4A853]/40">
                <svg className="h-7 w-7 text-[#D4A853]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <h3 className="font-heading mt-6 text-2xl font-bold text-white">Volunteer individually</h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-white/55">
                Show up for a shift at your nearest campus. Meal prep, packing, delivery — pick what fits your schedule. No long-term commitment required.
              </p>
              <ScrollLink
                href="#interest-form"
                targetId="interest-form"
                typeParam="individual"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#D4A853] transition-colors hover:text-[#E4BC6A]"
              >
                Sign up
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </ScrollLink>
            </div>

            {/* Regular — featured */}
            <div className="group relative flex flex-col rounded-3xl border border-[#D4A853]/30 bg-gradient-to-b from-[#D4A853]/8 to-[#D4A853]/3 p-8 shadow-2xl shadow-[#D4A853]/5 transition-all duration-300 hover:border-[#D4A853]/50 hover:-translate-y-1">
              <div className="absolute top-5 right-5">
                <span className="rounded-full bg-[#D4A853]/20 px-3 py-1 text-[11px] font-bold text-[#D4A853] uppercase tracking-wider">Most impact</span>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4A853]/15 ring-1 ring-[#D4A853]/40">
                <svg className="h-7 w-7 text-[#D4A853]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                </svg>
              </div>
              <h3 className="font-heading mt-6 text-2xl font-bold text-white">Become a regular</h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-white/55">
                Commit to a campus on a recurring basis. Our most impactful volunteers come back every week — students and staff start to recognize you and count on you.
              </p>
              <ScrollLink
                href="#interest-form"
                targetId="interest-form"
                typeParam="regular"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#D4A853] transition-colors hover:text-[#E4BC6A]"
              >
                Sign up
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </ScrollLink>
            </div>

            {/* Group */}
            <div className="group flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:border-[#D4A853]/30 hover:bg-white/[0.05] hover:-translate-y-1">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4A853]/10 ring-1 ring-[#D4A853]/20 transition-all group-hover:bg-[#D4A853]/15 group-hover:ring-[#D4A853]/40">
                <svg className="h-7 w-7 text-[#D4A853]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
              </div>
              <h3 className="font-heading mt-6 text-2xl font-bold text-white">Bring your group</h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-white/55">
                Corporate team, student club, or friend group — we welcome groups of 5 or more. Great team building with real community impact.
              </p>
              <ScrollLink
                href="#interest-form"
                targetId="interest-form"
                typeParam="group"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#D4A853] transition-colors hover:text-[#E4BC6A]"
              >
                Sign up
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </ScrollLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Shifts available this weekend ── */}
      <section className="bg-[#0D1B26] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#D4A853]">Open shifts</p>
              <h2 className="font-heading mt-3 text-4xl font-black text-white md:text-5xl">
                Shifts available this weekend
              </h2>
            </div>
            <p className="text-sm text-white/35 sm:text-right">
              Live shift data coming soon.<br className="hidden sm:block" />
              Claim a spot now and we&apos;ll confirm by text.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {PLACEHOLDER_SHIFTS.map((shift, i) => (
              <div
                key={i}
                className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all hover:border-[#D4A853]/30 hover:bg-white/[0.06]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-bold text-white">{shift.campus}</p>
                    <p className="mt-0.5 text-sm text-white/40">{shift.city}</p>
                  </div>
                  <span className="flex-shrink-0 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
                    {shift.spots} spot{shift.spots !== 1 ? "s" : ""} left
                  </span>
                </div>

                <div className="mt-5 space-y-2.5">
                  <div className="flex items-center gap-2.5 text-sm text-white/55">
                    <svg className="h-4 w-4 text-[#D4A853]/70 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                    {shift.date}
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-white/55">
                    <svg className="h-4 w-4 text-[#D4A853]/70 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    {shift.time}
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-white/55">
                    <svg className="h-4 w-4 text-[#D4A853]/70 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                    </svg>
                    {shift.type}
                  </div>
                </div>

                <ScrollLink
                  href="#interest-form"
                  targetId="interest-form"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#D4A853]/30 px-5 py-2.5 text-sm font-semibold text-[#D4A853] transition-all hover:bg-[#D4A853]/10 hover:border-[#D4A853]/60"
                >
                  Claim a spot
                </ScrollLink>
              </div>
            ))}
          </div>

          {/* Campus list */}
          <div className="mt-10 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-3">We operate at these campuses</p>
            <div className="flex flex-wrap gap-2">
              {WFM_CAMPUSES.map((c) => (
                <span key={c.name} className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-white/50">
                  {c.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. How it works ── */}
      <section className="bg-[#0A1118] py-24 md:py-32">
        <div className="h-px bg-gradient-to-r from-transparent via-[#D4A853]/20 to-transparent mb-24" />
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold text-[#D4A853]">How it works</p>
            <h2 className="font-heading mt-4 text-5xl font-black text-white md:text-6xl">
              Four steps to your first shift
            </h2>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="relative flex flex-col">
                {/* Connector line (desktop) */}
                {item.step < 4 && (
                  <div className="absolute top-7 left-14 right-0 hidden h-px bg-gradient-to-r from-[#D4A853]/30 to-transparent lg:block" />
                )}
                <div className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#D4A853]/40 bg-[#D4A853]/10 text-xl font-black text-[#D4A853]">
                  {item.step}
                </div>
                <h3 className="font-heading mt-5 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Interest form ── */}
      <section id="interest-form" className="bg-[#0D1B26] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-5">
            {/* Left copy */}
            <div className="lg:col-span-2">
              <p className="text-sm font-semibold text-[#D4A853]">Get started</p>
              <h2 className="font-heading mt-4 text-4xl font-black text-white md:text-5xl leading-tight">
                Ready to show up?
              </h2>
              <p className="mt-5 text-lg text-white/55 leading-relaxed">
                Fill out your interest and we&apos;ll reach out within 2 business days to schedule your orientation and get you set up in the portal.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  "Orientation included — no prior experience needed",
                  "Choose your campus and availability",
                  "Show up when you can — no rigid schedule",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#D4A853]/15">
                      <svg className="h-3 w-3 text-[#D4A853]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    <span className="text-sm text-white/60">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right form */}
            <div className="lg:col-span-3">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 md:p-10">
                <Suspense fallback={<div className="py-10 text-center text-sm text-white/30">Loading form…</div>}>
                  <InterestForm />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="bg-[#0A1118] py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold text-[#D4A853]">FAQ</p>
            <h2 className="font-heading mt-4 text-5xl font-black text-white md:text-6xl">
              Common questions
            </h2>
          </div>

          <div className="mt-14 space-y-4">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] transition-all open:border-[#D4A853]/20 open:bg-[#D4A853]/[0.03]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-base font-semibold text-white/80 hover:text-white [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-white/20 transition-all group-open:border-[#D4A853]/40 group-open:bg-[#D4A853]/10 group-open:rotate-45">
                    <svg className="h-3.5 w-3.5 text-white/50 group-open:text-[#D4A853]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 pt-0">
                  <p className="text-[15px] leading-relaxed text-white/50">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-white/35">
              Have another question?{" "}
              <Link href="/contact" className="text-[#D4A853] hover:text-[#E4BC6A] font-medium transition-colors">
                Reach out to our team →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-[#1A3D5C] py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="font-heading text-4xl font-black text-white md:text-5xl">
            Every shift feeds a student.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-white/55">
            2 hours of your time = dozens of students who can focus on school instead of hunger.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <ScrollLink
              href="#interest-form"
              targetId="interest-form"
              className="inline-flex items-center gap-3 rounded-full bg-[#D4A853] px-10 py-4 text-base font-bold text-[#1A3D5C] transition-all hover:bg-[#E4BC6A] hover:shadow-2xl hover:shadow-[#D4A853]/20 hover:-translate-y-0.5"
            >
              Get started today
            </ScrollLink>
            <Link
              href="/donate"
              className="inline-flex items-center gap-3 rounded-full border border-white/20 px-10 py-4 text-base font-bold text-white/70 transition-all hover:border-white/40 hover:text-white"
            >
              Fund a meal instead
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
