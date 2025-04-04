import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { PropertyPaneTagCategoryPicker } from "./controls/TagCategoryPicker/PropertyPaneTagCategoryPicker";

import {
  type IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneTextField,
  PropertyPaneToggle,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import WordPressRssFeed from "./components/WordPressRssFeed";
import { ITagOrCategory, IWordPressRssFeedWebPartProps } from "./interfaces";
import { DEFAULTS, defaultSettings } from "./defaults";
import { filterJoinOperators, layouts } from "./dropdownOptions";
import { PropertyPaneWordPressUrlField } from "./controls/WordPressUrlField/PropertyPaneWordPressUrlField";
import { validateUrl } from "./util";
import { PropertyPaneNumericTextField } from "./controls/NumericTextField/PropertyPaneNumericTextField";

export default class WordPressRssFeedWebPart extends BaseClientSideWebPart<IWordPressRssFeedWebPartProps> {
  // store data that you need to fetch asynchronously within
  // configuration panel as private variables, and load them
  // onInit.
  private _tagOptions: { key: number; text: string }[] = [];
  private _categoryOptions: { key: number; text: string }[] = [];
  private _siteName: string = "";

  public render(): void {
    const element: React.ReactElement<IWordPressRssFeedWebPartProps> = React.createElement(WordPressRssFeed, {
      title: this.properties.title,
      description: this.properties.description,
      readMoreLink: this.properties.readMoreLink,
      feedSettings: this.properties.feedSettings,
      url: this.properties.url,
    });

    ReactDom.render(element, this.domElement);
  }

  private loadSiteDataFromURL: () => Promise<void> = async () => {
    const apiBase = this.properties.url;
    const [general, tags, categories] = await Promise.all([
      fetch(`${apiBase}/wp-json`).then((res) => res.json()),
      fetch(`${apiBase}/wp-json/wp/v2/tags`).then((res) => res.json()),
      fetch(`${apiBase}/wp-json/wp/v2/categories`).then((res) => res.json()),
    ]);
    this._siteName = general.name;
    this._tagOptions = tags.map((tag: ITagOrCategory) => ({ key: tag.id, text: tag.name }));
    this._categoryOptions = categories.map((cat: ITagOrCategory) => ({ key: cat.id, text: cat.name }));
    return Promise.resolve();
  };

  protected onInit(): Promise<void> {
    // initialize values to defaults if database instance has nothing stored

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

    if (validateUrl(this.properties.url)) {
      this.loadSiteDataFromURL().catch((e) => console.error(e));
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

  public getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: "Configure your WordPress feed" },
          groups: [
            {
              groupName: "Feed Basics",
              groupFields: [
                PropertyPaneTextField("title", {
                  label: "Feed Title",
                  value: this.properties.title,
                }),
                PropertyPaneTextField("description", {
                  label: "Feed Description",
                  multiline: true,
                  value: this.properties.description,
                }),
                PropertyPaneToggle("readMoreLink.include", {
                  label: "Include Link Below Feed?",
                  checked: this.properties.readMoreLink.include,
                }),
                PropertyPaneTextField("readMoreLink.linkText", {
                  label: "Link Text",
                  disabled: !this.properties.readMoreLink.include,
                  value: this.properties.readMoreLink.linkText,
                }),
                PropertyPaneTextField("readMoreLink.linkUrl", {
                  label: "Link URL",
                  disabled: !this.properties.readMoreLink.include,
                  value: this.properties.readMoreLink.linkUrl,
                }),
                PropertyPaneToggle("readMoreLink.linkNewTab", {
                  label: "Open link in new tab",
                  checked: this.properties.readMoreLink.linkNewTab,
                }),
                new PropertyPaneWordPressUrlField("url", {
                  label: "WordPress Site URL",
                  key: "url",
                  value: this.properties.url,
                  siteName: this._siteName,
                  onChange: (s: string) => {
                    this.properties.url = s;
                    this.context.propertyPane.refresh();
                  },
                  siteFetchHandler: async () => {
                    await this.loadSiteDataFromURL()
                      .then(() => this.context.propertyPane.refresh())
                      .catch((e) => console.error(e));
                  },
                }),
              ],
            },

            {
              groupName: "Feed Settings",
              groupFields: [
                new PropertyPaneNumericTextField("feedSettings.numPosts", {
                  label: "Number of Posts",
                  key: "feedSettings.numPosts",
                  value: this.properties.feedSettings.numPosts.toString(),
                  onChange: (s: string) => {
                    this.properties.feedSettings.numPosts = parseInt(s);
                    this.context.propertyPane.refresh();
                    this.render();
                  },
                }),
                new PropertyPaneNumericTextField("feedSettings.pastDays", {
                  label: "Past Days",
                  key: "feedSettings.pastDays",
                  value: this.properties.feedSettings.pastDays.toString(),
                  onChange: (s: string) => {
                    this.properties.feedSettings.pastDays = parseInt(s);
                    this.context.propertyPane.refresh();
                    this.render();
                  },
                }),
                // Tag/category filtering would require dynamic loading,
                // which SPFX doesn't support directly in the property pane.
                // I am using a customPropertyPaneField for this if needed.
                new PropertyPaneTagCategoryPicker("feedSettings.tagIds", {
                  label: "Select Tags",
                  key: "feedSettings.tagIds",
                  selectedKeys: this.properties.feedSettings.tagIds || [],
                  options: this._tagOptions,
                  onChange: (newTagIds: number[]) => {
                    this.properties.feedSettings.tagIds = newTagIds;
                    this.context.propertyPane.refresh();
                    this.render();
                  },
                }),
                new PropertyPaneTagCategoryPicker("feedSettings.categoryIds", {
                  label: "Select Categories",
                  key: "feedSettings.categoryIds",
                  selectedKeys: this.properties.feedSettings.categoryIds || [],
                  options: this._categoryOptions,
                  onChange: (newCategoryIds: number[]) => {
                    this.properties.feedSettings.categoryIds = newCategoryIds;
                    this.context.propertyPane.refresh();
                    this.render();
                  },
                }),
                PropertyPaneTextField("feedSettings.postPattern", {
                  label: "Post Pattern (Wildcard OK)",
                  value: this.properties.feedSettings.postPattern,
                }),
                PropertyPaneDropdown("feedSettings.filterJoinOperator", {
                  label: "Join Operator",
                  options: filterJoinOperators,
                  selectedKey: this.properties.feedSettings.filterJoinOperator,
                }),
                PropertyPaneDropdown("feedSettings.layoutType", {
                  label: "Feed Layout",
                  options: layouts,
                  selectedKey: this.properties.feedSettings.layoutType,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
