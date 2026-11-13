# Feedback patterns

How a product tells the user what happened. The rules live in [`tokens.json`](tokens.json) under `feedback` and are exported in the DTCG file. Status colors are the existing `info`, `success`, `warning` and `danger` roles.


Related: [undo and inline feedback](undo-and-feedback.md) covers the undo model, the undo toast and quiet inline validation.

## Severity

Color never carries severity alone. Every message has an icon and text.

| Severity | Color role | Use | Where |
| --- | --- | --- | --- |
| Info | `info` | Neutral facts and state | Inline, banner, status bar |
| Success | `success` | A completed action | Inline, status bar, toast |
| Warning | `warning` | A risk the user can still act on | Inline, banner, status bar |
| Error | `danger` | Something failed or input is invalid | Inline, banner, dialog |

All four roles reach 4.5:1 against background, surface, raised and selected in both themes, so they work as text.

## Placement

| Situation | Placement |
| --- | --- |
| Invalid field | Inline, directly under the field |
| Problem with one panel | Banner at the top of that panel |
| App-wide state | Status bar |
| Work cannot continue | Modal dialog |

Use the least interruptive placement that works. A modal is the last choice.

## Toasts

- One visible at a time; later ones queue.
- Default 5 s, always dismissible, and paused while hovered or focused.
- Never for errors that need action or information the user must keep. Put those inline or in a banner.
- A toast for a destructive action carries an Undo action.
- No unprompted toasts, promotions or tips during work.

## Confirmation

Confirm only when undo is impossible. Where undo exists, act and offer Undo instead. A confirmation dialog:

- Names the action and the target in the title.
- Uses verb labels on the buttons ("Delete 3 files", "Keep files"), never "OK" and "Cancel" alone.
- Makes the safe choice the default and the Esc action.

## Error messages

Every error answers three questions, in plain language:

1. **What happened.**
2. **Why**, when it is known.
3. **How to fix it**, as an action the user can take now.

Keep the user's input. Do not blame the user. Do not show raw codes without a readable sentence; put technical detail behind a disclosure.

## Progress and cancel

- Any operation longer than about a second shows progress with units ("12 of 40 files").
- Use determinate progress whenever the total is known.
- Every long operation has a working Cancel, and the result of cancelling is stated.

## Check

- [ ] Every message has an icon and text, not color alone.
- [ ] Field errors are inline; modals only block when they must.
- [ ] No toast carries an error that needs action.
- [ ] Destructive actions offer Undo, or confirm with verb-labelled buttons when undo is impossible.
- [ ] Each error says what happened, why, and how to fix it.
- [ ] Long operations show units and offer Cancel.
