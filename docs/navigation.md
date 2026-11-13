# Tabs, trees and breadcrumbs

Navigation controls reuse the same tokens as everything else. Values live in the `navigation` section of [tokens.json](tokens.json). All three use the inset [focus ring](focus-rings.md) and Compact density, because they repeat many times in a view.

## Tabs

| Part | Rule |
| --- | --- |
| Height | 32 px |
| Width | 96 px minimum, 240 px maximum. Titles truncate in the middle for file names |
| Active tab | `surface` fill and a thin 2 px Carmine underline (bottom rule in `selectionIndicator`). Inactive tabs use `background` |
| Hover | `hover` fill. Pressed uses `pressed` |
| Close button | 24 × 24 px target, visible on the active and hovered tab, always reachable by keyboard (Ctrl/⌘+W) |
| Overflow | Scroll the strip and add a list-all-tabs menu at the end. Never shrink tabs below the minimum |
| Keys | Ctrl+Tab and Ctrl+Shift+Tab move between tabs. Arrow keys move inside the strip. Home and End jump |
| Dirty or pinned | An icon plus a text label in the accessible name. Color alone never marks state |

One active-region rule per window. If the tab rule and the active compartment rule would both show, the compartment rule wins and the tab uses a fill change only.

## Trees

| Part | Rule |
| --- | --- |
| Row | Compact (28 px) with a 16 px chevron and 16 px indent per level |
| Selected | `selected` fill and a 3 px `selectionIndicator` bar on the leading edge |
| Keys | Right expands or moves into the first child, Left collapses or moves to the parent, Home and End jump, typing jumps by name |
| Roles | `tree`, `treeitem`, `group`. Expose level, set size and position, and `aria-expanded` |
| Large trees | Virtualize. Keep the selected item visible after a filter |
| Drag | Every drag has a keyboard command (cut and paste, or Move to…) |

## Breadcrumbs

| Part | Rule |
| --- | --- |
| Height | 28 px, items at least 24 px tall |
| Separator | A chevron icon that is hidden from screen readers |
| Length | Show at most 5 items. Middle items collapse into an overflow menu. The first and last two stay visible |
| Current item | Plain text with `aria-current="page"`, not a link |
| Keys | Tab moves between items. Enter follows. The overflow menu opens with Enter or Down |

## Not navigation

Toolbars, option lists and menus are not tab strips. Use plain rows with the selected-row marker. See [data lists](data-lists.md#not-a-data-list).
