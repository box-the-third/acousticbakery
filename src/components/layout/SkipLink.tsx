"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

export function SkipLink() {
  const { t } = useLanguage();
  return (
    <a
      href="#main"
      className="fixed start-4 top-4 z-[100] -translate-y-24 rounded-full bg-ink px-5 py-3 text-sm text-paper transition-transform focus:translate-y-0"
    >
      {t.meta.skip}
    </a>
  );
}
