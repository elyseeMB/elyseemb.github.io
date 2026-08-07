import { defineMiddleware } from "astro:middleware";
import { getRelativeLocaleUrl } from "astro:i18n";
import { defaultLang, languages } from "./i18n/ui";

const locales = Object.keys(languages);

export const onRequest = defineMiddleware((context, next) => {
  const [, firstSegment] = context.url.pathname.split("/");

  if (
    locales.includes(firstSegment) ||
    firstSegment === defaultLang ||
    firstSegment === "robots.txt"
  ) {
    return next();
  }

  const preferred = context.preferredLocale;
  if (preferred && preferred !== defaultLang && locales.includes(preferred)) {
    return context.redirect(
      getRelativeLocaleUrl(preferred, context.url.pathname),
    );
  }

  return next();
});
