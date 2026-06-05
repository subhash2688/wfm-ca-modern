"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "About", href: "/about-us" },
  { label: "Programs", href: "/programs" },
  { label: "Stories", href: "/stories" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Updates", href: "/news" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const transparent = isHome && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          transparent
            ? "border-b border-white/10 bg-transparent"
            : "border-b border-[#E5E2DD] bg-white/97 shadow-sm backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className={transparent ? "rounded-md bg-white/90 px-2.5 py-1" : ""}>
              <Image
                src="/images/logos/wfm-logo.webp"
                alt="World Food Movement"
                width={180}
                height={60}
                className="h-10 w-auto"
                priority
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 text-[15px] font-medium lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  transparent
                    ? "text-white/90 hover:text-white"
                    : pathname.startsWith(link.href)
                      ? "text-[#1A3D5C]"
                      : "text-[#4B5563] hover:text-[#1A3D5C]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className={`hidden text-[15px] font-medium transition-colors lg:block ${
                transparent
                  ? "text-white/90 hover:text-white"
                  : "text-[#4B5563] hover:text-[#1A3D5C]"
              }`}
            >
              Log in
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
                  className={`h-6 w-6 ${transparent ? "text-white" : "text-[#1A1A1A]"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className={`h-6 w-6 ${transparent ? "text-white" : "text-[#1A1A1A]"}`}
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
                Log in
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
