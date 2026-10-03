/**
 * HeroScene — the gate, not the scene.
 *
 * This file is deliberately tiny. It decides whether the 3D is worth
 * loading at all, and only then dynamically imports it. Because the
 * import is dynamic, Vite puts three.js in its own chunk — so a phone,
 * a browser without WebGL, or a visitor who asked for reduced motion
 * never downloads it. Not deferred. Never requested.
 *
 * The alternative — one component that renders <Canvas> conditionally —
 * would ship the entire three.js bundle to every visitor and then
 * decide not to use it.
 */

import { lazy, Suspense, useEffect, useState } from 'react';

const TerrainCanvas = lazy(() => import('./TerrainCanvas'));

/** Below this width the static gradient is the better experience. */
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

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const widthQuery = window.matchMedia(`(min-width: ${MIN_WIDTH}px)`);

    const evaluate = () => {
      setShouldRender(!motionQuery.matches && widthQuery.matches && supportsWebGL());
    };

    evaluate();

    // Someone resizing across the breakpoint, or changing their OS
    // motion setting with the page open, gets the right result.
    motionQuery.addEventListener('change', evaluate);
    widthQuery.addEventListener('change', evaluate);

    return () => {
      motionQuery.removeEventListener('change', evaluate);
      widthQuery.removeEventListener('change', evaluate);
    };
  }, []);

  if (!shouldRender) return null;

  // No fallback: the static gradient underneath stays visible until the
  // canvas is ready, so there is nothing to swap in.
  return (
    <Suspense fallback={null}>
      <TerrainCanvas />
    </Suspense>
  );
}
