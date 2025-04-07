import * as React from "react";
import * as ReactDom from "react-dom";
import { IPropertyPaneField, PropertyPaneFieldType } from "@microsoft/sp-property-pane";
import { IThemePaletteColorPicker } from "./IThemePaletteColorPicker";
import ThemePaletteColorPicker from "./ThemePaletteColorPicker";
interface IPropertyPaneNumericTextFieldInternalProps extends IThemePaletteColorPicker {
  onRender: (elem: HTMLElement) => void;
}

export class PropertyPaneThemePaletteColorPicker implements IPropertyPaneField<IThemePaletteColorPicker> {
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyPaneNumericTextFieldInternalProps;
  private elem: HTMLElement | undefined;
  private renderTimeout: number | undefined;

  constructor(targetProperty: string, props: IThemePaletteColorPicker) {
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

    const element = React.createElement(ThemePaletteColorPicker, {
      key: this.properties.key,
      label: this.properties.label,
      selectedKey: this.properties.selectedKey,
      options: this.properties.options,
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
