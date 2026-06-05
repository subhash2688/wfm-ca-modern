import type { Metadata } from "next";
import Image from "next/image";
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
  title: "Programs",
  description:
    "Our meal delivery, volunteer, and campus partnership programs fighting student hunger.",
};

/* ---------- data ---------- */

const programHighlights = [
  { number: "52", label: "Partner Campuses" },
  { number: "18", label: "States Served" },
  { number: "1,200+", label: "Active Volunteers" },
  { number: "$5", label: "Cost Per Meal" },
];

const volunteerBenefits = [
  {
    title: "Flexible Commitment",
    description: "Just 2 hours per week — choose the schedule that works for your classes.",
  },
  {
    title: "Full Training",
    description: "We provide comprehensive onboarding so you feel confident from day one.",
  },
  {
    title: "Community",
    description: "Join 1,200+ fellow students who are making a tangible difference.",
  },
  {
    title: "Leadership Skills",
    description: "Build real-world skills in logistics, teamwork, and community organizing.",
  },
];

const partnershipSteps = [
  {
    step: "01",
    title: "Reach Out",
    description: "Your university contacts us to express interest in bringing WFM to campus.",
  },
  {
    step: "02",
    title: "We Plan Together",
    description: "We collaborate on logistics — meal drop points, schedules, and student registration.",
  },
  {
    step: "03",
    title: "Campus Access",
    description: "The university provides designated spaces for meal distribution. We handle the rest.",
  },
  {
    step: "04",
    title: "Launch & Grow",
    description: "Students register via our app, and meals start flowing. We scale as demand grows.",
  },
];

/* ---------- page ---------- */

export default function ProgramsPage() {
  return (
    <>
      {/* ───── Hero ───── */}
      <PageHero
        label="Programs"
        title="How we feed students."
        subtitle="Three interconnected programs work together to deliver free, nutritious meals to college students across America — with zero stigma and complete dignity."
        imageSrc="/images/banners/hero-1.webp"
      />

      {/* ───── Quick Stats ───── */}
      <section className="bg-[#F5F0EB] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <StaggerContainer
            className="grid grid-cols-2 gap-8 lg:grid-cols-4"
            staggerDelay={0.1}
          >
            {programHighlights.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="text-center">
                  <p className="font-heading text-4xl font-bold text-[#1A3D5C] md:text-5xl">
                    {stat.number}
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#4B5563] uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ───── Meal Delivery Program ───── */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <FadeInLeft>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/images/resources/food-distribution-1.jpg"
                  alt="Volunteers distributing meals to students on campus"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
              </div>
            </FadeInLeft>

            <FadeInRight>
              <div>
                <p className="text-sm font-semibold tracking-[0.2em] text-[#D4A853] uppercase">
                  Core Program
                </p>
                <h2 className="font-heading mt-4 text-3xl font-bold text-[#1A1A1A] md:text-4xl">
                  Meal Delivery Program
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-[#4B5563]">
                  Our flagship program delivers freshly prepared, nutritious
                  meals directly to college campuses. Students simply register
                  through our app, select their preferred pickup times and
                  locations, and receive meals — no paperwork, no income
                  verification, no stigma.
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    "Register in under 2 minutes via the WFM app",
                    "Choose your pickup time and campus location",
                    "Scan your QR code and collect your meal",
                    "Fully tracked with digital meal verification",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[#D4A853]" />
                      <span className="text-[#4B5563]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* ───── Volunteer Program ───── */}
      <section className="bg-[#FAFAF8] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <FadeInLeft className="order-2 lg:order-1">
              <div>
                <p className="text-sm font-semibold tracking-[0.2em] text-[#D4A853] uppercase">
                  Student-Powered
                </p>
                <h2 className="font-heading mt-4 text-3xl font-bold text-[#1A1A1A] md:text-4xl">
                  Volunteer Program
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-[#4B5563]">
                  Students helping students — that is the heart of our movement.
                  Our volunteers handle on-campus meal delivery, ensuring their
                  peers receive food with warmth and respect. With just a 2-hour
                  weekly commitment, you can make a direct impact.
                </p>

                <StaggerContainer
                  className="mt-10 grid gap-6 sm:grid-cols-2"
                  staggerDelay={0.1}
                >
                  {volunteerBenefits.map((b) => (
                    <StaggerItem key={b.title}>
                      <div className="rounded-xl border border-[#E5E2DD] bg-white p-5">
                        <h3 className="font-semibold text-[#1A1A1A]">
                          {b.title}
                        </h3>
                        <p className="mt-1 text-sm text-[#6B7280]">
                          {b.description}
                        </p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </FadeInLeft>

            <FadeInRight className="order-1 lg:order-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/images/resources/food-distribution-3.jpg"
                  alt="Student volunteer delivering meals"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* ───── Campus Partnership ───── */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="text-center">
              <p className="text-sm font-semibold tracking-[0.2em] text-[#D4A853] uppercase">
                For Universities
              </p>
              <h2 className="font-heading mt-4 text-3xl font-bold text-[#1A1A1A] md:text-5xl">
                Campus Partnership Program
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-[#6B7280]">
                We handle the logistics. You provide the access. Together, we
                ensure no student on your campus goes hungry. Currently active
                across 52 campuses in 18 states.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer
            className="mx-auto mt-16 grid max-w-4xl gap-8 sm:grid-cols-2 lg:grid-cols-4"
            staggerDelay={0.12}
          >
            {partnershipSteps.map((s) => (
              <StaggerItem key={s.step}>
                <div className="text-center">
                  <span className="font-heading text-5xl font-bold text-[#D4A853]">
                    {s.step}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-[#1A1A1A]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#6B7280]">
                    {s.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ───── Sattvic Kitchen Program ───── */}
      <section className="bg-[#F5F0EB] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <FadeInLeft>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/images/resources/food-serving.webp"
                  alt="Freshly prepared Sattvic meals in kitchen"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
              </div>
            </FadeInLeft>

            <FadeInRight>
              <div>
                <p className="text-sm font-semibold tracking-[0.2em] text-[#D4A853] uppercase">
                  Nourishment First
                </p>
                <h2 className="font-heading mt-4 text-3xl font-bold text-[#1A1A1A] md:text-4xl">
                  Sattvic Kitchen Program
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-[#4B5563]">
                  Our partner kitchens prepare fresh, nutritious vegetarian meals
                  daily using the Sattvic approach — wholesome, plant-based food
                  designed to nourish both body and mind. Every meal is crafted
                  with care and delivered the same day.
                </p>

                <div className="mt-10 flex items-baseline gap-2">
                  <span className="font-heading text-6xl font-bold text-[#1A3D5C]">
                    $5
                  </span>
                  <span className="text-lg text-[#6B7280]">
                    is all it costs to prepare one meal
                  </span>
                </div>
                <p className="mt-4 text-[#4B5563]">
                  That is a balanced, freshly cooked vegetarian meal — prepared,
                  packaged, and delivered to a student in need. Five dollars can
                  change a student&apos;s entire day.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {["Fresh Daily", "100% Vegetarian", "Balanced Nutrition", "Zero Waste"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#D4A853]/30 bg-[#D4A853]/10 px-4 py-1.5 text-sm font-medium text-[#1A3D5C]"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* ───── How It Works Visual ───── */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="text-center">
              <p className="text-sm font-semibold tracking-[0.2em] text-[#D4A853] uppercase">
                Simple &amp; Seamless
              </p>
              <h2 className="font-heading mt-4 text-3xl font-bold text-[#1A1A1A] md:text-5xl">
                How it works for students
              </h2>
            </div>
          </FadeIn>

          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <FadeInLeft>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image
                    src="/images/resources/food-distribution-5.jpg"
                    alt="Student receiving meal on campus"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image
                    src="/images/resources/food-distribution-3.jpg"
                    alt="Students enjoying meals on campus"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </FadeInLeft>

            <FadeInRight>
              <div className="space-y-8">
                {[
                  {
                    num: "1",
                    title: "Sign up in seconds",
                    desc: "Create your account with just your university email. No income proof, no lengthy forms.",
                  },
                  {
                    num: "2",
                    title: "Choose your meals",
                    desc: "Browse available times and pickup locations on your campus. Reserve your meals ahead of time.",
                  },
                  {
                    num: "3",
                    title: "Scan & collect",
                    desc: "Show your QR code at the distribution point and pick up your freshly prepared meal. That is it.",
                  },
                ].map((step) => (
                  <div key={step.num} className="flex gap-5">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#1A3D5C] text-lg font-bold text-white">
                      {step.num}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#1A1A1A]">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-[#6B7280]">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* ───── CTA ───── */}
      <section className="bg-[#1A3D5C] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <FadeIn>
            <p className="text-sm font-semibold tracking-[0.2em] text-[#D4A853] uppercase">
              Partner With Us
            </p>
            <h2 className="font-heading mx-auto mt-4 max-w-3xl text-3xl font-bold text-white md:text-5xl">
              Want to bring WFM to your campus?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
              We are actively expanding to new universities. If your campus
              could benefit from free student meals, we would love to talk.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center rounded-full bg-[#D4A853] px-8 text-sm font-semibold text-[#1A1A1A] shadow-lg transition-transform hover:scale-105 hover:bg-[#c49a48]"
              >
                Contact Us
              </Link>
              <Link
                href="/get-involved"
                className="inline-flex h-12 items-center rounded-full border border-white/20 px-8 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Get Involved
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
