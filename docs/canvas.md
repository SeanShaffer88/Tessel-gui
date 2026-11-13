# Infinite canvas and spatial layouts

For whiteboards, node editors, CAD sheets, maps and large timelines. The chrome follows the usual rules. The viewport is the exception: it may use depth and its own palette. Values are the `canvas` section of [tokens.json](tokens.json).

## Chrome stays flat and fixed

Toolbars, panels, rulers and the status bar never move with the content. Only the viewport pans and zooms. Keep one active-region rule on the window and let the canvas show its empty state on the 24 px signature grid. For color-critical canvases use the neutral `surround`, as in [workspaces](workspaces.md).

## Zoom

| Part | Rule |
| --- | --- |
| Stops | 5, 10, 25, 50, 100, 200, 400, 800, 1600 and 3200%. Default 100% |
| Keys | Ctrl+= in, Ctrl+- out, Ctrl+0 actual size, Shift+1 fit all, Shift+2 fit selection |
| Pointer | Ctrl+Wheel zooms around the pointer. Pinch works the same way. Plain wheel pans |
| Readout | The zoom level shows as text in the status bar and accepts typed entry |
| Motion | A zoom change animates for at most 120 ms. With reduced motion it is instant |

## Pan

- Space+drag, middle-button drag or the Pan tool.
- Arrow keys pan by 40 px. Shift pans by 200 px.
- There are no hard bounds. Home returns to the content, so people never get lost.
- No inertia. The canvas stops when the pointer stops.

## Grid and snapping

The snap cell is 24 px, the same cell as the signature grid, so an object that snaps on the canvas lines up with the empty-state grid. Toggle snapping with Ctrl+'. The grid hides when a cell would be narrower than 8 screen pixels. Lines use the `grid` role.

## Minimap

A 160 × 120 px overview in the bottom-right corner. It is a real control: it can take focus, arrow keys move the viewport, and it has a text alternative such as “Viewing 12% of the canvas, centered at x 340, y 120”.

## Objects

| Part | Rule |
| --- | --- |
| Handles | 8 px visible, 24 × 24 px hit target, always the same screen size at every zoom |
| Move | Arrow keys move by 1 unit, Shift by the snap size |
| Selection | Drag on empty canvas to marquee. Shift+Click adds. Ctrl+A selects all. A 2 px `selectionIndicator` outline marks the selection |
| Focus | The outline [focus ring](focus-rings.md), distinct from the selection outline |
| Text | Labels scale with the content but never render below the 11 px caption size on screen. Below that, show a count or an icon instead |

## Accessibility

- Every drag has a keyboard path: move, resize, connect, reorder, zoom and pan.
- An object list panel lists every object in reading order. It is reachable with Tab and the arrow keys and stays in sync with the selection.
- Selection, moves and zoom changes are announced as text.
- Provide a table or outline alternative for dense diagrams, as in the [monitoring archetype](categories.md).

## Check

- [ ] The viewport never moves toolbars or panels.
- [ ] Zoom, pan, snap and selection all work from the keyboard.
- [ ] No handle is smaller than 24 px to hit.
- [ ] Text stays legible at the lowest zoom stop that still shows it.
