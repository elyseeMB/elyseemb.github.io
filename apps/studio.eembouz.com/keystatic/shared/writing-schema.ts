import { fields } from "@keystatic/core";

export function writingSchema() {
  return {
    title: fields.slug({ name: { label: "Title" } }),
    pubDate: fields.date({ label: "Publication Date" }),
    status: fields.select({
      label: "Status",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Online", value: "online" },
      ],
      defaultValue: "draft",
    }),
    thumbnail: fields.image({
      label: "Thumbnail",
      description: "Image used for OG tags",
      directory: "apps/eembouz.com/public",
      publicPath: "/",
    }),
    music: fields.text({
      label: "Music",
      description:
        "YouTube video ID used as background music (e.g. ZjQDpwK755U). Leave empty for no music.",
    }),
    content: fields.mdx({
      label: "Content",
      description: "Main body content of the writing",
    }),
  };
}
