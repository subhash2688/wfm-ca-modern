"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

function formatPhoneDisplay(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const digits = phone.replace(/\D/g, "");
  const isValid = digits.length === 10;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(formatPhoneDisplay(raw));
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/rally/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "request-otp", phone: digits }),
      });
      const data = (await res.json()) as { ok?: boolean; devCode?: string; code?: string; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Something went wrong. Try again.");
        return;
      }
      sessionStorage.setItem("rally_phone", digits);
      if (data.code) sessionStorage.setItem("rally_dev_code", data.code);
      router.push("/v/verify");
    } catch {
      setError("Network error. Check your connection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ backgroundColor: "#2D6A4F" }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
              <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4z" fill="white" fillOpacity="0.2" />
              <path d="M10 16c0-3.314 2.686-6 6-6s6 2.686 6 6-2.686 6-6 6-6-2.686-6-6z" fill="white" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Rally</h1>
          <p className="text-gray-500 mt-1 text-sm">World Food Movement volunteer app</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Sign in</h2>
          <p className="text-sm text-gray-500 mb-6">
            Enter your mobile number. We&apos;ll send a one-time code.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone number
            </label>
            <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:border-transparent"
              style={{ "--tw-ring-color": "#2D6A4F" } as React.CSSProperties}
            >
              <span className="pl-4 pr-2 text-gray-500 text-sm select-none">+1</span>
              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="(555) 000-0000"
                value={phone}
                onChange={handleChange}
                className="flex-1 py-4 pr-4 text-base bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
                aria-describedby={error ? "phone-error" : undefined}
                aria-invalid={!!error}
              />
            </div>

            {error && (
              <p id="phone-error" className="mt-2 text-sm text-red-600" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={!isValid || loading}
              className="mt-4 w-full h-14 rounded-xl text-white font-semibold text-base transition-opacity disabled:opacity-50"
              style={{ backgroundColor: "#2D6A4F" }}
            >
              {loading ? "Sending code…" : "Send code"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          By continuing you agree to receive SMS for verification.
        </p>
      </div>
    </main>
  );
}
