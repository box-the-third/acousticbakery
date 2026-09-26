"use client";

import { m, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { StaggerText } from "@/components/motion/StaggerText";
import { ArrowUpRight } from "@/components/ui/Icons";
import { asset } from "@/lib/asset";

export function Hero() {
  const { t, locale } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  // Below lg the photo is shown whole, stacked above the copy, so the
  // full-bleed motion (drift, scroll sink, copy fade) only runs on wide screens.
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Photo drifts gently against the pointer, and sinks slightly on scroll.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 60, damping: 20 });
  const y = useSpring(pointerY, { stiffness: 60, damping: 20 });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const scrollY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const copyFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const onMove = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth - 0.5) * -24);
      pointerY.set((event.clientY / window.innerHeight - 0.5) * -16);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [pointerX, pointerY]);

  // Entrance runs in CSS so the hero is visible on first paint, before any JS loads.
  const rise = (delay: number) => ({ style: { animationDelay: `${delay}s` } });

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative isolate flex flex-col overflow-hidden bg-ink text-paper lg:min-h-[min(860px,100svh)] lg:flex-row"
    >
      {/* Phones and tablets: the whole 16:9 photo sits under the header.
          Wide screens: it fills the hero behind the copy. */}
      <m.div
        style={wide ? { y: scrollY } : undefined}
        className="relative mt-18 aspect-video w-full overflow-hidden sm:mt-20 lg:absolute lg:inset-0 lg:-z-20 lg:mt-0 lg:aspect-auto lg:overflow-visible"
      >
        <m.div style={wide ? { x, y } : undefined} className="absolute inset-0 lg:-inset-6">
          {/* A plain img with srcset: static hosting has no image optimiser. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("/images/hero-sign.webp")}
            srcSet={`${asset("/images/hero-sign-640.webp")} 640w, ${asset("/images/hero-sign-1080.webp")} 1080w, ${asset("/images/hero-sign.webp")} 1920w`}
            sizes="100vw"
            alt="The Acoustic Bakery & Pâtisserie storefront sign in Riyadh"
            fetchPriority="high"
            decoding="async"
            className="animate-settle size-full object-cover opacity-85 saturate-[0.67] contrast-[0.93] lg:object-[35%_center] lg:rtl:object-[70%_center]"
          />
        </m.div>
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-b from-transparent to-ink lg:hidden" />
      </m.div>

      {/* Legibility wash, heavier on the reading-start side */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden lg:block bg-[linear-gradient(90deg,rgb(34_45_47/0.8),rgb(34_45_47/0.4)_50%,rgb(34_45_47/0.15)),linear-gradient(180deg,transparent_50%,rgb(34_45_47/0.75))] rtl:bg-[linear-gradient(270deg,rgb(34_45_47/0.8),rgb(34_45_47/0.4)_50%,rgb(34_45_47/0.15)),linear-gradient(180deg,transparent_50%,rgb(34_45_47/0.75))]"
      />

      <m.div
        style={wide ? { opacity: copyFade } : undefined}
        className="container-page relative flex flex-1 flex-col pt-8 pb-14 sm:pt-12 sm:pb-16 lg:justify-end lg:pt-32 lg:pb-20"
      >
        <div className="max-w-2xl">
          <p {...rise(0.05)} className="animate-rise eyebrow text-paper">
            {t.hero.eyebrow}
          </p>

          <StaggerText
            key={`title-${locale}`}
            as="h1"
            immediate
            delay={0.1}
            text={t.hero.title}
            className="display-title mt-5 mb-5 text-[3.6rem] min-[400px]:text-[4.2rem] lg:mt-6 lg:mb-6 sm:text-[6.5rem] lg:text-[8.6rem] rtl:text-[3.6rem] sm:rtl:text-[5.4rem] lg:rtl:text-[6.6rem]"
          />

          <p
            {...rise(0.3)}
            className="animate-rise max-w-lg text-base leading-relaxed text-cream/85 sm:text-xl"
          >
            {t.hero.body}
          </p>

          <div {...rise(0.4)} className="animate-rise mt-9 flex flex-wrap gap-3">
            <a href="#menu" className="btn btn-light">
              {t.hero.primary}
              <ArrowUpRight />
            </a>
            <a href="#boxes" className="btn btn-ghost-light">
              {t.hero.secondary}
            </a>
          </div>
        </div>

        {/* Straight-edged stamp, anchored to the reading-end corner */}
        <div
          {...rise(0.6)}
          className="animate-rise absolute end-8 bottom-16 hidden border border-cream/55 px-6 py-5 text-center lg:block xl:end-0"
        >
          <span className="flex items-baseline justify-center gap-2">
            <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase rtl:text-xs rtl:tracking-normal">
              {t.hero.since}
            </span>
            <span className="display-title text-4xl">2007</span>
          </span>
          <span className="mt-3 block border-t border-cream/40 pt-3 text-[0.6rem] font-bold tracking-[0.14em] uppercase rtl:text-xs rtl:tracking-normal">
            {t.hero.sinceNote}
          </span>
        </div>
      </m.div>
    </section>
  );
}
