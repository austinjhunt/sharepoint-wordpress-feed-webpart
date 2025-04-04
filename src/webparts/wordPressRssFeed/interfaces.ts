interface IPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  author: {
    name: string;
    url: string;
  };
  link: string;
  mediaUrl: string;
  date: string;
  layoutType?: "grid" | "list"; // Optional layoutType prop
}
interface ITagOrCategory {
  id: number;
  name: string;
}

interface IWordPressFeedSettings {
  numPosts: number;
  pastDays: number;
  postPattern: string;
  filterJoinOperator: string;
  tagIds: Array<number>;
  categoryIds: Array<number>;
  layoutType: "list" | "grid";
}

interface IMediaItem {
  title: {
    rendered: string;
  };
  guid: {
    rendered: string;
  };
  media_details: {
    width: number;
    height: number;
  };
}

interface IReadMoreLink {
  linkUrl: string;
  linkText: string;
  linkNewTab: boolean;
  include: boolean;
}

interface IWordPressRssFeedWebPartProps {
  title?: string;
  description?: string;
  readMoreLink: IReadMoreLink;
  feedSettings: IWordPressFeedSettings;
  url: string;
  // ✅ This line allows dynamic string indexing
  // so we can pass an updateProperty function to
  // our ReactElement for edit mode
  [key: string]: any;
}

interface IFeedRenderProps {
  title: string;
  description: string;
  readMoreLink: IReadMoreLink;
  url: string;
  posts: Array<IPost>;
  layoutType: "grid" | "list";
}

export {
  IFeedRenderProps,
  IReadMoreLink,
  IWordPressRssFeedWebPartProps,
  IPost,
  ITagOrCategory,
  IWordPressFeedSettings,
  IMediaItem,
};
