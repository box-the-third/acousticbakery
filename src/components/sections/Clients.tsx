"use client";

import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chevron, Close } from "@/components/ui/Icons";
import { asset } from "@/lib/asset";
import { GALLERY_PHOTOS, type Photo } from "@/data/images";

const PHOTOS = GALLERY_PHOTOS;

type Indexed = { photo: Photo; index: number };

/**
 * Splits photos into columns of near-equal height: each photo goes to the
 * currently shortest column, keeping the original order within a column.
 */
function balance(count: number): Indexed[][] {
  const columns: Indexed[][] = Array.from({ length: count }, () => []);
  const heights = new Array(count).fill(0);
  PHOTOS.forEach((photo, index) => {
    const shortest = heights.indexOf(Math.min(...heights));
    columns[shortest].push({ photo, index });
    heights[shortest] += photo.height / photo.width;
  });
  return columns;
}

const mobileColumns = balance(2);
const desktopColumns = balance(4);

function GalleryColumn({
  column,
  locale,
  onOpen,
}: {
  column: Indexed[];
  locale: "en" | "ar";
  onOpen: (index: number) => void;
}) {
  return (
    <ul className="flex flex-col gap-2 lg:gap-3">
      {column.map(({ photo, index }, position) => {
        const last = position === column.length - 1;
        return (
          <li key={photo.src} className={last ? "relative min-h-40 flex-1" : ""}>
            <button
              type="button"
              onClick={() => onOpen(index)}
              className={`group relative block w-full overflow-hidden bg-shell ${last ? "h-full" : ""}`}
              aria-label={photo.alt[locale]}
            >
              <Image
                src={asset(photo.src)}
                alt={photo.alt[locale]}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 1024px) 25vw, 50vw"
                className={`w-full transition-transform duration-700 group-hover:scale-[1.05] ${
                  last ? "h-full min-h-40 object-cover" : "h-auto"
                }`}
              />
              <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/20" />
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/** Who we serve, as a ruled grid of client types, plus a photo gallery with a lightbox. */
export function Clients() {
  const { t, dir, locale } = useLanguage();
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (delta: number) => setOpen((current) => (current === null ? null : (current + delta + PHOTOS.length) % PHOTOS.length)),
    [],
  );

  // Keyboard support for the lightbox, with arrows mirrored in RTL.
  useEffect(() => {
    if (open === null) return;
    const forward = dir === "rtl" ? "ArrowLeft" : "ArrowRight";
    const backward = dir === "rtl" ? "ArrowRight" : "ArrowLeft";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === forward) step(1);
      if (event.key === backward) step(-1);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, dir, close, step]);

  return (
    <section id="clients" className="bg-paper py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={t.clients.eyebrow}
            title={t.clients.title}
            titleClassName="max-w-2xl text-5xl sm:text-6xl lg:text-[5.4rem]"
          />
          <Reveal delay={0.15}>
            <p className="max-w-sm leading-relaxed text-ink/70">{t.clients.body}</p>
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-1 border-t border-s border-ink/25 sm:grid-cols-2 lg:grid-cols-3">
          {t.clients.groups.map((group, index) => (
            <li key={group.title} className="border-e border-b border-ink/25">
              <Reveal delay={(index % 3) * 0.08} className="h-full p-7">
                <span className="display-title text-xl text-ink/60">0{index + 1}</span>
                <h3 className="display-title mt-4 text-3xl text-ink">{group.title}</h3>
                <p className="mt-2 text-sm text-ink/65">{group.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <h3 className="eyebrow mt-20 text-ink">{t.clients.gallery}</h3>
        </Reveal>
        {/* Balanced masonry: photos keep their natural shape, and the last photo
            in each column stretches so every column ends on one straight line. */}
        <div className="mt-8 grid grid-cols-2 gap-2 lg:hidden">
          {mobileColumns.map((column, c) => (
            <GalleryColumn key={c} column={column} locale={locale} onOpen={setOpen} />
          ))}
        </div>
        <div className="mt-8 hidden grid-cols-4 gap-3 lg:grid">
          {desktopColumns.map((column, c) => (
            <GalleryColumn key={c} column={column} locale={locale} onOpen={setOpen} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null ? (
          <m.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={PHOTOS[open].alt[locale]}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 p-4 sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          >
            <m.figure
              key={open}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="relative flex h-full max-h-[85vh] w-full max-w-4xl flex-col"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative flex-1">
                <Image
                  src={asset(PHOTOS[open].src)}
                  alt={PHOTOS[open].alt[locale]}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="mt-4 flex items-center justify-between gap-4 border-t border-cream/20 pt-4 text-sm text-cream/80">
                <span>{PHOTOS[open].alt[locale]}</span>
                <span className="tabular-nums">
                  {open + 1} / {PHOTOS.length}
                </span>
              </figcaption>
            </m.figure>

            <button
              type="button"
              autoFocus
              onClick={close}
              aria-label={t.clients.close}
              className="absolute end-4 top-4 flex size-11 items-center justify-center border border-cream/40 text-cream hover:bg-cream hover:text-ink"
            >
              <Close />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                step(-1);
              }}
              aria-label={t.clients.previous}
              className="absolute start-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center border border-cream/40 text-cream hover:bg-cream hover:text-ink sm:start-6"
            >
              <Chevron className="size-5 rotate-180" />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                step(1);
              }}
              aria-label={t.clients.next}
              className="absolute end-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center border border-cream/40 text-cream hover:bg-cream hover:text-ink sm:end-6"
            >
              <Chevron />
            </button>
          </m.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
