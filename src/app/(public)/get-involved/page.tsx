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
  title: "Get Involved",
  description:
    "Donate, volunteer, or partner with the World Food Movement to end student hunger.",
};

/* ---------- data ---------- */

const waysToHelp = [
  {
    title: "Donate",
    description:
      "100% of your donation funds meals. $5 feeds a student for a day. Give monthly or make a one-time contribution — every dollar goes directly to nourishing students.",
    cta: "Donate Now",
    href: "/donate",
    highlight: "$5 = 1 meal",
    icon: (
      <svg className="h-8 w-8 text-[#D4A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
  {
    title: "Volunteer",
    description:
      "Deliver meals on your campus. Just 2 hours per week can make a tangible difference for students facing food insecurity. Full training provided.",
    cta: "Sign Up to Volunteer",
    href: "/volunteer",
    highlight: "2 hrs/week",
    icon: (
      <svg className="h-8 w-8 text-[#D4A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
  },
  {
    title: "Start a Fundraiser",
    description:
      "Rally your community around a cause that matters. Launch a campus fundraiser, birthday campaign, or corporate drive — we provide the tools and support.",
    cta: "Learn More",
    href: "/contact",
    highlight: "Community-powered",
    icon: (
      <svg className="h-8 w-8 text-[#D4A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
  },
  {
    title: "Campus Partnership",
    description:
      "Bring the World Food Movement to your university. We handle all logistics — meal preparation, volunteer coordination, and technology. You provide campus access.",
    cta: "Partner With Us",
    href: "/contact",
    highlight: "52 campuses & growing",
    icon: (
      <svg className="h-8 w-8 text-[#D4A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
  },
];

const faqs = [
  {
    question: "Do I need experience to volunteer?",
    answer:
      "Not at all. We provide full training during your first session. All you need is a willingness to help and 2 hours per week. Most volunteers are college students themselves.",
  },
  {
    question: "Where does my donation go?",
    answer:
      "100% of every public donation funds meals. Our operational costs — staff, technology, logistics — are fully covered by our founding donors. When you give $5, that entire $5 feeds a student.",
  },
  {
    question: "Can I volunteer if my campus is not a WFM partner yet?",
    answer:
      "Absolutely. You can help us bring WFM to your campus by reaching out to your student government or administration. We will work with you to establish a partnership.",
  },
  {
    question: "How do I start a fundraiser?",
    answer:
      "Contact us through our website and our community team will set you up with a personalized fundraising page, marketing materials, and ongoing support to help you reach your goal.",
  },
];

/* ---------- page ---------- */

export default function GetInvolvedPage() {
  return (
    <>
      {/* ───── Hero ───── */}
      <PageHero
        label="Get Involved"
        title="Every action feeds a student."
        subtitle="There are many ways to join the fight against student hunger. Whether you give, serve, or spread the word — your contribution creates real change in a student's life."
        imageSrc="/images/banners/hero-3.webp"
      />

      {/* ───── Ways to Help ───── */}
      <section className="bg-[#FAFAF8] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="text-center">
              <p className="text-sm font-semibold tracking-[0.2em] text-[#D4A853] uppercase">
                Make an Impact
              </p>
              <h2 className="font-heading mt-4 text-3xl font-bold text-[#1A1A1A] md:text-5xl">
                Ways to help
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-[#6B7280]">
                Choose the path that fits your life. Every form of support — big
                or small — helps a student focus on their future.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer
            className="mt-16 grid gap-8 sm:grid-cols-2"
            staggerDelay={0.12}
          >
            {waysToHelp.map((way) => (
              <StaggerItem key={way.title}>
                <div className="group relative overflow-hidden rounded-2xl border border-[#E5E2DD] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:p-10">
                  {/* Subtle gradient hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1A3D5C]/[0.02] to-[#D4A853]/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#1A3D5C]/5 transition-colors group-hover:bg-[#1A3D5C]/10">
                        {way.icon}
                      </div>
                      <span className="rounded-full bg-[#D4A853]/10 px-4 py-1.5 text-sm font-semibold text-[#1A3D5C]">
                        {way.highlight}
                      </span>
                    </div>

                    <h3 className="font-heading mt-6 text-2xl font-bold text-[#1A1A1A]">
                      {way.title}
                    </h3>
                    <p className="mt-3 text-[#4B5563] leading-relaxed">
                      {way.description}
                    </p>

                    <Link
                      href={way.href}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#1A3D5C] transition-colors hover:text-[#D4A853]"
                    >
                      {way.cta}
                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ───── Volunteer Spotlight ───── */}
      <section className="relative overflow-hidden bg-[#1A3D5C] py-24 md:py-32">
        <Image
          src="/images/resources/testimonial-bg-2.webp"
          alt=""
          fill
          className="object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A3D5C] via-[#1A3D5C]/95 to-[#1A3D5C]/80" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <FadeInLeft>
              <div>
                <p className="text-sm font-semibold tracking-[0.2em] text-[#D4A853] uppercase">
                  Volunteer Spotlight
                </p>
                <h2 className="font-heading mt-4 text-3xl font-bold text-white md:text-4xl">
                  &ldquo;Volunteering with WFM changed how I see community.&rdquo;
                </h2>
                <blockquote className="mt-6 text-lg leading-relaxed text-white/70">
                  &ldquo;I joined WFM during my sophomore year, thinking I would
                  just help hand out meals. But it became so much more than that.
                  Seeing the relief on a fellow student&apos;s face when they pick
                  up their lunch — knowing that one less thing is weighing on
                  them — it changed me. I went from volunteering 2 hours a week
                  to leading our campus chapter. This movement is real, and it is
                  personal.&rdquo;
                </blockquote>
                <div className="mt-8 flex items-center gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full">
                    <Image
                      src="/images/testimonials/testimonial3.jpg"
                      alt="Priya M., campus volunteer lead"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Priya M.</p>
                    <p className="text-sm text-white/50">
                      Campus Volunteer Lead — UC Davis
                    </p>
                  </div>
                </div>
              </div>
            </FadeInLeft>

            <FadeInRight>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src="/images/resources/food-distribution-4.jpg"
                  alt="Volunteers working together on campus"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* ───── Impact strip ───── */}
      <section className="bg-[#F5F0EB] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <StaggerContainer
            className="grid grid-cols-2 gap-8 lg:grid-cols-4"
            staggerDelay={0.1}
          >
            {[
              { number: "$5", label: "Feeds a Student for a Day" },
              { number: "$35", label: "Feeds a Student for a Week" },
              { number: "$150", label: "Feeds a Student for a Month" },
              { number: "$1,500", label: "Feeds a Student for a Year" },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="text-center">
                  <p className="font-heading text-4xl font-bold text-[#1A3D5C] md:text-5xl">
                    {stat.number}
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#4B5563]">
                    {stat.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ───── FAQ ───── */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <FadeInLeft>
                <p className="text-sm font-semibold tracking-[0.2em] text-[#D4A853] uppercase">
                  FAQ
                </p>
                <h2 className="font-heading mt-4 text-3xl font-bold text-[#1A1A1A] md:text-4xl">
                  Common questions
                </h2>
                <p className="mt-4 text-[#6B7280]">
                  Have a question that is not listed here? Reach out to our team
                  and we will get back to you within 24 hours.
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#1A3D5C] hover:text-[#D4A853]"
                >
                  Contact Us
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </FadeInLeft>
            </div>

            <div className="lg:col-span-3">
              <StaggerContainer className="space-y-6" staggerDelay={0.1}>
                {faqs.map((faq) => (
                  <StaggerItem key={faq.question}>
                    <div className="rounded-2xl border border-[#E5E2DD] bg-[#FAFAF8] p-6 md:p-8">
                      <h3 className="text-lg font-semibold text-[#1A1A1A]">
                        {faq.question}
                      </h3>
                      <p className="mt-3 text-[#4B5563] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Final CTA ───── */}
      <section className="bg-[#1A3D5C] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-white md:text-5xl lg:text-6xl">
              Ready to make a difference?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              Every meal starts with someone who cares. Whether it is $5, 2
              hours, or a partnership — your action today feeds a student
              tomorrow.
            </p>
            <div className="mt-10">
              <Link
                href="/donate"
                className="inline-flex h-14 items-center rounded-full bg-[#D4A853] px-10 text-base font-semibold text-[#1A1A1A] shadow-lg transition-all hover:scale-105 hover:bg-[#c49a48] hover:shadow-xl"
              >
                Give a Meal Today
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/40">
              100% of your donation goes directly to student meals.
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
