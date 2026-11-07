import { singleton, fields } from "@keystatic/core";

export const settings = singleton({
  label: "Settings",
  path: "apps/blog.eembouz.com/src/data/settings",
  format: { data: "json" },
  schema: {
    siteName: fields.text({ label: "Site Name" }),
  },
});
