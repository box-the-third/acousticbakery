"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowUpRight, Plane } from "@/components/ui/Icons";
import { openEnquiry } from "@/data/site";
import { asset } from "@/lib/asset";
import { AIRLINE_PHOTO } from "@/data/images";

/** Catering: airline catering as the lead feature, then buffets and platters. */
export function Catering() {
  const { t, locale } = useLanguage();
  const airline = t.catering.airline;

  return (
    <section id="catering" className="bg-ink py-24 text-paper sm:py-32">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            tone="dark"
            eyebrow={t.catering.eyebrow}
            title={t.catering.title}
            titleClassName="max-w-2xl text-5xl sm:text-6xl lg:text-[5.4rem]"
          />
          <Reveal delay={0.15}>
            <p className="max-w-sm leading-relaxed text-cream/70">{t.catering.body}</p>
          </Reveal>
        </div>

        {/* Airline catering feature */}
        <Reveal delay={0.1} className="mt-14">
          <article className="grid grid-cols-1 border border-cream/25 lg:grid-cols-2">
            <div className="relative aspect-[4/5] bg-ink sm:aspect-[4/3] lg:aspect-auto lg:min-h-[40rem]">
              <Image
                src={asset(AIRLINE_PHOTO.src)}
                alt={AIRLINE_PHOTO.alt[locale]}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col p-7 sm:p-10 lg:p-14">
              <p className="flex items-center gap-3 text-gold">
                <Plane />
                <span className="text-xs font-bold tracking-[0.16em] uppercase rtl:text-base rtl:tracking-normal">
                  {airline.label}
                </span>
              </p>
              <h3 className="display-title mt-6 text-4xl sm:text-5xl lg:text-6xl">{airline.title}</h3>
              <p className="mt-6 max-w-md leading-relaxed text-cream/75">{airline.body}</p>
              <ul className="mt-8 border-t border-cream/20">
                {airline.points.map((point) => (
                  <li key={point} className="flex items-center gap-4 border-b border-cream/20 py-3.5 text-sm">
                    <span aria-hidden className="size-1.5 shrink-0 bg-gold" />
                    {point}
                  </li>
                ))}
              </ul>
              <button type="button" onClick={() => openEnquiry("airline")} className="btn btn-light mt-9 self-start">
                {airline.cta}
                <ArrowUpRight />
              </button>
            </div>
          </article>
        </Reveal>

        {/* Buffets, sweet tables, sandwiches, canapés */}
        <ul className="mt-6 grid grid-cols-1 border border-cream/25 sm:grid-cols-2 lg:grid-cols-4">
          {t.catering.services.map((service, index) => (
            <li
              key={service.title}
              className="border-cream/25 max-lg:border-b sm:max-lg:odd:border-e max-sm:last:border-b-0 sm:max-lg:[&:nth-child(n+3)]:border-b-0 lg:border-e lg:last:border-e-0"
            >
              <Reveal delay={index * 0.08} className="h-full p-7">
                <span className="display-title text-2xl text-gold">0{index + 1}</span>
                <h3 className="display-title mt-5 text-3xl">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/65">{service.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-10">
          <button type="button" onClick={() => openEnquiry("buffet")} className="btn btn-ghost-light">
            {t.catering.cta}
            <ArrowUpRight />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
