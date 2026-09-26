"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal } from "@/components/motion/Reveal";
import { MAPS_URL } from "@/components/sections/Visit";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const links = [
    { href: "#story", label: t.nav.story },
    { href: "#menu", label: t.nav.menu },
    { href: "#visit", label: t.nav.visit },
  ];

  return (
    <footer className="relative isolate overflow-hidden bg-ink-night text-paper">
      <div aria-hidden className="pattern-isotype pointer-events-none absolute inset-0 -z-10 opacity-[0.03]" />

      <div className="container-page py-16 sm:py-20">
        <Reveal>
          <Image
            src="/brand/logo-white.webp"
            alt="Acoustic Bakery & Patisserie"
            width={900}
            height={86}
            className="h-auto w-64 sm:w-80"
          />
          <p className="font-display mt-6 max-w-md text-lg font-light text-stone/80">{t.footer.tagline}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 border-t border-paper/10 pt-10 sm:grid-cols-3">
          <div>
            <h2 className="eyebrow text-gold">{t.footer.explore}</h2>
            <ul className="mt-5 space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-stone/80 transition-colors hover:text-paper">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-gold">{t.footer.find}</h2>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block space-y-2 text-sm leading-relaxed text-stone/80 transition-colors hover:text-paper"
            >
              <span lang="en" dir="ltr" className="block text-start">
                {t.visit.addressEn}
              </span>
              <span lang="ar" dir="rtl" className="block text-start">
                {t.visit.addressAr}
              </span>
            </a>
          </div>

          <div>
            <h2 className="eyebrow text-gold">{t.visit.hoursLabel}</h2>
            <ul className="mt-5 space-y-2 text-sm text-stone/80">
              {t.visit.hours.map((row) => (
                <li key={row.days}>
                  <span className="block text-paper/90">{row.days}</span>
                  <span className="tabular-nums">{row.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-4 border-t border-paper/10 pt-8 text-xs text-stone/50 sm:flex-row sm:items-center">
          <p>
            &copy; {year} Acoustic Bakery &amp; Patisserie. {t.footer.rights}
          </p>
          <a href="#top" className="transition-colors hover:text-paper">
            {t.footer.backToTop} &uarr;
          </a>
        </div>
      </div>
    </footer>
  );
}
