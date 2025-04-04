import * as React from "react";
import { IWordPressUrlField } from "./IWordPressUrlField";
import { PrimaryButton, TextField } from "@fluentui/react";
import { Alert, MESSAGES } from "../../components/Alert";
import { validateUrl } from "../../util";
import styles from "../../components/WordPressRssFeed.module.scss";

const WordPressUrlField: React.FC<IWordPressUrlField> = (props) => {
  const [urlState, setUrlState] = React.useState<string>(props.value);
  return (
    <>
      <TextField
        label={props.label}
        value={props.value}
        type="url"
        onChange={(e, newVal) => {
          const v = newVal ? newVal : "";
          setUrlState(v);
          props.onChange(v);
        }}
      />
      <PrimaryButton
        className={styles.marginYFormField}
        text="Fetch Site Information"
        disabled={!validateUrl(urlState)}
        onClick={() => {
          props.siteFetchHandler().catch((e) => console.error(e)); // will update tags,categories,siteName
        }}
      />
      {props.siteName !== "" && (
        <>
          <br />
          <Alert type="success" msg={`${MESSAGES.SUCCESS.connectedToSite}: ${props.siteName}`} />
        </>
      )}
    </>
  );
};

export default WordPressUrlField;
