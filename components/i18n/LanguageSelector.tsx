"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { LANGUAGES } from "@/lib/i18n/languages";
import type { Language } from "@/lib/i18n/languages";

type Locale = "en" | "hi" | "es" | "fr";

interface LanguageSelectorProps {
  className?: string;
  invert?: boolean;
}

export default function LanguageSelector({ className = "", invert = false }: LanguageSelectorProps) {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const textBase = invert ? "text-dark-wood" : "text-white";
  const btnHover = invert ? "hover:bg-dark-wood/5" : "hover:bg-white/10";
  const dropdownBg = "bg-dark-wood border border-white/10";

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 text-sm font-medium px-2.5 py-1.5 rounded-lg transition-colors ${textBase} ${btnHover}`}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="hidden sm:inline">{current.nativeLabel}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          className={`absolute right-0 top-full mt-2 w-44 rounded-xl shadow-xl z-50 overflow-hidden ${dropdownBg}`}
        >
          {LANGUAGES.map((lang: Language) => (
            <button
              key={lang.code}
              role="option"
              aria-selected={lang.code === locale}
              onClick={() => { setLocale(lang.code as Locale); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left
                ${lang.code === locale
                  ? "bg-white/10 text-gold font-semibold"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
            >
              <span className="text-base">{lang.flag}</span>
              <span>{lang.nativeLabel}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
