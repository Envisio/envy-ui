# Maintainer Styling Model

## Styling Entry Point

- The package stylesheet entrypoint is `src/stylesheets/ui.scss`.

## Core Styling Structure

- `src/stylesheets/blocks/` contains block-level styles.
- `src/stylesheets/a/` contains abstract utility-style primitives and related KSS assets.
- `src/stylesheets/reset/` contains reset styles.
- `src/stylesheets/overwrite/` contains overwrite layers.
- `src/stylesheets/context/` contains context-specific styles.

## Build Reality

- `ui.scss` pulls together dictionary outputs, utilities, reset styles, third-party styles, block imports, and overwrite layers.
- The codebase uses Sass modules with `@use`, and some older commented import patterns still exist nearby.
- KSS artifacts are part of the documentation and authoring flow, not noise to ignore blindly.

## Maintainer Guidance

- Prefer editing the nearest existing SCSS block or helper instead of creating a new styling system.
- Preserve naming and folder patterns used by neighboring files.
- If a style change affects examples or documentation, inspect the relevant `kss/` files.
- Avoid introducing CSS-in-JS or framework-specific styling patterns into v1.
