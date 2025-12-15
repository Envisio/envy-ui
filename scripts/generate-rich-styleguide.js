#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const colorsModule = require('../from-dictionary/javascripts/color.js');

const COLORS = colorsModule.color || colorsModule;
const BUILD_DIR = path.join(__dirname, '..', 'src', 'stylesheets', 'a', 'kss', 'build');
const BLOCKS_DIR = path.join(__dirname, '..', 'src', 'stylesheets', 'blocks');
const OUTPUT = path.join(__dirname, '..', 'styleguide', 'rich-preview.html');

function titleCase(str) {
  return str.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
}

function getColorRows() {
  return Object.entries(COLORS).map(([name, token]) => {
    const value = token && (token.$value || token.value || token);
    return {
      name,
      value,
      customProp: `--env-color-${name}`,
      jsPath: `colors.color['${name}']`
    };
  }).filter((row) => !!row.value);
}

function isRetired(component) {
  const scssPath = path.join(BLOCKS_DIR, component, `_${component}.scss`);
  if (!fs.existsSync(scssPath)) {
    return false;
  }
  const head = fs.readFileSync(scssPath, 'utf8').split('\n').slice(0, 40).join('\n');
  return /Retired:/i.test(head) || /Status:\s*Retired/i.test(head);
}

function findSnippet(component) {
  if (!fs.existsSync(BUILD_DIR)) {
    return null;
  }
  const files = fs.readdirSync(BUILD_DIR);
  const match = files.find((file) => file.startsWith(`_${component}-`) && file.endsWith('-kss.html'))
    || files.find((file) => file.startsWith(`_${component}`) && file.endsWith('-kss.html'));
  if (!match) {
    return null;
  }
  return path.join(BUILD_DIR, match);
}

function getComponentSections() {
  if (!fs.existsSync(BLOCKS_DIR)) {
    return [];
  }
  return fs.readdirSync(BLOCKS_DIR)
    .filter((entry) => fs.statSync(path.join(BLOCKS_DIR, entry)).isDirectory())
    .filter((component) => !isRetired(component))
    .map((component) => {
      const snippetPath = findSnippet(component);
      const snippet = snippetPath ? fs.readFileSync(snippetPath, 'utf8') : '<p>No preview snippet found.</p>';
      return {
        component,
        title: titleCase(component),
        snippet,
        snippetPath: snippetPath && path.relative(path.join(__dirname, '..'), snippetPath)
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

function renderHTML(colors, components) {
  const colorCards = colors.map((color) => `
      <div class="color-card">
        <div class="swatch" style="background:${color.value}"></div>
        <div class="color-meta">
          <div class="color-name">${color.name}</div>
          <div class="color-value">${color.value}</div>
          <div class="color-prop"><code>${color.customProp}</code></div>
          <div class="color-js"><code>${color.jsPath}</code></div>
        </div>
      </div>`).join('\n');

  const componentBlocks = components.map((section) => `
      <section class="component">
        <header>
          <h3>${section.title}</h3>
          ${section.snippetPath ? `<p class="snippet-path">${section.snippetPath}</p>` : ''}
        </header>
        <div class="component-preview">
          ${section.snippet}
        </div>
      </section>`).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Envy UI Rich Styleguide Preview</title>
  <style>
    body { font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; margin: 0; background:#f4f5f7; color:#222; }
    header.hero { background:#101828; color:#fff; padding:48px 24px; }
    header.hero h1 { margin:0 0 12px; }
    header.hero p { max-width:720px; line-height:1.5; }
    main { padding:32px; max-width:1200px; margin:0 auto; }
    section { margin-bottom:48px; }
    .color-grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap:16px; }
    .color-card { background:#fff; border-radius:12px; box-shadow:0 2px 8px rgba(16,24,40,0.08); display:flex; }
    .color-card .swatch { width:80px; border-radius:12px 0 0 12px; }
    .color-meta { padding:12px; display:flex; flex-direction:column; gap:4px; }
    .color-name { font-weight:600; text-transform:capitalize; }
    .color-prop, .color-js { font-size:12px; color:#475467; }
    .component { background:#fff; border-radius:16px; padding:24px; box-shadow:0 4px 12px rgba(16,24,40,0.08); }
    .component header { border-bottom:1px solid #f0f2f5; margin-bottom:16px; padding-bottom:8px; }
    .component h3 { margin:0; }
    .snippet-path { font-size:12px; color:#475467; margin:4px 0 0; }
    .component-preview { padding-top:8px; }
    .component-preview .kss-test-flex { gap:8px; flex-wrap:wrap; }
    code { font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; background:#f2f4f7; padding:2px 6px; border-radius:6px; }
  </style>
</head>
<body>
  <header class="hero">
    <h1>Envy UI Rich Styleguide Preview</h1>
    <p>
      Tokens flow from the DTCG JSON in <code>src/dictionary/dtcg</code> through <code>dictionary_build.js</code> to generate JS exports, SCSS maps and custom properties.
      This page pulls directly from <code>from-dictionary/</code> outputs and the rendered KSS snippets to provide a design/dev friendly snapshot.
    </p>
  </header>
  <main>
    <section>
      <h2>Color Palette</h2>
      <p>Each card lists the token name, HEX value, implied CSS custom property, and the matching JS path (from <code>from-dictionary/javascripts/color.js</code>).</p>
      <div class="color-grid">
        ${colorCards}
      </div>
    </section>
    <section>
      <h2>Component Previews (Active / Not Retired)</h2>
      <p>Snippets are reused from <code>src/stylesheets/a/kss/build</code>. Hover/focus/disabled permutations inside each snippet come directly from the KSS template.</p>
    </section>
    ${componentBlocks}
  </main>
</body>
</html>`;
}

const colors = getColorRows();
const components = getComponentSections();
const html = renderHTML(colors, components);
fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
fs.writeFileSync(OUTPUT, html, 'utf8');
console.log(`Rich preview generated: ${OUTPUT}`);
