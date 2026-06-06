# WFMCA.ORG — Modern Rebuild

Nonprofit website for the **World Food Movement**, rebuilt from a legacy CodeIgniter 3 PHP app to a modern Next.js stack.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 4 + shadcn/ui |
| API | tRPC v11 |
| Database | MySQL + Prisma 6 |
| Auth | Auth.js v5 (email/password + OTP) |
| Payments | Stripe (test mode) |
| Email | Resend + React Email |
| Forms | React Hook Form + Zod |
| Testing | Vitest (unit) + Playwright (E2E) |

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Fill in your values — see `.env.example` for descriptions.

### 3. Set up the database

```bash
npx prisma migrate dev
npx prisma db seed
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Key Commands

```bash
npm run dev          # Dev server (Turbopack)
npm run build        # Production build
npm run lint         # ESLint
npm run format       # Prettier
npm test             # Unit tests (Vitest)
npm run test:e2e     # E2E tests (Playwright)
npx prisma studio    # Visual database browser
```

## Project Structure

```
src/
├── app/
│   ├── (public)/    # Public-facing pages (home, about, donate, etc.)
│   ├── (auth)/      # Login, register, forgot-password
│   └── api/         # Auth.js + tRPC route handlers
├── components/
│   ├── layout/      # Header, Footer, PageHero
│   └── ui/          # shadcn/ui primitives
└── lib/
    ├── auth.ts      # Auth.js config
    ├── db.ts        # Prisma client
    └── trpc/        # tRPC init, client, server, routers
prisma/
├── schema.prisma
├── migrations/
└── seed.ts
docs/                # PRD, QA reports, design prototypes
tests/               # Unit and E2E tests
```

## Auth Roles

`SUPER_ADMIN` > `COLLEGE_ADMIN` > `SATTVIC_ADMIN` > `VOLUNTEER` > `STUDENT` > `DONOR`

Protected routes (`/dashboard`, `/admin`) are gated via `src/middleware.ts`.

## Hosting

Deployed on **DreamHost Shared Unlimited** — static export + Node.js API via Passenger. Not Vercel.

## Contributing

See [`CLAUDE.md`](./CLAUDE.md) for full conventions, code style, and architecture decisions.
