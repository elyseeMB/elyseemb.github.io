import { getRelativeLocaleUrl } from "astro:i18n";
import EN from "../locales/en.json";
import ZH from "../locales/zh.json";
import { langs } from "../../config.ts";

const translations = new Map<string, Map<string, string>>([
  ["en", new Map(Object.entries(EN))],
  ["zh", new Map(Object.entries(ZH))],
]);

export async function getTranslator(lang: string = "fr") {
  if (lang === "fr") {
    return (s: string) => s;
  }
  if (!translations.has(lang)) {
    throw new Error(`Cannot find translations for ${lang}`);
  }

  return (s: string) => {
    // if (translations.get(lang)?.get(s) === "") {
    //   return s;
    // }
    return translations.get(lang)?.get(s) ?? s;
  };
}

export function getLink(astro: { currentLocale?: string }, path: string) {
  if (path === "/" && astro.currentLocale !== "en") {
    return `/${astro.currentLocale}`;
  }
  return astro.currentLocale
    ? getRelativeLocaleUrl(astro.currentLocale, path)
    : path;
}

export const filterLang =
  (lang: (typeof langs)[number] | "fr" = "fr") =>
  (entry: { id: string }) => {
    if (lang === "fr") {
      return !entry.id.includes("/");
    }
    return entry.id.startsWith(lang);
  };
