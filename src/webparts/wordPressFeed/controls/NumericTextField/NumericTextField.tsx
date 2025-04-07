import * as React from "react";
import { INumericTextField } from "./INumericTextField";
import { TextField } from "@fluentui/react";

const NumericTextField: React.FC<INumericTextField> = (props) => {
  return (
    <TextField
      label={props.label}
      type="number"
      min={props.min}
      max={props.max}
      validateOnFocusIn={true}
      value={props.value}
      onChange={(e, v) => {
        if (parseInt(v as string) < props.min || parseInt(v as string) > props.max) return;
        if (props.onChange) props.onChange(v ? v : "0");
      }}
    />
  );
};

export default NumericTextField;
