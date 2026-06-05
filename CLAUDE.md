# WFMCA.ORG — Modern Rebuild

## Project Overview
Nonprofit website for the World Food Movement. Ground-up rebuild from CodeIgniter 3 to Next.js.
- **Old codebase:** `/Users/subbu/Desktop/WFMCA.ORG/wfmca/` (read-only reference)
- **This project:** Next.js 16 + TypeScript + Tailwind 4 + shadcn/ui + Prisma + tRPC + Auth.js

## Tech Stack
- **Framework:** Next.js 16 (App Router) — params/searchParams are Promises, cookies()/headers() are async
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **API:** tRPC v11 (inside Next.js route handlers)
- **Database:** MySQL + Prisma 6 ORM (prisma-client-js)
- **Auth:** Auth.js v5 (NextAuth beta) with email/password + OTP
- **Payments:** Stripe (test mode)
- **Email:** Resend + React Email
- **State:** TanStack React Query (via tRPC)
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts
- **Tables:** TanStack Table
- **QR:** qrcode npm package
- **Animations:** Framer Motion

## Conventions

### File Naming
- Components: PascalCase (`MealCalendar.tsx`)
- Utilities/hooks: camelCase (`useAuth.ts`, `formatDate.ts`)
- Route files: Next.js conventions (`page.tsx`, `layout.tsx`, `route.ts`, `loading.tsx`, `error.tsx`)

### Code Style
- TypeScript strict mode, no `any`
- Prefer `interface` for object shapes, `type` for unions/intersections
- Use Zod schemas for all validation (forms, API inputs)
- Server components by default; add `"use client"` only when needed
- Always `await params` and `await searchParams` in page/layout components (Next.js 16)
- Always `await cookies()` and `await headers()` (Next.js 16)

### Database
- Prisma schema in `prisma/schema.prisma`
- Prisma client imported from `@/lib/db`
- All DB access through tRPC routers (never direct Prisma calls in components)
- Use `@db.Text` / `@db.LongText` for long strings

### API (tRPC)
- Routers in `src/lib/trpc/routers/`
- Procedures use Zod input validation
- Public procedures for read-only public content
- Protected procedures require auth session
- Admin procedures require admin role check

### Auth
- Auth.js config in `src/lib/auth.ts`
- Session includes user id, role, collegeId
- Middleware protects /dashboard and /admin routes
- Role hierarchy: SUPER_ADMIN > COLLEGE_ADMIN > SATTVIC_ADMIN > VOLUNTEER > STUDENT > DONOR

### Components
- shadcn/ui primitives in `src/components/ui/`
- Layout components in `src/components/layout/`
- Feature components co-located with their routes or in `src/components/`

### Testing
- Unit tests: Vitest (`tests/unit/`)
- E2E tests: Playwright (`tests/e2e/`)
- Run: `npm test` (unit), `npm run test:e2e` (E2E)

## Hosting (Production)
DreamHost Shared Unlimited. Static export + Node.js API via Passenger. No Vercel/AWS.

## Key Commands
```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run lint         # ESLint
npm run format       # Prettier
npx prisma migrate dev  # Run migrations
npx prisma db seed   # Seed database
npx prisma studio    # Visual DB browser
npm test             # Unit tests
npm run test:e2e     # E2E tests
```
