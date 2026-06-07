"use client";

import Link from "next/link";
import { trpc } from "@/lib/trpc/client";

type SignupStatus = "signed_up" | "confirmed" | "checked_in" | "completed" | "cancelled" | "no_show";

const STATUS_LABELS: Record<SignupStatus, string> = {
  signed_up: "Signed Up",
  confirmed: "Confirmed",
  checked_in: "Checked In",
  completed: "Completed",
  cancelled: "Cancelled",
  no_show: "No Show",
};

const STATUS_COLORS: Record<SignupStatus, { bg: string; text: string }> = {
  signed_up: { bg: "#EBF5EE", text: "#2D6A4F" },
  confirmed: { bg: "#D1FAE5", text: "#065F46" },
  checked_in: { bg: "#DBEAFE", text: "#1E40AF" },
  completed: { bg: "#F3F4F6", text: "#374151" },
  cancelled: { bg: "#FEE2E2", text: "#991B1B" },
  no_show: { bg: "#FEF3C7", text: "#92400E" },
};

const UPCOMING_STATUSES: SignupStatus[] = ["signed_up", "confirmed", "checked_in"];

function formatShortDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric" }).format(d);
}

function formatTime(t: Date | string): string {
  const d = typeof t === "string" ? new Date(t) : t;
  const h = d.getUTCHours();
  const m = d.getUTCMinutes();
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 || 12;
  return m === 0 ? `${hour}${suffix}` : `${hour}:${String(m).padStart(2, "0")}${suffix}`;
}

type SignupRow = {
  id: number;
  status: string;
  shift: {
    id: number;
    date: Date | string;
    startTime: Date | string;
    endTime: Date | string;
    campus: { name: string };
  };
};

function ShiftRow({ signup }: { signup: SignupRow }) {
  const status = signup.status as SignupStatus;
  const colors = STATUS_COLORS[status] ?? { bg: "#F3F4F6", text: "#374151" };
  const label = STATUS_LABELS[status] ?? status;
  return (
    <Link href={`/v/shifts/${signup.shift.id}`} className="block">
      <div className="bg-white rounded-xl border border-gray-100 px-4 py-3.5 flex items-center gap-3 active:scale-[0.99] transition-transform">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900">{signup.shift.campus.name}</p>
          <p className="text-xs text-gray-500 mt-0.5">
            {formatShortDate(signup.shift.date)} · {formatTime(signup.shift.startTime)} – {formatTime(signup.shift.endTime)}
          </p>
        </div>
        <span
          className="flex-shrink-0 text-xs font-medium px-2.5 py-1 rounded-full"
          style={{ backgroundColor: colors.bg, color: colors.text }}
        >
          {label}
        </span>
      </div>
    </Link>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 px-1 mb-2 mt-6 first:mt-0">
      {title}
    </h2>
  );
}

export default function MyShiftsPage() {
  const { data: signups, isLoading, error } = trpc.rallyVolunteer.myShifts.useQuery();

  const upcoming = signups?.filter((s) => UPCOMING_STATUSES.includes(s.status as SignupStatus)) ?? [];
  const past = signups?.filter((s) => !UPCOMING_STATUSES.includes(s.status as SignupStatus)) ?? [];

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-gray-900 mb-5">My Shifts</h1>

      {isLoading && (
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 h-16 animate-pulse" />
          ))}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          Could not load your shifts.
        </div>
      )}

      {signups && signups.length === 0 && (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">📋</p>
          <p className="text-gray-700 font-medium">No shifts yet</p>
          <p className="text-sm text-gray-400 mt-1">Sign up for a shift on the Home tab.</p>
        </div>
      )}

      {signups && signups.length > 0 && (
        <>
          {upcoming.length > 0 && (
            <>
              <SectionHeader title="Upcoming" />
              <div className="space-y-2">
                {upcoming.map((s) => <ShiftRow key={s.id} signup={s} />)}
              </div>
            </>
          )}
          {past.length > 0 && (
            <>
              <SectionHeader title="Past" />
              <div className="space-y-2">
                {past.map((s) => <ShiftRow key={s.id} signup={s} />)}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
