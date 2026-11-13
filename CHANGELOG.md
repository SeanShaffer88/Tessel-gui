# Changelog

Releases use [Semantic Versioning](https://semver.org/) for the documented token and interaction contracts. Design revisions identify guidance milestones.

## 2.0.0 · 2026-11-13

Design revision 3. Breaking: the default scheme is replaced (see [migration notes](docs/migration.md)).

- Scheme: a futuristic, minimal standard inspired by Tron Legacy and The Matrix. Dark charcoal surfaces — editor background `#1B1B1D`, surface `#1F1F22`, panels `#232326`, selected `#2A2A2F` — soft off-white text `#E6E3E1`, muted gray secondary text `#89868A`, and one deep, restrained Carmine accent `#960018`. The light theme keeps its surfaces and takes the Carmine family (brighter Carmine focus `#C8102E`).
- Carmine details: the primary action is a Carmine fill with a white label (9.09:1) and a 1px border rim; the active tab carries a thin Carmine underline; selected text is a soft gray highlight with a thin Carmine edge; the text cursor is off-white with a tiny Carmine cap; the near-black status bar carries muted labels and a small Carmine indicator; keyboard focus is a thin Carmine outline (2px, 2px offset).
- Contrast contract, stated plainly: Carmine indicators measure 1.89:1 on the background down to 1.38:1 on the strong selected fill, so a Carmine indicator is never the only cue (fill change, label, position or native state always pairs it). Dark muted text is 4.78:1 on the editor background and is scoped to short labels on raised and selected fills. Both rules are tokenized (`contrast.accentIndicatorRule`, `contrast.mutedRule`) and tested. The High Contrast theme is unchanged.
- Syntax: muted with moderate distinction — keyword `#72AAA5` (muted teal), string `#A3B58A` (subdued sage), punctuation and numbers `#B8AAA0` (warm gray), comment `#89868A`; the light set is the same families darkened.
- Grid: the fine square grid (`#28282B`, 24px cells) is now visible in empty areas and fades behind code. The revision 2 wood-grain texture is retired (swatch, demo option and test removed).
- Density: compact-first. The default density is Compact, navigation is a Compact class, and compact panel padding is 8.
- Typography: the monospace stack leads with the classic Consolas; the interface stays a clean modern sans-serif.
- Presets: Carmine is the new default preset. The revision 2 scheme remains available unchanged as the GitHub preset; Crimson, Blue, Teal and Graphite are unchanged. A missing or unknown preset ID now falls back to Carmine.
- Images: the dark and light mockups, the workspace and category captures and both slideshow GIFs were recolored to the revision 3 token values (the editor mockups' canvas artwork is unchanged). Fresh captures from the running demo are still the reference for exact rendering.

## 1.4.0 · 2026-11-13

Twenty-four enhancements. Additive: no existing role changes value (see [migration notes](docs/migration.md)).

- Themes and roles: a High Contrast theme (`data-theme="high-contrast"`, 7:1 text, yellow focus, WPF `Tessel.HighContrast.xaml`, Rust, Godot and Slint exports); 13 new roles in every theme (`selectedStrong`, `hover`, `pressed`, four status fills, disabled, read-only, text selection, two find roles); syntax colors; elevation levels and scrim; OKLab accent tints; a full forced-colors mapping.
- Contract: surface luminance steps are now per theme (`contrast.surfaceLuminanceStep`).
- Component specs: focus rings (outline and inset), dense tables, tabs, trees, breadcrumbs, status bar, and empty, loading, error and offline state templates with an example per category.
- Interaction specs: command palette registry, layout presets, docking and multiple views, infinite canvas, undo stack and undo toast, quiet inline feedback.
- Delivery: `packages/npm` and `packages/rust` (`tesselgui-tokens`, generated, CC BY 4.0 and MIT, not yet published); a live contrast checker at `demo/contrast/`; `docs/migration.md`.
- Images: the workspace and category captures were retaken from the demo; the dark and Graphite mockups were recolored to the 1.3.0 values and the dark slideshow GIF rebuilt. Light assets are unchanged.
- Tests: 51 tests (up from 26), including per-theme contrast for every new role, binding-collision checks across shortcuts, layouts and canvas, and generated-package parity.

## 1.3.0 · 2026-11-13

- Color: the dark theme now matches GitHub Dark High Contrast as shown in VS Code. Background `#010409`, surface `#0A0C10`, raised `#191C20`, selected `#272B33`, text `#F0F3F6` / `#BDC4CC`, edge and border `#7A828E`, selection `#409EFF`, focus `#71B7FF`, warning `#F0B72F`, grid `#0F1318`. Light theme and the Blue, Teal and Graphite presets are unchanged.
- Contract: the dark surface luminance step is now 5%–300% (`contrast.darkSurfaceRelativeLuminanceStep`), because the high-contrast scheme separates compartments with edges. The Crimson preset's dark selection marker is `#DD294B` so it keeps 3:1 on the selected fill.
- Wood grain swatch and the measured palette contract in `docs/materials.md` are recomputed. Static mockup images still show revision 2 colors.

## 1.2.1 · 2026-11-10

- Images: every README image now shows design revision 2. The workspace and category-layout images were recaptured from the live demo; the dark, light and Graphite mockups were recolored to the exact revision 2 token values (the editor mockups' canvas artwork is unchanged); both slideshow GIFs were rebuilt from the new images.
- Name: the demo headers and the site heading now use the full name TesselGUI. No page or image carries the project's former name.

## 1.2.0 · 2026-11-10

Design revision 2. The default color scheme changes from Crimson on charcoal to GitHub Dark.

- Color: the dark theme uses GitHub Dark values — `#0D1117` background with surface steps of 5–10% relative luminance, `#F0F6FC` / `#9198A1` text, `#3D444D` edges, GitHub blue selection (`#2F81F7`) and focus (`#79B8FF`), the GitHub green family for the primary action (`#1A7F37` rest, `#238636` hover, `#116329` pressed, one step darker at rest so the white label keeps its 5:1 target), and GitHub status colors (`#3FB950`, `#D29922`, `#FFA198`, `#A5D6FF`). The light theme keeps its surfaces and takes the GitHub Light accent family (`#0550AE` deep accent and focus, `#0969DA` selection, the same greens).
- Presets: GitHub is the new default preset. The revision 1 scheme remains available unchanged as the Crimson preset; Blue, Teal and Graphite are unchanged. A missing or unknown preset ID now falls back to GitHub instead of Crimson; stored `crimson` preferences stay valid.
- Docs and demos describe and use the new scheme, the deep-accent and wood-grain swatches are re-drawn in it, and the measured palette contract in `docs/materials.md` is recomputed. The static mockup images under `assets/mockups/` still show revision 1 colors and are queued for recapture.

## 1.1.0 · 2026-11-07

- Motion: `motion.duration` roles (hover 80, press 60, expand 160, drawer 180, toast 120 ms), `motion.easing` (`standard`, `exit`), `stagger`, `reducedDuration`, allowed and forbidden lists, `docs/motion.md`, exports for CSS, DTCG, XAML, Rust, Slint and Godot, and a token test.
- Typography: `caption` (11), `dense` (12) and `display` (32) sizes, line height per role, letter spacing, numeric rule, density roles, truncation rules, `docs/typography.md`, CSS font-size and line-height variables, other exports and a token test. Density now changes the type role of rows and controls; reading text stays at body size.
- Shortcuts: `shortcuts` token section (reserved keys, required set, per-platform bindings, never-override list, hint bar, palette rules), `docs/shortcuts.md`, DTCG export and a test that bindings are unique per platform.
- Feedback patterns: `feedback` token section (severity to color role with icon and text, placement, toast, confirmation, error anatomy, progress), `docs/feedback.md`, DTCG export and a test that every severity reaches 4.5:1 on every surface in both themes.

## 1.0.0 · 2026-11-07

Revision 1. First release of the TesselGUI design standard.

### Included

- Design tokens in one source (`docs/tokens.json`) with generated exports: CSS custom properties, DTCG JSON, XAML (dark, light, high contrast), WPF, Rust, Slint and Godot. `tools/build-tokens.mjs --check` verifies they are current.
- Color roles: `bg`, `surface`, `raised`, `selected`, `fg`, `muted`, `edge` (structure, at least 1.4:1), `border`, crimson `action` with `actionForeground`, `selectionIndicator`, `focus`, `grid` and `surround`.
- Presets: Crimson, Blue, Teal and Graphite (neutral, for color-critical work). Presets recolor accent, primary action, selection and focus together.
- Per-component density (`density.perClass`), with compact 28 px data rows.
- Layout rules: fit rule, "Fill, no dead space" (`fill` tokens) and "Data lists are gridded" (`dataList` tokens: row and column gridlines in `edge`, fixed header, selected-row bar).
- Signature grid motif: 24 px empty-state grid, ten-segment determinate progress and a 2 px active-region rule. Optional soft wood-grain background texture.
- Workspace patterns: modes, panels, value controls, timelines and tabular figures (`docs/workspaces.md`, `docs/polish.md`).
- Category layouts for eight product types and six further archetypes (`docs/categories.md`, `docs/rationale.md`), with an adaptation matrix.
- Eight application mockups for the README slideshow, plus light-theme and Graphite sets.
- Documentation: `docs/quick-reference.md`, `docs/design-guidelines.md`, `docs/data-lists.md`, `docs/adoption.md`, `docs/decisions.md`, `AUDIT.md`, `CREDITS.md`, `DESCRIPTION.md`.
- Reference demos with standard-library tests; token tests cover contrast, edge and grid ranges, preset action contrast, density, and fill and data-list consistency.
- Licenses: MIT for code and generated exports, CC BY 4.0 for documentation and images.
