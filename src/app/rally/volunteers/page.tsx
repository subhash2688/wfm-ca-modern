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
  Download,
  Search,
  X,
  Loader2,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Users,
  Phone,
  Mail,
  Calendar,
  Star,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

const addVolunteerSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  phone: z.string().min(7, "Enter a valid phone number"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  isYouth: z.boolean().optional().transform((v) => v ?? false),
});

type AddVolunteerFormData = z.input<typeof addVolunteerSchema>;
type AddVolunteerOutput = z.output<typeof addVolunteerSchema>;

type VolunteerRow = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string | null;
  status: string;
  isYouth: boolean;
  preferredCampuses: string[];
  stats: {
    totalShifts: number;
    totalHours: number;
    reliabilityPct: number;
    lastActive: string | null;
    streak: number;
  };
};

type VolunteerDetail = VolunteerRow & {
  signups?: Array<{
    id: number;
    status: string;
    signedUpAt: string | Date;
    shift: {
      date: string | Date;
      shiftType: string;
      campus: { name: string };
    };
  }>;
};

function formatDate(d: string | Date | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function AddVolunteerDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const utils = trpc.useUtils();
  const createVolunteer = trpc.rally.volunteer.create.useMutation({
    onSuccess: () => {
      utils.rally.volunteer.list.invalidate();
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
  } = useForm<AddVolunteerFormData, unknown, AddVolunteerOutput>({
    resolver: zodResolver(addVolunteerSchema),
    defaultValues: { isYouth: false },
  });

  function onSubmit(data: AddVolunteerOutput) {
    createVolunteer.mutate({
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email || undefined,
      isYouth: data.isYouth,
    });
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-xl border border-stone-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
          <h2 className="text-base font-semibold text-stone-900">Add Volunteer</h2>
          <button onClick={onClose} className="rounded-md p-1 text-stone-500 hover:text-stone-900">
            <X className="size-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-stone-600">First Name</label>
              <input
                {...register("firstName")}
                placeholder="Priya"
                className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 placeholder-stone-400 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-200"
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-stone-600">Last Name</label>
              <input
                {...register("lastName")}
                placeholder="Sharma"
                className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 placeholder-stone-400 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-200"
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-stone-600">Phone</label>
            <input
              type="tel"
              {...register("phone")}
              placeholder="(510) 555-1234"
              className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 placeholder-stone-400 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-200"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-stone-600">
              Email (optional)
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="priya@example.com"
              className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 placeholder-stone-400 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-200"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>

          <label className="flex cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              {...register("isYouth")}
              className="size-4 rounded border-stone-300 bg-white accent-amber-500"
            />
            <span className="text-sm text-stone-600">Youth volunteer (under 18)</span>
          </label>

          {createVolunteer.error && (
            <p className="text-xs text-red-600">{createVolunteer.error.message}</p>
          )}

          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="ghost" onClick={onClose} className="text-stone-600 hover:text-stone-900">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createVolunteer.isPending}
              className="bg-amber-500 text-black hover:bg-amber-400"
            >
              {createVolunteer.isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
              Add Volunteer
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function VolunteerDrawer({
  volunteerId,
  onClose,
}: {
  volunteerId: number | null;
  onClose: () => void;
}) {
  const { data, isLoading } = trpc.rally.volunteer.getById.useQuery(
    { id: volunteerId! },
    { enabled: volunteerId !== null }
  );

  const vol = data as VolunteerDetail | null | undefined;

  return (
    <div
      className={cn(
        "fixed inset-y-0 right-0 z-40 flex w-96 flex-col bg-white shadow-2xl transition-transform duration-300 border-l border-stone-200",
        volunteerId !== null ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
        <h2 className="text-base font-semibold text-stone-900">Volunteer Detail</h2>
        <button onClick={onClose} className="rounded-md p-1 text-stone-500 hover:text-stone-900">
          <X className="size-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="size-6 animate-spin text-stone-400" />
          </div>
        ) : !vol ? (
          <p className="py-8 text-center text-sm text-stone-400">Not found.</p>
        ) : (
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-semibold text-stone-900">
                {vol.firstName} {vol.lastName}
              </h3>
              <div className="mt-2 space-y-1.5">
                <div className="flex items-center gap-2 text-sm text-stone-500">
                  <Phone className="size-3.5 shrink-0" />
                  {vol.phone}
                </div>
                {vol.email && (
                  <div className="flex items-center gap-2 text-sm text-stone-500">
                    <Mail className="size-3.5 shrink-0" />
                    {vol.email}
                  </div>
                )}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Badge
                  variant={vol.status === "active" ? "default" : "secondary"}
                  className="capitalize text-[11px]"
                >
                  {vol.status}
                </Badge>
                {vol.isYouth && (
                  <Badge variant="outline" className="text-[11px]">
                    Youth
                  </Badge>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Total Shifts", value: vol.stats.totalShifts, icon: Calendar },
                { label: "Reliability", value: `${Math.round(vol.stats.reliabilityPct)}%`, icon: Star },
                { label: "Total Hours", value: vol.stats.totalHours.toFixed(1), icon: Calendar },
                { label: "Streak", value: `${vol.stats.streak} wks`, icon: ShieldCheck },
              ].map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-lg border border-stone-200 bg-white p-3"
                >
                  <div className="flex items-center gap-1.5 text-stone-500">
                    <Icon className="size-3.5" />
                    <span className="text-[11px] uppercase tracking-wider">{label}</span>
                  </div>
                  <p className="mt-1 text-xl font-bold text-stone-900">{value}</p>
                </div>
              ))}
            </div>

            {vol.stats.lastActive && (
              <p className="text-xs text-stone-400">
                Last active: {formatDate(vol.stats.lastActive)}
              </p>
            )}

            {vol.signups && vol.signups.length > 0 && (
              <div>
                <h4 className="mb-2 text-xs font-medium uppercase tracking-wider text-stone-500">
                  Recent Signups
                </h4>
                <div className="space-y-2">
                  {vol.signups.slice(0, 8).map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center gap-3 rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-stone-700">
                          {s.shift.campus.name}
                        </p>
                        <p className="text-xs text-stone-500">
                          {formatDate(s.shift.date)} · {s.shift.shiftType.replace("_", " ")}
                        </p>
                      </div>
                      <Badge
                        variant={s.status === "checked_in" || s.status === "completed" ? "default" : "secondary"}
                        className="shrink-0 text-[11px] capitalize"
                      >
                        {s.status.replace("_", " ")}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function VolunteersPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [showAddVolunteer, setShowAddVolunteer] = useState(false);
  const [selectedVolunteerId, setSelectedVolunteerId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const utils = trpc.useUtils();
  const { data: volunteers, isLoading, isError } = trpc.rally.volunteer.list.useQuery();
  const deleteVolunteer = trpc.rally.volunteer.delete.useMutation({
    onSuccess: () => {
      utils.rally.volunteer.list.invalidate();
      utils.rally.dashboard.stats.invalidate();
      setDeletingId(null);
    },
    onError: () => setDeletingId(null),
  });

  const { refetch: fetchCsv } = trpc.rally.volunteer.exportCsv.useQuery(undefined, {
    enabled: false,
  });

  async function handleExportCsv() {
    setIsExporting(true);
    try {
      const result = await fetchCsv();
      if (result.data) {
        const blob = new Blob([result.data], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `rally-volunteers-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } finally {
      setIsExporting(false);
    }
  }

  const columns = useMemo<ColumnDef<VolunteerRow>[]>(
    () => [
      {
        id: "name",
        header: "Name",
        accessorFn: (r) => `${r.firstName} ${r.lastName}`,
        cell: ({ row }) => (
          <div>
            <p className="text-sm font-medium text-stone-900">
              {row.original.firstName} {row.original.lastName}
            </p>
            {row.original.isYouth && (
              <p className="text-[11px] text-amber-600">Youth</p>
            )}
          </div>
        ),
      },
      {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ getValue }) => (
          <span className="text-sm text-stone-600 tabular-nums">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const s = getValue() as string;
          return (
            <Badge
              variant={s === "active" ? "default" : "secondary"}
              className="capitalize text-[11px]"
            >
              {s}
            </Badge>
          );
        },
      },
      {
        id: "totalShifts",
        header: "Shifts",
        accessorFn: (r) => r.stats.totalShifts,
        cell: ({ getValue }) => (
          <span className="text-sm tabular-nums text-stone-600">{getValue() as number}</span>
        ),
      },
      {
        id: "reliability",
        header: "Reliability",
        accessorFn: (r) => r.stats.reliabilityPct,
        cell: ({ getValue }) => {
          const pct = Math.round(getValue() as number);
          return (
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-14 overflow-hidden rounded-full bg-stone-200">
                <div
                  className={cn(
                    "h-full rounded-full",
                    pct >= 80 ? "bg-green-500" : pct >= 50 ? "bg-amber-500" : "bg-red-500"
                  )}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs tabular-nums text-stone-500">{pct}%</span>
            </div>
          );
        },
      },
      {
        id: "lastActive",
        header: "Last Active",
        accessorFn: (r) => r.stats.lastActive,
        cell: ({ getValue }) => (
          <span className="text-sm text-stone-500">{formatDate(getValue() as string | null)}</span>
        ),
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDeletingId(row.original.id);
                deleteVolunteer.mutate({ id: row.original.id });
              }}
              disabled={deletingId === row.original.id}
              className="rounded-md p-1.5 text-stone-300 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
            >
              {deletingId === row.original.id ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Trash2 className="size-3.5" />
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedVolunteerId(row.original.id);
              }}
              className="rounded-md p-1.5 text-stone-300 transition-colors hover:bg-stone-50 hover:text-stone-600"
            >
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        ),
      },
    ],
    [deletingId, deleteVolunteer]
  );

  const table = useReactTable({
    data: (volunteers ?? []) as VolunteerRow[],
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
            <h1 className="text-xl font-semibold text-stone-900">Volunteers</h1>
            <p className="mt-0.5 text-sm text-stone-500">
              {volunteers?.length ?? 0} volunteers total
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleExportCsv}
              disabled={isExporting}
              className="border-stone-200 bg-white text-stone-600 hover:bg-stone-100 hover:text-stone-900"
            >
              {isExporting ? (
                <Loader2 className="mr-1.5 size-4 animate-spin" />
              ) : (
                <Download className="mr-1.5 size-4" />
              )}
              Export CSV
            </Button>
            <Button
              onClick={() => setShowAddVolunteer(true)}
              className="bg-amber-500 text-black hover:bg-amber-400"
            >
              <Plus className="mr-1.5 size-4" />
              Add Volunteer
            </Button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
          <input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search by name or phone…"
            className="w-full rounded-lg border border-stone-200 bg-white py-2 pl-9 pr-4 text-sm text-stone-900 placeholder-stone-400 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-100"
          />
        </div>

        <div className="overflow-hidden rounded-xl border border-stone-200">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="size-6 animate-spin text-stone-400" />
            </div>
          ) : isError ? (
            <div className="py-16 text-center text-sm text-red-600">
              Failed to load volunteers.
            </div>
          ) : (
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map((hg) => (
                  <tr key={hg.id} className="border-b border-stone-200 bg-stone-50">
                    {hg.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500"
                      >
                        {header.isPlaceholder ? null : (
                          <button
                            onClick={header.column.getToggleSortingHandler()}
                            className="inline-flex items-center gap-1"
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
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
                    <td colSpan={columns.length} className="py-16 text-center text-sm text-stone-400">
                      <Users className="mx-auto mb-2 size-8 opacity-20" />
                      No volunteers found.
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedVolunteerId(row.original.id)}
                      className="cursor-pointer border-b border-stone-100 transition-colors hover:bg-stone-50"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-4 py-3">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
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

      {selectedVolunteerId !== null && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setSelectedVolunteerId(null)}
        />
      )}
      <VolunteerDrawer
        volunteerId={selectedVolunteerId}
        onClose={() => setSelectedVolunteerId(null)}
      />

      <AddVolunteerDialog
        open={showAddVolunteer}
        onClose={() => setShowAddVolunteer(false)}
      />
    </>
  );
}
