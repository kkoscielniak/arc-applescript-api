import { run as runJxa } from "@jxa/run";

/**
 * Executes JavaScript code in the context of the current tab.
 * @param {string} code Stringified JavaScript code
 * @returns The result of the JavaScript call
 */
export const executeJs = async (code: string): Promise<string> => {
  const result = await runJxa<string>(
    (code: string) => {
      return Application("Arc").windows[0].activeTab.execute({
        javascript: code,
      });
    },
    [code]
  );

  return result;
};
