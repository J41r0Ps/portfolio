/**
 * CONTENT COLLECTIONS — the site's database.
 *
 * The mental model, in terms you already have:
 *
 *   this file          ≈ your data annotations / EF configuration
 *   a collection       ≈ a DbSet<T>
 *   a content file     ≈ a row
 *   `astro build`      ≈ SaveChanges(), except validation runs at build
 *
 * ─────────────────────────────────────────────────────────────────────
 * THE SPLIT: facts vs. copy
 *
 * `projects` holds what is true regardless of language — the year, the
 * tech stack, the repository URL, whether it is featured. One file per
 * project. One truth.
 *
 * `projectCopy` holds what changes with language — the title, the
 * summary, the case study itself. Three files per project.
 *
 * They join on a slug, enforced by `reference()`.
 *
 * This is Entity vs. DTO applied to content. NEXUS being built with
 * SignalR is a fact about the software, not about English. Storing it
 * once means it cannot drift: adding a technology updates all three
 * languages at the same instant, and the filter chips are identical
 * across locales by construction rather than by discipline.
 * ─────────────────────────────────────────────────────────────────────
 */

import { defineCollection, reference } from "astro:content";
import { z } from "zod";
import { glob } from "astro/loaders";

import { LOCALES } from "./i18n/config";
import { CATEGORIES, CONTEXTS, STATUSES, TECH, TOPICS, EXPERIENCE_KINDS } from "./lib/taxonomy";

/* ==================================================================
   PROJECTS — language-neutral facts. YAML, no body.
   ================================================================== */
const projects = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/projects" }),

  schema: ({ image }) =>
    z.object({
      /**
       * Proper noun, identical in every language. "NEXUS Esports" is not
       * translated; the descriptive title around it is, and lives in copy.
       */
      name: z.string().min(2),

      category: z.enum(CATEGORIES),
      context: z.enum(CONTEXTS),
      status: z.enum(STATUSES),

      /** Year completed, or started if still running. Drives sort order. */
      year: z.number().int().min(2023).max(2035),

      /** Human-readable span shown on the card, e.g. "Feb – Jun 2026". */
      period: z.string().optional(),

      /**
       * `.nonempty()` is deliberate: a project with no technologies is
       * always an unfinished entry, never a real state.
       */
      tech: z.array(z.enum(TECH)).nonempty(),
      topics: z.array(z.enum(TOPICS)).nonempty(),

      /** Shown on the homepage. Keep to three or four. */
      featured: z.boolean().default(false),

      /** Manual tiebreaker within a year. Lower sorts first. */
      order: z.number().int().default(100),

      links: z
        .object({
          repo: z.url().optional(),
          live: z.url().optional(),
          docs: z.url().optional(),
        })
        .default({}),

      /**
       * `image()` gives Astro's optimiser the file, so it emits WebP/AVIF
       * at the right sizes with width and height baked in — which removes
       * layout shift. Requires the file to live under src/, not public/.
       *
       * Optional for now so entries can exist before their screenshots do.
       * Make it required once every project has a cover.
       */
      cover: image().optional(),
    }),
});

/* ==================================================================
   PROJECT COPY — one file per project per locale. MDX with a body.
   ================================================================== */
const projectCopy = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/project-copy" }),

  schema: z.object({
    /**
     * `reference()` validates that the target actually exists. A typo in
     * the slug fails the build with a useful message — the same guarantee
     * a foreign key constraint gives you, at build time instead of at
     * insert time.
     */
    project: reference("projects"),

    locale: z.enum(LOCALES),

    /** Displayed title. May differ per language. */
    title: z.string().min(2),

    /** One or two sentences for the card. Kept short on purpose. */
    summary: z.string().min(20).max(220),

    /** "Solo project", "Team of 4 — backend lead". Translatable. */
    role: z.string().optional(),

    /** Alt text belongs with the language, not with the image. */
    coverAlt: z.string().optional(),

    /**
     * Headline numbers for the detail page: 500+ players, 28 tests,
     * 96.9% match rate. Labels are prose, so these live here rather
     * than in the facts file.
     */
    metrics: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        }),
      )
      .max(4)
      .optional(),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/experience" }),
  schema: z.object({
    organisation: z.string().min(2),
    kind: z.enum(EXPERIENCE_KINDS),
    location: z.string().optional(),
    url: z.url().optional(),

    /**
     * ISO dates. z.coerce.date() parses "2024-09" into a Date, so
     * sorting is real date arithmetic rather than string comparison —
     * and an unparseable date fails the build.
     */
    start: z.coerce.date(),
    /** Omit for a current position. */
    end: z.coerce.date().optional(),

    /** Optional — only where a role actually involved them. */
    tech: z.array(z.enum(TECH)).optional(),
  }),
});

const experienceCopy = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/experience-copy" }),
  schema: z.object({
    entry: reference("experience"),
    locale: z.enum(LOCALES),

    /** Job title or qualification name. */
    title: z.string().min(2),
    /** One or two lines shown under the title. */
    summary: z.string().max(300).optional(),
    /** Two to four concrete things. Prefer specifics over adjectives. */
    highlights: z.array(z.string()).max(4).optional(),
  }),
});

export const collections = { projects, projectCopy, experience, experienceCopy };
