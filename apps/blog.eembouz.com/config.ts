export enum ContentType {
  POST = 1,
  SERIE = 2,
}

export const ContentTypeDesc: Record<ContentType, string> = {
  [ContentType.POST]: "Post",
  [ContentType.SERIE]: "Serie",
} as const;

export const langs = ["en"] as const;
