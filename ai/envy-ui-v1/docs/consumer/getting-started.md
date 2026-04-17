# Getting Started

## How To Treat the Package

Use `envy-ui` v1 as a production dependency that provides:

- a JavaScript API through the package entrypoint
- a stylesheet output through the built CSS files
- established styling and naming conventions used by the application

## Main Consumer Entry Points

- JavaScript entrypoint: package `main` resolves to `lib/index.js`
- Published CSS assets: `dist/css/ui.css` and `dist/css/ui.min.css`

## Preferred Integration Shape

- Import JavaScript APIs from the package root: `envy-ui`
- Import the published stylesheet from `envy-ui/dist/css/ui.min.css`
- Treat root exports and published CSS as the default integration boundary
- Build UI by composing block helpers and `uiA`, then assemble with `ui(...)` or `uiMerge(...)`
- Treat export availability as a starting point, not as automatic approval for new usage
- Check `deprecated-and-retired.md` before choosing an older-looking block or modifier pattern

## AI Bundle Sync In Consumer App

Install `envy-ui` as usual, then sync the AI bundle into the application repository.

From the consumer app root:

- `npx envy-ui-sync-ai-docs`

This copies `envy-ui-v1` docs and Copilot files into namespaced destinations such as:

- `docs/envy-ui-v1/*`
- `.github/instructions/envy-ui-v1.instructions.md`
- `.github/prompts/envy-ui-v1-*.prompt.md`
- `.github/envy-ui-v1/AGENTS.md`

Default behavior is additive and non-destructive:

- existing destination files are not overwritten unless explicitly forced

Useful modes:

- `npx envy-ui-sync-ai-docs --check` validates whether all target files are present and up to date
- `npx envy-ui-sync-ai-docs --dry-run` prints planned actions without writing files
- `npx envy-ui-sync-ai-docs --force` overwrites existing destination files with the bundle versions

## What Real Applications Commonly Do

In `envisio-core`, the most common pattern is:

- root imports from `envy-ui`
- class composition through `ui` and `uiA`
- block helpers such as `uiButton`, `uiFormRow`, `uiCard`, and `uiInputText`
- wrappers and utilities such as `OverlayScroll`, `CheckboxWrapper`, `rsSelect`, and `useMediaQuery`

`CheckboxWrapper` appears in real code, but it should be treated as a compatibility surface because it is built on `uiCheckboxLegacy`.

## Consumer Mindset

- Prefer using existing exports, classes, and documented patterns.
- Do not assume every visual element has a dedicated React component.
- Some capabilities are class-based, some export-based, and some wrapper-based.
- In many cases the correct answer is a composition of semantic block helpers plus `uiA`, not a single package component.

## When To Ask for Deeper Inspection

Inspect package source only when:

- the public export shape is unclear
- an existing pattern must be extended
- a usage bug appears to come from package behavior rather than app code
