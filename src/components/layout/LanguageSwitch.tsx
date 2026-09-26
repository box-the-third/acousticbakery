"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

/** Single square toggle that names the other language, as in the reference design. */
export function LanguageSwitch({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { locale, toggleLocale, t } = useLanguage();
  const onDark = tone === "dark";
  const target = locale === "en" ? "ar" : "en";

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={t.nav.language}
      lang={target}
      className={`inline-flex h-10 min-w-12 items-center justify-center border px-3 text-xs font-bold transition-colors duration-300 ${
        onDark
          ? "border-paper/50 text-paper hover:bg-paper hover:text-ink"
          : "border-ink/30 text-ink hover:bg-ink hover:text-paper"
      }`}
    >
      {target === "ar" ? <span className="font-[system-ui,sans-serif] text-sm">العربية</span> : "EN"}
    </button>
  );
}
