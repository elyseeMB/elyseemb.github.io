import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/data/projects" }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    description: z.string().optional(),
    thumbnail: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    seo: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        canonicalURL: z.string().url().optional(),
        typeContent: z.string().optional().default("website"),
        tags: z.array(z.string()).optional(),
      })
      .optional(),
  }),
});

export const collections = { projects };
