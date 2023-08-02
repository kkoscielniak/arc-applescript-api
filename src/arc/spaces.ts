import { run as runJxa } from "@jxa/run";
import type { Space } from "../types";

/**
 * Gets the Spaces in the front window
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
        index: index + 1, // Spaces are 1-indexed,
      });
    });

    return spaces;
  });

  return result;
};

/**
 * Gets the Space with the given ID
 * @param spaceId ID of the Space to get
 * @returns the Space with the given ID
 */
export const getSpaceById = async (spaceId: string): Promise<Space> => {
  const result = await runJxa<Space>(
    (spaceId) => {
      const arcApp = Application("Arc");

      const { windows } = arcApp;
      const frontWindow = windows[0];
      const spacesRef = frontWindow.spaces;

      let space: Space | undefined;

      spacesRef().forEach((_: any, index: number) => {
        const { title, id } = spacesRef[index];

        if (id() == spaceId) {
          space = {
            id: id(),
            title: title(),
            index: index + 1, // Spaces are 1-indexed
          };
        }
      });

      return space;
    },
    [spaceId]
  );

  return result;
};
