import type { CollectionEntry } from "astro:content";

export type ItemDisplayed = {
  params: {
    lang: string;
    slug: string | undefined;
  };
  props: CollectionEntry<"blog"> | CollectionEntry<"series">;
};

export type Collection = {
  year: string;
  items: ItemDisplayed[];
};

export type OptionsCollection = {
  showBadge?: boolean;
  description?: boolean;
  showYear?: boolean;
};

export enum ContentType {
  POST = 1,
  SERIE = 2,
}

export const ContentTypeDesc: Record<ContentType, string> = {
  [ContentType.POST]: "Post",
  [ContentType.SERIE]: "Serie",
} as const;

export const langs = ["en"] as const;
