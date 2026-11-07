import { collection, fields } from "@keystatic/core";

export const authors = collection({
  entryLayout: "content",
  label: "Authors",
  slugField: "name",
  path: "apps/blog.eembouz.com/src/data/authors/*",
  format: { data: "json" },
  schema: {
    name: fields.slug({ name: { label: "Name" } }),
    portfolio: fields.text({ label: "Portfolio URL" }),
  },
});
