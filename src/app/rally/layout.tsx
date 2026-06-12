"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  LayoutDashboard,
  Calendar,
  Users,
  AlertTriangle,
  LogOut,
  ChevronRight,
  UserPlus,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/rally/dashboard", icon: LayoutDashboard },
  { label: "Leads", href: "/rally/leads", icon: UserPlus },
  { label: "Shifts", href: "/rally/shifts", icon: Calendar },
  { label: "Volunteers", href: "/rally/volunteers", icon: Users },
  { label: "Gaps", href: "/rally/gaps", icon: AlertTriangle },
];

function RallySidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="flex h-screen w-60 flex-col bg-[#1A3D5C] text-white">
      <div className="flex h-24 items-center gap-3 border-b border-white/10 px-5">
        <Image src="/images/logos/wfm-logo.jpg" alt="WFM" width={64} height={64} className="rounded-md" />
        <div>
          <p className="text-lg font-bold tracking-tight text-white">WFM Rally</p>
          <p className="text-xs text-white/50 leading-none mt-1">Staff Dashboard</p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 px-2 py-4">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-[#D4A853]/10 text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white/90"
              )}
            >
              <Icon
                className={cn(
                  "size-4 shrink-0 transition-colors",
                  active ? "text-[#D4A853]" : "text-white/40 group-hover:text-white/70"
                )}
              />
              {label}
              {active && (
                <ChevronRight className="ml-auto size-3.5 text-white/30" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <div className="mb-2 flex items-center gap-2.5 rounded-lg px-2 py-1.5">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white/80">
            {session?.user?.name?.[0]?.toUpperCase() ?? "S"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-white/90">
              {session?.user?.name ?? "Staff"}
            </p>
            <p className="truncate text-[11px] text-white/40">
              {session?.user?.email ?? ""}
            </p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-white/50 transition-colors hover:bg-white/5 hover:text-white/80"
        >
          <LogOut className="size-4 shrink-0" />
          Sign out
        </button>
      </div>
    </aside>
  );
}

export default function RallyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F6F8]">
      <RallySidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
