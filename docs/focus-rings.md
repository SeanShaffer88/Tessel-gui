# Focus rings

Every focusable element shows exactly one ring in the `focus` role. The machine-readable values are the `focusRing` section of [tokens.json](tokens.json).

## Two styles

| Style | Width | Offset | Placement | Use for |
| --- | --- | --- | --- | --- |
| `outline` | 3 px | 3 px | Outside the element | Buttons, fields, checkboxes, sliders, canvas handles |
| `inset` | 2 px | −2 px | Inside the element | Data rows, tree items, tabs, menu items, breadcrumb items, status segments |

Dense rows touch their neighbors, so an outside ring would be clipped or overlap the next row. The inset ring stays inside the row's own box. The width never drops below 2 px, which keeps the ring's area above the WCAG 2.2 focus appearance minimum for any element at least 24 px tall.

## Rules

- The ring is visible against the element and against the surface behind it. Check it on `background`, `surface`, `raised` and `selected` in every theme.
- A focused selected item shows two cues: the `selectionIndicator` marker and the ring. They differ by at least 1.3:1 so they never merge.
- The ring is never removed for pointer users on keyboard-operable controls. Use `:focus-visible` so a mouse click on a button does not draw it.
- Composite widgets (tab lists, trees, grids) keep one tab stop and move the ring with arrow keys.
- Forced colors: the ring uses `Highlight`. The generated CSS does this for you.
- High Contrast theme: the ring is yellow (`#FFD33D`), 3 px or 2 px, and reaches 7:1 on every surface.

## CSS

```css
:root { --focus-outline-width: 3px; --focus-outline-offset: 3px; --focus-inset-width: 2px; --focus-inset-offset: -2px; }
button:focus-visible, input:focus-visible { outline: var(--focus-outline-width) solid var(--focus); outline-offset: var(--focus-outline-offset); }
[role=row]:focus-visible, [role=treeitem]:focus-visible, [role=tab]:focus-visible { outline: var(--focus-inset-width) solid var(--focus); outline-offset: var(--focus-inset-offset); }
```

Native toolkits: use `FOCUS_OUTLINE`, `FOCUS_OFFSET` and `FOCUS_INSET_WIDTH` from [dist/tessel.rs](../dist/tessel.rs), or `VgFocusVisualThickness` in the XAML exports.
