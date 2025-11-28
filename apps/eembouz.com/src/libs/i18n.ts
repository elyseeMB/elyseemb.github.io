import { getRelativeLocaleUrl } from "astro:i18n";
import EN from "../locales/en.json";

const translations = new Map<string, Map<string, string>>([
  ["en", new Map(Object.entries(EN))],
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
  (lang: string = "en") =>
  (entry: { id: string }) => {
    if (lang === "en") {
      return !entry.id.includes("/");
    }
    return entry.id.startsWith(lang);
  };
