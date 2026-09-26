"use client";

import { AnimatePresence, m } from "framer-motion";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { menu, type MenuCategoryId } from "@/data/menu";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

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
    <section id="menu" className="relative isolate overflow-hidden bg-ink py-24 text-paper sm:py-32">
      <div aria-hidden className="pattern-isotype pointer-events-none absolute inset-0 -z-10 opacity-[0.025]" />
      <div aria-hidden className="pointer-events-none absolute -top-40 end-0 -z-10 size-[36rem] rounded-full bg-mist/15 blur-[140px]" />

      <div className="container-page">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading tone="dark" eyebrow={t.menu.eyebrow} title={t.menu.title} body={t.menu.body} />

          <Reveal delay={0.2}>
            <div
              role="tablist"
              aria-label={t.menu.eyebrow}
              className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto rounded-full border border-paper/15 p-1 sm:w-fit"
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
                    className={`relative flex-1 whitespace-nowrap rounded-full px-5 py-3 text-sm font-medium transition-colors duration-500 sm:flex-none sm:px-7 ${
                      selected ? "text-ink" : "text-paper/70 hover:text-paper"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`absolute inset-0 -z-10 rounded-full bg-paper transition-all duration-500 ${
                        selected ? "scale-100 opacity-100" : "scale-90 opacity-0"
                      }`}
                    />
                    <span className="relative">{t.menu.categories[c.id]}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <div
          role="tabpanel"
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-tab-${active}`}
          className="mt-14 min-h-[34rem] sm:min-h-[28rem]"
        >
          <AnimatePresence mode="wait">
            <m.ul
              key={active}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06 } },
                exit: { opacity: 0, transition: { duration: 0.2 } },
              }}
              className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5"
            >
              {category.items.map((item) => (
                <m.li
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
                  }}
                >
                  <article className="group relative h-full rounded-2xl border border-paper/10 bg-paper/[0.035] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:bg-paper/[0.07] sm:p-7">
                    <div className="flex items-baseline gap-4">
                      <h3 className="font-display text-xl font-light text-paper sm:text-2xl">
                        {item.name[locale]}
                      </h3>
                      <span
                        aria-hidden
                        className="mb-1.5 min-w-6 flex-1 border-b border-dotted border-paper/25 transition-colors duration-500 group-hover:border-gold/50"
                      />
                      <p className="shrink-0 text-base font-medium text-gold tabular-nums">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-stone/70">
                      {item.description[locale]}
                    </p>
                    {item.signature ? (
                      <span className="mt-4 inline-flex items-center gap-2 text-[0.7rem] text-gold/90">
                        <span aria-hidden className="size-1 rounded-full bg-gold" />
                        <span className="eyebrow !text-[0.65rem]">{t.menu.signature}</span>
                      </span>
                    ) : null}
                  </article>
                </m.li>
              ))}
            </m.ul>
          </AnimatePresence>
        </div>

        <Reveal>
          <p className="mt-10 text-center text-xs leading-relaxed text-stone/60">{t.menu.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
