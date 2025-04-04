import * as React from "react";
import { IReadMoreLink } from "../interfaces";
import { Link } from "@fluentui/react";
import styles from "./WordPressRssFeed.module.scss";
const ReadMoreLink: React.FC<IReadMoreLink> = ({ linkText, linkUrl, linkNewTab }) => {
  return (
    <div className={styles.flexBoxJustifyEnd}>
      <Link target={linkNewTab ? "_target" : ""} primary={false} text={linkText} href={linkUrl}>
        {linkText}
      </Link>
    </div>
  );
};

export default ReadMoreLink;
