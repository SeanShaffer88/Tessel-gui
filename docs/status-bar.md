# Status bar

The status bar reports state that belongs to the window, in a fixed order, at the bottom edge. Values are the `statusBar` section of [tokens.json](tokens.json).

## Anatomy

| Part | Rule |
| --- | --- |
| Height | 24 px Compact, 28 px Comfortable |
| Fill and edge | `background` fill with a 1 px `edge` on top. Segments separate with `edge` |
| Text | Dense size (12 px). Numbers use tabular figures |
| Segments | At least 24 px tall. A segment with an action is a button with a visible inset focus ring and a tooltip |

## Segment order

Left to right. State that changes with the document sits on the left, app-wide state on the right.

1. **Workspace state:** mode, branch, connection
2. **Context:** file, folder, selection scope
3. **Selection:** count, size, cursor position (for example `Ln 8, Col 30`)
4. **Progress:** a ten-segment bar with the phase name while work runs
5. **Units or encoding:** units, zoom, encoding, line endings, indentation
6. **Notifications:** problem counts and the notification button

Drop segments from the middle of the list first when the window is narrow. Never wrap. The last segment stays.

## Rules

- Every value is readable text. A problem count shows an icon, a number and a label such as `0 errors, 0 warnings`.
- Status colors appear on the text only, never as a bar fill. The bar stays `background`.
- Do not animate segments. A changing value updates in place without moving its neighbors.
- A live region announces only important changes, such as a finished task or a new error. Not every cursor move.
- The shortcut hint bar (see [shortcuts](shortcuts.md)) may share the bar on its right side when there is room. It yields first.
