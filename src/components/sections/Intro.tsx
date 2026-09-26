"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowUpRight } from "@/components/ui/Icons";

export function Intro() {
  const { t } = useLanguage();

  return (
    <section aria-labelledby="intro-title" className="bg-paper py-24 sm:py-36 lg:py-44">
      <div className="container-page grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-32">
        <SectionHeading
          eyebrow={t.intro.eyebrow}
          title={t.intro.title}
          titleClassName="max-w-md text-5xl sm:text-6xl lg:text-[6rem]"
        />
        <Reveal delay={0.15} className="max-w-2xl lg:pt-6">
          <p className="text-xl leading-normal text-ink/80 sm:text-2xl">{t.intro.body}</p>
          <a href="#story" className="text-link mt-8 text-ink">
            {t.intro.link}
            <ArrowUpRight />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
