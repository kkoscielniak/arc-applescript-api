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

| Property | Type   | Description                         |
| -------- | ------ | ----------------------------------- |
| id       | string | A unique identifier for the Space.  |
| title    | string | The title of the Space.             |
| index    | number | The index of the Space (1-indexed). |

#### `Tab`

Represents an Arc's Tab.

| Property  | Type                           | Description                                         |
| --------- | ------------------------------ | --------------------------------------------------- |
| title     | string                         | The title of the tab.                               |
| id        | string                         | A unique identifier of the tab.                     |
| url       | string                         | The URL of the tab.                                 |
| isLoading | boolean                        | A flag indicating whether the tab is still loading. |
| location  | "pinned"\|"unpinned"\|"topApp" | The location of the tab                             |
| spaceId   | string                         | The ID of the Space to which the tab belongs.       |

### Spaces

#### `getSpaces(): Promise<Space[]>`

Returns a Promise that resolves to an array of [`Space`](#space)s.

#### `getSpaceById(spaceId: string): Promise<Space>`

Returns a Promise that resolves to the [`Space`](#space) identified by given `spaceId`.

| Property | Type   | Description                      |
| -------- | ------ | -------------------------------- |
| spaceId  | string | The ID of the Space to retrieve. |

### Tabs

#### `getTabs(): Promise<Tab[]>`

Returns a Promise that resolves to an array of [`Tab`](#tab)s.

#### `openTab(url: string): Promise<string>`

Opens a new Tab in the Space currently selected in the front window.

Returns a Promise that resolves to the ID of the newly opened tab.

| Property | Type   | Description                   |
| -------- | ------ | ----------------------------- |
| url      | string | The URL to open in a new tab. |

#### `openTabInSpace(url: string, spaceId: string): Promise<string>`

Opens new Tab in the chosen Space.

Returns a Promise that resolves to the ID of the newly opened tab.

| Property | Type   | Description                                   |
| -------- | ------ | --------------------------------------------- |
| url      | string | The URL to open in a new tab.                 |
| spaceId  | string | The ID of the Space in which to open the tab. |

#### `closeTab(tabId: string): Promise<void>`

Closes a Tab identified by the given `tabId`.

| Property | Type   | Description                 |
| -------- | ------ | --------------------------- |
| tabId    | string | The ID of the tab to close. |

## Contribution

TBA

## License

TBA
