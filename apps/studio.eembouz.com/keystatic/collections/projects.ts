import { collection, fields } from "@keystatic/core";
import { localizedText } from "../shared/locales.ts";

export const projects = collection({
  entryLayout: "form",
  label: "Projects",
  slugField: "title",
  path: "apps/eembouz.com/src/data/projects/*",
  format: { data: "json" },
  schema: {
    title: fields.slug({ name: { label: "Title" } }),
    description: localizedText("Description", true),
    link: fields.url({ label: "URL" }),
    pubDate: fields.date({ label: "Publication Date" }),
    status: fields.select({
      label: "Status",
      options: [
        { label: "En cours", value: "en_cours" },
        { label: "Valable", value: "valable" },
      ],
      defaultValue: "en_cours",
    }),
  },
});
