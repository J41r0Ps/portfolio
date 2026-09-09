/**
 * EXPERIENCE QUERIES — the same facts/copy join used for projects.
 *
 * Also owns date formatting, because "Jun 2024" in English is "jun 2024"
 * in Dutch and "jun 2024" in Spanish, and month names differ. Doing that
 * with Intl rather than a lookup table means adding a language costs
 * nothing here.
 */

import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

import { LOCALE_TAGS, type Locale } from '@/i18n/config';
import type { ExperienceKind, Tech } from './taxonomy';

export interface ExperienceEntry {
  slug: string;

  // --- facts ---
  organisation: string;
  kind: ExperienceKind;
  location?: string;
  url?: string;
  start: Date;
  end?: Date;
  tech?: readonly Tech[];

  // --- copy ---
  title: string;
  summary?: string;
  highlights?: readonly string[];

  entry: CollectionEntry<'experienceCopy'>;
}

/** Everything for one locale, most recent first. */
export async function getExperience(locale: Locale): Promise<ExperienceEntry[]> {
  const copies = await getCollection('experienceCopy', ({ data }) => data.locale === locale);

  const entries = await Promise.all(
    copies.map(async (copy) => {
      const facts = await getEntry(copy.data.entry);

      if (!facts) {
        throw new Error(
          `Experience copy "${copy.id}" references "${copy.data.entry.id}", which does not exist.`,
        );
      }

      return {
        slug: facts.id,
        ...facts.data,
        title: copy.data.title,
        summary: copy.data.summary,
        highlights: copy.data.highlights,
        entry: copy,
      } satisfies ExperienceEntry;
    }),
  );

  // Newest first. Comparing Date objects is arithmetic, which is exactly
  // why the schema coerces rather than storing strings.
  return entries.sort((a, b) => b.start.getTime() - a.start.getTime());
}

/** Entries of one kind, for a section of the timeline. */
export async function getExperienceByKind(
  locale: Locale,
  kind: ExperienceKind,
): Promise<ExperienceEntry[]> {
  const all = await getExperience(locale);
  return all.filter((entry) => entry.kind === kind);
}

/**
 * "Jun 2024 – Jul 2024", localised.
 *
 * Intl.DateTimeFormat is built into the platform — no date library, no
 * bundle cost, and it runs at build time anyway. `presentLabel` is
 * passed in rather than looked up here so this stays free of i18n
 * imports and easy to test.
 */
export function formatRange(
  start: Date,
  end: Date | undefined,
  locale: Locale,
  presentLabel: string,
): string {
  const format = new Intl.DateTimeFormat(LOCALE_TAGS[locale], {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });

  const from = format.format(start);
  const to = end ? format.format(end) : presentLabel;

  return `${from} – ${to}`;
}
