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
  title: "About Us",
  description:
    "Learn about the World Food Movement — our mission, vision, founders, and how we're fighting student hunger across Bay Area campuses.",
};

export default function AboutUsPage() {
  return (
    <main className="overflow-x-hidden">
      <PageHero
        label="About Us"
        title="No one should go hungry."
        subtitle="Inspired by global food-service movements that have nourished millions, WFM is bringing free, hot meals to college students across America — starting in the Bay Area."
        imageSrc="/images/banners/hero-2.webp"
      />

      {/* ── Mission & Vision ── */}
      <section className="bg-[#FAFAF8] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <FadeInLeft>
              <div className="aspect-[4/5] overflow-hidden rounded-3xl">
                <Image
                  src="/images/resources/FS20251112TCWorldFoodMovementDeAnzaGFX100S00093.jpg"
                  alt="World Food Movement volunteers serving meals"
                  width={800}
                  height={1000}
                  className="h-full w-full object-cover"
                />
              </div>
            </FadeInLeft>

            <FadeInRight>
              <div>
                <p className="text-sm font-semibold text-[#D4A853]">
                  Our purpose
                </p>
                <h2 className="font-heading mt-4 text-4xl leading-[1.1] font-bold text-[#1A1A1A] md:text-5xl">
                  Vision &amp; Mission
                </h2>

                <div className="mt-10 space-y-8">
                  <div className="rounded-2xl border border-[#E5E2DD] bg-white p-8">
                    <p className="text-xs font-semibold text-[#D4A853]">
                      Vision
                    </p>
                    <p className="font-heading mt-3 text-2xl font-bold text-[#1A1A1A] md:text-3xl">
                      No one should go hungry.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#E5E2DD] bg-white p-8">
                    <p className="text-xs font-semibold text-[#D4A853]">
                      Mission
                    </p>
                    <p className="font-heading mt-3 text-xl font-bold leading-snug text-[#1A1A1A] md:text-2xl">
                      To serve free, fresh and nutritious meals to everyone in
                      need and build a healthier and happier world.
                    </p>
                  </div>
                </div>

                <p className="mt-8 leading-relaxed text-[#4B5563]">
                  Food is not just a basic necessity but a fundamental human
                  right. Nutritious food is essential for people of all ages,
                  especially children and growing adults, to maintain good health
                  and an active life. We consider it our responsibility to help
                  communities have easy access to food and enable them to live
                  with dignity and hope.
                </p>
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* ── Our Inspiration ── */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold text-[#D4A853]">
                Our inspiration
              </p>
              <h2 className="font-heading mt-4 text-3xl font-bold text-[#1A1A1A] md:text-4xl">
                Proven at scale. Now here.
              </h2>
              <p className="mt-8 text-lg leading-relaxed text-[#4B5563]">
                Across Asia, Europe, and the UK, community-led food movements
                have demonstrated what becomes possible when purpose-driven
                people organize around a single goal: no one goes hungry.
                Millions of meals served. Millions of lives changed.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-[#4B5563]">
                In the United States, 47% of community college students
                experience food insecurity — not for lack of food, but for lack
                of access and resources. WFM was founded to close that gap. Our
                founders have spent decades proving that{" "}
                <strong className="text-[#1A3D5C]">
                  organized communities can end hunger at scale.
                </strong>{" "}
                Now they are bringing that experience to America&apos;s
                college campuses.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Our Story / Timeline ── */}
      <section className="bg-[#F5F0EB] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="text-sm font-semibold text-[#D4A853]">
              Our journey
            </p>
            <h2 className="font-heading mt-4 text-4xl font-bold text-[#1A1A1A] md:text-5xl">
              20,000 meals. On a mission to 1 million.
            </h2>
          </FadeIn>

          <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_360px]">
            <StaggerContainer className="space-y-6" staggerDelay={0.1}>
              {[
                {
                  year: "Jan 2025",
                  title: "First meal at De Anza College",
                  desc: "On January 22, 2025, WFM served its first meal at De Anza College in Cupertino, California. Thirty students showed up to the launch. By the end of the first week, hundreds were signing up.",
                },
                {
                  year: "Mar 2025",
                  title: "Expanded to 4 campuses",
                  desc: "Within two months of launch, WFM reached four Bay Area campuses — serving over 1,000 meals per month to students who previously skipped meals to make rent.",
                },
                {
                  year: "Nov 2025",
                  title: "10,000 meals milestone",
                  desc: "WFM celebrated its 10,000th meal alongside California Assembly Member Alex Lee, Santa Clara County Supervisor Otto Lee, and college presidents across the Bay Area.",
                },
                {
                  year: "2026",
                  title: "20,000 meals and growing",
                  desc: "Now serving 8 Bay Area campuses, WFM has delivered over 20,000 freshly cooked meals to more than 4,000 students. Expansion to additional California campuses is underway.",
                },
                {
                  year: "2030",
                  title: "The vision: 1 million meals",
                  desc: "Every dollar, every volunteer, and every campus partnership brings us closer to our goal of 1 million meals served across California and beyond. The movement is just getting started.",
                },
              ].map((item) => (
                <StaggerItem key={item.year}>
                  <div className="grid gap-4 rounded-2xl border border-[#E5E2DD] bg-white p-8 md:grid-cols-[140px_1fr] md:gap-8">
                    <div className="font-heading text-2xl font-bold text-[#1A3D5C]">
                      {item.year}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#1A1A1A]">
                        {item.title}
                      </h3>
                      <p className="mt-2 leading-relaxed text-[#4B5563]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Sticky photo column */}
            <FadeInRight className="hidden lg:block">
              <div className="sticky top-28 space-y-4">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src="/images/resources/FullSize20250122TCSattvicMealsChelseaChangReleaseKickoff028572.jpg"
                    alt="WFM launch day at De Anza College, January 22 2025"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A1118]/70 to-transparent p-5">
                    <p className="text-xs font-semibold text-[#D4A853]">January 22, 2025</p>
                    <p className="mt-0.5 text-sm font-medium text-white">First meal at De Anza College</p>
                  </div>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src="/images/resources/FS20251112TCWorldFoodMovementDeAnzaGFX100S00032.jpg"
                    alt="Students receiving meals at De Anza College"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
                </div>
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* ── What We Do in America ── */}
      <section className="relative bg-white py-24 md:py-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, #1A3D5C0a 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold text-[#D4A853]">
                In America
              </p>
              <h2 className="font-heading mt-4 text-3xl font-bold text-[#1A1A1A] md:text-4xl">
                Serving Bay Area campuses
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-[#4B5563]">
                We are currently serving at 8 campuses across the Bay Area,
                California — including De Anza College, Foothill College, West
                Valley College, Chabot College, and Las Positas College — with
                plans to expand to more campuses in 2026 and beyond.
              </p>
            </div>
          </FadeIn>

          {/* Photo mosaic */}
          <FadeIn delay={0.1}>
            <div className="mt-12 grid h-72 grid-cols-3 gap-3 overflow-hidden rounded-2xl md:h-96">
              <div className="relative col-span-1 overflow-hidden rounded-xl">
                <Image
                  src="/images/resources/IMG_2937.jpeg"
                  alt="Students receiving meals on campus"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="relative col-span-1 overflow-hidden rounded-xl">
                <Image
                  src="/images/resources/IMG_2881b.jpeg"
                  alt="Volunteers distributing food"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="relative col-span-1 overflow-hidden rounded-xl">
                <Image
                  src="/images/resources/IMG_2859.jpeg"
                  alt="Students enjoying meals together"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </FadeIn>

          <StaggerContainer
            className="mt-10 grid gap-8 md:grid-cols-2"
            staggerDelay={0.1}
          >
            <StaggerItem>
              <div className="rounded-2xl border border-[#E5E2DD] bg-[#FAFAF8] p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1A3D5C]/5 text-[#1A3D5C]">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0012 20.904a48.627 48.627 0 008.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                  </svg>
                </div>
                <h3 className="mt-5 text-xl font-bold text-[#1A1A1A]">
                  Community College Feeding
                </h3>
                <p className="mt-3 leading-relaxed text-[#4B5563]">
                  Students who have enrolled in community colleges due to their
                  economic conditions are unable to afford meals. Our feeding
                  program helps them focus on their studies and ambitions without
                  worrying about food — improving academic performance through
                  better concentration and cognitive development, and reducing
                  the risk of anxiety and depression.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="rounded-2xl border border-[#E5E2DD] bg-[#FAFAF8] p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1A3D5C]/5 text-[#1A3D5C]">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </div>
                <h3 className="mt-5 text-xl font-bold text-[#1A1A1A]">
                  Food Insecure Individuals
                </h3>
                <p className="mt-3 leading-relaxed text-[#4B5563]">
                  Socio-economic factors like a rise in the cost of living,
                  unaffordable housing and unemployment have left thousands of
                  people depending on shelters for food. We believe it is our
                  social responsibility to ensure that our fellow beings are able
                  to fill their stomach with fresh, hot meals every day.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ── Impact Numbers ── */}
      <section className="bg-[#1A3D5C] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="mb-12 text-center text-sm font-semibold text-[#D4A853]">
              Our impact — since January 2025
            </p>
          </FadeIn>
          <StaggerContainer
            className="grid grid-cols-2 gap-y-12 md:grid-cols-4"
            staggerDelay={0.1}
          >
            {[
              { number: "20,000+", label: "meals served in the US" },
              { number: "8", label: "Bay Area campuses" },
              { number: "4,000+", label: "students served" },
              { number: "1M", label: "meals — our 2030 goal" },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="text-center">
                  <div className="font-heading text-4xl font-bold text-[#D4A853] md:text-5xl">
                    {stat.number}
                  </div>
                  <div className="mt-2 text-sm text-white/50">{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Founders ── */}
      <section className="bg-[#FAFAF8] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="text-sm font-semibold text-[#D4A853]">
              Leadership
            </p>
            <h2 className="font-heading mt-4 text-4xl font-bold text-[#1A1A1A] md:text-5xl">
              Our Founders
            </h2>
          </FadeIn>

          <StaggerContainer
            className="mt-16 grid gap-8 lg:grid-cols-2"
            staggerDelay={0.15}
          >
            <StaggerItem>
              <div className="rounded-2xl border border-[#E5E2DD] bg-white p-8 md:p-10">
                <div className="flex items-start gap-5">
                  {/* Drop photo at public/images/founders/madhu-pandit-dasa.jpg */}
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-[#1A3D5C]">
                    <Image
                      src="/images/founders/madhu-pandit-dasa.jpg"
                      alt="Madhu Pandit Dasa"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1A1A1A]">
                      Madhu Pandit Dasa
                    </h3>
                    <p className="text-sm font-medium text-[#D4A853]">
                      Chairman, World Food Movement
                    </p>
                  </div>
                </div>
                <p className="mt-6 leading-relaxed text-[#4B5563]">
                  A distinguished alumnus of IIT-Bombay, he brings four decades
                  of experience leading large-scale humanitarian feeding programs
                  across Asia, Europe, and now America. Under his guidance, WFM
                  is building an operational model that puts freshly cooked,
                  nutritious meals in the hands of college students who need them
                  most — with zero overhead and maximum dignity.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["IIT-Bombay Distinguished Alumnus", "40+ years in food security"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#D4A853]/10 px-3 py-1 text-xs font-medium text-[#D4A853]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="rounded-2xl border border-[#E5E2DD] bg-white p-8 md:p-10">
                <div className="flex items-start gap-5">
                  {/* Drop photo at public/images/founders/chanchalapathi-dasa.jpg */}
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-[#1A3D5C]">
                    <Image
                      src="/images/founders/chanchalapathi-dasa.jpg"
                      alt="Chanchalapathi Dasa"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1A1A1A]">
                      Chanchalapathi Dasa
                    </h3>
                    <p className="text-sm font-medium text-[#D4A853]">
                      Vice Chairman, World Food Movement
                    </p>
                  </div>
                </div>
                <p className="mt-6 leading-relaxed text-[#4B5563]">
                  A graduate of the Indian Institute of Science, he has spent
                  his career directing the strategy, growth, and governance of
                  large-scale humanitarian food organizations. He leads WFM&apos;s
                  policy planning, campus operations, public affairs, and
                  community engagement across the Bay Area and beyond.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Indian Institute of Science", "Operations & Strategy"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#D4A853]/10 px-3 py-1 text-xs font-medium text-[#D4A853]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ── Board Members ── */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="text-sm font-semibold text-[#D4A853]">
              Governance
            </p>
            <h2 className="font-heading mt-4 text-3xl font-bold text-[#1A1A1A] md:text-4xl">
              National Board Members
            </h2>
          </FadeIn>

          <StaggerContainer
            className="mt-12 grid gap-6 md:grid-cols-2"
            staggerDelay={0.1}
          >
            <StaggerItem>
              <div className="rounded-2xl border border-[#E5E2DD] bg-[#FAFAF8] p-8">
                <h3 className="text-lg font-bold text-[#1A1A1A]">
                  Dr. Siva Sivaram
                </h3>
                <p className="mt-1 text-sm font-medium text-[#D4A853]">
                  Board Member &middot; President &amp; CEO, QuantumScape
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[#4B5563]">
                  A seasoned entrepreneur and philanthropist who has held
                  executive positions at major global corporations including
                  Western Digital. Brings strategic vision and leadership to
                  expand the program&apos;s reach across the U.S.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="rounded-2xl border border-[#E5E2DD] bg-[#FAFAF8] p-8">
                <h3 className="text-lg font-bold text-[#1A1A1A]">
                  Arjun Bhagat
                </h3>
                <p className="mt-1 text-sm font-medium text-[#D4A853]">
                  Board Member &middot; President &amp; CEO, Calibrated Group
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[#4B5563]">
                  A renowned entrepreneur and investor with extensive expertise
                  in finance, technology, and social impact. Focuses on growth
                  strategy, expanding partnerships and engaging corporate leaders
                  to support students in need.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ── Testimonials from Partners ── */}
      <section className="bg-[#F5F0EB] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="text-sm font-semibold text-[#D4A853]">
              What leaders say
            </p>
            <h2 className="font-heading mt-4 text-3xl font-bold text-[#1A1A1A] md:text-4xl">
              Trusted by educators &amp; elected officials
            </h2>
          </FadeIn>

          {/* Top 2 — large format */}
          <StaggerContainer className="mt-12 grid gap-6 md:grid-cols-2" staggerDelay={0.12}>
            {[
              {
                quote: "I cannot think of a more critical time in our nation's history where this support for our students is so pivotal towards ensuring they are able to accomplish their educational goals. We are very grateful for the partnership with World Food Movement.",
                name: "Dr. Omar Torres",
                role: "President, De Anza College",
                image: "/images/testimonials/omar-torres.jpg",
              },
              {
                quote: "Barely a year ago, we got started on this idea of addressing student hunger in the US. It is heartwarming to see how far we have come in just about a year. 10,000 meals. Go World Food Movement. Let's march on to the million meals.",
                name: "Dr. Siva Sivaram",
                role: "Board Member, WFM & CEO, QuantumScape",
                image: "/images/testimonials/siva-sivaram.jpg",
              },
            ].map((t) => (
              <StaggerItem key={t.name}>
                <div className="flex h-full flex-col rounded-2xl border border-[#E5E2DD] bg-white p-8 md:p-10">
                  <svg className="h-8 w-8 text-[#D4A853]/30" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="mt-4 flex-1 text-lg leading-relaxed text-[#4B5563]">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-8 flex items-center gap-4 border-t border-[#E5E2DD] pt-6">
                    <Image
                      src={t.image}
                      alt={t.name}
                      width={56}
                      height={56}
                      className="h-14 w-14 flex-shrink-0 rounded-full object-cover shadow-md"
                    />
                    <div>
                      <p className="font-bold text-[#1A1A1A]">{t.name}</p>
                      <p className="text-sm text-[#6B7280]">{t.role}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Bottom 3 — compact */}
          <StaggerContainer className="mt-6 grid gap-6 md:grid-cols-3" staggerDelay={0.1}>
            {[
              {
                quote: "I am very excited to celebrate the World Food Movement for having served over 10,000 meals to our community college students. This is absolutely crucial to make sure that no students are ever left hungry. Thank you for your hard work and keep doing it.",
                name: "Otto Lee",
                role: "Supervisor, Santa Clara County",
                image: "/images/testimonials/otto-lee.jpg",
              },
              {
                quote: "Congratulations to the World Food Movement for reaching 10,000 meals served to hungry students in our home area. You are playing a pivotal role in making sure that food insecurity is being fought. I wish you a lot of luck in getting to your next milestone of a million meals.",
                name: "Assembly Member Alex Lee",
                role: "California Assembly District 24",
                image: "/images/testimonials/alex-lee.jpg",
              },
              {
                quote: "I want to thank the World Food Movement for being here. Our community is showing up and our students are showing up. We are so excited to be a partner with you and want to help you reach 1 million meals by 2030.",
                name: "Dr. Dyrell Foster",
                role: "President, Las Positas College",
                image: "/images/testimonials/dyrell-foster.jpg",
              },
            ].map((t) => (
              <StaggerItem key={t.name}>
                <div className="flex h-full flex-col rounded-2xl border border-[#E5E2DD] bg-white p-6">
                  <svg className="h-6 w-6 text-[#D4A853]/30" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="mt-3 flex-1 leading-relaxed text-[#4B5563]">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-3 border-t border-[#E5E2DD] pt-5">
                    <Image
                      src={t.image}
                      alt={t.name}
                      width={44}
                      height={44}
                      className="h-11 w-11 flex-shrink-0 rounded-full object-cover shadow-sm"
                    />
                    <div>
                      <p className="text-sm font-bold text-[#1A1A1A]">{t.name}</p>
                      <p className="text-xs text-[#6B7280]">{t.role}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Trust & Transparency ── */}
      <section className="relative bg-white py-24 md:py-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, #1A3D5C0a 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="text-sm font-semibold text-[#D4A853]">
              Transparency
            </p>
            <h2 className="font-heading mt-4 text-3xl font-bold text-[#1A1A1A] md:text-4xl">
              Why donors trust us
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-[#6B7280]">
              We operate with complete transparency. Your donation goes exactly
              where we say it does — to meals on campuses, nothing else.
            </p>
          </FadeIn>

          <StaggerContainer
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.08}
          >
            {[
              {
                title: "501(c)(3) Registered Nonprofit",
                desc: "Officially registered with the IRS. All donations are fully tax-deductible. EIN: 33-1400027.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                ),
              },
              {
                title: "100% Meals-Funded Model",
                desc: "Operational costs — salaries, tech, marketing — are covered by a separate group of founding donors. Every public donation funds meals only.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
              },
              {
                title: "$8 Per Meal — Verified",
                desc: "Every meal costs exactly $8 to prepare and deliver. A freshly cooked, nutritious, plant-based meal — tracked and verified per serving.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                ),
              },
              {
                title: "8 Verified Partner Campuses",
                desc: "Active partnerships with De Anza, Foothill, West Valley, Chabot, Ohlone, Las Positas, Evergreen Valley, and Mission College.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0012 20.904a48.627 48.627 0 008.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                ),
              },
              {
                title: "Endorsed by Elected Officials",
                desc: "Recognized by California Assembly Member Alex Lee, Santa Clara County Supervisor Otto Lee, and college presidents across the Bay Area.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                ),
              },
              {
                title: "Secure Payments",
                desc: "Donations processed via Stripe with 256-bit SSL encryption. Your payment information is never stored on our servers.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                ),
              },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className="rounded-2xl border border-[#E5E2DD] bg-[#FAFAF8] p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4A853]/10">
                    <svg className="h-5 w-5 text-[#D4A853]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      {item.icon}
                    </svg>
                  </div>
                  <h3 className="mt-4 font-bold text-[#1A1A1A]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Founder's Message CTA ── */}
      <section className="relative py-32 md:py-40">
        <Image
          src="/images/banners/hero-3.webp"
          alt="World Food Movement community"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0F1A24]/75" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <FadeIn>
            <p className="text-sm font-semibold text-[#D4A853]">
              From our founders
            </p>
            <blockquote className="font-heading mt-6 text-2xl leading-snug font-bold text-white md:text-4xl">
              &ldquo;It is a matter of great joy that we now have the
              opportunity to serve the people of the United States. We request
              your support in our humble endeavor to make a positive impact on
              people&apos;s lives.&rdquo;
            </blockquote>
            <p className="mt-6 text-sm text-white/50">
              — Madhu Pandit Dasa &amp; Chanchalapathi Dasa
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/donate"
                className="inline-flex items-center gap-3 rounded-full bg-[#D4A853] px-10 py-4 text-base font-bold text-[#1A3D5C] transition-all hover:bg-[#C49A48] hover:shadow-xl hover:shadow-[#D4A853]/20"
              >
                Fund a meal
              </Link>
              <Link
                href="/get-involved"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-base font-medium text-white transition-all hover:border-white/40 hover:bg-white/5"
              >
                Get involved
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
