# arc-applescript-api

A wrapper for [Arc Browser](https://arc.net)'s basic AppleScript APIs.

This project is not affiliated with Arc Browser or The Browser Company.

Requires Node 16+.

## Install

```sh
npm install @kkoscielniak/arc-applescript-api
```

## Usage

```ts
import { openTab } from "@kkoscielniak/arc-applescript-api";

await openTab("https://koscielniak.pro");
```

## API

### Types

#### `Space`

Represents an Arc's Space.

- `id` (string): A unique identifier for the Space.
- `title` (string): The title or name of the Space.
- `index` (number): The index of the Space (1-indexed).

#### `Tab`

### Spaces

#### `getSpaces(): Promise<Space[]>`

- Returns a Promise that resolves to an array of [`Space`](#space)s.

#### `getSpaceById(spaceId: string): Promise<Space>`

- Parameters:
  - `spaceId` (string): The ID of the Space to retrieve.
- Returns a Promise that resolves to the [`Space`](#space) with the given ID.

### Tabs

#### `getTabs(): Promise<Tab[]>`

- Returns a Promise that resolves to an array of `Tab` objects.
- Each `Tab` object has the following properties:
  - `title` (string): The title or name of the tab.
  - `id` (string): A unique identifier for the tab.
  - `url` (string): The URL of the tab.
  - `isLoading` (boolean): A flag indicating whether the tab is still loading.
  - `location` (string): The location of the tab ("pinned", "unpinned" or "topApp").
  - `spaceId` (string): The ID of the Space to which the tab belongs.

#### `openTab(url: string): Promise<string>`

- Parameters:
  - `url` (string): The URL to open in a new tab.
- Returns a Promise that resolves to the ID of the newly opened tab.

#### `openTabInSpace(url: string, spaceId: string): Promise<string>`

- Parameters:
  - `url` (string): The URL to open in a new tab.
  - `spaceId` (string): The ID of the Space in which to open the tab.
- Returns a Promise that resolves to information about the operation (specifically, the tab ID).

#### `closeTab(tabId: string): Promise<void>`

- Parameters:
  - `tabId` (string): The ID of the tab to close.
