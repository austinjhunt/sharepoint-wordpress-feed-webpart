import * as React from "react";
import { IFeedRenderProps } from "../interfaces";
import { Alert, MESSAGES } from "./Alert";
import PostsLayout from "./PostsLayout";
import styles from "./WordPressRssFeed.module.scss";
import { readMoreLinkNotEmpty } from "../util";
import ReadMoreLink from "./ReadMoreLink";

const FeedRender: React.FC<IFeedRenderProps> = ({ title, description, readMoreLink, url, posts, layoutType }) => {
  return (
    <div>
      {title.trim() !== "" && <h1 className={styles.feedTitle}>{title}</h1>}
      {description.trim() !== "" && <p className={styles.feedDescription}>{description}</p>}
      {!posts || posts.length === 0 ? (
        <Alert type={"warning"} msg={MESSAGES.WARNING.noPostsToDisplay} />
      ) : (
        <PostsLayout url={url} posts={posts} layoutType={layoutType} />
      )}
      {readMoreLinkNotEmpty(readMoreLink) && <ReadMoreLink {...readMoreLink} />}
    </div>
  );
};

export default FeedRender;
