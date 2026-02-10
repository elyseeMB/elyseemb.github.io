import { config, fields, collection, singleton } from "@keystatic/core";
import { block, wrapper, inline } from "@keystatic/core/content-components";
import { StatusPost, StatusPostText } from "./enum/status.ts";

export default config({
  storage: {
    kind: "github",
    repo: "elyseeMB/elyseemb.github.io",
  },

  collections: {
    post_fr: collection({
      entryLayout: "content",
      label: "/fr/Post",
      slugField: "title",
      path: "apps/blog.eembouz.com/src/data/blog/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        disclaimer: fields.text({ label: "Disclaimer", multiline: true }),
        summary: fields.text({ label: "Summary", multiline: true }),
        status: fields.select({
          label: "Role",
          description: "The person's role at the company",
          options: Object.entries(StatusPost).map(([label, _]) => ({
            label: label,
            value: label.toLowerCase(),
          })),
          defaultValue: StatusPostText["1"].toLowerCase(),
        }),
        thumbnail: fields.image({
          label: "Thumbnail",
          directory: "apps/blog.eembouz.com/public",
          publicPath: "/",
        }),
        pubDate: fields.date({ label: "Publication Date" }),
        author: fields.relationship({
          label: "Author",
          collection: "authors",
          validation: { isRequired: true },
        }),
        taxonomies: fields.array(
          fields.relationship({ label: "Taxonomy", collection: "taxonomies" }),
          {
            label: "Taxonomies",
            itemLabel: (props) => props.value || "Select taxonomy",
          }
        ),

        content: fields.mdx({
          label: "Content",
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
      },
    }),

    post_en: collection({
      entryLayout: "content",
      label: "/en/Post",
      slugField: "title",
      path: "apps/blog.eembouz.com/src/data/blog/en/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        disclaimer: fields.text({ label: "Disclaimer", multiline: true }),
        summary: fields.text({ label: "Summary", multiline: true }),
        status: fields.select({
          label: "Role",
          description: "The person's role at the company",
          options: Object.entries(StatusPost).map(([label, _]) => ({
            label: label,
            value: label.toLowerCase(),
          })),
          defaultValue: StatusPostText["1"].toLowerCase(),
        }),
        thumbnail: fields.image({
          label: "Thumbnail",
          directory: "apps/blog.eembouz.com/public",
          publicPath: "/",
        }),
        pubDate: fields.date({ label: "Publication Date" }),
        author: fields.relationship({
          label: "Author",
          collection: "authors",
          validation: { isRequired: true },
        }),
        taxonomies: fields.array(
          fields.relationship({ label: "Taxonomy", collection: "taxonomies" }),
          {
            label: "Taxonomies",
            itemLabel: (props) => props.value || "Select taxonomy",
          }
        ),
        content: fields.mdx({
          label: "Content",
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
      },
    }),

    authors: collection({
      entryLayout: "content",
      label: "Authors",
      slugField: "name",
      path: "apps/blog.eembouz.com/src/data/authors/*",
      format: { data: "json" },
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        portfolio: fields.text({ label: "Portfolio URL" }),
      },
    }),

    taxonomies: collection({
      entryLayout: "content",
      label: "Taxonomies",
      slugField: "name",
      path: "apps/blog.eembouz.com/src/data/taxonomies/*",
      format: { data: "json" },
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
      },
    }),
  },

  singletons: {
    settings: singleton({
      label: "Settings",
      path: "apps/blog.eembouz.com/src/data/settings",
      format: { data: "json" },
      schema: {
        siteName: fields.text({ label: "Site Name" }),
      },
    }),
  },
});
