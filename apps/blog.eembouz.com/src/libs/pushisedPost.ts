import {
  getCollection,
  type CollectionEntry,
  type ContentEntryMap,
  type DataEntryMap,
} from "astro:content";

type AnyEntryMap = ContentEntryMap & DataEntryMap;

export async function getPublishedPosts<C extends keyof AnyEntryMap>(
  collection: C,
  cb: (entry: CollectionEntry<C>) => boolean
) {
  const allPosts = await getCollection(
    collection,
    // @ts-ignore
    collection === "blog" ? (post) => post.data.status === "public" : undefined
  );

  return cb ? allPosts.filter(cb) : allPosts;
}
