/**
 * SharePoint Framework (SPFx) Web Part to fetch and display a WordPress RSS feed
 * with filtering by tag, category, or post name pattern.
 */

import * as React from "react";
import { useEffect } from "react";
import { IWordPressPost, IWordPressRssFeedWebPartProps } from "../interfaces";
import { fetchPosts, validateUrl } from "../util";
import FeedRender from "./FeedRender";
import { MESSAGES, Alert } from "./Alert";

const RSSWebPart: React.FC<IWordPressRssFeedWebPartProps> = ({
  feedFilterSettings,
  displaySettings,
  colorSettings,
  url,
}) => {
  const [posts, setPosts] = React.useState<Array<IWordPressPost>>([]);

  const updatePosts: () => void = () => {
    fetchPosts(url, feedFilterSettings)
      .then((posts) => {
        setPosts(posts);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    if (validateUrl(url) && feedFilterSettings) {
      updatePosts();
    }
  }, [
    url,
    feedFilterSettings.filterJoinOperator,
    feedFilterSettings.numPosts,
    feedFilterSettings.pastDays,
    feedFilterSettings.postPattern,
    feedFilterSettings.categoryIds.length,
    feedFilterSettings.tagIds.length,
  ]);

  return url && posts && feedFilterSettings && displaySettings ? (
    <FeedRender posts={posts} displaySettings={displaySettings} colorSettings={colorSettings} />
  ) : (
    <Alert msg={MESSAGES.WARNING.noPostsToDisplay} type={"warning"} />
  );
};

export default RSSWebPart;
