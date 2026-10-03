/**
 * TerrainCanvas — the only <Canvas> in this codebase. Ever.
 *
 * Browsers cap WebGL contexts at roughly sixteen and silently kill the
 * oldest when you exceed it. One canvas also means one place to profile
 * when something is slow.
 *
 * Everything expensive is gated:
 *   • frameloop switches to 'never' when off-screen or the tab is hidden
 *   • dpr is capped at 1.5 — uncapped on a Retina display means four
 *     times the pixels for no visible gain
 *   • no antialias; the terrain is lines, and the cost is not worth it
 */

import { Canvas } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';

import Terrain from './Terrain';
import { useAccentColor } from './useAccentColor';

export default function TerrainCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  const accent = useAccentColor();

  /* Stop rendering once the hero scrolls away. */
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? false),
      { rootMargin: '100px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  /* Stop rendering when the tab is in the background. Without this the
     scene keeps animating in a tab nobody is looking at — on a laptop
     that is measurable battery drain. */
  useEffect(() => {
    const onChange = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);

  const active = inView && tabVisible;

  return (
    <div ref={containerRef} className="absolute inset-0 rounded-2xl overflow-hidden">
      <Canvas
        frameloop={active ? 'always' : 'never'}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        camera={{ position: [0, 1.4, 3.2], fov: 42 }}
      >
        <Terrain color={accent} />
      </Canvas>
    </div>
  );
}
