import { config, fields, collection, singleton } from "@keystatic/core";
import { block, wrapper } from "@keystatic/core/content-components";

export default config({
  storage: {
    kind: "github",
    repo: "elyseeMB/elyseemb.github.io",
  },

  collections: {
    blog: collection({
      label: "Blog",
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

        seo: fields.object(
          {
            title: fields.text({ label: "SEO Title" }),
            description: fields.text({
              label: "SEO Description",
              multiline: true,
            }),
            image: fields.image({
              label: "SEO Image",
              directory: "apps/blog.eembouz.com/public/images/seo",
              publicPath: "/images/seo/",
            }),
            canonicalURL: fields.text({ label: "Canonical URL" }),
          },
          { label: "SEO Settings", description: "Config pour le référencement" }
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
            blockquote: wrapper({
              label: "Blockquote",
              schema: {},
            }),

            img: block({
              label: "Image",
              schema: {
                src: fields.text({ label: "Source" }),
                alt: fields.text({ label: "Alt Text" }),
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
      schema: {},
    }),
  },
});
