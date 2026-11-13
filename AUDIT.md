# Audit · revision 1, extended for 1.4.0

Design review of the standard before its first release, with the evidence. Method: read the README, guidelines, materials, tokens, mockups and demos; measured token contrast with WCAG relative luminance; rebuilt and tested the exports.

| # | Check | Result | Evidence |
| --- | --- | --- | --- |
| 1 | Primary action fill reaches 3:1 non-text contrast on every surface | Pass. Crimson `action` tokens at 3.09–3.43:1 on dark surfaces; deep accent limited to large tinted regions with a marker | `demo/tokens.test.mjs` |
| 2 | Structure does not rely on small luminance steps | Pass. `edge` token and 1 px borders at 1.4:1 or more; fills carry state | Tests |
| 3 | Density fits dense tools | Pass. Per-component density with 28 px compact rows and 24 px minimum targets | Tokens, tests |
| 4 | Presets recolor the whole accent set | Pass. Accent, primary action, selection and focus change together | Tests |
| 5 | Accent use is bounded | Pass. One crimson element per region | [Guidelines](docs/design-guidelines.md) |
| 6 | Standard is not tied to one product type | Pass. Layouts for eight categories plus six archetypes and an adaptation matrix | `docs/categories.md` |
| 7 | Multi-mode creative tools are covered | Pass. Modes, panels, value controls, timelines, Graphite preset, polish checklist | `docs/workspaces.md` |
| 8 | Lists of records read consistently | Pass. Gridlines, fixed header, selected-row bar, tested against edge and selection tokens | `docs/data-lists.md` |
| 9 | Licensing separates code from content | Pass. MIT for code and exports; CC BY 4.0 for documentation and images | `LICENSE-CODE` |

## Revision 2 additions (1.4.0)

| # | Check | Result | Evidence |
| --- | --- | --- | --- |
| 10 | Every theme defines every role | Pass. Dark, Light and High Contrast carry all 38 roles | `demo/extended.test.mjs` |
| 11 | High Contrast reaches 7:1 for text, status, selection and focus on every surface | Pass. The primary action uses a border instead of a 3:1 fill | Tests, `docs/materials.md` |
| 12 | New fills and syntax colors stay legible | Pass. Status text on fills, content on hover, pressed and strong selection, and syntax on all four surfaces | Tests |
| 13 | No key binding is claimed twice | Pass across shortcuts, layout presets and canvas zoom, with mode switching left free | Tests |
| 14 | Component and interaction specs have measurable values | Pass for focus rings, tables, navigation, status bar, states, command palette, layouts, canvas, undo and inline feedback | Tests |
| 15 | Packages match the source | Pass. npm and Rust packages are generated and compared in tests | `tools/build-tokens.mjs --check` |
| 16 | The contrast checker agrees with the tests | Pass. Its helper tests run every shipped theme and one failing edit | `demo/contrast/contrast.test.mjs` |

## Not done

- Protanopia and other color-vision simulation.
- Screen-reader, keyboard and zoom passes on the category demo.
- Real Windows high-contrast verification of the `HighContrast` XAML mapping and `Tessel.HighContrast.xaml`.
- Screen-reader and keyboard passes on the contrast checker.
- Publishing the npm package and the crate to their registries.
- Mockup canvas artwork was not recolored; the dark mockups were remapped by palette, so rare antialiasing pixels may differ from a fresh render.
