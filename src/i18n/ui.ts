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

  // --- experience ---
  "experience.title": "Experience & Education",
  "experience.meta.description":
    "Work experience, education and certifications — Jairo Nacurena, Applied Computer Science student in Belgium.",
  "experience.work": "Work",
  "experience.education": "Education",
  "experience.certification": "Certifications",
  "experience.present": "Present",
  "experience.expected": "expected",
  "experience.certification.empty":
    "In progress — Cambridge English, Microsoft and TryHackMe certifications planned for 2026–2027.",

  // --- about ---
  "about.title": "About me",
  "about.meta.description":
    "Applied Computer Science student in Belgium, originally from Peru. How I work, what I am learning, and what I do when I am not writing code.",

  "about.intro.p1":
    "I am in my third year of Applied Computer Science at Thomas More Geel, specialising in application development and AI. Most of what I build is backend — APIs, data pipelines, the parts that have to be correct rather than the parts that have to look good — though I have spent enough time on the frontend to have opinions about it.",
  "about.intro.p2":
    "What I actually enjoy is the moment a system stops being a pile of files and starts being a thing with a shape. That usually happens somewhere in the second refactor.",

  "about.path.title": "How I got here",
  "about.path.p1":
    "I grew up in Peru and moved to Belgium at seventeen. I had about six months to reach a usable level of Dutch before starting secondary school, then two years of secondary education, and I am now finishing a bachelor taught entirely in that language.",
  "about.path.p2":
    "I mention it because it explains how I approach unfamiliar things. Learning a language under a deadline teaches you to work from partial understanding, ask direct questions, and accept being wrong in public for a while. That turns out to be most of what learning a new stack feels like too.",

  "about.method.title": "How I work",
  "about.method.intro": "Three habits I have actually kept, rather than three adjectives.",

  "about.method.1.title": "I want the why before the how",
  "about.method.1.body":
    "I do not use a pattern I cannot explain the reason for. When I learned the repository pattern I wanted to know what breaks without it, not just where the interface goes. It is slower at first and much faster the second time something similar comes up.",

  "about.method.2.title": "I validate against something outside my own code",
  "about.method.2.body":
    "Both of my data science projects caught real bugs by checking results against externally known facts. Wikipedia says eight riders have won all three Grand Tours; my pipeline said six, and chasing that gap exposed two parsing bugs. Without the external check the dataset would have looked completely reasonable — right row counts, plausible values, no errors raised.",

  "about.method.3.title": "I review in slices, not in sweeps",
  "about.method.3.body":
    "On a large codebase I go endpoint by endpoint: read the backend slice, write down what I do not understand, follow it through to how the frontend uses it, take notes, then move on. It is slower than skimming and it is the only way I have found to actually hold a system in my head.",

  "about.languages.title": "Languages",
  "about.languages.spanish": "Spanish",
  "about.languages.dutch": "Dutch",
  "about.languages.english": "English",
  "about.languages.spanish.level": "Native",
  "about.languages.dutch.level": "Professional — my degree is taught in Dutch",
  "about.languages.english.level": "Professional working proficiency",

  "about.beyond.title": "Away from the keyboard",
  "about.beyond.body":
    "Football and the gym, mostly — both are useful for the same reason, which is that they are the part of the day where the problem cannot be solved by thinking harder about it. I also travel whenever I can; having lived in two countries makes a third one feel less like a holiday and more like something worth understanding.",

  "about.open.title": "Open to new challenges",
  "about.open.body":
    "I am looking for an internship where I can work on real systems with people who are better than me at this. Backend or full-stack, and I am happy to be the person who asks a lot of questions in the first month.",
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

  "experience.title": "Ervaring & Opleiding",
  "experience.meta.description":
    "Werkervaring, opleiding en certificaten — Jairo Nacurena, student Toegepaste Informatica in België.",
  "experience.work": "Werk",
  "experience.education": "Opleiding",
  "experience.certification": "Certificaten",
  "experience.present": "Heden",
  "experience.expected": "verwacht",
  "experience.certification.empty":
    "In uitvoering — Cambridge English, Microsoft en TryHackMe gepland voor 2026–2027.",

  "about.title": "Over mij",
  "about.meta.description":
    "Student Toegepaste Informatica in België, oorspronkelijk uit Peru. Hoe ik werk, wat ik leer, en wat ik doe als ik geen code schrijf.",

  "about.intro.p1":
    "Ik zit in mijn derde jaar Toegepaste Informatica aan Thomas More Geel, met specialisatie applicatieontwikkeling en AI. Het meeste van wat ik bouw is backend — API\u2019s, datapijplijnen, de delen die correct moeten zijn in plaats van de delen die er goed moeten uitzien — al heb ik genoeg tijd aan de frontend besteed om er meningen over te hebben.",
  "about.intro.p2":
    "Waar ik echt van geniet, is het moment waarop een systeem ophoudt een stapel bestanden te zijn en een ding met een vorm wordt. Dat gebeurt meestal ergens in de tweede refactor.",

  "about.path.title": "Hoe ik hier terechtkwam",
  "about.path.p1":
    "Ik groeide op in Peru en verhuisde op mijn zeventiende naar België. Ik had ongeveer zes maanden om Nederlands op een bruikbaar niveau te krijgen voordat het secundair begon, daarna twee jaar secundair onderwijs, en nu rond ik een bachelor af die volledig in die taal gegeven wordt.",
  "about.path.p2":
    "Ik vermeld het omdat het verklaart hoe ik onbekende dingen aanpak. Een taal leren onder tijdsdruk leert je werken vanuit gedeeltelijk begrip, directe vragen stellen, en een tijdlang aanvaarden dat je in het openbaar fouten maakt. Dat blijkt grotendeels ook te zijn hoe een nieuwe stack leren aanvoelt.",

  "about.method.title": "Hoe ik werk",
  "about.method.intro":
    "Drie gewoontes die ik echt behouden heb, in plaats van drie bijvoeglijke naamwoorden.",

  "about.method.1.title": "Ik wil het waarom vóór het hoe",
  "about.method.1.body":
    "Ik gebruik geen patroon waarvan ik de reden niet kan uitleggen. Toen ik het repository-patroon leerde, wilde ik weten wat er stukgaat zonder dat patroon, niet alleen waar de interface hoort. Dat is in het begin trager en veel sneller de tweede keer dat iets vergelijkbaars opduikt.",

  "about.method.2.title": "Ik valideer tegen iets buiten mijn eigen code",
  "about.method.2.body":
    "Beide data-scienceprojecten van mij vonden echte bugs door resultaten te toetsen aan extern bekende feiten. Wikipedia stelt dat acht renners alle drie de grote rondes gewonnen hebben; mijn pijplijn zei zes, en het uitzoeken van dat verschil bracht twee parsingfouten aan het licht. Zonder die externe controle had de dataset er volledig redelijk uitgezien — correcte aantallen rijen, plausibele waarden, geen fouten.",

  "about.method.3.title": "Ik review in stukken, niet in vegen",
  "about.method.3.body":
    "In een grote codebase ga ik endpoint per endpoint: ik lees de backend-slice, schrijf op wat ik niet begrijp, volg het door naar hoe de frontend het gebruikt, maak notities, en ga dan verder. Het is trager dan doorbladeren en het is de enige manier die ik gevonden heb om een systeem echt in mijn hoofd te houden.",

  "about.languages.title": "Talen",
  "about.languages.spanish": "Spaans",
  "about.languages.dutch": "Nederlands",
  "about.languages.english": "Engels",
  "about.languages.spanish.level": "Moedertaal",
  "about.languages.dutch.level": "Professioneel — mijn opleiding is Nederlandstalig",
  "about.languages.english.level": "Professionele werkbeheersing",

  "about.beyond.title": "Naast het toetsenbord",
  "about.beyond.body":
    "Voetbal en de sportschool, vooral — allebei nuttig om dezelfde reden: het is het deel van de dag waarin het probleem niet opgelost raakt door er harder over na te denken. Ik reis ook wanneer het kan; in twee landen gewoond hebben maakt een derde minder een vakantie en meer iets dat de moeite waard is om te begrijpen.",

  "about.open.title": "Open voor nieuwe uitdagingen",
  "about.open.body":
    "Ik zoek een stage waar ik aan echte systemen kan werken met mensen die hier beter in zijn dan ik. Backend of full-stack, en ik ben graag degene die de eerste maand veel vragen stelt.",
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

  "experience.title": "Experiencia y formación",
  "experience.meta.description":
    "Experiencia laboral, formación y certificaciones — Jairo Nacurena, estudiante de Informática Aplicada en Bélgica.",
  "experience.work": "Experiencia",
  "experience.education": "Formación",
  "experience.certification": "Certificaciones",
  "experience.present": "Actualidad",
  "experience.expected": "prevista",
  "experience.certification.empty":
    "En curso — Cambridge English, Microsoft y TryHackMe previstas para 2026–2027.",

  "about.title": "Sobre mí",
  "about.meta.description":
    "Estudiante de Informática Aplicada en Bélgica, originario de Perú. Cómo trabajo, qué estoy aprendiendo y qué hago cuando no escribo código.",

  "about.intro.p1":
    "Estoy en tercer año de Informática Aplicada en Thomas More Geel, con especialización en desarrollo de aplicaciones e IA. La mayor parte de lo que construyo es backend — APIs, pipelines de datos, las partes que tienen que ser correctas más que las que tienen que verse bien — aunque he pasado suficiente tiempo en el frontend como para tener opiniones al respecto.",
  "about.intro.p2":
    "Lo que realmente disfruto es el momento en que un sistema deja de ser un montón de archivos y pasa a ser algo con forma. Eso suele ocurrir en algún punto de la segunda refactorización.",

  "about.path.title": "Cómo llegué aquí",
  "about.path.p1":
    "Crecí en Perú y me mudé a Bélgica a los diecisiete. Tuve unos seis meses para alcanzar un nivel utilizable de neerlandés antes de empezar la secundaria, luego dos años de secundaria, y ahora estoy terminando un grado impartido íntegramente en ese idioma.",
  "about.path.p2":
    "Lo menciono porque explica cómo abordo lo desconocido. Aprender un idioma contrarreloj te enseña a trabajar desde una comprensión parcial, a hacer preguntas directas y a aceptar equivocarte en público durante un tiempo. Resulta que aprender un stack nuevo se siente prácticamente igual.",

  "about.method.title": "Cómo trabajo",
  "about.method.intro": "Tres hábitos que de verdad he mantenido, en lugar de tres adjetivos.",

  "about.method.1.title": "Quiero el porqué antes que el cómo",
  "about.method.1.body":
    "No uso un patrón cuya razón de ser no pueda explicar. Cuando aprendí el patrón repositorio quería saber qué se rompe sin él, no solo dónde va la interfaz. Es más lento al principio y mucho más rápido la segunda vez que aparece algo parecido.",

  "about.method.2.title": "Valido contra algo externo a mi propio código",
  "about.method.2.body":
    "Mis dos proyectos de ciencia de datos encontraron errores reales al contrastar resultados con hechos conocidos externamente. Wikipedia dice que ocho corredores han ganado las tres grandes vueltas; mi pipeline decía seis, y perseguir esa diferencia destapó dos errores de parsing. Sin esa comprobación externa el dataset habría parecido perfectamente razonable: número de filas correcto, valores plausibles, ningún error.",

  "about.method.3.title": "Reviso por partes, no de un barrido",
  "about.method.3.body":
    "En una base de código grande voy endpoint por endpoint: leo la porción del backend, anoto lo que no entiendo, lo sigo hasta ver cómo lo usa el frontend, tomo notas y sigo adelante. Es más lento que hojear y es la única forma que he encontrado de sostener de verdad un sistema en la cabeza.",

  "about.languages.title": "Idiomas",
  "about.languages.spanish": "Español",
  "about.languages.dutch": "Neerlandés",
  "about.languages.english": "Inglés",
  "about.languages.spanish.level": "Lengua materna",
  "about.languages.dutch.level": "Profesional — mi grado se imparte en neerlandés",
  "about.languages.english.level": "Competencia profesional",

  "about.beyond.title": "Lejos del teclado",
  "about.beyond.body":
    "Fútbol y gimnasio, sobre todo — ambos sirven por la misma razón: son la parte del día en que el problema no se resuelve pensándolo con más fuerza. También viajo siempre que puedo; haber vivido en dos países hace que un tercero se sienta menos unas vacaciones y más algo que vale la pena entender.",

  "about.open.title": "Abierto a nuevos retos",
  "about.open.body":
    "Busco unas prácticas donde pueda trabajar en sistemas reales con gente que sepa más que yo. Backend o full-stack, y no me importa ser quien hace muchas preguntas el primer mes.",
};

export const ui: Record<Locale, Dictionary> = { en, nl, es };
