"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { asset } from "@/lib/asset";

const IMAGES = [
  { src: "/images/offer-pastries.webp", detail: "/images/gallery-canapes.webp", alt: "Golden pastries arranged as a sculpture" },
  { src: "/images/offer-breads.webp", detail: "/images/gallery-breads.webp", alt: "Fresh artisan breads and loaves" },
  { src: "/images/offer-desserts.webp", detail: "/images/gallery-dessert-stands.webp", alt: "Colourful desserts and petits fours" },
  { src: "/images/offer-gifts.webp", detail: "/images/gallery-buffet.webp", alt: "A platter of macarons for gifting" },
];

/** Four ruled columns of what we make, each with a photo and a square detail inset. */
export function Offerings() {
  const { t } = useLanguage();

  return (
    <section id="offerings" className="relative bg-ink py-24 text-paper sm:py-32">
      <div className="container-page">
        <div className="mb-14 flex flex-col gap-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            tone="dark"
            eyebrow={t.offerings.eyebrow}
            title={t.offerings.title}
            titleClassName="max-w-xl text-5xl sm:text-6xl lg:text-[5.4rem]"
          />
          <Reveal delay={0.15}>
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-cream/70">{t.offerings.body}</p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 border-y border-cream/25 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr_0.9fr]">
          {t.offerings.items.map((item, index) => {
            const image = IMAGES[index];
            return (
              <Reveal
                key={item.title}
                delay={index * 0.08}
                className="border-cream/25 max-lg:border-b max-lg:last:border-b-0 sm:max-lg:odd:border-e lg:border-e lg:last:border-e-0"
              >
                <article className="group h-full transition-colors duration-300 hover:bg-cream/[0.06]">
                  <div className="relative aspect-[1.05] overflow-hidden bg-cream/5">
                    <Image
                      src={asset(image.src)}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute end-3 bottom-3 size-20 overflow-hidden border-4 border-ink shadow-[0_8px_20px_rgb(21_28_30/0.3)] transition-transform duration-500 group-hover:-translate-y-1">
                      <Image src={asset(image.detail)} alt="" fill sizes="80px" className="object-cover" />
                    </div>
                  </div>
                  <div className="px-5 pt-6 pb-8">
                    <span className="display-title block text-2xl text-coral">0{index + 1}</span>
                    <h3 className="display-title mt-4 text-4xl">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-cream/65">{item.body}</p>
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
