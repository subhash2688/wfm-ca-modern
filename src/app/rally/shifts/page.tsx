"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Search,
  X,
  Loader2,
  CalendarDays,
} from "lucide-react";

const SHIFT_TYPES = ["Meal_Prep", "Packing", "Delivery", "Setup", "Cleanup", "Other"] as const;
const SERVICE_TYPES = ["Sunday", "Saturday", "Special"] as const;

const createShiftSchema = z.object({
  campusId: z.string().min(1, "Campus is required").transform((v) => parseInt(v, 10)),
  date: z.string().min(1, "Date is required"),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, "Format: HH:MM"),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, "Format: HH:MM"),
  shiftType: z.enum(SHIFT_TYPES),
  serviceType: z.enum(SERVICE_TYPES),
  requiredCount: z.string().transform((v) => parseInt(v, 10)),
  notes: z.string().optional(),
});

type CreateShiftFormData = z.input<typeof createShiftSchema>;
type CreateShiftOutput = z.output<typeof createShiftSchema>;

type ShiftRow = {
  id: number;
  date: Date | string;
  campus: { name: string };
  shiftType: string;
  serviceType: string;
  startTime: Date | string;
  endTime: Date | string;
  requiredCount: number;
  status: string;
  _count: { signups: number };
};

function formatTime(t: Date | string) {
  const d = new Date(t);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "UTC" });
}

function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" });
}

function statusBadgeVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
  if (status === "cancelled") return "destructive";
  if (status === "completed") return "secondary";
  return "outline";
}

function NewShiftDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const utils = trpc.useUtils();
  const { data: campuses, isLoading: campusLoading } = trpc.rally.campus.list.useQuery();
  const createShift = trpc.rally.shift.create.useMutation({
    onSuccess: () => {
      utils.rally.shift.list.invalidate();
      utils.rally.shift.gaps.invalidate();
      utils.rally.dashboard.stats.invalidate();
      onClose();
      reset();
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateShiftFormData, unknown, CreateShiftOutput>({
    resolver: zodResolver(createShiftSchema),
    defaultValues: {
      requiredCount: "4",
      shiftType: "Meal_Prep",
      serviceType: "Sunday",
    },
  });

  function onSubmit(data: CreateShiftOutput) {
    createShift.mutate(data);
  }

  if (!open) return null;

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
      <div className="relative z-10 w-full max-w-lg rounded-xl border border-white/10 bg-[#0D1620] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="text-base font-semibold text-white">New Shift</h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-white/40 transition-colors hover:text-white"
          >
            <X className="size-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-5">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/60">
              Campus
            </label>
            <select
              {...register("campusId")}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20"
              disabled={campusLoading}
            >
              <option value="" className="bg-[#0D1620]">Select campus…</option>
              {campuses?.map((c) => (
                <option key={c.id} value={c.id} className="bg-[#0D1620]">
                  {c.name}
                </option>
              ))}
            </select>
            {errors.campusId && (
              <p className="mt-1 text-xs text-red-400">{errors.campusId.message}</p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Date</label>
              <input
                type="date"
                {...register("date")}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 [color-scheme:dark]"
              />
              {errors.date && (
                <p className="mt-1 text-xs text-red-400">{errors.date.message}</p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Start</label>
              <input
                type="time"
                {...register("startTime")}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 [color-scheme:dark]"
              />
              {errors.startTime && (
                <p className="mt-1 text-xs text-red-400">{errors.startTime.message}</p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">End</label>
              <input
                type="time"
                {...register("endTime")}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 [color-scheme:dark]"
              />
              {errors.endTime && (
                <p className="mt-1 text-xs text-red-400">{errors.endTime.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">
                Shift Type
              </label>
              <select
                {...register("shiftType")}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20"
              >
                {SHIFT_TYPES.map((t) => (
                  <option key={t} value={t} className="bg-[#0D1620]">
                    {t.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">
                Service Type
              </label>
              <select
                {...register("serviceType")}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20"
              >
                {SERVICE_TYPES.map((t) => (
                  <option key={t} value={t} className="bg-[#0D1620]">
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/60">
              Required Volunteers
            </label>
            <input
              type="number"
              min={1}
              max={100}
              {...register("requiredCount")}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20"
            />
            {errors.requiredCount && (
              <p className="mt-1 text-xs text-red-400">{errors.requiredCount.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/60">
              Notes (optional)
            </label>
            <textarea
              {...register("notes")}
              rows={2}
              className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20"
            />
          </div>

          {createShift.error && (
            <p className="text-xs text-red-400">
              {createShift.error.message}
            </p>
          )}

          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-white/60 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createShift.isPending}
              className="bg-amber-500 text-black hover:bg-amber-400"
            >
              {createShift.isPending ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : null}
              Create Shift
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ShiftsPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [showNewShift, setShowNewShift] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const utils = trpc.useUtils();
  const { data: shifts, isLoading, isError } = trpc.rally.shift.list.useQuery();
  const deleteShift = trpc.rally.shift.delete.useMutation({
    onSuccess: () => {
      utils.rally.shift.list.invalidate();
      utils.rally.shift.gaps.invalidate();
      utils.rally.dashboard.stats.invalidate();
      setDeletingId(null);
    },
    onError: () => setDeletingId(null),
  });

  const columns = useMemo<ColumnDef<ShiftRow>[]>(
    () => [
      {
        id: "date",
        accessorFn: (r) => r.date,
        header: "Date",
        cell: ({ row }) => (
          <span className="text-sm text-white/90">
            {formatDate(row.original.date)}
          </span>
        ),
      },
      {
        accessorKey: "campus.name",
        header: "Campus",
        cell: ({ getValue }) => (
          <span className="text-sm font-medium text-white">
            {getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "shiftType",
        header: "Shift",
        cell: ({ getValue }) => (
          <span className="text-sm text-white/70">
            {(getValue() as string).replace("_", " ")}
          </span>
        ),
      },
      {
        accessorKey: "serviceType",
        header: "Service",
        cell: ({ getValue }) => (
          <span className="text-sm text-white/70">{getValue() as string}</span>
        ),
      },
      {
        id: "time",
        header: "Time",
        cell: ({ row }) => (
          <span className="text-sm text-white/60">
            {formatTime(row.original.startTime)} – {formatTime(row.original.endTime)}
          </span>
        ),
      },
      {
        id: "fill",
        header: "Fill",
        cell: ({ row }) => {
          const signed = row.original._count.signups;
          const required = row.original.requiredCount;
          const pct = Math.round((signed / Math.max(required, 1)) * 100);
          const full = signed >= required;
          return (
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
                <div
                  className={cn(
                    "h-full rounded-full",
                    full ? "bg-green-500" : pct >= 50 ? "bg-amber-500" : "bg-red-500"
                  )}
                  style={{ width: `${Math.min(pct, 100)}%` }}
                />
              </div>
              <span
                className={cn(
                  "text-xs tabular-nums",
                  full ? "text-green-400" : "text-white/50"
                )}
              >
                {signed}/{required}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const s = getValue() as string;
          return (
            <Badge variant={statusBadgeVariant(s)} className="capitalize text-[11px]">
              {s}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <button
            onClick={() => {
              setDeletingId(row.original.id);
              deleteShift.mutate({ id: row.original.id });
            }}
            disabled={deletingId === row.original.id}
            className="rounded-md p-1.5 text-white/20 transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
          >
            {deletingId === row.original.id ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <Trash2 className="size-3.5" />
            )}
          </button>
        ),
      },
    ],
    [deletingId, deleteShift]
  );

  const table = useReactTable({
    data: (shifts ?? []) as ShiftRow[],
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <div className="space-y-5 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-white">Shifts</h1>
            <p className="mt-0.5 text-sm text-white/40">
              {shifts?.length ?? 0} shifts total
            </p>
          </div>
          <Button
            onClick={() => setShowNewShift(true)}
            className="bg-amber-500 text-black hover:bg-amber-400"
          >
            <Plus className="mr-1.5 size-4" />
            New Shift
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/30" />
          <input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Filter shifts…"
            className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-9 pr-4 text-sm text-white placeholder-white/30 outline-none focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/10"
          />
        </div>

        <div className="overflow-hidden rounded-xl border border-white/8">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="size-6 animate-spin text-white/30" />
            </div>
          ) : isError ? (
            <div className="py-16 text-center text-sm text-red-400">
              Failed to load shifts.
            </div>
          ) : (
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map((hg) => (
                  <tr key={hg.id} className="border-b border-white/8 bg-white/3">
                    {hg.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/40"
                      >
                        {header.isPlaceholder ? null : (
                          <button
                            onClick={header.column.getToggleSortingHandler()}
                            className="inline-flex items-center gap-1"
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.getCanSort() && (
                              <>
                                {header.column.getIsSorted() === "asc" ? (
                                  <ChevronUp className="size-3" />
                                ) : header.column.getIsSorted() === "desc" ? (
                                  <ChevronDown className="size-3" />
                                ) : (
                                  <ChevronsUpDown className="size-3 opacity-40" />
                                )}
                              </>
                            )}
                          </button>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="py-16 text-center text-sm text-white/30"
                    >
                      <CalendarDays className="mx-auto mb-2 size-8 opacity-20" />
                      No shifts found.
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-white/5 transition-colors hover:bg-white/3"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-4 py-3">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <NewShiftDialog
        open={showNewShift}
        onClose={() => setShowNewShift(false)}
      />
    </>
  );
}
