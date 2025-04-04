import * as React from "react";
import styles from "./WordPressRssFeed.module.scss";

interface WarningProps {
  msg: string;
}

const WARNINGS = {
  noPostsToDisplay: "There are no posts to display currently",
  provideSiteUrl: "Please provide a valid site URL.",
  failedSiteInfoFetch: "Failed to fetch site information. Please try updating your site URL.",
  failedToFetchFeed: "Failed to fetch the RSS feed. Please try updating your site URL.",
};
const Warning: (props: WarningProps) => JSX.Element = (props: WarningProps) => {
  return (
    <div className={styles.warning}>
      <span>{props.msg}</span>
    </div>
  );
};

export { WARNINGS, Warning };
