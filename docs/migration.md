# Migration notes

What changed for consumers of the tokens, and how to update. Releases are listed newest first. [Changelog](../CHANGELOG.md).

## 1.3.0 → 1.4.0

Additive. No existing role changes value. Regenerate your exports and adopt what you need.

| Change | Action |
| --- | --- |
| 13 new roles in every theme: `selectedStrong`, `hover`, `pressed`, `infoFill`, `warningFill`, `successFill`, `dangerFill`, `disabledForeground`, `disabledFill`, `readOnlyFill`, `textSelection`, `findMatch`, `findMatchActive` | Use them in place of ad hoc hex values for hover, banners, disabled controls, read-only fields, text selection and find highlights |
| New High Contrast theme | Set `data-theme="high-contrast"`, `Tessel.high-contrast` (Slint), `HIGH_CONTRAST` (Rust, Godot) or merge `Tessel.HighContrast.xaml` (WPF) |
| New `syntax` colors | Replace editor theme colors with `--syntax-*` or `SYNTAX_DARK` and `SYNTAX_LIGHT` |
| New `elevation` levels | Style menus, tooltips and dialogs with `--elevation-popup`, `--elevation-tooltip`, `--elevation-dialog` and `--scrim` |
| New accent tints | Use `--selection-indicator-tint-1..3` and `--action-tint-1..3` for quiet region fills. Text on them stays at least 4.5:1 |
| Surface luminance rule | The contract is now per theme (`contrast.surfaceLuminanceStep`). Dark and High Contrast steps are 1.5× to 3× |
| Forced colors | The CSS now maps every role to a system color |
| Component specs | New `focusRing`, `table`, `navigation`, `statusBar` and `states` sections. See [focus rings](focus-rings.md), [data lists](data-lists.md#dense-tables), [navigation](navigation.md), [status bar](status-bar.md) and [states](states.md) |
| Interaction specs | New `commandPalette`, `layouts`, `canvas`, `undo` and `inlineFeedback` sections. See [command palette registry](command-palette.md), [layouts](layouts.md), [canvas](canvas.md) and [undo and inline feedback](undo-and-feedback.md). Check new bindings against the reserved set: layout presets use Ctrl+Alt+1 to 3, canvas fit uses Shift+1 and Shift+2 |
| Packages | `packages/npm` (`tesselgui-tokens`) and `packages/rust` (`tesselgui-tokens`) hold the same generated files with both licenses. Not yet published to a registry |

## 1.2.x → 1.3.0

The dark theme moved to GitHub Dark High Contrast values. Every dark surface, text and edge color changed, so replace hard-coded dark hex values.

| Role | 1.2.x | 1.3.0 |
| --- | --- | --- |
| `background` | `#0D1117` | `#010409` |
| `surface` | `#0E1218` | `#0A0C10` |
| `raised` | `#0F1319` | `#191C20` |
| `selected` | `#1F2630` | `#272B33` |
| `foreground` | `#F0F6FC` | `#F0F3F6` |
| `muted`, `progress` | `#9198A1` | `#BDC4CC` |
| `border` | `#848D97` | `#7A828E` |
| `edge` | `#3D444D` | `#7A828E` |
| `selectionIndicator` | `#2F81F7` | `#409EFF` |
| `focus` | `#79B8FF` | `#71B7FF` |
| `warning` | `#D29922` | `#F0B72F` |
| `grid` | `#1C2128` | `#0F1318` |
| `materialRim` | `#484F58` | `#3D444D` |
| `materialShade` | `#010409` | `#010409` |

Also: the Crimson preset's dark `selectionIndicator` changed from `#DC2749` to `#DD294B`. Surfaces now step 1.5× to 3× in luminance instead of 5–10%, so compartments rely on the 4.4:1 `edge` rather than on fill. Light theme and the Blue, Teal and Graphite presets are unchanged.

## 1.1.x → 1.2.0 (revision 2)

The default scheme changed from Crimson on charcoal to GitHub Dark. Set `data-accent="crimson"` to keep the old accent. A missing or unknown preset ID now falls back to GitHub.

## How to update a project

1. Regenerate or copy the exports you use from [`dist/`](../dist/) or the packages.
2. Search the project for the old hex values in the tables above and replace them with roles.
3. Run your contrast check on every surface in each theme you ship. The [contrast checker](../demo/contrast/) shows ratios live.
4. Recapture screenshots. Stored images keep the colors they were taken with.
