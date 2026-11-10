# Changelog

Releases use [Semantic Versioning](https://semver.org/) for the documented token and interaction contracts. Design revisions identify guidance milestones.

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
