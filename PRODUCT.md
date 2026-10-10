# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Small-business owners (cleaning companies, local services, community projects) with little or no web and social presence. They arrive wanting to see what Hyuga Labs has built, then decide whether to get in touch about a site.

## Product Purpose
Hyuga Labs is an agency that builds custom websites for small businesses, shaped around each client's needs (booking, quotes, CRM, and so on), plus SEO and social content creation. The website exists to show prospects what we can build (`/components`, "Our Work") and to turn them into conversations (`/contact`).

## Positioning
Custom-built sites shaped around how the client's business actually works (quote forms, booking, CRM), not template drops, with SEO and social content from the same team.

## Operating Context
- The team works remotely with clients anywhere. Do not name a city or country (confirmed 2026-10-03).
- Clients so far are US small businesses (Ohio, New York) plus one community site.
- Contact channels: email `info@hyugalabs.com` (hyugalabs@gmail.com only sends contact-form mail via env), phone `+1 313-552-8649` (US number, shown on the site for Free Caller Registry), Instagram, Facebook and LinkedIn (`src/lib/site-config.ts`).

## Capabilities and Constraints
- Next.js 16 App Router, Tailwind v4, `motion`, `three`. Keep the dependency list lean and the site fast on phones.
- Contact form delivery is **undecided**. The form is a placeholder until the user picks a backend.
- `/services` and `/about` are built (2026-10-04). Team names, roles and photos on `/about` are placeholders until the user supplies them.

## Brand Commitments
- Name: Hyuga Labs. Logos in `public/images/logos/`.
- Colors and fonts are set in `hyugalabs-tasks.md` (60-30-10).

## Evidence on Hand
- Five live client sites with screenshots: `src/data/sites.ts`, `public/images/sites/`.
- No testimonials, reviews, client counts, pricing or response-time guarantees exist. Do not invent them.

## Product Principles
1. Show, don't claim: real work over adjectives.
2. Make reaching out feel low-risk and human.
3. Fast on a mid-range phone, always.
