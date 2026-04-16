# Maintainer Component Model

## Component Families

- SCSS blocks live under `src/stylesheets/blocks/<block>/`.
- Many blocks expose `_index.scss` as the local entrypoint.
- KSS examples often live inside `kss/` subfolders near the block styles.
- JavaScript support code lives under `src/javascripts/`.

## Public JavaScript Surface

`src/javascripts/index.js` currently exports several categories:

- class-name composition helpers such as `ui` and `uiMerge`
- generated block-name and token-related exports from `from-dictionary`
- react-select integration helpers
- UI utilities such as `getBestPosition`, `checkOverflow`, and `makeMq`
- React components such as `Scrollbar`, `Portal`, and `Tooltip`
- React wrappers such as `CheckboxWrapper` and `FlexScrollbarWrapper`

## How To Reason About a "Component"

- Some features are CSS-first and may not have a dedicated React component.
- Some React pieces are wrappers around styling conventions rather than standalone design-system components.
- A block can have documentation in KSS even when the package API is mostly class-based.

## Maintainer Guidance

- Do not assume every UI element has a single canonical React component.
- Check whether the requested change belongs to styles, JS exports, generated dictionary output, or multiple layers.
- If a block already exists, extend its local pattern before creating a new abstraction.
