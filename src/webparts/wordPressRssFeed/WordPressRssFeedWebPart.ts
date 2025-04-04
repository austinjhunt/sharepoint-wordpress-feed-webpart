import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";

import { type IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import WordPressRssFeed from "./components/WordPressRssFeed";
import { IWordPressRssFeedWebPartProps } from "./interfaces";
import { DEFAULTS, defaultSettings } from "./defaults";

export default class WordPressRssFeedWebPart extends BaseClientSideWebPart<IWordPressRssFeedWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IWordPressRssFeedWebPartProps> = React.createElement(WordPressRssFeed, {
      displayMode: this.displayMode,
      title: this.properties.title,
      description: this.properties.description,
      readMoreLink: this.properties.readMoreLink,
      siteInfo: this.properties.siteInfo,
      feedSettings: this.properties.feedSettings,
      url: this.properties.url,
      // provide a way to save values to database
      updateProperty: (key: string, value: any) => {
        this.properties[key] = value;
      },
    });

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    // initialize values to defaults if database instance has nothing stored
    if (!this.properties.siteInfo) {
      this.properties.siteInfo = DEFAULTS.siteInfo;
    }
    if (!this.properties.url) {
      this.properties.url = DEFAULTS.siteUrl;
    }
    if (!this.properties.feedSettings) {
      this.properties.feedSettings = defaultSettings;
    }
    if (!this.properties.title) {
      this.properties.title = DEFAULTS.title;
    }
    if (!this.properties.description) {
      this.properties.description = DEFAULTS.description;
    }
    if (!this.properties.readMoreLink) {
      this.properties.readMoreLink = DEFAULTS.readMoreLink;
    }

    return super.onInit();
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }
    const { semanticColors } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty("--bodyText", semanticColors.bodyText || null);
      this.domElement.style.setProperty("--link", semanticColors.link || null);
      this.domElement.style.setProperty("--linkHovered", semanticColors.linkHovered || null);
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: "Configure RSS Feed" },
          groups: [
            {
              groupName: "Settings",
              groupFields: [
                PropertyPaneTextField("siteUrl", {
                  label: "WordPress Site URL",
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
