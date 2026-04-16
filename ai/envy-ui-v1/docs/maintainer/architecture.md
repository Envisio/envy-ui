# Maintainer Architecture

## Top-Level Layers

- `src/stylesheets/`: SCSS source for blocks, utilities, resets, overwrite rules, and context-specific styles.
- `src/javascripts/`: package runtime exports, React wrappers, React components, utilities, and generated files.
- `src/dictionary/`: source data used to generate style-related artifacts.
- `styleguide/`: KSS builder assets and styleguide homepage sources.
- `dist/`: built CSS and generated styleguide output.
- `lib/`: transpiled JavaScript output.

## Important Entry Points

- `src/javascripts/index.js` is the main public JS export surface.
- `src/stylesheets/ui.scss` is the main stylesheet entrypoint.
- `dictionary_build.js` generates dictionary-derived source artifacts.

## Architectural Consequences

- A request that looks like "add a component" might require edits across SCSS, KSS examples, dictionary inputs, and JS exports.
- The library is not organized like a modern single-framework component package.
- Maintainers should inspect surrounding files before proposing a pattern.

## Change Strategy

- Match the nearest existing component or utility.
- Reuse current naming and file placement conventions.
- Keep backwards compatibility unless the request explicitly allows a break.
