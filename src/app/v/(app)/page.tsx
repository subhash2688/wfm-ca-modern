"use client";

import Link from "next/link";
import { trpc } from "@/lib/trpc/client";
import { useVolunteer } from "./layout";

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

function FillBar({ filled, required }: { filled: number; required: number }) {
  const pct = required > 0 ? Math.min(100, Math.round((filled / required) * 100)) : 0;
  const color = pct >= 80 ? "#16a34a" : pct >= 50 ? "#ca8a04" : "#dc2626";
  return (
    <div className="mt-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-500">{filled} / {required} volunteers</span>
        <span className="text-xs font-medium" style={{ color }}>{pct}% full</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

type ShiftItem = {
  id: number;
  date: Date | string;
  startTime: Date | string;
  endTime: Date | string;
  shiftType: string;
  serviceType?: string | null;
  campus: { name: string; city?: string | null };
  _count: { signups: number };
  requiredCount: number;
  isSignedUp: boolean;
};

function ShiftCard({ shift }: { shift: ShiftItem }) {
  return (
    <Link href={`/v/shifts/${shift.id}`} className="block">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 active:scale-[0.99] transition-transform">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              {formatShortDate(shift.date)}
            </p>
            <p className="text-base font-semibold text-gray-900 mt-0.5">
              {formatTime(shift.startTime)} – {formatTime(shift.endTime)}
            </p>
            <p className="text-sm text-gray-600 mt-1">{shift.campus.name}</p>
            {shift.campus.city && (
              <p className="text-xs text-gray-400">{shift.campus.city}</p>
            )}
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full font-medium capitalize">
              {shift.shiftType.replace(/_/g, " ")}
            </span>
            {shift.isSignedUp && (
              <span
                className="text-xs px-2.5 py-1 rounded-full font-semibold text-white"
                style={{ backgroundColor: "#1A3D5C" }}
              >
                Signed Up ✓
              </span>
            )}
          </div>
        </div>
        <FillBar filled={shift._count.signups} required={shift.requiredCount} />
      </div>
    </Link>
  );
}

export default function HomePage() {
  const { volunteer } = useVolunteer();
  const { data: shifts, isLoading, error } = trpc.rallyVolunteer.shifts.useQuery();

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">
          Hey, {volunteer?.firstName ?? "there"} 👋
        </h1>
        <p className="text-sm text-gray-500 mt-1">Upcoming volunteer shifts</p>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 h-32 animate-pulse" />
          ))}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-sm text-red-700">
          Could not load shifts. Pull down to retry.
        </div>
      )}

      {shifts && shifts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">📅</p>
          <p className="text-gray-700 font-medium">No upcoming shifts</p>
          <p className="text-sm text-gray-400 mt-1">Check back soon!</p>
        </div>
      )}

      {shifts && shifts.length > 0 && (
        <div className="space-y-3">
          {shifts.map((shift) => (
            <ShiftCard key={shift.id} shift={shift} />
          ))}
        </div>
      )}
    </div>
  );
}
