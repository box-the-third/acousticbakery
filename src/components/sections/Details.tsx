"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowUpRight } from "@/components/ui/Icons";
import { PACK_TILES } from "@/data/images";
import { asset } from "@/lib/asset";

/**
 * Packaging and tableware from the brand guidelines and packaging proposal.
 * Square tiles plus two wide ones, closed by a text panel so the grid is even.
 */
export function Details() {
  const { t } = useLanguage();

  return (
    <section id="details" className="bg-paper py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={t.details.eyebrow}
            title={t.details.title}
            titleClassName="max-w-2xl text-5xl sm:text-6xl lg:text-[5.4rem]"
          />
          <Reveal delay={0.15}>
            <p className="max-w-sm leading-relaxed text-ink/75">{t.details.body}</p>
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-3">
          {PACK_TILES.map((tile, index) => (
            <li key={tile.key} className={tile.wide ? "col-span-2" : ""}>
              <Reveal delay={(index % 4) * 0.06} className="h-full">
                <figure className="group relative h-full overflow-hidden bg-[#dcdcdc]">
                  <div className={`relative ${tile.wide ? "aspect-[2/1]" : "aspect-square"}`}>
                    <Image
                      src={asset(tile.src)}
                      alt={t.details.items[tile.key]}
                      fill
                      sizes={tile.wide ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <figcaption className="absolute start-0 bottom-0 bg-paper px-3 py-2 text-[0.62rem] font-bold tracking-[0.14em] text-ink uppercase rtl:text-xs rtl:tracking-normal">
                    {t.details.items[tile.key]}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}

          {/* Text panel completes the last row */}
          <li className="col-span-2">
            <Reveal className="h-full">
              <div className="flex h-full flex-col justify-between gap-8 bg-ink p-7 text-paper sm:p-10">
                <h3 className="display-title text-4xl sm:text-5xl">{t.details.panelTitle}</h3>
                <div>
                  <p className="max-w-sm text-sm leading-relaxed text-cream/75">{t.details.panelBody}</p>
                  <a href="#boxes" className="text-link mt-6 text-paper">
                    {t.details.panelLink}
                    <ArrowUpRight />
                  </a>
                </div>
              </div>
            </Reveal>
          </li>
        </ul>
      </div>
    </section>
  );
}
