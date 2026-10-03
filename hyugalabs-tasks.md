# Hyuga Labs — Website Tasks

Source of truth for what we are building. Read `memory.md` first for current status and open decisions.

## Business context

Hyuga Labs is an agency that builds custom websites for small businesses, based on client needs: CRM, booking, quotes, and anything else the client's site needs. Services also include SEO (to rank higher) and, as a new service, social content creation, because most prospective clients have a very limited social presence.

The website has two jobs:
1. Show prospects what we can build.
2. Let prospects browse our **templates** at `/components`, the most important page. Clients pick a template there, and each template is previewed with a link.

## Design direction (confirmed)

Derived from the logo (`public/images/logos/logo plain 1024x1024.svg`).

- **Accent (10%):** coral `#FF3B63`, from the logo. Complementary teal `#14B8A6` for small secondary highlights only.
- **Dominant (60%):** charcoal `#1E1E20` (site background).
- **Secondary (30%):** off-white `#F3F2EF` (text, surfaces).
- **Fonts, 3 total:**
  - Headline (60%): Geist (already loaded in the layout)
  - Subtext (30%): Inter
  - Funky accent (10%): Bricolage Grotesque, for eye-catching moments only

Note: the hero currently loads **Playfair Display**, which would be a fourth font. It is removed in T3.

## Hero (confirmed)

Hero component: `components/WovenLightHero.tsx`, to be moved to `components/ui/woven-light-hero.tsx`.

Usage:

```tsx
import { WovenLightHero } from "@/components/ui/woven-light-hero";

export default function DemoOne() {
  return <WovenLightHero />;
}
```

`components/PrismaHero.tsx` was dropped by the user and is removed in T3.

## Scope rules

- **Build the site first, sections later.** Footer, contact form, and other sections are added in later sessions, one at a time, using components the user will provide.
- **Keep it lean (`/ponytail`).** Smallest codebase that works. No unused dependencies. Site must stay fast.
- **Design decisions use `/impeccable`.**
- **Best practices (Next.js, SEO, content) use `/find-skills`.**
- **Next.js 16 has breaking changes.** Read `node_modules/next/dist/docs/` before writing code (see `AGENTS.md`).

---

## Phase 0: Foundations

### T1: Design tokens
Define the palette and font families as tokens in `app/globals.css` (Tailwind v4 `@theme`). Replace hard-coded colors in components and the undefined `bg-primary` / `text-primary` classes.
- Skill: `/impeccable`
- Done when: no hard-coded brand colors remain in components; the 60-30-10 split is visible on the page.

### T2: Font setup
Load Geist (headline), Inter (subtext), and Bricolage Grotesque (funky accent) with `next/font/google` in `app/layout.tsx`. Remove Geist Mono if unused. Expose them as CSS variables mapped to the T1 tokens.
- Depends on: T1
- Done when: each font role renders correctly in the browser, and only these three fonts load.

### T3: Integrate WovenLightHero
Move the hero into the project and make it run. Required changes:
- Move to `components/ui/woven-light-hero.tsx` so the usage import works as written. Delete `components/PrismaHero.tsx`.
- Replace `framer-motion` with `motion` (already installed). Replace `useAnimation` with the `motion` equivalent. Verify the API matches the installed version.
- Add `three` as a dependency (the canvas needs it). Confirm it is the only new dependency.
- Remove the runtime Google Fonts `<link>` injection and the Playfair Display font. Use the T2 fonts instead.
- Replace the "⎎ Woven" nav with the header from T5, so there is one navigation bar, not two.
- Replace hard-coded `black`/`white`/`slate` colors with the T1 tokens. The site is charcoal/off-white, not pure black/white.
- Performance, to meet the lean-site goal:
  - Load the canvas with `next/dynamic` and `ssr: false`, so it does not block the first render.
  - Reduce `particleCount` from 50,000 to a smaller number that still looks right. Measure the result.
  - Stop allocating `THREE.Vector3` objects inside the per-frame, per-particle loop. Reuse them.
  - Dispose of the renderer, geometry, and material on unmount.
- Skill: `/ponytail`, `/impeccable`
- Depends on: T1, T2
- Done when: `npm run build` passes, the hero renders at desktop and mobile widths, the animation runs smoothly, and unmounting leaves no leaked WebGL context.

### T4: Replace hero content with Hyuga Labs content
The current hero copy is placeholder ("Woven by Light", "An interactive tapestry of light and motion…", "Explore the Weave", the "Woven" brand and ⎎ symbol). Replace with Hyuga Labs content, using the logo from `public/images/logos/`.
- Copy decisions: see `memory.md`. Recommended defaults are in there.
- Depends on: T3
- Done when: no placeholder or third-party copy remains.

### T5: Site header
One header with the Hyuga Labs logo (dark-mode variant) and nav links: Home and Components. This header is also the hero's nav (T3). Footer is intentionally NOT part of this task.
- Depends on: T2
- Done when: header works on mobile and desktop, and links resolve.

### T6: SEO and metadata foundation
Replace the "Under Construction" metadata in `app/layout.tsx`. Add a per-page title and description, Open Graph and Twitter cards, `robots.ts`, `sitemap.ts`, and Organization JSON-LD.
- Keep `metadataBase` as `https://hyugalabs.com`.
- Skill: `/find-skills` (Next.js SEO best practice)
- Depends on: T4 (for real copy)
- Done when: sitemap and robots resolve, and metadata is correct in the built HTML.

## Phase 1: Core pages

### T7: `/components` template gallery (the most important page)
A gallery of the Hyuga Labs templates. Each card has a preview, a name, a short description, and a link to the template.
- Template data: a static typed array in code. No CMS. (Ponytail: nothing more complex until a real need appears.)
- Depends on: T5
- Use placeholder template entries (names, descriptions, placeholder preview images, `#` links) until the real list is provided. Swapping in real data later should only touch the data array.
- Done when: every template renders with a working link and the page works on mobile.

### T8: Template previews
Preview assets for each template in `public/images/templates/`, using optimized images via `next/image`.
- Depends on: T7
- Placeholder preview images are fine for now. Real previews are swapped in later.
- Done when: images are optimized and do not cause layout shift.

### T9: Home page assembly
Compose `app/page.tsx` from the hero and header. Leave a clear slot for future sections (services, social content, footer, contact form), which are added later.
- Depends on: T4, T5
- Done when: home renders the hero correctly with no unused code.

## Phase 2: Quality

### T10: Performance and cleanup pass
- Confirm `package.json` has no unused dependencies (`lucide-react` removed; `framer-motion` not added).
- Check the hero canvas does not hurt Largest Contentful Paint or Total Blocking Time. Lighthouse on home and `/components`.
- Skill: `/ponytail`
- Done when: no unused code or dependencies, and Lighthouse performance is good on both pages.

### T11: Verification
- `npm run build` and `npm run lint` pass.
- Browser check at phone and desktop widths, golden path and edge cases.
- Run the `converge` agent if a spec was created for this work.
- Done when: no errors, and the user has reviewed the pages.

---

## Backlog (not in this session, not scheduled)

Each of these is added one at a time, with components the user provides:
- **Services section**: SEO, CRM, booking, quotes, custom websites
- **Social content service section** (new offering)
- **Footer**
- **Contact us form**
- **Pricing or quote request flow** (later)
- **Blog or content hub** (later, for SEO)
