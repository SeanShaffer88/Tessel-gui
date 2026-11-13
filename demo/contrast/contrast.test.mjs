import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ratio, luminance, isHex, buildChecks, summarize } from './contrast.mjs';

const tokens = JSON.parse(readFileSync(new URL('../../docs/tokens.json', import.meta.url), 'utf8'));
const themes = { dark: tokens.color, light: tokens.lightColor, highContrast: tokens.highContrastColor };

test('ratio matches the WCAG reference values', () => {
  assert.equal(ratio('#000000', '#FFFFFF'), 21);
  assert.equal(luminance('#FFFFFF'), 1);
  assert.ok(Math.abs(ratio('#777777', '#FFFFFF') - 4.48) < 0.01);
  assert.equal(ratio('#123456', '#123456'), 1);
  assert.equal(isHex('#a1B2c3'), true);
  assert.equal(isHex('a1b2c3'), false);
});

test('every shipped theme passes every check the page runs', () => {
  for (const [theme, palette] of Object.entries(themes)) {
    const checks = buildChecks(palette, tokens, theme);
    const summary = summarize(checks);
    assert.ok(checks.length >= 60, `${theme} runs ${checks.length} checks`);
    assert.equal(summary.failed, 0, `${theme} fails: ${JSON.stringify(summary.worst)}`);
  }
});

test('a bad edit is caught and reported as the worst failure', () => {
  const edited = { ...tokens.color, muted: '#2A2F36' };
  const summary = summarize(buildChecks(edited, tokens, 'dark'));
  assert.ok(summary.failed > 0);
  assert.equal(summary.worst.foreground, 'muted');
});

test('high contrast demands 7:1 where dark demands 4.5:1', () => {
  const stronger = buildChecks(tokens.highContrastColor, tokens, 'highContrast').find(c => c.foreground === 'foreground' && c.background === 'surface');
  const regular = buildChecks(tokens.color, tokens, 'dark').find(c => c.foreground === 'foreground' && c.background === 'surface');
  assert.equal(stronger.minimum, 7);
  assert.equal(regular.minimum, 4.5);
});
