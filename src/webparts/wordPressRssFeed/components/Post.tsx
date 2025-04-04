import * as React from "react";
import styles from "./WordPressRssFeed.module.scss";
import { MediaItem, Post as PostProps } from "../interfaces";

const Post: React.FC<PostProps> = ({ id, mediaUrl, title, date, link, author, excerpt, layoutType }) => {
  const [media, setMedia] = React.useState<MediaItem | null>(null);

  // image not included in posts json response; need to fetch media for each post
  const getMediaData: () => Promise<MediaItem | null> = async () => {
    const response = await fetch(mediaUrl);
    const data = await response.json();
    if (data.length > 0) {
      return {
        title: data[0].title,
        guid: data[0].guid,
        media_details: data[0].media_details,
      };
    }
    return null;
  };
  React.useEffect(() => {
    if (mediaUrl) {
      getMediaData()
        .then((m) => setMedia(m))
        .catch((e) => {
          // no media
        });
    }
  }, [mediaUrl]);
  // Extract author details from the post
  const authorName = author.name;
  const authorLink = author.url;
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const extractText = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent?.slice(0, 200) + "..." || "";
  };

  return (
    <article className={layoutType === "grid" ? styles.gridPost : styles.listPost}>
      {media && (
        <img
          className={styles.thumbnail}
          src={media.guid.rendered}
          alt={media.title.rendered}
          width={media.media_details.width}
          height={media.media_details.height}
        />
      )}
      <div className={styles.content}>
        <h2 className={styles.title}>{title.rendered}</h2>
        <div className="meta">
          <p>
            Published on {formattedDate} by <a href={authorLink}>{authorName}</a>
          </p>
        </div>
        <p className={styles.date}>{formattedDate}</p>
        <p className={styles.excerpt}>{extractText(excerpt.rendered)}</p>
        <a href={link} target="_blank" rel="noopener noreferrer" className={styles.readMore}>
          Read More →
        </a>
      </div>
    </article>
  );
};

export default Post;
