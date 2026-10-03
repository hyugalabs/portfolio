---
version: 1
slug: "src-app-about-page-tsx"
primary_target: "src/app/about/page.tsx"
related_targets: []
---

# /about

Mode: Persuade. Visitor: a small-business owner deciding whether these are people they'd trust with their site. Job: understand who Hyuga Labs is through how it works, see the people, then reach out. Action: "Tell us about your business" (/contact), secondary "See our work" (/components).

Proof: four stages of a build, each pinned to a real detail on a live client site screenshot. Team: names, roles and photos are placeholders in `src/data/team.ts` until the user supplies them. No origin story, dates, counts or claims beyond PRODUCT.md.

Constraints: must not repeat the Contact page's "What happens after you hit send" (logistics); About is about the craft decisions in each stage. Remote, no city. Fast on phones: CSS sticky, no pinned scroll-jacking, one small IntersectionObserver.

Unresolved: real team names/roles/photos. Sparkle Clean screenshot carries a "Concept redesign, not the official website" banner; user to confirm how it should be described.

## Direction contract

THESIS: About us is how we build. The page refuses the category About (founder photo, values grid, "our story" timeline) and instead walks four stages of a build, each proved by a marked detail on a real client site.

OWN-WORLD: The site's world unchanged: charcoal ground, off-white type, coral as the single action and marker colour, teal dots for small facts, Geist headlines with one Bricolage coral word, hairline offwhite/10 rules, rounded-xl screenshot frames, the menu's top-to-bottom clip-path wipe.

STORY: The visitor sees that every site starts from how their business already gets customers, gets shaped around it, built fast for phones and set up to be found; meets the people; and contacts us.

FIRST VIEWPORT: H1 "How we build, start to finish" (coral Bricolage "build") left at 8 cols, intro right at 4 cols naming Hyuga Labs as a small remote team; below, a rail 01-04 and stage 01 begins: giant "01", title, body, and the Sarah Ross screenshot with a coral marker on its call and text buttons.

FORM: Pinned build track, structure 3 of 7 on my ordered list, seed key a32a1428. Signature interaction: as each stage enters, its screenshot wipes open top-to-bottom and the coral marker draws around the proved detail; the sticky stage text and rail track the active stage. Motion grammar: WIPE [0.76,0,0.24,1] 0.8s, rise reveals, reduced-motion shows everything static.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
