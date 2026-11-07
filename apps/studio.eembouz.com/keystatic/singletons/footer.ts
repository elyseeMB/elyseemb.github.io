import { singleton, fields } from "@keystatic/core";
import { localizedText } from "../shared/locales.ts";

const linkItem = fields.object({
  label: localizedText("Label"),
  href: fields.url({ label: "URL" }),
});

export const footer = singleton({
  label: "Footer",
  path: "apps/eembouz.com/src/data/footer",
  format: { data: "json" },
  schema: {
    networks: fields.array(linkItem, {
      label: "Réseaux",
      itemLabel: (props) => props.fields.label.fields.en.value || "Lien",
    }),
    contacts: fields.array(linkItem, {
      label: "Contacts",
      itemLabel: (props) => props.fields.label.fields.en.value || "Lien",
    }),
  },
});
