# WFMCA Modern — Session Handoff

**Last updated:** 2026-06-06
**Audience:** A fresh Claude (or human) picking up where the previous session left off.

---

## 1. What this project is

A ground-up rebuild of `wfmca.org` (a Bay Area nonprofit feeding California community college students) from CodeIgniter 3 / MySQL / DreamHost to Next.js 16 / Vercel.

- **Repo:** `github.com/subhash2688/wfm-ca-modern` — branch `main`
- **Project dir:** `/Users/subbu/Developer/WFMCA.ORG/wfmca-modern`
- **Old codebase (read-only reference):** `/Users/subbu/Developer/WFMCA.ORG/wfmca`
- **Live (old):** `https://wfmca.org` — DreamHost Shared, PHP/CI3, MySQL
- **Preview (new):** Vercel deployment URL (`wfm-ca-modern.vercel.app` or similar — check Vercel dashboard)

Project conventions and tech stack: see `CLAUDE.md` in repo root.

---

## 2. Current state — what's done

### Site rebuild status
All public pages built and styled. Brand repositioning complete (Akshaya Patra / ISKCON / Sattvic references stripped; framed as standalone US nonprofit). Visual system: Fraunces serif + Nunito Sans body, palette `#D4A853` gold / `#1A3D5C` navy / `#0A1118` dark / `#FAFAF8` light. Framer Motion `FadeIn` / `Stagger*` wrappers everywhere.

### Recent feature work (last 10 commits)
- `a2cbc93` — Email capture: `/api/subscribe` route, footer signup, donate-page popover (30s + exit-intent)
- `15d4e28` — Donate selector: monthly default, $96/mo hero ("Feed a student all school year"), Founding 100 social-proof card, one-time → monthly nudge
- `b22018a` — `/corporate` page: Benevity featured callout, sponsor-a-campus tiers ($10K–$500K+), four giving channels, employee engagement options
- `51b04d1` — Stats strip redesign: icons + subtext + 1M-meal progress bar
- `565c904` — Dynamic YouTube feed (`src/lib/youtube.ts` + `src/components/YouTubeFeed.tsx`)
- `0a785b0`, `2e57be5`, `e678036` — California-only news/updates rewrite
- `f86a081` — Vision: "No student goes hungry." / Mission: "1M meals annually by 2030"
- `58be032` — Founder portrait photos (downloaded to `public/images/founders/`)

### Architectural state
- **DB/Auth stripped** — original Prisma/Auth.js setup was removed for static Vercel deploy. Full restoration guide in memory: `db_restoration_guide.md`. tRPC routers now return static data.
- **CRM:** Neon One (already in use by org for donor/email management). DKIM + SPF already configured on `wfmca.org` DNS for Neon emails to authenticate.
- **Email (Google Workspace)** — `info@wfmca.org` MX records point to `smtp.google.com`. Independent of website hosting.

---

## 3. Key decisions made this session

1. **Hosting → Vercel.** Architecture is Next.js 16 with route handlers, ISR, server components — incompatible with DreamHost Shared at production quality. Site is already deployed to Vercel.
2. **Email capture → Neon One**, NOT Resend. Current `/api/subscribe` writes to Resend Audiences as a placeholder; needs to be rewritten to POST to Neon One's REST API. See Task 3 below.
3. **Stealth team testing** — share Vercel preview URL (`*.vercel.app`) with internal team only. Do NOT add `test.wfmca.org` or `new.wfmca.org` yet — DreamHost DNS panel and Certificate Transparency logs would tip off the old website team before politics are ready.
4. **DNS flip plan** — when ready to go live, change only two records in DreamHost: `@` A and `www` A from DreamHost IP `69.163.178.14` → Vercel `76.76.21.21`. Leave MX, TXT (Neon One DKIM/SPF, Google verification, DMARC), service subdomains, NS records all untouched. Pre-lower TTL to 300s 4+ hours before flip.
5. **DB architecture for the rebuild:**
   - **Neon One CRM** — donors, email subscribers, constituent records (already paid for, SOC 2)
   - **Supabase** — student-portal operational data only (meal pickups, QR scans, etc.) when/if needed. Postgres + RLS + HIPAA-ready via Team plan upgrade.
   - **No separate database needed yet** — confirm what fits in Neon One first (see Task 4).
6. **Stripe vs. Neon Pay for donations** — still TBD. Lean Neon Pay for simplicity (auto-creates donor record, sends tax receipts) unless lower Stripe fees justify the integration work.

---

## 4. Political context (important)

The **old website is managed by a different team that does NOT know about this rebuild yet.** Implications:

- They have DreamHost panel access → any DNS change is visible to them in real time.
- Certificate Transparency logs publicly list any new SSL cert for `*.wfmca.org` within minutes (searchable on `crt.sh`).
- Current strategy: stay on `.vercel.app` URL for internal team review until the rebuild team is ready to have the conversation with the old team. **Do not add subdomains or flip DNS without explicit go-ahead.**

---

## 5. Outstanding tasks (priority order)

### Immediate / in-progress
1. ⏳ **Swap `/api/subscribe` from Resend → Neon One API** — preserves the UI built in commit `a2cbc93`, just changes the destination. Needs Neon One Org ID + API key from user.
2. ⏳ **Survey old MySQL DB** (Task 3 below)
3. ⏳ **Map old DB → new architecture** (Task 4 below)

### Soon
4. Apply for Vercel for Nonprofits (free Pro plan with EIN proof — 10 min, user action)
5. Get YouTube Data API v3 key → set `YOUTUBE_API_KEY` in Vercel env vars (activates live YouTube feed)
6. Update `FOUNDING_CURRENT` placeholder in `src/app/(public)/donate/DonationSelector.tsx` (line ~30) with actual count of monthly donors
7. Verify founder photo copyright before going live (downloaded from `madhupanditdasa.com` and `iskconbangalore.org` — see `public/images/founders/`)
8. Confirm `corporate@wfmca.org` email alias exists (referenced throughout `/corporate` page)
9. Confirm Benevity registered name — page tells donors to search "World Food Movement CA" inside Benevity

### Later
10. Decide Stripe vs. Neon Pay → wire up donation processing
11. `/founding-100` page (redeem the "name on a founding wall" promise)
12. Student stories page (waiting on consent collection from team)
13. Apple Pay / Google Pay on donation flow (~20% abandonment reduction)
14. Welcome email on subscribe (Resend + React Email, OR via Neon One automation)
15. Year-end giving campaign page with countdown
16. Apply for Candid Platinum (~2 hours of paperwork, lifetime payoff)
17. Charity Navigator listing once eligible
18. Honor/memorial giving option
19. DNS flip → Vercel apex (when politically green-lit)
20. Decommission old DreamHost site post-migration

### Empty pages that may need attention
`/events`, `/photo-gallery`, `/faqs`, `/campaigns`, `/blogs` — may still be sparse.

---

## 6. Task 3 — Survey the old MySQL database

### Goal
Understand what data exists in the old MySQL DB so we can decide what to migrate, what to retire, and where it goes (Neon One vs. Supabase vs. delete).

### Step 1 — Export the dump

User needs to grab a `mysqldump` from DreamHost. Two options:

**Option A — phpMyAdmin (no SSH needed):**
1. Log into DreamHost panel → MySQL Databases
2. Click "phpMyAdmin" next to the DB
3. Select the DB → Export tab → Quick → SQL format → Go
4. Save the `.sql` file to `~/Downloads/wfmca_dump.sql`

**Option B — SSH (faster, gets a clean dump):**
```bash
# From your laptop:
ssh USER@wfmca.org "mysqldump -h mysql.wfmca.org -u USER -p DBNAME --single-transaction --skip-lock-tables --no-tablespaces" > ~/Downloads/wfmca_dump.sql
```

Replace `USER` and `DBNAME` with actual values from DreamHost panel.

DNS hints at the DB host:
- `mysql.wfmca.org` → `64.90.63.93`
- `mysqlrevamp.wfmca.org` → `64.90.63.59` (this is probably the newer instance — try this one first)

### Step 2 — Run the survey script

Write `scripts/survey-old-db.mjs`:

```javascript
// Usage: node scripts/survey-old-db.mjs ~/Downloads/wfmca_dump.sql
import fs from "node:fs";

const file = process.argv[2];
if (!file) {
  console.error("Usage: node scripts/survey-old-db.mjs <path-to-dump.sql>");
  process.exit(1);
}
const sql = fs.readFileSync(file, "utf8");

// Parse CREATE TABLE statements
const tables = [];
const createRegex =
  /CREATE TABLE (?:IF NOT EXISTS )?`?(\w+)`?\s*\(([\s\S]*?)\)\s*(?:ENGINE|;)/gi;
let m;
while ((m = createRegex.exec(sql)) !== null) {
  const [, name, body] = m;
  const columns = [];
  const colRegex = /^\s*`(\w+)`\s+([A-Za-z]+(?:\(\d+(?:,\s*\d+)?\))?)/gm;
  let c;
  while ((c = colRegex.exec(body)) !== null) {
    columns.push({ name: c[1], type: c[2] });
  }
  tables.push({ name, columns });
}

// Count rows via INSERT statements (approx — multi-row inserts undercounted)
const inserts = {};
const insertRegex = /INSERT INTO `?(\w+)`?\s+(?:\([^)]+\)\s+)?VALUES\s+([\s\S]*?);/gi;
let i;
while ((i = insertRegex.exec(sql)) !== null) {
  const tbl = i[1];
  const rows = (i[2].match(/\(/g) ?? []).length;
  inserts[tbl] = (inserts[tbl] ?? 0) + rows;
}

const piiPatterns =
  /email|phone|mobile|ssn|dob|birth|address|zip|street|city|state|first.*name|last.*name|full.*name|password|credit|card|account.*num|student.*id/i;

console.log(`\n=== ${tables.length} tables ===\n`);
const sorted = tables.sort((a, b) =>
  (inserts[b.name] ?? 0) - (inserts[a.name] ?? 0) || a.name.localeCompare(b.name),
);

for (const t of sorted) {
  const piiCols = t.columns.filter((c) => piiPatterns.test(c.name));
  const rows = inserts[t.name] ?? 0;
  const piiFlag = piiCols.length ? " 🔒 PII" : "";
  const liveFlag = rows > 0 ? "" : " 💀 empty";
  console.log(`${t.name} — ${rows} rows · ${t.columns.length} cols${piiFlag}${liveFlag}`);
  if (piiCols.length) {
    console.log(`  PII columns: ${piiCols.map((c) => c.name).join(", ")}`);
  }
}

console.log(`\n=== Summary ===`);
const withData = sorted.filter((t) => (inserts[t.name] ?? 0) > 0);
const withPII = sorted.filter((t) =>
  t.columns.some((c) => piiPatterns.test(c.name)),
);
console.log(`Tables with data: ${withData.length} / ${sorted.length}`);
console.log(`Tables with PII columns: ${withPII.length}`);
```

Run with:
```bash
node scripts/survey-old-db.mjs ~/Downloads/wfmca_dump.sql > db-survey.txt
```

### What to look for in the output

- **Heavy tables** (most rows) — probably the core operational data
- **Empty tables** — dead schema, ignore during migration
- **PII tables** — students, donors, contacts → need careful handling
- **Tables matching old directory names** (from `wfmca/includefiles/`): awards, banners, blogs, events, location_qrcodes, meal_time_table, news, newsletters, pages, photos, profile, stories, student_qrcodes, success_stories, supporters, testimonial, trustees

---

## 7. Task 4 — Map old DB → new architecture

Once the survey is in hand, classify each non-empty table into one of these buckets:

| Bucket | Destination | Typical examples |
|---|---|---|
| **Donor / Constituent data** | Neon One (via API import) | donors, contacts, donations, supporters, recurring_pledges, volunteer signups |
| **Email subscribers** | Neon One (Audiences) | newsletter_subscribers, email_list |
| **Operational / student-portal** | Supabase (or skip until needed) | meal_pickups, qr_scans, attendance, meal_times, locations |
| **Editorial / CMS-lite** | Inline in repo as `src/data/*.ts` OR Supabase if frequent edits needed | blogs, news, events, stories, success_stories, testimonials, awards, banners, trustees, pages |
| **Media** | Already on Cloudinary or move to Vercel Blob | photos, userfiles |
| **Retire** | Delete | settings, widgets, dead tables, abandoned admin |

### Decision rules

- **If Neon One can model it as a custom field on Constituent → Neon One.** Avoid spinning up Supabase for anything the CRM already handles.
- **If it's content rarely edited → put it in the repo as TypeScript data.** Already doing this for news (`src/lib/trpc/routers/news.ts`) and blogs (`src/data/blogs.ts`). Cheap, fast, version-controlled.
- **If it's high-volume operational writes (e.g., a meal-pickup event every time a student scans a QR) → Supabase.** Neon One's API isn't sized for this.
- **For anything touching student PII**: confirm whether colleges send rosters (then FERPA + DPA required) vs. students self-enroll (lighter). Affects whether Supabase needs HIPAA Team plan or just RLS policies on Pro.

### Data minimization checklist (apply before importing anything)

- Strip columns we don't need (DreamHost-era data often has cruft)
- Hash or tokenize student IDs from colleges instead of storing raw
- Drop test rows, dev accounts, old admin users
- Validate emails before importing (don't pollute Neon One with bounces)
- Tag imported records with source (`migrated_from_legacy_db_2026-06`) for audit

---

## 8. DNS reference (current state)

Verified from DreamHost panel. **Do not change anything** without explicit user go-ahead.

### Custom records (org-set, keep all of these)
- `secure` A `54.156.190.3` (AWS — unknown app, ask before touching)
- `neonone._domainkey` CNAME `dkim.neonemails.com` (Neon One email signing)
- `@` TXT `google-site-verification=SecGs7WZXU1fd5taDe2GY-ZmFsz9J4juov1Ntyy5OLg`
- `@` TXT `v=spf1 include:_spf.neonemails.com ~all`
- `_dmarc` TXT `v=DMARC1; p=none;`

### Site records (these are what flip during migration)
- `@` A `69.163.178.14` (DreamHost — will become `76.76.21.21` for Vercel)
- `www` A `69.163.178.14` (DreamHost — will become `76.76.21.21` for Vercel)
- `development` A `64.90.63.93` (DreamHost staging — retire after Vercel preview deploys take over)

### Email (Google Workspace — never touch)
- `@` MX `0 smtp.google.com.`
- `mail` MX `0 smtp.google.com.`
- `autoconfig` CNAME `autoconfig.dreamhost.com`
- `_autodiscover._tcp` SRV `5 0 443 autoconfig.dreamhost.com`

### DreamHost service records (leave alone unless we know we don't need them)
`ftp`, `mail`, `mailboxes`, `mysql`, `mysqlrevamp`, `ssh`, `webmail`, `www.mailboxes`, `www.webmail` — all A records pointing to DreamHost infra.

### Nameservers
`ns1.dreamhost.com`, `ns2.dreamhost.com`, `ns3.dreamhost.com` — DreamHost is DNS host. Keep as-is during migration.

---

## 9. Environment variables

Currently in `.env` (gitignored). Will need on Vercel:

| Var | Status | Notes |
|---|---|---|
| `YOUTUBE_API_KEY` | empty | Activates dynamic YouTube feed; fallback videos used if missing |
| `RESEND_API_KEY` | placeholder | Will be replaced by Neon One credentials |
| `RESEND_AUDIENCE_ID` | empty | Will be replaced by Neon One credentials |
| `NEON_ONE_ORG_ID` | not yet set | Required for Task 3.1 (subscribe rewrite) |
| `NEON_ONE_API_KEY` | not yet set | Required for Task 3.1 |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` | Set to `https://wfmca.org` in Vercel prod |
| `DATABASE_URL` | placeholder | Only needed if/when Supabase is provisioned |
| Stripe vars | placeholder | Only needed if/when Stripe wins over Neon Pay |

---

## 10. Useful commands

```bash
npm run dev                # Local dev with Turbopack
npm run build              # Production build (verify before pushing)
npm run lint               # ESLint
git log --oneline -20      # Recent commits

# Surveying the old DB (after dump):
node scripts/survey-old-db.mjs ~/Downloads/wfmca_dump.sql > db-survey.txt
```

---

## 11. Files most likely to need attention next session

- `src/app/api/subscribe/route.ts` — swap Resend → Neon One API
- `src/components/EmailSignup.tsx` — likely unchanged after swap
- `src/components/DonateEmailPopover.tsx` — likely unchanged
- `src/app/(public)/donate/DonationSelector.tsx` — update `FOUNDING_CURRENT` constant
- `src/app/(public)/donate/page.tsx` — may need Stripe vs Neon Pay decision integration
- `scripts/survey-old-db.mjs` — to create (Task 3)

---

## 12. Memory pointers (this Claude's persistent memory)

Already saved:
- `project_static_migration.md` — original Vercel migration plan
- `db_restoration_guide.md` — code for restoring Prisma/Auth.js if needed
- `project_brand_repositioning.md` — Akshaya Patra strip-out context

Worth adding next session:
- A `project_hosting_decisions.md` capturing Vercel + Neon One + Supabase choices (lighter than this doc, just the decisions)

---

**End of handoff.** Resume by reading `CLAUDE.md`, this file, and `git log --oneline -10`. Then ask user which of Tasks 3 / 4 / the subscribe rewrite to start with.
