# Motion

Motion locates a change. It never decorates. The numbers live in [`tokens.json`](tokens.json) under `motion` and are exported to every target.

## Durations

| Role | Token | Use |
| --- | --- | --- |
| Press | `press` 60 ms | Pressed state on buttons and rows |
| Hover | `hover` 80 ms | Hover and focus-visible color changes |
| Toast | `toast` 120 ms | A toast entering or leaving |
| Expand | `expand` 160 ms | Disclosure, tree nodes, accordions |
| Drawer | `drawer` 180 ms | Drawers, inspectors and docked panels opening or closing |

Nothing exceeds `maximumTransition` (200 ms). `shortTransition` (120) and `panelTransition` (180) remain as the general short and panel values.

## Easing

| Token | Curve | Use |
| --- | --- | --- |
| `standard` | `cubic-bezier(0.2, 0, 0, 1)` | Entrances and state changes |
| `exit` | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving |

No bounce, overshoot or elastic curves. `stagger` is 0: related elements move together.

## What may animate

| Allowed | Not allowed |
| --- | --- |
| State changes (hover, press, selection, focus) | Ambient or looping decoration |
| Panels and drawers opening and closing | Layout shift of data rows while the user reads or scans |
| Determinate and indeterminate progress | Motion with no cause |

## Reduced motion

When the OS requests reduced motion, durations become `reducedDuration` (0 ms): state changes are instant. Keep status: progress still updates, the indeterminate segment becomes static, and nothing relies on motion to communicate meaning.

## Check

- [ ] Every transition uses a duration role and an easing token.
- [ ] No animation runs while the app is idle.
- [ ] With reduced motion on, every state change is still visible and every status is still readable.
