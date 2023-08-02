import "@jxa/global-type";

export { getSpaces, getSpaceById } from "./arc/spaces";
export { getTabs, openTab, openTabInSpace, closeTab } from "./arc/tabs";
export { executeJs } from "./arc/utils";
export type { Space, Tab } from "./types";
