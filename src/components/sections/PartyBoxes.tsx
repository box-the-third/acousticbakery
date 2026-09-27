"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowUpRight } from "@/components/ui/Icons";
import { ORDER_URL } from "@/data/site";
import { asset } from "@/lib/asset";
import { BOX_PHOTOS } from "@/data/images";

/**
 * Party boxes ordered through the online ordering page: one tap on a box opens
 * ordering for pickup or delivery. Nothing is sold on this site itself.
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
            <a href={ORDER_URL} target="_blank" rel="noopener noreferrer" className="btn btn-dark mt-6">
              {t.boxes.orderAll}
              <ArrowUpRight />
            </a>
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

        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.boxes.items.map((box, index) => (
            <li key={box.id}>
              <Reveal delay={index * 0.08} className="h-full">
                <a
                  href={ORDER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col border border-ink/20 bg-paper transition-colors duration-300 hover:border-ink"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-ink/10">
                    <Image
                      src={asset(BOX_PHOTOS[box.id].src)}
                      alt={BOX_PHOTOS[box.id].alt[locale]}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    <span className="absolute start-0 top-0 bg-ink px-3 py-2 text-[0.65rem] font-bold tracking-[0.14em] text-paper uppercase rtl:text-xs rtl:tracking-normal">
                      {t.boxes.serves} {box.serves}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="display-title text-3xl text-ink">{box.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">{box.body}</p>
                    <span className="text-link mt-6 self-start text-ink">
                      {t.boxes.order}
                      <ArrowUpRight />
                    </span>
                  </div>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
