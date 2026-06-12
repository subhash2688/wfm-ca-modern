"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function StaffLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signIn("credentials", {
        email,
        password,
        redirectTo: "/rally/dashboard",
      });
    } catch (err: unknown) {
      setLoading(false);
      const msg = String(err);
      if (msg.includes("NEXT_REDIRECT")) return; // successful redirect
      setError("Invalid email or password.");
    }
  }

  return (
    <main className="min-h-screen bg-[#0A1118] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img
            src="/images/logos/wfm-logo.jpg"
            alt="World Food Movement"
            style={{ width: "200px", height: "auto" }}
            className="rounded-xl mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-white">Staff Login</h1>
          <p className="text-sm text-white/50 mt-1">WFM Rally Dashboard</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-base outline-none focus:ring-2 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                style={{ "--tw-ring-color": "#1A3D5C" } as React.CSSProperties}
                placeholder="you@wfmca.org"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-base outline-none focus:ring-2 focus:border-transparent text-gray-900"
                style={{ "--tw-ring-color": "#1A3D5C" } as React.CSSProperties}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full h-14 rounded-xl font-bold text-base transition-opacity disabled:opacity-50 mt-2"
              style={{ backgroundColor: "#D4A853", color: "#1A3D5C" }}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-white/30 mt-6">
          Staff access only. Unauthorized use is prohibited.
        </p>
      </div>
    </main>
  );
}
