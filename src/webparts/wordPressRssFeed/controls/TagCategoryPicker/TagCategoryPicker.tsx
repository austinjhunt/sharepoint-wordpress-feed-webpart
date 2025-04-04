import * as React from "react";
import { ITagCategoryPickerProps } from "./ITagCategoryPickerProps";
import { Dropdown } from "@fluentui/react/lib/Dropdown";

const TagCategoryPicker: React.FC<ITagCategoryPickerProps> = (props) => {
  return (
    <Dropdown
      placeholder="Select options"
      label={props.label}
      multiSelect
      options={props.options}
      selectedKeys={props.selectedKeys}
      onChange={(event, option) => {
        if (!option) return;
        const updatedKeys = option.selected
          ? [...props.selectedKeys, option.key as number]
          : props.selectedKeys.filter((k) => k !== option.key);

        props.onChange(updatedKeys);
      }}
    />
  );
};

export default TagCategoryPicker;
