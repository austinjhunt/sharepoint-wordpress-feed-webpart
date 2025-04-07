import { IDropdownOption } from "@fluentui/react";
import { IPropertyPaneDropdownOption } from "@microsoft/sp-property-pane";

interface IThemePaletteColorPicker {
  label: string;
  selectedKey: string;
  key: string;
  options: IPropertyPaneDropdownOption[];
  onChange: (newValue: IDropdownOption) => void;
}

export { IThemePaletteColorPicker };
