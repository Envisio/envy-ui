# Public API

## Source of Truth

The main JavaScript source of truth for consumer-facing exports is `src/javascripts/index.js`.

The published package exposes the transpiled output through `lib/index.js`.

Real usage in `envisio-core` confirms that application code primarily consumes the package from the root `envy-ui` import.

## Export Categories

The package currently exposes these broad categories:

- class-name helpers such as `ui`, `uiMerge`, and `getClassActive`
- generated block-name and token-related exports
- UI utilities such as `getBestPosition`, `checkOverflow`, `makeMq`, `contrastColor`, and `styleObjectToString`
- React helpers such as `useResizeDetector` and `useMediaQuery`
- React components and wrappers such as `Tooltip`, `Portal`, `Scrollbar`, `CheckboxWrapper`, and `FlexScrollbarWrapper`
- react-select integration helpers

## Composition-Critical Exports

For most consumer work, the most important exports are:

- `ui` as the normal class assembly wrapper that returns `className`
- `uiMerge` when a raw class string is needed
- semantic block helpers such as `uiButton`, `uiCard`, `uiFormRow`, `uiTable`, and `uiBadge`
- `uiA` as the utility-class layer for layout, spacing, sizing, and positioning

Together, these exports form the main composition model used by real application code.

Within that model, block modifiers should be the first choice for intrinsic component styling, while `uiA` should mostly handle layout and utility concerns.

## Most Commonly Used Consumer Exports

In real application code, these exports appear most often:

- `ui` and `uiA` for class composition
- block helpers such as `uiButton`, `uiFormRow`, `uiCard`, `uiInputText`, `uiBadge`, `uiView`, `uiSelect`, `uiModal`, and `uiTable`
- integration helpers such as `uiMerge`, `rsSelect`, and `rsDropdownMenu`
- wrappers and components such as `OverlayScroll`, `Scrollbar`, and `CheckboxWrapper`
- behavior and display helpers such as `useMediaQuery`, `useResizeDetector`, `visualSettings`, `statusModifiers`, and `styleObjectToString`

## Consumer Rule

Use only published exports and published CSS assets as your primary integration surface.

Do not treat internal source folders as stable API contracts unless the package team explicitly documents them that way.

## Availability vs Recommendation

Some generated exports still exist for compatibility even though they should not be introduced in new application code.

Treat `deprecated-and-retired.md` as the filter on top of raw export availability.

In particular:

- `Legacy` names are compatibility signals, not default building blocks
- Styleguide entries marked `Retired:` should not be proposed for new UI
- wrappers built on retired blocks should also be treated as compatibility-only
- existing usage may remain in place when a feature area already depends on it

## Safe Guidance for Copilot

When helping with `envy-ui` v1 in an application:

- prefer imports from the package root
- prefer existing CSS classes and existing exports
- avoid inventing unofficial subpath imports for new code
- avoid suggesting internal package file paths as if they were public API
