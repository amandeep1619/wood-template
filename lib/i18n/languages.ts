export interface Language {
  code: string;
  label: string;
  nativeLabel: string;
  flag: string;
  rtl?: boolean;
}

export const LANGUAGES: Language[] = [
  { code: "en", label: "English", nativeLabel: "English", flag: "🇬🇧" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी", flag: "🇮🇳" },
  { code: "es", label: "Spanish", nativeLabel: "Español", flag: "🇪🇸" },
  { code: "fr", label: "French", nativeLabel: "Français", flag: "🇫🇷" },
];

export const DEFAULT_LOCALE = "en";
export const SUPPORTED_LOCALES = LANGUAGES.map((l) => l.code);
export const COOKIE_NAME = "tirath_lang";
export const CONSENT_COOKIE = "tirath_cookie_consent";
