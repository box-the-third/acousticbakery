"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StringsVisual } from "@/components/three/StringsVisual";

/** "The Acoustic Way": the playable 3D isotype beside the brand's philosophy. */
export function Ritual() {
  const { t } = useLanguage();

  return (
    <section aria-labelledby="ritual-title" className="bg-mist py-24 sm:py-32">
      <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <Reveal className="relative">
          <div className="relative aspect-[16/10] w-full border border-ink/25">
            <StringsVisual />
            <p className="eyebrow pointer-events-none absolute start-5 bottom-4 text-ink/70">{t.ritual.hint}</p>
          </div>
        </Reveal>

        <div id="ritual-title">
          <SectionHeading
            eyebrow={t.ritual.eyebrow}
            title={t.ritual.title}
            titleClassName="max-w-2xl text-5xl sm:text-6xl lg:text-[5.4rem]"
          />
          <Reveal delay={0.15}>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-ink-night/80">{t.ritual.body}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
