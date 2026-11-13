# Layouts, docking and multiple views

How regions are arranged, saved and shared across views and windows. [Workspaces](workspaces.md) covers modes and panels, [categories](categories.md) covers the starting archetypes. Values are the `layouts` section of [tokens.json](tokens.json).

## Presets

Three named layouts cover most work. Each is also a palette command, and people can save their own.

| Preset | Dominant region | Regions | Keys |
| --- | --- | --- | --- |
| Focus | 90 to 100% | The dominant region and the status bar. Panels collapse to the edge | Ctrl+Alt+1 |
| Review | 55 to 65% | The dominant region and one side panel at 25 to 35% | Ctrl+Alt+2 |
| Wide (default) | 55 to 70% | Navigation 15 to 20%, dominant region, detail 20 to 35% | Ctrl+Alt+3 |

Switching a preset never loses work or changes data. It moves and sizes regions only.

## Docking

| Part | Rule |
| --- | --- |
| Drop zones | Left, right, top, bottom and tab-stack. Zones show an outline in `selectionIndicator` while dragging |
| Minimum size | 160 px wide and 96 px tall. A panel that would go smaller collapses instead |
| Snap | 8 px, and to neighboring edges |
| Splitters | An 8 px hit area around a 1 px `edge`. Arrow keys resize, Home and End set the limits |
| Keyboard | Alt+Arrow moves the focused panel to the next dock slot in that direction. Every drag has a command |
| Restore | The layout reloads at launch and after a crash. It is versioned, so an old layout never breaks a new release |
| Reset | “Reset layout” restores the current preset. It keeps all data and settings |

## Detached windows

- A detached window has its own title, status bar and one active-region rule.
- Position and size are remembered per monitor.
- If the saved monitor is gone, the window returns fully on screen on the primary monitor.
- Closing a detached window returns its panels to the main window.

## Density per view

Each view or window can use Compact, Comfortable or Touch. The choice persists per view. Density never changes inside one data list, because rows of different heights make scanning harder. Product defaults still follow [density per component](design-guidelines.md#density).

## Split views

- At most 4 splits per window.
- One view is active at a time. It shows the active-region rule and owns keyboard focus.
- Linked selection (select in one view, show in another) is off by default and has a labeled toggle.
- Each split has its own title and, where it matters, its own toolbar. Shared state goes in the window status bar.

## Check

- [ ] Every layout change works with the keyboard alone.
- [ ] Presets, reset and restore are palette commands.
- [ ] A missing monitor never hides a window.
- [ ] A layout saved by an older release loads without error.
