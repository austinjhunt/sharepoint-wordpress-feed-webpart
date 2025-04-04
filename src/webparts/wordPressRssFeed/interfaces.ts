import { IDropdownOption } from "@fluentui/react";
interface Post {
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

interface TagOrCategory {
  id: number;
  name: string;
}

interface SiteInfo {
  tags: IDropdownOption[];
  categories: IDropdownOption[];
  name: string;
  description: string;
  url: string;
}

interface WordPressFeedSettings {
  numPosts: number;
  pastDays: number;
  postPattern: string;
  filterJoinOperator: string;
  tagIds: Array<number>;
  categoryIds: Array<number>;
  layoutType: "list" | "grid";
}

interface MediaItem {
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
export { Post, TagOrCategory, SiteInfo, WordPressFeedSettings, MediaItem };
