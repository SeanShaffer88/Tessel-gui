# Revision 3 materials

Opaque matte compartments use three dark-charcoal surface levels. The editor background uses `--surface-1` (`#1B1B1D`), structural panels use `--surface-2`, and raised surfaces and row hover use `--surface-3` (`#232326`). Selected rows, the current navigation item and secondary control hover use `--surface-4` (`selected`). The levels step gently (about 25% and 22% relative luminance), and the 1px `--edge` border (`#43434A`) carries structure as well. A 1px `--edge` border separates compartments and table rows. Fine rims and shallow field insets keep the tactile treatment. [Reusable CSS tokens](../demo/tokens.css) · [Machine-readable values](tokens.json)

The primary action is a Carmine fill in the default scheme (`--action`, `#960018`) with a white label (`--action-foreground`). A lighter hover fill and a deeper pressed fill show feedback while keeping the control in place. The deep fill is bounded by a 1px rim in `--border`, so it never relies on fill-to-surface contrast alone; in the light theme it also reaches 3:1 against every surface. Secondary controls use `--raised` with a `--border`. Disabled controls use Surface, a muted label and a dashed boundary. Focus and selection use dedicated indicators. Error, warning, success and information keep their own semantic colors and labels.

Body typography starts at 16 CSS pixels under default browser settings and follows user font sizing. Smaller labels and metadata retain their contrast. Grouped controls default to 8px gaps with a 6px minimum. Narrow layouts and coarse pointers use a 44 by 44px minimum for standalone interactive controls and their clickable labels. The reference keeps the 180ms drawer entrance and limits nonessential transitions to 200ms. Reduced-motion and forced-color preferences use the browser's corresponding modes.

## Accent roles

<img src="../assets/tessel-accent.svg" alt="Deep accent: Carmine #960018 in both themes" width="96" height="32">

The accent system plays four roles. In revision 3 they share one color family — Carmine — and are told apart by geometry and pairing, not by hue.

| Role | CSS token | Dark | Light | Application |
| --- | --- | --- | --- | --- |
| Primary action | `--action` · `--action-hover` · `--action-pressed` | `#960018` · `#A81226` · `#7E0014` | `#960018` · `#7E0014` · `#660011` | The one primary action in a view. Label in `--action-foreground` (`#FFFFFF`, 9.09:1 at rest). The dark fill carries a 1px `--border` rim; the light fill reaches 3:1 on every surface on its own |
| Deep accent | `--accent` | `#960018` | `#960018` | Large tinted regions, such as a selected row band. Always with a marker and a label. Label in `--accent-foreground` measures 7.12:1 (dark) and 9.09:1 (light) |
| Selection | `--selection-indicator` | `#960018` | `#960018` | Thin Carmine edge on the selected item, the active-tab underline and the active-region rule. In the dark theme it is never the only cue: the fill also changes |
| Focus | `--focus` | `#960018` | `#C8102E` | Thin Carmine outline with a 2px offset in the dark theme; a brighter Carmine in the light theme |

Use at most one accent element per region. Do not use the brand accent for data series, syntax colors or decoration.

### Other roles

| Role | CSS token | Dark | Light | Application |
| --- | --- | --- | --- | --- |
| Edge | `--edge` | `#43434A` | `#B8B8BD` | 1px compartment and table borders |
| Control boundary | `--border` | `#76767C` | `#676772` | Fields and secondary buttons; also the rim on the dark primary action |
| Viewport surround | `--surround` | `#191919` | `#D6D6D6` | Neutral, chroma-free surround for color-critical viewports, and the near-black status bar fill. Text stays legible on it |
| Grid | `--grid` | `#28282B` | `#F2F2F5` | Fine square grid lines: empty areas, canvases, fading behind code |
| Error | `--danger` | `#E8939F` | `#960018` | A labeled error with the affected input and next action |
| Warning | `--warning` | `#C9A86A` | `#6B4A00` | A named warning with the required action |
| Success | `--success` | `#A3B58A` | `#3C5A2E` | A labeled completion or recovery result |
| Information | `--info` | `#72AAA5` | `#1F4E4A` | An explanatory label or message; the muted teal of syntax keywords |

### Appearance presets

Keep theme and accent color as independent choices. A preset recolors the deep accent, the primary action, the selection marker and the focus outline together, so a Blue or Teal product has no Carmine buttons. Carmine uses the base theme values. The GitHub preset keeps the revision 2 scheme. Graphite is a neutral preset for color-critical work: its action, selection, focus and accent carry no visible tint. Semantic colors, edges and surfaces do not change.
| Preset | Dark action | Dark selection | Dark focus | Light action | Light selection | Light focus |
| --- | --- | --- | --- | --- | --- | --- |
| Carmine (default) | `#960018` | `#960018` | `#960018` | `#960018` | `#960018` | `#C8102E` |
| GitHub | `#1A7F37` | `#409EFF` | `#71B7FF` | `#1A7F37` | `#0969DA` | `#0550AE` |
| Crimson | `#D02946` | `#DD294B` | `#FF4D73` | `#B40234` | `#9E1534` | `#D61F45` |
| Blue | `#036DCD` | `#5FA8FF` | `#ACD1FF` | `#0059AA` | `#1558A6` | `#327AD1` |
| Teal | `#027B74` | `#37B7AF` | `#8FE4D9` | `#08645E` | `#00665F` | `#13877F` |
| Graphite | `#6D6D74` | `#94949C` | `#DCDCE3` | `#585860` | `#585860` | `#75757D` |

Web consumers set `data-accent` on the document root alongside `data-theme`. The generated CSS resolves Light, Dark and System and uses `Highlight` for both cues in forced colors. Native consumers keep the base dark and light palette API and apply the preset overrides for the effective theme. Store a validated preset ID and fall back to Carmine when it is missing or unknown. Alternate sRGB values are in `color.accentPresets` in the [generated DTCG JSON](../dist/tessel.tokens.json) and as sRGB and OKLCH in the [source tokens](tokens.json).

### State and editing roles

These roles carry the states that need more than `selected`. Columns: Dark, Light, High Contrast.

| Role | CSS token | Dark | Light | High Contrast | Application |
| --- | --- | --- | --- | --- | --- |
| Strong selection | `--selected-strong` | `#33333A` | `#CACAD3` | `#3D444D` | Explorer-style selected row when the list has focus elsewhere, and the active item in a tree |
| Hover | `--hover` | `#28282D` | `#D5D5DD` | `#20242B` | Secondary control and row hover |
| Pressed | `--pressed` | `#2E2E34` | `#C9C9D3` | `#2E333B` | Secondary control while pressed |
| Info fill | `--info-fill` | `#1C2B29` | `#CDE3E0` | `#0C2D6B` | Banner or tag behind `info` text |
| Warning fill | `--warning-fill` | `#2E2617` | `#F0E3BC` | `#3A2A00` | Banner or tag behind `warning` text |
| Success fill | `--success-fill` | `#222B1D` | `#DCE8D2` | `#0A3318` | Banner or tag behind `success` text |
| Error fill | `--danger-fill` | `#3B1B22` | `#F3D9DD` | `#4C1A1A` | Banner or tag behind `danger` text |
| Disabled label | `--disabled-foreground` | `#89868A` | `#7E7E8A` | `#9EA7B3` | Label of a disabled control. At least 3:1 on its fill; WCAG exempts disabled controls |
| Disabled fill | `--disabled-fill` | `#1B1B1D` | `#F2F2F5` | `#0A0C10` | Fill of a disabled control, with a dashed `border` |
| Read-only fill | `--read-only-fill` | `#232326` | `#F4F4F7` | `#11151B` | Fields that show a value but cannot be edited |
| Text selection | `--text-selection` | `#3F3F46` | `#E3C8CC` | `#1F4E8F` | Selected text: a soft gray highlight with a thin Carmine edge. `foreground` stays 4.5:1 on it |
| Find match | `--find-match` | `#4A3E24` | `#FFE97A` | `#5C4A00` | Every match of a find or search |
| Active find match | `--find-match-active` | `#63552F` | `#FFD33D` | `#8A5B00` | The current match |

Status fills pair with their text role: `info` on `infoFill`, `warning` on `warningFill`, `success` on `successFill` and `danger` on `dangerFill`, each at least 4.5:1 (tested). A banner still needs an icon and a label.

## High Contrast theme

A fourth theme for low vision, bright rooms and long sessions. It keeps the dark surfaces and raises everything else: text is `#FFFFFF` and `#F0F3F6`, borders are `#F0F3F6`, edges are `#9EA7B3` (at least 5:1), the selection marker is `#79C0FF`, focus is `#FFD33D`, and every text, status, selection and focus color reaches 7:1 on every surface. Set `data-theme="high-contrast"`. Operating-system contrast themes still win: in forced colors every role maps to a system color.

The primary action cannot reach 7:1 for its label and 3:1 for its fill on black at once, so in High Contrast it keeps a deep green fill (`#0A5A23`, label 8.4:1) and gains a 2px `border` outline. The deep accent is `#0A2A5E`. High Contrast has no OKLCH encoding and reuses the dark syntax colors, which reach 4.5:1 on its background and surface.

## Syntax colors

Code and log text has its own set so it never borrows the brand accent or a status color by accident. Roles: `keyword`, `string`, `function`, `constant`, `comment`, `variable`, `tag`, `typeName`. Revision 3 syntax is muted with moderate distinction, drawn from the interface palette: dark keyword `#72AAA5` (muted teal), string `#A3B58A` (subdued sage), function `#CFC4B8`, constant `#B8AAA0` (warm gray, also punctuation and numbers), comment `#89868A` (the secondary text color), variable `#A8C0B8`, tag `#8FAE94`, type name `#B5C4A8`. Light values are the same families darkened: `#2F6F6A`, `#4C6B3C`, `#6E6259`, `#8A5A13`, `#6A686E`, `#7A5230`, `#3F7057`, `#556B47`. Each reaches 4.5:1 on the editor background and surface, where code renders. The text cursor is an off-white line with a tiny Carmine cap. CSS: `--syntax-keyword` and so on.

## Elevation

Floating layers use a fill, a 1px edge and a shadow. The shadow adds depth but never replaces the edge.

| Level | Fill | Edge | Dark shadow | Light shadow | Use |
| --- | --- | --- | --- | --- | --- |
| Popup (z 100) | `raised` | `edge` | `0 4px 8px #0006` | `0 4px 8px #0000001F` | Menus, dropdowns, context menus |
| Tooltip (z 200) | `selected` | `border` | `0 2px 6px #0006` | `0 2px 6px #0000001F` | Tooltips and hints |
| Dialog (z 300) | `raised` | `border` | `0 8px 24px #000A` | `0 8px 24px #00000033` | Modal dialogs and sheets |

A modal dialog sits on a scrim (`--scrim`: `#000000B3` dark, `#00000066` light). CSS: `--elevation-popup`, `--elevation-tooltip`, `--elevation-dialog`.

## Accent tints

Quiet region fills come from mixing an accent into the background in OKLab at 8%, 16% and 24%: `--selection-indicator-tint-1..3` and `--action-tint-1..3`. A tint is a fill, never a label color. Body text on every tint stays at least 4.5:1 in all three themes (tested). The DTCG export lists the computed hex values.

## Grid signature

The grid is a static, quiet motif that appears in three places:

| Where | Spec |
| --- | --- |
| Empty areas and canvases | 24 px square cells, 1px lines in `--grid`, fully visible in empty areas |
| Determinate progress | Ten equal segments with a gap between them. Indeterminate progress uses a moving segment and becomes static under reduced motion |
| Active-region rule | A 2px `--selection-indicator` line under the focused compartment's header. One per window |

Behind code and dense content the grid fades to a whisper instead of disappearing; it is never drawn behind body text the user must read at length. `--grid` stays within 1.04–1.3:1 of the background, surface and raised surfaces. Text, selection markers, focus outlines and control boundaries drawn over it keep their normal contrast, subject to the Carmine indicator rule. Forced colors and reduced-motion modes remove the pattern and keep the status text.

## Background texture

The fine square grid is the only background texture in revision 3. The wood-grain texture from revision 2 is retired: its swatch, its demo option and its contrast test are removed. Workspaces that used the wood grain use the grid (or the flat background) instead.

## Measured palette contract

The dark Background, Surface, and Raised OKLCH lightness values are 0.223, 0.241, and 0.257, with very low chroma (under 0.006). Their linear-sRGB relative luminance rises by about 25% and 22% — revision 3 separates compartments mainly with 1px edges, so the documented dark step range is 15% to 40%. The high-contrast scheme keeps its own range (150% to 300%). [CSS Color 4 conversion method](https://www.w3.org/TR/css-color/#color-conversion-code)

| Checked pairing | Dark minimum | Light minimum |
| --- | ---: | ---: |
| Body text on four surfaces | 11.18:1 | 12.02:1 |
| Muted labels on the background and surface | 4.57:1 | 6.81:1 |
| Muted labels on raised and selected fills (short labels only) | 3.97:1 | 5.89:1 |
| Semantic labels on four surfaces | 5.45:1 | 5.77:1 |
| Primary label at rest and pressed (hover) | 9.09:1 (7.56:1) | 9.09:1 (11.07:1) |
| Carmine indicators on four surfaces, including the selected fill | 1.57:1 | 4.35:1 (focus) |
| Primary fill against background, surface and raised | 1.72:1, bounded by its border rim | 7.17:1 |
| Control boundary on surfaces | 3.16:1 | 4.13:1 |
| Edge against background, surface and raised | 1.60:1 | 1.56:1 |
| Selection indicator on four surfaces, including the selected fill | 1.57:1 | 6.73:1 |

The Carmine rows are the revision 3 trade-off, stated plainly: deep Carmine is restrained on near-black, so a Carmine indicator is never the only cue (see the accent indicator rule in [tokens.json](tokens.json)). Every text pairing keeps its AA target, and the High Contrast theme keeps 7:1 throughout.

Fills that mean different states must also differ from each other. These are fill-to-fill ratios, so they support recognition rather than replace boundaries, markers and labels.

| Distinctness check | Dark | Light | Minimum |
| --- | ---: | ---: | ---: |
| Selected fill against Surface | 1.15:1 | 1.35:1 | 1.10:1 |
| Primary action hover against rest | 1.20:1 | 1.22:1 | 1.05:1 |
| Primary action pressed against rest | 1.22:1 | 1.47:1 | 1.05:1 |
| Grid against surfaces (range) | 1.07–1.17:1 | 1.05–1.13:1 | 1.04–1.30:1 |
| Focus against selection indicator | 1.00:1 — the same Carmine by design; the two cues differ by geometry (outline around the control, bar or underline on the item) | 1.55:1 | 1.30:1 in the light theme; by design in the dark theme |

Figures are rounded for display. `node --test demo/tokens.test.mjs` compares unrounded ratios in both encodings, checks CSS and JSON agreement, validates the dark surface steps, and enforces the distinctness minimums. `node tools/build-tokens.mjs --check` confirms that generated outputs match `tokens.json`. [W3C non-text contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast)
