"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, ArrowLeft, CheckCircle2 } from "lucide-react";
import { trpc } from "@/lib/trpc/client";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

const resetSchema = z
  .object({
    otp: z.string().length(6, "Code must be exactly 6 digits").regex(/^\d+$/, "Digits only"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type EmailValues = z.infer<typeof emailSchema>;
type ResetValues = z.infer<typeof resetSchema>;

type Step = "email" | "reset" | "done";

export function ForgotPasswordForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const requestReset = trpc.user.requestPasswordReset.useMutation();
  const resetPassword = trpc.user.resetPassword.useMutation();

  const emailForm = useForm<EmailValues>({ resolver: zodResolver(emailSchema) });
  const resetForm = useForm<ResetValues>({ resolver: zodResolver(resetSchema) });

  const onEmailSubmit = async (data: EmailValues) => {
    await requestReset.mutateAsync({ email: data.email });
    setSubmittedEmail(data.email);
    setStep("reset");
  };

  const onResetSubmit = async (data: ResetValues) => {
    try {
      await resetPassword.mutateAsync({
        email: submittedEmail,
        otp: data.otp,
        password: data.password,
      });
      setStep("done");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Invalid or expired code. Please try again.";
      resetForm.setError("otp", { message });
    }
  };

  if (step === "done") {
    return (
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-[#1A1A1A]">Password updated</h1>
        <p className="mt-3 text-[#6B7280]">
          Your password has been reset. You can now sign in with your new password.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="mt-8 w-full rounded-lg bg-[#1A3D5C] px-6 py-3 font-semibold text-white transition hover:bg-[#15324d]"
        >
          Go to sign in
        </button>
      </div>
    );
  }

  if (step === "reset") {
    return (
      <div className="w-full max-w-md">
        <button
          type="button"
          onClick={() => setStep("email")}
          className="mb-6 flex items-center gap-1.5 text-sm text-[#6B7280] transition-colors hover:text-[#1A3D5C]"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-[#1A1A1A]">Enter reset code</h1>
          <p className="mt-2 text-[#6B7280]">
            We sent a 6-digit code to{" "}
            <span className="font-medium text-[#1A1A1A]">{submittedEmail}</span>. Enter it below
            along with your new password.
          </p>
        </div>

        <div className="rounded-2xl border border-[#E5E2DD] bg-white p-8 shadow-sm">
          <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
                6-digit code
              </label>
              <input
                {...resetForm.register("otp")}
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="123456"
                className="w-full rounded-lg border border-[#E5E2DD] px-4 py-2.5 text-center text-xl font-mono tracking-[0.4em] text-[#1A1A1A] placeholder-[#9CA3AF] outline-none transition focus:border-[#1A3D5C] focus:ring-2 focus:ring-[#1A3D5C]/10"
              />
              {resetForm.formState.errors.otp && (
                <p className="mt-1.5 text-xs text-red-600">
                  {resetForm.formState.errors.otp.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
                New password
              </label>
              <div className="relative">
                <input
                  {...resetForm.register("password")}
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  className="w-full rounded-lg border border-[#E5E2DD] px-4 py-2.5 pr-11 text-[#1A1A1A] placeholder-[#9CA3AF] outline-none transition focus:border-[#1A3D5C] focus:ring-2 focus:ring-[#1A3D5C]/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] transition-colors hover:text-[#6B7280]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {resetForm.formState.errors.password && (
                <p className="mt-1.5 text-xs text-red-600">
                  {resetForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
                Confirm new password
              </label>
              <div className="relative">
                <input
                  {...resetForm.register("confirmPassword")}
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-[#E5E2DD] px-4 py-2.5 pr-11 text-[#1A1A1A] placeholder-[#9CA3AF] outline-none transition focus:border-[#1A3D5C] focus:ring-2 focus:ring-[#1A3D5C]/10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] transition-colors hover:text-[#6B7280]"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {resetForm.formState.errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-red-600">
                  {resetForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={resetForm.formState.isSubmitting}
              className="w-full rounded-lg bg-[#1A3D5C] px-6 py-3 font-semibold text-white transition hover:bg-[#15324d] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {resetForm.formState.isSubmitting ? "Resetting…" : "Reset password"}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-sm text-[#6B7280]">
          Didn&apos;t receive a code?{" "}
          <button
            type="button"
            onClick={() => emailForm.handleSubmit(onEmailSubmit)()}
            className="font-semibold text-[#1A3D5C] transition-colors hover:text-[#D4A853]"
          >
            Resend
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-[#1A1A1A]">Reset your password</h1>
        <p className="mt-2 text-[#6B7280]">
          Enter your email and we&apos;ll send you a 6-digit reset code.
        </p>
      </div>

      <div className="rounded-2xl border border-[#E5E2DD] bg-white p-8 shadow-sm">
        <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
              Email address
            </label>
            <input
              {...emailForm.register("email")}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-[#E5E2DD] px-4 py-2.5 text-[#1A1A1A] placeholder-[#9CA3AF] outline-none transition focus:border-[#1A3D5C] focus:ring-2 focus:ring-[#1A3D5C]/10"
            />
            {emailForm.formState.errors.email && (
              <p className="mt-1.5 text-xs text-red-600">
                {emailForm.formState.errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={emailForm.formState.isSubmitting}
            className="w-full rounded-lg bg-[#1A3D5C] px-6 py-3 font-semibold text-white transition hover:bg-[#15324d] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {emailForm.formState.isSubmitting ? "Sending…" : "Send reset code"}
          </button>
        </form>
      </div>

      <p className="mt-6 text-center text-sm text-[#6B7280]">
        Remember your password?{" "}
        <Link
          href="/login"
          className="font-semibold text-[#1A3D5C] transition-colors hover:text-[#D4A853]"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
