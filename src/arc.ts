import "@jxa/global-type";
import { run as runJxa } from "@jxa/run";
import type { Space } from "./types";

export const getSpaces = async (): Promise<Space[]> => {
  const result = await runJxa(() => {
    const spaces: Space[] = [];

    const arcApp = Application("Arc");

    const { windows } = arcApp;
    const frontWindow = windows[0];
    const spacesRef = frontWindow.spaces;

    spacesRef().forEach((_: any, index: number) => {
      const { title, id } = spacesRef[index];

      spaces.push({
        title: title(),
        internalId: id(),
        index: index + 1, // Spaces are 1-indexed
      });
    });

    return spaces;
  });

  return result as Space[];
};
