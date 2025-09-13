import { defineConfig, passthroughImageService } from "astro/config";
import markdoc from "@astrojs/markdoc";
import sitemap from "@astrojs/sitemap";
import preact from "@astrojs/preact";
import mdx from "@astrojs/mdx";
import { remarkReadingTime } from "./src/modules/remark-reading-time.mjs";

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  site: "https://blog.eembouz.com/",
  image: {
    service: passthroughImageService(),
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  base: "/",
  integrations: [
    mdx(),
    markdoc(),
    sitemap({
      filter: (page) =>
        page !== "https://blog.eembouz.com/404/" &&
        page !== "https://blog.eembouz.com/505/",

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
