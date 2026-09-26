"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { StaggerText } from "@/components/motion/StaggerText";
import { HeroVisual } from "@/components/three/HeroVisual";

export function Hero() {
  const { t, locale } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const visualY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Entrance runs in CSS so the hero is visible on first paint, before any JS loads.
  const rise = (delay: number) => ({ style: { animationDelay: `${delay}s` } });

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-cream pt-24 lg:pt-28"
    >
      {/* Soft atmospheric light */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 start-[45%] size-[42rem] rounded-full bg-mist/35 blur-[120px]" />
        <div className="absolute bottom-0 -start-40 size-[30rem] rounded-full bg-gold/20 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-paper" />
      </div>

      <div className="container-page grid flex-1 grid-cols-1 items-center gap-6 pb-16 lg:grid-cols-12 lg:gap-8 lg:pb-24">
        <m.div style={{ y: copyY, opacity: fade }} className="text-start lg:col-span-6">
          <p {...rise(0.2)} className="animate-rise eyebrow flex items-center gap-3 text-ink/70">
            <span aria-hidden className="h-px w-8 bg-ink/40" />
            {t.hero.eyebrow}
          </p>

          <StaggerText
            key={`title-${locale}`}
            as="h1"
            immediate
            delay={0.35}
            text={t.hero.title}
            className="font-display mt-6 text-[2.6rem] leading-[1.06] font-extralight text-ink sm:text-6xl lg:text-[3.8rem] xl:text-[4.6rem]"
          />

          <p
            {...rise(0.8)}
            className="animate-rise mt-7 max-w-lg text-base leading-relaxed text-ink/75 sm:text-lg"
          >
            {t.hero.body}
          </p>

          <div {...rise(0.95)} className="animate-rise mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#menu"
              className="group inline-flex h-13 items-center gap-3 rounded-full bg-ink px-7 text-sm font-medium text-paper shadow-[0_18px_40px_-18px_rgba(47,56,57,0.7)] transition-all duration-500 hover:bg-ink-night hover:shadow-[0_22px_50px_-18px_rgba(47,56,57,0.8)]"
            >
              {t.hero.primary}
              <span
                aria-hidden
                className="transition-transform duration-500 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
              >
                &rarr;
              </span>
            </a>
            <a
              href="#visit"
              className="inline-flex h-13 items-center rounded-full border border-ink/20 px-7 text-sm font-medium text-ink transition-colors duration-500 hover:border-ink/50 hover:bg-paper/60"
            >
              {t.hero.secondary}
            </a>
          </div>
        </m.div>

        <m.div
          style={{ y: visualY }}
          className="animate-rise-soft relative aspect-[16/10] w-full lg:col-span-6 lg:aspect-[5/4]"
        >
          <HeroVisual />
          <p className="eyebrow pointer-events-none absolute inset-x-0 bottom-0 text-center !text-[0.65rem] text-ink/60 lg:bottom-6">
            {t.hero.hint}
          </p>
        </m.div>
      </div>

      <a
        href="#story"
        aria-label={t.hero.scroll}
        style={{ animationDelay: "1.6s" }}
        className="animate-rise absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-ink/60 lg:flex"
      >
        <span className="eyebrow !text-[0.6rem]">{t.hero.scroll}</span>
        <span className="relative h-10 w-px overflow-hidden bg-ink/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.4s_ease-in-out_infinite] bg-ink/70" />
        </span>
      </a>
    </section>
  );
}
