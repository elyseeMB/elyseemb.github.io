import { defineConfig, passthroughImageService } from "astro/config";
import markdoc from "@astrojs/markdoc";
import sitemap from "@astrojs/sitemap";
import preact from "@astrojs/preact";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  site: "https://elyseemb.github.io/",
  image: {
    service: passthroughImageService(),
  },
  base: "/",
  integrations: [
    mdx(),
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
