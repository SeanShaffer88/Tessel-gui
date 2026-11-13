// Pure contrast helpers for the live checker. No DOM. Tested in contrast.test.mjs.
const toLinear = c => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
export const luminance = hex => {
  const [r, g, b] = hex.slice(1, 7).match(/../g).map(c => toLinear(Number.parseInt(c, 16) / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
export const ratio = (a, b) => {
  const [x, y] = [luminance(a), luminance(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};
export const isHex = value => /^#[0-9a-f]{6}$/i.test(value);

const surfaces = ['background', 'surface', 'raised', 'selected'];
const textRoles = ['foreground', 'muted', 'info', 'warning', 'success', 'danger'];
const indicatorRoles = ['selectionIndicator', 'focus', 'border', 'progress'];

/** Every pair the standard checks, with the minimum for the theme. */
export function buildChecks(palette, tokens, theme) {
  const hc = theme === 'highContrast';
  const textMin = hc ? tokens.contrast.highContrastTextMinimum : 4.5;
  const indicatorMin = hc ? tokens.contrast.highContrastTextMinimum : 3;
  const checks = [];
  const add = (group, foreground, background, minimum) => checks.push({
    group, foreground, background, minimum, ratio: ratio(palette[foreground], palette[background]),
  });
  for (const surface of surfaces) {
    for (const role of textRoles) add('Text on surfaces', role, surface, textMin);
    for (const role of indicatorRoles) add('Indicators on surfaces', role, surface, indicatorMin);
  }
  const labelMin = hc ? tokens.contrast.highContrastTextMinimum : 5;
  add('Primary action', 'actionForeground', 'action', labelMin);
  add('Primary action', 'actionForeground', 'actionHover', hc ? labelMin : 4.5);
  add('Primary action', 'actionForeground', 'actionPressed', labelMin);
  if (!hc) for (const surface of ['background', 'surface', 'raised']) add('Primary action', 'action', surface, tokens.contrast.actionSurfaceMinimum);
  add('Primary action', 'accentForeground', 'accent', hc ? labelMin : 5);
  for (const [fill, text] of [['infoFill', 'info'], ['warningFill', 'warning'], ['successFill', 'success'], ['dangerFill', 'danger']]) add('Status fills', text, fill, 4.5);
  for (const fill of ['selectedStrong', 'hover', 'pressed', 'readOnlyFill', 'textSelection', 'findMatch', 'findMatchActive']) add('Content on fills', 'foreground', fill, 4.5);
  add('Content on fills', 'disabledForeground', 'disabledFill', tokens.contrast.disabledMinimum);
  for (const surface of ['background', 'surface', 'raised']) add('Structure', 'edge', surface, tokens.contrast.edgeMinimum);
  add('Structure', 'focus', 'selectionIndicator', tokens.contrast.focusSelectionMinimum);
  add('Structure', 'selected', 'surface', tokens.contrast.selectedFillMinimum);
  return checks.map(check => ({ ...check, pass: check.ratio >= check.minimum }));
}

export function summarize(checks) {
  const failed = checks.filter(check => !check.pass);
  return { total: checks.length, failed: failed.length, passed: checks.length - failed.length, worst: failed.sort((a, b) => a.ratio / a.minimum - b.ratio / b.minimum)[0] ?? null };
}
