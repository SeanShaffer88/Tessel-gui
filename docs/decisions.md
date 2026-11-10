# Decisions

Design ideas that came up while writing revision 1, and what the standard does with each. The test: does it help a long-session tool of any category, without breaking anything else?

## Revision 2 (2026-11-10)

| Idea | Decision |
| --- | --- |
| GitHub Dark as the default scheme | Adopted. The default dark palette matches GitHub Dark (surfaces, text, edges, blue selection and focus, green primary actions, GitHub status colors); the light theme keeps its surfaces and takes the GitHub Light accent family. The revision 1 Crimson scheme stays available as a preset with its original values. Two values are Tessel-adjusted rather than copied: the resting action green is one step darker than GitHub's button green so the white label keeps the 5:1 target, and the dark `selected` fill sits below GitHub's hover fill so every preset's selection marker keeps 3:1 on it |

## Adopted

| Idea | Decision |
| --- | --- |
| Asymmetric layout | One dominant region, 55–70%, with supporting regions at 20–35%. Equal-width compartments need a reason |
| Dynamic resizing | Core requirement: smallest supported size, 200% text, reflow instead of clipping |
| Modal overlays | Only for decisions that block work. Inline and drawers are the default |
| Interactive visualizations | Allowed in monitoring and analytics. Keyboard operable, with a table alternative and text summary |
| Customizable skins | System, Light, Dark, forced colors, and the Crimson, Blue and Teal presets. Every preset is contrast-tested |
| Context-aware | OS signals only: theme, contrast, reduced motion, text scale, pointer type |

## Adapted

| Idea | Decision |
| --- | --- |
| Hidden UI elements | Progressive disclosure is fine. Primary actions and commands stay visible. Collapsed regions keep a visible restore and a command-palette entry |
| Emotional design | Calm tone, plain-language copy, undo and recovery. No mascots or decorative emotion |
| 3D visualization | Only inside viewports (CAD, 3D tools). Chrome stays flat |
| Customizable iconography | One icon set. Users may change icon size and label visibility |
| Interactive background | Replaced by a static grid that carries meaning in empty states, canvases and progress |

## Declined

| Idea | Reason |
| --- | --- |
| Organic shapes in chrome | Break alignment, density and hit targets. Fine inside content and illustration |
| Non-rectangular windows | Break snap, DWM effects, resizing and assistive hit-testing. Rounded corners follow the OS |
| Animated or reactive background | Costs idle CPU, distracts, and conflicts with reduced motion |
| Kinetic typography | Hurts scanning and reading. Motion is for locating changed regions only |
| Storytelling UI | Suits onboarding at most. Dense tools need predictable structure |
| Mosaic and overlapping layouts | Conflict with alignment, density and logical focus order |
| Non-linear or maze navigation | Hurts predictability and learnability. Use flat navigation and the command palette |
| Game mechanics | Not general. A product category may add them opt-in |
| Location or social-media context | Privacy cost and no usability gain. Tessel is offline-friendly and tracking-free |
| NLP priming or anchoring | Manipulative and unsupported. Design for clarity and consent instead |

## Lessons from professional creative tools

Patterns from multi-mode video, audio, image and media tools, kept only where they help long sessions and stay accessible. See [workspaces](workspaces.md).

| Pattern | Decision |
| --- | --- |
| Mode bar with saved layouts per job | Adopted. 3 to 9 modes, Ctrl/⌘+1 to 9, structural marker, layout saved per mode |
| Dockable, floating and tabbed panels | Adopted with a keyboard path and menu command for every drag |
| Contextual options bar | Adopted. One place, content follows the tool |
| Sliders, knobs and faders with typed entry | Adopted with units, fine and coarse keys, double-click reset |
| Meters and step or timeline grids | Adopted. The grid motif is functional there. Meters carry text and `role="meter"` |
| Hint bar describing controls | Adopted. Mirrors tooltips, never the only carrier of essential information |
| Start page with task tiles | Adopted for real tasks only. No promotions, news or unrelated offers |
| Neutral chrome for color work | Adopted as the Graphite preset and the neutral `surround` token |
| Progressive complexity | Adopted. Essentials first, advanced tools behind disclosure and the palette |
| Skeuomorphic hardware knobs and faders as chrome | Declined. Allowed as content styling in audio tools |
| Very small controls for density | Declined. Compact keeps 28 px rows and 24 px minimum targets |
| Drag-only docking and gestures | Declined. A keyboard path is required |
| Loud brand colors and gradients in chrome | Declined. Content is colorful, chrome is not |
| Modal dialogs for ordinary settings | Declined in favor of panels and drawers |
| Unlimited modes or nested pages | Declined. Past nine modes, use groups and the command palette |
