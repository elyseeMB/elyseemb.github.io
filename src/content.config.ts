import { glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

const bento = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/data/bento" }),
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
    portfolio: z.string().url(),
  }),
});

export const collections = { bento };
