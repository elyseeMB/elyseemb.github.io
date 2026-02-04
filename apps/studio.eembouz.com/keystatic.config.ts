import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "github",
    repo: "elyseeMB/elyseemb.github.io",
  },

  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "apps/blog.eembouz.com/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        content: fields.mdx({
          label: "Content",
          options: {
            image: {
              directory: "src/assets/images/posts",
              publicPath: "../../assets/images/posts/",
            },
          },
        }),
      },
    }),
  },
});
