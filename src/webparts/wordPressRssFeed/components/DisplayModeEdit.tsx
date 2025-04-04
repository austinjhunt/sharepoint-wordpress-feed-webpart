import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./WordPressRssFeed.module.scss";
import { TextField, PrimaryButton, Checkbox } from "@fluentui/react";
import { validateUrl, fetchPosts, fetchSiteInfo, readMoreLinkNotEmpty } from "../util";
import { IWordPressRssFeedWebPartProps, IPost, ISiteInfo, IWordPressFeedSettings, IReadMoreLink } from "../interfaces";
import { defaultSettings, DEFAULTS } from "../defaults";
import FeedSettingsForm from "./FeedSettingsForm";
import FeedRender from "./FeedRender";
import { Alert, MESSAGES } from "./Alert";
import ReadMoreLink from "./ReadMoreLink";

const DisplayModeEdit: React.FC<IWordPressRssFeedWebPartProps> = ({
  title,
  description,
  readMoreLink,
  siteInfo,
  feedSettings,
  url,
  updateProperty,
}) => {
  // local interactive states corresponding to database values passed in as args.
  // only update database values when a save button is clicked by user.
  // use updateProperty[key] = value for that. Otherwise use setState
  const [siteInfoState, setSiteInfoState] = useState<ISiteInfo | undefined>(siteInfo as ISiteInfo);
  const [feedSettingsState, setFeedSettingsState] = useState<IWordPressFeedSettings>(feedSettings);
  const [urlState, setUrlState] = useState<string>(url as string);
  const [titleState, setTitleState] = useState<string>(title as string);
  const [descriptionState, setDescriptionState] = useState<string>(description as string);
  const [readMoreLinkState, setReadMoreLinkState] = useState<IReadMoreLink>(readMoreLink as IReadMoreLink);
  const [saveSettingsResponse, setSaveSettingsResponse] = useState<string>("");
  const [posts, setPosts] = useState<IPost[]>([]);
  const [failedPostFeedFetch, setFailedPostFeedFetch] = useState<boolean>(false);
  const [isValidUrl, setIsValidUrl] = useState<boolean>(false);

  const [failedSiteInfoFetch, setFailedSiteInfoFetch] = useState<boolean>(false);

  const clearSettingsHandler: () => Promise<void> = async () => {
    setFeedSettingsState(defaultSettings);
    setUrlState(DEFAULTS.siteUrl);
    setTitleState("");
    setDescriptionState("");
    setReadMoreLinkState({ linkText: "", linkUrl: "", linkNewTab: false });
    setFailedSiteInfoFetch(false);
    setFailedPostFeedFetch(false);
    setSiteInfoState(DEFAULTS.siteInfo);
    setPosts([]);
  };

  const saveSettingsHandler: () => Promise<void> = async () => {
    // update database properties:
    // title
    // description
    // readMoreLink {linkText, linkUrl}
    // feedSettings
    // siteInfo
    // url
    try {
      updateProperty("url", urlState);
      updateProperty("title", titleState);
      updateProperty("description", descriptionState);
      updateProperty("readMoreLink", readMoreLinkState as IReadMoreLink);
      updateProperty("feedSettings", feedSettingsState as IWordPressFeedSettings);
      updateProperty("siteInfo", siteInfoState as ISiteInfo);
      setSaveSettingsResponse(MESSAGES.SUCCESS.savedSettings);
      setTimeout(() => {
        setSaveSettingsResponse("");
      }, 3000);
    } catch (e) {
      console.error(e);
      setSaveSettingsResponse(MESSAGES.ERROR.failedSaveSettings);
    }
  };

  const updateFeedHandler: () => Promise<void> = async () => {
    if (siteInfoState !== undefined) {
      fetchPosts(urlState, feedSettingsState)
        .then((posts) => {
          setPosts(posts);
          setFailedPostFeedFetch(false);
        })
        .catch((e) => setFailedPostFeedFetch(true));
    }
  };

  useEffect(() => {
    if (urlState.trim() === "") {
      setIsValidUrl(false);
    } else {
      setIsValidUrl(validateUrl(urlState));
    }
  }, [urlState]);

  return (
    <div>
      <TextField
        className={styles.marginYFormField}
        type="text"
        label="Feed title (displays above feed; not shown if empty)"
        value={titleState}
        onChange={(e, newValue) => {
          const v = newValue ? newValue : "";
          setTitleState(v);
        }}
      />
      <TextField
        className={styles.marginYFormField}
        type="text"
        multiline={true}
        label="Feed description (displays under title above feed; not shown if empty)"
        value={descriptionState}
        onChange={(e, newValue) => {
          const v = newValue ? newValue : "";
          setDescriptionState(v);
        }}
      />
      <div className={`${styles.flexW100Container} ${styles.marginYFormField}`}>
        <p className={styles.flexBasisFull}>
          <strong>
            Provide both of the following values to display a link below your news feed. If either is empty, the link
            will not be shown.
          </strong>
        </p>
        <TextField
          className={styles.flexBasisFull}
          type="url"
          label={"Link URL"}
          value={readMoreLinkState.linkUrl}
          onChange={(e, newValue) => {
            const v = newValue ? newValue : "";
            setReadMoreLinkState({ ...readMoreLinkState, linkUrl: v });
          }}
        />
        <TextField
          className={styles.flexBasisFull}
          type="text"
          label={"Link Text"}
          value={readMoreLinkState.linkText}
          onChange={(e, newValue) => {
            const v = newValue ? newValue : "";
            setReadMoreLinkState({ ...readMoreLinkState, linkText: v });
          }}
        />
        <Checkbox
          className={styles.flexBasisFull}
          label={"Open in new tab?"}
          checked={readMoreLinkState.linkNewTab}
          onChange={(e, newValue) => {
            setReadMoreLinkState({ ...readMoreLinkState, linkNewTab: newValue as boolean });
          }}
        />
        <div className={styles.flexBasisFull}>
          <p>
            <strong>Link Preview</strong>
          </p>
          {readMoreLinkNotEmpty(readMoreLinkState) ? (
            <ReadMoreLink {...readMoreLinkState} />
          ) : (
            <p>No link will display.</p>
          )}
        </div>
      </div>
      <TextField
        className={styles.marginYFormField}
        type="url"
        label="WordPress Site URL"
        value={urlState}
        onChange={(e, newValue) => setUrlState(newValue ? newValue : "")}
      />
      {isValidUrl ? (
        <div className={styles.flexW100Container}>
          <PrimaryButton
            text="Fetch site information"
            onClick={(e) => {
              fetchSiteInfo(urlState)
                .then((info) => {
                  setSiteInfoState(info as ISiteInfo);
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
        siteInfoState !== undefined && (
          <FeedSettingsForm
            feedSettings={feedSettingsState}
            setFeedSettings={setFeedSettingsState}
            siteInfo={siteInfoState}
            updateFeedHandler={updateFeedHandler}
            saveSettingsHandler={saveSettingsHandler}
            clearSettingsHandler={clearSettingsHandler}
            saveSettingsResponse={saveSettingsResponse}
          />
        )
      )}

      {failedPostFeedFetch ? (
        <Alert type={"warning"} msg={MESSAGES.WARNING.failedToFetchFeed} />
      ) : (
        siteInfoState !== undefined && (
          <>
            <h2>Preview</h2>
            <FeedRender
              url={urlState}
              title={titleState}
              description={descriptionState}
              readMoreLink={readMoreLinkState}
              posts={posts}
              layoutType={feedSettingsState.layoutType}
            />
          </>
        )
      )}
    </div>
  );
};

export default DisplayModeEdit;
