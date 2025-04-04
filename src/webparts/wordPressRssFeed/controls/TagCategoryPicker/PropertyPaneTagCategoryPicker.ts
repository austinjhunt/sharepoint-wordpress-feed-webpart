import * as React from "react";
import * as ReactDom from "react-dom";
import { IPropertyPaneField, PropertyPaneFieldType } from "@microsoft/sp-property-pane";
import TagCategoryPicker from "./TagCategoryPicker";
import { ITagCategoryPickerProps } from "./ITagCategoryPickerProps";

interface IPropertyPaneTagCategoryPickerInternalProps extends ITagCategoryPickerProps {
  onRender: (elem: HTMLElement) => void;
}
export class PropertyPaneTagCategoryPicker implements IPropertyPaneField<ITagCategoryPickerProps> {
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyPaneTagCategoryPickerInternalProps;
  private elem: HTMLElement | undefined;
  private renderTimeout: number | undefined;

  constructor(targetProperty: string, props: ITagCategoryPickerProps) {
    this.targetProperty = targetProperty;
    this.properties = {
      ...props,
      onRender: this.onRender.bind(this),
    };
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

    const element = React.createElement(TagCategoryPicker, {
      label: this.properties.label,
      key: this.properties.key,
      selectedKeys: this.properties.selectedKeys,
      options: this.properties.options,
      onChange: this.properties.onChange,
    });

    ReactDom.render(element, elem);
  }

  private unmountComponent(): void {
    if (this.elem) {
      // Unmount the previous component to prevent memory leaks
      ReactDom.unmountComponentAtNode(this.elem);
    }
  }
  public dispose(): void {
    // Clean up on dispose to ensure proper memory management
    this.unmountComponent();
    if (this.renderTimeout) {
      clearTimeout(this.renderTimeout); // Clear any timeouts if applicable
    }
  }
}
