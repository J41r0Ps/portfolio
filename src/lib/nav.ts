import type { UIKey } from "@/i18n/ui";

/**
 * The site's navigation. Paths are locale-neutral — localizePath()
 * prefixes them per language at render time.
 *
 * `satisfies` checks the shape without widening the type, so
 * `NAV_ITEMS[0].path` stays the literal '/about' rather than `string`.
 */
export const NAV_ITEMS = [
  { key: "nav.about", path: "/about" },
  { key: "nav.projects", path: "/projects" },
  { key: "nav.experience", path: "/experience" },
  { key: "nav.contact", path: "/contact" },
] as const satisfies ReadonlyArray<{ key: UIKey; path: string }>;
