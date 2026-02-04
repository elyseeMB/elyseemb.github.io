import { config, fields, collection, singleton } from "@keystatic/core";
import { block, wrapper, inline } from "@keystatic/core/content-components";

export default config({
  storage: {
    kind: "github",
    repo: "elyseeMB/elyseemb.github.io",
  },

  collections: {
    // --- COLLECTION BLOG FR ---
    post_fr: collection({
      label: "Post_fr",
      slugField: "title",
      path: "apps/blog.eembouz.com/src/data/blog/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        isDraft: fields.checkbox({ label: "Draft", defaultValue: false }),
        thumbnail: fields.image({
          label: "Thumbnail",
          directory: "apps/blog.eembouz.com/public/images/posts",
          publicPath: "/images/posts/",
        }),
        summary: fields.text({ label: "Summary", multiline: true }),
        pubDate: fields.date({ label: "Publication Date" }),
        author: fields.relationship({
          label: "Author",
          collection: "authors",
          validation: { isRequired: true },
        }),
        taxonomies: fields.array(
          fields.relationship({
            label: "Taxonomy",
            collection: "taxonomies",
          }),
          {
            label: "Taxonomies",
            itemLabel: (props) => props.value || "Select taxonomy",
          }
        ),
        content: fields.mdx({
          label: "Content",
          options: {
            image: {
              directory: "apps/blog.eembouz.com/public/images/posts",
              publicPath: "/images/posts/",
            },
          },
          components: {
            blockquote: wrapper({ label: "Blockquote", schema: {} }),
            hr: block({ label: "Horizontal Rule", schema: {} }),
            em: inline({ label: "Italic", schema: {} }),
            strong: inline({ label: "Bold", schema: {} }),
            // AJOUT DE WIDTH/HEIGHT ICI
            img: block({
              label: "Image",
              schema: {
                src: fields.text({ label: "Source" }),
                alt: fields.text({ label: "Alt Text" }),
                width: fields.text({ label: "Width" }),
                height: fields.text({ label: "Height" }),
              },
            }),
            em: inline({ label: "Italic", schema: {} }),
            // AJOUT DE WIDTH/HEIGHT ICI AUSSI
            iframe: block({
              label: "Iframe",
              schema: {
                src: fields.text({ label: "Src" }),
                width: fields.text({ label: "Width" }),
                height: fields.text({ label: "Height" }),
                title: fields.text({ label: "Title" }),
                loading: fields.text({ label: "Loading (lazy/eager)" }),
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

    // --- COLLECTION BLOG EN ---
    post_en: collection({
      label: "Post_en",
      slugField: "title",
      path: "apps/blog.eembouz.com/src/data/blog/en/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        isDraft: fields.checkbox({ label: "Draft", defaultValue: false }),
        thumbnail: fields.image({
          label: "Thumbnail",
          directory: "apps/blog.eembouz.com/public/images/posts",
          publicPath: "/images/posts/",
        }),
        summary: fields.text({ label: "Summary", multiline: true }),
        pubDate: fields.date({ label: "Publication Date" }),
        author: fields.relationship({
          label: "Author",
          collection: "authors",
          validation: { isRequired: true },
        }),
        taxonomies: fields.array(
          fields.relationship({
            label: "Taxonomy",
            collection: "taxonomies",
          }),
          {
            label: "Taxonomies",
            itemLabel: (props) => props.value || "Select taxonomy",
          }
        ),
        content: fields.mdx({
          label: "Content",
          options: {
            image: {
              directory: "apps/blog.eembouz.com/public/images/posts",
              publicPath: "/images/posts/",
            },
          },
          components: {
            blockquote: wrapper({ label: "Blockquote", schema: {} }),
            hr: block({ label: "Horizontal Rule", schema: {} }),
            img: block({
              label: "Image",
              schema: {
                src: fields.text({ label: "Source" }),
                alt: fields.text({ label: "Alt Text" }),
                width: fields.text({ label: "Width" }),
                height: fields.text({ label: "Height" }),
              },
            }),
            em: inline({ label: "Italic", schema: {} }),
            iframe: block({
              label: "Iframe",
              schema: {
                src: fields.text({ label: "Src" }),
                width: fields.text({ label: "Width" }),
                height: fields.text({ label: "Height" }),
              },
            }),
            div: wrapper({
              label: "Div Container",
              schema: {
                className: fields.text({ label: "Class Name" }),
              },
            }),
          },
        }),
      },
    }),

    authors: collection({
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
