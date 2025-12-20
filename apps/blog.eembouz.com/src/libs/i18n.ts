import type { CollectionEntry } from "astro:content";
import EN from "../locales/en.json";
import { getRelativeLocaleUrl } from "astro:i18n";

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

export const filterLang =
  (lang: string = "fr") =>
  (entry: { id: string }) => {
    if (lang === "fr") {
      return !entry.id.includes("/");
    }
    return entry.id.startsWith(lang);
  };

export const filterSeries =
  (lang: string = "fr") =>
  (entry: CollectionEntry<"series">) => {
    if (!entry.filePath?.endsWith(".json")) {
      return false;
    }

    if (lang === "fr") {
      return !entry.id.startsWith("en/");
    }
    return entry.id.startsWith(lang + "/");
  };

export function getLink(
  astro: { currentLocale?: string },
  path: string
): string {
  if (path === "/" && astro.currentLocale !== "fr") {
    return `/${astro.currentLocale}`;
  }

  return astro.currentLocale
    ? getRelativeLocaleUrl(astro.currentLocale, path)
    : path;
}
