import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const writings = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/data/writings" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    status: z.enum(["draft", "online"]).default("draft"),
    thumbnail: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.json", base: "./src/data/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    link: z.string().url(),
    pubDate: z.coerce.date(),
    status: z.enum(["en_cours", "valable"]).default("en_cours"),
  }),
});

const inspirations = defineCollection({
  loader: glob({ pattern: "**/[^_]*.json", base: "./src/data/inspirations" }),
  schema: z.object({
    title: z.string(),
    link: z.string().url(),
  }),
});

// const hobbies = defineCollection({
//   loader: glob({ pattern: "**/[^_]*.json", base: "./src/data/hobbies" }),
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

export const collections = { projects, inspirations, gallery, writings };
