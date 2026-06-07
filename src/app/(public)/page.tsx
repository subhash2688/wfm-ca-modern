import Image from "next/image";
import Link from "next/link";
import { YouTubeFeed } from "@/components/YouTubeFeed";

const partners = [
  { name: "De Anza College", city: "Cupertino, CA", logo: "/images/campuses/de-anza.svg" },
  { name: "Foothill College", city: "Los Altos Hills, CA", logo: "/images/campuses/foothill.svg" },
  { name: "West Valley College", city: "Saratoga, CA", logo: "/images/campuses/west-valley.svg" },
  { name: "Chabot College", city: "Hayward, CA", logo: "/images/campuses/chabot.png" },
  { name: "Ohlone College", city: "Fremont, CA", logo: "/images/campuses/ohlone.jpg" },
  { name: "Las Positas College", city: "Livermore, CA", logo: "/images/campuses/las-positas.png" },
  { name: "Evergreen Valley College", city: "San Jose, CA", logo: "/images/campuses/evergreen.png" },
  { name: "Mission College", city: "Santa Clara, CA", logo: "/images/campuses/mission.png" },
];

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">

      {/* ── 1. Hero ── */}
      <section className="relative flex min-h-screen items-end pb-28 md:pb-40">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/resources/IMG_2955.jpeg"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
          <source src="/videos/hero-bg.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1118] via-[#0F1A24]/65 to-[#1A3D5C]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1118]/80 via-[#0A1118]/30 to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pt-32">
          <div className="max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[#D4A853]/40 bg-[#D4A853]/10 px-5 py-2 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4A853]" />
              <span className="text-xs font-semibold text-[#D4A853]">
                100% of donations fund meals
              </span>
            </div>
            <h1 className="font-heading text-6xl leading-[0.95] font-black tracking-tight text-white md:text-7xl lg:text-[88px]">
              No student
              <br />
              should choose
              <br />
              between{" "}
              <em className="not-italic text-[#D4A853]">food</em>
              <br />
              and education.
            </h1>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-white/65 md:text-xl">
              47% of California community college students face food insecurity.
              <sup className="text-[#D4A853]">*</sup> Your{" "}
              <span className="font-bold text-white">$8</span> funds a freshly
              cooked, plant-based meal for a student in need.
            </p>
            <p className="mt-3 text-xs text-white/30">
              * California Competes, 2023. californiacompetes.org
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/donate"
                className="group inline-flex items-center gap-3 rounded-full bg-[#D4A853] px-10 py-4 text-base font-bold text-[#1A3D5C] transition-all hover:bg-[#E4BC6A] hover:shadow-2xl hover:shadow-[#D4A853]/30 hover:-translate-y-0.5"
              >
                Fund a meal
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/stories"
                className="inline-flex items-center gap-3 text-[15px] font-semibold text-white/75 transition-colors hover:text-white"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-sm">
                  <svg className="ml-0.5 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                Watch a student&apos;s story
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-35 pointer-events-none">
          <span className="text-[10px] font-semibold text-white">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* ── 2. Stats ── */}
      <section className="bg-[#0A1118]">
        {/* Gold accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#D4A853]/50 to-transparent" />

        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          {/* Stat grid */}
          <div className="grid grid-cols-2 gap-px md:grid-cols-4">
            {[
              {
                number: "20,000+",
                label: "Meals served",
                sub: "since January 2025",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5A2.25 2.25 0 0 0 12.75 4.5h-1.5A2.25 2.25 0 0 0 9 6.75v1.5M3 13.121V18a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18v-4.879a2.25 2.25 0 0 0-.456-1.367l-3.905-5.173a2.25 2.25 0 0 0-1.797-.898H8.158a2.25 2.25 0 0 0-1.797.898L2.456 11.754A2.25 2.25 0 0 0 3 13.12Z" />
                ),
              },
              {
                number: "8",
                label: "Partner campuses",
                sub: "across the Bay Area",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                ),
              },
              {
                number: "4,000+",
                label: "Students fed",
                sub: "no paperwork, no stigma",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                ),
              },
              {
                number: "$8",
                label: "Cost per meal",
                sub: "100% donor-funded",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                ),
              },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center px-6 py-10 text-center md:px-10 ${i < 3 ? "border-r border-white/[0.06]" : ""}`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4A853]/10">
                  <svg className="h-5 w-5 text-[#D4A853]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    {stat.icon}
                  </svg>
                </div>
                <div className="font-heading mt-4 text-5xl font-black text-[#D4A853] md:text-6xl">{stat.number}</div>
                <div className="mt-1.5 text-sm font-bold text-white/80">{stat.label}</div>
                <div className="mt-0.5 text-xs text-white/35">{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Progress toward 1M */}
          <div className="mt-10 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-8 py-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold text-white/70">On our way to <span className="text-[#D4A853]">1,000,000 meals</span> by 2030</p>
                <p className="mt-0.5 text-xs text-white/30">20,000 served · 980,000 to go · every $8 moves us forward</p>
              </div>
              <Link
                href="/donate"
                className="flex-shrink-0 rounded-full bg-[#D4A853] px-6 py-2.5 text-sm font-bold text-[#1A3D5C] transition-all hover:bg-[#C49A48]"
              >
                Fund a meal
              </Link>
            </div>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[2%] rounded-full bg-gradient-to-r from-[#D4A853] to-[#E4BC6A]" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Quote + Where We Serve ── */}
      <section className="relative bg-[#1A3D5C] overflow-hidden pb-0 pt-16 md:pt-24">
        {/* Subtle diagonal texture */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)", backgroundSize: "12px 12px" }}
        />

        {/* Quote */}
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <svg className="mx-auto h-10 w-10 text-[#D4A853]/30" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote className="font-heading mt-5 text-lg font-bold leading-snug text-white md:text-xl lg:text-2xl">
            I cannot think of a more critical time in our nation&apos;s history
            where this support for our students is so pivotal towards ensuring
            they are able to{" "}
            <em className="not-italic text-[#D4A853]">accomplish their educational goals.</em>
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Image
              src="/images/testimonials/omar-torres.jpg"
              alt="Dr. Omar Torres"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover border-2 border-[#D4A853]/50"
            />
            <div className="text-left">
              <p className="font-bold text-white">Dr. Omar Torres</p>
              <p className="text-sm text-white/50">President, De Anza College</p>
            </div>
          </div>
          {/* Gold bridge divider */}
          <div className="mx-auto mt-12 max-w-xs border-t border-[#D4A853]/20" />
        </div>

        {/* Where We Serve */}
        <div className="relative mx-auto mt-10 max-w-7xl px-6">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold text-[#D4A853]">Where we serve</p>
              <h2 className="font-heading mt-3 text-4xl font-black text-white md:text-5xl">
                8 campuses.{" "}
                <em className="not-italic text-[#D4A853]">Bay Area, CA.</em>
              </h2>
            </div>
            <Link
              href="/programs"
              className="inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-white/20 px-6 py-2.5 text-sm font-bold text-white/70 transition-all hover:border-[#D4A853]/50 hover:text-[#D4A853]"
            >
              View all programs
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Campus logo marquee */}
        <div
          className="relative mt-8 w-full overflow-hidden"
          style={{ WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)", maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)" }}
        >
          <div className="flex animate-marquee gap-5 py-4" style={{ width: "max-content" }}>
            {[...partners, ...partners].map((p, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex flex-col items-center justify-center gap-5 rounded-2xl bg-white px-10 py-10 shadow-2xl shadow-black/20"
                style={{ width: 340, height: 240 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.logo}
                  alt={`${p.name} logo`}
                  className="max-h-[100px] w-auto max-w-[240px] object-contain"
                  loading="lazy"
                />
                <div className="text-center">
                  <p className="font-heading text-sm font-bold leading-tight text-[#1A3D5C]">{p.name}</p>
                  <p className="mt-0.5 text-[11px] font-medium text-[#6B7280]">{p.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. How it Works ── */}
      <section className="bg-[#FAFAF8] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold text-[#D4A853]">How it works</p>
            <h2 className="font-heading mt-4 text-5xl font-black text-[#1A1A1A] md:text-6xl">
              From kitchen to campus
            </h2>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {[
              {
                step: "01",
                title: "Students sign up",
                desc: "Any student at a partner campus registers in under 2 minutes. No paperwork, no stigma, no questions asked.",
                image: "/images/resources/IMG_2960.jpeg",
              },
              {
                step: "02",
                title: "Kitchens prepare",
                desc: "Partner kitchens cook fresh, plant-based meals every morning. Each meal costs $8 — funded entirely by donors like you.",
                image: "/images/resources/IMG_2810.jpeg",
              },
              {
                step: "03",
                title: "Volunteers deliver",
                desc: "Student volunteers deliver meals on campus. Scan a QR code, grab your meal, and get back to learning.",
                image: "/images/resources/IMG_3031.jpeg",
              },
            ].map((item, i) => (
              <div key={item.step} className="group relative overflow-hidden rounded-3xl border border-[#E5E2DD] bg-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={item.image} alt={item.title} width={600} height={375} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1118]/75 via-[#0A1118]/20 to-transparent" />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#D4A853] text-base font-black text-[#1A3D5C] shadow-md shadow-[#D4A853]/30">{i + 1}</span>
                    <h3 className="font-heading text-xl font-bold text-[#1A1A1A]">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. YouTube Feed ── */}
      <YouTubeFeed />

      {/* ── 7. Every Action Matters ── */}
      <section className="bg-[#F5F0EB] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold text-[#D4A853]">Every action matters</p>
            <h2 className="font-heading mt-4 text-5xl font-black text-[#1A1A1A] md:text-6xl">
              How will you help?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[#4B5563]">
              From a single meal to a campus partnership — every contribution makes a real difference in a student&apos;s life.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: (
                  <svg className="h-8 w-8 text-[#D4A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                ),
                title: "Give Monthly",
                desc: "$8/month funds a freshly prepared meal every day a student is on campus. Recurring support keeps students fed all semester, year-round.",
                cta: "Start Giving",
                href: "/donate",
                highlight: "$8 per meal",
                num: "01",
              },
              {
                icon: (
                  <svg className="h-8 w-8 text-[#D4A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                  </svg>
                ),
                title: "Volunteer",
                desc: "Deliver meals on your campus. Just 2 hours a week creates a tangible impact for students facing food insecurity. Full training provided.",
                cta: "Sign Up",
                href: "/get-involved",
                highlight: "2 hrs/week",
                num: "02",
              },
              {
                icon: (
                  <svg className="h-8 w-8 text-[#D4A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                  </svg>
                ),
                title: "Start a Fundraiser",
                desc: "Rally your community around a cause. Launch a campus, birthday, or corporate drive — we provide the tools, support, and infrastructure.",
                cta: "Learn More",
                href: "/contact",
                highlight: "Community-powered",
                num: "03",
              },
              {
                icon: (
                  <svg className="h-8 w-8 text-[#D4A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                  </svg>
                ),
                title: "Campus Partnership",
                desc: "Bring WFM to your university. We handle all logistics — meal prep, volunteers, and tech. You provide campus access and students.",
                cta: "Partner With Us",
                href: "/contact",
                highlight: "8 campuses & growing",
                num: "04",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#DDD7CF] bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D4A853]/50 hover:shadow-2xl"
              >
                {/* Icon */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1A3D5C]/[0.06] ring-1 ring-[#D4A853]/20 transition-all duration-300 group-hover:bg-[#1A3D5C]/10 group-hover:ring-[#D4A853]/40">
                  {item.icon}
                </div>

                {/* Highlight pill */}
                <span className="mt-5 inline-block self-start rounded-full bg-[#D4A853]/10 px-3 py-1 text-xs font-bold text-[#1A3D5C]">
                  {item.highlight}
                </span>

                <h3 className="font-heading mt-4 text-xl font-bold text-[#1A1A1A]">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#4B5563]">{item.desc}</p>

                <Link
                  href={item.href}
                  className="group/cta mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#1A3D5C] transition-colors hover:text-[#D4A853]"
                >
                  {item.cta}
                  <svg
                    className="h-4 w-4 transition-transform group-hover/cta:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Voices + CTA ── */}
      <section className="bg-[#FAFAF8] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold text-[#D4A853]">Voices</p>
            <h2 className="font-heading mt-4 text-5xl font-black text-[#1A1A1A] md:text-6xl">From our community</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                quote: "I come to school on an empty stomach. I am grateful for this meal. It's definitely a highlight between classes for me.",
                name: "Community College Student",
                role: "Bay Area, California",
                initial: "S",
              },
              {
                quote: "This meal was a God sent in my day. I don't have to worry about being hungry. Saving money, reducing stress, giving me more time to focus on my studies.",
                name: "De Anza College Student",
                role: "Cupertino, California",
                initial: "D",
              },
              {
                quote: "92% of students rated WFM food 4 or 5 stars. 93% found the process smooth and easy. 177 students surveyed, 2025.",
                name: "Student Survey Results",
                role: "De Anza College, 2025",
                initial: "★",
              },
            ].map((t) => (
              <div key={t.name} className="flex flex-col rounded-3xl border border-[#E5E2DD] bg-white p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="flex gap-0.5 text-[#D4A853]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-5 flex-1 text-lg leading-relaxed text-[#374151]">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-7 flex items-center gap-4 border-t border-[#E5E2DD] pt-6">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#1A3D5C] font-heading text-base font-bold text-[#D4A853]">{t.initial}</div>
                  <div>
                    <p className="font-bold text-[#1A1A1A]">{t.name}</p>
                    <p className="text-sm text-[#6B7280]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="mt-20 overflow-hidden rounded-[2rem] bg-[#0A1118] shadow-2xl">
            <div className="grid lg:grid-cols-2">
              <div className="flex flex-col justify-center p-10 md:p-16">
                <h2 className="font-heading text-5xl font-black leading-tight text-white md:text-6xl">
                  Every meal you fund
                  <br />
                  keeps a student
                  <br />
                  <em className="not-italic text-[#D4A853]">in school.</em>
                </h2>
                <p className="mt-5 max-w-md text-lg text-white/50">
                  100% of your donation goes directly to meals. Every dollar you give goes directly to feeding a student in need.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/donate"
                    className="inline-flex items-center gap-3 rounded-full bg-[#D4A853] px-10 py-4 text-base font-bold text-[#1A3D5C] transition-all hover:bg-[#E4BC6A] hover:shadow-xl hover:shadow-[#D4A853]/20 hover:-translate-y-0.5"
                  >
                    Fund a meal
                  </Link>
                  <Link
                    href="/get-involved"
                    className="inline-flex items-center gap-3 rounded-full border border-white/20 px-10 py-4 text-base font-bold text-white/70 transition-all hover:border-white/40 hover:text-white"
                  >
                    Volunteer
                  </Link>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <Image
                  src="/images/resources/FullSize20250122TCSattvicMealsatDeAnzaKickoff028508.jpg"
                  alt="Volunteers distributing freshly cooked meals to students"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A1118] via-[#0A1118]/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
