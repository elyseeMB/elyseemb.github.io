import {
  useTranslations as createTranslations,
  getLangFromUrl as createLangFromUrl,
  getLink as createLink,
  filterByLocale as createFilter,
  stripLocalePrefix as createStripLocalePrefix,
} from "@portfolio/i18n";
import { ui, defaultLang, languages } from "./ui";

export const langs = Object.keys(languages) as (keyof typeof languages)[];

export function useTranslations(lang: string | undefined) {
  return createTranslations(lang as keyof typeof ui, ui, defaultLang);
}

export function getLangFromUrl(url: URL) {
  return createLangFromUrl(url, ui, defaultLang);
}

export function getLink(locale: string | undefined, path: string) {
  return createLink(locale, path, defaultLang);
}

export function filterByLocale(lang: string) {
  return createFilter(lang as keyof typeof ui, langs, defaultLang);
}

export function stripLocalePrefix(path: string) {
  return createStripLocalePrefix(path, langs, defaultLang);
}

export type TranslationKey = keyof (typeof ui)[typeof defaultLang];
