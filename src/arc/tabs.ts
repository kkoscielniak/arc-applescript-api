import { run as runJxa } from "@jxa/run";
import type { Tab } from "../types";
import { getSpaceById } from "./spaces";

/**
 * Gets the Tabs in the front window
 * @returns Array of Tabs in the front window
 */
export const getTabs = async (): Promise<Tab[]> => {
  const result = await runJxa<Tab[]>(() => {
    const tabs: Tab[] = [];

    const arcApp = Application("Arc");

    const { windows } = arcApp;
    const frontWindow = windows[0];

    const { spaces: spacesRef } = frontWindow;

    spacesRef().forEach((_: any, index: number) => {
      const { id: spaceId, tabs: tabsRef } = spacesRef[index];

      tabsRef().forEach((_: any, index: number) => {
        const { title, id, url, loading, location } = tabsRef[index];

        tabs.push({
          title: title(),
          id: id(),
          url: url(),
          isLoading: loading(),
          location: location(),
          spaceId: spaceId(),
        });
      });
    });

    return tabs;
  });

  return result;
};

/**
 * Opens new Tab in the currently selected space of the front window
 * @param url URL to open in a new Tab
 * @returns id of the newly opened Tab
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

/**
 * Opens new Tab in the given Space of the front window
 * @param url URL to open in a new Tab
 * @param spaceId ID of the Space to open the Tab in
 * @returns
 */
export const openTabInSpace = async (
  url: string,
  spaceId: string
): Promise<string> => {
  /* 
    Using AppleScript instead of JXA because JXA doesn't support `make new tab`
    (using JXA results in opening a Little Arc window instead of a tab)
  */

  const { index: spaceIndex } = await getSpaceById(spaceId);

  const runAppleScript = await import("run-applescript").then((module) => {
    return module.runAppleScript;
  });

  const result = await runAppleScript(`
    tell application "Arc"
      tell front window
        tell space ${spaceIndex}
          make new tab with properties { URL: "${url}" }
        end tell
      end tell
    end tell
  `);

  return result.split(" ")[2]; // Returns the tab ID
};

/**
 * Closes a Tab in the front window
 * @param tabId ID of the Tab to close
 */
export const closeTab = async (tabId: string): Promise<void> =>
  await runJxa(
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
