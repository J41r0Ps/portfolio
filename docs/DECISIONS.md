# Architecture Decisions

A running log. One entry per decision that would be expensive or annoying to reverse.
Newest at the bottom. The point is that future-me (and anyone reviewing this repo) can see
*why*, not just *what*.

Format: **Context** → **Decision** → **Consequences**.

---

## ADR-001 · Astro over Next.js, React SPA and SvelteKit

**Date**: 2026-09 · **Status**: accepted

**Context**
v1 was React + Vite, client-rendered. Fetching it without JavaScript returned an empty
`<div id="root">` — no content reached crawlers or ATS parsers, and four languages shared one
URL. The site is ~95% static content with one small interactive area (a 3D hero), so a SPA
runtime is being shipped for prose.

**Options considered**

- *React + Vite (status quo)* — no static output, no per-locale URLs. Rejected.
- *Next.js* — capable, but the App Router removed built-in i18n routing, and it ships a React
  runtime plus hydration for pages that are mostly text. It's a full-stack framework for a
  project with no server needs.
- *SvelteKit + Threlte* — technically excellent and lighter, but a new component model and a
  smaller 3D ecosystem to learn simultaneously.
- *Astro* — zero JS by default, native i18n routing, content collections, React islands so
  existing React knowledge transfers.

**Decision**
Astro 7, static output, with React islands where interactivity is genuinely required.

**Consequences**

- Every page is real HTML in three languages; the v1 crawler problem is structurally solved.
- New framework to learn, but the island boundary is the only unfamiliar concept.
- Anything needing a server must be an external service (see ADR-005).

---

## ADR-002 · TypeScript, strict mode

**Date**: 2026-09 · **Status**: accepted

**Context**
Content is authored as Markdown across three locales, with a shared tag vocabulary. Free-text
tags drift ("React" / "ReactJS" / "react" become three filter chips for one technology), and a
missing translation key is invisible until a user hits it.

**Decision**
TypeScript in strict mode throughout. Content validated by Zod schemas; the tag vocabulary is
an enum; non-English dictionaries are typed against the English one.

**Consequences**

- A typo in a tag or a missing translation fails the build rather than reaching production.
- Same discipline as the DTO / data-annotation layer in my .NET work, applied to content.
- Slower to author initially; much cheaper to maintain.

---

## ADR-003 · Dual licensing — MIT code, reserved content

**Date**: 2026-09 · **Status**: accepted

**Context**
A public repo without a licence is "all rights reserved" by default, which stops anyone from
legally reusing the code. But blanket MIT would also permit verbatim republication of my
biography, photographs and case studies under someone else's name.

**Decision**
MIT for source code (`LICENSE`). All rights reserved for written content, imagery, CV
documents and personal branding (`LICENSE-CONTENT.md`).

**Consequences**

- The architecture is openly reusable; the personal material is not.
- Requires the scope boundary to stay accurate as the repo grows.
- Mirrors the split already used in `grand-tours-analysis` (MIT code / CC BY-SA data).

---

## ADR-004 · Domain and repository naming

**Date**: 2026-09 · **Status**: accepted

**Context**
v1 lived at a generated Azure hostname — unshareable, unsayable, and reading as a school
project. A permanent, memorable address was needed before anything else was built on top.

**Decision**
Register `jaironacurena.com`. Repository named `portfolio`.

Considered and rejected: `jairoalessandronacurena.com` (27 characters — hard to say aloud in
an interview and easy to mistype); `.be` (a local signal, but less portable if I work outside
Belgium, and recruiters type `.com` by reflex).

**Trademark check**: searched the BOIP Benelux Trademarks Register on 2026-09-02 for
"nacurena", "jaironacurena" and "jairo nacurena" — no results in any class. Registration
was not pursued: the domain is a personal name used in a personal capacity, and using
one's own name in trade is generally permitted. Noted for the record that a domain name
is not intellectual property and confers no rights over the name itself.

**Consequences**

- One permanent address; the Azure hostname is retired.
- Auto-renew enabled — a lapsed portfolio domain is bought by squatters within days.

---

## ADR-005 · No backend

**Date**: 2026-09 · **Status**: accepted

**Context**
v1 planned an ASP.NET Core API whose only job was to receive contact-form submissions.

**Decision**
Fully static. The contact form uses a hosted form service; there is no server, no database
and no runtime API.

**Consequences**

- Nothing to patch, pay for, or wake up. No cold starts losing a recruiter's message.
- The .NET work stays in NEXUS Esports, where a backend is actually warranted.
- If dynamic behaviour is ever needed, an edge function is the escape hatch.

---

## ADR-006 · v1 archived, not deleted

**Date**: 2026-09 · **Status**: accepted

**Context**
`skil2-professional-portfolio` was a graded Skills Integration Lab 2 deliverable.

**Decision**
Keep it public, archive it read-only, and add a pointer to v2 explaining what was rebuilt
and why.

**Consequences**

- Commit history is preserved as dated evidence of authorship.
- The pair reads as a deliberate before/after — the same framing that made the Grand Tours
  rebuild stronger than the original course submission.
- `jaironacurena.me` was included free with the `.com` registration. It is not used and
  auto-renew is disabled; it will be allowed to lapse.
---

# Asset licence audit

Every third-party asset, with its licence and obligations. Checked **before** the asset
becomes load-bearing, not after launch.

| Asset | Source | Licence | Obligation | Verified |
| --- | --- | --- | --- | --- |
| Space Grotesk | Florian Karsten / Google Fonts | SIL OFL 1.1 | Ship `OFL.txt`; don't sell the font | ⬜ |
| Geist | Vercel | SIL OFL 1.1 | Ship `OFL.txt`; don't sell the font | ⬜ |
| Geist Mono | Vercel | SIL OFL 1.1 | Ship `OFL.txt`; don't sell the font | ⬜ |
| Icon set | *tbd* | | | ⬜ |
| 3D model(s) | *tbd* | | ⚠️ Check for CC-BY attribution requirements | ⬜ |
| Photography | Own work | © author | — | ⬜ |

**Rule**: nothing enters the repo until its row exists here. npm dependencies get the same
treatment — GPL/AGPL packages are flagged before they become load-bearing.
