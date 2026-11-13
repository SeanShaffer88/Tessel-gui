import { buildChecks, summarize, isHex } from './contrast.mjs';

const tokens = await (await fetch('../../docs/tokens.json')).json();
const themes = { dark: tokens.color, light: tokens.lightColor, highContrast: tokens.highContrastColor };
const cssName = name => ({ background: 'bg', foreground: 'fg' })[name] ?? name.replace(/[A-Z]/g, c => `-${c.toLowerCase()}`);
const label = name => name.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase());
const $ = id => document.getElementById(id);
const root = document.documentElement;
let theme = 'dark';
let palette = { ...themes[theme] };
let failuresOnly = false;

function applyTheme() {
  root.dataset.theme = theme === 'light' ? 'light' : theme === 'highContrast' ? 'high-contrast' : 'dark';
  for (const [role, value] of Object.entries(palette)) root.style.setProperty(`--${cssName(role)}`, value);
}

function renderRoles() {
  $('roles').replaceChildren(...Object.entries(palette).map(([role, value]) => {
    const li = document.createElement('li');
    const color = Object.assign(document.createElement('input'), { type: 'color', value, ariaLabel: `${label(role)} color` });
    const name = Object.assign(document.createElement('span'), { textContent: label(role) });
    const text = Object.assign(document.createElement('input'), { type: 'text', value, ariaLabel: `${label(role)} hex`, maxLength: 7, spellcheck: false });
    const set = next => { if (!isHex(next)) return; palette[role] = next.toUpperCase(); color.value = next.toLowerCase(); text.value = next.toUpperCase(); applyTheme(); renderResults(); };
    color.addEventListener('input', () => set(color.value));
    text.addEventListener('input', () => set(text.value));
    li.append(color, name, text);
    return li;
  }));
}

function renderResults() {
  const checks = buildChecks(palette, tokens, theme);
  const { total, failed, worst } = summarize(checks);
  $('summary').textContent = failed
    ? `${failed} of ${total} checks fail. Worst: ${label(worst.foreground)} on ${label(worst.background)} at ${worst.ratio.toFixed(2)}:1 (needs ${worst.minimum}:1).`
    : `All ${total} checks pass in ${label(theme)}.`;
  const groups = Map.groupBy(failuresOnly ? checks.filter(c => !c.pass) : checks, c => c.group);
  $('tables').replaceChildren(...[...groups].map(([group, rows]) => {
    const table = document.createElement('table');
    table.innerHTML = `<caption>${group}</caption><thead><tr><th scope="col">Foreground</th><th scope="col">Background</th><th scope="col">Sample</th><th scope="col">Ratio</th><th scope="col">Needs</th><th scope="col">Result</th></tr></thead>`;
    const body = document.createElement('tbody');
    for (const c of rows) {
      const tr = document.createElement('tr');
      tr.classList.toggle('is-failing', !c.pass);
      tr.innerHTML = `<td>${label(c.foreground)}</td><td>${label(c.background)}</td><td><span class="swatch" style="color:${palette[c.foreground]};background:${palette[c.background]}">Aa 123</span></td><td class="num">${c.ratio.toFixed(2)}:1</td><td class="num">${c.minimum}:1</td><td class="${c.pass ? 'pass' : 'fail'}">${c.pass ? '✓ Pass' : '✗ Fail'}</td>`;
      body.append(tr);
    }
    table.append(body);
    return table;
  }));
}

$('theme').addEventListener('change', event => { theme = event.target.value; palette = { ...themes[theme] }; applyTheme(); renderRoles(); renderResults(); });
$('reset').addEventListener('click', () => { palette = { ...themes[theme] }; applyTheme(); renderRoles(); renderResults(); });
$('copy').addEventListener('click', async event => {
  await navigator.clipboard?.writeText(JSON.stringify(palette, null, 2));
  event.target.textContent = 'Copied';
  setTimeout(() => { event.target.textContent = 'Copy edited palette'; }, 1500);
});
$('only-failures').addEventListener('click', event => { failuresOnly = !failuresOnly; event.target.setAttribute('aria-pressed', String(failuresOnly)); renderResults(); });
applyTheme(); renderRoles(); renderResults();
