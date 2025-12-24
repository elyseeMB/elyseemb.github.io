import { glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";
import { ContentType, ContentTypeDesc } from "../config.ts";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/data/blog" }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    contentType: z.nativeEnum(ContentType).default(1),
    isDraft: z.boolean().default(false),
    taxonomies: z.array(reference("taxonomies")).optional(),
    thumbnail: z.string().optional(),
    summary: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    author: reference("authors"),
    relatedPosts: z.array(reference("blog")).optional(),
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

const authors = defineCollection({
  loader: glob({ pattern: "**/[^_]*.json", base: "./src/data/authors" }),
  schema: z.object({
    name: z.string(),
    portfolio: z.string().url(),
  }),
});

const taxonomies = defineCollection({
  loader: glob({ pattern: "**/[^_]*.json", base: "./src/data/taxonomies" }),
  schema: z.object({
    name: z.string(),
  }),
});

const series = defineCollection({
  loader: glob({
    pattern: ["**/__*__.json", "**/*.mdx"],
    base: "./src/data/series",
  }),
  schema: z.object({
    contentType: z.nativeEnum(ContentType).default(2),
    title: z.string(),
    pubDate: z.coerce.date().optional(),
    thumbnail: z.string().optional(),
    summary: z.string(),
    author: reference("authors"),
    relatedPosts: z.array(reference("series")).optional(),
  }),
});

export const collections = { blog, taxonomies, authors, series };
