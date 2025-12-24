import { render, type CollectionEntry } from "astro:content";
import type { ItemDisplayed } from "../../config.ts";

type BlogEntry = CollectionEntry<"blog">;
type SeriesEntry = CollectionEntry<"series">;
type Entry = BlogEntry | SeriesEntry;
type EntryArray = Entry[];
type EntryArrayNested = Entry[][];

export function itemNormalizer(
  items: EntryArray
): { year: string; items: ItemDisplayed[] }[];
export function itemNormalizer(
  items: EntryArrayNested
): { year: string; items: ItemDisplayed[] }[];
export function itemNormalizer(
  items: EntryArray | EntryArrayNested
): { year: string; items: ItemDisplayed[] }[] {
  let flatItems: EntryArray = Array.isArray(items[0])
    ? (items as EntryArrayNested).flat()
    : (items as EntryArray);

  function isValidItem(item: any): item is Entry {
    return item && item.id;
  }

  flatItems = flatItems.filter(isValidItem);

  const articles: ItemDisplayed[] = flatItems.map((page) => {
    const [lang, ...slug] = page.id.split("/");
    return {
      params: { lang, slug: slug.join("/") || undefined },
      props: page,
    };
  });

  function groupPostsByYear(posts: ItemDisplayed[]) {
    const postsByYear: Record<string, ItemDisplayed[]> = {};

    for (const post of posts) {
      if (!post.props.data.pubDate) {
        continue;
      }
      const date = new Date(post.props.data.pubDate);
      const year = date.getFullYear().toString();
      if (!postsByYear[year]) {
        postsByYear[year] = [];
      }
      postsByYear[year].push(post);
    }

    for (const year of Object.keys(postsByYear)) {
      postsByYear[year].sort((a, b) => {
        if (!a.props.data.pubDate) return 1;
        if (!b.props.data.pubDate) return -1;

        return (
          new Date(b.props.data.pubDate).getTime() -
          new Date(a.props.data.pubDate).getTime()
        );
      });
    }

    return postsByYear;
  }

  const allPostsByYear = groupPostsByYear(articles);

  const doc = Object.keys(allPostsByYear)
    .sort((a, b) => Number(b) - Number(a))
    .map((year) => ({
      year: year,
      items: allPostsByYear[year],
    }));

  return doc;
}

export async function allDurationForSeries(
  items: CollectionEntry<"series">["data"]["relatedPosts"]
) {
  if (!items) {
    return;
  }
  const durationForSeries = await Promise.all(
    items.map(async (item) => {
      const { remarkPluginFrontmatter } = await render(
        item as CollectionEntry<"series">
      );
      return remarkPluginFrontmatter.stats.minutes;
    })
  );

  const durationSum = durationForSeries.reduce(function (
    accumulator,
    currentValue
  ) {
    return accumulator + currentValue;
  },
  0);

  return durationSum;
}
