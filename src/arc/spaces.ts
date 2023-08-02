import { run as runJxa } from "@jxa/run";
import type { Space } from "../types";

/**
 * Gets an array of the Spaces in the front window
 * @returns Array of Spaces in the front window
 */
export const getSpaces = async (): Promise<Space[]> => {
  const result = await runJxa<Space[]>(() => {
    const spaces: Space[] = [];

    const arcApp = Application("Arc");

    const { windows } = arcApp;
    const frontWindow = windows[0];
    const spacesRef = frontWindow.spaces;

    spacesRef().forEach((_: any, index: number) => {
      const { title, id } = spacesRef[index];

      spaces.push({
        id: id(),
        title: title(),
      });
    });

    return spaces;
  });

  return result;
};
