import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      {/* ── Hero — Cinematic full-bleed ── */}
      <section className="relative flex min-h-screen items-end pb-24 md:items-center md:pb-0">
        <Image
          src="/images/banners/hero-1.webp"
          alt="WFMCA volunteers distributing meals to college students"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A24] via-[#1A3D5C]/60 to-[#1A3D5C]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1A24]/70 to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pt-32 md:pt-20">
          <div className="max-w-3xl">
            <div className="mb-6 inline-block rounded-full border border-[#D4A853]/30 bg-[#D4A853]/10 px-4 py-1.5">
              <span className="text-xs font-semibold tracking-[0.15em] text-[#D4A853] uppercase">
                100% of donations fund meals
              </span>
            </div>
            <h1 className="font-heading text-5xl leading-[1.05] font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
              No student
              <br />
              should choose
              <br />
              between{" "}
              <span className="italic text-[#D4A853]">food</span>
              <br />
              and education.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl">
              36% of college students in America skip meals because they
              can&apos;t afford food. Your $5 feeds a student for a full day.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/donate"
                className="group inline-flex items-center gap-3 rounded-full bg-[#D4A853] px-10 py-4 text-base font-bold text-[#1A3D5C] transition-all hover:bg-[#C49A48] hover:shadow-xl hover:shadow-[#D4A853]/20"
              >
                Fund 47 meals today
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                href="/stories"
                className="inline-flex items-center gap-2 text-[15px] font-medium text-white/70 transition-colors hover:text-white"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20">
                  <svg
                    className="ml-0.5 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                Watch a student&apos;s story
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-t from-[#FAFAF8] to-transparent" />
      </section>

      {/* ── Impact Strip — Floating cards ── */}
      <section className="relative z-10 -mt-16 pb-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {[
              { number: "2.3M+", label: "Meals served", icon: "🍱" },
              { number: "52", label: "Partner campuses", icon: "🎓" },
              { number: "1,200+", label: "Active volunteers", icon: "🤝" },
              { number: "18", label: "States reached", icon: "📍" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl border border-[#E5E2DD] bg-white px-3 py-6 text-center shadow-xl shadow-black/[0.06] transition-shadow hover:shadow-2xl hover:shadow-black/10 md:px-5 md:py-7"
              >
                {/* Gold accent bar */}
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4A853] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="text-2xl font-bold text-[#1A3D5C] sm:text-3xl md:text-5xl font-heading">
                  {stat.number}
                </div>
                <div className="mt-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-[#9CA3AF] md:tracking-[0.15em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Crisis — Editorial split layout ── */}
      <section className="bg-[#FAFAF8] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="relative pb-10 pr-6 md:pb-8 md:pr-10">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl">
                <Image
                  src="/images/resources/food-distribution-1.jpg"
                  alt="College students receiving meals"
                  width={800}
                  height={1000}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute right-0 bottom-0 rounded-2xl bg-[#1A3D5C] p-6 text-white shadow-2xl">
                <div className="font-heading text-4xl font-bold">3.3M</div>
                <div className="mt-1 text-sm text-white/60">
                  students face
                  <br />
                  hunger daily
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-[#D4A853] uppercase">
                The crisis
              </p>
              <h2 className="font-heading mt-4 text-4xl leading-[1.1] font-bold text-[#1A1A1A] md:text-5xl">
                Hunger shouldn&apos;t be
                <br />
                the price of a degree.
              </h2>
              <div className="mt-8 space-y-6">
                <p className="text-lg leading-relaxed text-[#4B5563]">
                  They sit in lecture halls with empty stomachs. They choose
                  between textbooks and meals. They drop out — not because they
                  can&apos;t handle the work, but because they can&apos;t afford
                  to eat.
                </p>
                <p className="text-lg leading-relaxed text-[#4B5563]">
                  This is happening right now, at universities across all 50
                  states. The World Food Movement exists to change that — one
                  meal, one student, one campus at a time.
                </p>
              </div>
              <div className="mt-10 flex items-center gap-8">
                <div>
                  <div className="text-3xl font-bold text-[#1A3D5C]">36%</div>
                  <div className="mt-1 text-sm text-[#6B7280]">
                    of students skip meals
                  </div>
                </div>
                <div className="h-12 w-px bg-[#E5E2DD]" />
                <div>
                  <div className="text-3xl font-bold text-[#1A3D5C]">$5</div>
                  <div className="mt-1 text-sm text-[#6B7280]">
                    feeds a student for a day
                  </div>
                </div>
                <div className="hidden h-12 w-px bg-[#E5E2DD] md:block" />
                <div className="hidden md:block">
                  <div className="text-3xl font-bold text-[#1A3D5C]">0%</div>
                  <div className="mt-1 text-sm text-[#6B7280]">
                    spent on overhead
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it Works ── */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-[0.2em] text-[#D4A853] uppercase">
              How it works
            </p>
            <h2 className="font-heading mt-4 text-4xl font-bold text-[#1A1A1A] md:text-5xl">
              From kitchen to campus
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[#6B7280]">
              A simple, dignified process that gets nutritious meals to students
              who need them — every single day.
            </p>
          </div>

          <div className="mt-20 grid gap-8 lg:grid-cols-3">
            {[
              {
                step: "01",
                title: "Students sign up",
                desc: "Any student at a partner campus registers in under 2 minutes. Pick your meal times and pickup spot. No paperwork, no stigma, no questions asked.",
                image: "/images/resources/food-image-home.webp",
              },
              {
                step: "02",
                title: "Kitchens prepare",
                desc: "Our partner kitchens prepare fresh, nutritious Sattvic meals every morning. Each meal costs just $5 to make — funded entirely by people like you.",
                image: "/images/resources/food-serving.webp",
              },
              {
                step: "03",
                title: "Volunteers deliver",
                desc: "Trained student volunteers pick up meals and deliver them on campus. Students scan a QR code, grab their meal, and get back to learning.",
                image: "/images/resources/food-distribution-3.jpg",
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className="group relative overflow-hidden rounded-3xl border border-[#E5E2DD] bg-[#FAFAF8] transition-all hover:border-[#D4A853]/40 hover:shadow-lg"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={375}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1A3D5C] text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <h3 className="text-xl font-bold text-[#1A1A1A]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-4 leading-relaxed text-[#4B5563]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Story — Full-bleed cinematic quote ── */}
      <section className="relative py-32 md:py-40">
        <Image
          src="/images/resources/mission-vision-side-img.webp"
          alt="Students at campus"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#1A3D5C]/85" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <svg
            className="mx-auto h-12 w-12 text-[#D4A853]/40"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote className="font-heading mt-8 text-3xl leading-snug font-bold text-white md:text-5xl">
            I was choosing between
            <br />
            eating and dropping out.
            <br />
            <span className="text-[#D4A853]">WFM changed everything.</span>
          </blockquote>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Image
              src="/images/testimonials/testimonial0.jpg"
              alt="Raj Kumar"
              width={56}
              height={56}
              className="h-14 w-14 rounded-full border-2 border-[#D4A853]/40 object-cover"
            />
            <div className="text-left">
              <p className="font-semibold text-white">Raj Kumar</p>
              <p className="text-sm text-white/50">
                Engineering Graduate, Class of 2024
              </p>
            </div>
          </div>
          <Link
            href="/stories"
            className="mt-10 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-[#D4A853] uppercase transition-colors hover:text-[#E4B863]"
          >
            Read more stories
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── The $5 Promise ── */}
      <section className="bg-[#FAFAF8] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="overflow-hidden rounded-[2rem] bg-[#1A3D5C]">
            <div className="grid lg:grid-cols-2">
              <div className="flex flex-col justify-center p-10 md:p-16">
                <p className="text-sm font-semibold tracking-[0.2em] text-[#D4A853] uppercase">
                  The 100% model
                </p>
                <h2 className="font-heading mt-4 text-4xl leading-tight font-bold text-white md:text-5xl">
                  Every dollar
                  <br />
                  you give feeds
                  <br />a student.
                </h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-white/60">
                  Our operational costs are covered by a small group of founding
                  donors. That means 100% of your gift goes directly to
                  preparing and delivering meals. Not overhead. Not salaries.
                  Meals.
                </p>
                <div className="mt-10 grid grid-cols-3 gap-6">
                  {[
                    { amount: "$5", feeds: "1 student, 1 day" },
                    { amount: "$35", feeds: "1 student, 1 week" },
                    { amount: "$150", feeds: "1 student, 1 month" },
                  ].map((tier) => (
                    <div
                      key={tier.amount}
                      className="rounded-xl border border-white/10 bg-white/5 p-4 text-center"
                    >
                      <div className="font-heading text-2xl font-bold text-[#D4A853]">
                        {tier.amount}
                      </div>
                      <div className="mt-1 text-xs text-white/50">
                        {tier.feeds}
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  href="/donate"
                  className="mt-10 inline-flex w-fit items-center gap-3 rounded-full bg-[#D4A853] px-10 py-4 text-base font-bold text-[#1A3D5C] transition-all hover:bg-[#C49A48] hover:shadow-xl hover:shadow-[#D4A853]/20"
                >
                  Fund meals today
                </Link>
              </div>
              <div className="relative hidden lg:block">
                <Image
                  src="/images/resources/food-distribution-2.jpg"
                  alt="Volunteers distributing meals to students"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A3D5C] to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-[#D4A853] uppercase">
                Voices
              </p>
              <h2 className="font-heading mt-4 text-4xl font-bold text-[#1A1A1A] md:text-5xl">
                From our community
              </h2>
            </div>
            <Link
              href="/stories"
              className="hidden items-center gap-2 text-sm font-semibold text-[#1A3D5C] transition-colors hover:text-[#D4A853] md:inline-flex"
            >
              All stories
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                quote:
                  "WFMCA literally saved my college career. I was on the verge of dropping out because I couldn't afford food and tuition. Now I'm graduating with honors.",
                name: "Raj Kumar",
                role: "Student, State University",
                image: "/images/testimonials/testimonial0.jpg",
              },
              {
                quote:
                  "Seeing the relief on students' faces when they receive their meals — that's what keeps me coming back every single day. This is the most meaningful thing I've done.",
                name: "Anika Patel",
                role: "Volunteer, 2 years",
                image: "/images/testimonials/testimonial1.jpg",
              },
              {
                quote:
                  "I've donated to many nonprofits, but WFMCA is different. I know exactly where my money goes — straight to feeding students. No overhead, no waste.",
                name: "Robert Johnson",
                role: "Monthly donor since 2023",
                image: "/images/testimonials/testimonial2.jpg",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="flex flex-col rounded-3xl border border-[#E5E2DD] bg-[#FAFAF8] p-8"
              >
                <div className="flex gap-1 text-[#D4A853]">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-6 flex-1 leading-relaxed text-[#4B5563]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-8 flex items-center gap-4 border-t border-[#E5E2DD] pt-6">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">{t.name}</p>
                    <p className="text-sm text-[#6B7280]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ways to Help ── */}
      <section className="bg-[#F5F0EB] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-[0.2em] text-[#D4A853] uppercase">
              Get involved
            </p>
            <h2 className="font-heading mt-4 text-4xl font-bold text-[#1A1A1A] md:text-5xl">
              Every action matters
            </h2>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Give Monthly",
                desc: "$20/month feeds 4 students every single day for a year.",
                cta: "Start giving",
                href: "/donate",
              },
              {
                title: "Volunteer",
                desc: "Join 1,200+ students delivering meals on your campus.",
                cta: "Sign up",
                href: "/get-involved",
              },
              {
                title: "Start a Fundraiser",
                desc: "Rally your community to fund meals for a campus near you.",
                cta: "Get started",
                href: "/campaigns",
              },
              {
                title: "Campus Partnership",
                desc: "Bring World Food Movement to your university.",
                cta: "Learn more",
                href: "/contact",
              },
            ].map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group rounded-2xl border border-[#E5E2DD] bg-white p-8 transition-all hover:border-[#D4A853]/40 hover:shadow-lg"
              >
                <h3 className="text-lg font-bold text-[#1A1A1A]">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                  {card.desc}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#D4A853] transition-colors group-hover:text-[#C49A48]">
                  {card.cta}
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Photo mosaic strip ── */}
      <section className="overflow-hidden">
        <div className="flex gap-2">
          {[
            "/images/resources/food-distribution-3.jpg",
            "/images/resources/food-distribution-4.jpg",
            "/images/resources/food-distribution-5.jpg",
            "/images/resources/footer-top-bg.webp",
          ].map((src, i) => (
            <div key={i} className="relative h-64 flex-1 md:h-80">
              <Image
                src={src}
                alt="Food distribution"
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative py-32 md:py-40">
        <Image
          src="/images/banners/hero-3.webp"
          alt="Students receiving meals on campus"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0F1A24]/75" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-heading text-4xl leading-tight font-bold text-white md:text-6xl">
            Every meal you fund
            <br />
            keeps a student
            <br />
            <span className="italic text-[#D4A853]">in school.</span>
          </h2>
          <p className="mt-6 text-lg text-white/60">
            Join 5,000+ donors who are ending student hunger in America.
          </p>
          <Link
            href="/donate"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#D4A853] px-10 py-4 text-base font-bold text-[#1A3D5C] transition-all hover:bg-[#C49A48] hover:shadow-xl hover:shadow-[#D4A853]/20"
          >
            Fund meals today
          </Link>
        </div>
      </section>
    </main>
  );
}
