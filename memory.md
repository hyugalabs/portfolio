# Memory — Hyuga Labs website

Read this first in every new session. Then read `hyugalabs-tasks.md`.

## Status

- **Session 1 (planning):** Scope captured in `hyugalabs-tasks.md`.
- **Session 1 (change of plan):** Hero changed from `PrismaHero` to `WovenLightHero`. Recommendations adopted. Docs remapped. No website code changed yet for the hero.
- **Done before the website work:**
  - Swapped `lucide-react` for `lucide-animated` (`ConstructionIcon` on `app/page.tsx`, with `"use client"`). `motion` installed as its peer dependency.
  - Created `.claude/agents/` with the six spec-workflow agents (constitution, specify, plan, tasks, implement, converge).
  - Added CodeGraph notes and a session-workflow section to `AGENTS.md`.
- **T1 done:** `app/globals.css` now has `@theme` tokens: colors `charcoal`, `offwhite`, `coral`, `teal`; fonts `font-headline`, `font-sub`, `font-accent` (point at `--font-geist-sans`, `--font-inter`, `--font-bricolage`; the last two are set up in T2). Dark-only body (charcoal bg, off-white text). `app/page.tsx` uses the tokens. Hero files still hold hard-coded colors; T3 rewrites them.
- **T2 done:** `app/layout.tsx` loads Geist, Inter, Bricolage Grotesque via `next/font/google` (vars `--font-geist-sans`, `--font-inter`, `--font-bricolage`). Geist Mono removed (was unused).
- **T3 done (code):** Hero is `components/ui/woven-light-hero.tsx` (motion/react, declarative animations, tokens) + `components/ui/woven-canvas.tsx` (three.js, lazy via `next/dynamic` `ssr:false`, 15k particles, no per-frame allocations, full dispose + context loss on unmount). `three` + `@types/three` added. Old hero files, Playfair, and the "Woven" nav removed (header comes in T5). `app/page.tsx` renders the hero. Build and lint pass. Not yet checked visually in a browser. Copy is still the "Woven by Light" placeholder (T4).
- **T5 done:** `components/header.tsx` (server component, fixed, logo "only logo dark mode" + "Hyuga Labs" wordmark, links Home / Components) rendered in `app/layout.tsx`. No hamburger, two links fit on mobile. Header is `fixed`, so pages other than the hero need top padding (~`pt-20`), e.g. `/components` in T7. `/components` 404s until T7.
- **T4 done:** hero copy is Hyuga Labs: headline "Hyuga Labs", subtext about custom websites + SEO + social content, coral CTA "Explore templates" -> `/components`.
- **T6 done:** `app/layout.tsx` has real title (default + `%s | Hyuga Labs` template for per-page titles), description, Open Graph, Twitter, and Organization JSON-LD (escaped `<`). Added `app/robots.ts` and `app/sitemap.ts` (lists `/` and `/components`; `/components` 404s until T7). No canonical set in layout (it would apply to every page); T7 should export its own `metadata` with `title: "Components"` and a canonical. Verified in built HTML; build and lint pass.
- **T7 done:** `/components` page (`app/components/page.tsx`) with a static typed `templates` array (6 placeholders, `href: "#"`) and `components/template-card.tsx` (next/image, responsive 1/2/3 col grid). Own metadata + canonical. Placeholder image: `public/images/templates/placeholder.svg`. Swapping real data only touches the array. Build and lint pass; served HTML checked. Not yet viewed at phone width in a browser.
- **Real sites on `/components`:** the placeholders are gone. The array now holds 5 live client sites (Sparkle Clean, SS Cleaning, Sarah Ross, Sparkle Clean NYC, BiyerKahini). Their previews are 1280x800 headless-Chrome screenshots in `public/images/templates/*.png`, served through next/image. Cards open the site in a new tab ("Visit site"). `placeholder.svg` deleted. This mostly covers T8 (real previews, no layout shift via `fill` + aspect box). To refresh a screenshot: `chrome --headless=new --window-size=1280,800 --virtual-time-budget=8000 --screenshot=<file> <url>`.
- **`/components` redesign (/impeccable):** editorial work index instead of a card grid. Big "Sites we've built." heading (Geist + Bricolage coral accent on "built."). Each site is a full-width row: browser-framed screenshot showing the real domain (7 cols), alternating sides, name/description/teal feature dots/"Visit <domain>" (5 cols). Whole row is one stretched link; hover lifts the frame with a coral ring. `Template` type gained `features: string[]`. globals.css: coral `::selection`, coral `:focus-visible` outline, themed scrollbar. Checked at 1440 and a true 390 width. Note: headless Chrome won't render narrower than 500px, so do phone checks through a 390px iframe.
- **Moved to `src/` (supersedes the paths in the entries above):** `tsconfig` `@/*` -> `./src/*`. Layout:
  - `src/app/`: routes, `globals.css`, `robots.ts`, `sitemap.ts`, favicon, OG image. The `/components` route is `src/app/components/page.tsx` (page title "Our Work").
  - `src/components/layout/header.tsx`, `src/components/hero/` (woven-light-hero + woven-canvas), `src/components/sites/site-card.tsx` (`SiteCard`), `src/components/icons/arrow-up-right.tsx`.
  - `src/data/sites.ts`: `Site` type + `sites` array. Edit this to add or change showcased sites.
  - `src/lib/site-config.ts`: name, url, title, description, logo. Single source for metadata, JSON-LD, robots and sitemap.
  - Screenshots are in `public/images/sites/` (was `templates/`). `public/` and config files stay at the repo root.
  - `Template` was renamed to `Site` everywhere.
- **T8 done:** Previews are in `public/images/sites/` (the task text still says `templates/`). Verified on a production server: next/image serves WebP at 14–68 KB per width, from source PNGs of 61–480 KB. A responsive `srcSet`/`sizes` is set. No layout shift: each image uses `fill` inside an `aspect-8/5` box that matches the 1280x800 screenshots. `priority` is deprecated in Next 16, so the first card and the header logo now use `preload`. The first card still gets a `<link rel="preload">`. Build and lint pass.
- **T9 done:** `src/app/page.tsx` wraps the hero in `<main>`, with a comment marking where future sections go (services, social content, contact form). The footer belongs in the layout, not the page. The header stays in the layout. The hero's outer element is now a `<section>` with `h-svh` (was `h-screen`, which jumps under mobile toolbars). The canvas still sizes to the window, so the section clips it. Build and lint pass. The served HTML has the header, then main > section > h1.
- **T10 done:** Removed `lucide-animated`, which was unused after the construction page went away. Remaining deps: `next`, `react`, `react-dom`, `motion` (hero), `three` (canvas). No `framer-motion` or `lucide-react`. Unused logo variants in `public/images/logos/` are kept as brand files. Lighthouse on a local production server (scores are performance / a11y / best practices / SEO):
  - Home: 95/96/100/100 mobile, 100/96/100/100 desktop.
  - `/components`: 93/100/100/100 mobile, 100/100/100/100 desktop.
  - CLS is 0 everywhere. TBT is ≤120 ms on mobile and 0 on desktop.
  - The mobile LCP numbers (2.9 s home, 3.2 s components) come from simulated throttling. The real LCP subparts are under 150 ms. The home LCP element is the header wordmark, not the canvas.
  - The home a11y flag is a false positive. Lighthouse measured the CTA mid fade-in. At full opacity, charcoal on coral is about 4.8:1.
- **T11 checks done (2026-10-03), user review pending:**
  - Build, lint and `tsc` pass. `/`, `/components`, robots, sitemap, OG image and favicon return 200. Unknown routes return 404. All 5 showcased sites return 200, and their links open in a new tab with `noopener`.
  - Real-time screenshots at 1440 and 390 (CDP device emulation) show no console errors and no horizontal overflow. Hero copy and CTA render after the animation.
  - Headless `--virtual-time-budget` screenshots show the hero text blank. That's a tooling artifact: motion doesn't advance under virtual time. Use real-time capture instead.
  - Both findings fixed:
    1. The hero copy has a static blurred charcoal glow behind it (`bg-charcoal/75 blur-3xl`), and the subtext is now `offwhite/85`.
    2. Added `src/app/not-found.tsx` (404 status, title "Page not found | Hyuga Labs", noindex). It renders `src/components/not-found/not-found-glitch.tsx`.
  - That file is the user's glitch component, moved from `src/components/404/NotFoundGlitch.tsx` to match the kebab-case naming. Changes from the original:
    - Dropped `clsx`/`tailwind-merge` (not installed) and the unused ease/spring exports.
    - Glitch layers are coral and teal.
    - Fonts: Bricolage "404", Geist title, Inter body.
    - Buttons: "Go home" (coral) and "See our work" (`/components`).
    - The h1 has a stable aria-label while it scrambles.
- **Nav + stub pages (2026-10-03):** header links are now Home / Services / Components / About / Contact (wordmark hidden below `sm` so five links fit on phones). `/services`, `/about`, `/contact` are "Under construction" stubs (`src/components/layout/under-construction.tsx`), `noindex`, not in the sitemap. Content is on hold until the user finishes brainstorming each page. When a page is built for real, drop `robots` and add it to `sitemap.ts`.
- **Footer (2026-10-03):** `src/components/footer/cinematic-footer.tsx` (user's component, ported), rendered in `layout.tsx` after `{children}` so it shows on every page. Curtain reveal: fixed footer, clipped by an `h-svh` wrapper. Ported from GSAP to `motion` (no `gsap`, no `cn`/shadcn tokens, no Plus Jakarta font); styles are `.footer-*` classes in `globals.css`. Contact info, socials (`instagram.com/hyugalabs`, `facebook.com/hyugalabs`, `linkedin.com/company/hyugalabs`) live in `src/lib/site-config.ts`. Build and lint pass; not yet checked visually in a browser.
- **Immersive nav (2026-10-03):** `src/components/layout/header.tsx` is now a client component, ported from the user's `ImmersiveFullscreenNav` (Hyperiux). The original `src/components/nav-bar/` was deleted after the port. The header shows the logo, the wordmark and a "Menu" toggle at every width. The menu is a full-screen off-white panel that wipes up via clip-path (motion `AnimatePresence`, no gsap), then links, previews and contact info rise in sequence. Links are numbered, with a per-character roll hover in coral and a coral dot on the current page; "Components" is labelled "Our Work". On `lg`, the panel shows the first two `sites` screenshots. The footer row has the email and socials from `siteConfig`. While open, the header ink flips to charcoal and the logo swaps to `only logo 1024x1024 transparent.svg` (new file: the light logo minus its white background rect). Escape closes, Tab is trapped, scroll is locked and focus returns to the toggle. Reduced motion gets a plain fade. Checked in a browser at 1440 and 390; build and lint pass.
- **Next up:** user reviews pages. After that, T11 is complete; remaining work is backlog only.

## Decisions

Confirmed:
- Accent: coral `#FF3B63` from the logo. Complement: teal `#14B8A6`, used only for small secondary highlights.
- 60-30-10 for color: 60% charcoal `#1E1E20`, 30% off-white `#F3F2EF`, 10% coral (plus teal).
- 60-30-10 for fonts, three total: Geist (headline), Inter (subtext), Bricolage Grotesque (funky accent).
- Hero: `WovenLightHero`, moved to `components/ui/woven-light-hero.tsx`. `PrismaHero` is deleted.
- Hero is kept as designed (layout, motion, canvas), with placeholder copy and third-party font replaced.
- Hero nav is merged with the site header (one nav bar).
- Sections are built one at a time, later, with components the user provides.
- Skills: `/impeccable` for design, `/ponytail` for lean code, `/find-skills` for Next.js, SEO, and content best practices.

Adopted recommendations (the user said "go with your recommendations"):
- Hero component location: `components/ui/woven-light-hero.tsx`.
- Playfair Display is dropped to keep three fonts.
- Hero canvas is lazy-loaded (`ssr: false`), particle count is reduced, and per-frame allocations are removed.

## Open items (defaults applied, can change)

1. **Hero copy.** Default: headline "Hyuga Labs", subtext about building custom websites and growing your presence, CTA "Explore templates" linking to `/components`. The CTA text no longer matches the "Our Work" page, but the user is keeping it for now (2026-10-03).
2. **Hero headline font.** Default: Geist, to match the rest of the site. Bricolage is the alternative if you want it funkier.
3. **Templates on `/components`.** Placeholder cards for now (names, descriptions, preview images, and links). Real template data is swapped in later. Preview images use placeholder files in `public/images/templates/`.
4. **Nav items.** Default: Home, Components.

## Workflow

Each task (T1–T11) is run in its own session. Open a session and say "implement T<n>". Each session reads this file and `hyugalabs-tasks.md`, checks dependencies, and updates Status when done.

## How to resume

- "Implement task N" means do T-N from `hyugalabs-tasks.md`. Check that its dependencies are done first (see Status).
- After each task, update the Status section here: what was completed, what changed, and what is next.
- Do not start backlog items unless the user asks.
