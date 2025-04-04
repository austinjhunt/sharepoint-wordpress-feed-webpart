import * as React from "react";
import FeedRender from "./FeedRender";
import { IPost, IReadMoreLink, IWordPressRssFeedWebPartProps } from "../interfaces";
import { fetchPosts } from "../util";
import { Alert } from "./Alert";
import { WARNINGS } from "./Warning";

const DisplayModeRead: React.FC<IWordPressRssFeedWebPartProps> = ({
  feedSettings,
  url,
  title,
  description,
  readMoreLink,
}) => {
  const [posts, setPosts] = React.useState<Array<IPost>>([]);
  React.useEffect(() => {
    if (url && url.trim() !== "" && feedSettings) {
      fetchPosts(url, feedSettings)
        .then((posts) => setPosts(posts))
        .catch((e) => alert(e));
    }
  }, [url, feedSettings]);

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
    <Alert msg={WARNINGS.cannotDisplayFeed} type={"warning"} />
  );
};

export default DisplayModeRead;
