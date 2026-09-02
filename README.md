# Portfolio — Jairo Alessandro Nacurena

Personal portfolio and case-study site. Statically generated, trilingual, and built to be
readable by humans, crawlers and screen readers alike.

**Live:** [jaironacurena.com](https://jaironacurena.com) · **Previous version:** [skil2-professional-portfolio](https://github.com/J41r0Ps/skil2-professional-portfolio) (archived)

> **Status: in active development.** The architecture and build plan are settled
> ([`docs/BUILD_PLAN.md`](docs/BUILD_PLAN.md)); implementation is in progress. This README
> describes the intended system and is updated as sections land.

---

## Why this exists

I'm a second-year Applied Computer Science student at Thomas More Geel, building toward a
full-stack or backend internship. This site is where my projects are documented properly —
problem, approach, what I built, and what went wrong on the way.

It replaces a React SPA I built for Skills Integration Lab 2. That version worked, but it had
a structural flaw worth being explicit about.

## The problem with v1

v1 was a client-rendered single-page application. Requesting it without executing JavaScript
returned this:

```
<title>Jairo Nacurena — App & AI Engineer</title>
<meta name="description" content="...">
<div id="root"></div>
```

An empty document. No projects, no skills, no experience — all of it rendered client-side
after the bundle booted. Search crawlers, ATS parsers and link-preview bots that don't run
JavaScript saw nothing. Worse, all four languages shared one URL, so the Dutch and Spanish
versions didn't exist as far as any index was concerned.

That's the wrong architecture for a site that is almost entirely static content. The fix is
static generation with one URL per locale.

## Stack

| Layer | Choice | Reasoning |
|---|---|---|
| Framework | **Astro 7** | Islands architecture — zero JavaScript by default, opted into per component. Correct for a content-driven site. |
| Language | **TypeScript** (strict) | Content schemas, i18n dictionaries and component props all type-checked at build. |
| Interactive islands | **React 19** | Only where interaction genuinely requires it: the project filter and the 3D scene. |
| 3D | **Three.js / React Three Fiber** | A single isolated canvas with a measured performance budget. |
| Styling | **Tailwind CSS 4** | Design tokens as CSS custom properties, shared between the DOM and the WebGL scene. |
| Content | **Astro Content Collections + Zod** | Projects, skills and experience live as validated Markdown. A malformed tag fails the build. |
| i18n | **Astro native routing** | `/`, `/nl/`, `/es/` generated as separate static sites — no runtime translation library. |
| Hosting | **Cloudflare Pages** | Static edge delivery, preview deployments per pull request. |
| CI/CD | **GitHub Actions** | Typecheck and schema validation gate every deploy. |

## Architecture notes

**Content as a validated dataset.** Projects, skills and experience are Markdown files
described by Zod schemas. Technology tags come from a single enumerated vocabulary, so the
filter facets on the projects page are *derived* from the content rather than maintained by
hand — adding a project written in a new language makes a new filter chip appear on its own,
and a typo in a tag breaks the build instead of silently producing a dead filter.

**Islands, not a SPA.** Every project card is rendered to static HTML at build time. The
filter is a small React island that toggles visibility; it never controls what exists in the
document. The result filters instantly and stays entirely readable without JavaScript.

**Build-time internationalisation.** The locale is known when the page is generated, so
there is no provider, no translation hook, no client bundle of strings, and no flash of
untranslated content. Each locale is a separate crawlable site with `hreflang` alternates.
The CV download resolves to the correct localised PDF at build time for the same reason.

**A single WebGL context.** Exactly one `<Canvas>` exists in the codebase. It renders on
demand rather than continuously, caps device pixel ratio, pauses when off-screen or when the
tab is hidden, and falls back to a static image under `prefers-reduced-motion` or on mobile.

## Local development

Requires **Node 22+** (see `.nvmrc`).

```bash
npm install
npm run dev        # dev server with HMR
npm run typecheck  # tsc + astro check
npm run build      # static output in dist/
npm run preview    # serve the production build locally
```

> Auditing performance? Run Lighthouse against `npm run preview`, not the dev server —
> dev output is unminified and untree-shaken by design, so its scores mean nothing.

## Repository layout

```
src/
├── content/       projects, skills, experience — Markdown validated by Zod
├── i18n/          locale config, typed string dictionaries, helpers
├── layouts/       page shells, <head>, SEO
├── components/
│   ├── ui/        static Astro primitives — no JavaScript
│   ├── islands/   React components that genuinely need interactivity
│   └── three/     the 3D scene, isolated
├── pages/         file-based routing, one tree per locale
└── styles/        design tokens
docs/              build plan, architecture decisions, content guide
public/cv/         localised CV documents
```

## Licence

Dual-licensed, deliberately:

- **Code** — [MIT](LICENSE). Use it, learn from it, fork it.
- **Content** — [all rights reserved](LICENSE-CONTENT.md). Written case studies,
  photographs, imagery, CVs and personal branding are not covered by the MIT licence.

Third-party assets are listed with their licences in [`docs/DECISIONS.md`](docs/DECISIONS.md).

---

Jairo Alessandro Nacurena · Applied Computer Science, Thomas More Geel
[LinkedIn](https://www.linkedin.com/in/jairo-nacurena/) · [GitHub](https://github.com/J41r0Ps)
