import { defineConfig, passthroughImageService } from "astro/config";
import sitemap from "@astrojs/sitemap";
import preact from "@astrojs/preact";
import markdoc from "@astrojs/markdoc";
import mdx from "@astrojs/mdx";
import { langs } from "./config.ts";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  prefetch: false,
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },

  site: "https://eembouz.com/",
  i18n: {
    locales: [...langs, "fr"],
    defaultLocale: "fr",
    fallback: {
      en: "en",
    },
  },

  image: {
    service: passthroughImageService(),
  },

  base: "/",

  integrations: [
    mdx(),
    markdoc(),
    sitemap({
      filter: (page) =>
        page !== "https://eembouz.com/404/" &&
        page !== "https://eembouz.com/505/",
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

  vite: {
    plugins: [tailwindcss()],
  },
});
