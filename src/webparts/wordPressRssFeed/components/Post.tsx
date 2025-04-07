import * as React from "react";
import styles from "./WordPressRssFeed.module.scss";
import { IWordPressPostAuthor, IPostComponent, IWordPressMediaItem } from "../interfaces";
import { Link } from "@fluentui/react";

const Post: React.FC<IPostComponent> = ({ post, displaySettings }) => {
  const [media, setMedia] = React.useState<IWordPressMediaItem | undefined>(undefined);
  const [author, setAuthor] = React.useState<IWordPressPostAuthor | undefined>(undefined);
  console.log(post);
  React.useEffect(() => {
    if (post && post._embedded && post._embedded["wp:featuredmedia"] && post._embedded["wp:featuredmedia"].length > 0) {
      setMedia(post._embedded["wp:featuredmedia"][0]);
    }
  }, [displaySettings.showMedia, post._embedded["wp:featuredmedia"]?.length, post.id]);

  React.useEffect(() => {
    if (post && post._embedded && post._embedded.author && post._embedded.author.length > 0) {
      setAuthor(post._embedded.author[0]);
    }
  }, [displaySettings.showAuthor, post?._embedded?.author.length]);

  const authorHasAllData: () => boolean = () => {
    return (
      author !== undefined &&
      author.name !== "" &&
      author.link !== "" &&
      author.avatar_urls !== undefined &&
      author.avatar_urls["24"] !== undefined &&
      author.avatar_urls["24"] !== ""
    );
  };

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const extractText = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent?.slice(0, displaySettings.excerptLength) + "..." || "";
  };

  const mediaHasAllData: () => boolean = () => {
    return (
      media !== undefined &&
      media.id !== undefined &&
      media.date !== undefined &&
      media.alt_text !== undefined &&
      media.source_url !== undefined &&
      media.caption !== undefined
    );
  };

  return (
    <article className={displaySettings.layoutType === "grid" ? styles.gridPost : styles.listPost}>
      {displaySettings.showMedia && media && mediaHasAllData() && (
        <img
          id={media.id.toString()}
          className={styles.thumbnail}
          src={media.source_url}
          alt={media.title.rendered}
          width={media.media_details.width}
          height={media.media_details.height}
        />
      )}
      <div className={styles.content}>
        {post.title && <h2 className={styles.title}>{post.title.rendered}</h2>}
        {displaySettings.showAuthor && author && authorHasAllData() && (
          <div className={styles.postAuthorContainer}>
            <img src={author.avatar_urls?.["24"]} alt={`avatar for ${author.name}`} />
            <p>
              Published by{" "}
              <Link href={author.link} target={"_blank"}>
                {author.name}
              </Link>
            </p>
          </div>
        )}
        <p className={styles.date}>{formattedDate}</p>
        {displaySettings.excerptLength !== 0 && <p className={styles.excerpt}>{extractText(post.excerpt.rendered)}</p>}
        <a href={post.link} target="_blank" rel="noopener noreferrer" className={styles.readMore}>
          Read More →
        </a>
      </div>
    </article>
  );
};

export default Post;
