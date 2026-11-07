import { config } from "@keystatic/core";
import { collections } from "./keystatic/collections/index.ts";
import { singletons } from "./keystatic/singletons/index.ts";

export default config({
  storage: {
    kind: "github",
    repo: "elyseeMB/elyseemb.github.io",
  },

  collections,
  singletons,
});
