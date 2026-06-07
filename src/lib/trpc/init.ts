import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { auth } from "@/lib/auth";
import type { Role } from "@prisma/client";

export async function createTRPCContext() {
  const session = await auth();
  return { session };
}

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<TRPCContext>().create({ transformer: superjson });

export const router = t.router;
export const publicProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session?.user) throw new TRPCError({ code: "UNAUTHORIZED" });
  return next({ ctx: { session: ctx.session } });
});

const ADMIN_ROLES: Role[] = ["SUPER_ADMIN", "COLLEGE_ADMIN", "SATTVIC_ADMIN"];

export const adminProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session?.user || !ADMIN_ROLES.includes(ctx.session.user.role)) {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
  return next({ ctx: { session: ctx.session } });
});
