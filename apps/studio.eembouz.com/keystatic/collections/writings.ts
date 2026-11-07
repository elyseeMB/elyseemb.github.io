import { collection } from "@keystatic/core";
import { writingSchema } from "../shared/writing-schema.ts";

export const writings = collection({
  entryLayout: "content",
  label: "/en/Writing",
  slugField: "title",
  path: "apps/eembouz.com/src/data/writings/*",
  format: { contentField: "content" },
  schema: writingSchema(),
});

export const writingsFr = collection({
  entryLayout: "content",
  label: "/fr/Writing",
  slugField: "title",
  path: "apps/eembouz.com/src/data/writings/fr/*",
  format: { contentField: "content" },
  schema: writingSchema(),
});
