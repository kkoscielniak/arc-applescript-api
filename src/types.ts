import "@jxa/global-type";

export type Arc = {
  name: string;
  frontmost: boolean;
  version: string;
};

export type Space = {
  index: number;
  internalId: string;
  title: string;
};

export type Tab = {
  index?: number;
  internalId: string;
  title: string;
  url: string;
  isLoading: boolean;
  location: "pinned" | "unpinned" | "topApp";
  spaceIndex?: number;
};
