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
    const start = () => setMountScene(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 400);
    return () => clearTimeout(id);
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
