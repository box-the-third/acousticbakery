"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowUpRight, WhatsApp } from "@/components/ui/Icons";
import { openEnquiry, whatsappLink } from "@/data/site";
import { asset } from "@/lib/asset";
import { BOX_PHOTOS } from "@/data/images";
import { BOX_CATEGORIES } from "@/data/boxes";

/**
 * Party boxes are ordered on WhatsApp: tapping a box opens a chat with the box
 * already named. Nothing is sold on this site itself.
 */
export function PartyBoxes() {
  const { t, locale } = useLanguage();

  return (
    <section id="boxes" className="bg-shell py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={t.boxes.eyebrow}
            title={t.boxes.title}
            titleClassName="max-w-2xl text-5xl sm:text-6xl lg:text-[5.4rem]"
          />
          <Reveal delay={0.15} className="max-w-sm">
            <p className="leading-relaxed text-ink/75">{t.boxes.body}</p>
            <button type="button" onClick={() => openEnquiry("party")} className="btn btn-dark mt-6">
              {t.boxes.orderAll}
              <WhatsApp className="size-4" />
            </button>
          </Reveal>
        </div>

        {/* How it works: three ruled steps */}
        <ol className="mt-14 grid grid-cols-1 border-y border-ink/25 sm:grid-cols-3">
          {t.boxes.steps.map((step, index) => (
            <li
              key={step.title}
              className="border-ink/25 py-6 max-sm:border-b max-sm:last:border-b-0 sm:border-e sm:px-6 sm:first:ps-0 sm:last:border-e-0"
            >
              <Reveal delay={index * 0.08} className="flex gap-4">
                <span className="display-title text-2xl text-ink/60">0{index + 1}</span>
                <span>
                  <span className="block font-bold text-ink">{step.title}</span>
                  <span className="mt-1 block text-sm text-ink/65">{step.body}</span>
                </span>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* Savory and dessert boxes: one photo per category, every box links to ordering */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {BOX_CATEGORIES.map((category, index) => {
            const photo = BOX_PHOTOS[category.id];
            return (
              <Reveal key={category.id} delay={index * 0.1} className="h-full">
                <article className="flex h-full flex-col border border-ink/20 bg-paper">
                  <div className="relative aspect-[16/9] overflow-hidden bg-ink/10">
                    <Image
                      src={asset(photo.src)}
                      alt={photo.alt[locale]}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <div className="flex items-baseline justify-between gap-4 border-b border-ink/25 pb-4">
                      <h3 className="display-title text-3xl text-ink sm:text-4xl">{category.title[locale]}</h3>
                      <span className="text-sm font-bold text-ink/50 tabular-nums">{category.boxes.length}</span>
                    </div>
                    <ul>
                      {category.boxes.map((box) => (
                        <li key={box.id} className="border-b border-ink/15 last:border-b-0">
                          <a
                            href={whatsappLink(t.boxes.whatsappMessage.replace("{box}", box.name[locale]))}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-start justify-between gap-6 py-4"
                          >
                            <span>
                              <span className="block font-display text-xl font-semibold tracking-[-0.02em] text-ink rtl:tracking-normal">
                                {box.name[locale]}
                              </span>
                              {box.flavours ? (
                                <span className="mt-1 block text-sm leading-relaxed text-ink/65">
                                  <span className="sr-only">{t.boxes.flavours}: </span>
                                  {box.flavours.map((flavour) => flavour[locale]).join(" · ")}
                                </span>
                              ) : null}
                            </span>
                            <span className="mt-1 inline-flex shrink-0 items-center gap-1.5 text-xs font-bold tracking-[0.1em] text-ink/70 uppercase transition-colors group-hover:text-ink rtl:text-sm rtl:tracking-normal">
                              {t.boxes.order}
                              <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5" />
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
