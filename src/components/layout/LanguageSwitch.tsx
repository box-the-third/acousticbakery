"use client";

import { m } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Locale } from "@/i18n/dictionary";

const OPTIONS: { value: Locale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "ar", label: "عربي" },
];

export function LanguageSwitch({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { locale, setLocale, t } = useLanguage();
  const onDark = tone === "dark";

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className={`relative flex w-fit items-center rounded-full border p-1 ${
        onDark ? "border-paper/25" : "border-ink/15 bg-paper/60"
      }`}
    >
      {OPTIONS.map((option) => {
        const active = option.value === locale;
        return (
          <button
            key={option.value}
            type="button"
            lang={option.value}
            aria-pressed={active}
            onClick={() => setLocale(option.value)}
            className={`relative z-10 min-h-9 min-w-11 rounded-full px-3 text-xs font-medium transition-colors duration-300 ${
              active
                ? onDark
                  ? "text-ink"
                  : "text-paper"
                : onDark
                  ? "text-paper/75 hover:text-paper"
                  : "text-ink/70 hover:text-ink"
            }`}
          >
            {active ? (
              <m.span
                aria-hidden
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className={`absolute inset-0 -z-10 rounded-full ${onDark ? "bg-paper" : "bg-ink"}`}
              />
            ) : null}
            <span className={option.value === "ar" ? "font-[family-name:var(--font-plex-arabic)]" : ""}>
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
