# Tessel quick reference · revision 2

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
| background / surface / raised / selected | `#010409` `#0A0C10` `#191C20` `#272B33` | Surfaces |
| hover / pressed / strong selection | `#20242B` `#2E333B` `#40454D` | Control states, active tree item |
| edge / border | `#7A828E` / `#7A828E` | Compartment borders, control boundaries |
| action / hover / pressed | `#1A7F37` `#238636` `#116329` | Primary fill, white label |
| selection indicator / focus | `#409EFF` / `#71B7FF` | Marker, rule / keyboard focus |
| accent (deep) | `#15263C` | Large tinted regions with a marker |
| grid | `#0F1318` | Empty states, canvases, progress segments |

Themes: Dark (default), Light and High Contrast (`data-theme="high-contrast"`, 7:1 text, yellow focus `#FFD33D`). Also: [syntax colors](materials.md#syntax-colors), [elevation](materials.md#elevation), [accent tints](materials.md#accent-tints), [state and editing roles](materials.md#state-and-editing-roles).

## Density

| Class | Control | Row |
| --- | --- | --- |
| Compact (rows, trees, toolbars) | 32 | 28 |
| Comfortable (forms, dialogs, nav) | 40 | 36 |
| Touch | 48 | 48 |

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
