"use client";

import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { LanguageSwitch } from "./LanguageSwitch";
import { asset } from "@/lib/asset";

export function Navbar() {
  const { t, dir } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#story", label: t.nav.story },
    { href: "#menu", label: t.nav.menu },
    { href: "#visit", label: t.nav.visit },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
    const desktop = window.matchMedia("(min-width: 1024px)");
    const close = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", close);
    return () => desktop.removeEventListener("change", close);
  }, []);

  // The drawer always slides in from the reading-end edge.
  const offscreen = dir === "rtl" ? "-100%" : "100%";

  return (
    <>
      <header
        style={{ animationDelay: "0.1s" }}
        className="animate-drop fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <nav
          aria-label="Primary"
          className={`mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 rounded-full ps-4 pe-2 transition-all duration-500 sm:ps-7 ${
            scrolled
              ? "border border-ink/10 bg-paper/80 shadow-[0_10px_40px_-20px_rgba(47,56,57,0.35)] backdrop-blur-xl"
              : "border border-transparent bg-transparent"
          }`}
        >
          <a href="#top" className="shrink-0" aria-label="Acoustic Bakery & Patisserie">
            <Image
              src={asset("/brand/logo-slate.webp")}
              alt="Acoustic Bakery & Patisserie"
              width={900}
              height={86}
              priority
              className="h-auto w-36 sm:w-52"
            />
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative py-2 text-sm text-ink/80 transition-colors hover:text-ink"
                >
                  {link.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-center scale-x-0 bg-ink transition-transform duration-500 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <LanguageSwitch />
            <a
              href="#visit"
              className="hidden h-11 items-center rounded-full bg-ink px-6 text-sm font-medium text-paper transition-colors duration-300 hover:bg-ink-night sm:inline-flex"
            >
              {t.nav.cta}
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t.nav.openMenu}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 lg:hidden"
            >
              <span className="flex w-5 flex-col items-end gap-[5px] rtl:items-start">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-3/4 bg-current" />
                <span className="h-px w-full bg-current" />
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
            className="fixed inset-0 z-[60] lg:hidden"
            initial="closed"
            animate="open"
            exit="closed"
          >
            <m.button
              type="button"
              tabIndex={-1}
              aria-label={t.nav.closeMenu}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-ink-night/40 backdrop-blur-sm"
              variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
              transition={{ duration: 0.4 }}
            />
            <m.div
              className="absolute inset-y-0 end-0 flex w-full max-w-sm flex-col overflow-y-auto bg-ink text-paper"
              variants={{ open: { x: "0%" }, closed: { x: offscreen } }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                aria-hidden
                className="pattern-isotype pointer-events-none absolute inset-0 opacity-[0.04]"
              />
              <div className="relative flex h-20 shrink-0 items-center justify-between px-6">
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
                  className="flex size-11 items-center justify-center rounded-full transition-colors hover:bg-paper/10"
                >
                  <span className="relative block size-5">
                    <span className="absolute top-1/2 left-0 h-px w-full rotate-45 bg-current" />
                    <span className="absolute top-1/2 left-0 h-px w-full -rotate-45 bg-current" />
                  </span>
                </button>
              </div>

              <m.ul
                className="relative mt-8 flex flex-col px-6"
                variants={{
                  open: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
                  closed: {},
                }}
              >
                {links.map((link, index) => (
                  <m.li
                    key={link.href}
                    variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: 16 } }}
                    transition={{ duration: 0.6 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 border-b border-paper/10 py-5"
                    >
                      <span className="text-xs text-gold tabular-nums">0{index + 1}</span>
                      <span className="font-display text-3xl font-light">{link.label}</span>
                    </a>
                  </m.li>
                ))}
              </m.ul>

              <m.div
                className="relative mt-auto flex flex-col gap-5 p-6 pt-10"
                variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                <LanguageSwitch tone="dark" />
                <a
                  href="#visit"
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center justify-center rounded-full bg-paper text-sm font-medium text-ink"
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
