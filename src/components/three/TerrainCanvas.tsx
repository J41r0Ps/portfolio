/**
 * TerrainCanvas — the only <Canvas> in this codebase. Ever.
 *
 * Responsibilities beyond rendering:
 *   • stop rendering when off-screen or the tab is hidden
 *   • tell the page when it is live, so the static frame cross-fades out
 *   • recover gracefully if the GPU drops the WebGL context
 */

import { Canvas } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';

import { DevStats, FrameCapture } from './DevHelpers';
import Terrain from './Terrain';
import { useAccentColor } from './useAccentColor';

interface Props {
  /** Called if the WebGL context is lost while this canvas is mounted. */
  onFail: () => void;
}

const HOST_ID = 'hero-visual';

export default function TerrainCanvas({ onFail }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  /**
   * ─────────────────────────────────────────────────────────────────
   * WHY THIS REF EXISTS
   *
   * R3F deliberately forces a WebGL context loss when the canvas
   * unmounts — it is how it frees GPU memory immediately instead of
   * waiting for garbage collection. That fires the same
   * `webglcontextlost` event a real GPU failure does.
   *
   * Without this guard, resizing below 1024px would unmount the
   * canvas, trigger the event, mark the hero as failed, and the
   * terrain would never come back on resizing up again.
   *
   * The event is dispatched asynchronously, after React has run this
   * component's cleanup, so by then `mounted` is false and the handler
   * can tell an intentional teardown from a real failure.
   * ─────────────────────────────────────────────────────────────────
   */
  const mounted = useRef(true);

  const accent = useAccentColor();

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
      // Bring the static frame back if the canvas goes away.
      document.getElementById(HOST_ID)?.removeAttribute('data-live');
    };
  }, []);

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

  useEffect(() => {
    const onChange = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);

  const active = inView && tabVisible;

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden rounded-2xl">
      <Canvas
        frameloop={active ? 'always' : 'never'}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        camera={{ position: [0, 1.4, 3.2], fov: 42 }}
        onCreated={({ gl }) => {
          // The canvas exists and has a context: cross-fade the static
          // frame out. CSS handles the transition.
          document.getElementById(HOST_ID)?.setAttribute('data-live', '');

          gl.domElement.addEventListener(
            'webglcontextlost',
            () => {
              if (!mounted.current) return; // intentional teardown, see above
              document.getElementById(HOST_ID)?.removeAttribute('data-live');
              onFail();
            },
            { once: true },
          );
        }}
      >
        <Terrain color={accent} />

        {/* Replaced with `false` at build time, so neither helper
            reaches the production bundle. */}
        {import.meta.env.DEV && <DevStats />}
        {import.meta.env.DEV && <FrameCapture />}
      </Canvas>
    </div>
  );
}
