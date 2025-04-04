import * as React from "react";
import { IReadMoreLink } from "../interfaces";
import { PrimaryButton } from "@fluentui/react";
import styles from "./WordPressRssFeed.module.scss";
const ReadMoreLink: React.FC<IReadMoreLink> = ({ linkText, linkUrl, linkNewTab }) => {
  return (
    <div className={styles.flexBoxJustifyEnd}>
      <PrimaryButton target={linkNewTab ? "_target" : ""} primary={false} text={linkText} href={linkUrl} />
    </div>
  );
};

export default ReadMoreLink;
