/**
 * Locale configuration — the single source of truth for which languages
 * this site speaks.
 *
 * Adding a locale means editing this file, adding a dictionary in ui.ts,
 * adding a page folder, and adding a CV. TypeScript will point at every
 * one of those places if you miss one.
 */

/**
 * `as const` is what makes this useful. Without it TypeScript infers
 * `string[]`, and `Locale` would just be `string` — every typo compiles.
 * With it, the array is readonly with literal members, so `Locale`
 * becomes the union `'en' | 'nl' | 'es'` and `t('...', 'de')` is a
 * compile error.
 */
export const LOCALES = ['en', 'nl', 'es'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

/**
 * Language names written in their own language — never translated.
 * A Dutch speaker looks for "Nederlands", not "Dutch".
 */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  nl: 'Nederlands',
  es: 'Español',
};

/** Short labels for the compact switcher in the header. */
export const LOCALE_SHORT: Record<Locale, string> = {
  en: 'EN',
  nl: 'NL',
  es: 'ES',
};

/**
 * Full BCP-47 tags for <html lang> and hreflang.
 *
 * Region matters here: `nl-BE` (Flemish) rather than `nl-NL`, because the
 * audience is Belgian. `es` stays region-neutral — pinning it to `es-EC`
 * would narrow reach for no benefit.
 */
export const LOCALE_TAGS: Record<Locale, string> = {
  en: 'en',
  nl: 'nl-BE',
  es: 'es',
};

/**
 * OpenGraph locale codes. Underscore-separated, not hyphenated —
 * a different spec from BCP-47, and getting it wrong means social
 * platforms ignore the tag.
 */
export const OG_LOCALES: Record<Locale, string> = {
  en: 'en_GB',
  nl: 'nl_BE',
  es: 'es_ES',
};

/**
 * Localised CV filenames, resolved at BUILD time.
 *
 * This is the whole "dynamic CV download" feature. No runtime language
 * detection, no cookie, no JavaScript: the Dutch page already knows it
 * is Dutch, so it links straight to the Dutch PDF.
 *
 * Files live in /public/cv/.
 */
export const CV_FILES: Record<Locale, string> = {
  en: '/cv/jairo-nacurena-cv-en.pdf',
  nl: '/cv/jairo-nacurena-cv-nl.pdf',
  es: '/cv/jairo-nacurena-cv-es.pdf',
};

/** Type guard — narrows an unknown string to a Locale. */
export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
