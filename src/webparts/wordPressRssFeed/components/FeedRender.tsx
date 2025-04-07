import * as React from "react";
import { IFeedRenderProps } from "../interfaces";
import { Alert, MESSAGES } from "./Alert";
import PostsLayout from "./PostsLayout";
import styles from "./WordPressRssFeed.module.scss";
import { readMoreLinkNotEmpty } from "../util";
import ReadMoreLink from "./ReadMoreLink";

const FeedRender: React.FC<IFeedRenderProps> = ({ posts, displaySettings }) => {
  return (
    <div>
      {displaySettings?.title?.trim() !== "" && <h1 className={styles.feedTitle}>{displaySettings.title}</h1>}
      {displaySettings.description?.trim() !== "" && (
        <p className={styles.feedDescription}>{displaySettings.description}</p>
      )}
      {!posts || posts.length === 0 ? (
        <Alert type={"warning"} msg={MESSAGES.WARNING.noPostsToDisplay} />
      ) : (
        <PostsLayout posts={posts} displaySettings={displaySettings} />
      )}
      {displaySettings.readMoreLink.include && readMoreLinkNotEmpty(displaySettings.readMoreLink) && (
        <ReadMoreLink {...displaySettings.readMoreLink} />
      )}
    </div>
  );
};

export default FeedRender;
