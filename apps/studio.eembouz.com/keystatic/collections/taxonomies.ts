import { collection, fields } from "@keystatic/core";

export const taxonomies = collection({
  entryLayout: "content",
  label: "Taxonomies",
  slugField: "name",
  path: "apps/blog.eembouz.com/src/data/taxonomies/*",
  format: { data: "json" },
  schema: {
    name: fields.slug({ name: { label: "Name" } }),
  },
});
