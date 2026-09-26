"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DIRECTION, dictionaries, type Dictionary, type Locale } from "./dictionary";

const STORAGE_KEY = "acoustic-locale";
const SWITCH_MS = 220;

type LanguageContextValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: Dictionary;
  setLocale: (next: Locale) => void;
  toggleLocale: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLocale(): Locale | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "en" || value === "ar" ? value : null;
  } catch {
    return null;
  }
}

function applyToDocument(locale: Locale) {
  const root = document.documentElement;
  root.lang = locale;
  root.dir = DIRECTION[locale];
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [ready, setReady] = useState(false);

  // Restore the saved choice, or follow the browser language on a first visit.
  useEffect(() => {
    const stored = readStoredLocale();
    const preferred: Locale =
      stored ?? (navigator.language?.toLowerCase().startsWith("ar") ? "ar" : "en");
    setLocaleState(preferred);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    applyToDocument(locale);
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* storage can be unavailable in private mode */
    }
    // The inline boot script hides the page for returning Arabic visitors; reveal it now.
    window.requestAnimationFrame(() =>
      document.documentElement.classList.remove("is-switching-locale", "is-booting-locale"),
    );
  }, [locale, ready]);

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      const root = document.documentElement;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        setLocaleState(next);
        return;
      }
      // Soft cross-fade so the layout flip never feels abrupt.
      root.classList.add("is-switching-locale");
      window.setTimeout(() => setLocaleState(next), SWITCH_MS);
    },
    [locale],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      dir: DIRECTION[locale],
      t: dictionaries[locale],
      setLocale,
      toggleLocale: () => setLocale(locale === "en" ? "ar" : "en"),
    }),
    [locale, setLocale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return context;
}
