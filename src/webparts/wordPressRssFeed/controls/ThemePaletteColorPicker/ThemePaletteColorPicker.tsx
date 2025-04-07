import * as React from "react";
import { IThemePaletteColorPicker } from "./IThemePaletteColorPicker";
import { Dropdown, IDropdownOption } from "@fluentui/react";
import styles from "../../components/WordPressRssFeed.module.scss";
import { extractDefaultColor } from "../../util";

interface IColorPreview {
  color: string;
}
const ColorPreview: React.FC<IColorPreview> = ({ color }) => {
  return <div className={styles.colorPreview} style={{ backgroundColor: `${extractDefaultColor(color)}` }} />;
};

const ThemePaletteColorPicker: React.FC<IThemePaletteColorPicker> = (props) => {
  return (
    <div className={styles.flexW100Container}>
      <Dropdown
        label={props.label}
        className={styles.flexBasis80}
        selectedKey={props.selectedKey}
        options={props.options}
        onChange={(e, newSelectedOption) => {
          props.onChange(newSelectedOption as IDropdownOption);
        }}
      />
      <ColorPreview color={props.selectedKey} />
    </div>
  );
};

export default ThemePaletteColorPicker;
