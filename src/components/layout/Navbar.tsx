"use client";

import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { asset } from "@/lib/asset";
import { Close } from "@/components/ui/Icons";
import { LanguageSwitch } from "./LanguageSwitch";

export function Navbar() {
  const { t, dir } = useLanguage();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#story", label: t.nav.story },
    { href: "#offerings", label: t.nav.offerings },
    { href: "#menu", label: t.nav.menu },
    { href: "#boxes", label: t.nav.order },
    { href: "#catering", label: t.nav.catering },
    { href: "#clients", label: t.nav.clients },
  ];

  // Transparent over the hero photo, solid paper once the page scrolls.
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll and support Escape while the mobile drawer is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close the drawer if the viewport grows into the desktop layout.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1280px)");
    const close = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", close);
    return () => desktop.removeEventListener("change", close);
  }, []);

  // The drawer always slides in from the reading-end edge.
  const offscreen = dir === "rtl" ? "-100%" : "100%";
  const light = !solid;

  return (
    <>
      <header
        className={`animate-drop fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
          solid
            ? "border-ink/15 bg-paper/95 text-ink backdrop-blur-md"
            : "border-cream/25 bg-transparent text-cream"
        }`}
      >
        <nav
          aria-label="Primary"
          className="container-page flex h-18 items-center justify-between gap-6 sm:h-20"
        >
          <a href="#top" className="relative shrink-0" aria-label="Acoustic Bakery & Pâtisserie">
            <Image
              src={asset("/brand/logo-white.webp")}
              alt="Acoustic Bakery & Pâtisserie"
              width={900}
              height={86}
              priority
              className={`h-auto w-40 transition-opacity duration-500 sm:w-56 ${light ? "opacity-100" : "opacity-0"}`}
            />
            <Image
              src={asset("/brand/logo-slate.webp")}
              alt=""
              width={900}
              height={86}
              className={`absolute inset-0 h-auto w-40 transition-opacity duration-500 sm:w-56 ${light ? "opacity-0" : "opacity-100"}`}
            />
          </a>

          <ul className="hidden items-center gap-7 xl:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative block py-3 text-[0.7rem] font-semibold tracking-[0.12em] uppercase rtl:text-sm rtl:tracking-normal"
                >
                  {link.label}
                  <span className="absolute inset-x-0 bottom-2 h-px origin-[100%_50%] scale-x-0 bg-current opacity-70 transition-transform duration-300 group-hover:origin-[0%_50%] group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitch tone={light ? "dark" : "light"} />
            <a
              href="#visit"
              className={`btn hidden !min-h-10 !py-2 sm:inline-flex ${light ? "btn-light" : "btn-dark"}`}
            >
              {t.nav.cta}
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t.nav.openMenu}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="flex size-11 items-center justify-center xl:hidden"
            >
              <span className="flex w-6 flex-col gap-[6px]">
                <span className="h-[1.5px] w-full bg-current" />
                <span className="h-[1.5px] w-full bg-current" />
                <span className="h-[1.5px] w-full bg-current" />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <m.div
            key="drawer"
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.menu}
            className="fixed inset-0 z-[60] xl:hidden"
            initial="closed"
            animate="open"
            exit="closed"
          >
            <m.button
              type="button"
              tabIndex={-1}
              aria-label={t.nav.closeMenu}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-ink-night/50"
              variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
              transition={{ duration: 0.4 }}
            />
            <m.div
              className="absolute inset-y-0 end-0 flex w-full max-w-md flex-col overflow-y-auto bg-ink text-paper"
              variants={{ open: { x: "0%" }, closed: { x: offscreen } }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex h-18 shrink-0 items-center justify-between border-b border-paper/15 px-6 sm:h-20">
                <Image
                  src={asset("/brand/logo-white.webp")}
                  alt=""
                  width={900}
                  height={86}
                  className="h-auto w-40"
                />
                <button
                  type="button"
                  autoFocus
                  onClick={() => setOpen(false)}
                  aria-label={t.nav.closeMenu}
                  className="flex size-11 items-center justify-center"
                >
                  <Close className="size-6" />
                </button>
              </div>

              <m.ul
                className="flex flex-col px-6 pt-4"
                variants={{
                  open: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
                  closed: {},
                }}
              >
                {[...links, { href: "#visit", label: t.nav.visit }].map((link, index) => (
                  <m.li
                    key={link.href}
                    variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: 14 } }}
                    transition={{ duration: 0.5 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 border-b border-paper/15 py-4"
                    >
                      <span className="font-display text-sm text-coral tabular-nums">0{index + 1}</span>
                      <span className="display-title text-3xl">{link.label}</span>
                    </a>
                  </m.li>
                ))}
              </m.ul>

              <m.div
                className="mt-auto flex items-center gap-3 p-6 pt-10"
                variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <LanguageSwitch tone="dark" />
                <a
                  href="#visit"
                  onClick={() => setOpen(false)}
                  className="btn btn-light flex-1"
                >
                  {t.nav.cta}
                </a>
              </m.div>
            </m.div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
