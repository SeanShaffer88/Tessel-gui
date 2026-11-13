# Verification record · revision 2 (updated for 1.4.0)

## Verification

Revision 2 targets WCAG 2.2 AA. This section records what ran and what did not. Evidence labels: Verified, Partially verified, Unverified.

### Local results

- **Verified (1.4.0).** `node --test` passes 51 tests, including per-theme contrast for the High Contrast theme and every new role, binding-collision checks and package parity. `node tools/build-tokens.mjs --check` reports outputs current. The Rust export and the generated crate compile. All four XAML exports parse. The contrast checker loads in headless Chrome and reports all 64 Dark checks passing. The workspace and category images were retaken from the demo in headless Chrome and the recolored mockups were inspected by eye.

- **Verified.** For revision 2, `node --test` passes, including the token contrast checks in both encodings, per-preset action and accent contrast (now including the Crimson preset against the GitHub surfaces), and the demo state checks. `node tools/build-tokens.mjs --check` reports outputs current. The Rust export compiles with `rustc --edition 2021 --crate-type lib`. All XAML exports parse as well-formed XML. The Chrome reference check runs in CI.
- **Verified.** The README images match revision 2: the workspace (1440 × 1000) and category-layout captures were retaken from the demo in headless Chrome and inspected by eye; the mockup sets were recolored to the exact token values with a palette mapping that leaves non-token pixels (the editor mockups' canvas artwork) untouched, confirmed by a zero count of revision 1 palette colors in the results; both slideshow GIFs were rebuilt from the new frames at the same size, frame order and timing.
- **Verified (revision 1).** `node --test` ran 18 tests with 0 failures, including new checks for primary label contrast, 3:1 primary fill against every surface, edge and grid ranges, per-preset action and accent contrast, and the Per component density default. `node tools/build-tokens.mjs --check` reported outputs current. The Rust export compiled with `rustc --edition 2021 --crate-type lib`. All XAML exports parsed as well-formed XML. JavaScript syntax checks and a relative-link check of the Markdown files passed.
- **Verified (revision 1).** `node tools/verify-reference.mjs` against a staged site in Chrome 153 passed its compact layout, resize, keyboard, review, recovery, texture and offline checks for the PortableForge reference after its primary buttons moved to the crimson action tokens.
- **Partially verified.** Screenshots of the reference workspace and the eight category layouts were captured in headless Chrome in the dark and light themes and inspected by eye. This shows rendering, not keyboard or assistive-technology behavior.

### Measured contrast (WCAG relative luminance, unrounded in tests)

| Pairing | Dark | Light |
| --- | ---: | ---: |
| `actionForeground` on action, hover, pressed | 5.08, 4.63, 7.39 | 5.08, 4.63, 7.39 |
| Action and hover against background, surface, raised (minimum) | 3.67 | 3.65 |
| Edge against background, surface, raised (minimum) | 1.89 | 1.56 |
| Grid against surfaces | 1.15–1.17 | 1.05–1.13 |
| Foreground and muted text on grid | 14.87, 5.56 | 14.54, 7.12 |
| Selection indicator on grid | 4.32 | 4.65 |
| Focus on grid | 7.79 | 6.80 |
| Deep accent label (`accentForeground` on `accent`) | 14.04 | 6.73 |
| Deep accent against surface | 1.23 | 7.59 |

The deep accent fails 3:1 against dark surfaces on purpose. It is limited to large tinted regions and is always paired with a marker and a label.

Blue and Teal preset action fills were solved to the same luminance targets as Crimson and are tested in both themes.

- **Verified (revision 1).** 21 Node tests passed after adding the neutral surround, the Graphite preset, per-preset contrast for Graphite and workspace token checks. The workspace demo's script passes `node --check`.
- **Partially verified.** The workspace demo rendered in headless Chrome in all four modes and in the Graphite color-critical state. Mode switching, value-control keys and the hint bar were implemented but not exercised by an automated keyboard pass.

### Unverified

- Keyboard-only passes through the workspace demo's mode bar, value controls and hint bar, including Ctrl/⌘+1 to 4 and Shift fine steps.
- Screen readers, keyboard-only passes and 200% zoom on the category demo and the revised reference workspace.
- Protanopia, deuteranopia and tritanopia simulation of the GitHub-scheme primary and selection, the Crimson preset, and status cues.
- Windows high-contrast themes against the `HighContrast` XAML mapping, and forced-colors emulation of the new grid and edge rules.
- Reduced-motion behavior of the segmented progress and indeterminate segment.
- Live System theme switching in the category demo.

## PortableForge workflow reference verification

Run `node tools/verify-reference.mjs` with an installed Chrome browser. Set `CHROME_PATH` if Chrome is outside the default location. Pass `--root` with the staged site directory to test the files that Pages will serve. The CI job runs this check before uploading the site artifact.

| Scenario | Checked behavior |
| --- | --- |
| Compact layout | Complete sample flow at 640 × 480 CSS px and 100% text. The populated capture form also fits at 800 × 600 and 125%, and 960 × 720 and 150%. |
| Text and paths | In-place text-size changes preserve inputs. A long German fixture checks wrapping, the error message, and action reachability at 150%. A 320 px viewport uses document reflow with zero horizontal overflow. |
| Keyboard | Tab order follows the form. Task headings receive focus after navigation. The path dialog contains Tab and Shift+Tab and restores its opener after Close or Escape. |
| Review and recovery | Choices survive paging. The attention filter exposes unresolved findings, and the save gate checks the entire review. A changed sample setup preserves the profile and selected input. The original setup succeeds on retry. |
| Appearance and requests | Wood grain is present on the dark surface, with a flat surface in Light and forced colors. The browser checks for runtime errors and requests outside the local test origin. |

The browser gate uses a fresh Chrome profile and sample data. Its geometry and keyboard checks cover the exercised states. Native Windows containment, cleanup, and installer compilation were verified separately in [PortableForge PR #4](https://github.com/SeanShaffer88/PortableForge/pull/4).
