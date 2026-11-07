# Changelog

Releases use [Semantic Versioning](https://semver.org/) for the documented token and interaction contracts. Design revisions identify guidance milestones.

## Unreleased

- Motion: `motion.duration` roles (hover 80, press 60, expand 160, drawer 180, toast 120 ms), `motion.easing` (`standard`, `exit`), `stagger`, `reducedDuration`, allowed and forbidden lists, `docs/motion.md`, exports for CSS, DTCG, XAML, Rust, Slint and Godot, and a token test.
- Typography: `caption` (11), `dense` (12) and `display` (32) sizes, line height per role, letter spacing, numeric rule, density roles, truncation rules, `docs/typography.md`, CSS font-size and line-height variables, other exports and a token test. Density now changes the type role of rows and controls; reading text stays at body size.

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
