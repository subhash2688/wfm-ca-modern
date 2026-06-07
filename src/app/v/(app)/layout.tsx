"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

interface Volunteer {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  status: string;
}

interface VolunteerContextValue {
  volunteer: Volunteer | null;
  loading: boolean;
}

const VolunteerContext = createContext<VolunteerContextValue>({ volunteer: null, loading: true });

export function useVolunteer() {
  return useContext(VolunteerContext);
}

function HouseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" />
    </svg>
  );
}

const NAV_ITEMS = [
  { href: "/v/", label: "Home", icon: HouseIcon },
  { href: "/v/my-shifts", label: "My Shifts", icon: CalendarIcon },
  { href: "/v/profile", label: "Profile", icon: UserIcon },
] as const;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [volunteer, setVolunteer] = useState<Volunteer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/rally/auth")
      .then((r) => r.json())
      .then((data: { volunteer: Volunteer | null }) => {
        if (!data.volunteer) {
          router.replace("/v/login");
        } else {
          setVolunteer(data.volunteer);
          setLoading(false);
        }
      })
      .catch(() => {
        router.replace("/v/login");
      });
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-400 text-sm">Loading…</div>
      </div>
    );
  }

  return (
    <VolunteerContext.Provider value={{ volunteer, loading }}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <main className="flex-1 pb-20">{children}</main>

        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-inset-bottom z-50">
          <div className="max-w-md mx-auto flex">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const isActive =
                href === "/v/"
                  ? pathname === "/v" || pathname === "/v/"
                  : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className="flex-1 flex flex-col items-center justify-center gap-1 py-3 min-h-[56px] transition-colors"
                  style={{ color: isActive ? "#2D6A4F" : "#9CA3AF" }}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon />
                  <span className="text-[11px] font-medium">{label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </VolunteerContext.Provider>
  );
}
