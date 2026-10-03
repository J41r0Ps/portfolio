/**
 * Terrain — a wireframe plane displaced into slow-rolling topography.
 *
 * ─────────────────────────────────────────────────────────────────────
 * WHY LAYERED TRIG RATHER THAN SIMPLEX NOISE
 *
 * A proper simplex noise implementation is about forty lines of GLSL
 * with permutation tables. Four sine waves at different frequencies and
 * angles produce something visually indistinguishable at this scale, in
 * eight lines, and cost less per vertex.
 *
 * The honest trade-off: real noise never repeats, while summed sines
 * eventually do. At our frequencies the repeat period is long enough
 * that nobody watching a hero section will notice.
 * ─────────────────────────────────────────────────────────────────────
 *
 * Named imports only — never `import * as THREE`. The saving is modest
 * because R3F registers the whole three catalogue anyway, but the habit
 * matters, and it makes the dependencies of this file explicit.
 */

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Color, DoubleSide, type Mesh, type ShaderMaterial } from 'three';

/** Grid resolution. 64×64 is ~8,000 triangles — trivial for any GPU,
 *  and dense enough to read as terrain rather than as a grid. */
const SEGMENTS = 64;
const SIZE = 6;

const vertexShader = /* glsl */ `
  uniform float uTime;
  varying float vHeight;
  varying vec2 vUv;

  float terrain(vec2 p) {
    float h = 0.0;
    h += sin(p.x * 1.1 + uTime * 0.18) * 0.30;
    h += sin(p.y * 0.9 - uTime * 0.13) * 0.26;
    h += sin((p.x + p.y) * 0.65 + uTime * 0.09) * 0.18;
    h += sin((p.x - p.y) * 1.7 - uTime * 0.22) * 0.07;
    return h;
  }

  void main() {
    vUv = uv;

    vec3 displaced = position;
    // The plane is rotated flat in the scene, so displacement is along
    // its local z before rotation.
    displaced.z += terrain(position.xy);

    vHeight = displaced.z;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  varying float vHeight;
  varying vec2 vUv;

  void main() {
    // Fade toward the far edge so the mesh dissolves into the page
    // instead of ending on a hard line.
    float horizon = smoothstep(0.0, 0.45, vUv.y);

    // Fade at the left and right edges too, so it does not collide
    // with the rounded container.
    float sides = smoothstep(0.0, 0.18, vUv.x) * smoothstep(1.0, 0.82, vUv.x);

    // Peaks read slightly brighter than valleys — enough to suggest
    // elevation without looking like a heat map.
    float elevation = 0.55 + smoothstep(-0.5, 0.6, vHeight) * 0.45;

    float alpha = horizon * sides * elevation * 0.55;

    gl_FragColor = vec4(uColor * elevation, alpha);
  }
`;

interface Props {
  /** CSS colour string read from --accent. */
  color: string;
}

export default function Terrain({ color }: Props) {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);

  /**
   * Uniforms are created once. Recreating the object every render would
   * force a new material upload to the GPU on each frame.
   */
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new Color(color) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFrame((state, delta) => {
    // delta rather than elapsedTime: if the loop was paused while the
    // tab was hidden, elapsedTime would have kept counting and the
    // terrain would jump on return.
    uniforms.uTime.value += delta;

    // Colour is mutated in place rather than replaced, so no new
    // material is uploaded when the theme changes.
    uniforms.uColor.value.set(color);

    // Cursor parallax. state.pointer is normalised -1..1; the scene
    // tilts a couple of degrees, no more. Lerped so it trails the
    // cursor slightly instead of snapping.
    const mesh = meshRef.current;
    if (!mesh) return;

    const targetX = -Math.PI / 2.35 + state.pointer.y * 0.06;
    const targetZ = state.pointer.x * 0.05;

    mesh.rotation.x += (targetX - mesh.rotation.x) * 0.04;
    mesh.rotation.z += (targetZ - mesh.rotation.z) * 0.04;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.35, 0, 0]} position={[0, -0.35, 0]}>
      <planeGeometry args={[SIZE, SIZE, SEGMENTS, SEGMENTS]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        wireframe
        transparent
        // Transparent wireframes should not write depth, or the lines
        // occlude each other and the mesh looks patchy.
        depthWrite={false}
        side={DoubleSide}
      />
    </mesh>
  );
}
