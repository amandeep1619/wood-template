"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { CONSENT_COOKIE } from "@/lib/i18n/languages";

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

export default function CookieConsent() {
  const { t, giveConsent, denyConsent, hasConsent } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = readCookie(CONSENT_COOKIE);
    if (consent === null) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!visible || hasConsent !== null) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-[200] animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-dark-wood text-white rounded-xl shadow-2xl p-4 border border-white/10">
        <p className="text-sm text-white/80 leading-relaxed mb-4">
          {t("cookie.message")}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => { giveConsent(); setVisible(false); }}
            className="flex-1 bg-gold text-dark-wood text-sm font-semibold py-2 px-3 rounded-lg hover:bg-gold/90 transition-colors"
          >
            {t("cookie.accept")}
          </button>
          <button
            onClick={() => { denyConsent(); setVisible(false); }}
            className="flex-1 bg-white/10 text-white text-sm font-medium py-2 px-3 rounded-lg hover:bg-white/20 transition-colors"
          >
            {t("cookie.decline")}
          </button>
        </div>
      </div>
    </div>
  );
}
