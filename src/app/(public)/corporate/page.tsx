import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import {
  FadeIn,
  FadeInLeft,
  FadeInRight,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Corporate Partnerships",
  description:
    "Partner with the World Food Movement to feed Bay Area community college students — the future workforce of your company. Benevity-registered, 501(c)(3), 100% meals model.",
};

const pitchPoints = [
  {
    label: "Talent pipeline, fed",
    title: "Tomorrow's engineers eat today.",
    body: "Bay Area community colleges feed ~30% of UC transfers and a huge share of the local CS, nursing, and skilled-trade workforce. When a student drops out because they can't afford lunch, your future hire never reaches your résumé pile.",
  },
  {
    label: "Visible, hyper-local impact",
    title: "Three miles from your campus.",
    body: "Every meal we serve is at a community college within driving distance of your HQ — De Anza, Foothill, Evergreen Valley, Ohlone, Chabot. This is impact you can point to, tour, and bring your team to.",
  },
  {
    label: "Unit economics any CFO loves",
    title: "$8 = one meal. No fine print.",
    body: "100% of every public dollar funds meals — operational costs are covered by our founders. That makes ROI reporting trivial: $50,000 → 6,250 meals → ~125 students fed for a semester. Easy to approve, easy to defend.",
  },
];

const tiers = [
  {
    name: "Supporter",
    price: "$10,000",
    meals: "1,250 meals",
    perks: [
      "Logo on our corporate partners page",
      "Annual impact report (Benevity-exportable)",
      "Team volunteer day (up to 15 people)",
    ],
    accent: false,
  },
  {
    name: "Campus Patron",
    price: "$50,000",
    meals: "6,250 meals · ~125 students / semester",
    perks: [
      "All Supporter benefits",
      "Named meal day at one partner campus",
      "Co-branded social + LinkedIn announcement",
      "Quarterly executive briefing",
    ],
    accent: true,
  },
  {
    name: "Campus Sponsor",
    price: "$200,000",
    meals: "25,000 meals · underwrites one full campus / year",
    perks: [
      "Named kitchen at a partner campus ('Powered by [Your Company]')",
      "Press release + joint media announcement",
      "Two team volunteer days + executive serving event",
      "Seat on our Corporate Advisory Council",
    ],
    accent: false,
  },
  {
    name: "Mission Partner",
    price: "$500,000+",
    meals: "62,500+ meals · multi-campus expansion",
    perks: [
      "Anchor sponsor for new campus launch",
      "Multi-year recognition on homepage",
      "Custom employee engagement program",
      "Direct collaboration with founders on roadmap",
    ],
    accent: false,
  },
];

const givingChannels = [
  {
    title: "Benevity",
    badge: "Easiest for employees",
    body: "We are officially registered on Benevity. Your employees can donate directly through your workplace giving portal — and most companies match 1:1 or 2:1, doubling or tripling every gift.",
    action: "Search 'World Food Movement CA' inside Benevity",
    helper: "EIN: 33-1400027 · 501(c)(3) public charity",
  },
  {
    title: "Matching Gifts",
    badge: "Free multiplier",
    body: "Most Bay Area employers (Google, Apple, Meta, Salesforce, Adobe, LinkedIn, Genentech, NVIDIA, Cisco, Intuit) match employee donations. Submitting a match takes 5 minutes and can double your gift.",
    action: "Check your employer's giving portal after donating",
    helper: "We'll send a receipt that works with every major matching platform.",
  },
  {
    title: "Donor-Advised Funds (DAF)",
    badge: "Tax-efficient",
    body: "If you give through Fidelity Charitable, Schwab Charitable, Vanguard Charitable, or your company's DAF, you can recommend a grant to us in under two minutes.",
    action: "Recommend a grant to 'World Food Movement of CA'",
    helper: "EIN: 33-1400027",
  },
  {
    title: "Direct Corporate Sponsorship",
    badge: "Highest impact",
    body: "Underwrite a campus, name a kitchen, or anchor a new launch. We work with your CSR, ESG, and brand teams to design a partnership that fits your reporting goals.",
    action: "Email corporate@wfmca.org to start a conversation",
    helper: "Decks, MOU templates, and impact data available on request.",
  },
];

const volunteerOptions = [
  {
    title: "Serving Day",
    body: "Bus your team to a partner campus. Plate meals, meet students, take photos for your internal comms. 3 hours, up to 25 people per event.",
  },
  {
    title: "Quarterly Impact Tour",
    body: "Bring leadership for a behind-the-scenes look at a partner campus. Meet students, sit with our founders, see your impact in numbers.",
  },
  {
    title: "Skills-Based Volunteering",
    body: "Marketing, engineering, finance, or legal teams can lend pro bono hours — website, branding, financial modeling, or compliance.",
  },
];

const trustSignals = [
  { label: "501(c)(3) Public Charity", value: "EIN 33-1400027" },
  { label: "Benevity-Registered", value: "Workplace giving enabled" },
  { label: "100% Meals Model", value: "Zero overhead on public gifts" },
  { label: "Audited Financials", value: "Available on request" },
];

export default function CorporatePage() {
  return (
    <main className="overflow-x-hidden">
      <PageHero
        label="For Corporate Partners"
        title="Feed the future workforce."
        subtitle="Bay Area companies hire from Bay Area campuses. We make sure those students don't drop out from hunger before you ever meet them."
        imageSrc="/images/banners/hero-1.webp"
      />

      {/* Trust signals strip */}
      <section className="border-b border-[#E5E2DD] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <StaggerContainer className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {trustSignals.map((s) => (
              <StaggerItem key={s.label}>
                <div className="text-center md:text-left">
                  <div className="text-xs font-semibold tracking-wider text-[#D4A853] uppercase">
                    {s.label}
                  </div>
                  <div className="mt-1 text-sm font-medium text-[#1A1A1A]">
                    {s.value}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* The pitch */}
      <section className="bg-[#FAFAF8] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-[#D4A853]">
                Why Bay Area companies partner with us
              </p>
              <h2 className="font-heading mt-4 text-4xl leading-[1.1] font-bold text-[#1A1A1A] md:text-5xl">
                Hunger on your doorstep is also a hiring problem.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-[#4B5563]">
                47% of California community college students face food
                insecurity. These are the students who will fill your
                engineering, healthcare, and operations roles in five years —
                if they stay enrolled. We make sure they do.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="mt-16 grid gap-6 md:grid-cols-3">
            {pitchPoints.map((p) => (
              <StaggerItem key={p.label}>
                <div className="flex h-full flex-col rounded-2xl border border-[#E5E2DD] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A853]/40 hover:shadow-lg">
                  <p className="text-xs font-bold tracking-wider text-[#D4A853] uppercase">
                    {p.label}
                  </p>
                  <h3 className="font-heading mt-3 text-2xl font-bold text-[#1A1A1A]">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-[#4B5563]">
                    {p.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Benevity featured callout */}
      <section className="bg-[#0A1118] py-20 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-10 md:p-14">
              <div className="grid gap-10 lg:grid-cols-5 lg:items-center">
                <div className="lg:col-span-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#D4A853]/15 px-3 py-1 text-xs font-bold tracking-wider text-[#D4A853] uppercase">
                    Now on Benevity
                  </div>
                  <h2 className="font-heading mt-5 text-3xl font-bold text-white md:text-4xl">
                    Your employees can give from their workplace portal.
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-white/70">
                    We&apos;re officially registered on Benevity, which powers
                    workplace giving at Google, Apple, Microsoft, Salesforce,
                    Adobe, LinkedIn, Cisco, and most Bay Area tech employers.
                    Employees can donate, schedule recurring gifts, and
                    automatically claim their company&apos;s match — without leaving
                    their portal.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3 text-sm">
                    <div className="rounded-full bg-white/[0.06] px-4 py-2 text-white/80">
                      Search: <span className="font-semibold text-white">World Food Movement CA</span>
                    </div>
                    <div className="rounded-full bg-white/[0.06] px-4 py-2 text-white/80">
                      EIN: <span className="font-semibold text-white">33-1400027</span>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="rounded-2xl bg-white/[0.05] p-6 backdrop-blur">
                    <p className="text-xs font-semibold tracking-wider text-[#D4A853] uppercase">
                      Match multiplier
                    </p>
                    <div className="mt-3 grid grid-cols-3 items-center gap-2 text-center">
                      <div>
                        <div className="font-heading text-3xl font-black text-white">$8</div>
                        <div className="mt-1 text-[10px] tracking-wider text-white/40 uppercase">You give</div>
                      </div>
                      <div className="text-2xl text-[#D4A853]">→</div>
                      <div>
                        <div className="font-heading text-3xl font-black text-[#D4A853]">$24</div>
                        <div className="mt-1 text-[10px] tracking-wider text-white/40 uppercase">After 2:1 match</div>
                      </div>
                    </div>
                    <div className="mt-5 h-px bg-white/10" />
                    <p className="mt-4 text-xs leading-relaxed text-white/50">
                      That&apos;s 3 meals from one $8 gift — most Bay Area employers match 1:1 or 2:1.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Sponsorship tiers */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-[#D4A853]">
                Sponsor-a-campus tiers
              </p>
              <h2 className="font-heading mt-4 text-4xl leading-[1.1] font-bold text-[#1A1A1A] md:text-5xl">
                Pick a tier, feed a campus.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-[#4B5563]">
                Every tier is a direct, named contribution to one of our partner
                campuses. We provide impact reports, photography, and CSR-ready
                content quarterly.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="mt-16 grid gap-6 lg:grid-cols-4">
            {tiers.map((tier) => (
              <StaggerItem key={tier.name}>
                <div
                  className={`relative flex h-full flex-col rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 ${
                    tier.accent
                      ? "border-[#D4A853] bg-[#1A3D5C] text-white shadow-xl"
                      : "border-[#E5E2DD] bg-white hover:border-[#D4A853]/40 hover:shadow-lg"
                  }`}
                >
                  {tier.accent && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#D4A853] px-3 py-1 text-[10px] font-bold tracking-wider text-[#1A3D5C] uppercase">
                      Most Popular
                    </div>
                  )}
                  <h3
                    className={`text-sm font-bold tracking-wider uppercase ${
                      tier.accent ? "text-[#D4A853]" : "text-[#D4A853]"
                    }`}
                  >
                    {tier.name}
                  </h3>
                  <div
                    className={`font-heading mt-3 text-3xl font-black ${
                      tier.accent ? "text-white" : "text-[#1A1A1A]"
                    }`}
                  >
                    {tier.price}
                  </div>
                  <p
                    className={`mt-1 text-sm ${
                      tier.accent ? "text-white/70" : "text-[#6B7280]"
                    }`}
                  >
                    {tier.meals}
                  </p>
                  <ul
                    className={`mt-6 space-y-3 text-sm ${
                      tier.accent ? "text-white/80" : "text-[#4B5563]"
                    }`}
                  >
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2.5">
                        <svg
                          className={`mt-0.5 h-4 w-4 flex-shrink-0 ${
                            tier.accent ? "text-[#D4A853]" : "text-[#D4A853]"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.2}>
            <p className="mt-10 text-center text-sm text-[#6B7280]">
              Need a custom partnership?{" "}
              <Link
                href="/contact"
                className="font-semibold text-[#1A3D5C] underline decoration-[#D4A853] decoration-2 underline-offset-4"
              >
                Talk to our team
              </Link>
              .
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Ways your company can give */}
      <section className="bg-[#FAFAF8] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-[#D4A853]">
                Four ways to give
              </p>
              <h2 className="font-heading mt-4 text-4xl leading-[1.1] font-bold text-[#1A1A1A] md:text-5xl">
                Pick the channel that fits your company.
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="mt-16 grid gap-6 md:grid-cols-2">
            {givingChannels.map((channel) => (
              <StaggerItem key={channel.title}>
                <div className="flex h-full flex-col rounded-2xl border border-[#E5E2DD] bg-white p-8 transition-all duration-300 hover:border-[#D4A853]/40 hover:shadow-lg">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-heading text-2xl font-bold text-[#1A1A1A]">
                      {channel.title}
                    </h3>
                    <span className="flex-shrink-0 rounded-full bg-[#D4A853]/15 px-3 py-1 text-[11px] font-bold tracking-wider text-[#A07F30] uppercase">
                      {channel.badge}
                    </span>
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-[#4B5563]">
                    {channel.body}
                  </p>
                  <div className="mt-6 rounded-xl bg-[#FAFAF8] p-4">
                    <p className="text-sm font-semibold text-[#1A3D5C]">
                      {channel.action}
                    </p>
                    <p className="mt-1 text-xs text-[#6B7280]">{channel.helper}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Employee engagement / volunteer */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
            <FadeInLeft>
              <div>
                <p className="text-sm font-semibold text-[#D4A853]">
                  Employee engagement
                </p>
                <h2 className="font-heading mt-4 text-4xl leading-[1.1] font-bold text-[#1A1A1A] md:text-5xl">
                  More than a check.
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-[#4B5563]">
                  The best corporate partnerships are the ones your employees
                  feel. We design experiences that pull your team out of the
                  office, into a campus, and back to their desks with stories
                  they actually want to tell.
                </p>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1A3D5C] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#D4A853] hover:text-[#1A3D5C]"
                >
                  Plan a team day
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </FadeInLeft>

            <FadeInRight>
              <div className="space-y-4">
                {volunteerOptions.map((opt) => (
                  <div
                    key={opt.title}
                    className="rounded-2xl border border-[#E5E2DD] bg-[#FAFAF8] p-6 transition-all hover:border-[#D4A853]/40 hover:bg-white"
                  >
                    <h3 className="font-heading text-xl font-bold text-[#1A1A1A]">
                      {opt.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">
                      {opt.body}
                    </p>
                  </div>
                ))}
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#1A3D5C] py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <FadeIn>
            <p className="text-sm font-semibold text-[#D4A853]">
              Let&apos;s build something
            </p>
            <h2 className="font-heading mt-4 text-4xl leading-[1.1] font-bold text-white md:text-5xl lg:text-6xl">
              Twenty minutes. One call. Real impact.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              We&apos;ll walk you through our impact data, partner campuses, and the
              partnership tiers that fit your CSR and ESG goals. No deck
              required on your end.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="mailto:corporate@wfmca.org"
                className="inline-flex items-center gap-2 rounded-full bg-[#D4A853] px-8 py-4 text-sm font-bold text-[#1A3D5C] transition-all hover:bg-white"
              >
                Email corporate@wfmca.org
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-sm font-bold text-white transition-all hover:border-[#D4A853] hover:text-[#D4A853]"
              >
                Schedule a call
              </Link>
            </div>
            <p className="mt-8 text-xs text-white/40">
              EIN 33-1400027 · 501(c)(3) · Benevity-registered · Donations are tax-deductible to the extent allowed by law.
            </p>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
