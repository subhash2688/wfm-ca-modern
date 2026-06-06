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
        subtitle="Inspired by a vision of compassion that has already served over 4 billion meals worldwide, the World Food Movement brings free, nutritious meals to college students across America."
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
                A movement born from compassion
              </h2>
              <p className="mt-8 text-lg leading-relaxed text-[#4B5563]">
                His Divine Grace A.C. Bhaktivedanta Swami Prabhupada, the
                Founder-Acharya of the International Society for Krishna
                Consciousness (ISKCON), came to America with the vision of
                giving every human being the opportunity for a life of
                happiness, good health and peace of mind.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-[#4B5563]">
                One day in Mayapur, a village near Kolkata, India, Srila
                Prabhupada looked out of his window and saw a group of children
                fighting with street dogs for food. From this simple yet
                heartbreaking incident came the determination that{" "}
                <strong className="text-[#1A3D5C]">
                  no one within the radius of any centre should go hungry.
                </strong>{" "}
                It is his inspiration that helped initiate feeding programs
                across the globe.
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
              From 1,000 meals to 4 billion.
            </h2>
          </FadeIn>

          <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_360px]">
            <StaggerContainer className="space-y-6" staggerDelay={0.1}>
              {[
                {
                  year: "2000",
                  title: "The Akshaya Patra Foundation",
                  desc: "Our school lunch feeding program was initiated in Bangalore, India, beginning by feeding just over a thousand children in government schools. This humble initiative would go on to become the world's largest not-for-profit-run school lunch program.",
                },
                {
                  year: "2007",
                  title: "Feeding programs extend to the United Kingdom",
                  desc: "The founders extended feeding initiatives beyond India, commencing operations in the UK. The first international kitchen was set up in North London, serving children, university students and people in homeless shelters.",
                },
                {
                  year: "2019",
                  title: "3 billionth meal served",
                  desc: "The Hon'ble Prime Minister of India personally served the 3 billionth meal in Vrindavan, calling Akshaya Patra 'a social start-up which has turned into a movement.'",
                },
                {
                  year: "2024",
                  title: "4 billion meals milestone",
                  desc: "Akshaya Patra commemorated the milestone of serving 4 billion meals at the United Nations Headquarters in New York — now feeding over 2.2 million children every day across 78 kitchens in 16 states of India.",
                },
                {
                  year: "2025",
                  title: "World Food Movement launches in America",
                  desc: "On January 22, 2025, WFM served its first meal at De Anza College in Cupertino, California. In its first year, the program reached 4 Bay Area campuses, served over 10,000 meals to 2,000+ students, and grew to 8 campuses by 2026.",
                },
              ].map((item) => (
                <StaggerItem key={item.year}>
                  <div className="grid gap-4 rounded-2xl border border-[#E5E2DD] bg-white p-8 md:grid-cols-[120px_1fr] md:gap-8">
                    <div className="font-heading text-3xl font-bold text-[#1A3D5C]">
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
        {/* Subtle dot-grid texture */}
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
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342"
                    />
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
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
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
          <StaggerContainer
            className="grid grid-cols-2 gap-y-12 md:grid-cols-4"
            staggerDelay={0.1}
          >
            {[
              { number: "4B+", label: "meals served globally" },
              { number: "2.2M", label: "children fed daily in India" },
              { number: "78", label: "kitchens across India" },
              { number: "16", label: "states in India" },
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
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-[#1A3D5C] font-heading text-xl font-bold text-white">
                    MP
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
                  Founder and Chairman of The Akshaya Patra Foundation and
                  Chairman of the Global Hare Krishna Movement. A distinguished
                  alumnus of IIT-Bombay, he has rendered more than four decades
                  of selfless service to society through humanitarian
                  initiatives, decisively championing the cause of universal food
                  security. Under his visionary leadership, Akshaya Patra has
                  become the world&apos;s largest NGO-run school lunch program.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "Padma Shri",
                    "Gandhi Peace Prize",
                    "Nikkei Asia Prize",
                    "IIT-Bombay Distinguished Alumnus",
                  ].map((award) => (
                    <span
                      key={award}
                      className="rounded-full bg-[#D4A853]/10 px-3 py-1 text-xs font-medium text-[#D4A853]"
                    >
                      {award}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="rounded-2xl border border-[#E5E2DD] bg-white p-8 md:p-10">
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-[#1A3D5C] font-heading text-xl font-bold text-white">
                    CD
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
                  Co-founder and Vice Chairman of The Akshaya Patra Foundation.
                  He came across the teachings of Srila Prabhupada while pursuing
                  studies at the Indian Institute of Science. He directs the
                  strategy, growth, and governance of the organizations, actively
                  involved in policy planning, operations, public affairs, and
                  emergency food relief activities.
                </p>
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
                  Board Member &middot; Chairman, Akshaya Patra USA
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[#4B5563]">
                  President and CEO of QuantumScape. A seasoned entrepreneur and
                  philanthropist who has held executive positions at major global
                  corporations including Western Digital. Brings strategic vision
                  and leadership to expand the program&apos;s reach in the U.S.
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

      {/* ── Awards & Recognition ── */}
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
              Recognition
            </p>
            <h2 className="font-heading mt-4 text-3xl font-bold text-[#1A1A1A] md:text-4xl">
              Awards &amp; accolades
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-[#6B7280]">
              Our feeding programs and initiatives have received numerous
              prestigious awards and recognition worldwide.
            </p>
          </FadeIn>

          <StaggerContainer
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.08}
          >
            {[
              {
                title: "Gandhi Peace Prize",
                desc: "Acknowledging contribution to providing school lunch to millions of children across India.",
              },
              {
                title: "Padma Shri Award",
                desc: "The fourth-highest civilian award of the Republic of India, awarded to Shri Madhu Pandit Dasa.",
              },
              {
                title: "Nikkei Asia Prize",
                desc: "For supporting education by nourishing children and playing a pivotal role in socio-economic development.",
              },
              {
                title: "BBC Global Food Champion",
                desc: "An annual award that honours people or causes that help societies and inspire lives.",
              },
              {
                title: "National Award for Child Welfare",
                desc: "Awarded by the President of India for outstanding work in child welfare.",
              },
              {
                title: "Case studies at Harvard, Stanford, MIT",
                desc: "Operational efficiency and systems studied and included in the syllabi of leading global institutions.",
              },
            ].map((award) => (
              <StaggerItem key={award.title}>
                <div className="rounded-2xl border border-[#E5E2DD] bg-[#FAFAF8] p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4A853]/10">
                    <svg
                      className="h-5 w-5 text-[#D4A853]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-4 font-bold text-[#1A1A1A]">
                    {award.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                    {award.desc}
                  </p>
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
                Support the mission
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
