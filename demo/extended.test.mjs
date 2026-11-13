import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');
const tokens = JSON.parse(read('../docs/tokens.json'));
const dtcg = JSON.parse(read('../dist/tessel.tokens.json'));
const css = read('./tokens.css');
const { contrast } = tokens;

const toLinear = c => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const rgb = hex => hex.slice(1, 7).match(/../g).map(c => toLinear(Number.parseInt(c, 16) / 255));
const lum = hex => { const [r, g, b] = rgb(hex); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const ratio = (a, b) => (Math.max(lum(a), lum(b)) + 0.05) / (Math.min(lum(a), lum(b)) + 0.05);
const themes = { dark: tokens.color, light: tokens.lightColor, highContrast: tokens.highContrastColor };
const surfaces = ['background', 'surface', 'raised', 'selected'];
const textRoles = ['foreground', 'muted', 'info', 'warning', 'success', 'danger'];
const cssName = name => ({ background: 'bg', foreground: 'fg' })[name] ?? name.replace(/[A-Z]/g, c => `-${c.toLowerCase()}`);

test('every theme defines every role and the oklch themes mirror the sRGB roles', () => {
  const roles = Object.keys(tokens.color);
  for (const [name, palette] of Object.entries(themes)) {
    assert.deepEqual(Object.keys(palette), roles, `${name} roles`);
    for (const value of Object.values(palette)) assert.match(value, /^#[0-9A-F]{6}$/);
  }
  for (const theme of ['dark', 'light']) assert.deepEqual(Object.keys(tokens.colorOklch[theme]), roles, `${theme} oklch roles`);
});

test('surfaces step up in luminance by the documented per-theme range', () => {
  for (const theme of ['dark', 'highContrast']) {
    const [min, max] = contrast.surfaceLuminanceStep[theme];
    const levels = ['background', 'surface', 'raised'].map(role => lum(themes[theme][role]));
    for (let i = 1; i < levels.length; i++) {
      const step = levels[i] / levels[i - 1] - 1;
      assert.ok(step >= min && step <= max, `${theme} step ${i}: ${step}`);
    }
  }
  const [bg, surface, raised] = ['background', 'surface', 'raised'].map(role => lum(tokens.lightColor[role]));
  assert.ok(surface > raised && bg > raised, 'light raised is darker than the surface');
});

test('state fills keep text legible and stay distinct from their neighbors', () => {
  for (const [name, p] of Object.entries(themes)) {
    for (const [fill, text] of [['infoFill', 'info'], ['warningFill', 'warning'], ['successFill', 'success'], ['dangerFill', 'danger']]) {
      assert.ok(ratio(p[text], p[fill]) >= 4.5, `${name} ${text} on ${fill}`);
      assert.ok(ratio(p.foreground, p[fill]) >= 4.5, `${name} foreground on ${fill}`);
      assert.ok(ratio(p[fill], p.surface) >= contrast.distinctFillMinimum, `${name} ${fill} vs surface`);
    }
    for (const fill of ['selectedStrong', 'hover', 'pressed', 'readOnlyFill']) {
      for (const text of ['foreground', 'muted']) assert.ok(ratio(p[text], p[fill]) >= 4.5, `${name} ${text} on ${fill}`);
    }
    assert.ok(ratio(p.hover, p.raised) >= contrast.distinctFillMinimum, `${name} hover vs raised`);
    assert.ok(ratio(p.pressed, p.hover) >= contrast.distinctFillMinimum, `${name} pressed vs hover`);
    assert.ok(ratio(p.selectedStrong, p.selected) >= contrast.distinctFillMinimum, `${name} selectedStrong vs selected`);
    for (const role of ['selectionIndicator', 'focus']) {
      assert.ok(ratio(p[role], p.selectedStrong) >= 3, `${name} ${role} on selectedStrong`);
    }
  }
});

test('disabled, selection and find colors are legible and visible', () => {
  for (const [name, p] of Object.entries(themes)) {
    assert.ok(ratio(p.disabledForeground, p.disabledFill) >= contrast.disabledMinimum, `${name} disabled label`);
    assert.ok(ratio(p.foreground, p.textSelection) >= 4.5, `${name} text on selection`);
    assert.ok(ratio(p.foreground, p.findMatch) >= 4.5, `${name} text on find match`);
    assert.ok(ratio(p.foreground, p.findMatchActive) >= 4.5, `${name} text on active find match`);
    assert.ok(ratio(p.textSelection, p.surface) >= contrast.textSelectionFillMinimum, `${name} selection vs surface`);
    assert.ok(ratio(p.findMatch, p.surface) >= contrast.findFillMinimum, `${name} find vs surface`);
    assert.ok(ratio(p.findMatchActive, p.findMatch) >= contrast.findFillMinimum, `${name} active find vs find`);
  }
});

test('high contrast reaches 7:1 for text, semantics, selection and focus on every surface', () => {
  const p = tokens.highContrastColor;
  const min = contrast.highContrastTextMinimum;
  for (const surface of surfaces) {
    for (const role of [...textRoles, 'selectionIndicator', 'focus', 'border', 'progress']) {
      assert.ok(ratio(p[role], p[surface]) >= min, `${role} on ${surface}: ${ratio(p[role], p[surface])}`);
    }
  }
  for (const state of ['action', 'actionHover', 'actionPressed']) assert.ok(ratio(p.actionForeground, p[state]) >= min, `${state} label`);
  assert.ok(ratio(p.actionHover, p.action) >= contrast.distinctFillMinimum);
  assert.ok(ratio(p.actionPressed, p.action) >= contrast.distinctFillMinimum);
  assert.ok(ratio(p.accentForeground, p.accent) >= min);
  assert.ok(ratio(p.focus, p.selectionIndicator) >= contrast.focusSelectionMinimum);
  for (const surface of ['background', 'surface', 'raised']) assert.ok(ratio(p.edge, p[surface]) >= 5, `edge on ${surface}`);
  assert.match(contrast.highContrastNote, /2px border/);
});

test('syntax colors meet 4.5:1 on every surface of their theme', () => {
  for (const [theme, palette] of [['dark', tokens.color], ['light', tokens.lightColor]]) {
    for (const [role, color] of Object.entries(tokens.syntax[theme])) {
      for (const surface of surfaces) {
        assert.ok(ratio(color, palette[surface]) >= tokens.syntax.minimumContrast, `${theme} ${role} on ${surface}`);
      }
    }
  }
  assert.deepEqual(Object.keys(tokens.syntax.dark), Object.keys(tokens.syntax.light));
  for (const [role, color] of Object.entries(tokens.syntax.dark)) {
    for (const surface of ['background', 'surface', 'raised']) {
      assert.ok(ratio(color, tokens.highContrastColor[surface]) >= 4.5, `high contrast reuses dark ${role}`);
    }
  }
});

test('the CSS declares the high contrast theme, syntax, elevation, tints and forced-colors roles', () => {
  const [, afterSupports] = css.split("@supports (color: oklch(0.5 0 0))");
  const scope = afterSupports.match(/:root\[data-theme=high-contrast\] \{([^}]*)\}/);
  assert.ok(scope, 'Missing high contrast scope after the OKLCH block');
  for (const [role, color] of Object.entries(tokens.highContrastColor)) {
    assert.ok(scope[1].includes(`--${cssName(role)}: ${color};`), `high contrast ${role}`);
  }
  for (const [role, color] of Object.entries(tokens.syntax.dark)) assert.ok(scope[1].includes(`--syntax-${cssName(role)}: ${color};`));
  const root = css.match(/:root \{([^}]*)\}/)[1];
  for (const [level, spec] of Object.entries(tokens.elevation.levels)) assert.ok(root.includes(`--elevation-${level}: ${spec.shadow.dark};`));
  assert.ok(root.includes(`--scrim: ${tokens.elevation.scrim.dark};`));
  for (const role of tokens.accentTint.roles) {
    tokens.accentTint.steps.forEach((step, i) => assert.ok(root.includes(`--${cssName(role)}-tint-${i + 1}: color-mix(in oklab, var(--${cssName(role)}) ${step}%, var(--bg));`)));
  }
  const forced = css.split('@media (forced-colors: active)')[1];
  for (const role of Object.keys(tokens.color)) assert.ok(forced.includes(`--${cssName(role)}: `), `forced-colors ${role}`);
});

test('accent tints exported for every theme keep label contrast', () => {
  for (const role of tokens.accentTint.roles) {
    for (const [theme, palette] of Object.entries(themes)) {
      const steps = Object.values(dtcg.accentTint[role][theme]).map(entry => entry.$value.hex.toUpperCase());
      assert.equal(steps.length, tokens.accentTint.steps.length);
      let previous = lum(palette[tokens.accentTint.over]);
      for (const tint of steps) {
        assert.ok(ratio(palette.foreground, tint) >= tokens.accentTint.minimumLabelContrast, `${theme} ${role} tint ${tint}`);
        const current = lum(tint);
        assert.notEqual(current, previous, 'Tint steps must differ');
        previous = current;
      }
    }
  }
});

test('elevation layers use real roles and shadows never replace the edge', () => {
  for (const [name, level] of Object.entries(tokens.elevation.levels)) {
    assert.ok(level.fill in tokens.color, `${name} fill`);
    assert.ok(level.edge in tokens.color, `${name} edge`);
    for (const theme of ['dark', 'light']) assert.match(level.shadow[theme], /^0 \d+px \d+px #[0-9A-F]{4,8}$/i);
  }
  const z = Object.values(tokens.elevation.levels).map(level => level.z);
  assert.equal(new Set(z).size, z.length, 'z indexes are unique');
  assert.ok(tokens.elevation.levels.tooltip.z > tokens.elevation.levels.popup.z);
  assert.ok(tokens.elevation.levels.dialog.z > tokens.elevation.levels.tooltip.z);
});

test('focus rings meet the minimum width and every class has a style', () => {
  const { focusRing } = tokens;
  for (const [style, spec] of Object.entries(focusRing.styles)) assert.ok(spec.width >= focusRing.minimumWidth, `${style} width`);
  assert.ok(focusRing.styles.inset.offset < 0, 'The inset ring sits inside the element');
  assert.ok(focusRing.styles.outline.offset > 0);
  for (const [cls, style] of Object.entries(focusRing.perClass)) assert.ok(style in focusRing.styles, `${cls} style`);
  for (const [group, spec] of [['tab', tokens.navigation.tab], ['tree', tokens.navigation.tree], ['breadcrumb', tokens.navigation.breadcrumb]]) {
    assert.equal(spec.focusRing, focusRing.perClass[group === 'breadcrumb' ? 'breadcrumbItem' : group === 'tree' ? 'treeItem' : 'tab'], `${group} ring`);
  }
  assert.ok(focusRing.color in tokens.color);
  assert.match(css, /--focus-inset-width: 2px;/);
  assert.match(css, /--focus-outline-offset: 3px;/);
});

test('table, navigation and status bar specs keep targets usable', () => {
  const { table, navigation, statusBar, density } = tokens;
  assert.equal(density.perClass[table.rowHeightClass], 'compact');
  assert.equal(table.zebra, false);
  assert.ok(table.header.sticky && table.header.height >= 24 && table.header.ariaSort);
  assert.deepEqual(table.header.sortCycle, ['ascending', 'descending', 'none']);
  assert.ok(table.columnResize.gripWidth >= 8);
  assert.ok(table.columnResize.keyboard.fastStep > table.columnResize.keyboard.step);
  assert.ok(navigation.tab.height >= 24 && navigation.tab.closeTarget >= 24 && navigation.tab.minWidth < navigation.tab.maxWidth);
  assert.equal(navigation.tab.activeRule.color, 'selectionIndicator');
  assert.equal(density.perClass.dataRows, 'compact');
  assert.equal(density.perClass[navigation.tree.rowHeightClass], 'compact');
  assert.ok(navigation.tree.indent >= navigation.tree.chevron);
  assert.ok(navigation.breadcrumb.height >= 24 && navigation.breadcrumb.itemTarget >= 24 && navigation.breadcrumb.maxVisible >= 3);
  assert.ok(statusBar.height.compact >= 24 && statusBar.height.compact < statusBar.height.comfortable);
  assert.ok(statusBar.segmentMinTarget >= 24);
  assert.equal(new Set(statusBar.segmentOrder).size, statusBar.segmentOrder.length);
  assert.equal(statusBar.segmentOrder[0], 'workspace-state');
  assert.equal(statusBar.segmentOrder.at(-1), 'notifications');
});

test('state templates name every part and keep loading free of layout shift', () => {
  const { states } = tokens;
  assert.ok(states.loading.showAfterMs >= 100 && states.loading.minimumVisibleMs >= states.loading.showAfterMs);
  assert.equal(states.loading.layoutShift, 'none');
  assert.ok(states.empty.parts.includes('primaryAction'));
  assert.ok(states.error.parts.includes('what to do') && states.error.parts.includes('retry or recover action'));
  assert.ok(states.error.color in tokens.color);
  assert.ok(states.offline.banner in tokens.color);
});

test('every export carries the new roles and the release version', () => {
  assert.match(tokens.version, /^\d+\.\d+\.\d+$/);
  assert.equal(dtcg.$version, tokens.version);
  for (const theme of ['dark', 'light', 'highContrast']) {
    assert.deepEqual(Object.keys(dtcg.color[theme]), Object.keys(tokens.color));
  }
  const rust = read('../dist/tessel.rs');
  const gd = read('../dist/tessel_tokens.gd');
  const slint = read('../dist/Tessel.slint');
  assert.match(rust, /pub const HIGH_CONTRAST: Palette/);
  assert.match(gd, /const HIGH_CONTRAST := /);
  assert.match(slint, /in-out property <bool> high-contrast: false;/);
  assert.match(read('../dist/Tessel.HighContrast.xaml'), /VgFindMatchActiveColor/);
  assert.match(read('../dist/Tessel.xaml'), /VgSelectedStrongColor/);
});

test('npm and Rust packages are generated from the same tokens and carry both licenses', () => {
  const pkg = JSON.parse(read('../packages/npm/package.json'));
  assert.equal(pkg.name, 'tesselgui-tokens');
  assert.equal(pkg.version, tokens.version);
  assert.equal(pkg.license, 'CC-BY-4.0 AND MIT');
  assert.equal(read('../packages/npm/tokens.source.json'), read('../docs/tokens.json').replace(/\r\n/g, '\n'));
  assert.equal(read('../packages/npm/tessel.css'), css);
  assert.equal(read('../packages/rust/src/lib.rs'), read('../dist/tessel.rs'));
  assert.match(read('../packages/rust/Cargo.toml'), new RegExp(`version = "${tokens.version.replaceAll('.', '\\.')}"`));
  for (const dir of ['npm', 'rust']) {
    assert.match(read(`../packages/${dir}/LICENSE`), /Attribution 4\.0 International/);
    assert.match(read(`../packages/${dir}/LICENSE-CODE`), /MIT License/);
  }
  for (const file of pkg.files) assert.ok(read(`../packages/npm/${file}`).length > 0, file);
});

test('command palette registry follows the shortcut rules and the shared palette values', () => {
  const { commandPalette: palette, shortcuts } = tokens;
  assert.equal(palette.layout.visibleRows, shortcuts.palette.visibleRows);
  assert.ok(shortcuts.reserved.some(entry => entry.id === palette.keys.open), 'open key is the reserved palette key');
  for (const field of ['id', 'label', 'shortcut', 'enabled', 'disabledReason', 'run']) assert.ok(palette.registry.requiredFields.includes(field), field);
  assert.equal(palette.registry.duplicateShortcuts, 'forbidden');
  assert.deepEqual(palette.matching.order.slice(0, 2), ['exact', 'prefix']);
  assert.equal(palette.matching.emptyQueryShows, 'recent');
  const scopeKeys = Object.keys(palette.scopes);
  assert.equal(new Set(scopeKeys).size, scopeKeys.length);
  for (const key of scopeKeys) assert.equal(key.length, 1, `scope prefix ${key} is one character`);
  assert.ok(palette.layout.minWidth <= palette.layout.width && palette.layout.maxViewportPercent <= 100);
  assert.equal(tokens.density.perClass[palette.layout.rowClass], 'compact');
  assert.ok(palette.announceDelayMs === undefined && palette.accessibility.announceDelayMs >= 100);
  assert.match(palette.rows.highlight, /never color alone/);
  assert.match(palette.rows.disabledStyle, /Never hide/);
});

test('layout presets, docking and density rules agree with the workspace tokens', () => {
  const { layouts, workspace, density } = tokens;
  assert.deepEqual(Object.keys(layouts.presets).filter(key => key !== 'rule'), ['focus', 'review', 'wide']);
  for (const [name, preset] of Object.entries(layouts.presets)) {
    if (name === 'rule') continue;
    const [low, high] = preset.dominantPercent;
    assert.ok(low >= 55 && high <= 100 && low < high, `${name} dominant share`);
  }
  assert.equal(layouts.docking.minPanel.width, workspace.panels.minimumWidth);
  assert.equal(layouts.docking.minPanel.height, workspace.panels.minimumHeight);
  assert.ok(layouts.docking.splitterHit >= 8 && layouts.docking.snap >= 4);
  assert.ok(layouts.docking.restore.afterCrash && layouts.docking.restore.versioned);
  for (const mode of layouts.density.values) assert.ok(density[mode], `unknown density ${mode}`);
  assert.ok(layouts.multiView.maxSplits >= 2 && layouts.multiView.maxSplits <= 6);
});

test('canvas values match the signature grid, type scale and target minimums', () => {
  const { canvas, signature, type } = tokens;
  const stops = canvas.zoom.stopsPercent;
  assert.deepEqual([...stops].sort((a, b) => a - b), stops);
  assert.ok(stops.includes(canvas.zoom.default) && canvas.zoom.default === 100);
  assert.ok(canvas.zoom.animationMs <= tokens.motion.maximumTransition);
  assert.equal(canvas.grid.snapSize, signature.emptyState.cell);
  assert.ok(canvas.grid.color in tokens.color);
  assert.ok(canvas.objects.handleTargetPx >= 24 && canvas.objects.handleVisualPx <= canvas.objects.handleTargetPx);
  assert.equal(canvas.objects.minimumScreenTextPx, type.size.caption);
  assert.equal(canvas.objects.selection.outline.color, 'selectionIndicator');
  assert.ok(canvas.pan.keys.fastStep > canvas.pan.keys.step);
  assert.ok(canvas.minimap.keyboardReachable && canvas.minimap.width > canvas.minimap.height);
  assert.ok(canvas.accessibility.everyDragHasKeyboard && canvas.chrome.fixed);
  assert.equal(canvas.zoom.reducedMotion, 'Instant');
});

test('no two bindings across shortcuts, layouts and canvas collide', () => {
  const bound = new Map();
  const claim = (key, owner) => {
    assert.ok(!bound.has(key), `${key} is claimed by both ${bound.get(key)} and ${owner}`);
    bound.set(key, owner);
  };
  for (const entry of [...tokens.shortcuts.reserved, ...tokens.shortcuts.required]) claim(entry.windows, `shortcuts.${entry.id}`);
  for (const [name, preset] of Object.entries(tokens.layouts.presets)) if (preset.shortcut) claim(preset.shortcut, `layouts.${name}`);
  for (const [name, key] of Object.entries(tokens.canvas.zoom.keys)) claim(key, `canvas.zoom.${name}`);
  claim(tokens.canvas.grid.toggle, 'canvas.grid');
  assert.match(tokens.workspace.modes.shortcut, /1 to 9/);
  for (const key of bound.keys()) assert.doesNotMatch(key, /^Ctrl\+[1-9]$/, `${key} would collide with mode switching`);
});

test('undo is reversible-first and its toast outlasts the standard toast', () => {
  const { undo, feedback, shortcuts, density } = tokens;
  assert.ok(shortcuts.required.some(entry => entry.id === 'undo') && shortcuts.required.some(entry => entry.id === 'redo'));
  assert.ok(undo.stack.minimumDepth >= 50 && undo.stack.coalesceMs >= 200);
  assert.match(undo.labels.undo, /\{verb\} \{object\}/);
  assert.match(undo.labels.redo, /\{verb\} \{object\}/);
  assert.ok(undo.toast.durationMs > feedback.toast.defaultDurationMs);
  assert.ok(undo.toast.minimumMs >= feedback.toast.defaultDurationMs && undo.toast.minimumMs <= undo.toast.durationMs);
  assert.ok(undo.toast.pauseOnHover && undo.toast.pauseOnFocus);
  assert.equal(undo.confirmWhenUndoable, false);
  assert.equal(feedback.toast.undoActionForDestructive, true);
  assert.equal(density.perClass[undo.history.rowClass], 'compact');
  assert.match(undo.irreversible.confirm, /safe choice/);
  assert.equal(feedback.confirmation.when, 'undo is impossible');
});

test('inline feedback stays quiet, associated and announced politely', () => {
  const { inlineFeedback: inline, feedback } = tokens;
  assert.equal(inline.validation.placement, 'Directly under the field');
  assert.equal(inline.validation.blockingDialogs, 'Never for validation');
  for (const part of ['icon', 'message', 'how to fix']) assert.ok(inline.validation.parts.includes(part));
  assert.match(inline.validation.association, /aria-describedby/);
  assert.ok(inline.success.hideAfterMs <= 8000);
  for (const banned of ['pulsing', 'shaking']) assert.ok(inline.quiet.forbidden.includes(banned));
  assert.ok(inline.quiet.live.assertive.every(entry => /error/.test(entry)));
  assert.ok(inline.quiet.badgeMaxCount >= 9);
  assert.match(inline.optimistic.rule, /Undo or Retry/);
  assert.equal(feedback.placement.field, 'inline, directly under the field');
  assert.ok(tokens.motion.forbidden.some(entry => /ambient/.test(entry)), 'the no-ambient-motion rule still holds');
});

test('the DTCG export carries the interaction sections', () => {
  for (const key of ['commandPalette', 'layouts', 'canvas', 'undo', 'inlineFeedback']) assert.deepEqual(dtcg[key], tokens[key], key);
});
