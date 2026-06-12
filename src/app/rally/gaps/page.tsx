"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { VolunteerSuggestion } from "@/lib/rally/services";
import {
  AlertTriangle,
  X,
  Loader2,
  CheckCircle2,
  Star,
  MapPin,
  Users,
  UserPlus,
} from "lucide-react";

type GapShift = {
  id: number;
  date: Date | string;
  campus: { name: string; city?: string };
  shiftType: string;
  serviceType: string;
  startTime: Date | string;
  endTime: Date | string;
  requiredCount: number;
  status: string;
  _count: { signups: number };
};

function breakdownToReasons(
  breakdown: VolunteerSuggestion["breakdown"]
): string[] {
  const reasons: string[] = [];
  if (breakdown.campus > 0) reasons.push("Prefers campus");
  if (breakdown.availability > 0) reasons.push("Available this slot");
  if (breakdown.reliability >= 20) reasons.push("High reliability");
  if (breakdown.recency >= 15) reasons.push("Recently active");
  return reasons;
}

function formatTime(t: Date | string) {
  return new Date(t).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function SuggestionPanel({
  shift,
  onClose,
}: {
  shift: GapShift | null;
  onClose: () => void;
}) {
  const utils = trpc.useUtils();
  const [addingId, setAddingId] = useState<number | null>(null);
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set());

  const { data: suggestions, isLoading } = trpc.rally.volunteer.suggestions.useQuery(
    { shiftId: shift?.id ?? 0 },
    { enabled: shift !== null }
  );

  const addToShift = trpc.rally.volunteer.addToShift.useMutation({
    onSuccess: (_, variables) => {
      setAddedIds((prev) => new Set(prev).add(variables.volunteerId));
      setAddingId(null);
      utils.rally.shift.gaps.invalidate();
      utils.rally.shift.list.invalidate();
      utils.rally.dashboard.stats.invalidate();
    },
    onError: () => setAddingId(null),
  });

  function handleAdd(volunteerId: number) {
    if (!shift) return;
    setAddingId(volunteerId);
    addToShift.mutate({ volunteerId, shiftId: shift.id });
  }

  const gapCount = shift ? shift.requiredCount - shift._count.signups : 0;

  return (
    <div
      className={cn(
        "fixed inset-y-0 right-0 z-40 flex w-96 flex-col bg-white shadow-2xl transition-transform duration-300 border-l border-stone-200",
        shift !== null ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-stone-900">Volunteer Suggestions</h2>
          {shift && (
            <p className="mt-0.5 text-xs text-stone-500">
              {shift.campus.name} · {formatDate(shift.date)}
            </p>
          )}
        </div>
        <button onClick={onClose} className="rounded-md p-1 text-stone-500 hover:text-stone-900">
          <X className="size-4" />
        </button>
      </div>

      {shift && (
        <div className="border-b border-stone-200 bg-stone-50 px-5 py-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-500">
              {shift._count.signups} / {shift.requiredCount} filled
            </span>
            <Badge variant="destructive" className="text-[11px]">
              {gapCount} gap{gapCount !== 1 ? "s" : ""}
            </Badge>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-stone-200">
            <div
              className="h-full rounded-full bg-amber-500"
              style={{
                width: `${Math.round((shift._count.signups / shift.requiredCount) * 100)}%`,
              }}
            />
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="size-6 animate-spin text-stone-400" />
          </div>
        ) : !suggestions || suggestions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Users className="mb-3 size-10 text-stone-300" />
            <p className="text-sm text-stone-400">No suggestions available.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {suggestions.map(({ volunteer, score, breakdown }) => {
              const reasons = breakdownToReasons(breakdown);
              const isAdded = addedIds.has(volunteer.id);
              const isAdding = addingId === volunteer.id;
              const preferredCampuses = volunteer.preferredCampuses as string[];
              const campusMatch =
                shift &&
                preferredCampuses.some(
                  (c) => c.toLowerCase() === shift.campus.name.toLowerCase()
                );

              return (
                <div
                  key={volunteer.id}
                  className={cn(
                    "rounded-xl border p-4 transition-colors",
                    isAdded
                      ? "border-green-300 bg-green-50"
                      : "border-stone-200 bg-white"
                  )}
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-stone-900">
                        {volunteer.firstName} {volunteer.lastName}
                      </p>
                      <p className="text-xs text-stone-500">{volunteer.phone}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1">
                      <Star className="size-3 text-amber-600" />
                      <span className="text-xs font-medium text-amber-700">
                        {score}
                      </span>
                    </div>
                  </div>

                  {campusMatch && (
                    <div className="mb-2 flex items-center gap-1.5 text-xs text-green-700">
                      <MapPin className="size-3" />
                      Prefers this campus
                    </div>
                  )}

                  {reasons.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-1">
                      {reasons.map((r) => (
                        <span
                          key={r}
                          className="rounded-full border border-stone-200 bg-white px-2 py-0.5 text-[11px] text-stone-500"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  )}

                  <Button
                    size="sm"
                    disabled={isAdded || isAdding}
                    onClick={() => handleAdd(volunteer.id)}
                    className={cn(
                      "w-full text-xs",
                      isAdded
                        ? "bg-green-100 text-green-700 hover:bg-green-100 cursor-default"
                        : "bg-amber-500 text-black hover:bg-amber-400"
                    )}
                  >
                    {isAdding ? (
                      <Loader2 className="mr-1.5 size-3 animate-spin" />
                    ) : isAdded ? (
                      <CheckCircle2 className="mr-1.5 size-3" />
                    ) : (
                      <UserPlus className="mr-1.5 size-3" />
                    )}
                    {isAdded ? "Added" : "Add to Shift"}
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function GapShiftCard({
  shift,
  selected,
  onClick,
}: {
  shift: GapShift;
  selected: boolean;
  onClick: () => void;
}) {
  const gapCount = shift.requiredCount - shift._count.signups;
  const fillPct = Math.round((shift._count.signups / Math.max(shift.requiredCount, 1)) * 100);
  const urgency = gapCount >= 3 ? "high" : gapCount === 2 ? "medium" : "low";

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full rounded-xl border p-4 text-left transition-all",
        selected
          ? "border-amber-400 bg-amber-50 ring-1 ring-amber-200"
          : "border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-100"
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <p className="font-medium text-stone-900">{shift.campus.name}</p>
          <p className="mt-0.5 text-sm text-stone-500">
            {formatDate(shift.date)} · {formatTime(shift.startTime)} – {formatTime(shift.endTime)}
          </p>
        </div>
        <Badge
          variant="destructive"
          className={cn(
            "shrink-0 text-[11px]",
            urgency === "high" && "bg-red-100 text-red-600",
            urgency === "medium" && "bg-orange-100 text-orange-700",
            urgency === "low" && "bg-yellow-100 text-yellow-700"
          )}
        >
          {gapCount} gap{gapCount !== 1 ? "s" : ""}
        </Badge>
      </div>

      <div className="mb-2 flex items-center gap-2 text-xs text-stone-500">
        <span>{shift.shiftType.replace("_", " ")}</span>
        <span>·</span>
        <span>{shift.serviceType}</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-stone-200">
          <div
            className={cn(
              "h-full rounded-full",
              fillPct >= 50 ? "bg-amber-500" : "bg-red-500"
            )}
            style={{ width: `${fillPct}%` }}
          />
        </div>
        <span className="text-xs tabular-nums text-stone-500">
          {shift._count.signups}/{shift.requiredCount}
        </span>
      </div>
    </button>
  );
}

export default function GapsPage() {
  const [selectedShift, setSelectedShift] = useState<GapShift | null>(null);

  const { data: gapShifts, isLoading, isError } = trpc.rally.shift.gaps.useQuery();

  const sortedShifts = gapShifts
    ? [...(gapShifts as GapShift[])].sort((a, b) => {
        const gapA = a.requiredCount - a._count.signups;
        const gapB = b.requiredCount - b._count.signups;
        return gapB - gapA;
      })
    : [];

  function handleShiftClick(shift: GapShift) {
    setSelectedShift((prev) => (prev?.id === shift.id ? null : shift));
  }

  return (
    <>
      <div className="p-6">
        <div className="mb-5">
          <h1 className="text-xl font-semibold text-stone-900">Staffing Gaps</h1>
          <p className="mt-0.5 text-sm text-stone-500">
            {isLoading ? "Loading…" : `${sortedShifts.length} understaffed shift${sortedShifts.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="size-6 animate-spin text-stone-400" />
          </div>
        ) : isError ? (
          <div className="py-24 text-center text-sm text-red-600">
            Failed to load gaps.
          </div>
        ) : sortedShifts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-green-50">
              <AlertTriangle className="size-8 text-green-500" />
            </div>
            <p className="text-base font-medium text-stone-600">All shifts fully staffed</p>
            <p className="mt-1 text-sm text-stone-400">No gaps to fill right now.</p>
          </div>
        ) : (
          <div
            className={cn(
              "grid gap-3",
              selectedShift ? "grid-cols-1 xl:grid-cols-2" : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
            )}
          >
            {sortedShifts.map((shift) => (
              <GapShiftCard
                key={shift.id}
                shift={shift}
                selected={selectedShift?.id === shift.id}
                onClick={() => handleShiftClick(shift)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedShift !== null && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setSelectedShift(null)}
        />
      )}
      <SuggestionPanel
        shift={selectedShift}
        onClose={() => setSelectedShift(null)}
      />
    </>
  );
}
