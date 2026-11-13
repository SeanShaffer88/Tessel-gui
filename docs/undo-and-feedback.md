# Undo and inline feedback

Make mistakes cheap, then stay quiet. [Feedback patterns](feedback.md) maps severity to color and placement. This page adds the undo model and the rules for feedback that sits beside the thing that changed. Values are the `undo` and `inlineFeedback` sections of [tokens.json](tokens.json).

## Undo first, confirm last

When an action can be undone, do it at once and offer Undo. Do not ask “Are you sure?”. Reserve confirmation for actions that cannot be undone ([feedback](feedback.md#confirmation)).

| Part | Rule |
| --- | --- |
| Stack | At least 100 entries per document. It survives saving and clears when the document closes |
| Grouping | Typing and slider drags merge into one entry per 600 ms pause |
| Labels | `Undo {verb} {object}` and `Redo {verb} {object}`: “Undo Delete 3 rows”. The label shows in the menu, the palette and the toast |
| Keys | Ctrl/⌘+Z and the platform redo key from [shortcuts](shortcuts.md#required-set) |
| History panel | A compact data list of entries. Selecting one jumps to that state. Later entries stay as redo until a new action |

### Undo toast

A destructive action shows one toast with the action named in text and an Undo button.

- Stays 8 seconds, never less than 5. The standard toast stays 5.
- Pauses while the pointer is over it or focus is inside it.
- Ctrl/⌘+Z works while it shows. The button is also reachable with the region cycle key (F6).
- One toast at a time. A new action replaces the old toast; the older action stays in the history panel.

### When undo is impossible

Permanent delete, overwriting an external file, sending a message and emptying the trash cannot be reversed. Confirm these with a dialog that names the target and the effect, puts Cancel first and makes the safe choice the default. Buttons use verbs: “Delete forever”, not “OK”.

### Autosave

Save drafts silently. Say “Saved” only after a manual save, or say “Could not save” when saving fails.

## Inline validation

| Part | Rule |
| --- | --- |
| Timing | On blur. After a field shows an error, re-check on every change so the message clears as soon as it is fixed |
| Placement | Directly under the field |
| Content | An icon, a message and how to fix it: “Name is required. Enter at least 2 characters.” |
| Association | `aria-describedby` on the field and `aria-invalid="true"` while invalid |
| On submit | A status region states the count (“2 fields need attention”) and focus moves to the first invalid field |
| Dialogs | Never use a blocking dialog for validation |

## Quiet by design

“Ambient” here means always available and quiet, not animated. TesselGUI still forbids ambient motion.

- Use status text, counts and badges. Badges show the number as text and cap at 99.
- Never pulse, shake or auto-move elements. No sound without a setting.
- Polite live regions announce saves, counts and progress milestones. Assertive regions are for errors that block work.
- Success confirms in place (“Saved” beside the control or in the status bar) and clears after 5 seconds.

## Optimistic updates

Show the result at once and label it “Syncing” in text. If the server rejects it, roll the change back and show an inline message with an Undo or Retry action. Never leave the screen showing a state that is not true.

## Check

- [ ] Every destructive action either offers Undo or confirms with named buttons.
- [ ] The Undo shortcut works while the toast is visible.
- [ ] Each invalid field has text, an icon and a programmatic association.
- [ ] Nothing pulses, shakes or moves by itself.
