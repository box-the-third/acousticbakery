"use client";

import { AnimatePresence, m } from "framer-motion";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { menu, type MenuCategoryId } from "@/data/menu";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Read-only menu: underlined category tabs over a two-column ruled price list. */
export function Menu() {
  const { t, locale } = useLanguage();
  const [active, setActive] = useState<MenuCategoryId>("bakery");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const category = menu.find((c) => c.id === active) ?? menu[0];

  const formatPrice = (price: number) =>
    locale === "ar" ? `${price} ${t.menu.currency}` : `${t.menu.currency} ${price}`;

  // Arrow-key navigation between tabs, mirrored for right-to-left reading.
  const onTabKeyDown = (event: KeyboardEvent, index: number) => {
    const forward = locale === "ar" ? "ArrowLeft" : "ArrowRight";
    const backward = locale === "ar" ? "ArrowRight" : "ArrowLeft";
    let next = index;
    if (event.key === forward) next = (index + 1) % menu.length;
    else if (event.key === backward) next = (index - 1 + menu.length) % menu.length;
    else return;
    event.preventDefault();
    setActive(menu[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="menu" className="bg-paper py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={t.menu.eyebrow}
            title={t.menu.title}
            titleClassName="max-w-xl text-5xl sm:text-6xl lg:text-[5.4rem]"
          />
          <Reveal delay={0.15}>
            <p className="max-w-sm leading-relaxed text-ink/70">{t.menu.body}</p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div
            role="tablist"
            aria-label={t.menu.eyebrow}
            className="no-scrollbar mt-14 flex gap-8 overflow-x-auto border-b border-ink/25 sm:gap-12"
          >
            {menu.map((c, index) => {
              const selected = c.id === active;
              return (
                <button
                  key={c.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  role="tab"
                  type="button"
                  id={`${baseId}-tab-${c.id}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(c.id)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                  className={`relative shrink-0 pb-4 transition-colors duration-300 ${
                    selected ? "text-ink" : "text-ink/45 hover:text-ink/80"
                  }`}
                >
                  <span className="display-title text-3xl sm:text-4xl">{t.menu.categories[c.id]}</span>
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 -bottom-px h-[3px] bg-ink transition-transform duration-500 ${
                      selected ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          role="tabpanel"
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-tab-${active}`}
          className="min-h-[30rem] sm:min-h-[24rem]"
        >
          <AnimatePresence mode="wait">
            <m.ul
              key={active}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05 } },
                exit: { opacity: 0, transition: { duration: 0.2 } },
              }}
              className="grid grid-cols-1 gap-x-16 md:grid-cols-2"
            >
              {category.items.map((item) => (
                <m.li
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                  }}
                  className="group border-b border-ink/20 py-7"
                >
                  <div className="flex items-baseline justify-between gap-6">
                    <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink rtl:tracking-normal">
                      {item.name[locale]}
                    </h3>
                    <p className="shrink-0 text-sm font-bold tracking-wide text-ink tabular-nums">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/65">
                    {item.description[locale]}
                  </p>
                  {item.signature ? (
                    <span className="mt-3 inline-flex items-center gap-2 text-[0.65rem] font-bold tracking-[0.16em] text-ink uppercase rtl:text-xs rtl:tracking-normal">
                      <span aria-hidden className="size-1.5 bg-gold" />
                      {t.menu.signature}
                    </span>
                  ) : null}
                </m.li>
              ))}
            </m.ul>
          </AnimatePresence>
        </div>

        <p className="mt-10 text-xs leading-relaxed text-ink/55">{t.menu.note}</p>
      </div>
    </section>
  );
}
