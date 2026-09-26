"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Isotype } from "@/components/ui/Isotype";

export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Olaya+St%2C+Al+Olaya%2C+Riyadh+12221%2C+Saudi+Arabia";

export function Visit() {
  const { t, locale } = useLanguage();

  // The address is always shown in both languages, led by the active one.
  const addresses =
    locale === "ar"
      ? [
          { text: t.visit.addressAr, lang: "ar", dir: "rtl" as const },
          { text: t.visit.addressEn, lang: "en", dir: "ltr" as const },
        ]
      : [
          { text: t.visit.addressEn, lang: "en", dir: "ltr" as const },
          { text: t.visit.addressAr, lang: "ar", dir: "rtl" as const },
        ];

  return (
    <section id="visit" className="relative bg-paper py-24 sm:py-32 lg:py-40">
      <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow={t.visit.eyebrow} title={t.visit.title} body={t.visit.body} />

          <Reveal delay={0.15}>
            <h3 className="eyebrow mt-12 text-ink/60">{t.visit.hoursLabel}</h3>
            <dl className="mt-5 divide-y divide-ink/10 border-y border-ink/10">
              {t.visit.hours.map((row) => (
                <div key={row.days} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5">
                  <dt className="font-display text-lg font-light text-ink">{row.days}</dt>
                  <dd className="text-sm text-ink/75 tabular-nums">{row.time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-ink/55">{t.visit.note}</p>
          </Reveal>
        </div>

        <Reveal delay={0.1} distance={28} className="lg:col-span-7">
          <div className="relative isolate flex h-full min-h-[26rem] flex-col justify-between overflow-hidden rounded-[2rem] bg-ink p-7 text-paper sm:p-10 lg:p-12">
            <div aria-hidden className="pattern-isotype pointer-events-none absolute inset-0 -z-10 opacity-[0.05]" />
            <div aria-hidden className="pointer-events-none absolute -bottom-32 -end-24 -z-10 size-96 rounded-full bg-gold/20 blur-[100px]" />

            <div className="flex items-start justify-between gap-6">
              <p className="eyebrow text-gold">{t.visit.addressLabel}</p>
              <Isotype tone="white" className="h-auto w-24 opacity-80 sm:w-28" />
            </div>

            <address className="mt-10 space-y-6 not-italic">
              {addresses.map((address, index) => (
                <p
                  key={address.lang}
                  lang={address.lang}
                  dir={address.dir}
                  className={
                    index === 0
                      ? `text-start text-2xl leading-snug font-light text-paper sm:text-3xl lg:text-[2.1rem] ${
                          address.lang === "ar"
                            ? "font-[family-name:var(--font-readex)]"
                            : "font-[family-name:var(--font-vonca)]"
                        }`
                      : `text-start text-base text-stone/70 sm:text-lg ${
                          address.lang === "ar" ? "font-[family-name:var(--font-plex-arabic)]" : ""
                        }`
                  }
                >
                  {address.text}
                </p>
              ))}
            </address>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-13 items-center gap-3 rounded-full bg-paper px-7 text-sm font-medium text-ink transition-colors duration-500 hover:bg-gold"
              >
                <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 21s-7-6.2-7-11.5a7 7 0 1 1 14 0C19 14.8 12 21 12 21Z" />
                  <circle cx="12" cy="9.5" r="2.5" />
                </svg>
                {t.visit.directions}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
