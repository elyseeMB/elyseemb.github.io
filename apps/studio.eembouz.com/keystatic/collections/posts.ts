import { collection } from "@keystatic/core";
import { postSchema } from "../shared/post-schema.ts";

export const postFr = collection({
  entryLayout: "content",
  label: "/fr/Post",
  slugField: "title",
  path: "apps/blog.eembouz.com/src/data/blog/fr/*",
  format: { contentField: "content" },
  schema: postSchema(),
});

export const postEn = collection({
  entryLayout: "content",
  label: "/en/Post",
  slugField: "title",
  path: "apps/blog.eembouz.com/src/data/blog/*",
  format: { contentField: "content" },
  schema: postSchema(),
});
