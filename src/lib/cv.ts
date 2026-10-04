/**
 * CV — the localised résumé for each locale, resolved at BUILD time.
 *
 * Every page already knows its language, so there is nothing to detect:
 * the Dutch page links to the Dutch PDF because it IS the Dutch page.
 * No JavaScript, no cookie, no chance of serving the wrong file.
 *
 * This module adds one guarantee on top of the CV_FILES map: the file
 * must actually exist. A missing PDF fails the build with a clear
 * message, instead of shipping a "Download CV" button that 404s.
 */

import { statSync } from "node:fs";
import { join } from "node:path";

import { CV_FILES, LOCALE_TAGS, type Locale } from "@/i18n/config";

export interface CvFile {
  /** Public URL, e.g. /cv/jairo-nacurena-cv-nl.pdf */
  href: string;
  /** Localised size label, e.g. "142 kB" or "142 kB" with locale formatting. */
  size: string;
}

/**
 * Reads the file from public/ during the build. statSync is fine here:
 * this runs once per page at build time, never in a browser.
 */
export function getCv(locale: Locale): CvFile {
  const href = CV_FILES[locale];
  const path = join(process.cwd(), "public", href);

  let bytes: number;
  try {
    bytes = statSync(path).size;
  } catch {
    throw new Error(
      `CV missing for locale "${locale}". Expected a PDF at public${href}. ` +
        `See docs/CV_UPDATE.md.`,
    );
  }

  // Intl formats units per language: "142 kB" (en), "142 kB" (nl), "142 kB" (es),
  // with the right decimal separator if a fraction is ever shown.
  const size = new Intl.NumberFormat(LOCALE_TAGS[locale], {
    style: "unit",
    unit: "kilobyte",
    unitDisplay: "short",
    maximumFractionDigits: 0,
  }).format(bytes / 1000);

  return { href, size };
}
