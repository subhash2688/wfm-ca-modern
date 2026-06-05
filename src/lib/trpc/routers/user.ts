import { z } from "zod";
import { hash } from "bcryptjs";
import { TRPCError } from "@trpc/server";
import { router, publicProcedure, protectedProcedure, adminProcedure } from "@/lib/trpc/init";
import { db } from "@/lib/db";

export const userRouter = router({
  register: publicProcedure
    .input(
      z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        email: z.string().email("Invalid email"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        role: z.enum(["STUDENT", "VOLUNTEER", "DONOR"]).default("STUDENT"),
        phone: z.string().optional(),
        collegeId: z.number().int().positive().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const existing = await db.user.findUnique({ where: { email: input.email } });
      if (existing) {
        throw new TRPCError({ code: "CONFLICT", message: "An account with this email already exists." });
      }

      const hashed = await hash(input.password, 12);
      const user = await db.user.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          password: hashed,
          role: input.role,
          phone: input.phone,
          collegeId: input.collegeId,
          status: "ACTIVE",
        },
        select: { id: true, email: true },
      });

      return user;
    }),

  requestPasswordReset: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      const user = await db.user.findUnique({ where: { email: input.email } });
      if (user && user.status === "ACTIVE") {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

        await db.user.update({
          where: { id: user.id },
          data: { otpCode: otp, otpExpiresAt: expiresAt },
        });

        // TODO: send via Resend once email is configured
        if (process.env.NODE_ENV === "development") {
          console.log(`[DEV] Password reset OTP for ${input.email}: ${otp}`);
        }
      }
      // Always return success to avoid email enumeration
      return { success: true };
    }),

  resetPassword: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        otp: z.string().length(6, "Code must be 6 digits"),
        password: z.string().min(8, "Password must be at least 8 characters"),
      }),
    )
    .mutation(async ({ input }) => {
      const user = await db.user.findUnique({ where: { email: input.email } });

      if (
        !user ||
        user.otpCode !== input.otp ||
        !user.otpExpiresAt ||
        user.otpExpiresAt < new Date()
      ) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid or expired reset code." });
      }

      const hashed = await hash(input.password, 12);
      await db.user.update({
        where: { id: user.id },
        data: { password: hashed, otpCode: null, otpExpiresAt: null },
      });

      return { success: true };
    }),

  me: protectedProcedure.query(async ({ ctx }) => {
    return db.user.findUnique({
      where: { id: Number(ctx.session.user.id) },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        gender: true,
        qrCode: true,
        college: { select: { id: true, name: true } },
        createdAt: true,
        lastLoginAt: true,
      },
    });
  }),

  adminList: adminProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        pageSize: z.number().min(1).max(100).default(20),
        role: z.enum(["SUPER_ADMIN", "COLLEGE_ADMIN", "SATTVIC_ADMIN", "VOLUNTEER", "STUDENT", "DONOR"]).optional(),
        search: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      const where = {
        ...(input.role && { role: input.role }),
        ...(input.search && {
          OR: [
            { firstName: { contains: input.search } },
            { lastName: { contains: input.search } },
            { email: { contains: input.search } },
          ],
        }),
      };

      const [users, total] = await Promise.all([
        db.user.findMany({
          where,
          skip: (input.page - 1) * input.pageSize,
          take: input.pageSize,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
            status: true,
            college: { select: { name: true } },
            createdAt: true,
            lastLoginAt: true,
          },
        }),
        db.user.count({ where }),
      ]);

      return { users, total, pages: Math.ceil(total / input.pageSize) };
    }),
});
