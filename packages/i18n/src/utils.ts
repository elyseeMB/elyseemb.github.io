import { getRelativeLocaleUrl } from "astro:i18n";

export type Dictionary = Record<string, string>;
export type UI<L extends string> = Record<L, Dictionary>;

export function useTranslations<
  U extends Record<string, Record<string, string>>,
  const D extends keyof U & string,
>(lang: keyof U | undefined, ui: U, defaultLang: D) {
  const dict: Dictionary = (lang && ui[lang]) || ui[defaultLang];

  return function t(key: keyof U[D]) {
    const k = key as string;
    return dict[k] ?? (ui[defaultLang] as Dictionary)[k] ?? k;
  };
}

export function getLangFromUrl<U extends Record<string, unknown>>(
  url: URL,
  ui: U,
  defaultLang: keyof U & string,
): string {
  const [, lang] = url.pathname.split("/");
  return lang && lang in ui ? lang : defaultLang;
}

export function getLink<L extends string>(
  locale: L | undefined,
  path: string,
  defaultLang: L,
): string {
  if (!locale || locale === defaultLang) return path;
  return getRelativeLocaleUrl(locale, path);
}

export function stripLocalePrefix<L extends string>(
  path: string,
  locales: readonly L[],
  defaultLocale: L,
): string {
  const hadSlash = path.startsWith("/");
  const clean = hadSlash ? path.slice(1) : path;
  const first = clean.split("/")[0];
  if (first && first !== defaultLocale && locales.includes(first as L)) {
    const stripped = clean.slice(first.length + 1);
    if (!stripped) return hadSlash ? "/" : path;
    return hadSlash ? `/${stripped}` : stripped;
  }
  return path;
}

export function filterByLocale<L extends string>(
  locale: L,
  locales: readonly L[],
  defaultLocale: L,
) {
  return (entry: { id: string }) => {
    if (locale === defaultLocale) return !entry.id.includes("/");
    return locales.includes(locale) && entry.id.startsWith(locale + "/");
  };
}
