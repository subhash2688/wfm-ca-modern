"use client";

import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";
import {
  Users,
  UserCheck,
  Calendar,
  AlertTriangle,
  UtensilsCrossed,
  TrendingUp,
  Clock,
  BarChart3,
  Loader2,
} from "lucide-react";

function StatCard({
  label,
  value,
  icon: Icon,
  accent = false,
  sub,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  accent?: boolean;
  sub?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-5",
        accent
          ? "border-amber-300 bg-amber-50"
          : "border-stone-200 bg-white"
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-widest text-stone-500">
          {label}
        </span>
        <div
          className={cn(
            "flex size-8 items-center justify-center rounded-lg",
            accent ? "bg-amber-100" : "bg-stone-100"
          )}
        >
          <Icon
            className={cn(
              "size-4",
              accent ? "text-amber-600" : "text-stone-500"
            )}
          />
        </div>
      </div>
      <p
        className={cn(
          "text-2xl font-bold tabular-nums",
          accent ? "text-amber-700" : "text-stone-900"
        )}
      >
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-stone-500">{sub}</p>}
    </div>
  );
}

function ActivityItem({
  action,
  description,
  timestamp,
  firstName,
  lastName,
}: {
  action: string;
  description: string;
  timestamp: Date | string;
  firstName?: string | null;
  lastName?: string | null;
}) {
  const date = new Date(timestamp);
  const relativeTime = () => {
    const diff = Date.now() - date.getTime();
    const mins = Math.floor(diff / 60_000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const actionColor: Record<string, string> = {
    signup: "bg-green-100 text-green-700",
    create: "bg-blue-100 text-blue-700",
    update: "bg-yellow-100 text-yellow-700",
    delete: "bg-red-100 text-red-600",
    check_in: "bg-purple-100 text-purple-700",
    seed: "bg-stone-200 text-stone-500",
    export: "bg-cyan-100 text-cyan-700",
    sms: "bg-indigo-100 text-indigo-700",
    reset: "bg-orange-100 text-orange-700",
  };

  const color = actionColor[action] ?? "bg-stone-200 text-stone-500";

  return (
    <div className="flex items-start gap-3 py-3">
      <span
        className={cn(
          "mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium",
          color
        )}
      >
        {action}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-stone-700 leading-snug">
          {description}
          {firstName && lastName && (
            <span className="ml-1 font-medium text-stone-900">
              — {firstName} {lastName}
            </span>
          )}
        </p>
        <p className="mt-0.5 text-xs text-stone-400">{relativeTime()}</p>
      </div>
    </div>
  );
}

export default function RallyDashboardPage() {
  const { data, isLoading, isError } = trpc.rally.dashboard.stats.useQuery();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="size-6 animate-spin text-stone-400" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-red-600">Failed to load dashboard stats.</p>
      </div>
    );
  }

  const totalSignups = data.totalSignups;
  const completedSignups = data.completedSignups;
  const fillRatePct =
    totalSignups > 0 ? Math.round((completedSignups / totalSignups) * 100) : 0;
  const mealsProjected = data.upcomingShifts * 80;

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-xl font-semibold text-stone-900">Dashboard</h1>
        <p className="mt-0.5 text-sm text-stone-500">
          Rally operations overview
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard
          label="Total Volunteers"
          value={data.totalVolunteers}
          icon={Users}
          sub={`${data.activeVolunteers} active`}
        />
        <StatCard
          label="Upcoming Shifts"
          value={data.upcomingShifts}
          icon={Calendar}
          sub={`${data.totalShifts} all time`}
        />
        <StatCard
          label="Shifts With Gaps"
          value={data.gaps}
          icon={AlertTriangle}
          accent={data.gaps > 0}
        />
        <StatCard
          label="Meals Projected"
          value={mealsProjected.toLocaleString()}
          icon={UtensilsCrossed}
          sub={`${data.completedSignups * 80} served`}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <div className="rounded-xl border border-stone-200 bg-white p-5">
          <div className="mb-1 flex items-center gap-2">
            <TrendingUp className="size-4 text-stone-500" />
            <span className="text-xs font-medium uppercase tracking-widest text-stone-500">
              Completion Rate
            </span>
          </div>
          <p className="text-3xl font-bold text-stone-900">{fillRatePct}%</p>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-stone-200">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                fillRatePct >= 80
                  ? "bg-green-500"
                  : fillRatePct >= 50
                    ? "bg-amber-500"
                    : "bg-red-500"
              )}
              style={{ width: `${fillRatePct}%` }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-5">
          <div className="mb-1 flex items-center gap-2">
            <UserCheck className="size-4 text-stone-500" />
            <span className="text-xs font-medium uppercase tracking-widest text-stone-500">
              New Volunteers
            </span>
          </div>
          <p className="text-3xl font-bold text-stone-900">
            {data.newVolunteers}
          </p>
          <p className="mt-1 text-xs text-stone-400">
            pending onboarding
          </p>
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-5">
          <div className="mb-1 flex items-center gap-2">
            <BarChart3 className="size-4 text-stone-500" />
            <span className="text-xs font-medium uppercase tracking-widest text-stone-500">
              Active Rate
            </span>
          </div>
          <p className="text-3xl font-bold text-stone-900">
            {data.totalVolunteers > 0
              ? Math.round((data.activeVolunteers / data.totalVolunteers) * 100)
              : 0}
            %
          </p>
          <p className="mt-1 text-xs text-stone-400">
            {data.activeVolunteers} of {data.totalVolunteers} active
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-stone-200 bg-white p-5">
        <div className="mb-4 flex items-center gap-2">
          <Clock className="size-4 text-stone-500" />
          <h2 className="text-sm font-medium text-stone-600">Recent Activity</h2>
        </div>
        {data.recentActivity.length === 0 ? (
          <p className="py-4 text-center text-sm text-stone-400">
            No activity yet.
          </p>
        ) : (
          <div className="divide-y divide-stone-100">
            {data.recentActivity.map((item) => (
              <ActivityItem
                key={item.id}
                action={item.actionType}
                description={item.description}
                timestamp={item.timestamp}
                firstName={item.volunteer?.firstName}
                lastName={item.volunteer?.lastName}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
