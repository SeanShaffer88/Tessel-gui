# Empty, loading and error states

Every view has four states beyond its normal one: empty, loading, error and offline. This page gives a template for each and a per-category example. Values are the `states` section of [tokens.json](tokens.json). The fill rule still holds: a state never leaves a large blank box. See the [design guidelines](design-guidelines.md#layout).

## Templates

| State | Parts | Rules |
| --- | --- | --- |
| Empty | Title, reason, primary action, secondary action, shortcut hint | Name what is missing and the one action that fixes it. The 24 px signature `grid` shows behind the block only, never behind dense text |
| Loading | Phase name, ten-segment progress, Cancel | Show after 300 ms and keep visible for at least 500 ms. Known total: determinate. Unknown: one moving segment. Reduced motion: static text plus a count. Reserve the final layout so nothing shifts when data arrives |
| Error | What failed, why if known, what to do, retry or recover action, details disclosure | `danger` text with an icon and a label. Keep the failed input and the user's data on screen. Put technical details behind a disclosure |
| Offline | Banner in `warningFill`, list of affected actions | Keep read-only content usable. Disable only what needs the network and say which |

## Per-category examples

| Category | Empty | Loading | Error |
| --- | --- | --- | --- |
| Data & records | “No orders match these filters.” Clear filters, Export all | Rows show a ten-segment bar in the header while the first page loads | “Could not load orders: the server timed out.” Retry, Open log |
| Editor & IDE | “No folder open.” Open Folder, Clone Repository, recent folders | Status bar progress with the task name, for example “Indexing 4,210 files” | Problems panel row with file, line, message and a Quick Fix action |
| Media & creative | Empty canvas on the grid with New Project, Import, recent projects | Proxy generation in the timeline with Cancel. Preview keeps its last frame | “Render failed at 00:12:04.” Retry from last frame, Open render log |
| Monitoring & analytics | “No data in this range.” Widen range, Check source | Metric tile keeps its old value with “Updating…” text | “Source unreachable since 14:02.” Last value stays with its age in text |
| Utility & wizard | Not used. The first step is the empty state | Step shows its phase, progress and Cancel. Back stays enabled until work starts | Step shows the failure, the safe state of the system and Retry, Skip or Back |
| Communication | “No conversations yet.” New message, Import contacts | Skeleton rows with real layout. The composer stays usable | A failed message shows “Not sent” text with Retry and Delete |
| CAD & 3D | Empty viewport on the grid with New Part, Open, Import | Viewport keeps the last frame and shows “Rebuilding feature 7 of 12” | Failed feature is flagged in the tree with text. The model remains at the last good state |
| Settings & system tools | Section search with no match: “No settings match.” Clear search | Apply shows progress per setting. Draft stays editable | The setting that failed stays staged with its error. Others keep their result |
| Document & reader | “No document open.” Open, New, recent documents | Page placeholder at the real page size with “Loading page 3” | “This file is damaged.” Try recovery, Open a copy |
| Spreadsheet & grid | Empty sheet with a first-cell hint and Import | Calculation progress in the status bar. Cells show their last value | `#VALUE!`-style cell errors carry a tooltip and a text explanation |
| Admin & network console | “No resources in this scope.” Create, Change scope | Row shows “Applying…” text and a progress segment while a change runs | Failed action keeps the target named in the message with Retry and Rollback |
| Launcher & hub | Recent items empty: pinned tasks and shortcuts fill the space | Search results stream in with a count | “Search is unavailable.” Browse all, Retry |
| Whiteboard & collaboration canvas | Empty canvas on the grid with a templates row and invite | Presence loads after content. Content opens first | “Connection lost.” Edits stay local and sync is retried with a visible status |
| Scientific & instrument | Plot axes with “No acquisition.” Acquire, Load file | Live traces with an Acquire/Stop control that never moves | “Instrument disconnected.” Last data kept, Reconnect |

## Checklist

- The state names the problem and the next action in words.
- Focus lands on the first useful control when a state replaces the content, and returns to the trigger when it closes.
- A live region announces the transition once: `role="status"` for loading and empty, `role="alert"` for errors.
- Nothing shifts when the state changes. The region keeps its size.
- The state works with the keyboard alone and at 200% text size.
