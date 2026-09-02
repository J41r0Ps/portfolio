# Portfolio Build Plan
### Astro 7 · TypeScript · React islands (R3F) · Tailwind 4 · EN/NL/ES

> 20 sessions of ~3–4h each, in 6 phases. Not calendar days — SMD, Qlik and Java run in parallel.
>
> **Key property of this ordering: the site is complete, live and shareable after Session 11.**
> The 3D hero is additive. If it ever costs more than it's worth, it can be cut without blocking
> anything. Building the canvas first is how portfolios die at 80%.
>
> Each session below: **Goal** · **Steps** · **Concept** (the *why*, since the tech is new) ·
> **Done when** (the checkpoint I stop at for your review).

---

## Phase 0 — Foundations (Sessions 1–3)

### Session 1 — Repo, identity, legal
**Goal**: a public repo with a name you won't want to change, a README that already reads professionally, and the IP questions settled before anything is load-bearing.

**Steps**
1. Decide the project/brand name → check availability: GitHub, domain (.dev / .be / .com), BOIP register for the Benelux class
2. Create the repo. Decide the fate of `skil2-professional-portfolio` (archive, keep as v1, or rewrite history — see Concept)
3. `LICENSE` file — MIT for code. Decide separately whether *content* (project write-ups, photos) is MIT too, or reserved
4. `README.md` v1: what it is, stack + why, architecture, local dev commands, deploy target. Written as a portfolio artefact in its own right — recruiters read the README
5. `.gitignore`, `.editorconfig`, `.nvmrc` (Node 22 — Astro 7 minimum)
6. `docs/` folder: this plan, plus a `DECISIONS.md` for architecture decisions as we make them
7. Asset licence audit start: fonts (Space Grotesk / Geist — check the licence permits web embedding), any icon set, any 3D model you might reuse

**Concept — why the old repo matters**
Your Digital Startup notes: *commit history = dated evidence of authorship, never rewrite history on work you might need to prove is yours*. Archiving v1 rather than deleting it also gives you a visible before/after — the same move that made Grand Tours Analysis stronger than the course submission. That `legacy/` instinct was right; reuse it.

**Concept — why LICENSE now**
Without a LICENSE, a public repo is "all rights reserved" by default. A recruiter can read it but legally can't fork or reuse it, and it signals you don't know the rule. This is §1.7 of your own applied-IP file, applied to yourself.

**Done when**: repo exists, is public, has LICENSE + README + docs, and the name has cleared GitHub, domain and BOIP.

---

### Session 2 — Astro scaffold + design system
**Goal**: a running Astro 7 project in strict TypeScript with your sage/pine palette fully migrated to Tailwind 4.

**Steps**
1. `npm create astro@latest` — TypeScript **strict**, static output, no template
2. Add integrations: `@astrojs/react`, `@astrojs/sitemap`, Tailwind 4
3. Migrate the palette: the old `tailwind.config.js` `theme.extend` object becomes a CSS `@theme` block of custom properties
4. Collapse the `jairo-accent` / `accent.DEFAULT` duplication into one token
5. Fonts: self-host Space Grotesk / Geist / Geist Mono via Astro's font handling instead of a `<link>` to a CDN — removes a render-blocking third-party request and a GDPR question
6. Type scale + spacing scale defined as tokens, not ad-hoc classes
7. `BaseLayout.astro`: `<head>`, meta, theme-color, skip link, `<slot />`
8. First commit of real structure

**Concept — Tailwind 4 vs 3**
Tailwind 4 moved configuration from a JS object into CSS custom properties (`@theme`). The values are identical; the file changes. The benefit for us: those tokens become real CSS variables, so the R3F scene can read the same accent colour the CSS uses — one source of truth for the palette across DOM and WebGL.

**Concept — why self-host fonts**
A `<link>` to Google Fonts is a DNS lookup + TLS handshake + render-blocking stylesheet before your first paint, plus a third-party request that a strict CSP has to allow. Self-hosted and preloaded, the font is on the same connection as the HTML.

**Done when**: `npm run dev` shows a blank page in your exact brand colours, dark and light, with the right typefaces.

---

### Session 3 — i18n plumbing
**Goal**: three real static locales generating, with no runtime translation library anywhere.

**Steps**
1. `astro.config.mjs` i18n config: `defaultLocale: 'en'`, `locales: ['en','nl','es']`, `prefixDefaultLocale: false` → `/`, `/nl/`, `/es/`
2. `src/i18n/config.ts`: locale list `as const`, display names, CV filename map
3. `src/i18n/ui.ts`: typed string dictionaries. English is the source of truth; NL/ES typed against it so a missing key is a **compile error**
4. `src/i18n/utils.ts`: `getLocaleFromUrl()`, `useTranslations(locale)`, `localizedPath()`
5. `LocaleSwitcher` — must link to the *equivalent* page in the target locale, not the homepage
6. `hreflang` alternates + `x-default` in `BaseLayout`
7. Verify: three routes build, each with correct `<html lang>`

**Concept — the shift from react-i18next**
On your current site, translation is runtime state: a provider, a hook, a JSON bundle shipped to the browser, and one URL for all four languages. Here, the locale is known at build time. Astro generates three separate static sites. No provider, no hook, no bundle, no flash of untranslated content — and critically, three crawlable URLs so a Dutch recruiter can actually find the Dutch version. This is the piece that made Pierina's site indexable and yours invisible.

**Concept — why type the dictionaries**
`Record<string, string>` lets you ship a missing Dutch key silently. Typing NL and ES as `typeof en` means forgetting a translation fails the build. Same instinct as the Zod schema on content: catch it at build, not in front of a recruiter.

**Done when**: `/`, `/nl/`, `/es/` all build, the switcher moves between them preserving the page, and deleting one NL key breaks the build.

---

## Phase 1 — Content model (Sessions 4–5)

### Session 4 — Content collections + Zod schema
**Goal**: the "database" — a validated schema for projects, skills and experience.

**Steps**
1. `src/content.config.ts`: collections for `projects`, `skills`, `experience`
2. Define the canonical skill/tag vocabulary as a `const` array → `z.enum()` over it
3. Project schema: slug, title, year, summary, role, stack[], tags[], category, featured, links (repo/live), cover image, metrics, status
4. Decide the per-locale strategy: one entry per locale (`projects/en/nexus.mdx`) vs one entry with translated fields
5. Author **one** real entry end to end — NEXUS Esports, in English
6. Break it deliberately (typo a tag) and confirm the build fails with a useful message
7. `docs/CONTENT_GUIDE.md`: how to add a project, so future-you doesn't have to re-derive it

**Concept — this is your DTO discipline applied to content**
The Zod schema is the data annotation layer; the collection is the `DbContext`; the markdown files are the rows. Validation runs at build instead of `SaveChanges()`. The payoff is the same as in NEXUS: a typo becomes a loud failure instead of a broken filter chip in production. And because Zod infers TypeScript types from the schema, every component that reads a project gets autocomplete on its fields for free.

**Concept — why the tag vocabulary is an enum, not free text**
Free-text tags drift: "React", "ReactJS", "react" become three filter chips for one technology. An enum makes drift impossible and gives you the filter facets automatically.

**Done when**: NEXUS renders from markdown on a throwaway page, and a bad tag fails the build.

---

### Session 5 — Content migration
**Goal**: every project you have, in the collection, in English.

**Steps**
1. Port from `Student_profile.md` + project docs: NEXUS Esports, Grand Tours Analysis, ShelfScope, plus course projects worth showing
2. Add the in-flight ones as they land: SMD, Qlik data science, Java
3. Experience + education entries
4. Skills collection: name, category, icon, proficiency, first-used year
5. Cover images: source, crop, WebP/AVIF, consistent aspect ratio
6. Sanity pass: does each write-up answer *problem → what I built → what I learned*? (Pierina's framing, and it's the right one)

**Concept — write-ups are the product**
You said the projects are the important part. The architecture is scaffolding; these files are what a reviewer actually reads. A project with a weak write-up looks weaker than one with a strong write-up and less code. Budget real time here — possibly more than one session.

**Done when**: the collection holds every project, English complete, all validating.

---

## Phase 2 — Static shell (Sessions 6–8)

### Session 6 — Chrome: nav, footer, theme
**Goal**: the frame around every page, zero JS except the theme toggle.

**Steps**
1. Header: logo, nav, locale switcher, theme toggle, CV button
2. Mobile nav
3. Dark/light toggle: inline blocking script in `<head>` reading `localStorage` + `prefers-color-scheme` **before** first paint
4. Footer: contact, socials, licence line, build info
5. Focus rings, skip link, keyboard nav — accessibility from the start, not bolted on
6. Reusable `ui/` primitives: Button, Chip, Card, SectionHeader (keep the numbered headers from v1 — they're good)

**Concept — the theme flash**
In a SPA, theme is React state and the first paint is already yours. On a static site the HTML arrives before any JS, so a `useEffect` toggle produces a visible white flash on a dark-mode load. The fix is a tiny synchronous script in `<head>` that sets the class before the browser paints. This is the single most common Astro dark-mode bug.

**Done when**: nav and footer on all pages in all three locales, theme persists with no flash, full keyboard traversal.

---

### Session 7 — Home page (no 3D yet)
**Goal**: a complete, convincing homepage that ships zero JavaScript.

**Steps**
1. Hero: headline, subhead, CTAs — a static gradient placeholder where the canvas will go
2. Stat strip computed from the collections (`N projects · M technologies · latest year`) — never hardcoded
3. Featured projects (3), pulled by the `featured` flag
4. Skills overview grouped by category
5. Short about teaser → links to the full page
6. Contact CTA
7. Responsive pass: 375 / 768 / 1440

**Concept — reserve the canvas space now**
The 3D slot gets its final dimensions and a static background in this session. When the canvas mounts later, it fills a box that already exists, so nothing shifts. Layout shift after hydration is a Core Web Vitals penalty and looks cheap.

**Done when**: homepage complete in all three locales, and the network tab shows no JS bundle at all.

---

### Session 8 — About, Experience, Education
**Goal**: the human pages.

**Steps**
1. About: background, the Ecuador → Belgium → Thomas More path, personality, hobbies, how you work
2. Experience/education timeline from the collection
3. Photo(s), optimised
4. "How I work" section — your endpoint-by-endpoint review method, the validate-against-external-facts habit from the data science projects. Concrete method beats adjectives
5. Optional: a languages block (ES native / EN working / NL learning) — relevant for Belgian employers

**Concept — specificity is the differentiator**
Every student portfolio says "passionate problem solver". Almost none say "I validate outputs against externally known facts, because both my data projects caught real bugs that way while the wrong dataset looked completely reasonable." The second one is memorable and unfakeable. Write these sections with the same concreteness as your project docs.

**Done when**: both pages complete in English, structure ready for NL/ES.

---

## Phase 3 — Projects showcase (Sessions 9–11)

### Session 9 — Project grid
**Goal**: every project rendered as static HTML.

**Steps**
1. `ProjectCard.astro`: cover, title, year, one-line summary, tag chips, link
2. Grid with sensible responsive columns
3. Stat strip + derived facet list (each tag with its count, from the collection)
4. Sort: featured → year desc
5. Hover treatment — keep the spotlight/tilt feel from v1 if it can be done in CSS

**Concept — everything renders, always**
All cards go into the HTML at build. No fetching, no client-side list rendering. This is what made Pierina's page fully readable to a crawler and yours empty. The filtering added next only *hides* — it never controls what exists.

**Done when**: all projects visible as static HTML, facet counts correct and derived.

---

### Session 10 — Filter island
**Goal**: instant filtering, minimal JS, crawlable content, shareable URLs.

**Steps**
1. `ProjectFilter.tsx` — the first real React island
2. Filter by tag/technology/category, multi-select, with counts
3. Cards carry `data-tags`; the island toggles a class. No re-rendering of card content
4. Sync active filters to the URL query string → `?tag=react` is shareable and survives reload
5. Empty state, clear-all, live region announcing result count
6. Decide: does the grid need Nanostores, or can chips + grid live in one island? (Prefer one island — skip the dependency)
7. Optional: ⌘K command palette (Pierina has one; it's a nice touch)

**Concept — the island boundary is the design decision**
The instinct from React is to make the whole page a component with `useState` and `.filter()`. That would delete your projects from the HTML. Instead the island wraps only the *controls*; the content stays static. Choosing where the island boundary sits is the core skill of this architecture, and this session is where it clicks.

**Concept — why URL state**
Filter state in `useState` only is invisible and unshareable. In the URL it's linkable ("here are my data science projects"), survives refresh, and gives back-button behaviour for free.

**Done when**: filtering is instant, URL reflects state, and view-source still shows every project.

---

### Session 11 — Project detail pages
**Goal**: the case-study pages — the most important pages on the site.

**Steps**
1. `[...slug].astro` with `getStaticPaths()` across locales
2. Layout: hero, metadata sidebar (role, year, stack, links), body, gallery, outcomes
3. MDX so write-ups can embed components (callouts, diagrams, comparison tables — the Grand Tours before/after table would be excellent here)
4. Prev/next navigation
5. Per-project OG images and meta
6. Breadcrumbs + `BreadcrumbList` structured data

**Concept — case study, not description**
The strongest thing in your existing docs is the *bugs worth remembering* sections — the doubled `catalogue/` path, the `<s>` tag swallowing a rider's name. Those are what a senior engineer reads and thinks "this person debugs properly." Give them a first-class slot in the template rather than burying them.

**🏁 MILESTONE: the site is complete and deployable here.** Everything after this is enhancement.

**Done when**: every project has a real case-study page, statically generated.

---

## Phase 4 — Motion and 3D (Sessions 12–14)

### Session 12 — Motion pass
**Goal**: the polish that makes it feel expensive, at near-zero JS cost.

**Steps**
1. Scroll progress bar — CSS `animation-timeline: scroll()`, no JS
2. Section reveals — CSS `view-timeline`, no JS
3. Masked headline reveal, staggered entrances
4. `prefers-reduced-motion` disabling all of it
5. View Transitions between pages
6. Reach for Motion (ex Framer Motion) only where CSS genuinely can't

**Concept — this replaces most of your v1 JS**
Your current site does scroll progress, parallax and scroll-triggered stagger through Framer Motion — meaning JS runs on every scroll frame. CSS scroll-driven animations run on the compositor thread, off the main thread, with no JS at all. Your scroll progress bar becomes about five lines of CSS. Same output, dramatically better performance, and it's the modern answer.

**Done when**: the site feels alive, JS payload essentially unchanged, motion off under reduced-motion.

---

### Session 13 — 3D hero
**Goal**: the canvas, isolated, inside a budget agreed before a line is written.

**Steps**
1. Pick the concept (I'll bring 2–3 options with their costs). Direction: ambient and subtle, not a spinnable object
2. `HeroScene.tsx` — the only `<Canvas>` in the codebase, ever
3. Mount as `client:only="react"` (Three.js needs browser APIs) with `client:visible` semantics
4. Non-negotiables from the first commit: `frameloop="demand"`, `dpr={[1, 1.5]}`, pause on tab blur, reduced-motion → static
5. Read the accent colour from the CSS custom property so the scene follows the theme
6. Named imports only — never `import * as THREE`
7. Measure the bundle delta immediately

**Concept — why `frameloop="demand"`**
R3F's default renders 60fps forever, whether or not anything changed. On a recruiter's laptop that's a fan spinning up on a portfolio site — the opposite of the impression you want. `demand` renders only on invalidation. If the scene animates continuously, drive it deliberately and stop it when off-screen.

**Concept — one canvas, one context**
Browsers cap WebGL contexts (~16) and silently kill the oldest when you exceed it. One canvas, always. It also means one place to profile when something is slow.

**Done when**: the hero runs, the bundle delta is measured and acceptable, and it stops rendering when scrolled away or the tab is hidden.

---

### Session 14 — 3D performance and fallbacks
**Goal**: fast everywhere, including a mid-range Android.

**Steps**
1. Profile: draw calls, triangles, frame time (r3f-perf)
2. Compress any model — Draco/meshopt (you did 40MB → 2MB before; same discipline)
3. Mobile: static pre-rendered image, not a degraded canvas
4. WebGL-unsupported fallback
5. `dispose()` on unmount — verify no memory leak across navigations
6. Lighthouse on the built output, not dev
7. Decide honestly: does it earn its bytes? If not, cut it. That decision is itself a good interview story

**Concept — the honest cut**
Three.js + R3F + drei is roughly 600kb–1MB. If the hero adds a second to load and contributes atmosphere only, a recruiter on hotel wifi is worse off. Being able to say "I built it, measured it, and removed it because it cost more than it gave" is a stronger signal than a laggy canvas.

**Done when**: Lighthouse performance ≥ 90 on mobile with the hero present, or the hero is deliberately cut.

---

## Phase 5 — Contact, CV, SEO (Sessions 15–17)

### Session 15 — Contact
**Steps**
1. Contact section: email, LinkedIn, GitHub, location, availability
2. Form via a static-friendly service (Web3Forms / Formspree / Cloudflare) — no backend, no server to maintain
3. Validation, honeypot spam trap, success and error states
4. Explicit "open to internship from [dates]" line

**Concept — no backend**
Your v1 README lists a planned .NET API "when the contact form ships". For one form, a whole API is infrastructure you have to keep alive, patch and pay for, and it can go down and silently lose a recruiter's message. A form service is more reliable and free. Save the .NET for NEXUS, where it's justified.

**Done when**: a message from all three locales reaches your inbox.

---

### Session 16 — CV download
**Steps**
1. Three localised PDFs in `public/cv/` with a strict naming convention
2. Filename map in the i18n config, resolved at build time — zero JS
3. Prominent button in header + contact section, `download` attribute, size and format in the label
4. Optional: download event tracking
5. `docs/CV_UPDATE.md` — the process for replacing them

**Concept — no detection needed**
You framed this originally as runtime language detection. On a per-locale static build the page already *is* Dutch; the Dutch filename is resolved at build. No JS, no cookie, no chance of serving the wrong CV.

**Done when**: each locale serves its own PDF, verified.

---

### Session 17 — SEO and metadata
**Steps**
1. Per-page titles and descriptions, localised
2. `hreflang` + `x-default` sitewide
3. JSON-LD: `Person` on home, `CreativeWork` per project, `BreadcrumbList`
4. Auto-generated OG images per page and locale
5. `sitemap.xml` (all locales), `robots.txt`, `llms.txt` (keep it — it was a good call in v1)
6. Canonical URLs
7. Validate with Rich Results Test + a social preview debugger

**Concept — this is where the framework choice pays off**
Everything here works because the pages are real static HTML. On the SPA this was either impossible or required prerendering hacks. Run the crawler test at the end and compare against v1's empty body — that comparison belongs in the README.

**Done when**: rich results validate, previews render correctly, all three locales indexed correctly.

---

## Phase 6 — Ship (Sessions 18–20)

### Session 18 — CI/CD and hosting
**Steps**
1. Host decision: Cloudflare Pages vs Azure Static Web Apps (I'll bring the comparison — Azure reuses your NEXUS knowledge; Cloudflare is faster and simpler for static)
2. GitHub Actions: install → typecheck → lint → build → deploy
3. Preview deployments on PRs
4. Build fails on type errors or schema violations — the gate is the point
5. Security headers (CSP, HSTS)
6. Cache headers for immutable assets

**Concept — the pipeline is a portfolio artefact**
You already have two working pipelines from NEXUS. This one is simpler but should be visibly correct: typecheck and schema validation as blocking gates means a broken project file can never reach production. Say that in the README.

**Done when**: push to main deploys automatically; a deliberate type error blocks it.

---

### Session 19 — Domain, QA, accessibility
**Steps**
1. Custom domain + DNS + HTTPS (drop the `azurewebsites.net` URL — it reads as a school project)
2. Privacy-respecting analytics (Plausible / Cloudflare / Umami), no cookie banner needed
3. Accessibility audit: axe, keyboard-only pass, screen reader spot-check, contrast on both themes
4. Cross-browser + real mobile device
5. Full link check across three locales
6. 404 page, localised

**Concept — why the domain matters more than it should**
`jairo-portfolio-frontend-eqcaa5gwdyavc4fq.westeurope-01.azurewebsites.net` is unshareable, unsayable, and unmemorable. A real domain costs about €10/year and is the highest-leverage change on this list.

**Done when**: live on your domain, zero critical a11y issues, working on real devices.

---

### Session 20 — Translations and documentation
**Steps**
1. Full NL translation — UI strings and content. Get a native speaker to review; this is a Belgian internship market
2. Full ES translation (your native language — but keep the register professional, not casual)
3. Final README: architecture, decisions, the SPA→static SEO comparison with numbers, Lighthouse scores, lessons learned
4. `docs/ARCHITECTURE.md` and `docs/DECISIONS.md` finalised
5. Update `Student_profile.md` with the new stack and this project
6. Archive v1 repo with a pointer to the new one

**Concept — the README is a case study too**
NEXUS's README is a portfolio piece. This one should be as well: "the previous version returned an empty body to crawlers; this one returns full content in three languages, here are the before/after numbers." That's a measurable, defensible engineering decision — exactly the kind of thing that gets asked about in an interview.

**Done when**: three complete locales, documentation done, v1 archived.

---

## Ongoing, not a session

- **New projects**: as SMD, Qlik and Java finish, each is one markdown file in the collection. That's the whole point of the content architecture — no code change, no redeploy work, the filter chips update themselves.
- **`Student_profile.md`**: keeps being the source of truth. Send me updates and I'll fold them in.
- **Skills**: new tag → add to the enum → available everywhere.

---

## Risk register

| Risk | Mitigation |
|---|---|
| 3D eats time and performance | Sits at session 13, after the site is already shippable. Cuttable. |
| Translation is the actual bottleneck | English-complete first; NL/ES structurally supported from session 3, filled at 20. |
| Content quality lags engineering | Sessions 5, 8 and 11 are writing sessions. Budget them properly — this is the part reviewers read. |
| New-stack friction (Astro/TS) | Sessions 1–4 are deliberately small. Concepts explained at the point of use. |
| Scope creep | ⌘K palette, blog, view transitions are marked optional. Ship first, embellish after. |
