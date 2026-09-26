"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Isotype } from "@/components/ui/Isotype";

const StringsScene = dynamic(() => import("./StringsScene"), { ssr: false });

/**
 * Shows the static isotype, then loads the WebGL scene only once the section
 * approaches the viewport and cross-fades to it. Three.js is never part of the
 * initial page load.
 */
export function StringsVisual() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [mountScene, setMountScene] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Keep the static mark where 3D would cost more than it gives.
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPowerTouch =
      window.matchMedia("(pointer: coarse)").matches && (navigator.hardwareConcurrency ?? 8) <= 4;
    const wrapper = wrapperRef.current;
    if (connection?.saveData || reduceMotion || lowPowerTouch || !wrapper) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setMountScene(true);
        observer.disconnect();
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-full w-full">
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      >
        <Isotype className="h-auto w-[78%] opacity-90" />
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
