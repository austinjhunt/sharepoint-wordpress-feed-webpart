import * as React from "react";
import { SiteInfo } from "../interfaces";
import { Alert, MESSAGES } from "./Alert";

const SiteSummary: (siteInfo: SiteInfo) => JSX.Element = (siteInfo) => {
  return (
    <Alert type={"success"} msg={`${MESSAGES.SUCCESS.connectedToSite}: ${siteInfo.name} -- ${siteInfo.description}`} />
  );
};

export default SiteSummary;
