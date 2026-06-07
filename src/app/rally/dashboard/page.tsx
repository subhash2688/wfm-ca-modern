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
          ? "border-amber-500/30 bg-amber-500/10"
          : "border-white/8 bg-white/5"
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-widest text-white/40">
          {label}
        </span>
        <div
          className={cn(
            "flex size-8 items-center justify-center rounded-lg",
            accent ? "bg-amber-500/20" : "bg-white/8"
          )}
        >
          <Icon
            className={cn(
              "size-4",
              accent ? "text-amber-400" : "text-white/50"
            )}
          />
        </div>
      </div>
      <p
        className={cn(
          "text-2xl font-bold tabular-nums",
          accent ? "text-amber-300" : "text-white"
        )}
      >
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-white/40">{sub}</p>}
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
    signup: "bg-green-500/20 text-green-400",
    create: "bg-blue-500/20 text-blue-400",
    update: "bg-yellow-500/20 text-yellow-400",
    delete: "bg-red-500/20 text-red-400",
    check_in: "bg-purple-500/20 text-purple-400",
    seed: "bg-white/10 text-white/50",
    export: "bg-cyan-500/20 text-cyan-400",
    sms: "bg-indigo-500/20 text-indigo-400",
    reset: "bg-orange-500/20 text-orange-400",
  };

  const color = actionColor[action] ?? "bg-white/10 text-white/50";

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
        <p className="text-sm text-white/80 leading-snug">
          {description}
          {firstName && lastName && (
            <span className="ml-1 font-medium text-white">
              — {firstName} {lastName}
            </span>
          )}
        </p>
        <p className="mt-0.5 text-xs text-white/30">{relativeTime()}</p>
      </div>
    </div>
  );
}

export default function RallyDashboardPage() {
  const { data, isLoading, isError } = trpc.rally.dashboard.stats.useQuery();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="size-6 animate-spin text-white/30" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-red-400">Failed to load dashboard stats.</p>
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
        <h1 className="text-xl font-semibold text-white">Dashboard</h1>
        <p className="mt-0.5 text-sm text-white/40">
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
        <div className="rounded-xl border border-white/8 bg-white/5 p-5">
          <div className="mb-1 flex items-center gap-2">
            <TrendingUp className="size-4 text-white/40" />
            <span className="text-xs font-medium uppercase tracking-widest text-white/40">
              Completion Rate
            </span>
          </div>
          <p className="text-3xl font-bold text-white">{fillRatePct}%</p>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
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

        <div className="rounded-xl border border-white/8 bg-white/5 p-5">
          <div className="mb-1 flex items-center gap-2">
            <UserCheck className="size-4 text-white/40" />
            <span className="text-xs font-medium uppercase tracking-widest text-white/40">
              New Volunteers
            </span>
          </div>
          <p className="text-3xl font-bold text-white">
            {data.newVolunteers}
          </p>
          <p className="mt-1 text-xs text-white/30">
            pending onboarding
          </p>
        </div>

        <div className="rounded-xl border border-white/8 bg-white/5 p-5">
          <div className="mb-1 flex items-center gap-2">
            <BarChart3 className="size-4 text-white/40" />
            <span className="text-xs font-medium uppercase tracking-widest text-white/40">
              Active Rate
            </span>
          </div>
          <p className="text-3xl font-bold text-white">
            {data.totalVolunteers > 0
              ? Math.round((data.activeVolunteers / data.totalVolunteers) * 100)
              : 0}
            %
          </p>
          <p className="mt-1 text-xs text-white/30">
            {data.activeVolunteers} of {data.totalVolunteers} active
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-white/8 bg-white/5 p-5">
        <div className="mb-4 flex items-center gap-2">
          <Clock className="size-4 text-white/40" />
          <h2 className="text-sm font-medium text-white/70">Recent Activity</h2>
        </div>
        {data.recentActivity.length === 0 ? (
          <p className="py-4 text-center text-sm text-white/30">
            No activity yet.
          </p>
        ) : (
          <div className="divide-y divide-white/5">
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
