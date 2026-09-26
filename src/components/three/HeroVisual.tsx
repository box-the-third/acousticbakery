"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Isotype } from "@/components/ui/Isotype";

const StringsScene = dynamic(() => import("./StringsScene"), { ssr: false });

/**
 * Shows the static isotype immediately, then mounts the WebGL scene once the
 * browser is idle and cross-fades to it. Three.js never blocks first paint.
 */
export function HeroVisual() {
  const [mountScene, setMountScene] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Keep the static mark where 3D would cost more than it gives.
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPowerTouch =
      window.matchMedia("(pointer: coarse)").matches && (navigator.hardwareConcurrency ?? 8) <= 4;
    if (connection?.saveData || reduceMotion || lowPowerTouch) return;

    // Wait for the page to finish loading, then for an idle moment, so the
    // Three.js download and setup never compete with first paint or hydration.
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const start = () => setMountScene(true);
    const schedule = () => {
      if ("requestIdleCallback" in window) idleId = window.requestIdleCallback(start, { timeout: 2500 });
      else timeoutId = setTimeout(start, 600);
    };

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      window.removeEventListener("load", schedule);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      >
        <Isotype priority className="h-auto w-[78%] opacity-90" />
      </div>
      {mountScene ? (
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
        >
          <StringsScene onReady={() => setReady(true)} />
        </div>
      ) : null}
    </div>
  );
}
