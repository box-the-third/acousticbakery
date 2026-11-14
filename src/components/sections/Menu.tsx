"use client";

import { AnimatePresence, m } from "framer-motion";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { menu } from "@/data/menu";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DeliveryApps } from "@/components/ui/DeliveryApps";

/**
 * Read-only café menu. The menu's pages become tabs: a ruled vertical list on
 * desktop, a scrolling row on mobile. Each page shows its sections as ruled price lists.
 */
export function Menu() {
  const { t, locale } = useLanguage();
  const [active, setActive] = useState(menu[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const group = menu.find((g) => g.id === active) ?? menu[0];

  const formatPrice = (price: number) =>
    locale === "ar" ? `${price} ${t.menu.currency}` : `${t.menu.currency} ${price}`;

  // Arrow keys move between tabs: up/down for the vertical list, left/right
  // (mirrored for right-to-left reading) for the mobile row.
  const onTabKeyDown = (event: KeyboardEvent, index: number) => {
    const forward = ["ArrowDown", locale === "ar" ? "ArrowLeft" : "ArrowRight"];
    const backward = ["ArrowUp", locale === "ar" ? "ArrowRight" : "ArrowLeft"];
    let next = index;
    if (forward.includes(event.key)) next = (index + 1) % menu.length;
    else if (backward.includes(event.key)) next = (index - 1 + menu.length) % menu.length;
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

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.75fr] lg:gap-16">
          <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
            <div
              role="tablist"
              aria-label={t.menu.eyebrow}
              className="no-scrollbar -mx-5 flex gap-7 overflow-x-auto border-b border-ink/25 px-5 sm:mx-0 sm:px-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-b-0"
            >
              {menu.map((g, index) => {
                const selected = g.id === active;
                return (
                  <button
                    key={g.id}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    role="tab"
                    type="button"
                    id={`${baseId}-tab-${g.id}`}
                    aria-selected={selected}
                    aria-controls={`${baseId}-panel`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(g.id)}
                    onKeyDown={(event) => onTabKeyDown(event, index)}
                    className={`relative flex shrink-0 items-baseline gap-4 pb-4 text-start transition-colors duration-300 lg:border-b lg:border-ink/25 lg:py-5 lg:ps-5 ${
                      selected ? "text-ink" : "text-ink/45 hover:text-ink/80"
                    }`}
                  >
                    <span className="hidden text-xs font-bold tabular-nums lg:inline">0{index + 1}</span>
                    <span className="display-title text-2xl whitespace-nowrap lg:text-3xl lg:whitespace-normal">
                      {g.title[locale]}
                    </span>
                    {/* Active marker: underline on mobile, a bar on the reading-start edge on desktop */}
                    <span
                      aria-hidden
                      className={`absolute inset-x-0 -bottom-px h-[3px] bg-ink transition-transform duration-500 lg:inset-x-auto lg:inset-y-0 lg:start-0 lg:bottom-auto lg:h-auto lg:w-[3px] ${
                        selected ? "scale-100" : "scale-0"
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
            className="min-h-[28rem]"
          >
            <AnimatePresence mode="wait">
              <m.div
                key={active}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.04 } },
                  exit: { opacity: 0, transition: { duration: 0.2 } },
                }}
                className="space-y-12"
              >
                {group.sections.map((section) => (
                  <section key={section.id} aria-labelledby={`${baseId}-${section.id}`}>
                    <m.h3
                      id={`${baseId}-${section.id}`}
                      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }}
                      className="border-b border-ink/25 pb-3 text-xs font-bold tracking-[0.16em] text-ink uppercase rtl:text-base rtl:tracking-normal"
                    >
                      {section.title[locale]}
                    </m.h3>
                    {section.note ? (
                      <m.p
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }}
                        className="mt-4 max-w-xl text-sm leading-relaxed text-ink/65"
                      >
                        {section.note[locale]}
                      </m.p>
                    ) : null}
                    <ul className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
                      {section.items.map((item) => (
                        <m.li
                          key={item.id}
                          variants={{
                            hidden: { opacity: 0, y: 12 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                          }}
                          className="border-b border-ink/15 py-5"
                        >
                          <div className="flex items-baseline justify-between gap-6">
                            <h4 className="font-display text-xl font-semibold tracking-[-0.02em] text-ink rtl:tracking-normal">
                              {item.name[locale]}
                            </h4>
                            <p className="shrink-0 text-sm font-bold tracking-wide text-ink tabular-nums">
                              {formatPrice(item.price)}
                            </p>
                          </div>
                          {item.description ? (
                            <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/65">
                              {item.description[locale]}
                            </p>
                          ) : null}
                        </m.li>
                      ))}
                    </ul>
                  </section>
                ))}
              </m.div>
            </AnimatePresence>

            <p className="mt-10 text-xs leading-relaxed text-ink/55">{t.menu.note}</p>

            {/* Order the menu through the delivery apps */}
            <Reveal className="mt-14 border-t border-ink/25 pt-10">
              <p className="eyebrow text-ink">{t.delivery.eyebrow}</p>
              <h3 className="display-title mt-4 text-3xl text-ink sm:text-4xl">{t.delivery.title}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/65">{t.delivery.body}</p>
              <div className="mt-6">
                <DeliveryApps />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
