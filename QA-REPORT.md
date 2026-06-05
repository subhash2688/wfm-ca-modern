# QA Report — WFMCA.ORG
**Date:** 2026-04-13
**Tested on:** localhost:3000 (Next.js dev server)
**Method:** Playwright browser automation

---

## 🔴 Critical — 404 Pages with Active Links

These pages return 404 but are linked from the nav or footer on every page.

| Page | Linked From |
|---|---|
| `/login` | Desktop nav "Log in" button, mobile drawer "Log in" |
| `/privacy-policy` | Footer bottom bar "Privacy" |
| `/terms` | Footer bottom bar "Terms" |

**Notes:**
- No auth pages exist anywhere in the app — `/login` needs to be built from scratch.
- `/privacy-policy` and `/terms` need placeholder legal pages at minimum before launch.

---

## 🟡 Medium — Broken Images on Photo Gallery

**Page:** `/photo-gallery`
**Error:** 6 images returning HTTP 400

The directory `/public/images/gallery/` does not exist. The following files are referenced but missing:
- `meal-distribution-1.jpg`
- `meal-distribution-2.jpg`
- `meal-distribution-3.jpg`
- `meal-distribution-4.jpg`
- `meal-distribution-5.jpg`
- `meal-distribution-6.jpg`

Additionally, those `<Image fill>` components are missing the `sizes` prop (4 performance warnings).

---

## 🟡 Minor — Dead Anchor Link in Footer

**Link:** "Financial Reports" in Footer → `/about-us#financial-reports`
The About Us page has no element with `id="financial-reports"`. The link goes to the top of the page silently.

---

## ⚪ Non-Issues / Expected

- **Blank sections in full-page screenshots** — Framer Motion `whileInView` animations start at `opacity: 0` and only reveal on scroll. Not a bug; renders correctly in a real browser.
- **Social media icons in footer** — All link to `#`. Acceptable placeholder for now.
- **`/donate` first-load timeout** — Page timed out once during testing, loaded fine on retry. Likely Stripe initialization. Worth monitoring under load.

---

## ✅ All Pages Verified Working

| Page | Result |
|---|---|
| `/` (Homepage) | ✅ |
| `/about-us` | ✅ |
| `/programs` | ✅ |
| `/stories` | ✅ |
| `/stories/[slug]` | ✅ (tested `/stories/rajs-story`) |
| `/get-involved` | ✅ |
| `/news` | ✅ |
| `/donate` | ✅ |
| `/campaigns` | ✅ |
| `/contact` | ✅ |
| `/faqs` | ✅ |
| `/team` | ✅ |
| `/events` | ✅ |
| `/photo-gallery` | ✅ (page loads, gallery images broken — see above) |
| Mobile layout (390px) | ✅ (hamburger drawer opens, hero readable, CTAs functional) |

---

## Priority Order for Fixes

1. **Build `/login`** — it's in the nav on every single page
2. **Create `/privacy-policy` and `/terms`** — required before public launch
3. **Add gallery images** — create `/public/images/gallery/` and add photos, fix `sizes` props
4. **Fix `/about-us#financial-reports` anchor** — add the section ID or remove the footer link
