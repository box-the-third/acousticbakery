"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal } from "@/components/motion/Reveal";

/** Mission and vision, set as two ruled columns. */
export function Purpose() {
  const { t } = useLanguage();

  const columns = [
    { label: t.purpose.missionLabel, statement: t.purpose.mission, body: t.purpose.missionBody },
    { label: t.purpose.visionLabel, statement: t.purpose.vision, body: t.purpose.visionBody },
  ];

  return (
    <section id="purpose" aria-labelledby="purpose-title" className="bg-paper py-24 sm:py-32">
      <div className="container-page">
        <Reveal>
          <p id="purpose-title" className="eyebrow text-ink">
            {t.purpose.eyebrow}
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 border-y border-ink/25 md:grid-cols-2">
          {columns.map((column, index) => (
            <Reveal
              key={column.label}
              delay={index * 0.12}
              className={`py-12 sm:py-16 ${
                index === 0 ? "md:border-e md:border-ink/25 md:pe-14" : "border-t border-ink/25 md:border-t-0 md:ps-14"
              }`}
            >
              <p className="flex items-baseline gap-4">
                <span className="display-title text-2xl text-coral">0{index + 1}</span>
                <span className="text-xs font-bold tracking-[0.16em] text-ink uppercase rtl:text-base rtl:tracking-normal">
                  {column.label}
                </span>
              </p>
              <h2 className="display-title mt-8 max-w-lg text-4xl text-ink sm:text-5xl lg:text-[3.6rem]">
                {column.statement}
              </h2>
              <p className="mt-7 max-w-md leading-relaxed text-ink-night/75">{column.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
