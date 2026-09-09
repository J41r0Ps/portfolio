/**
 * TAXONOMY — the controlled vocabulary for the whole site.
 *
 * These arrays are the single source of truth for every tag, filter chip
 * and skill on the site. They become Zod enums in content.config.ts, so a
 * value not listed here cannot appear in a content file: the build fails.
 *
 * Why a closed set rather than free-text tags:
 *   free text drifts. "React" / "ReactJS" / "react" become three filter
 *   chips for one technology, and nothing catches it. An enum makes that
 *   impossible, and the filter facets can be derived from the content
 *   instead of maintained by hand.
 *
 * Adding a value is one line. Removing one breaks every entry that used
 * it — loudly, which is the point.
 */

/* ==================================================================
   CATEGORY — exactly one per project. The top-level view.
   ================================================================== */
export const CATEGORIES = [
  "full-stack",
  "backend",
  "frontend",
  "data-science",
  "ai-ml",
  "devops",
] as const;

export type Category = (typeof CATEGORIES)[number];

/* ==================================================================
   CONTEXT — where the project came from.

   Deliberately NOT a category. A course project and a personal project
   compete on what they do, not on their origin. This exists for honesty
   (never imply solo work that was a group assignment) and stays a small
   label, not a filter axis.
   ================================================================== */
export const CONTEXTS = ["personal", "course", "group", "freelance"] as const;
export type Context = (typeof CONTEXTS)[number];

/* ==================================================================
   STATUS
   ================================================================== */
export const STATUSES = ["live", "complete", "in-progress", "archived"] as const;
export type Status = (typeof STATUSES)[number];

/* ==================================================================
   TECH — concrete, named technologies.

   This doubles as the skills list. One vocabulary, so a skill cannot
   exist that no project uses, and a tag cannot exist with no skill
   behind it.
   ================================================================== */
export const TECH = [
  // --- languages ---
  "C#",
  "TypeScript",
  "JavaScript",
  "Python",
  "Java",
  "PHP",
  "SQL",
  "HTML",
  "CSS",
  "VBA",

  // --- .NET ---
  "ASP.NET Core",
  "Entity Framework Core",
  "AutoMapper",
  "SignalR",
  "Serilog",

  // --- java ---
  "Spring Boot",
  "JPA / Hibernate",
  "Maven",

  // --- php ---
  "Laravel",
  "Livewire",
  "Blade",
  "Alpine.js",
  "Stripe",

  // --- python backend ---
  "FastAPI",

  // --- frontend ---
  "React",
  "Astro",
  "Vite",
  "Tailwind CSS",
  "React Router",
  "Axios",
  "Bootstrap",
  "Three.js",
  "Chart.js",

  // --- databases ---
  "SQL Server",
  "Azure SQL",
  "SQLite",
  "MySQL",

  // --- data & ai ---
  "Pandas",
  "NumPy",
  "Matplotlib",
  "Seaborn",
  "scikit-learn",
  "TensorFlow",
  "Keras",
  "BeautifulSoup",
  "Requests",
  "SPARQL",
  "Jupyter",
  "Qlik Cloud",

  // --- testing ---
  "MSTest",
  "Moq",
  "pytest",
  "JUnit",
  "Mockito",

  // --- infrastructure ---
  "Docker",
  "Docker Compose",
  "Azure",
  "GitHub Actions",
  "Auth0",
  "Cloudinary",
  "Git",

  // --- modelling & enterprise ---
  "UML",
  "BPMN",
  "SAP S/4HANA",
] as const;

export type Tech = (typeof TECH)[number];

/**
 * Grouping for the skills section. Every TECH value must appear in
 * exactly one group — `Record<Tech, TechGroup>` means TypeScript will
 * complain the moment you add a technology above and forget it here.
 */
export const TECH_GROUPS = [
  "Languages",
  "Backend",
  "Frontend",
  "Databases",
  "Data & AI",
  "Testing",
  "Infrastructure",
  "Modelling",
] as const;

export type TechGroup = (typeof TECH_GROUPS)[number];

export const TECH_GROUP_OF: Record<Tech, TechGroup> = {
  "C#": "Languages",
  TypeScript: "Languages",
  JavaScript: "Languages",
  Python: "Languages",
  Java: "Languages",
  PHP: "Languages",
  SQL: "Languages",
  HTML: "Languages",
  CSS: "Languages",
  VBA: "Languages",

  "ASP.NET Core": "Backend",
  "Entity Framework Core": "Backend",
  AutoMapper: "Backend",
  SignalR: "Backend",
  Serilog: "Backend",
  "Spring Boot": "Backend",
  "JPA / Hibernate": "Backend",
  Maven: "Backend",
  Laravel: "Backend",
  Livewire: "Backend",
  FastAPI: "Backend",
  Stripe: "Backend",

  React: "Frontend",
  Astro: "Frontend",
  Vite: "Frontend",
  "Tailwind CSS": "Frontend",
  "React Router": "Frontend",
  Axios: "Frontend",
  Bootstrap: "Frontend",
  "Three.js": "Frontend",
  Blade: "Frontend",
  "Alpine.js": "Frontend",
  "Chart.js": "Frontend",

  "SQL Server": "Databases",
  "Azure SQL": "Databases",
  SQLite: "Databases",
  MySQL: "Databases",

  Pandas: "Data & AI",
  NumPy: "Data & AI",
  Matplotlib: "Data & AI",
  Seaborn: "Data & AI",
  "scikit-learn": "Data & AI",
  TensorFlow: "Data & AI",
  Keras: "Data & AI",
  BeautifulSoup: "Data & AI",
  Requests: "Data & AI",
  SPARQL: "Data & AI",
  Jupyter: "Data & AI",
  "Qlik Cloud": "Data & AI",

  MSTest: "Testing",
  Moq: "Testing",
  pytest: "Testing",
  JUnit: "Testing",
  Mockito: "Testing",

  Docker: "Infrastructure",
  "Docker Compose": "Infrastructure",
  Azure: "Infrastructure",
  "GitHub Actions": "Infrastructure",
  Auth0: "Infrastructure",
  Cloudinary: "Infrastructure",
  Git: "Infrastructure",

  UML: "Modelling",
  BPMN: "Modelling",
  "SAP S/4HANA": "Modelling",
};

/* ==================================================================
   TOPICS — what a project DEMONSTRATES, rather than what it is
   built with.

   This is the axis a reviewer actually filters on. "Knows React" is
   cheap; "has shipped authentication and CI/CD" is the signal.
   ================================================================== */
export const TOPICS = [
  // architecture & backend
  "REST API",
  "Layered Architecture",
  "Repository Pattern",
  "Design Patterns",
  "SOLID",
  "Domain-Driven Design",
  "Microservices",
  "Authentication",
  "Real-time",
  "Database Design",

  // quality
  "Unit Testing",
  "Integration Testing",
  "Refactoring",

  // delivery
  "CI/CD",
  "Cloud Deployment",
  "Containerisation",

  // data
  "Web Scraping",
  "Data Cleaning",
  "Statistical Analysis",
  "Data Visualisation",
  "Dashboarding",
  "Open Data",

  // ai
  "Machine Learning",
  "Deep Learning",
  "Computer Vision",
  "Natural Language Processing",

  // analysis & modelling
  "Requirements Analysis",
  "UML Modelling",
  "Business Process Modelling",

  // frontend & web
  "Responsive Design",
  "Accessibility",
  "Internationalisation",
  "SEO",
  "3D / WebGL",

  // project management & collaboration
  "Payment Integration",
  "Agile / Scrum",
  "Client Collaboration",
] as const;

export type Topic = (typeof TOPICS)[number];

/** Distinguishes work history from education on the same timeline. */
export const EXPERIENCE_KINDS = ["work", "education", "certification", "volunteer"] as const;
export type ExperienceKind = (typeof EXPERIENCE_KINDS)[number];
