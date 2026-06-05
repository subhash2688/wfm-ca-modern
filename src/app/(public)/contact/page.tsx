import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { FadeIn, FadeInLeft, FadeInRight, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the World Food Movement team.",
};

export default function ContactPage() {
  return (
    <main className="overflow-x-hidden">
      <PageHero label="Contact" title="Get in touch." />

      {/* ── Contact Split Layout ── */}
      <section className="bg-[#FAFAF8] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Left — Contact Info */}
            <FadeInLeft>
              <div>
                <p className="text-sm font-semibold tracking-[0.2em] text-[#D4A853] uppercase">
                  Reach out
                </p>
                <h2 className="font-heading mt-4 text-3xl font-bold text-[#1A1A1A] md:text-4xl">
                  We&apos;d love to hear from you.
                </h2>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-[#4B5563]">
                  Whether you&apos;re a student, donor, volunteer, or campus
                  administrator, our team is here to help.
                </p>

                <div className="mt-12 space-y-8">
                  {/* Email */}
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1A3D5C]/5">
                      <svg
                        className="h-5 w-5 text-[#1A3D5C]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A1A]">
                        Email
                      </p>
                      <a
                        href="mailto:info@wfmca.org"
                        className="mt-0.5 text-[#4B5563] transition-colors hover:text-[#D4A853]"
                      >
                        info@wfmca.org
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1A3D5C]/5">
                      <svg
                        className="h-5 w-5 text-[#1A3D5C]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A1A]">
                        Phone
                      </p>
                      <a
                        href="tel:+15551234567"
                        className="mt-0.5 text-[#4B5563] transition-colors hover:text-[#D4A853]"
                      >
                        (555) 123-4567
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1A3D5C]/5">
                      <svg
                        className="h-5 w-5 text-[#1A3D5C]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A1A]">
                        Mailing Address
                      </p>
                      <p className="mt-0.5 text-[#4B5563]">
                        World Food Movement
                        <br />
                        PO Box 12345
                        <br />
                        Los Angeles, CA 90001
                      </p>
                    </div>
                  </div>
                </div>

                {/* Response time badge */}
                <div className="mt-12 inline-flex items-center gap-2 rounded-full border border-[#E5E2DD] bg-white px-4 py-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                  </span>
                  <span className="text-sm text-[#4B5563]">
                    We typically respond within 24 hours
                  </span>
                </div>
              </div>
            </FadeInLeft>

            {/* Right — Contact Form */}
            <FadeInRight>
              <div className="rounded-3xl border border-[#E5E2DD] bg-white p-8 shadow-lg shadow-black/5 md:p-10">
                <h3 className="font-heading text-xl font-bold text-[#1A1A1A]">
                  Send us a message
                </h3>
                <p className="mt-2 text-sm text-[#6B7280]">
                  Fill out the form below and we&apos;ll get back to you soon.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* ── Other Ways to Reach Us ── */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="text-center">
              <p className="text-sm font-semibold tracking-[0.2em] text-[#D4A853] uppercase">
                Stay connected
              </p>
              <h2 className="font-heading mt-4 text-3xl font-bold text-[#1A1A1A] md:text-4xl">
                Other ways to reach us
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Social Media */}
            <StaggerItem>
              <div className="flex h-full flex-col rounded-3xl border border-[#E5E2DD] bg-[#FAFAF8] p-8 transition-all hover:border-[#D4A853]/40 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1A3D5C]">
                  <svg
                    className="h-5 w-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#1A1A1A]">
                  Follow us on social
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6B7280]">
                  Stay up to date with our latest stories, events, and impact
                  updates across all platforms.
                </p>
                <div className="mt-6 flex gap-3">
                  {[
                    {
                      label: "Twitter",
                      href: "https://twitter.com/wfmca",
                      icon: (
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      ),
                    },
                    {
                      label: "Instagram",
                      href: "https://instagram.com/wfmca",
                      icon: (
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      ),
                    },
                    {
                      label: "Facebook",
                      href: "https://facebook.com/wfmca",
                      icon: (
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      ),
                    },
                    {
                      label: "LinkedIn",
                      href: "https://linkedin.com/company/wfmca",
                      icon: (
                        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                      ),
                    },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E2DD] text-[#4B5563] transition-all hover:border-[#D4A853] hover:text-[#D4A853]"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {social.icon}
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </StaggerItem>

            {/* Office Hours */}
            <StaggerItem>
              <div className="flex h-full flex-col rounded-3xl border border-[#E5E2DD] bg-[#FAFAF8] p-8 transition-all hover:border-[#D4A853]/40 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1A3D5C]">
                  <svg
                    className="h-5 w-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#1A1A1A]">
                  Office hours
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6B7280]">
                  Our team is available during these hours. For urgent matters
                  outside these hours, email us and we&apos;ll respond ASAP.
                </p>
                <div className="mt-6 space-y-3 rounded-2xl border border-[#E5E2DD] bg-white p-5">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-[#1A1A1A]">
                      Monday - Friday
                    </span>
                    <span className="text-[#4B5563]">9:00 AM - 6:00 PM PT</span>
                  </div>
                  <div className="h-px bg-[#E5E2DD]" />
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-[#1A1A1A]">Saturday</span>
                    <span className="text-[#4B5563]">
                      10:00 AM - 2:00 PM PT
                    </span>
                  </div>
                  <div className="h-px bg-[#E5E2DD]" />
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-[#1A1A1A]">Sunday</span>
                    <span className="text-[#6B7280]">Closed</span>
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* FAQ */}
            <StaggerItem>
              <div className="flex h-full flex-col rounded-3xl border border-[#E5E2DD] bg-[#FAFAF8] p-8 transition-all hover:border-[#D4A853]/40 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1A3D5C]">
                  <svg
                    className="h-5 w-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#1A1A1A]">
                  Frequently asked questions
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6B7280]">
                  Find quick answers to common questions about donating,
                  volunteering, campus partnerships, and more.
                </p>
                <Link
                  href="/faq"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#D4A853] transition-colors hover:text-[#C49A48]"
                >
                  Browse FAQ
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
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-[#1A3D5C] py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-white md:text-5xl">
              Ready to make a difference?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
              Whether you want to donate, volunteer, or bring WFM to your campus,
              we&apos;re here to help you get started.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/donate"
                className="inline-flex items-center gap-3 rounded-full bg-[#D4A853] px-10 py-4 text-base font-bold text-[#1A3D5C] transition-all hover:bg-[#C49A48] hover:shadow-xl hover:shadow-[#D4A853]/20"
              >
                Donate now
              </Link>
              <Link
                href="/get-involved"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-10 py-4 text-base font-medium text-white transition-all hover:border-white/40 hover:bg-white/5"
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
