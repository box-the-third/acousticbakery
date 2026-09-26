"use client";

import Image from "next/image";
import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { asset } from "@/lib/asset";

export function Story() {
  const { t } = useLanguage();
  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section id="story" className="bg-shell py-24 sm:py-32">
      <div className="container-page grid grid-cols-1 items-start gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        {/* Offset photo with a solid "Est. 2007" block, all square edges */}
        <Reveal distance={28} className="lg:sticky lg:top-28">
          <div className="relative pb-24 sm:pb-28">
            <div
              ref={frameRef}
              className="relative ms-auto aspect-[4/5] w-[86%] overflow-hidden bg-ink"
            >
              <m.div style={{ y: imageY }} className="absolute -inset-y-[8%] inset-x-0">
                <Image
                  src={asset("/images/story-flour.webp")}
                  alt="A baker dusting flour over fresh dough"
                  fill
                  sizes="(min-width: 1024px) 36vw, 86vw"
                  className="object-cover saturate-[0.7]"
                />
              </m.div>
            </div>
            <div className="absolute start-0 bottom-0 w-[62%] bg-ink p-7 text-paper sm:p-9">
              <p className="flex items-baseline gap-3">
                <span className="text-xs font-bold tracking-[0.18em] uppercase rtl:text-sm rtl:tracking-normal">
                  {t.hero.since}
                </span>
                <strong className="display-title text-6xl sm:text-7xl">2007</strong>
              </p>
              <span className="mt-5 block max-w-[12rem] text-[0.68rem] leading-snug font-bold tracking-[0.14em] text-cream/75 uppercase rtl:text-sm rtl:tracking-normal">
                {t.story.note}
              </span>
            </div>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            eyebrow={t.story.eyebrow}
            title={t.story.title}
            titleClassName="max-w-xl text-5xl sm:text-6xl lg:text-[5.2rem]"
          />

          {/* Timeline: a vertical rule with square markers */}
          <ol className="relative mt-14 border-s border-ink/25">
            {t.story.timeline.map((entry, index) => (
              <li key={entry.title} className="relative ps-8 pb-11 last:pb-0 sm:ps-12">
                <span aria-hidden className="absolute -start-[5px] top-2 size-[9px] bg-gold" />
                <Reveal delay={index * 0.08}>
                  <p className="display-title text-3xl text-ink sm:text-4xl">{entry.year}</p>
                  <h3 className="mt-3 text-xs font-bold tracking-[0.16em] text-ink uppercase rtl:text-base rtl:tracking-normal">
                    {entry.title}
                  </h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-ink/75">{entry.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
