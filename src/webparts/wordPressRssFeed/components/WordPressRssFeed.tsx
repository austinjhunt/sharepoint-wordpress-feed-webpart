/**
 * SharePoint Framework (SPFx) Web Part to fetch and display a WordPress RSS feed
 * with filtering by tag, category, or post name pattern.
 */

import * as React from "react";
import { useEffect } from "react";
import { IPost, IReadMoreLink, IWordPressRssFeedWebPartProps } from "../interfaces";
import { fetchPosts, validateUrl } from "../util";
import FeedRender from "./FeedRender";
import { MESSAGES, Alert } from "./Alert";

const RSSWebPart: React.FC<IWordPressRssFeedWebPartProps> = ({
  title,
  description,
  readMoreLink,
  feedSettings,
  url,
}) => {
  const [posts, setPosts] = React.useState<Array<IPost>>([]);

  const updatePosts = () => {
    fetchPosts(url, feedSettings)
      .then((posts) => {
        console.log("posts from api");
        console.log(posts);
        setPosts(posts);
        console.log("updating posts to");
        console.log(posts);
      })
      .catch((e) => {
        console.error("FAILED2");
        console.error(e);
      });
  };

  useEffect(() => {
    console.log(`url: ${url}`);
    console.log("feedSettings: ", feedSettings);
    if (validateUrl(url) && feedSettings) {
      updatePosts();
    }
  }, [url, JSON.stringify(feedSettings)]);

  return url && posts && feedSettings ? (
    <FeedRender
      title={title as string}
      description={description as string}
      readMoreLink={readMoreLink as IReadMoreLink}
      url={url as string}
      posts={posts}
      layoutType={feedSettings.layoutType}
    />
  ) : (
    <Alert msg={MESSAGES.WARNING.noPostsToDisplay} type={"warning"} />
  );
};

export default RSSWebPart;
