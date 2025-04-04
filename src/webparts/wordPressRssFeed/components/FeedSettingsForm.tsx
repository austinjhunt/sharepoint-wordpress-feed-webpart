import * as React from "react";
import { MouseEventHandler } from "react";
import styles from "./WordPressRssFeed.module.scss";
import { TextField, Dropdown, PrimaryButton, BaseButton } from "@fluentui/react";
import { DEFAULTS } from "../defaults";
import { ISiteInfo, IWordPressFeedSettings } from "../interfaces";
import SiteSummary from "./SiteSummary";
import { filterJoinOperators, layouts } from "../dropdownOptions";
import { Alert, MESSAGES } from "./Alert";

interface IFeedSettingsForm {
  feedSettings: IWordPressFeedSettings;
  setFeedSettings: React.Dispatch<React.SetStateAction<IWordPressFeedSettings>>;
  siteInfo: ISiteInfo;
  updateFeedHandler: MouseEventHandler<BaseButton>;
  clearSettingsHandler: MouseEventHandler<BaseButton>;
  saveSettingsHandler: MouseEventHandler<BaseButton>;
  saveSettingsResponse: string;
}

const FeedSettingsForm: React.FC<IFeedSettingsForm> = ({
  feedSettings,
  setFeedSettings,
  siteInfo,
  updateFeedHandler,
  clearSettingsHandler,
  saveSettingsHandler,
  saveSettingsResponse,
}) => {
  return (
    <>
      {SiteSummary(siteInfo)}
      <div className={styles.limitsContainer}>
        <p className={styles.flexBasisFull}>Specify limits for the feed.</p>
        <TextField
          label="Number of Posts"
          type="number"
          value={feedSettings.numPosts.toString()}
          max={25}
          onChange={(e, newValue: string) => {
            setFeedSettings({
              ...feedSettings,
              numPosts: parseInt(newValue, DEFAULTS.numPosts),
            });
          }}
        />
        <TextField
          label="Number of days back"
          type="number"
          value={feedSettings.pastDays.toString()}
          max={30}
          onChange={(e, newValue: string) =>
            setFeedSettings({
              ...feedSettings,
              pastDays: parseInt(newValue, DEFAULTS.pastDays),
            })
          }
        />
      </div>

      <Dropdown
        className={styles.marginYFormField}
        label={`Filter by tag (${siteInfo.tags ? siteInfo.tags.length : 0} available)`}
        options={siteInfo.tags}
        multiSelect
        selectedKeys={feedSettings.tagIds}
        onChange={(e, option) => {
          if (option) {
            const newIds = option.selected
              ? [...feedSettings.tagIds, option.key] // Add selected option
              : feedSettings.tagIds.filter((id) => id !== option.key); // Remove unselected option

            setFeedSettings({
              ...feedSettings,
              tagIds: newIds as Array<number>,
            });
          }
        }}
      />
      <Dropdown
        className={styles.marginYFormField}
        label={`Filter by category (${siteInfo.categories ? siteInfo.categories.length : 0} available)`}
        options={siteInfo.categories}
        multiSelect
        selectedKeys={feedSettings.categoryIds}
        onChange={(e, option) => {
          if (option) {
            const newIds = option.selected
              ? [...feedSettings.categoryIds, option.key] // Add selected option
              : feedSettings.categoryIds.filter((id) => id !== option.key); // Remove unselected option

            setFeedSettings({
              ...feedSettings,
              categoryIds: newIds as Array<number>,
            });
          }
        }}
      />
      <TextField
        className={styles.marginYFormField}
        label="Post Name Pattern (Supports Wildcard)"
        value={feedSettings.postPattern}
        onChange={(e, newValue) =>
          setFeedSettings({
            ...feedSettings,
            postPattern: newValue || DEFAULTS.postPattern,
          })
        }
      />

      <Dropdown
        className={styles.marginYFormField}
        label="Join operator for category and tag filters (And vs. Or)"
        options={filterJoinOperators}
        selectedKey={feedSettings.filterJoinOperator || DEFAULTS.filterJoinOperator}
        onChange={(e, option) =>
          setFeedSettings({
            ...feedSettings,
            filterJoinOperator: option ? (option.key as string) : DEFAULTS.filterJoinOperator,
          })
        }
      />

      <Dropdown
        className={styles.marginYFormField}
        label="Choose a feed layout"
        options={layouts}
        selectedKey={feedSettings.layoutType || DEFAULTS.layoutType}
        onChange={(e, option) => {
          if (option && (option.key === "list" || option.key === "grid")) {
            setFeedSettings({
              ...feedSettings,
              layoutType: option.key,
            });
          } else {
            setFeedSettings({
              ...feedSettings,
              layoutType: DEFAULTS.layoutType as "list" | "grid",
            });
          }
        }}
      />
      <div className={styles.flexW100Container}>
        <PrimaryButton text="Preview" onClick={updateFeedHandler} />
        <PrimaryButton text="Save Settings" onClick={saveSettingsHandler} />
        <PrimaryButton text="Clear Settings" onClick={clearSettingsHandler} />

        {saveSettingsResponse !== "" && (
          <div className={styles.flexBasisFull}>
            <Alert
              msg={saveSettingsResponse}
              type={saveSettingsResponse === MESSAGES.SUCCESS.savedSettings ? "success" : "error"}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default FeedSettingsForm;
