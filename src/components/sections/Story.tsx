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
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="story" className="relative bg-paper py-24 sm:py-32 lg:py-40">
      <div className="container-page grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <Reveal className="relative lg:col-span-5" distance={28}>
          <div
            ref={frameRef}
            className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-ink-night lg:max-w-none"
          >
            <m.div style={{ y: imageY }} className="absolute -inset-y-[10%] inset-x-0">
              <Image
                src={asset("/images/story-flour.webp")}
                alt="A baker dusting flour over fresh dough"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
            </m.div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink-night/70 via-transparent to-transparent" />
            <p className="font-display absolute inset-x-6 bottom-7 text-center text-xl font-light text-paper sm:text-2xl">
              &ldquo;{t.story.quote}&rdquo;
            </p>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <SectionHeading eyebrow={t.story.eyebrow} title={t.story.title} />
          <Reveal delay={0.1}>
            <p className="font-display mt-8 text-xl leading-relaxed font-light text-ink sm:text-2xl">
              {t.story.lead}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl leading-relaxed text-ink/75">{t.story.body}</p>
          </Reveal>

          <ul className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-3">
            {t.story.pillars.map((pillar, index) => (
              <li key={pillar.title} className="bg-paper">
                <Reveal delay={0.1 + index * 0.1} className="h-full p-6">
                  <span className="text-xs text-gold-deep tabular-nums">0{index + 1}</span>
                  <h3 className="font-display mt-3 text-lg font-normal text-ink">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{pillar.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
