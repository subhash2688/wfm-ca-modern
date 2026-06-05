"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import { trpc } from "@/lib/trpc/client";

const schema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    role: z.enum(["STUDENT", "VOLUNTEER", "DONOR"]),
    phone: z.string().optional(),
    collegeId: z.string().optional(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

const ROLES = [
  { value: "STUDENT", label: "Student", description: "I need meal support" },
  { value: "VOLUNTEER", label: "Volunteer", description: "I want to help deliver meals" },
  { value: "DONOR", label: "Donor", description: "I want to fund meals" },
] as const;

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { data: colleges } = trpc.college.list.useQuery();

  const registerMutation = trpc.user.register.useMutation();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { role: "STUDENT" },
  });

  const selectedRole = watch("role");
  const needsCollege = selectedRole === "STUDENT" || selectedRole === "VOLUNTEER";

  const onSubmit = async (data: FormValues) => {
    try {
      await registerMutation.mutateAsync({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        role: data.role,
        phone: data.phone || undefined,
        collegeId: data.collegeId ? parseInt(data.collegeId) : undefined,
      });

      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        router.push("/login");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      if (message.includes("already exists")) {
        setError("email", { message: "An account with this email already exists." });
      } else {
        setError("root", { message });
      }
    }
  };

  return (
    <div className="w-full max-w-lg">
      <div className="mb-8 text-center">
        <h1 className="font-heading text-3xl font-bold text-[#1A1A1A]">Create an account</h1>
        <p className="mt-2 text-[#6B7280]">Join the World Food Movement community</p>
      </div>

      <div className="rounded-2xl border border-[#E5E2DD] bg-white p-8 shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {errors.root && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errors.root.message}
            </div>
          )}

          {/* Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
                First name
              </label>
              <input
                {...register("firstName")}
                type="text"
                autoComplete="given-name"
                placeholder="Jane"
                className="w-full rounded-lg border border-[#E5E2DD] px-4 py-2.5 text-[#1A1A1A] placeholder-[#9CA3AF] outline-none transition focus:border-[#1A3D5C] focus:ring-2 focus:ring-[#1A3D5C]/10"
              />
              {errors.firstName && (
                <p className="mt-1.5 text-xs text-red-600">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
                Last name
              </label>
              <input
                {...register("lastName")}
                type="text"
                autoComplete="family-name"
                placeholder="Doe"
                className="w-full rounded-lg border border-[#E5E2DD] px-4 py-2.5 text-[#1A1A1A] placeholder-[#9CA3AF] outline-none transition focus:border-[#1A3D5C] focus:ring-2 focus:ring-[#1A3D5C]/10"
              />
              {errors.lastName && (
                <p className="mt-1.5 text-xs text-red-600">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
              Email address
            </label>
            <input
              {...register("email")}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-[#E5E2DD] px-4 py-2.5 text-[#1A1A1A] placeholder-[#9CA3AF] outline-none transition focus:border-[#1A3D5C] focus:ring-2 focus:ring-[#1A3D5C]/10"
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">Password</label>
            <div className="relative">
              <input
                {...register("password")}
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
            {errors.password && (
              <p className="mt-1.5 text-xs text-red-600">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
              Confirm password
            </label>
            <div className="relative">
              <input
                {...register("confirmPassword")}
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
            {errors.confirmPassword && (
              <p className="mt-1.5 text-xs text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#1A1A1A]">I am a…</label>
            <div className="grid grid-cols-3 gap-3">
              {ROLES.map(({ value, label, description }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setValue("role", value, { shouldValidate: true })}
                  className={`rounded-lg border px-3 py-3 text-left transition ${
                    selectedRole === value
                      ? "border-[#1A3D5C] bg-[#1A3D5C]/5 ring-2 ring-[#1A3D5C]/20"
                      : "border-[#E5E2DD] hover:border-[#1A3D5C]/40"
                  }`}
                >
                  <p className="text-sm font-semibold text-[#1A1A1A]">{label}</p>
                  <p className="mt-0.5 text-xs text-[#6B7280]">{description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* College (conditional) */}
          {needsCollege && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
                College / University{" "}
                <span className="font-normal text-[#9CA3AF]">(optional)</span>
              </label>
              <select
                {...register("collegeId")}
                className="w-full rounded-lg border border-[#E5E2DD] px-4 py-2.5 text-[#1A1A1A] outline-none transition focus:border-[#1A3D5C] focus:ring-2 focus:ring-[#1A3D5C]/10"
              >
                <option value="">Select your college…</option>
                {colleges?.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Phone (optional) */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#1A1A1A]">
              Phone number{" "}
              <span className="font-normal text-[#9CA3AF]">(optional)</span>
            </label>
            <input
              {...register("phone")}
              type="tel"
              autoComplete="tel"
              placeholder="+1 (555) 000-0000"
              className="w-full rounded-lg border border-[#E5E2DD] px-4 py-2.5 text-[#1A1A1A] placeholder-[#9CA3AF] outline-none transition focus:border-[#1A3D5C] focus:ring-2 focus:ring-[#1A3D5C]/10"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-[#1A3D5C] px-6 py-3 font-semibold text-white transition hover:bg-[#15324d] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Creating account…" : "Create account"}
          </button>
        </form>
      </div>

      <p className="mt-6 text-center text-sm text-[#6B7280]">
        Already have an account?{" "}
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
