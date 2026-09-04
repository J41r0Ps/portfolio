/**
 * SITE CONSTANTS — contact details, social links, identity.
 *
 * One place, so an email address or a handle is never hardcoded into a
 * component. Changing your LinkedIn URL should be a one-line edit, not a
 * search across the codebase.
 */

export const SITE = {
  name: 'Jairo Nacurena',
  url: 'https://jaironacurena.com',
  email: 'jaironacurenaturnhout01@gmail.com',
  location: 'Antwerp, Belgium',
} as const;

export interface SocialLink {
  /** Shown to screen readers; the icon is decorative. */
  label: string;
  href: string;
  /** Which icon to render — see Footer.astro. */
  icon: 'github' | 'linkedin' | 'mail';
}

export const SOCIALS: readonly SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/J41r0Ps',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jairo-nacurena/',
    icon: 'linkedin',
  },
  {
    label: 'Email',
    href: `mailto:${SITE.email}`,
    icon: 'mail',
  },
];
