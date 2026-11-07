import { fields } from "@keystatic/core";

export const locales = ["en", "fr", "zh"] as const;

export function localizedText(label: string, multiline = false) {
  return fields.object(
    Object.fromEntries(
      locales.map((locale) => [
        locale,
        fields.text({
          label: `${label} (${locale.toUpperCase()})`,
          multiline,
        }),
      ]),
    ) as Record<(typeof locales)[number], ReturnType<typeof fields.text>>,
  );
}
