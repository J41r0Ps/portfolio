/**
 * useAccentColor — reads --accent from the DOM so the scene follows the
 * theme.
 *
 * This is the payoff of the semantic token layer from Session 2. The
 * accent colour is a real CSS custom property, so WebGL can read the
 * exact same value the DOM uses. One palette, two rendering systems, no
 * duplicated hex codes to drift apart.
 *
 * A MutationObserver on the `dark` class catches the theme toggle,
 * because CSS variables do not fire change events.
 */

import { useEffect, useState } from 'react';

function readAccent(): string {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue('--accent')
    .trim();

  // --accent resolves to another var; if it comes back empty for any
  // reason, fall back to the brand sage rather than rendering black.
  return value || '#52796f';
}

export function useAccentColor(): string {
  const [color, setColor] = useState(readAccent);

  useEffect(() => {
    const update = () => setColor(readAccent());

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return color;
}
