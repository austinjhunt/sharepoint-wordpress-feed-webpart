import * as React from "react";
import { IReadMoreLink } from "../interfaces";
import { PrimaryButton } from "@fluentui/react";
import styles from "./WordPressRssFeed.module.scss";
import { extractDefaultColor } from "../util";
const ReadMoreLink: React.FC<IReadMoreLink> = ({ linkText, linkUrl, linkNewTab, colorSettings }) => {
  return (
    <div className={styles.flexBoxJustifyEnd}>
      <PrimaryButton
        style={{
          backgroundColor: extractDefaultColor(colorSettings.feedReadMoreButtonBackgroundColor),
          color: extractDefaultColor(colorSettings.feedReadMoreButtonTextColor),
        }}
        target={linkNewTab ? "_blank" : ""}
        primary={false}
        text={linkText}
        href={linkUrl}
      >
        {linkText}
      </PrimaryButton>
    </div>
  );
};

export default ReadMoreLink;
