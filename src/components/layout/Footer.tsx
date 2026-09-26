"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import { asset } from "@/lib/asset";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const links = [
    { href: "#story", label: t.nav.story },
    { href: "#offerings", label: t.nav.offerings },
    { href: "#menu", label: t.nav.menu },
    { href: "#boxes", label: t.nav.order },
    { href: "#catering", label: t.nav.catering },
    { href: "#clients", label: t.nav.clients },
  ];

  return (
    <footer className="bg-ink text-paper">
      <div className="container-page py-16 sm:py-20">
        <div className="flex flex-col gap-12 border-b border-cream/20 pb-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Image
              src={asset("/brand/logo-white.webp")}
              alt="Acoustic Bakery & Pâtisserie"
              width={900}
              height={86}
              className="h-auto w-64 sm:w-80"
            />
            <p className="display-title mt-8 max-w-md text-3xl text-cream/85">{t.footer.tagline}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[0.7rem] font-semibold tracking-[0.12em] text-cream/70 uppercase transition-colors hover:text-paper rtl:text-sm rtl:tracking-normal"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-3 pt-8 text-xs text-cream/55 sm:flex-row sm:items-center sm:justify-between">
          <span>
            {t.footer.since} · &copy; {year} {t.footer.rights}
          </span>
          <span className="flex items-center gap-6">
            <span>{t.footer.city}</span>
            <a href="#top" className="transition-colors hover:text-paper">
              {t.footer.backToTop} &uarr;
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
