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
  output: "static",

  image: {
    service: passthroughImageService(),
  },

  markdown: {
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },

  i18n: {
    defaultLocale: "en",
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

  redirects: {
    "/articles/isolation-par-contrats-rendre-l-infrastructure-independante-du-metier/":
      "/articles/isolation-through-contracts-making-infrastructure-independent-of-the-business-domain/",
  },
});
