# Typography

System fonts only. No font files ship with the standard. Numbers live in [`tokens.json`](tokens.json) under `type`.

## Stacks

| Role | Stack |
| --- | --- |
| Sans | Segoe UI, `system-ui`, sans-serif |
| Mono | Cascadia Mono, Consolas, monospace |

Monospace is for code, timecodes and aligned technical values only.

## Scale

| Role | Size | Line height | Use |
| --- | --- | --- | --- |
| `caption` | 11 | 1.25 | Secondary metadata, status-bar hints. Never the only carrier of meaning |
| `dense` | 12 | 1.2 | Data rows and tree nodes in Compact density |
| `label` | 13 | 1.25 | Controls, labels, tabs |
| `body` | 16 | 1.5 | Reading text, dialogs, descriptions |
| `section` | 18 | 1.2 | Section headings |
| `title` | 24 | 1.2 | Page and dialog titles |
| `display` | 32 | 1.2 | Empty states and start pages only |

Sizes are CSS-pixel equivalents at the default text size and follow user scaling. Weights: regular 400, emphasis 600. Hierarchy comes from size, weight and placement before color.

## Letter spacing

Body and labels use 0. All-caps labels use `+0.02em`. Do not track lowercase text.

## Size by density

Spacing always follows density. Type follows density only for rows and controls, so a Compact data row reads at `dense` and a Touch row at `body`. Reading text stays at `body` in every density.

| Density | Row text | Control text |
| --- | --- | --- |
| Compact | `dense` (12) | `label` (13) |
| Comfortable | `label` (13) | `label` (13) |
| Touch | `body` (16) | `body` (16) |

## Numbers

Use tabular figures wherever digits line up or change in place (tables, counters, timecodes, progress). Right-align numeric columns. Monospace is optional when tabular figures are unavailable.

## Truncation and wrapping

- Labels and body text wrap. Do not truncate them.
- Data cells truncate on one line with an end ellipsis. The full text is available in a tooltip and in the accessible name.
- Paths use a middle ellipsis that keeps the file name.
- Never shrink type to avoid truncating.

## Check

- [ ] No text below `caption`; essential information is at `dense` or larger.
- [ ] Digits that update in place use tabular figures.
- [ ] Truncated text has a full-text tooltip and accessible name.
- [ ] Text still fits at 200% text scale.
