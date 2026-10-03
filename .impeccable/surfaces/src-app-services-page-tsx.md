---
version: 1
slug: "src-app-services-page-tsx"
primary_target: "src/app/services/page.tsx"
related_targets: []
---

# Services (/services)

Scope: whole route. Mode: Persuade. Extends the established charcoal/off-white/coral world (Geist, Inter, Bricolage); no new identity. Built around the user's ImmersiveFullscreenNav (Hyperiux), whose grammar (giant character-roll rows, clip-path wipe, staggered rise/grow reveals) is pinned. The same component is already the site menu, so here it becomes the way to browse services, not a second nav.

Audience: small-business owners, often not web-savvy, deciding what to ask for. Action: pick the services that fit and carry that list to /contact (chips pre-selected). Proof: the five live client sites, matched to each service through their real features. Social content is new and has no proof yet; say so. No pricing, ranking, response-time or client-count claims.

Constraints: fast on mid-range phones. Panel content is server-rendered (crawlable) and inert while closed. No new dependencies.

## Direction contract

THESIS: A services page you assemble: four giant service rows, each wiping open to show what you get and the live sites where we already built it, and the ones you add travel with you to the contact form. Refuses the default grid of icon-plus-heading service cards.

OWN-WORLD: Charcoal ground; off-white Geist rows at display scale with the menu's coral character-roll hover; hairline rules between rows; a plus that turns to a cross; panels that wipe down by clip-path; browser-free screenshot tiles that grow in; teal feature dots; coral pill "Add" toggles matching the contact chips; an off-white floating list bar.

STORY: The visitor sees in one viewport the four things we do. They believe it because each one opens onto real client sites doing exactly that. They add what fits and tap through to a contact form that already knows.

FIRST VIEWPORT: Headline "What does your business need?" with Bricolage coral "need?", one-line subline and a hint to tap a service. The service rows start inside the first viewport at about 6rem type on desktop and 12vw on phones, three to four rows visible on desktop. The primary action is opening a row; the list bar appears once something is added.

FORM: Structure 7 of 7 (needs builder), seed f868e1a9. Signature interaction: a row wipes open by clip-path, its lines rise and its screenshots grow in sequence; "Add" puts it on the floating list, which links to /contact with those needs pre-selected.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
