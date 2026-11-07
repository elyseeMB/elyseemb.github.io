import { postFr, postEn } from "./posts.ts";
import { authors } from "./authors.ts";
import { taxonomies } from "./taxonomies.ts";
import { projects } from "./projects.ts";
import { writings, writingsFr } from "./writings.ts";

export const collections = {
  post_fr: postFr,
  post_en: postEn,
  authors,
  taxonomies,
  projects,
  writings,
  writings_fr: writingsFr,
};
