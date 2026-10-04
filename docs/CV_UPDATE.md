# Updating the CV

The site serves one PDF per language. Each page links to the CV in its
own language, resolved at build time — there is no runtime detection.

## Files

| Locale | Path | Served at |
|---|---|---|
| English | `public/cv/jairo-nacurena-cv-en.pdf` | `/cv/jairo-nacurena-cv-en.pdf` |
| Dutch | `public/cv/jairo-nacurena-cv-nl.pdf` | `/cv/jairo-nacurena-cv-nl.pdf` |
| Spanish | `public/cv/jairo-nacurena-cv-es.pdf` | `/cv/jairo-nacurena-cv-es.pdf` |

The mapping lives in `CV_FILES` in `src/i18n/config.ts`. The names are
fixed so that links already shared (LinkedIn, emails, applications)
keep working after an update.

## Process

1. **Edit the source** (Word / Canva / whatever the template is in).
   Update all three languages together — they should never disagree on
   dates, projects or skills.
2. **Check the links inside each PDF** before exporting:
   - Portfolio: `https://jaironacurena.com` (EN), `/nl/` (NL), `/es/` (ES),
     so each CV opens the site in its own language
   - GitHub: `https://github.com/J41r0Ps`
   - LinkedIn profile URL
3. **Export as PDF**, keep each file under ~500 kB. If larger, compress
   it — the size is shown next to the download button.
4. **Check the PDF metadata** (File → Properties): the title and author
   should be your name, not a template name.
5. **Replace the files** in `public/cv/` with the exact names above.
6. **Build**: `npm run build`. If any file is missing or misnamed, the
   build fails with a message naming the locale — that is intentional.
7. **Verify** with `npm run preview`: click "Download CV" on `/`, `/nl/`
   and `/es/` and open each file.
8. **Commit and push**: `content: update CV (<what changed>)`.
   The deploy picks it up automatically.

## Why the build fails on a missing CV

A missing PDF would otherwise ship as a "Download CV" button that 404s,
and nobody notices until a recruiter clicks it. `src/lib/cv.ts` checks
each file exists while the pages are generated.
