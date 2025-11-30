import { defineConfig, passthroughImageService } from "astro/config";
import markdoc from "@astrojs/markdoc";
import sitemap from "@astrojs/sitemap";
import preact from "@astrojs/preact";
import mdx from "@astrojs/mdx";
import { remarkReadingTime } from "./src/modules/remark-reading-time.mjs";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  prefetch: false,
  trailingSlash: "ignore",
  site: "https://blog.eembouz.com/",
  build: {
    format: "file",
  },

  image: {
    service: passthroughImageService(),
  },

  markdown: {
    remarkPlugins: [remarkReadingTime],
  },

  i18n: {
    defaultLocale: "fr",
    locales: ["en", "fr"],
  },
  base: "/",

  integrations: [
    mdx(),
    markdoc(),
    sitemap({
      filter: (page) =>
        page !== "https://blog.eembouz.com/404/" &&
        page !== "https://blog.eembouz.com/505/",
    }),
    preact(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
