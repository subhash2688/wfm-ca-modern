"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { trpc } from "@/lib/trpc/client";

function formatPhone(p: string): string {
  const d = p.replace(/\D/g, "");
  const local = d.startsWith("1") ? d.slice(1) : d;
  if (local.length === 10) {
    return `(${local.slice(0, 3)}) ${local.slice(3, 6)}-${local.slice(6)}`;
  }
  return p;
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 text-center">
      <p className="text-xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const utils = trpc.useUtils();

  const { data: me, isLoading, error } = trpc.rallyVolunteer.me.useQuery();
  const updateProfile = trpc.rallyVolunteer.updateProfile.useMutation({
    onSuccess: () => utils.rallyVolunteer.me.invalidate(),
  });

  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    if (me) {
      setFirstName(me.firstName);
      setLastName(me.lastName);
      setEmail(("email" in me && typeof me.email === "string" ? me.email : "") ?? "");
    }
  }, [me]);

  async function handleSave() {
    setSaveError("");
    try {
      await updateProfile.mutateAsync({
        firstName: firstName.trim() || undefined,
        lastName: lastName.trim() || undefined,
        email: email.trim() || undefined,
      });
      setEditing(false);
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Could not save changes.");
    }
  }

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/rally/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });
      router.push("/v/login");
    } catch {
      setLoggingOut(false);
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        <div className="h-6 w-24 bg-gray-100 rounded animate-pulse" />
        <div className="bg-white rounded-2xl border border-gray-100 h-40 animate-pulse" />
      </div>
    );
  }

  if (error || !me) {
    return (
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-sm text-red-700">
          Could not load profile.
        </div>
      </div>
    );
  }

  const badges = Array.isArray(me.badges) ? me.badges as { emoji: string; label: string }[] : [];

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-4">
      <h1 className="text-xl font-bold text-gray-900">Profile</h1>

      {/* Identity card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
            style={{ backgroundColor: "#2D6A4F" }}
          >
            {me.firstName[0]}{me.lastName[0]}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-lg leading-tight">
              {me.firstName} {me.lastName}
            </p>
            <p className="text-sm text-gray-500">{formatPhone(me.phone)}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          <StatCard label="Shifts" value={me.stats.totalShifts} />
          <StatCard label="Hours" value={me.stats.totalHours} />
          <StatCard label="Streak" value={`${me.stats.streak}w`} />
          <StatCard label="Reliable" value={`${me.stats.reliabilityPct}%`} />
        </div>
      </div>

      {/* Badges */}
      {badges.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Badges earned</h2>
          <div className="flex flex-wrap gap-2">
            {badges.map((b) => (
              <span
                key={b.label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-800 text-sm font-medium rounded-full border border-green-100"
              >
                <span>{b.emoji}</span>
                <span>{b.label}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Edit section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-semibold text-gray-700">Edit profile</h2>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="text-sm font-medium"
              style={{ color: "#2D6A4F" }}
            >
              Edit
            </button>
          )}
        </div>

        {!editing ? (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">First name</span>
              <span className="text-gray-900 font-medium">{me.firstName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Last name</span>
              <span className="text-gray-900 font-medium">{me.lastName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Email</span>
              <span className="text-gray-900 font-medium">
                {"email" in me && me.email ? String(me.email) : "—"}
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {saveError && (
              <p className="text-sm text-red-600">{saveError}</p>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">First name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:border-transparent"
                  style={{ "--tw-ring-color": "#2D6A4F" } as React.CSSProperties}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Last name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:border-transparent"
                  style={{ "--tw-ring-color": "#2D6A4F" } as React.CSSProperties}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:border-transparent"
                style={{ "--tw-ring-color": "#2D6A4F" } as React.CSSProperties}
                placeholder="optional"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <button
                onClick={handleSave}
                disabled={updateProfile.isPending}
                className="flex-1 h-11 rounded-xl text-white font-semibold text-sm disabled:opacity-50"
                style={{ backgroundColor: "#2D6A4F" }}
              >
                {updateProfile.isPending ? "Saving…" : "Save changes"}
              </button>
              <button
                onClick={() => { setEditing(false); setSaveError(""); }}
                className="flex-1 h-11 rounded-xl font-semibold text-sm border border-gray-300 text-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        disabled={loggingOut}
        className="w-full h-12 rounded-xl border border-red-200 bg-red-50 text-red-600 font-semibold text-sm disabled:opacity-50 transition-colors hover:bg-red-100"
      >
        {loggingOut ? "Signing out…" : "Sign out"}
      </button>
    </div>
  );
}
