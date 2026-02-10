export const StatusPost = {
  Draft: 1,
  Public: 2,
  Private: 3,
} as const;

export type IStatusPost = (typeof StatusPost)[keyof typeof StatusPost];

export const StatusPostText = {
  [StatusPost.Draft]: "Draft",
  [StatusPost.Public]: "Public",
  [StatusPost.Private]: "Private",
} as const;
