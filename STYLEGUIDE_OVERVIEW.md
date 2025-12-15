# Envy UI Styleguide Overview

This document complements the generated KSS reference by summarising how the styleguide is produced, how design tokens flow through the tools, and why we now standardise on the Design Tokens Community Group (DTCG) format.

---

## Token Layer

*Source:* `src/dictionary/dtcg/`  
*Builder:* `dictionary_build.js` (run via `npm run dictionary` or `npm run run-all`)

- #### DTCG JSON
  - Every token lives in a structured JSON tree (`color/base.json`, `block/name.json`, etc.).
  - The `$value`, `$type`, `$description`, etc. fields follow the [W3C DTCG Format 1.0](https://design-tokens.github.io/community-group/format/).
  - Tokens are grouped by category (`color`, `shape`, `block`, `block-name`, …) so they can be composed or filtered during the build.

- #### Why DTCG matters
  - **Interoperability** – One JSON definition can drive CSS, JS, iOS, or Android outputs without bespoke converters.
  - **Traceability** – `$description`, `$type`, and references (`{color.brand-primary.$value}`) survive the build process.
  - **Governance** – Downstream tools (Storybook, design hand-off, etc.) can validate tokens automatically because they share the same schema.

---

## Export Layers

### 1. Stylesheets (`from-dictionary/stylesheets/`)

- **SCSS variables and maps** (`_color.scss`, `_color-map.scss`, `_block-name.scss`, etc.) are generated via Style Dictionary.
- These files are re-imported by `src/stylesheets/` to build the main UI bundles and to power the KSS examples.
- Custom properties (`:root { --color-brand-primary: … }`) can be emitted from the same tokens by enabling the relevant formatter; the infrastructure is already in place via Style Dictionary’s DTCG transforms.

### 2. JavaScript (`from-dictionary/javascripts/`)

- **Color exports** (`color.js`, `color-default.js`) expose token values to React/Vanilla JS consumers.
- **Block name helpers** (`block_name.js`, `block_raw_name.js`) wrap tokens with the runtime helper `get_block`, so UI code can do `uiButton\`--mint-blue\`` without hard-coding class names.
- These modules are re-exported in `src/javascripts/index.js` and eventually published through the library bundles.

### 3. Styleguide Assets (`from-dictionary/styleguide/` + `styleguide/`)

- Pug partials (e.g., `_color.pug`) and the JSON payload for the homepage (`block_name.styleguide.js`) come from the same token source.
- `npm run render-styleguide-homepage` and `npm run render-markups` render the markdown/HTML that KSS displays.
- KSS sections pull both the narrative Markdown and live HTML snippets (e.g., Button2 examples) so designers and engineers share the exact same source of truth.

---

## Build & Publishing Pipeline

1. `npm run dictionary`
   - Loads Style Dictionary (ESM) and registers the custom DTCG bridge.
   - Wipes `from-dictionary/` and regenerates SCSS, JS, and styleguide fragments in a single root folder.

2. `npm run sass-envisio-ui` / `npm run sass-styleguide`
   - Consume the generated SCSS to produce the distributable CSS bundles and the KSS skin.

3. `npm run babel` + `npm run js-test`
   - Transpile the JS helpers (including exported tokens) and validate the runtime behaviour (e.g., block class helpers).

4. `npm run render-styleguide-homepage` + `npm run render-markups`
   - Render the markdown/HTML documentation that combines token data, component usage, and the “Status: Retired / Beta / Stable” metadata that KSS surfaces.

5. Optional publishing (storybook, npm, internal docs) can reuse the same outputs because everything is token-driven.

---

## Reading the Styleguide

- Each KSS section mirrors a component folder under `src/stylesheets/blocks/…/kss/`.
- The **“Status”** header indicates whether the component is stable, beta, or retired.
- Live examples use the generated token classes (e.g., `env-button2--mint-blue`) so any visual change made in DTCG will propagate to the docs automatically.
- Designers can cross-reference the token names exported through JS when they build design specs, ensuring class names, JS helpers, and styleguide snippets stay in sync.

---

By keeping the tokens authoritative and rendering both developer-facing (JS, SCSS) and human-facing (KSS HTML) assets from the same source, the Envy UI styleguide remains consistent, auditable, and easy to extend. If you need to extend the documentation, start by updating the DTCG tokens or the KSS markdown files—everything else is generated.
