"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { COOKIE_NAME, CONSENT_COOKIE, DEFAULT_LOCALE, SUPPORTED_LOCALES } from "./languages";
import type { TranslationKeys } from "./translations/en";
import en from "./translations/en";

type Locale = "en" | "hi" | "es" | "fr";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  hasConsent: boolean | null;
  giveConsent: () => void;
  denyConsent: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const translationCache: Partial<Record<Locale, TranslationKeys>> = { en };

async function loadTranslation(locale: Locale): Promise<TranslationKeys> {
  if (translationCache[locale]) return translationCache[locale]!;
  try {
    const mod = await import(`./translations/${locale}`);
    translationCache[locale] = mod.default;
    return mod.default;
  } catch {
    return en;
  }
}

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current && typeof current === "object") {
      current = (current as Record<string, unknown>)[part];
    } else {
      return path;
    }
  }
  return typeof current === "string" ? current : path;
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

function writeCookie(name: string, value: string, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

export function LanguageProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
  initialConsent = null,
}: {
  children: ReactNode;
  initialLocale?: string;
  initialConsent?: boolean | null;
}) {
  const safeLocale = (SUPPORTED_LOCALES.includes(initialLocale) ? initialLocale : DEFAULT_LOCALE) as Locale;
  const [locale, setLocaleState] = useState<Locale>(safeLocale);
  const [translations, setTranslations] = useState<TranslationKeys>(en);
  const [hasConsent, setHasConsent] = useState<boolean | null>(initialConsent);

  useEffect(() => {
    loadTranslation(locale).then(setTranslations);
  }, [locale]);

  const setLocale = useCallback(
    async (newLocale: Locale) => {
      const t = await loadTranslation(newLocale);
      setTranslations(t);
      setLocaleState(newLocale);
      if (hasConsent) {
        writeCookie(COOKIE_NAME, newLocale);
      }
    },
    [hasConsent]
  );

  const giveConsent = useCallback(() => {
    setHasConsent(true);
    writeCookie(CONSENT_COOKIE, "true", 365);
    writeCookie(COOKIE_NAME, locale, 365);
  }, [locale]);

  const denyConsent = useCallback(() => {
    setHasConsent(false);
    writeCookie(CONSENT_COOKIE, "false", 365);
    deleteCookie(COOKIE_NAME);
  }, []);

  const t = useCallback(
    (key: string): string => {
      const val = getNestedValue(translations as unknown as Record<string, unknown>, key);
      if (val === key && locale !== "en") {
        return getNestedValue(en as unknown as Record<string, unknown>, key);
      }
      return val;
    },
    [translations, locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, hasConsent, giveConsent, denyConsent }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
