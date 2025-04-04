import * as React from "react";
import { Post as PostProps } from "../interfaces";
import { Alert, MESSAGES } from "./Alert";
import PostsLayout from "./PostsLayout";

const FeedPreview: (url: string, posts: Array<PostProps>, layoutType: "grid" | "list") => JSX.Element = (
  url,
  posts,
  layoutType,
) => {
  return (
    <div>
      <h2>Feed Preview</h2>
      {!posts || posts.length === 0 ? (
        <Alert type={"warning"} msg={MESSAGES.WARNING.noPostsToDisplay} />
      ) : (
        <PostsLayout url={url} posts={posts} layoutType={layoutType} />
      )}
    </div>
  );
};

export default FeedPreview;
