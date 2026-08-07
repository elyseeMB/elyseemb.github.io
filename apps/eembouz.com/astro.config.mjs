import { defineConfig, passthroughImageService } from "astro/config";
import sitemap from "@astrojs/sitemap";
import preact from "@astrojs/preact";
import markdoc from "@astrojs/markdoc";
import mdx from "@astrojs/mdx";
import cloudflare from "@astrojs/cloudflare";
import { langs } from "./config.ts";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  prefetch: false,
  trailingSlash: "ignore",
  output: "static",

  site: "https://eembouz.com/",
  i18n: {
    locales: [...langs, "fr"],
    defaultLocale: "fr",
    fallback: {
      zh: "en",
    },
  },

  image: {
    service: passthroughImageService(),
  },

  base: "/",

  adapter: cloudflare(),

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
          zh: "zh-CN",
        },
      },
    }),
    preact(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
