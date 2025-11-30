import { getRelativeLocaleUrl } from "astro:i18n";

export const filterLang =
  (lang: string = "fr") =>
  (entry: { id: string }) => {
    if (lang === "fr") {
      return !entry.id.includes("/");
    }
    return entry.id.startsWith(lang);
  };

export function getLink(
  astro: { currentLocale?: string },
  path: string
): string {
  console.log(getRelativeLocaleUrl(astro.currentLocale!, path));
  if (path === "/" && astro.currentLocale !== "fr") {
    return `/${astro.currentLocale}`;
  }

  return astro.currentLocale
    ? getRelativeLocaleUrl(astro.currentLocale, path)
    : path;
}
