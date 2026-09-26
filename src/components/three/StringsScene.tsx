"use client";

import { useEffect, useRef } from "react";
import {
  ACESFilmicToneMapping,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  CylinderGeometry,
  DirectionalLight,
  Group,
  HemisphereLight,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Plane,
  Points,
  PointsMaterial,
  Raycaster,
  Scene,
  SphereGeometry,
  TorusGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";

/**
 * A sculptural, playable take on the Acoustic isotype: the sound-hole circle,
 * the two bridge bars and three brass strings. Moving the pointer across a
 * string (or tapping near it) plucks it. Geometry is measured from the
 * official isotype artwork, in units where the circle radius is 1.
 */

const SLATE = 0x4b585a;
const GOLD = 0xd4c194;
const STROKE = 0.05;
const CENTER_X = 0.85; // horizontal centre of the full mark

const STRINGS = [
  { y: 0.35, x0: -0.92, x1: 3.0 },
  { y: 0.0, x0: -0.77, x1: 3.25 },
  { y: -0.33, x0: -0.92, x1: 3.0 },
];

const BARS = [
  { x: 1.58, y0: -0.63, y1: 0.62 },
  { x: 1.88, y0: -0.79, y1: 0.82 },
];

const DOTS = [
  { x: -1.46, y: 0.19 },
  { x: -1.46, y: -0.14 },
];

const PARTICLE_COUNT = 140;

type StringState = {
  mesh: Mesh;
  base: Float32Array;
  x0: number;
  len: number;
  y: number;
  amp: number;
  phase: number;
  freq: number;
};

function dustTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.4, "rgba(255,255,255,0.5)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new CanvasTexture(canvas);
}

export default function StringsScene({ onReady }: { onReady?: () => void }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: window.devicePixelRatio < 2, alpha: true, powerPreference: "low-power" });
    } catch {
      return; // No WebGL: the static isotype placeholder simply stays visible.
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarsePointer ? 1.5 : 1.75));
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.domElement.style.touchAction = "pan-y";
    renderer.domElement.setAttribute("aria-hidden", "true");
    mount.appendChild(renderer.domElement);

    const scene = new Scene();

    const camera = new PerspectiveCamera(30, 1, 0.1, 60);
    camera.position.set(0, 0, 10);

    // Plain lights instead of a generated environment map: same satin-metal look,
    // without the heavy one-off GPU work that stalls phones on load.
    const ambient = new HemisphereLight(0xfbfaf8, 0x9aa7ad, 1.6);
    const key = new DirectionalLight(0xfff4e2, 2.4);
    key.position.set(-3, 4, 5);
    const fill = new DirectionalLight(0xfff8ee, 0.9);
    fill.position.set(3, 1, 4);
    const rim = new DirectionalLight(0xb1bec6, 1.4);
    rim.position.set(4, -2, -3);
    scene.add(ambient, key, fill, rim);

    const slate = new MeshStandardMaterial({ color: SLATE, metalness: 0.25, roughness: 0.42 });
    const brass = new MeshStandardMaterial({ color: 0xc8ae72, metalness: 0.45, roughness: 0.3 });

    const rig = new Group(); // receives pointer tilt and idle float
    const mark = new Group(); // the isotype itself, centred on the origin
    mark.position.x = -CENTER_X;
    rig.add(mark);
    scene.add(rig);

    const disposables: { dispose: () => void }[] = [slate, brass];

    // Sound-hole circle, opened on the right where the strings pass through.
    const gap = 0.42;
    const ringGeometry = new TorusGeometry(1, STROKE, 12, 120, Math.PI * 2 - gap * 2);
    const ring = new Mesh(ringGeometry, slate);
    ring.rotation.z = gap;
    mark.add(ring);
    disposables.push(ringGeometry);

    for (const bar of BARS) {
      const height = bar.y1 - bar.y0;
      const geometry = new CylinderGeometry(STROKE, STROKE, height, 16, 1);
      const mesh = new Mesh(geometry, slate);
      mesh.position.set(bar.x, (bar.y0 + bar.y1) / 2, 0);
      mark.add(mesh);
      disposables.push(geometry);
    }

    const dotGeometry = new SphereGeometry(0.075, 20, 12);
    disposables.push(dotGeometry);
    for (const dot of DOTS) {
      const mesh = new Mesh(dotGeometry, slate);
      mesh.position.set(dot.x, dot.y, 0);
      mark.add(mesh);
    }

    const strings: StringState[] = STRINGS.map((s, index) => {
      const len = s.x1 - s.x0;
      const geometry = new CylinderGeometry(STROKE * 0.72, STROKE * 0.72, len, 8, 96, true);
      geometry.rotateZ(-Math.PI / 2);
      geometry.translate(s.x0 + len / 2, s.y, 0);
      const mesh = new Mesh(geometry, brass);
      mark.add(mesh);
      disposables.push(geometry);
      const position = geometry.getAttribute("position") as BufferAttribute;
      return {
        mesh,
        base: Float32Array.from(position.array as Float32Array),
        x0: s.x0,
        len,
        y: s.y,
        amp: 0,
        phase: 0,
        freq: 26 + index * 7,
      };
    });

    // Drifting flour dust.
    const dustGeometry = new BufferGeometry();
    const dustPositions = new Float32Array(PARTICLE_COUNT * 3);
    const dustSpeeds = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 8;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 4.5;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 3 - 0.5;
      dustSpeeds[i] = 0.03 + Math.random() * 0.07;
    }
    dustGeometry.setAttribute("position", new BufferAttribute(dustPositions, 3));
    const dustMap = dustTexture();
    const dustMaterial = new PointsMaterial({
      color: GOLD,
      size: 0.05,
      map: dustMap,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const dust = new Points(dustGeometry, dustMaterial);
    scene.add(dust);
    disposables.push(dustGeometry, dustMaterial, dustMap);

    // Fit the whole mark inside the canvas at any aspect ratio.
    const fit = () => {
      const { clientWidth: width, clientHeight: height } = mount;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = width / height;
      const halfFov = (camera.fov * Math.PI) / 360;
      const needWidth = 5.05 / 2 / (Math.tan(halfFov) * camera.aspect);
      const needHeight = 2.4 / 2 / Math.tan(halfFov);
      camera.position.z = Math.max(needWidth, needHeight);
      camera.updateProjectionMatrix();
    };
    fit();
    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(mount);

    // Pointer handling: tilt follows the pointer; crossing a string plucks it.
    const raycaster = new Raycaster();
    const plane = new Plane(new Vector3(0, 0, 1), 0);
    const ndc = new Vector2();
    const hit = new Vector3();
    const tilt = { x: 0, y: 0 };
    let previousLocal: Vector3 | null = null;
    let lastInteraction = performance.now();

    const toLocal = (clientX: number, clientY: number) => {
      const rect = renderer.domElement.getBoundingClientRect();
      ndc.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      if (!raycaster.ray.intersectPlane(plane, hit)) return null;
      return mark.worldToLocal(hit.clone());
    };

    const pluck = (state: StringState, strength: number) => {
      state.amp = Math.min(0.14, Math.max(state.amp, strength));
      state.phase = 0;
      lastInteraction = performance.now();
    };

    const onPointerMove = (event: PointerEvent) => {
      tilt.x = (event.clientX / window.innerWidth) * 2 - 1;
      tilt.y = (event.clientY / window.innerHeight) * 2 - 1;

      const rect = renderer.domElement.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      if (!inside) {
        previousLocal = null;
        return;
      }

      const current = toLocal(event.clientX, event.clientY);
      if (!current) return;
      if (previousLocal) {
        const speed = current.distanceTo(previousLocal);
        for (const state of strings) {
          const crossed = (previousLocal.y - state.y) * (current.y - state.y) < 0;
          const withinLength = current.x >= state.x0 && current.x <= state.x0 + state.len;
          if (crossed && withinLength) pluck(state, 0.05 + speed * 0.12);
        }
      }
      previousLocal = current;
    };

    const onPointerDown = (event: PointerEvent) => {
      const current = toLocal(event.clientX, event.clientY);
      if (!current) return;
      let nearest: StringState | null = null;
      let best = 0.3;
      for (const state of strings) {
        const distance = Math.abs(current.y - state.y);
        const withinLength = current.x >= state.x0 - 0.2 && current.x <= state.x0 + state.len + 0.2;
        if (withinLength && distance < best) {
          best = distance;
          nearest = state;
        }
      }
      if (nearest) pluck(nearest, 0.11);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    renderer.domElement.addEventListener("pointerdown", onPointerDown);

    // Render loop, paused whenever the hero is off screen or the tab is hidden.
    let elapsed = 0;
    let last = performance.now();
    let nextIdlePluck = 1600;
    let inView = true;
    let readyFired = false;

    const vibrate = (state: StringState, dt: number) => {
      if (state.amp < 0.0004) {
        if (state.amp !== 0) {
          state.amp = 0;
          const position = state.mesh.geometry.getAttribute("position") as BufferAttribute;
          (position.array as Float32Array).set(state.base);
          position.needsUpdate = true;
        }
        return;
      }
      state.phase += dt * state.freq;
      state.amp *= Math.exp(-dt * 1.5);
      const position = state.mesh.geometry.getAttribute("position") as BufferAttribute;
      const array = position.array as Float32Array;
      const s1 = Math.sin(state.phase);
      const s2 = Math.sin(state.phase * 2 + 1);
      for (let i = 0; i < array.length; i += 3) {
        const t = (state.base[i] - state.x0) / state.len;
        const shape = Math.sin(Math.PI * t) * s1 + 0.3 * Math.sin(2 * Math.PI * t) * s2;
        array[i + 1] = state.base[i + 1] + state.amp * shape;
        array[i + 2] = state.base[i + 2] + state.amp * 0.35 * shape;
      }
      position.needsUpdate = true;
    };

    const tick = () => {
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      elapsed += dt;

      rig.rotation.y += (tilt.x * 0.32 - rig.rotation.y) * 0.05;
      rig.rotation.x += (tilt.y * 0.16 - rig.rotation.x) * 0.05;

      if (!reduceMotion) {
        rig.position.y = Math.sin(elapsed * 0.7) * 0.06;
        rig.rotation.z = Math.sin(elapsed * 0.45) * 0.015;

        const array = dustGeometry.getAttribute("position").array as Float32Array;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          array[i * 3 + 1] += dustSpeeds[i] * dt;
          array[i * 3] += Math.sin(elapsed * 0.3 + i) * 0.0015;
          if (array[i * 3 + 1] > 2.3) array[i * 3 + 1] = -2.3;
        }
        dustGeometry.getAttribute("position").needsUpdate = true;

        // A gentle, occasional strum so the mark feels alive on touch screens too.
        if (now - lastInteraction > 3500 && elapsed * 1000 > nextIdlePluck) {
          pluck(strings[Math.floor(Math.random() * strings.length)], 0.045);
          lastInteraction = now - 3500;
          nextIdlePluck = elapsed * 1000 + 4200 + Math.random() * 2800;
        }
      }

      for (const state of strings) vibrate(state, dt);

      renderer.render(scene, camera);
      if (!readyFired) {
        readyFired = true;
        onReadyRef.current?.();
      }
    };

    const updateLoop = () => {
      const active = inView && document.visibilityState === "visible";
      if (active) last = performance.now();
      renderer.setAnimationLoop(active ? tick : null);
    };

    const intersection = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updateLoop();
    });
    intersection.observe(mount);
    document.addEventListener("visibilitychange", updateLoop);
    updateLoop();

    return () => {
      renderer.setAnimationLoop(null);
      intersection.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", updateLoop);
      window.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      disposables.forEach((item) => item.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
}
