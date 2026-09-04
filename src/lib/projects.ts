/**
 * PROJECT QUERIES — the join layer between the two collections.
 *
 * `projects` holds language-neutral facts; `projectCopy` holds per-locale
 * prose. Nothing outside this file should have to know that, or remember
 * to join them correctly. Pages ask for "the projects, in Dutch" and get
 * one merged object per project.
 *
 * This is the same role a repository plays in the .NET side of your work:
 * one place that knows how the data is actually stored, so the callers
 * don't.
 */

import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

import type { Locale } from '@/i18n/config';
import type { Category, Tech, Topic } from './taxonomy';

/** A project's facts merged with its copy in one locale. */
export interface Project {
  /** Slug — matches the facts filename. Used in URLs. */
  slug: string;

  // --- facts ---
  name: string;
  category: Category;
  context: CollectionEntry<'projects'>['data']['context'];
  status: CollectionEntry<'projects'>['data']['status'];
  year: number;
  period?: string;
  tech: readonly Tech[];
  topics: readonly Topic[];
  featured: boolean;
  order: number;
  links: CollectionEntry<'projects'>['data']['links'];
  cover?: CollectionEntry<'projects'>['data']['cover'];

  // --- copy ---
  title: string;
  summary: string;
  role?: string;
  coverAlt?: string;
  metrics?: Array<{ label: string; value: string }>;

  /** The raw copy entry, kept so a page can call render() on its body. */
  entry: CollectionEntry<'projectCopy'>;
}

/**
 * Every project, in one locale, newest first.
 *
 * Runs at build time, so this executes three times per build (once per
 * locale) and never in a browser.
 */
export async function getProjects(locale: Locale): Promise<Project[]> {
  const copies = await getCollection('projectCopy', ({ data }) => data.locale === locale);

  const projects = await Promise.all(
    copies.map(async (copy) => {
      // reference() stored { collection, id }; getEntry resolves it.
      // The build already guaranteed the target exists, so this cannot
      // be missing — but we check rather than assert, because a
      // non-null assertion here would hide a real bug later.
      const facts = await getEntry(copy.data.project);

      if (!facts) {
        throw new Error(
          `Project copy "${copy.id}" references "${copy.data.project.id}", which does not exist.`,
        );
      }

      return {
        slug: facts.id,
        ...facts.data,
        title: copy.data.title,
        summary: copy.data.summary,
        role: copy.data.role,
        coverAlt: copy.data.coverAlt,
        metrics: copy.data.metrics,
        entry: copy,
      } satisfies Project;
    }),
  );

  return projects.sort(byYearThenOrder);
}

/** Featured projects only, for the homepage. */
export async function getFeaturedProjects(locale: Locale, limit = 3): Promise<Project[]> {
  const projects = await getProjects(locale);
  return projects.filter((p) => p.featured).slice(0, limit);
}

/** One project by slug, or undefined. */
export async function getProject(
  slug: string,
  locale: Locale,
): Promise<Project | undefined> {
  const projects = await getProjects(locale);
  return projects.find((p) => p.slug === slug);
}

/**
 * Every technology actually used, with how many projects use it.
 *
 * DERIVED, never hardcoded. This is what makes the filter chips and the
 * "N technologies" counter maintain themselves: add a project using
 * Kubernetes and a Kubernetes chip appears, in all three languages,
 * with no code change.
 *
 * Sorted by frequency, then alphabetically, so the most relevant chips
 * come first.
 */
export async function getTechFacets(
  locale: Locale,
): Promise<Array<{ value: Tech; count: number }>> {
  const projects = await getProjects(locale);
  return countBy(projects.flatMap((p) => p.tech));
}

export async function getTopicFacets(
  locale: Locale,
): Promise<Array<{ value: Topic; count: number }>> {
  const projects = await getProjects(locale);
  return countBy(projects.flatMap((p) => p.topics));
}

export async function getCategoryFacets(
  locale: Locale,
): Promise<Array<{ value: Category; count: number }>> {
  const projects = await getProjects(locale);
  return countBy(projects.map((p) => p.category));
}

/** Headline numbers for the projects page. */
export async function getProjectStats(locale: Locale) {
  const projects = await getProjects(locale);
  const tech = new Set(projects.flatMap((p) => p.tech));

  return {
    projectCount: projects.length,
    techCount: tech.size,
    latestYear: Math.max(...projects.map((p) => p.year)),
  };
}

/* ------------------------------------------------------------------ */

function byYearThenOrder(a: Project, b: Project): number {
  if (a.year !== b.year) return b.year - a.year;
  return a.order - b.order;
}

function countBy<T extends string>(values: T[]): Array<{ value: T; count: number }> {
  const counts = new Map<T, number>();

  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
}
