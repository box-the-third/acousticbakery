"use client";

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
            <span
              aria-hidden
              className={`absolute inset-0 -z-10 rounded-full transition-all duration-500 ${
                onDark ? "bg-paper" : "bg-ink"
              } ${active ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}
            />
            <span className={option.value === "ar" ? "font-[family-name:var(--font-plex-arabic)]" : ""}>
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
