import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { Role } from "@prisma/client";

export const authConfig = {
  providers: [Credentials({})],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.collegeId = user.collegeId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role as Role;
        session.user.collegeId = token.collegeId as number | null;
      }
      return session;
    },
  },
  pages: { signIn: "/login", error: "/login" },
  session: { strategy: "jwt" },
} satisfies NextAuthConfig;
