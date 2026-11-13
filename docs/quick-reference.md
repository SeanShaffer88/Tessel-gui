# Tessel quick reference · revision 3

One page. Full rules: [design guidelines](design-guidelines.md). Numbers: [tokens.json](tokens.json).

## Six rules

1. **One dominant region** per view, 55–70% wide. Supporting regions 20–35%. No equal columns.
2. **One accent per region.** Primary action, selection marker, or active-region rule.
3. **Edges build structure.** 1px `edge` between compartments. Fills mark hover and selection only.
4. **Density per component.** Rows, trees, toolbars Compact. Forms, dialogs, navigation Comfortable.
5. **Keyboard first.** Every task has a path. Ctrl/⌘+K opens commands. Focus is always visible.
6. **Static and honest.** No ambient motion. Real status, real cancel, text with every color.

## Anatomy

```
+-----------------------------------------------------------+
| Title                         [secondary] [PRIMARY]       |  toolbar
+----------+--------------------------------+---------------+
| Nav /    | Dominant region (55-70%)       | Detail        |
| tree     | ======== active rule =======   | (20-35%)      |
| 15-20%   |                                | collapsible   |
+----------+--------------------------------+---------------+
| status: operation, units, shortcuts hint                  |
+-----------------------------------------------------------+
```

## Color at a glance (dark)

| Role | Value | Use |
| --- | --- | --- |
| editor background / surface / panels (raised) / selected | `#1B1B1D` `#1F1F22` `#232326` `#2A2A2F` | Surfaces |
| hover / pressed / strong selection | `#28282D` `#2E2E34` `#33333A` | Control states, active tree item |
| edge / border | `#43434A` / `#76767C` | Compartment borders, control boundaries |
| main text / secondary text | `#E6E3E1` / `#89868A` | Interface text; comments use the secondary color |
| Carmine accent, action / hover / pressed | `#960018` `#A81226` `#7E0014` | Primary fill with a border rim, white label |
| selection indicator / focus | `#960018` / `#960018` | Thin Carmine edge, underline and outline — never the only cue |
| syntax keyword / string / numbers | `#72AAA5` / `#A3B58A` / `#B8AAA0` | Muted teal, subdued sage, warm gray |
| grid | `#28282B` | Fine square grid: empty areas, fading behind code |

Themes: Dark (default, the Carmine standard above), Light (same Carmine family on light surfaces, brighter Carmine focus `#C8102E`) and High Contrast (`data-theme="high-contrast"`, 7:1 text, yellow focus `#FFD33D`). The status bar is near-black (`#191919`) with muted labels and a small Carmine indicator. The text cursor is off-white with a tiny Carmine cap; selected text is a soft gray highlight (`#3F3F46`) with a thin Carmine edge. Also: [syntax colors](materials.md#syntax-colors), [elevation](materials.md#elevation), [accent tints](materials.md#accent-tints), [state and editing roles](materials.md#state-and-editing-roles).

## Density

| Class | Control | Row |
| --- | --- | --- |
| Compact (rows, trees, toolbars, nav) | 32 | 28 |
| Comfortable (forms, dialogs) | 40 | 36 |
| Touch | 48 | 48 |

Revision 3 is compact-first with minimal padding: compact panel padding is 8, gaps stay 6 min, 8 default, 12–16 between groups, 24 between sections.

Gaps: 6 min, 8 default, 12–16 between groups, 24 between sections.

## Do / Don't

| Do | Don't |
| --- | --- |
| One primary action, clear verb | Accent color on several buttons at once |
| Scroll inside tables, logs, editors | Scroll the main window |
| Inline messages and drawers | Modals for non-blocking info |
| Text + icon with every status color | Color-only meaning |
| Hide secondary tools with a visible restore | Hide primary actions or commands |
| Follow OS theme, contrast, motion, text size | Track location or behavior |
| Brand accent for chrome | Brand accent in charts or syntax |

## Multi-mode and creative tools

[Workspaces](workspaces.md): modes (Ctrl/⌘+1 to 9), dockable panels with keyboard paths, an options bar, value controls with typed entry and double-click reset, a neutral viewport surround, and the Graphite preset for color work. [Polish checklist](polish.md).

## Components and patterns

[Focus rings](focus-rings.md) · [Tabs, trees, breadcrumbs](navigation.md) · [Status bar](status-bar.md) · [Empty, loading, error](states.md) · [Command palette registry](command-palette.md) · [Layouts and docking](layouts.md) · [Infinite canvas](canvas.md) · [Undo and inline feedback](undo-and-feedback.md)

## Pick a layout

Data & records, Editor & IDE, Media & creative, Monitoring & analytics, Utility & wizard, Communication, CAD & 3D, Settings & system tools. [Category layouts](categories.md).
