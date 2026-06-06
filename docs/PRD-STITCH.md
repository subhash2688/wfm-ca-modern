# WFMCA.ORG — Product Requirements Document (for Google Stitch)

## Product Overview

**World Food Movement (WFMCA)** is a nonprofit website that serves free, nutritious meals to college students facing food insecurity across America. The site needs to inspire donors, attract volunteers, and serve students — with a premium, trust-building aesthetic similar to charity:water.

**Tech stack:** Next.js + React + Tailwind CSS + shadcn/ui (Radix UI) + Framer Motion

---

## Brand & Design System

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| Navy | `#1A3D5C` | Primary brand, headers, CTAs, dark sections |
| Gold | `#D4A853` | Accent, highlights, active states, section labels |
| Ink | `#1A1A1A` | Headings, body text on light backgrounds |
| Mid | `#4B5563` | Body text, descriptions |
| Light | `#6B7280` | Secondary text, captions |
| Edge | `#E5E2DD` | Borders, dividers |
| Warm | `#FAFAF8` | Section backgrounds (off-white) |
| Cream | `#F5F0EB` | Alternate section backgrounds |
| Dark BG | `#0F1A24` | Footer, cinematic overlays |

### Typography
- **Headings:** Playfair Display (serif, elegant) — used for all h1/h2/h3
- **Body:** DM Sans (clean sans-serif) — used for paragraphs, UI text, navigation
- **Section Labels:** DM Sans, uppercase, letter-spacing 0.2em, gold color, font-size small

### Design Principles
1. **Cinematic storytelling** — full-bleed hero images with gradient overlays, large emotional photography
2. **Trust-first** — 501(c)(3) badges, EIN number, "100% goes to meals" messaging everywhere
3. **Generous whitespace** — sections have 96-128px vertical padding, max-width 1280px content
4. **Rounded corners** — cards use 16-24px border radius, buttons use full-round (pill shape)
5. **Subtle borders** — light `#E5E2DD` borders on cards, not heavy shadows
6. **Gold accents** — section labels, highlights, hover states, award badges all use gold
7. **Scroll-reveal animations** — elements fade up into view as user scrolls (Framer Motion)

### Component Patterns
- **Section Label:** Uppercase, small, gold, letter-spaced tracking text above every section heading
- **Cards:** Rounded-2xl, light border, off-white or white background, hover lifts slightly
- **CTA Buttons:** Pill-shaped (rounded-full), gold background with navy text (primary), or ghost border (secondary)
- **Stat Cards:** Large serif number + small label beneath, used in impact strips
- **Quote Blocks:** Large serif italic text, gold highlight on key phrase, attribution with avatar

---

## Shared Layout Components

### Global Header (sticky)
- **Logo:** "WFM" text or logo on the left
- **Navigation links:** About, Programs, Stories, Get Involved, Updates
- **CTA button:** "Fund a meal" — gold pill button on the right
- **Mobile:** Hamburger icon opens slide-out drawer with all links
- **Behavior:** On home page = transparent over hero, on inner pages = white with light bottom border
- **Scroll behavior:** Becomes solid white with shadow after scrolling past hero

### Global Footer
- **Background:** Very dark navy (`#0F1A24`)
- **4-column grid:**
  - Column 1: Logo + tagline "Ending student hunger in America" + social icons (Twitter, Instagram, Facebook, LinkedIn, YouTube)
  - Column 2: "About" links — Our Story, Team, Programs, Impact, Financials
  - Column 3: "Take Action" links — Donate, Volunteer, Start a Fundraiser, Campus Partnership, Request Meals
  - Column 4: "Connect" links — Contact, Newsletter, Press, Careers, Blog
- **Bottom bar:** Copyright + legal links (Privacy Policy, Terms, 501(c)(3) notice with EIN)

### Page Hero (reusable for all inner pages)
- Navy background (`#1A3D5C`) with optional background image at 20% opacity
- Gradient overlay
- Content: Gold uppercase label → Large serif heading → Optional subtitle paragraph
- Padding: pt-160px (account for fixed header), pb-112px

---

## Pages

### 1. HOME PAGE (`/`)
The most important page. Cinematic, emotional, donor-focused.

**Section 1 — Hero (full viewport height)**
- Full-bleed background image (volunteers distributing meals on campus)
- Dual gradient overlays (bottom-to-top dark + left-to-right dark)
- Gold pill badge: "100% of donations fund meals"
- Large serif heading (multi-line):
  ```
  No student
  should choose
  between food
  and education.
  ```
  ("food" is italic + gold)
- Subtitle: "36% of college students in America skip meals because they can't afford food. Your $5 feeds a student for a full day."
- Two CTAs: Gold pill "Fund 47 meals today →" + Ghost circle play button "Watch a student's story"
- Bottom fade gradient into white

**Section 2 — Impact Strip (overlaps hero by -64px)**
- 4 stat cards in a row, floating with shadow:
  - 2.3M+ / Meals served
  - 52 / Partner campuses
  - 1,200+ / Active volunteers
  - 18 / States reached
- White cards, rounded-2xl, light border + shadow

**Section 3 — The Crisis (editorial split)**
- Off-white background (`#FAFAF8`)
- Left: 4:5 aspect ratio photo (students receiving meals), rounded-3xl. Floating navy card in bottom-right corner showing "3.3M students face hunger daily"
- Right: Gold label "THE CRISIS" → Serif heading "Hunger shouldn't be the price of a degree." → Two paragraphs of body text → Three inline stats (36% skip meals | $5 per meal | 0% overhead) separated by vertical dividers

**Section 4 — How It Works (3-column cards)**
- White background
- Center-aligned: Gold label "HOW IT WORKS" → Serif heading "From kitchen to campus" → Subtitle
- 3 cards, each with:
  - 16:10 aspect image at top with hover zoom effect
  - Numbered circle (1, 2, 3) + title
  - Description paragraph
- Cards: "Students sign up" → "Kitchens prepare" → "Volunteers deliver"

**Section 5 — Story Quote (full-bleed cinematic)**
- Background image with navy overlay at 85% opacity
- Centered layout
- Large quote mark icon (gold, faded)
- Large serif quote: "I was choosing between eating and dropping out. WFM changed everything." (last line in gold)
- Avatar + name + "Engineering Graduate, Class of 2024"
- Link: "Read more stories →" in gold

**Section 6 — The $5 Promise (dark card)**
- Off-white background
- Single large rounded card (2rem radius) with navy background
- Left side: Gold label "THE 100% MODEL" → Serif heading "Every dollar you give feeds a student." → Description paragraph → 3 mini stat cards ($5/1 day, $35/1 week, $150/1 month) → Gold CTA button
- Right side: Full-height image with left-to-right gradient fade

**Section 7 — Testimonials (3-column)**
- White background
- Header row: Left-aligned "VOICES" label + "From our community" heading. Right-aligned "All stories →" link
- 3 testimonial cards, each with:
  - 5 gold stars
  - Quote text
  - Divider line
  - Avatar + name + role

**Section 8 — Ways to Help (4-column)**
- Cream background (`#F5F0EB`)
- Center-aligned: Gold label "GET INVOLVED" → Serif heading "Every action matters"
- 4 action cards (white, rounded-2xl, hover shadow):
  - "Give Monthly" → "Volunteer" → "Start a Fundraiser" → "Campus Partnership"
  - Each has title, description, gold arrow link

**Section 9 — Photo Mosaic Strip**
- Edge-to-edge, no padding
- 4 equal-width images side by side (flex, 2px gap), height ~320px

**Section 10 — Final CTA (full-bleed cinematic)**
- Background image with dark overlay (75%)
- Centered serif heading: "Every meal you fund keeps a student in school." ("in school" italic + gold)
- Subtitle + Gold CTA button "Fund meals today"

---

### 2. ABOUT US (`/about-us`)

**Hero:** Page Hero component — "No one should go hungry."

**Section 1 — Mission & Vision (split layout)**
- Left: 4:5 photo, rounded-3xl
- Right: Gold label "OUR PURPOSE" → "Vision & Mission" heading → Two white cards with rounded borders:
  - Vision card: "No one should go hungry."
  - Mission card: "To serve free, fresh and nutritious meals to everyone in need and build a healthier and happier world."
- Paragraph about food as a fundamental right

**Section 2 — Our Inspiration**
- White background, centered text block (max-width 768px)
- Gold label "OUR INSPIRATION" → Heading "A movement born from compassion"
- Story about Srila Prabhupada seeing children fighting dogs for food → led to global feeding movement

**Section 3 — Timeline (Our Journey)**
- Cream background (`#F5F0EB`)
- Gold label "OUR JOURNEY" → Heading "From 1,000 meals to 4 billion."
- 5 timeline entries as horizontal cards (year on left, title + description on right):
  - 2000: Akshaya Patra Foundation
  - 2007: UK expansion
  - 2019: 3 billionth meal
  - 2024: 4 billion milestone at UN
  - 2025: WFM launches in America

**Section 4 — What We Do in America**
- White background
- Center heading → 2-column grid of program cards:
  - "Community College Feeding" (with graduation cap icon)
  - "Food Insecure Individuals" (with heart icon)

**Section 5 — Impact Numbers Strip**
- Navy background
- 4 stats: 4B+ meals globally | 2.2M children fed daily | 78 kitchens | 16 states

**Section 6 — Founders (2-column)**
- Off-white background
- Gold label "LEADERSHIP" → "Our Founders" heading
- 2 large founder cards:
  - Madhu Pandit Dasa — Chairman. Initials avatar "MP" in navy square. Bio. Award badges (Padma Shri, Gandhi Peace Prize, etc.)
  - Chanchalapathi Dasa — Vice Chairman. Initials "CD". Bio.

**Section 7 — Board Members**
- White background
- 2-column grid of board member cards:
  - Dr. Siva Sivaram (QuantumScape CEO)
  - Arjun Bhagat (Calibrated Group CEO)

**Section 8 — Partner Testimonials**
- Cream background
- 2 large quote cards with attribution (Dr. Omar Torres, Lee Lambert)

**Section 9 — Awards & Recognition**
- 3-column grid of award cards: Gandhi Peace Prize, Padma Shri, Nikkei Asia Prize, BBC Global Food Champion, National Award for Child Welfare, Harvard/Stanford/MIT case studies

**Section 10 — Founder's Message CTA (full-bleed cinematic)**
- Background image, dark overlay
- Centered founders' quote
- Two CTAs: "Support the mission" (gold) + "Get involved" (ghost)

---

### 3. PROGRAMS (`/programs`)

**Hero:** "How we feed students."

**Section 1 — Quick Stats Strip:** 4 stats (52 campuses, 18 states, 1,200+ volunteers, $5/meal)

**Section 2 — Meal Delivery Program (split: image left, text right)**
- Description of flagship program + 4 bullet points with gold dots

**Section 3 — Volunteer Program (split: text left, image right)**
- Description + 2x2 grid of benefit cards (Flexible Commitment, Full Training, Community, Leadership Skills)

**Section 4 — Campus Partnership (centered)**
- 4-step numbered process: Reach Out → We Plan Together → Campus Access → Launch & Grow

**Section 5 — Sattvic Kitchen Program (split: image left, text right)**
- Description of kitchen approach + large "$5" callout + tag badges (Fresh Daily, 100% Vegetarian, etc.)

**Section 6 — How It Works for Students (split: 2x2 image grid left, numbered steps right)**

**Section 7 — CTA:** Navy background, "Want to bring WFM to your campus?" + two buttons

---

### 4. DONATE (`/donate`)

**Hero:** "Feed a student today." + "100% of your donation goes directly to meals."

**Section 1 — Donation Amount Selector**
- Interactive component with preset amounts ($5, $25, $50, $100, $250) + custom input
- Each shows impact (e.g., "$25 = 5 meals")
- One-time / Monthly toggle
- Large gold "Donate" CTA button
- Small trust text beneath

**Section 2 — The 100% Model (split layout)**
- Left: Heading "Zero overhead. 100% meals." + description + 3 large stats (0% overhead, 100% to meals, $5 per meal)
- Right: Photo with floating impact card (2.3M+ meals served)

**Section 3 — Impact Numbers Strip:** $5/day, $35/week, $150/month, $1,800/year

**Section 4 — Donor Testimonial (full-bleed cinematic quote)**

**Section 5 — Donation FAQ:** 5 expandable Q&A cards

**Section 6 — Trust Signals Strip:** 501(c)(3) badge, EIN number, 100% badge, Secure payments (SSL)

**Section 7 — Final CTA:** "One meal can change a student's entire trajectory."

---

### 5. GET INVOLVED (`/get-involved`)

**Hero:** "Every action feeds a student."

**Section 1 — Ways to Help (2x2 card grid)**
- 4 large cards with icon, highlight badge, title, description, arrow link:
  - Donate ($5 = 1 meal)
  - Volunteer (2 hrs/week)
  - Start a Fundraiser (Community-powered)
  - Campus Partnership (52 campuses & growing)
- Cards have hover lift + subtle gradient overlay effect

**Section 2 — Volunteer Spotlight (split: text left, image right)**
- Navy background with background image at 10% opacity
- Gold label → Quote from volunteer → Avatar + name + role

**Section 3 — Impact Strip:** $5/day, $35/week, $150/month, $1,500/year

**Section 4 — FAQ (sidebar layout)**
- Left (2/5): Label + heading + "Contact Us" link
- Right (3/5): 4 expandable Q&A cards

**Section 5 — Final CTA:** Navy background, "Ready to make a difference?"

---

### 6. CONTACT (`/contact`)

**Hero:** "Get in touch."

**Section 1 — Contact Split Layout**
- Left: Contact info (email: info@wfmca.org, phone, mailing address) + green dot "We typically respond within 24 hours"
- Right: Contact form card (Name, Email, Subject dropdown, Message textarea, Send button)

**Section 2 — Other Ways to Reach Us (3-column)**
- Social Media card (with social icon buttons)
- Office Hours card (M-F 9-6 PT, Sat 10-2, Sun closed)
- FAQ card (link to /faq)

**Section 3 — CTA Banner:** Navy, "Ready to make a difference?"

---

### 7. DYNAMIC LISTING PAGES

These pages fetch data from the database and follow a consistent pattern:

**News (`/news`), Blogs (`/blogs`), Stories (`/stories`), Events (`/events`)**
- Page Hero with relevant title
- Grid of content cards (3-column on desktop, 1-column mobile)
- Each card: Image thumbnail, category badge, title, excerpt, date, "Read more →"
- Pagination or "Load more" button
- Detail pages (`/news/[slug]`, etc.): Hero image, title, author, date, rich text body, related articles

**Campaigns (`/campaigns`)**
- Cards with progress bars showing goal vs raised amount
- Detail pages with large donation CTA

**Photo Gallery (`/photo-gallery`)**
- Masonry or grid layout of images
- Lightbox on click

**FAQs (`/faqs`)**
- Accordion-style expandable questions grouped by category
- Smooth open/close animation

**Team (`/team`)**
- Grid of team member cards with photo, name, title, bio excerpt

---

### 8. FUTURE: AUTH PAGES (Phase 2)
- Login, Register, Forgot Password
- Clean centered card layouts with form fields
- Student dashboard with QR code, meal calendar
- Volunteer dashboard with delivery assignments

### 9. FUTURE: ADMIN DASHBOARD (Phase 5)
- Dark sidebar + light content area
- Data tables, charts, KPI cards
- CRUD forms for all content types

---

## Responsive Breakpoints
- **Mobile:** < 768px — single column, stacked sections, hamburger nav
- **Tablet:** 768-1024px — 2-column grids
- **Desktop:** 1024px+ — full layouts as described above
- **Max content width:** 1280px (`max-w-7xl`) centered

## Animation Patterns (Framer Motion)
- **FadeIn (up):** Elements fade from 24px below, appearing on scroll
- **FadeInLeft/Right:** Elements slide in from sides (40px offset)
- **Stagger:** Children in grids animate one-by-one with 100-150ms delay
- **ScaleIn:** Cards scale from 95% to 100%
- **All animations:** Trigger once when element enters viewport, 500ms duration, ease-out

---

## Key Content / Copy

**Tagline:** "No one should go hungry."
**Mission:** "To serve free, fresh and nutritious meals to everyone in need."
**Key stat:** 36% of college students in America face food insecurity
**Cost model:** $5 = 1 meal, 100% goes to meals (0% overhead)
**Trust:** 501(c)(3) nonprofit, EIN 33-1400027
**Scale:** 2.3M+ meals served, 52 partner campuses, 18 states, 1,200+ volunteers
**Global heritage:** Part of Akshaya Patra movement — 4B+ meals served worldwide
