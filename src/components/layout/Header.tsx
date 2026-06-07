"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "About", href: "/about-us" },
  { label: "Programs", href: "/programs" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Corporate", href: "/corporate" },
  { label: "Updates", href: "/news" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-50 border-b border-[#E5E2DD] bg-white/97 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logos/wfm-logo.jpg"
              alt="World Food Movement"
              width={220}
              height={72}
              className="h-12 w-auto md:h-14"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative py-1 text-[15px] font-medium transition-colors duration-200 ${
                    active ? "text-[#1A3D5C]" : "text-[#6B7280] hover:text-[#1A3D5C]"
                  }`}
                >
                  {link.label}
                  {/* Sliding gold underline */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#D4A853] transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden text-[15px] font-medium text-[#4B5563] transition-colors hover:text-[#1A3D5C] lg:block"
            >
              Student Portal
            </Link>
            <Link
              href="/donate"
              className="rounded-full bg-[#D4A853] px-7 py-2.5 text-[15px] font-bold text-[#1A3D5C] transition-all hover:bg-[#C49A48] hover:shadow-lg"
            >
              Fund a meal
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg
                  className={`h-6 w-6 text-[#1A1A1A]`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className={`h-6 w-6 text-[#1A1A1A]`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-72 bg-white pt-20 shadow-2xl">
            <nav className="flex flex-col px-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`border-b border-[#E5E2DD] py-4 text-base font-medium ${
                    pathname.startsWith(link.href) ? "text-[#1A3D5C]" : "text-[#4B5563]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="border-b border-[#E5E2DD] py-4 text-base font-medium text-[#4B5563]"
              >
                Student Portal
              </Link>
              <Link
                href="/donate"
                onClick={() => setMobileOpen(false)}
                className="mt-6 rounded-full bg-[#D4A853] px-6 py-3 text-center font-bold text-[#1A3D5C]"
              >
                Fund a meal
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
