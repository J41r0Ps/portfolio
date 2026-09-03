/**
 * i18n helpers.
 *
 * Everything here runs at BUILD time. None of it ships to the browser.
 * There is no provider, no context, no hook and no client-side bundle of
 * strings — the locale is a fact about the page being generated, not
 * state to be managed.
 */

import { DEFAULT_LOCALE, isLocale, LOCALES, type Locale } from './config';
import { ui, type UIKey } from './ui';

/**
 * Work out the locale from a URL pathname.
 *
 * `/nl/projects` → 'nl'
 * `/projects`    → 'en'  (default locale is unprefixed)
 */
export function getLocaleFromUrl(url: URL): Locale {
  const [, first] = url.pathname.split('/');
  return first && isLocale(first) ? first : DEFAULT_LOCALE;
}

/**
 * Returns a translation function bound to one locale.
 *
 * Named `useTranslations` by Astro convention, but it is NOT a React
 * hook — it is a plain function that runs during the build.
 *
 *   const t = useTranslations(locale);
 *   t('nav.about')                        → 'Over mij'
 *   t('projects.count.other', { count: 9 }) → '9 projecten'
 *
 * `key: UIKey` means an invalid key is a compile error, and your editor
 * autocompletes every available string.
 */
export function useTranslations(locale: Locale) {
  const dict = ui[locale];

  return function t(key: UIKey, params?: Record<string, string | number>): string {
    let value = dict[key];

    if (params) {
      for (const [name, replacement] of Object.entries(params)) {
        value = value.replaceAll(`{${name}}`, String(replacement));
      }
    }

    return value;
  };
}

/**
 * Turn a locale-agnostic path into a localised one.
 *
 *   localizePath('/projects', 'nl') → '/nl/projects'
 *   localizePath('/projects', 'en') → '/projects'
 *   localizePath('/', 'es')         → '/es/'
 *
 * Written by hand rather than using `getRelativeLocaleUrl` from
 * `astro:i18n` because this also needs to run inside React islands,
 * where the `astro:` virtual modules are not available.
 */
export function localizePath(path: string, locale: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`;

  if (locale === DEFAULT_LOCALE) {
    return clean;
  }

  return clean === '/' ? `/${locale}/` : `/${locale}${clean}`;
}

/**
 * Strip the locale prefix off a path, giving the neutral route.
 *
 *   stripLocale('/nl/projects') → '/projects'
 *   stripLocale('/projects')    → '/projects'
 *   stripLocale('/es/')         → '/'
 *
 * This is what lets the language switcher stay on the current page
 * instead of dumping the visitor back on the homepage: strip, then
 * re-localise into the target language.
 */
export function stripLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length > 0 && segments[0] && isLocale(segments[0])) {
    segments.shift();
  }

  return segments.length === 0 ? '/' : `/${segments.join('/')}`;
}

/**
 * Every locale's URL for the current page, for the language switcher and
 * for hreflang tags.
 */
export function getAlternates(url: URL): Array<{ locale: Locale; path: string }> {
  const neutral = stripLocale(url.pathname);

  return LOCALES.map((locale) => ({
    locale,
    path: localizePath(neutral, locale),
  }));
}
