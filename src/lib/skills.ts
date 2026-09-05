/**
 * SKILLS — derived entirely from project content.
 *
 * There is no hand-maintained skills list anywhere in this codebase.
 * A technology appears here if, and only if, a project in the content
 * collection uses it.
 *
 * Why that matters beyond tidiness: a hardcoded skills list is a claim,
 * and claims drift. This one cannot say "React" unless a project says
 * "React" — every entry is backed by something a reviewer can click
 * through to. It also means the counts are honest: "4 projects" next to
 * a technology is a fact about the content, not a self-assessment.
 */

import type { Locale } from '@/i18n/config';
import { getTechFacets } from './projects';
import { TECH_GROUPS, TECH_GROUP_OF, type Tech, type TechGroup } from './taxonomy';

export interface SkillGroup {
  group: TechGroup;
  items: Array<{ value: Tech; count: number }>;
}

/**
 * Technologies grouped by category, in the fixed order defined by
 * TECH_GROUPS. Empty groups are dropped, so a category with no projects
 * behind it simply doesn't render.
 */
export async function getSkillGroups(locale: Locale): Promise<SkillGroup[]> {
  const facets = await getTechFacets(locale);

  return TECH_GROUPS.map((group) => ({
    group,
    items: facets.filter((facet) => TECH_GROUP_OF[facet.value] === group),
  })).filter((entry) => entry.items.length > 0);
}
