import * as React from "react";
import * as ReactDom from "react-dom";
import { IPropertyPaneField, PropertyPaneFieldType } from "@microsoft/sp-property-pane";
import { INumericTextField } from "./INumericTextField";
import NumericTextField from "./NumericTextField";
interface IPropertyPaneNumericTextFieldInternalProps extends INumericTextField {
  onRender: (elem: HTMLElement) => void;
}

export class PropertyPaneNumericTextField implements IPropertyPaneField<INumericTextField> {
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyPaneNumericTextFieldInternalProps;
  private elem: HTMLElement | undefined;
  private renderTimeout: number | undefined;

  constructor(targetProperty: string, props: INumericTextField) {
    this.targetProperty = targetProperty;
    this.properties = {
      onRender: this.onRender.bind(this),
      ...props,
    };
  }
  private unmountComponent(): void {
    if (this.elem) {
      // Unmount the previous component to prevent memory leaks
      ReactDom.unmountComponentAtNode(this.elem);
    }
  }

  public render(): void {
    if (this.elem) {
      // Clear previous React component if any
      this.unmountComponent();

      // Render the component
      this.onRender(this.elem);
    }
  }

  public onRender(elem: HTMLElement): void {
    if (!this.elem) {
      this.elem = elem;
    }

    const element = React.createElement(NumericTextField, {
      key: this.properties.key,
      label: this.properties.label,
      value: this.properties.value,
      min: this.properties.min,
      max: this.properties.max,
      onChange: this.properties.onChange,
    });

    ReactDom.render(element, elem);
  }

  public dispose(): void {
    // Clean up on dispose to ensure proper memory management
    this.unmountComponent();
    if (this.renderTimeout) {
      clearTimeout(this.renderTimeout); // Clear any timeouts if applicable
    }
  }
}
