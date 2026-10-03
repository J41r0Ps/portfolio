/**
 * HeroScene — the gate, not the scene.
 *
 * Mounted with client:media="(min-width: 1024px)", so below that width
 * this component never hydrates and no hero JavaScript is requested at
 * all, React included. Phones get the static terrain frame instead.
 *
 * Inside the gate, three more checks: reduced motion, WebGL support,
 * and whether the canvas has failed during the session. Only when all
 * pass is the three.js chunk dynamically imported.
 *
 * Safe to render on the server: `window` is only touched inside
 * useEffect, and the lazy import never runs until it renders client-side.
 */

import { lazy, Suspense, useEffect, useState } from 'react';

const TerrainCanvas = lazy(() => import('./TerrainCanvas'));

const MIN_WIDTH = 1024;

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function HeroScene() {
  const [shouldRender, setShouldRender] = useState(false);

  /**
   * Set when the GPU drops the context mid-session. Once failed, the
   * hero stays on its static frame for the rest of the visit — retrying
   * a context the browser just reclaimed tends to fail again.
   */
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const widthQuery = window.matchMedia(`(min-width: ${MIN_WIDTH}px)`);

    const evaluate = () => {
      setShouldRender(!motionQuery.matches && widthQuery.matches && supportsWebGL());
    };

    evaluate();
    motionQuery.addEventListener('change', evaluate);
    widthQuery.addEventListener('change', evaluate);

    return () => {
      motionQuery.removeEventListener('change', evaluate);
      widthQuery.removeEventListener('change', evaluate);
    };
  }, []);

  if (!shouldRender || failed) return null;

  return (
    <Suspense fallback={null}>
      <TerrainCanvas onFail={() => setFailed(true)} />
    </Suspense>
  );
}
