"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { WFM_CAMPUSES } from "@/lib/data/campuses";
import {
  UserPlus,
  X,
  Loader2,
  CheckCircle,
  XCircle,
  ChevronRight,
  Users,
  ClipboardCheck,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────

type LeadStatus =
  | "pending"
  | "training_invited"
  | "training_scheduled"
  | "training_complete"
  | "activated"
  | "rejected";

interface Lead {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string | null;
  campusName: string;
  volunteerType: string;
  status: LeadStatus;
  trainingWaived: boolean;
  notes: string | null;
  groupName: string | null;
  groupSize: number | null;
  activatedAt: Date | null;
  volunteerId: number | null;
  createdAt: Date;
}

// ─── Helpers ──────────────────────────────────────────────────

function formatDate(d: Date | string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const STATUS_LABELS: Record<LeadStatus, string> = {
  pending: "Pending",
  training_invited: "Invited",
  training_scheduled: "Scheduled",
  training_complete: "Ready",
  activated: "Activated",
  rejected: "Rejected",
};

const TYPE_LABELS: Record<string, string> = {
  individual: "Individual",
  regular: "Regular",
  group: "Group",
};

// ─── Status badge ─────────────────────────────────────────────

function StatusBadge({ status }: { status: LeadStatus }) {
  const base = "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold leading-none";
  const styles: Record<LeadStatus, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    training_invited: "bg-blue-100 text-blue-800",
    training_scheduled: "bg-blue-100 text-blue-800",
    training_complete: "bg-green-100 text-green-800",
    activated: "bg-emerald-100 text-emerald-800",
    rejected: "bg-red-100 text-red-700",
  };
  return (
    <span className={cn(base, styles[status])}>
      {STATUS_LABELS[status]}
    </span>
  );
}

function TypeBadge({ type }: { type: string }) {
  const base = "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium leading-none";
  const styles: Record<string, string> = {
    individual: "bg-stone-100 text-stone-700",
    regular: "bg-indigo-100 text-indigo-700",
    group: "bg-purple-100 text-purple-700",
  };
  return (
    <span className={cn(base, styles[type] ?? "bg-stone-100 text-stone-600")}>
      {TYPE_LABELS[type] ?? type}
    </span>
  );
}

// ─── Toast ────────────────────────────────────────────────────

function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) {
  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl px-4 py-3 shadow-xl text-sm font-medium",
        type === "success"
          ? "bg-emerald-600 text-white"
          : "bg-red-600 text-white"
      )}
    >
      {type === "success" ? (
        <CheckCircle className="size-4 shrink-0" />
      ) : (
        <XCircle className="size-4 shrink-0" />
      )}
      {message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">
        <X className="size-3.5" />
      </button>
    </div>
  );
}

// ─── Add Volunteer Modal ───────────────────────────────────────

const addSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  phone: z.string().min(7, "Enter a valid phone number"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  campusName: z.string().min(1, "Select a campus"),
  trainingWaived: z.boolean(),
  notes: z.string().optional(),
});

type AddFormInput = z.input<typeof addSchema>;
type AddFormOutput = z.output<typeof addSchema>;

function AddVolunteerModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: (msg: string) => void;
}) {
  const utils = trpc.useUtils();
  const addMutation = trpc.rally.leads.addVolunteer.useMutation({
    onSuccess: (vol) => {
      utils.rally.leads.list.invalidate();
      onSuccess(`${vol.firstName} ${vol.lastName} added and activated.`);
      onClose();
      reset();
    },
    onError: (err) => {
      // error shown inline
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<AddFormInput, unknown, AddFormOutput>({
    resolver: zodResolver(addSchema),
    defaultValues: { trainingWaived: false },
  });

  const trainingWaived = watch("trainingWaived");

  function onSubmit(data: AddFormOutput) {
    addMutation.mutate({
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email || undefined,
      campusName: data.campusName,
      trainingWaived: true, // always true for this fast path
      notes: data.notes || undefined,
    });
  }

  if (!open) return null;

  const inputCls =
    "w-full rounded-lg border border-[#1A3D5C]/20 bg-white px-3 py-2 text-sm text-stone-900 placeholder-stone-400 outline-none focus:border-[#D4A853] focus:ring-1 focus:ring-[#D4A853]/20";
  const labelCls = "mb-1.5 block text-xs font-medium text-stone-600";
  const errorCls = "mt-1 text-xs text-red-600";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-lg rounded-xl border border-stone-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-stone-900">
              Add Volunteer
            </h2>
            <p className="mt-0.5 text-xs text-stone-500">
              VIP/donor fast path — skips training queue
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-stone-400 hover:text-stone-900"
          >
            <X className="size-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>First Name</label>
              <input
                {...register("firstName")}
                placeholder="Priya"
                className={inputCls}
              />
              {errors.firstName && (
                <p className={errorCls}>{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label className={labelCls}>Last Name</label>
              <input
                {...register("lastName")}
                placeholder="Sharma"
                className={inputCls}
              />
              {errors.lastName && (
                <p className={errorCls}>{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Phone</label>
              <input
                type="tel"
                {...register("phone")}
                placeholder="(510) 555-1234"
                className={inputCls}
              />
              {errors.phone && (
                <p className={errorCls}>{errors.phone.message}</p>
              )}
            </div>
            <div>
              <label className={labelCls}>Email (optional)</label>
              <input
                type="email"
                {...register("email")}
                placeholder="priya@example.com"
                className={inputCls}
              />
              {errors.email && (
                <p className={errorCls}>{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className={labelCls}>Campus</label>
            <select {...register("campusName")} className={inputCls}>
              <option value="">Select campus…</option>
              {WFM_CAMPUSES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.campusName && (
              <p className={errorCls}>{errors.campusName.message}</p>
            )}
          </div>

          <div>
            <label className={labelCls}>Notes (optional)</label>
            <textarea
              {...register("notes")}
              placeholder="Any context about this volunteer…"
              rows={2}
              className={cn(inputCls, "resize-none")}
            />
          </div>

          <label className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-[#D4A853]/30 bg-[#D4A853]/5 p-3">
            <input
              type="checkbox"
              {...register("trainingWaived")}
              className="mt-0.5 size-4 rounded border-stone-300 accent-[#D4A853]"
            />
            <div>
              <p className="text-sm font-medium text-stone-800">
                Training waived (VIP/donor)
              </p>
              <p className="text-xs text-stone-500">
                Skip the training queue and activate immediately
              </p>
            </div>
          </label>

          {addMutation.error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
              {addMutation.error.message}
            </p>
          )}

          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-stone-600 hover:text-stone-900"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={addMutation.isPending}
              className="bg-[#D4A853] text-[#0A1118] hover:bg-[#c49640] font-semibold"
            >
              {addMutation.isPending && (
                <Loader2 className="mr-2 size-4 animate-spin" />
              )}
              Add &amp; Activate
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Action buttons per lead ──────────────────────────────────

function LeadActions({
  lead,
  onMutate,
}: {
  lead: Lead;
  onMutate: (msg: string) => void;
}) {
  const utils = trpc.useUtils();

  const invalidate = () => utils.rally.leads.list.invalidate();

  const inviteMutation = trpc.rally.leads.inviteToTraining.useMutation({
    onSuccess: () => { invalidate(); onMutate("Training invitation sent."); },
  });
  const scheduledMutation = trpc.rally.leads.updateStatus.useMutation({
    onSuccess: () => { invalidate(); onMutate("Status updated to Scheduled."); },
  });
  const completeMutation = trpc.rally.leads.markTrainingComplete.useMutation({
    onSuccess: () => { invalidate(); onMutate("Training marked complete."); },
  });
  const activateMutation = trpc.rally.leads.activate.useMutation({
    onSuccess: () => { invalidate(); onMutate("Volunteer activated!"); },
    onError: (err) => onMutate(`Error: ${err.message}`),
  });
  const rejectMutation = trpc.rally.leads.reject.useMutation({
    onSuccess: () => { invalidate(); onMutate("Lead rejected."); },
  });

  const btnBase =
    "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors disabled:opacity-50";

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {lead.status === "pending" && (
        <button
          onClick={() => inviteMutation.mutate({ id: lead.id })}
          disabled={inviteMutation.isPending}
          className={cn(btnBase, "bg-blue-50 text-blue-700 hover:bg-blue-100")}
        >
          {inviteMutation.isPending ? (
            <Loader2 className="size-3 animate-spin" />
          ) : null}
          Invite to Training
        </button>
      )}

      {lead.status === "training_invited" && (
        <>
          <button
            onClick={() =>
              scheduledMutation.mutate({
                id: lead.id,
                status: "training_scheduled",
              })
            }
            disabled={scheduledMutation.isPending}
            className={cn(
              btnBase,
              "bg-blue-50 text-blue-700 hover:bg-blue-100"
            )}
          >
            {scheduledMutation.isPending ? (
              <Loader2 className="size-3 animate-spin" />
            ) : null}
            Mark Scheduled
          </button>
          <button
            onClick={() => completeMutation.mutate({ id: lead.id })}
            disabled={completeMutation.isPending}
            className={cn(
              btnBase,
              "bg-green-50 text-green-700 hover:bg-green-100"
            )}
          >
            {completeMutation.isPending ? (
              <Loader2 className="size-3 animate-spin" />
            ) : null}
            Mark Complete
          </button>
        </>
      )}

      {lead.status === "training_scheduled" && (
        <button
          onClick={() => completeMutation.mutate({ id: lead.id })}
          disabled={completeMutation.isPending}
          className={cn(
            btnBase,
            "bg-green-50 text-green-700 hover:bg-green-100"
          )}
        >
          {completeMutation.isPending ? (
            <Loader2 className="size-3 animate-spin" />
          ) : null}
          Mark Complete
        </button>
      )}

      {lead.status === "training_complete" && (
        <button
          onClick={() => activateMutation.mutate({ id: lead.id })}
          disabled={activateMutation.isPending}
          className={cn(
            btnBase,
            "bg-[#D4A853] text-[#0A1118] hover:bg-[#c49640] font-semibold shadow-sm"
          )}
        >
          {activateMutation.isPending ? (
            <Loader2 className="size-3 animate-spin" />
          ) : (
            <CheckCircle className="size-3" />
          )}
          Activate
        </button>
      )}

      {lead.status === "activated" && (
        <a
          href="/rally/volunteers"
          className={cn(
            btnBase,
            "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
          )}
        >
          <ChevronRight className="size-3" />
          View Volunteer
        </a>
      )}

      {lead.status !== "rejected" && lead.status !== "activated" && (
        <button
          onClick={() => rejectMutation.mutate({ id: lead.id })}
          disabled={rejectMutation.isPending}
          className={cn(
            btnBase,
            "bg-red-50 text-red-600 hover:bg-red-100"
          )}
        >
          {rejectMutation.isPending ? (
            <Loader2 className="size-3 animate-spin" />
          ) : null}
          Reject
        </button>
      )}
    </div>
  );
}

// ─── Filter tabs ──────────────────────────────────────────────

type FilterTab = "all" | "pending" | "training" | "ready" | "activated" | "rejected";

const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "training", label: "Training" },
  { key: "ready", label: "Ready to Activate" },
  { key: "activated", label: "Activated" },
  { key: "rejected", label: "Rejected" },
];

function matchesTab(lead: Lead, tab: FilterTab): boolean {
  if (tab === "all") return true;
  if (tab === "pending") return lead.status === "pending";
  if (tab === "training")
    return (
      lead.status === "training_invited" ||
      lead.status === "training_scheduled"
    );
  if (tab === "ready") return lead.status === "training_complete";
  if (tab === "activated") return lead.status === "activated";
  if (tab === "rejected") return lead.status === "rejected";
  return true;
}

// ─── Main page ────────────────────────────────────────────────

export default function LeadsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const { data: leads, isLoading, isError } = trpc.rally.leads.list.useQuery();

  function showToast(message: string) {
    const isError = message.startsWith("Error:");
    setToast({ message, type: isError ? "error" : "success" });
    setTimeout(() => setToast(null), 4000);
  }

  const filtered = (leads ?? []).filter((l) =>
    matchesTab(l as Lead, activeTab)
  );

  // Badge counts per tab
  const counts: Record<FilterTab, number> = {
    all: leads?.length ?? 0,
    pending: leads?.filter((l) => l.status === "pending").length ?? 0,
    training:
      leads?.filter(
        (l) =>
          l.status === "training_invited" || l.status === "training_scheduled"
      ).length ?? 0,
    ready: leads?.filter((l) => l.status === "training_complete").length ?? 0,
    activated: leads?.filter((l) => l.status === "activated").length ?? 0,
    rejected: leads?.filter((l) => l.status === "rejected").length ?? 0,
  };

  return (
    <>
      <div className="space-y-0 min-h-full bg-[#F5F6F8]">
        {/* Page header */}
        <div className="border-b border-stone-200 bg-white px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-stone-900">
                Volunteer Leads
              </h1>
              <p className="mt-0.5 text-sm text-stone-500">
                Manage incoming volunteer applications and training pipeline
              </p>
            </div>
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-[#D4A853] text-[#0A1118] hover:bg-[#c49640] font-semibold"
            >
              <UserPlus className="mr-2 size-4" />
              Add Volunteer
            </Button>
          </div>

          {/* Status filter tabs */}
          <div className="mt-5 flex items-center gap-1 overflow-x-auto">
            {FILTER_TABS.map((tab) => {
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-[#1A3D5C] text-white"
                      : "text-stone-500 hover:bg-stone-100 hover:text-stone-900"
                  )}
                >
                  {tab.label}
                  {counts[tab.key] > 0 && (
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none",
                        active
                          ? "bg-white/20 text-white"
                          : "bg-stone-200 text-stone-600"
                      )}
                    >
                      {counts[tab.key]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Table */}
        <div className="p-6">
          <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="size-6 animate-spin text-stone-400" />
              </div>
            ) : isError ? (
              <div className="py-20 text-center text-sm text-red-600">
                Failed to load leads.
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-stone-400">
                {activeTab === "ready" ? (
                  <ClipboardCheck className="mb-3 size-10 opacity-20" />
                ) : (
                  <Users className="mb-3 size-10 opacity-20" />
                )}
                <p className="text-sm font-medium">No leads found</p>
                <p className="mt-1 text-xs">
                  {activeTab === "all"
                    ? "Incoming volunteer applications will appear here."
                    : `No leads with status "${FILTER_TABS.find((t) => t.key === activeTab)?.label}".`}
                </p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50">
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                      Phone
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                      Campus
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                      Applied
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((lead) => {
                    const l = lead as Lead;
                    return (
                      <tr
                        key={l.id}
                        className="border-b border-stone-100 last:border-0 hover:bg-stone-50/50 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-sm font-medium text-stone-900">
                              {l.firstName} {l.lastName}
                            </p>
                            {l.email && (
                              <p className="text-xs text-stone-400">{l.email}</p>
                            )}
                            {l.trainingWaived && (
                              <p className="text-[11px] text-[#D4A853] font-medium">
                                Training waived
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm tabular-nums text-stone-600">
                            {l.phone}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-stone-700">
                            {l.campusName}
                          </span>
                          {l.groupName && (
                            <p className="text-xs text-stone-400">
                              {l.groupName}
                              {l.groupSize ? ` (${l.groupSize})` : ""}
                            </p>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <TypeBadge type={l.volunteerType} />
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={l.status} />
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-stone-500">
                            {formatDate(l.createdAt)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <LeadActions lead={l} onMutate={showToast} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <AddVolunteerModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={showToast}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
