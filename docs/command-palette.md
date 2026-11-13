# Command palette registry

The palette is the one place that lists everything a product can do. [Shortcuts](shortcuts.md) defines the key and the basic behavior. This page defines the registry behind it. Values are the `commandPalette` section of [tokens.json](tokens.json).

## The registry

Every command is a record. The palette, the menus, the toolbar and the shortcut hint bar all read from it, so they cannot disagree.

| Field | Rule |
| --- | --- |
| `id` | Stable dotted id such as `file.save`. Never changes between releases, so user bindings and recents survive |
| `label` | Verb first, sentence case, 2 to 5 words, no trailing punctuation: “Open folder”, “Toggle word wrap” |
| `category` | The menu or area it lives in: File, Edit, View, Go, Run, Help |
| `keywords` | Synonyms people search for: “close” for Quit, “preferences” for Settings |
| `shortcut` | The binding, or none. Two commands never share a binding |
| `enabled` | Whether it can run right now |
| `disabledReason` | Text that says why it cannot run: “Select a layer first” |
| `run` | The one function that does the work. Menus and buttons call this same function |

**Coverage rule.** Every command reachable from a menu, toolbar or shortcut is in the palette. A command missing from the palette is a defect. Tests can check this by diffing the registry against the menu definition.

## Matching and order

1. Exact label match, then prefix, then word-start (“sw” finds “Switch workspace”), then subsequence.
2. Case and diacritics are ignored.
3. With an empty query the palette shows the 8 most recent commands.
4. Recent commands rank above equal matches.

## Scopes

A one-character prefix narrows the list. The prefix stays visible in the field and Backspace removes it.

| Prefix | Searches |
| --- | --- |
| `>` | Commands (the default when there is no prefix) |
| `@` | Symbols in this document |
| `#` | Tags and labels |
| `/` | Files and folders |
| `:` | Go to line or position |
| `?` | Help topics |

Products enable only the scopes that make sense. They never reuse a prefix for another meaning.

## Layout and rows

| Part | Rule |
| --- | --- |
| Size | 560 px wide, at most 90% of the viewport, at least 320 px. Top center, 15% from the top |
| Rows | 8 visible, then scroll. Compact density |
| Row parts | Icon, label, category, shortcut |
| Matches | Matching letters are bold. Never color alone |
| Disabled | Muted label plus the reason in text. Disabled commands are never hidden, because people search for them |
| Keys | Up and Down move, Page Up and Page Down move 8, Enter runs, Esc closes, Ctrl+Enter shows where the command lives in the menus |

## Accessibility

- A modal dialog that contains a combobox and a listbox. The active result uses `aria-activedescendant` and focus stays in the field.
- After the user pauses typing for 300 ms, a polite live region announces the result count: “6 results”.
- Focus returns to the element that opened the palette.
- The palette never replaces a visible control. It complements them.

## Check

- [ ] The registry and the menus list the same commands.
- [ ] No two commands share a shortcut, and none collides with the [reserved and required sets](shortcuts.md).
- [ ] Every disabled command explains why.
- [ ] The palette opens from the keyboard and from a visible control.
