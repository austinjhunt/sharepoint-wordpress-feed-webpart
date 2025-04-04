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
        setPosts(posts);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    if (validateUrl(url) && feedSettings) {
      updatePosts();
    }
  }, [
    url,
    feedSettings.filterJoinOperator,
    feedSettings.numPosts,
    feedSettings.pastDays,
    feedSettings.postPattern,
    feedSettings.categoryIds.length,
    feedSettings.tagIds.length,
  ]);

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
