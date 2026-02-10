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
        title: fields.slug({
          name: { label: "Title", description: "The article’s title" },
        }),
        disclaimer: fields.text({
          label: "Disclaimer",
          description:
            "A legal or informational disclaimer related to the article",
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
          })
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
            description: "Categories or tags used to organize the articl",
            label: "Taxonomies",
            itemLabel: (props) => props.value || "Select taxonomy",
          }
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
      },
    }),

    post_en: collection({
      entryLayout: "content",
      label: "/en/Post",
      slugField: "title",
      path: "apps/blog.eembouz.com/src/data/blog/en/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({
          name: { label: "Title", description: "The article’s title" },
        }),
        disclaimer: fields.text({
          label: "Disclaimer",
          description:
            "A legal or informational disclaimer related to the article",
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
            label: "Taxonomies",
            itemLabel: (props) => props.value || "Select taxonomy",
          }
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
