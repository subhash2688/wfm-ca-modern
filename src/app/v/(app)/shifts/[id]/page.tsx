"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { trpc } from "@/lib/trpc/client";

function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

function formatTime(t: Date | string): string {
  const d = typeof t === "string" ? new Date(t) : t;
  const h = d.getUTCHours();
  const m = d.getUTCMinutes();
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 || 12;
  return m === 0 ? `${hour}${suffix}` : `${hour}:${String(m).padStart(2, "0")}${suffix}`;
}

function isToday(date: Date | string): boolean {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

function FillBar({ filled, required }: { filled: number; required: number }) {
  const pct = required > 0 ? Math.min(100, Math.round((filled / required) * 100)) : 0;
  const color = pct >= 80 ? "#16a34a" : pct >= 50 ? "#ca8a04" : "#dc2626";
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-gray-600">{filled} of {required} volunteers</span>
        <span className="text-sm font-semibold" style={{ color }}>{pct}% full</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

export default function ShiftDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = use(params);
  const id = Number(idStr);
  const router = useRouter();

  const utils = trpc.useUtils();
  const { data: shift, isLoading, error } = trpc.rallyVolunteer.shiftDetail.useQuery({ id });

  const signup = trpc.rallyVolunteer.signup.useMutation({
    onSuccess: () => utils.rallyVolunteer.shiftDetail.invalidate({ id }),
  });
  const cancelSignup = trpc.rallyVolunteer.cancelSignup.useMutation({
    onSuccess: () => utils.rallyVolunteer.shiftDetail.invalidate({ id }),
  });
  const checkIn = trpc.rallyVolunteer.checkIn.useMutation({
    onSuccess: () => utils.rallyVolunteer.shiftDetail.invalidate({ id }),
  });

  const isMutating = signup.isPending || cancelSignup.isPending || checkIn.isPending;
  const mutationError = signup.error?.message ?? cancelSignup.error?.message ?? checkIn.error?.message;

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        <div className="h-6 w-32 bg-gray-100 rounded animate-pulse" />
        <div className="bg-white rounded-2xl border border-gray-100 h-48 animate-pulse" />
      </div>
    );
  }

  if (error || !shift) {
    return (
      <div className="max-w-md mx-auto px-4 py-6">
        <button onClick={() => router.back()} className="text-sm text-gray-500 mb-6 flex items-center gap-1">
          ← Back
        </button>
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-sm text-red-700">
          Could not load shift details.
        </div>
      </div>
    );
  }

  const status = shift.mySignup?.status;
  const isFull = shift._count.signups >= shift.requiredCount;
  const shiftToday = isToday(shift.date);

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <button
        onClick={() => router.back()}
        className="text-sm text-gray-500 mb-5 flex items-center gap-1 min-h-[44px]"
      >
        ← Back
      </button>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
            {formatDate(shift.date)}
          </p>
          <h1 className="text-xl font-bold text-gray-900">
            {formatTime(shift.startTime)} – {formatTime(shift.endTime)}
          </h1>
          <p className="text-gray-600 mt-1">{shift.campus.name}</p>
          {"city" in shift.campus && shift.campus.city && (
            <p className="text-sm text-gray-400">{shift.campus.city}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400 mb-0.5">Shift type</p>
            <p className="font-medium text-gray-800 capitalize">{shift.shiftType.replace(/_/g, " ")}</p>
          </div>
          {"serviceType" in shift && shift.serviceType && (
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-0.5">Service type</p>
              <p className="font-medium text-gray-800 capitalize">{String(shift.serviceType).replace(/_/g, " ")}</p>
            </div>
          )}
        </div>

        <FillBar filled={shift._count.signups} required={shift.requiredCount} />

        {mutationError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700" role="alert">
            {mutationError}
          </div>
        )}

        {/* Action area */}
        {!status && !isFull && (
          <button
            onClick={() => signup.mutate({ shiftId: id })}
            disabled={isMutating}
            className="w-full h-14 rounded-xl text-white font-semibold text-base disabled:opacity-50 transition-opacity"
            style={{ backgroundColor: "#1A3D5C" }}
          >
            {signup.isPending ? "Signing up…" : "Sign Up"}
          </button>
        )}

        {!status && isFull && (
          <div className="w-full h-14 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 font-medium text-sm">
            Shift is full
          </div>
        )}

        {(status === "signed_up" || status === "confirmed") && (
          <div className="space-y-3">
            <div
              className="w-full h-14 rounded-xl flex items-center justify-center font-semibold text-white text-base"
              style={{ backgroundColor: "#1A3D5C" }}
            >
              Signed Up ✓
            </div>
            {shiftToday && (
              <button
                onClick={() => checkIn.mutate({ shiftId: id })}
                disabled={isMutating}
                className="w-full h-14 rounded-xl font-semibold text-base border-2 transition-opacity disabled:opacity-50"
                style={{ borderColor: "#1A3D5C", color: "#1A3D5C" }}
              >
                {checkIn.isPending ? "Checking in…" : "Check In"}
              </button>
            )}
            <button
              onClick={() => cancelSignup.mutate({ shiftId: id })}
              disabled={isMutating}
              className="w-full h-12 rounded-xl text-sm text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 disabled:opacity-50 transition-colors"
            >
              {cancelSignup.isPending ? "Cancelling…" : "Cancel Signup"}
            </button>
          </div>
        )}

        {status === "checked_in" && (
          <div className="text-center py-3">
            <p className="text-2xl mb-1">✅</p>
            <p className="font-semibold text-gray-900">Checked In</p>
            <p className="text-sm text-gray-500 mt-1">
              You&apos;re on the list! See you there.
            </p>
          </div>
        )}

        {status === "completed" && (
          <div className="text-center py-3 bg-green-50 rounded-xl border border-green-100">
            <p className="text-2xl mb-1">🎉</p>
            <p className="font-semibold text-gray-900">Completed ✓</p>
            <p className="text-sm text-gray-500 mt-1">
              Thank you for volunteering! Your impact matters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
