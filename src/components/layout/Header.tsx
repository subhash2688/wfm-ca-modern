"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Our Story", href: "/about-us" },
  { label: "How It Works", href: "/programs" },
  { label: "Volunteer", href: "/volunteer" },
  { label: "Corporate", href: "/corporate" },
  { label: "News", href: "/news" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const loginRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!loginOpen) return;
    const onClick = (e: MouseEvent) => {
      if (loginRef.current && !loginRef.current.contains(e.target as Node)) {
        setLoginOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLoginOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [loginOpen]);

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-[#0A1118]/95 shadow-lg backdrop-blur-md"
            : "border-b border-transparent bg-gradient-to-b from-[#0A1118]/70 to-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
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
                    active ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.label}
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
            <div ref={loginRef} className="relative hidden border-l border-white/15 pl-5 lg:block">
              <button
                type="button"
                onClick={() => setLoginOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={loginOpen}
                className="flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-1.5 text-[13px] font-semibold text-white/70 transition-all hover:border-white/40 hover:bg-white/5 hover:text-white"
              >
                Login
                <svg
                  className={`h-3 w-3 transition-transform ${loginOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {loginOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-xl border border-white/10 bg-[#0A1118] shadow-xl"
                >
                  <Link
                    href="/v/login"
                    role="menuitem"
                    onClick={() => setLoginOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    Volunteer
                  </Link>
                  <Link
                    href="/rally/dashboard"
                    role="menuitem"
                    onClick={() => setLoginOpen(false)}
                    className="block border-t border-white/10 px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    Staff
                  </Link>
                </div>
              )}
            </div>
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
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-72 bg-[#0A1118] pt-20 shadow-2xl">
            <nav className="flex flex-col px-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`border-b border-white/10 py-4 text-base font-medium ${
                    pathname.startsWith(link.href) ? "text-white" : "text-white/60"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <p className="mt-6 mb-3 text-[11px] font-semibold uppercase tracking-wider text-white/30">
                Login
              </p>
              <div className="flex gap-2">
                <Link
                  href="/v/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 rounded-full border border-white/20 px-4 py-2.5 text-center text-sm font-semibold text-white/80"
                >
                  Volunteer
                </Link>
                <Link
                  href="/rally/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 rounded-full border border-white/20 px-4 py-2.5 text-center text-sm font-semibold text-white/80"
                >
                  Staff
                </Link>
              </div>
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
