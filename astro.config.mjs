import { defineConfig, passthroughImageService } from "astro/config";
import markdoc from "@astrojs/markdoc";
import sitemap from "@astrojs/sitemap";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "https://elyseemb.github.io/",
  image: {
    service: passthroughImageService(),
  },
  base: "/",
  integrations: [
    markdoc(),
    sitemap({
      i18n: {
        defaultLocale: "fr",
        locales: {
          fr: "fr-CA",
          en: "en-US",
          es: "es-ES",
        },
      },
    }),
    preact(),
  ],
});
