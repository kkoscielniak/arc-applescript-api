import { run as runJxa } from "@jxa/run";
import type { Tab } from "../types";

export const getTabs = async (): Promise<Tab[]> => {
  const result = await runJxa<Tab[]>(() => {
    const tabs: Tab[] = [];

    const arcApp = Application("Arc");

    const { windows } = arcApp;
    const frontWindow = windows[0];
    const tabsRef = frontWindow.tabs;

    tabsRef().forEach((_: any, index: number) => {
      const { title, id, url, loading, location } = tabsRef[index];

      tabs.push({
        title: title(),
        internalId: id(),
        url: url(),
        isLoading: loading(),
        location: location(),
      });
    });

    return tabs;
  });

  return result;
};

/**
 * Opens new Tab in the currently selected space
 * @param url URL to open in a new tab
 * @returns id of the newly opened tab
 */
export const openTab = async (url: string): Promise<string> => {
  /* 
    Using AppleScript instead of JXA because JXA doesn't support `make new tab`
    (using JXA results in opening a Little Arc window instead of a tab)
  */

  const runAppleScript = await import("run-applescript").then((module) => {
    return module.runAppleScript;
  });

  const result = await runAppleScript(`
    tell application "Arc"
      tell front window
          make new tab with properties { URL: "${url}" }
      end tell
    end tell
  `);

  return result.split(" ")[2]; // Returns the tab ID
};

// TODO: Types
export const closeTab = async (tabId: string): Promise<any> => {
  const result = await runJxa(
    (tabId) => {
      const arcApp = Application("Arc");
      const frontWindow = arcApp.windows[0];

      const { tabs } = frontWindow;

      let tabToClose: any;

      tabs().forEach((_: any, index: number) => {
        const tabRef = tabs[index];

        if (tabRef.id() == tabId) {
          tabToClose = tabRef;
        }
      });

      return tabToClose.close();
    },
    [tabId]
  );

  return result;
};
