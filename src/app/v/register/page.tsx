"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isYouth, setIsYouth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const stored = sessionStorage.getItem("rally_phone");
    if (!stored) {
      router.replace("/v/login");
      return;
    }
    setPhone(stored);
  }, [router]);

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!firstName.trim()) errs.firstName = "First name is required";
    if (!lastName.trim()) errs.lastName = "Last name is required";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Enter a valid email address";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/rally/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "register",
          phone,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim() || undefined,
          isYouth,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setErrors({ form: data.error ?? "Registration failed. Try again." });
        return;
      }
      sessionStorage.removeItem("rally_phone");
      sessionStorage.removeItem("rally_dev_code");
      router.push("/v/");
    } catch {
      setErrors({ form: "Network error. Check your connection." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/images/logos/wfm-logo.jpg" alt="WFM" width={48} height={48} className="rounded-xl mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white">Create your account</h1>
          <p className="text-sm text-white/50 mt-2">
            Just a few details to get you started.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {errors.form && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{errors.form}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1.5">
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => { setFirstName(e.target.value); setErrors((p) => ({ ...p, firstName: "" })); }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-base outline-none focus:ring-2 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                  style={{ "--tw-ring-color": "#1A3D5C" } as React.CSSProperties}
                  placeholder="Alex"
                  aria-invalid={!!errors.firstName}
                  aria-describedby={errors.firstName ? "firstName-error" : undefined}
                />
                {errors.firstName && (
                  <p id="firstName-error" className="mt-1 text-xs text-red-600">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => { setLastName(e.target.value); setErrors((p) => ({ ...p, lastName: "" })); }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-base outline-none focus:ring-2 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                  style={{ "--tw-ring-color": "#1A3D5C" } as React.CSSProperties}
                  placeholder="Smith"
                  aria-invalid={!!errors.lastName}
                  aria-describedby={errors.lastName ? "lastName-error" : undefined}
                />
                {errors.lastName && (
                  <p id="lastName-error" className="mt-1 text-xs text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-base outline-none focus:ring-2 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                style={{ "--tw-ring-color": "#1A3D5C" } as React.CSSProperties}
                placeholder="alex@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            <label className="flex items-start gap-3 cursor-pointer py-1">
              <div className="relative flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={isYouth}
                  onChange={(e) => setIsYouth(e.target.checked)}
                  className="sr-only peer"
                  id="isYouth"
                />
                <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:border-0 peer-checked:bg-[#1A3D5C] transition-colors flex items-center justify-center">
                  {isYouth && (
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" aria-hidden>
                      <path d="M1 4l3.5 3.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">I am a youth volunteer</span>
                <p className="text-xs text-gray-500 mt-0.5">Under 18 — parental consent required</p>
              </div>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-xl font-bold text-base transition-opacity disabled:opacity-50 mt-2"
              style={{ backgroundColor: "#D4A853", color: "#1A3D5C" }}
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
