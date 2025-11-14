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

const inspirations = defineCollection({
  loader: glob({ pattern: "**/[^_]*.json", base: "./src/data/inspirations" }),
  schema: z.object({
    title: z.string(),
    link: z.string().url(),
  }),
});

// const hoobies = defineCollection({
//   loader: glob({ pattern: "**/[^_]*.json", base: "./src/data/hoobies" }),
//   schema: z.object({
//     name: z.string(),
//     url: z.string(),
//   }),
// });

const gallery = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string(),
    width: z.number(),
    height: z.number(),
    pubDate: z.date(),
  }),
});

export const collections = { projects, inspirations, gallery };
