interface IWordPressPostAuthor {
  id: number;
  name: string; // full name
  link: string; // link to author on site
  slug: string;
  avatar_urls:
    | {
        "24": string;
      }
    | undefined;
}

interface IWordPressPostEmbeddedData {
  author: Array<IWordPressPostAuthor>;
  "wp:featuredmedia": Array<IWordPressMediaItem>;
}

interface IWordPressPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  _embedded: IWordPressPostEmbeddedData;
  link: string;
  date: string;
  layoutType?: "grid" | "list"; // Optional layoutType prop
}

interface IPostsLayout {
  posts: Array<IWordPressPost>;
  displaySettings: IDisplaySettings;
}

interface IPostComponent {
  post: IWordPressPost;
  displaySettings: IDisplaySettings;
}

interface ITagOrCategory {
  id: number;
  name: string;
}

interface IDisplaySettings {
  title?: string;
  description?: string;
  readMoreLink: IReadMoreLink;
  layoutType: "list" | "grid";
  showAuthor: boolean;
  showMedia: boolean;
  itemsPerPage: number;
  excerptLength: number;
}

interface IWordPressFeedFilterSettings {
  numPosts: number;
  pastDays: number;
  postPattern: string;
  filterJoinOperator: string;
  tagIds: Array<number>;
  categoryIds: Array<number>;
}

interface IReadMoreLink {
  linkUrl: string;
  linkText: string;
  linkNewTab: boolean;
  include: boolean;
}

interface IWordPressRssFeedWebPartProps {
  feedFilterSettings: IWordPressFeedFilterSettings;
  displaySettings: IDisplaySettings;
  url: string;
}

interface IFeedRenderProps {
  displaySettings: IDisplaySettings;
  posts: Array<IWordPressPost>;
}

// wordpress media items with ?embed=true in the wp:featuredmedia array
interface IWordPressMediaTitle {
  rendered: string;
}

interface IWordPressMediaCaption {
  rendered: string;
}

interface IWordPressMediaSize {
  file: string;
  width: number;
  height: number;
  filesize: number;
  mime_type: string;
  source_url: string;
}

interface IWordPressMediaImageMeta {
  aperture: string;
  credit: string;
  camera: string;
  caption: string;
  created_timestamp: string;
  copyright: string;
  focal_length: string;
  iso: string;
  shutter_speed: string;
  title: string;
  orientation: string;
  keywords: string[];
  resized_images: Record<string, string>;
}

interface IWordPressMediaDetails {
  width: number;
  height: number;
  file: string;
  filesize: number;
  sizes: Record<string, IWordPressMediaSize>;
  image_meta: IWordPressMediaImageMeta;
}

interface IWordPressMediaLink {
  href: string;
  targetHints?: {
    allow: string[];
  };
  embeddable?: boolean;
}

interface IWordPressMediaLinks {
  self: IWordPressMediaLink[];
  collection: IWordPressMediaLink[];
  about: IWordPressMediaLink[];
  author: IWordPressMediaLink[];
  replies: IWordPressMediaLink[];
}

interface IWordPressMediaItem {
  id: number;
  date: string;
  slug: string;
  type: string;
  link: string;
  title: IWordPressMediaTitle;
  author: number;
  featured_media: number;
  caption: IWordPressMediaCaption;
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details: IWordPressMediaDetails;
  source_url: string;
  _links: IWordPressMediaLinks;
}

export {
  IFeedRenderProps,
  IReadMoreLink,
  IWordPressRssFeedWebPartProps,
  IWordPressPost,
  IPostComponent,
  ITagOrCategory,
  IWordPressFeedFilterSettings,
  IWordPressMediaItem,
  IWordPressPostAuthor,
  IWordPressPostEmbeddedData,
  IDisplaySettings,
  IPostsLayout,
};
