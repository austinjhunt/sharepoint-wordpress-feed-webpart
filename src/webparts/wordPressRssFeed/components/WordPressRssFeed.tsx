/**
 * SharePoint Framework (SPFx) Web Part to fetch and display a WordPress RSS feed
 * with filtering by tag, category, or post name pattern.
 */

import * as React from "react";
import { DisplayMode } from "@microsoft/sp-core-library";
import { IWordPressRssFeedWebPartProps } from "../interfaces";
import DisplayModeEdit from "./DisplayModeEdit";
import DisplayModeRead from "./DisplayModeRead";

const RSSWebPart: React.FC<IWordPressRssFeedWebPartProps> = ({
  displayMode,
  title,
  description,
  readMoreLink,
  siteInfo,
  feedSettings,
  url,
  updateProperty,
}) => {
  if (displayMode === DisplayMode.Edit) {
    return DisplayModeEdit({
      siteInfo,
      feedSettings,
      url,
      updateProperty,
      title,
      description,
      readMoreLink,
    });
  } else {
    return DisplayModeRead({
      url,
      title,
      description,
      readMoreLink,
      feedSettings,
    });
  }
};

export default RSSWebPart;
