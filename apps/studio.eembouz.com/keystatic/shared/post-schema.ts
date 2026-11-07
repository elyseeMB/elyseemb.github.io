import { fields } from "@keystatic/core";
import { block, wrapper, inline } from "@keystatic/core/content-components";
import { StatusPost, StatusPostText } from "../../enum/status.ts";

export function postSchema() {
  return {
    title: fields.slug({
      name: { label: "Title", description: "The article’s title" },
    }),
    disclaimer: fields.text({
      label: "Disclaimer",
      description: "A legal or informational disclaimer related to the article",
      multiline: true,
    }),
    summary: fields.text({
      label: "Summary",
      description: "A short summary of the article’s content",
      multiline: true,
    }),
    status: fields.select({
      label: "Status",
      description: "The current status of the article",
      options: Object.entries(StatusPost).map(([label, _]) => ({
        label: label,
        value: label.toLowerCase(),
      })),
      defaultValue: StatusPostText["1"].toLowerCase(),
    }),
    references: fields.array(
      fields.url({
        label: "References",
        description: "Reference associated with the article",
      }),
      {
        itemLabel: (props) => props.value || "Select reference",
        label: "References",
        description: "Reference associated with the article",
      },
    ),
    thumbnail: fields.image({
      label: "Thumbnail",
      description: "Main image used as the article thumbnail or preview",
      directory: "apps/blog.eembouz.com/public",
      publicPath: "/",
    }),
    pubDate: fields.date({
      label: "Publication Date",
      description: "The date the article is published",
    }),
    author: fields.relationship({
      label: "Author",
      description: "The author responsible for this article",
      collection: "authors",
      validation: { isRequired: true },
    }),
    taxonomies: fields.array(
      fields.relationship({
        label: "Taxonomy",
        description: "Category or tag associated with the article",
        collection: "taxonomies",
      }),
      {
        description: "Categories or tags used to organize the article",
        label: "Taxonomies",
        itemLabel: (props) => props.value || "Select taxonomy",
      },
    ),
    content: fields.mdx({
      label: "Content",
      description: "Main body content of the article",
      options: {
        image: {
          directory: "apps/blog.eembouz.com/public",
          publicPath: "/",
        },
      },
      components: {
        blockquote: wrapper({ label: "Blockquote", schema: {} }),
        hr: wrapper({ label: "Horizontal Rule", schema: {} }),
        em: inline({ label: "Italic", schema: {} }),
        strong: inline({ label: "Bold", schema: {} }),
        img: block({
          label: "Image",
          schema: {
            src: fields.text({ label: "Source" }),
            alt: fields.text({ label: "Alt Text" }),
            width: fields.text({ label: "Width" }),
            height: fields.text({ label: "Height" }),
          },
        }),
        iframe: block({
          label: "Iframe",
          schema: {
            src: fields.text({ label: "Src" }),
            width: fields.text({ label: "Width" }),
            height: fields.text({ label: "Height" }),
            title: fields.text({ label: "Title" }),
            loading: fields.text({ label: "Loading" }),
            style: fields.text({ label: "Style CSS" }),
          },
        }),
        div: wrapper({
          label: "Div Container",
          schema: {
            class: fields.text({ label: "Class" }),
            className: fields.text({ label: "Class Name" }),
          },
        }),
      },
    }),
  };
}
