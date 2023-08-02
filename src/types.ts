import "@jxa/global-type";

export type Arc = {
  name: string;
  frontmost: boolean;
  version: string;
};

export type Space = {
  id: string;
  title: string;
};

export type Tab = {
  id: string;
  title: string;
  url: string;
  isLoading: boolean;
  location: "pinned" | "unpinned" | "topApp";
  spaceId: string;
};
