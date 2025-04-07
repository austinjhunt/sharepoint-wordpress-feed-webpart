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

export const defaultColorSettings = {
  mainBackgroundColor: "[theme:themeLighterAlt, default: #faf3f4]", // Very light background
  titleTextColor: "[theme:neutralDark, default: #201f1e]", // Dark text for contrast
  descriptionTextColor: "[theme:neutralPrimary, default: #323130]", // Darker text
  postBackgroundColor: "[theme:neutralLighter, default: #f4f4f4]", // Light background for posts
  postTitleTextColor: "[theme:neutralDark, default: #201f1e]", // Dark post title
  postBodyTextColor: "[theme:neutralPrimaryAlt, default: #3b3a39]", // Darker post body text
  postReadMoreLinkTextColor: "[theme:themePrimary, default: #79242f]", // Distinctive link color
  pageButtonBackgroundColor: "[theme:themePrimary, default: #79242f]", // Primary theme color for button
  pageButtonTextColor: "[theme:white, default: #fefefe]", // Light text on dark button
  pageButtonHoverBackgroundColor: "[theme:themeDark, default: #5b1b24]", // Slightly darker hover
  pageButtonHoverTextColor: "[theme:white, default: #fefefe]", // Light text on hover

  feedReadMoreButtonBackgroundColor: "[theme:themePrimary, default: #79242f]", // Primary theme color for button
  feedReadMoreButtonTextColor: "[theme:white, default: #fefefe]", // Light text on dark button
};
