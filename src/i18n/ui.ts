/**
 * UI string dictionaries.
 *
 * These hold *interface* strings only — navigation, buttons, labels.
 * Long-form content (project write-ups, the about page) lives in content
 * collections from Session 4, not here.
 *
 * ─────────────────────────────────────────────────────────────────────
 * THE TYPING TRICK
 *
 * English is declared first and becomes the contract. `Dictionary` is
 * derived from its keys, and `nl` / `es` are annotated with it. That
 * means:
 *
 *   • a key missing from nl  → compile error
 *   • a key misspelled in es → compile error (excess property)
 *   • a new key added to en  → nl and es immediately fail until filled
 *
 * A forgotten translation cannot reach production. This is the same
 * instinct as validating DTOs at the boundary rather than hoping.
 * ─────────────────────────────────────────────────────────────────────
 *
 * Keys are namespaced with dots (`nav.about`) and the structure is flat.
 * Flat keeps lookup a single property access and keeps the type simple —
 * nested objects would need recursive types to get the same guarantees.
 */

import type { Locale } from "./config";

export const en = {
  // --- navigation ---
  "nav.home": "Home",
  "nav.about": "About",
  "nav.projects": "Projects",
  "nav.experience": "Experience",
  "nav.contact": "Contact",
  "nav.menu.open": "Open menu",
  "nav.menu.close": "Close menu",

  // --- accessibility ---
  "a11y.skipToContent": "Skip to content",
  "a11y.toggleTheme": "Toggle colour theme",
  "a11y.selectLanguage": "Select language",

  // --- calls to action ---
  "cta.downloadCV": "Download CV",
  "cta.viewProject": "View project",
  "cta.viewAll": "View all projects",
  "cta.sourceCode": "Source code",
  "cta.liveSite": "Live site",
  "cta.getInTouch": "Get in touch",

  // --- home ---
  "home.title": "Jairo Nacurena",
  "home.role": "Applied Computer Science student",
  "home.tagline": "Backend APIs, data pipelines and full-stack applications.",
  "home.meta.description":
    "Applied Computer Science student at Thomas More Geel. Full-stack and backend development, data science and cloud infrastructure.",

  // --- projects ---
  "projects.title": "Projects",
  "projects.filter.all": "All",
  "projects.filter.clear": "Clear filters",
  "projects.empty": "No projects match these filters.",
  "projects.count.one": "{count} project",
  "projects.count.other": "{count} projects",

  // --- footer ---
  "footer.builtWith": "Built with Astro and TypeScript",
  "footer.rights": "All rights reserved",

  // --- errors ---
  "error.404.title": "Page not found",
  "error.404.body": "That page does not exist. It may have moved.",
  "error.404.back": "Back to home",

  // --- home sections ---
  "home.hero.cta.work": "View my work",
  "home.hero.cta.contact": "Get in touch",

  "home.stats.projects": "Projects",
  "home.stats.technologies": "Technologies",
  "home.stats.latest": "Latest",

  "home.featured.title": "Selected work",
  "home.featured.subtitle": "Three projects that show how I build, test and ship.",

  "home.skills.title": "What I work with",
  "home.skills.subtitle": "Technologies used in shipped projects, not a wishlist.",

  "home.about.title": "About me",
  "home.about.body":
    "Third-year Applied Computer Science student in Belgium, originally from Peru. I care about understanding why a pattern exists before using it, and about validating what I build against something outside my own code.",
  "home.about.cta": "More about me",

  "home.contact.title": "Open to internships",
  "home.contact.body":
    "Looking for a full-stack or backend internship. If that sounds like a fit, I would like to hear from you.",
} satisfies Record<string, string>;

/**
 * The contract every other language must satisfy.
 * `keyof typeof en` is the union of every key above.
 */
export type UIKey = keyof typeof en;
type Dictionary = Record<UIKey, string>;

export const nl: Dictionary = {
  "nav.home": "Home",
  "nav.about": "Over mij",
  "nav.projects": "Projecten",
  "nav.experience": "Ervaring",
  "nav.contact": "Contact",
  "nav.menu.open": "Menu openen",
  "nav.menu.close": "Menu sluiten",

  "a11y.skipToContent": "Ga naar inhoud",
  "a11y.toggleTheme": "Kleurthema wisselen",
  "a11y.selectLanguage": "Taal kiezen",

  "cta.downloadCV": "CV downloaden",
  "cta.viewProject": "Bekijk project",
  "cta.viewAll": "Alle projecten",
  "cta.sourceCode": "Broncode",
  "cta.liveSite": "Live site",
  "cta.getInTouch": "Neem contact op",

  "home.title": "Jairo Nacurena",
  "home.role": "Student Toegepaste Informatica",
  "home.tagline": "Backend-APIs, datapijplijnen en full-stack applicaties.",
  "home.meta.description":
    "Student Toegepaste Informatica aan Thomas More Geel. Full-stack en backend development, data science en cloudinfrastructuur.",

  "projects.title": "Projecten",
  "projects.filter.all": "Alle",
  "projects.filter.clear": "Filters wissen",
  "projects.empty": "Geen projecten gevonden met deze filters.",
  "projects.count.one": "{count} project",
  "projects.count.other": "{count} projecten",

  "footer.builtWith": "Gebouwd met Astro en TypeScript",
  "footer.rights": "Alle rechten voorbehouden",

  "error.404.title": "Pagina niet gevonden",
  "error.404.body": "Deze pagina bestaat niet. Mogelijk is ze verplaatst.",
  "error.404.back": "Terug naar home",

  "home.hero.cta.work": "Bekijk mijn werk",
  "home.hero.cta.contact": "Neem contact op",

  "home.stats.projects": "Projecten",
  "home.stats.technologies": "Technologieën",
  "home.stats.latest": "Recentste",

  "home.featured.title": "Geselecteerd werk",
  "home.featured.subtitle": "Drie projecten die tonen hoe ik bouw, test en uitrol.",

  "home.skills.title": "Waar ik mee werk",
  "home.skills.subtitle": "Technologieën uit opgeleverde projecten, geen verlanglijst.",

  "home.about.title": "Over mij",
  "home.about.body":
    "Derdejaarsstudent Toegepaste Informatica in België, oorspronkelijk uit Peru. Ik wil begrijpen waarom een patroon bestaat voordat ik het gebruik, en ik valideer wat ik bouw tegen iets buiten mijn eigen code.",
  "home.about.cta": "Meer over mij",

  "home.contact.title": "Op zoek naar een stage",
  "home.contact.body":
    "Ik zoek een stage in full-stack of backend development. Als dat past, hoor ik het graag.",
};

export const es: Dictionary = {
  "nav.home": "Inicio",
  "nav.about": "Sobre mí",
  "nav.projects": "Proyectos",
  "nav.experience": "Experiencia",
  "nav.contact": "Contacto",
  "nav.menu.open": "Abrir menú",
  "nav.menu.close": "Cerrar menú",

  "a11y.skipToContent": "Saltar al contenido",
  "a11y.toggleTheme": "Cambiar tema de color",
  "a11y.selectLanguage": "Seleccionar idioma",

  "cta.downloadCV": "Descargar CV",
  "cta.viewProject": "Ver proyecto",
  "cta.viewAll": "Ver todos los proyectos",
  "cta.sourceCode": "Código fuente",
  "cta.liveSite": "Sitio en vivo",
  "cta.getInTouch": "Contáctame",

  "home.title": "Jairo Nacurena",
  "home.role": "Estudiante de Informática Aplicada",
  "home.tagline": "APIs backend, pipelines de datos y aplicaciones full-stack.",
  "home.meta.description":
    "Estudiante de Informática Aplicada en Thomas More Geel. Desarrollo full-stack y backend, ciencia de datos e infraestructura cloud.",

  "projects.title": "Proyectos",
  "projects.filter.all": "Todos",
  "projects.filter.clear": "Borrar filtros",
  "projects.empty": "Ningún proyecto coincide con estos filtros.",
  "projects.count.one": "{count} proyecto",
  "projects.count.other": "{count} proyectos",

  "footer.builtWith": "Hecho con Astro y TypeScript",
  "footer.rights": "Todos los derechos reservados",

  "error.404.title": "Página no encontrada",
  "error.404.body": "Esta página no existe. Puede que se haya movido.",
  "error.404.back": "Volver al inicio",

  "home.hero.cta.work": "Ver mi trabajo",
  "home.hero.cta.contact": "Contáctame",

  "home.stats.projects": "Proyectos",
  "home.stats.technologies": "Tecnologías",
  "home.stats.latest": "Más reciente",

  "home.featured.title": "Trabajo seleccionado",
  "home.featured.subtitle": "Tres proyectos que muestran cómo construyo, pruebo y despliego.",

  "home.skills.title": "Con qué trabajo",
  "home.skills.subtitle": "Tecnologías usadas en proyectos entregados, no una lista de deseos.",

  "home.about.title": "Sobre mí",
  "home.about.body":
    "Estudiante de tercer año de Informática Aplicada en Bélgica, originario de Perú. Me importa entender por qué existe un patrón antes de usarlo, y validar lo que construyo contra algo externo a mi propio código.",
  "home.about.cta": "Más sobre mí",

  "home.contact.title": "Disponible para prácticas",
  "home.contact.body":
    "Busco unas prácticas en desarrollo full-stack o backend. Si encaja, me gustaría saber de ti.",
};

export const ui: Record<Locale, Dictionary> = { en, nl, es };
