import * as React from "react";
import styles from "./WordPressRssFeed.module.scss";
import Post from "./Post";
import { Post as PostProps } from "../interfaces";

interface PostsLayoutProps {
  url: string;
  posts: Array<PostProps>;
  layoutType: "grid" | "list";
}

const PostsLayout: React.FC<PostsLayoutProps> = ({ url, posts, layoutType }) => {
  return (
    <div className={layoutType === "grid" ? styles.gridContainer : styles.listContainer}>
      {posts.map((post, index) => (
        <Post
          key={index}
          id={post.id}
          mediaUrl={`${url}/wp-json/wp/v2/media?parent=${post.id}`}
          title={post.title}
          date={post.date}
          link={post.link}
          author={post.author}
          excerpt={post.excerpt}
          layoutType={layoutType}
        />
      ))}
    </div>
  );
};

export default PostsLayout;
