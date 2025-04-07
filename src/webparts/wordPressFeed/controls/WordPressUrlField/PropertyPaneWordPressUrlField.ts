import * as React from "react";
import * as ReactDom from "react-dom";
import { IPropertyPaneField, PropertyPaneFieldType } from "@microsoft/sp-property-pane";
import { IWordPressUrlField } from "./IWordPressUrlField";
import WordPressUrlField from "./WordPressUrlField";
interface IPropertyPaneWordPressUrlFieldInternalProps extends IWordPressUrlField {
  onRender: (elem: HTMLElement) => void;
}

export class PropertyPaneWordPressUrlField implements IPropertyPaneField<IWordPressUrlField> {
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyPaneWordPressUrlFieldInternalProps;
  private elem: HTMLElement | undefined;
  private renderTimeout: number | undefined;

  constructor(targetProperty: string, props: IWordPressUrlField) {
    this.targetProperty = targetProperty;
    this.properties = {
      ...props,
      onRender: this.onRender.bind(this),
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

    const element = React.createElement(WordPressUrlField, {
      label: this.properties.label,
      value: this.properties.value,
      key: this.properties.key,
      siteName: this.properties.siteName,
      onChange: this.properties.onChange,
      siteFetchHandler: this.properties.siteFetchHandler,
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
