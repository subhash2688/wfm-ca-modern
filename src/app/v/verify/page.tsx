"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const OTP_LENGTH = 6;

export default function VerifyPage() {
  const router = useRouter();
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [phone, setPhone] = useState("");
  const [devCode, setDevCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendState, setResendState] = useState<"idle" | "sending" | "sent">("idle");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const stored = sessionStorage.getItem("rally_phone");
    const code = sessionStorage.getItem("rally_dev_code");
    if (!stored) {
      router.replace("/v/login");
      return;
    }
    setPhone(stored);
    if (code) setDevCode(code);
    inputRefs.current[0]?.focus();
  }, [router]);

  function handleDigitChange(index: number, value: string) {
    const char = value.replace(/\D/g, "").slice(-1);
    setError("");
    const next = [...digits];
    next[index] = char;
    setDigits(next);
    if (char && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    if (next.every((d) => d !== "") && next.join("").length === OTP_LENGTH) {
      submitCode(next.join(""));
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      const next = [...digits];
      next[index - 1] = "";
      setDigits(next);
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!text) return;
    const next = Array(OTP_LENGTH).fill("");
    for (let i = 0; i < text.length; i++) next[i] = text[i];
    setDigits(next);
    const focusIdx = Math.min(text.length, OTP_LENGTH - 1);
    inputRefs.current[focusIdx]?.focus();
    if (text.length === OTP_LENGTH) submitCode(text);
  }

  async function submitCode(code: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/rally/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify-otp", phone, code }),
      });
      const data = (await res.json()) as {
        status?: string;
        volunteerId?: number;
        phone?: string;
        error?: string;
      };
      if (!res.ok || data.error) {
        setError(data.error ?? "Invalid code. Try again.");
        setDigits(Array(OTP_LENGTH).fill(""));
        inputRefs.current[0]?.focus();
        return;
      }
      sessionStorage.removeItem("rally_dev_code");
      if (data.status === "existing") {
        router.push("/v/");
      } else {
        router.push("/v/register");
      }
    } catch {
      setError("Network error. Check your connection.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (!phone || resendState === "sending") return;
    setResendState("sending");
    setError("");
    try {
      const res = await fetch("/api/rally/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "request-otp", phone }),
      });
      const data = (await res.json()) as { ok?: boolean; code?: string };
      if (data.code) {
        sessionStorage.setItem("rally_dev_code", data.code);
        setDevCode(data.code);
      }
      setResendState("sent");
      setTimeout(() => setResendState("idle"), 30_000);
    } catch {
      setError("Could not resend. Try again.");
      setResendState("idle");
    }
  }

  const displayPhone = phone
    ? `(${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7)}`
    : "";

  return (
    <main className="min-h-screen bg-[#0A1118] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/images/logos/wfm-logo.jpg" alt="World Food Movement" width={240} className="rounded-xl mx-auto mb-4 w-60 h-auto" />
          <h1 className="text-2xl font-bold text-white">Enter your code</h1>
          <p className="text-sm text-white/50 mt-2">
            We sent a 6-digit code to{" "}
            <span className="font-medium text-white/80">+1 {displayPhone}</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex gap-2 justify-center" onPaste={handlePaste}>
            {Array.from({ length: OTP_LENGTH }, (_, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digits[i]}
                onChange={(e) => handleDigitChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-12 h-14 text-center text-xl font-semibold border border-gray-300 rounded-xl outline-none focus:ring-2 focus:border-transparent text-gray-900"
                style={{ "--tw-ring-color": "#1A3D5C" } as React.CSSProperties}
                aria-label={`Digit ${i + 1}`}
                disabled={loading}
              />
            ))}
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-600 text-center" role="alert">
              {error}
            </p>
          )}

          {devCode && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-center">
              <p className="text-xs text-amber-700 font-medium">Dev mode — your code:</p>
              <p className="text-lg font-mono font-bold text-amber-900 tracking-widest mt-0.5">
                {devCode}
              </p>
            </div>
          )}

          {loading && (
            <p className="mt-4 text-sm text-gray-500 text-center">Verifying…</p>
          )}

          <div className="mt-6 text-center">
            {resendState === "sent" ? (
              <p className="text-sm text-green-700 font-medium">Code resent!</p>
            ) : (
              <button
                onClick={handleResend}
                disabled={resendState === "sending"}
                className="text-sm font-medium underline-offset-2 hover:underline disabled:opacity-50"
                style={{ color: "#1A3D5C" }}
              >
                {resendState === "sending" ? "Sending…" : "Resend code"}
              </button>
            )}
          </div>
        </div>

        <button
          onClick={() => router.push("/v/login")}
          className="mt-4 w-full text-center text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to login
        </button>
      </div>
    </main>
  );
}
