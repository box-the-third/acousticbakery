"use client";

import Image from "next/image";
import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowUpRight } from "@/components/ui/Icons";
import { CHEF_HAT } from "@/data/images";
import { asset } from "@/lib/asset";

export function Intro() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const hatY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="intro-title"
      className="relative isolate overflow-hidden bg-shell pt-24 pb-[68vw] sm:pt-36 sm:pb-[50vw] lg:pt-44 lg:pb-60"
    >
      {/* The Acoustic chef's hat, cut out of its mockup, as the section background */}
      <m.div
        aria-hidden
        style={{ y: hatY }}
        className="pointer-events-none absolute end-[5%] bottom-[5%] -z-10 w-[72%] sm:w-[56%] lg:end-[3%] lg:bottom-[7%] lg:w-[38%] lg:max-w-[560px]"
      >
        <Image
          src={asset(CHEF_HAT.src)}
          alt=""
          width={CHEF_HAT.width}
          height={CHEF_HAT.height}
          sizes="(min-width: 1024px) 38vw, 72vw"
          className="h-auto w-full"
        />
      </m.div>

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
