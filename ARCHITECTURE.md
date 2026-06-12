# WFMCA.ORG — Architecture One-Pager

**Audience:** New engineer joining the project. Use alongside `CLAUDE.md` (conventions) and `HANDOFF.md` (current state / open items).

---

## What this is

Two products in one Next.js 16 monorepo, built for the **World Food Movement CA** nonprofit (feeds California community college students):

1. **Public marketing site** (`/`) — donations, programs, news, contact, get-involved.
2. **Rally** (`/rally/*` staff + `/v/*` volunteer) — meal-shift scheduling, volunteer roster, gap-filling.

Replaces an old CodeIgniter 3 / MySQL / DreamHost stack. Going live = DNS flip (currently soft-launched on `*.vercel.app`).

---

## Stack at a glance

| Layer        | Choice                                              |
|--------------|-----------------------------------------------------|
| Framework    | Next.js 16 (App Router, Turbopack, RSC by default)  |
| Language     | TypeScript strict                                   |
| Styling      | Tailwind 4 + shadcn/ui                              |
| API          | tRPC v11 (inside `/api/trpc/[trpc]`)                |
| DB           | PostgreSQL on Supabase + Prisma 6                   |
| Auth         | Auth.js v5 (staff email/password) + OTP-via-phone (volunteers, custom route at `/api/rally/auth`) |
| Email        | Resend (transactional placeholder) → Neon One (planned for subscribers) |
| Payments     | Stripe (test) — final choice between Stripe vs Neon Pay TBD |
| Hosting      | Vercel                                              |
| Map          | Leaflet + OpenStreetMap                             |
| Animations   | Framer Motion (`FadeIn`, `Stagger*` wrappers)       |

---

## Repo layout

```
src/
├── app/
│   ├── (public)/        # Marketing site routes — page.tsx, about-us, donate, news, programs, contact…
│   ├── rally/           # Staff dashboard (auth-gated): dashboard, shifts, volunteers, gaps
│   ├── v/                # Volunteer app (auth-gated via OTP): home, my-shifts, profile, register
│   ├── api/             # Route handlers — trpc, auth, subscribe, rally/auth
│   └── layout.tsx       # Root layout (fonts, providers)
├── components/          # Shared UI — CampusMap, LinkedInFeed, InstagramFeed, YouTubeFeed, layout/, ui/
├── lib/
│   ├── trpc/            # Routers, client/server helpers
│   ├── data/            # Static data (campuses + coords)
│   ├── rally/           # Rally domain services (matching, scoring, badges)
│   ├── rss.ts           # Generic RSS feed parser (LinkedIn + Instagram)
│   ├── linkedin.ts      # Thin wrapper → rss.ts
│   ├── instagram.ts     # Thin wrapper → rss.ts
│   ├── youtube.ts       # YouTube Data API fetch + fallback list
│   ├── auth.ts          # Auth.js config
│   └── db.ts            # Prisma client singleton
├── data/                # Editorial static content (blogs, news)
└── middleware.ts        # Route protection for /rally and /v
prisma/
├── schema.prisma        # All models (User + Rally* prefix)
├── migrations/          # Migration history
└── seed.ts              # Seeds 8 WFM campuses + test volunteers/shifts
```

---

## Data model (essentials)

- **`User`** — staff users (Auth.js). Roles: SUPER_ADMIN > COLLEGE_ADMIN > SATTVIC_ADMIN > VOLUNTEER > STUDENT > DONOR.
- **`RallyCampus`** — 8 partner campuses (synced from `src/lib/data/campuses.ts` via seed).
- **`RallyVolunteer`** — volunteer profile, preferences, availability JSON, OTP fields.
- **`RallyShift`** — date, time, campus, `shiftType` (Meal_Prep / Packing / Delivery / …), `serviceType` (Catered_Meal / Pre_packed_Meal), `requiredCount`.
- **`RallySignup`** — volunteer ↔ shift join with status (signed_up / confirmed / checked_in / completed / no_show / cancelled).
- **`RallyActivityLog`** — audit trail surfaced on the dashboard.

Donor and email-subscriber data is **not** in our DB — lives in **Neon One CRM** (external).

---

## How data flows

```
Browser ──► tRPC (route handler) ──► Prisma ──► Supabase Postgres
   │
   ├──► Next.js fetch (server, revalidated) ──► RSS bridges (LinkedIn, Instagram)
   ├──► Next.js fetch (server, revalidated) ──► YouTube Data API v3
   ├──► /api/subscribe ──► Neon One REST API (planned; currently Resend placeholder)
   └──► Stripe.js (client) ──► Stripe Checkout (planned)
```

All DB access goes through tRPC routers — **never call Prisma from a component**. Public procedures for read-only content, protected for auth'd, admin for role-gated.

---

## External services

| Service     | Used for                                        | Where credentials live    |
|-------------|--------------------------------------------------|----------------------------|
| Supabase    | Primary Postgres                                 | `DATABASE_URL`             |
| Neon One    | Donor CRM, email subscribers                     | `NEON_ONE_*` (pending)     |
| Resend      | Transactional email (placeholder)                | `RESEND_API_KEY`           |
| Stripe      | Donations (pending decision vs Neon Pay)         | `STRIPE_*`                 |
| YouTube     | Homepage video feed                              | `YOUTUBE_API_KEY` (pending)|
| rss.app     | LinkedIn + Instagram feed bridges                | `LINKEDIN_RSS_URL`, `INSTAGRAM_RSS_URL` (have defaults) |
| OpenStreetMap | Campus map tiles                               | no key needed              |

⚠ Instagram images currently broken — IG CDN returns 403 on cross-origin hotlinks. Fix path: move from rss.app to Instagram Graph API (see `HANDOFF.md`).

---

## Key flows

- **Donation:** `/donate` → `DonationSelector` (monthly default, $96/mo hero) → Stripe/Neon Pay (TBD).
- **Email capture:** footer + `/donate` exit-intent popover → `/api/subscribe` → Resend (→ Neon One).
- **Volunteer signup:** `/v/register` → OTP via SMS → `/v/profile` → browse `/v/shifts` → join.
- **Staff scheduling:** `/rally/shifts` (CRUD) → `/rally/gaps` (suggests volunteers via scoring in `lib/rally/services.ts`) → click "Add to Shift".
- **News/updates:** `/news` = static editorial (`data/news.ts`) + LinkedIn RSS + Instagram RSS.

---

## Auth & route protection

- `middleware.ts` protects `/rally/*` (staff session) and `/v/(app)/*` (volunteer cookie).
- Staff session shape (in `lib/auth.ts`): `{ id, role, collegeId }` — extends Auth.js defaults.
- Volunteer auth is custom (no Auth.js) — OTP issued via `/api/rally/auth`, cookie stored, validated server-side.

---

## Deploy & ops

- **Push to `main`** → Vercel auto-deploys (prod). Feature branches → preview URLs.
- **DB migrations:** `npx prisma migrate dev` locally → commit → Vercel runs `prisma migrate deploy` on build (configured in `package.json`).
- **Seed:** `npx prisma db seed` (dev only — `migrate reset --force` wipes and re-seeds).
- **Env vars:** mirror `.env.example` → set in Vercel dashboard per environment.
- **DNS:** still on DreamHost (pointing at old PHP site). Cutover = change `@` and `www` A records to Vercel IP. **Not done yet — political coordination pending.** Full DNS reference in `HANDOFF.md §8`.

---

## Conventions cheatsheet

- Server components by default. `"use client"` only when needed.
- Next.js 16: always `await` `params`, `searchParams`, `cookies()`, `headers()`.
- Components: `PascalCase.tsx`; utilities/hooks: `camelCase.ts`.
- Forms = React Hook Form + Zod. All API inputs validated with Zod.
- Strict TS, no `any`. Prefer `interface` for shapes, `type` for unions.
- Tailwind tokens > inline hex where possible. Brand: gold `#D4A853`, navy `#1A3D5C`.

---

## Outstanding (see HANDOFF.md for full list)

1. Swap `/api/subscribe` from Resend → Neon One API.
2. Survey old MySQL → map to Supabase/Neon One/repo-static.
3. Decide Stripe vs Neon Pay for donations.
4. Set `YOUTUBE_API_KEY` in Vercel (activates live feed).
5. Instagram Graph API migration (fixes broken images on `/news`).
6. DNS cutover from DreamHost → Vercel (political timing).

---

**TL;DR:** Next.js 16 + tRPC + Prisma/Supabase on Vercel. Two surfaces (public marketing + Rally ops). DB is for Rally; donors/subscribers live in Neon One. Don't ship to prod without checking `HANDOFF.md` for the political/DNS context.
