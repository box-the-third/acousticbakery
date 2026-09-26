"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";

const IMAGES = [
  "/images/pack-bread.webp",
  "/images/pack-box.webp",
  "/images/pack-cookie.webp",
  "/images/pack-tin.webp",
  "/images/pack-baguette.webp",
  "/images/pack-croissant.webp",
];

/** A slow, continuous marquee of the brand's packaging, taken from the brand files. */
export function Craft() {
  const { t, dir } = useLanguage();
  const slides = IMAGES.map((src, index) => ({ src, label: t.craft.items[index] }));

  return (
    <section aria-labelledby="craft-title" className="overflow-hidden bg-stone/60 py-24 sm:py-28">
      <div className="container-page" id="craft-title">
        <SectionHeading eyebrow={t.craft.eyebrow} title={t.craft.title} align="center" />
      </div>

      <div className="group relative mt-14 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div
          className={`flex w-max gap-5 group-hover:[animation-play-state:paused] ${
            dir === "rtl" ? "animate-[marquee-rtl_60s_linear_infinite]" : "animate-[marquee_60s_linear_infinite]"
          }`}
        >
          {[...slides, ...slides].map((slide, index) => (
            <figure
              key={`${slide.src}-${index}`}
              aria-hidden={index >= slides.length}
              className="w-[17rem] shrink-0 sm:w-[22rem]"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#cfcfcf]">
                <Image
                  src={slide.src}
                  alt={slide.label}
                  fill
                  sizes="(min-width: 640px) 22rem, 17rem"
                  className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-soft)] hover:scale-[1.04]"
                />
              </div>
              <figcaption className="eyebrow mt-4 text-ink/60">{slide.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
