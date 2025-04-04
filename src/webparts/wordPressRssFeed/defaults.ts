import { IWordPressFeedSettings, IReadMoreLink } from "./interfaces";
export const DEFAULTS = {
  pastDays: 60,
  filterJoinOperator: "AND",
  numPosts: 10,
  postPattern: "",
  siteUrl: "",
  siteInfo: undefined,
  tagIds: [],
  categoryIds: [],
  layoutType: "list",
  title: "Extra! Extra! Read all about it!",
  description: "Read up on our latest news!",
  readMoreLink: {
    linkText: "Read more!",
    linkUrl: "https://example.com",
    linkNewTab: false,
  } as IReadMoreLink,
};

export const defaultSettings = {
  numPosts: DEFAULTS.numPosts,
  pastDays: DEFAULTS.pastDays,
  postPattern: DEFAULTS.postPattern,
  filterJoinOperator: DEFAULTS.filterJoinOperator,
  categoryIds: DEFAULTS.categoryIds,
  tagIds: DEFAULTS.tagIds,
  layoutType: DEFAULTS.layoutType,
} as IWordPressFeedSettings;

export default DEFAULTS;
