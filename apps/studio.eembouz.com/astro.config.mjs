import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), markdoc(), keystatic(), mdx()],

  server: {
    root: ".apps/studio.eembouz.com",
    port: 5000,
  },
});
