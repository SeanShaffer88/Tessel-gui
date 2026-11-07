# Shortcuts and the command palette

Every task has a keyboard path and a visible shortcut. Bindings live in [`tokens.json`](tokens.json) under `shortcuts` and are exported in the DTCG file.

## Reserved keys

These mean the same thing in every product that follows the standard.

| Action | Windows / Linux | macOS |
| --- | --- | --- |
| Open command palette | Ctrl+K | ⌘K |
| Open settings | Ctrl+, | ⌘, |
| Open help | F1 | F1 |
| Close or cancel | Esc | Esc |
| Move focus to next region | F6 | F6 |

## Required set

Every product with the matching feature binds these.

| Action | Windows | Linux | macOS |
| --- | --- | --- | --- |
| Undo | Ctrl+Z | Ctrl+Z | ⌘Z |
| Redo | Ctrl+Y | Ctrl+Shift+Z | ⇧⌘Z |
| Find | Ctrl+F | Ctrl+F | ⌘F |
| Save | Ctrl+S | Ctrl+S | ⌘S |
| Select all | Ctrl+A | Ctrl+A | ⌘A |

## Conflict rules

- Never override operating-system shortcuts, text-field editing keys (copy, cut, paste, arrows, Home, End) or screen-reader keys.
- Use ⌘ on macOS wherever Windows uses Ctrl. Do not ship Ctrl bindings on macOS.
- Within one product, a key combination does one thing. Check new bindings against the reserved and required tables.
- Shortcuts that conflict with a focused text field are inactive while that field has focus, except Esc.
- Users can rebind everything except Esc.

## Hint bar

The status bar shows up to six hints for the focused region, in the form `Key Action` (for example `Ctrl+F Find`). The set changes with focus. Hints are real, clickable commands.

## Command palette

| Rule | Value |
| --- | --- |
| Opens with | Ctrl/⌘+K, also from a visible search control |
| Matching | Fuzzy, on label and keywords |
| Order | Recent first, then best match |
| Rows | 8 visible, then scroll |
| Each row | Verb-first label, the shortcut if one exists, disabled commands explain why |
| Keys | Up/Down to move, Enter to run, Esc to close |
| Scope | Everything the app can do, including settings and modes |

The palette complements visible controls. It never replaces them.

## Check

- [ ] Every command has a keyboard path.
- [ ] The reserved and required sets are bound as listed.
- [ ] No binding conflicts with the OS, text fields or another command.
- [ ] Hints appear for the focused region and match real bindings.
- [ ] The palette lists every command, with its shortcut.
