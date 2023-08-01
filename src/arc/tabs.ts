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

export const openTab = async (url: string): Promise<void> =>
  await runJxa<void>(
    (url) => {
      let createdTab: Tab | null = null;

      const arcApp = Application("Arc");

      const { windows } = arcApp;
      const frontWindow = windows[0];
      const { tabs: tabsRef } = frontWindow;

      const tab = arcApp.Tab({ url });
      tabsRef.push(tab);

      /**
       * TODO: Determine a way to return the newly created tab object
       */
      /**
       * TODO: Try AppleScript instead JXA
       */
    },
    [url]
  );

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
