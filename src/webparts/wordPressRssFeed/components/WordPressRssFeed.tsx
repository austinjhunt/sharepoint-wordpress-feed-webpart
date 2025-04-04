/**
 * SharePoint Framework (SPFx) Web Part to fetch and display a WordPress RSS feed
 * with filtering by tag, category, or post name pattern.
 */

import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./WordPressRssFeed.module.scss";
import { TextField, PrimaryButton } from "@fluentui/react";
import { validateUrl, fetchPosts, fetchSiteInfo } from "../util";
import { Post, SiteInfo, WordPressFeedSettings } from "../interfaces";
import DEFAULTS from "../defaults";
import FeedSettings from "./FeedSettings";
import FeedPreview from "./FeedPreview";
import { Alert, MESSAGES } from "./Alert";

const defaultSettings = {
  numPosts: DEFAULTS.numPosts,
  pastDays: DEFAULTS.pastDays,
  postPattern: DEFAULTS.postPattern,
  filterJoinOperator: DEFAULTS.filterJoinOperator,
  categoryIds: DEFAULTS.categoryIds,
  tagIds: DEFAULTS.tagIds,
  layoutType: DEFAULTS.layoutType,
} as WordPressFeedSettings;

const RSSWebPart: React.FC = () => {
  const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null); // store basic info
  const [feedSettings, setFeedSettings] = useState<WordPressFeedSettings>(defaultSettings);
  const [posts, setPosts] = useState<Post[]>([]);
  const [failedPostFeedFetch, setFailedPostFeedFetch] = useState<boolean>(false);
  const [url, setUrl] = useState<string>(DEFAULTS.siteUrl);
  const [isValidUrl, setIsValidUrl] = useState<boolean>(false);
  const [failedSiteInfoFetch, setFailedSiteInfoFetch] = useState<boolean>(false);

  const clearFiltersHandler: () => Promise<void> = async () => {
    setFeedSettings(defaultSettings);
  };

  const updateFeedHandler: () => Promise<void> = async () => {
    if (siteInfo !== null) {
      fetchPosts(url, feedSettings)
        .then((posts) => {
          setPosts(posts);
          setFailedPostFeedFetch(false);
        })
        .catch((e) => setFailedPostFeedFetch(true));
    }
  };

  useEffect(() => {
    if (url.trim() === "") {
      setIsValidUrl(false);
    } else {
      setIsValidUrl(validateUrl(url));
    }
  }, [url]);

  return (
    <div>
      <TextField
        className={styles.marginYFormField}
        type="url"
        label="WordPress Site URL"
        value={url}
        onChange={(e, newValue) => setUrl(newValue ? newValue : "")}
      />
      {isValidUrl ? (
        <div className={styles.flexButtonContainer}>
          <PrimaryButton
            text="Fetch site information"
            onClick={(e) => {
              fetchSiteInfo(url)
                .then((info) => {
                  setSiteInfo(info as SiteInfo);
                  setFailedSiteInfoFetch(false);
                })
                .catch((e) => setFailedSiteInfoFetch(true));
            }}
          />
        </div>
      ) : (
        <Alert type={"warning"} msg={MESSAGES.WARNING.provideSiteUrl} />
      )}
      {failedSiteInfoFetch ? (
        <Alert type={"warning"} msg={MESSAGES.WARNING.failedSiteInfoFetch} />
      ) : (
        siteInfo !== null &&
        FeedSettings(feedSettings, setFeedSettings, siteInfo, updateFeedHandler, clearFiltersHandler)
      )}

      {failedPostFeedFetch ? (
        <Alert type={"warning"} msg={MESSAGES.WARNING.failedToFetchFeed} />
      ) : (
        siteInfo !== null && FeedPreview(url, posts, feedSettings.layoutType)
      )}
    </div>
  );
};

export default RSSWebPart;
