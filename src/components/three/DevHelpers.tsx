/**
 * Development-only helpers for the 3D hero.
 *
 * Both are rendered behind `import.meta.env.DEV`, which Vite replaces
 * with `false` in production builds, so this code is removed from the
 * shipped bundle entirely.
 */

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

/**
 * DevStats — logs renderer numbers every five seconds.
 *
 * Replaces r3f-perf, which depends on drei. These are the same numbers
 * r3f-perf reads; three.js tracks them internally in renderer.info.
 *
 * Expect `triangles: 0` and a large `lines` count: a wireframe material
 * is drawn with GL_LINES, and three.js counts those separately.
 */
export function DevStats() {
  const gl = useThree((state) => state.gl);
  const frames = useRef(0);
  const since = useRef(performance.now());

  useFrame(() => {
    frames.current += 1;
    const now = performance.now();
    const elapsed = now - since.current;

    if (elapsed < 5000) return;

    const { calls, triangles, lines } = gl.info.render;
    const { geometries, textures } = gl.info.memory;

    console.table({
      fps: Number(((frames.current * 1000) / elapsed).toFixed(1)),
      drawCalls: calls,
      triangles,
      lines,
      geometries,
      textures,
    });

    frames.current = 0;
    since.current = now;
  });

  return null;
}

/**
 * FrameCapture — saves the current terrain frame as terrain-mask.png.
 *
 * Two ways to trigger it:
 *   • type  captureTerrain()  in the browser console   <- most reliable
 *   • press Alt+P with the page focused
 *
 * Why not just right-click the canvas and "Save image as": a WebGL
 * canvas clears its pixels right after each frame is shown, so reading
 * it at a random moment usually gives an empty, transparent image. This
 * helper renders a fresh frame and reads it back in the same step,
 * before the browser has a chance to clear it.
 *
 * The background is transparent, so the image works as a CSS mask:
 * only its shape is used, and the colour comes from var(--accent).
 * That is why one capture serves both light and dark mode.
 */
export function FrameCapture() {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    const capture = () => {
      gl.render(scene, camera);

      const link = document.createElement('a');
      link.href = gl.domElement.toDataURL('image/png');
      link.download = 'terrain-mask.png';
      link.click();

      console.info('[terrain] saved terrain-mask.png, check your Downloads folder');
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.altKey && event.code === 'KeyP') {
        event.preventDefault();
        capture();
      }
    };

    // Exposed on window so it can be called from the DevTools console.
    const w = window as unknown as { captureTerrain?: () => void };
    w.captureTerrain = capture;
    window.addEventListener('keydown', onKey);

    console.info('[terrain] dev capture ready: run captureTerrain() in this console');

    return () => {
      window.removeEventListener('keydown', onKey);
      delete w.captureTerrain;
    };
  }, [gl, scene, camera]);

  return null;
}
