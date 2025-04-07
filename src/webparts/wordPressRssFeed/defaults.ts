import { IWordPressFeedFilterSettings, IReadMoreLink, IDisplaySettings } from "./interfaces";

export const defaultFeedRequestSettings = {
  numPosts: 10,
  pastDays: 30,
  postPattern: "",
  filterJoinOperator: "AND",
  categoryIds: [],
  tagIds: [],
} as IWordPressFeedFilterSettings;

export const defaultDisplaySettings = {
  layoutType: "list",
  showAuthor: false,
  showMedia: true,
  itemsPerPage: 1,
  excerptLength: 200,
  title: "Extra! Extra! Read all about it!",
  description: "Read up on our latest news!",
  readMoreLink: {
    linkText: "Read more!",
    linkUrl: "https://example.com",
    linkNewTab: false,
  } as IReadMoreLink,
} as IDisplaySettings;
