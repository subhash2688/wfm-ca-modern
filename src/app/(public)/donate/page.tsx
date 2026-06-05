import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { FadeIn, FadeInLeft, FadeInRight, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { DonationSelector } from "./DonationSelector";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Fund nutritious meals for college students. 100% of your donation goes to meals.",
};

export default function DonatePage() {
  return (
    <main className="overflow-x-hidden">
      <PageHero
        label="Donate"
        title="Feed a student today."
        subtitle="100% of your donation goes directly to meals."
        imageSrc="/images/banners/hero-2.webp"
      />

      {/* ── Donation Amount Selector ── */}
      <section className="bg-[#FAFAF8] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold tracking-[0.2em] text-[#D4A853] uppercase">
                Choose your impact
              </p>
              <h2 className="font-heading mt-4 text-3xl font-bold text-[#1A1A1A] md:text-5xl">
                Every dollar feeds a student.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-[#6B7280]">
                Select an amount below. Each $5 provides one complete,
                nutritious meal for a college student in need.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <DonationSelector />
          </FadeIn>
        </div>
      </section>

      {/* ── Why Donate — The 100% Model ── */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
            <FadeInLeft>
              <div>
                <p className="text-sm font-semibold tracking-[0.2em] text-[#D4A853] uppercase">
                  The 100% model
                </p>
                <h2 className="font-heading mt-4 text-4xl leading-[1.1] font-bold text-[#1A1A1A] md:text-5xl lg:text-6xl">
                  Zero overhead.
                  <br />
                  <span className="text-[#D4A853]">100% meals.</span>
                </h2>
                <p className="mt-8 max-w-lg text-lg leading-relaxed text-[#4B5563]">
                  Unlike most nonprofits, we don&apos;t use your donation for
                  salaries, rent, or marketing. A small group of founding donors
                  covers all operational costs. That means every single cent you
                  give goes directly to preparing and delivering nutritious meals
                  to students.
                </p>

                <div className="mt-12 grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="font-heading text-4xl font-bold text-[#1A3D5C] md:text-5xl">
                      0%
                    </div>
                    <div className="mt-2 text-sm font-medium text-[#6B7280]">
                      Overhead
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-heading text-4xl font-bold text-[#D4A853] md:text-5xl">
                      100%
                    </div>
                    <div className="mt-2 text-sm font-medium text-[#6B7280]">
                      Goes to meals
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-heading text-4xl font-bold text-[#1A3D5C] md:text-5xl">
                      $5
                    </div>
                    <div className="mt-2 text-sm font-medium text-[#6B7280]">
                      Per meal cost
                    </div>
                  </div>
                </div>
              </div>
            </FadeInLeft>

            <FadeInRight>
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-[#1A3D5C]/10 to-[#D4A853]/10">
                  <Image
                    src="/images/resources/food-distribution-2.jpg"
                    alt="Volunteers preparing meals for students"
                    width={800}
                    height={1000}
                    className="h-full w-full object-cover"
                  />
                </div>
                {/* Floating impact card */}
                <div className="absolute -right-4 -bottom-6 rounded-2xl bg-[#1A3D5C] p-6 text-white shadow-2xl md:-right-8">
                  <div className="font-heading text-4xl font-bold text-[#D4A853]">
                    2.3M+
                  </div>
                  <div className="mt-1 text-sm text-white/60">
                    meals served
                    <br />
                    and counting
                  </div>
                </div>
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* ── Impact Numbers Strip ── */}
      <section className="bg-[#1A3D5C] py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <StaggerContainer className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { number: "$5", label: "Feeds 1 student for 1 day" },
              { number: "$35", label: "Feeds 1 student for 1 week" },
              { number: "$150", label: "Feeds 1 student for 1 month" },
              { number: "$1,800", label: "Feeds 1 student for 1 year" },
            ].map((item) => (
              <StaggerItem key={item.label}>
                <div className="text-center">
                  <div className="font-heading text-3xl font-bold text-[#D4A853] md:text-4xl">
                    {item.number}
                  </div>
                  <div className="mt-2 text-sm text-white/60">{item.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Donor Testimonial ── */}
      <section className="relative py-32 md:py-40">
        <Image
          src="/images/resources/food-distribution-5.jpg"
          alt="Community support"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#1A3D5C]/85" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <FadeIn>
            <svg
              className="mx-auto h-12 w-12 text-[#D4A853]/40"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="font-heading mt-8 text-3xl leading-snug font-bold text-white md:text-5xl">
              I&apos;ve donated to dozens of nonprofits.
              <br />
              <span className="text-[#D4A853]">
                WFMCA is the only one where I know
              </span>
              <br />
              every dollar reaches a student.
            </blockquote>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Image
                src="/images/testimonials/testimonial2.jpg"
                alt="Robert Johnson"
                width={56}
                height={56}
                className="h-14 w-14 rounded-full border-2 border-[#D4A853]/40 object-cover"
              />
              <div className="text-left">
                <p className="font-semibold text-white">Robert Johnson</p>
                <p className="text-sm text-white/50">
                  Monthly donor since 2023
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Donation FAQ ── */}
      <section className="bg-[#FAFAF8] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="mb-16 text-center">
              <p className="text-sm font-semibold tracking-[0.2em] text-[#D4A853] uppercase">
                Questions
              </p>
              <h2 className="font-heading mt-4 text-3xl font-bold text-[#1A1A1A] md:text-4xl">
                Frequently asked about donations
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="mx-auto max-w-3xl space-y-4">
            {[
              {
                question: "Is my donation tax-deductible?",
                answer:
                  "Yes. The World Food Movement (WFMCA) is a registered 501(c)(3) nonprofit organization. Your donation is fully tax-deductible to the extent allowed by law. Our EIN is 33-1400027. You will receive a receipt for your records after every donation.",
              },
              {
                question: "Where does my money go?",
                answer:
                  "100% of your donation goes directly to preparing and delivering nutritious Sattvic meals to college students. Our operational costs — salaries, technology, marketing — are covered by a separate group of founding donors, so your gift is never diluted by overhead.",
              },
              {
                question: "Can I set up recurring donations?",
                answer:
                  "Absolutely. You can choose a monthly recurring donation from the options above. Monthly donors provide reliable, predictable support that helps us plan meal programs across our 52 partner campuses. You can cancel or modify your recurring donation at any time.",
              },
              {
                question: "How many meals does my donation fund?",
                answer:
                  "Each $5 funds one complete, nutritious meal. So $25 feeds a student for 5 days, $150 for a full month, and $1,800 covers an entire academic year. Every dollar counts — there is no minimum donation.",
              },
              {
                question: "Can I donate in honor or memory of someone?",
                answer:
                  "Yes. During the checkout process, you can add a dedication note. We will send a notification to the honoree or their family if you provide their email address. Memorial and honorary gifts are a beautiful way to give meaning to your generosity.",
              },
            ].map((faq) => (
              <StaggerItem key={faq.question}>
                <div className="rounded-2xl border border-[#E5E2DD] bg-white p-8 transition-all hover:border-[#D4A853]/30 hover:shadow-md">
                  <h3 className="text-lg font-bold text-[#1A1A1A]">
                    {faq.question}
                  </h3>
                  <p className="mt-3 leading-relaxed text-[#4B5563]">
                    {faq.answer}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Trust Signals ── */}
      <section className="border-t border-[#E5E2DD] bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {/* 501(c)(3) Badge */}
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1A3D5C]/5">
                  <svg
                    className="h-7 w-7 text-[#1A3D5C]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1A1A1A]">
                    501(c)(3) Nonprofit
                  </p>
                  <p className="text-xs text-[#6B7280]">
                    Tax-exempt status verified
                  </p>
                </div>
              </div>

              <div className="hidden h-12 w-px bg-[#E5E2DD] md:block" />

              {/* EIN */}
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1A3D5C]/5">
                  <svg
                    className="h-7 w-7 text-[#1A3D5C]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1A1A1A]">
                    EIN: 33-1400027
                  </p>
                  <p className="text-xs text-[#6B7280]">
                    Federal tax identification
                  </p>
                </div>
              </div>

              <div className="hidden h-12 w-px bg-[#E5E2DD] md:block" />

              {/* 100% Badge */}
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4A853]/10">
                  <span className="text-lg font-black text-[#D4A853]">
                    100%
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1A1A1A]">
                    Donations fund meals
                  </p>
                  <p className="text-xs text-[#6B7280]">
                    Zero overhead model
                  </p>
                </div>
              </div>

              <div className="hidden h-12 w-px bg-[#E5E2DD] md:block" />

              {/* Secure */}
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1A3D5C]/5">
                  <svg
                    className="h-7 w-7 text-[#1A3D5C]"
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
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1A1A1A]">
                    Secure payments
                  </p>
                  <p className="text-xs text-[#6B7280]">
                    256-bit SSL encryption
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative py-32 md:py-40">
        <Image
          src="/images/banners/hero-3.webp"
          alt="Students on campus"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0F1A24]/75" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <FadeIn>
            <h2 className="font-heading text-4xl leading-tight font-bold text-white md:text-6xl">
              One meal can change
              <br />
              a student&apos;s
              <br />
              <span className="italic text-[#D4A853]">entire trajectory.</span>
            </h2>
            <p className="mt-6 text-lg text-white/60">
              Join 5,000+ donors who are keeping students in school by keeping
              them fed.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/donate#top"
                className="inline-flex items-center gap-3 rounded-full bg-[#D4A853] px-10 py-4 text-base font-bold text-[#1A3D5C] transition-all hover:bg-[#C49A48] hover:shadow-xl hover:shadow-[#D4A853]/20"
              >
                Donate now
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-10 py-4 text-base font-medium text-white transition-all hover:border-white/40 hover:bg-white/5"
              >
                Questions? Contact us
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
