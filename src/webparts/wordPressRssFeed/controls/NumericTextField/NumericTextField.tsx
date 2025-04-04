import * as React from "react";
import { INumericTextField } from "./INumericTextField";
import { TextField } from "@fluentui/react";

const NumericTextField: React.FC<INumericTextField> = (props) => {
  return (
    <TextField
      label={props.label}
      type="number"
      value={props.value}
      onChange={(e, v) => {
        if (props.onChange) props.onChange(v ? v : "0");
      }}
    />
  );
};

export default NumericTextField;
