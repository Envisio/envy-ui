# Supported Import Patterns

## Preferred JavaScript Pattern

Prefer imports from the package root:

- `import { ui, uiA, uiButton } from 'envy-ui'`

This is the main consumer-facing integration shape used across real application code.

## Preferred CSS Pattern

Prefer importing published CSS assets:

- `@import 'envy-ui/dist/css/ui.min.css';`

## Common Root Exports in Real Usage

The most common imports seen in `envisio-core` include:

- `ui`
- `uiA`
- `uiButton`
- `uiFormRow`
- `uiCard`
- `uiInputText`
- `uiMerge`
- `OverlayScroll`
- `CheckboxWrapper`
- `uiBadge`
- `uiView`
- `uiSelect`
- `uiModal`
- `uiTable`
- `rsSelect`

`CheckboxWrapper` is common in existing code, but it should be treated as a compatibility import because it relies on `uiCheckboxLegacy`.

## Compatibility Exceptions

Some existing application code uses deep imports such as:

- `envy-ui/lib/`
- `envy-ui/lib/react_select/rs_select`
- `envy-ui/lib/react_select/rs_dropdown_menu`

Treat these as compatibility exceptions in existing code, not as the preferred default for new usage.

## Copilot Guidance

- Prefer root imports first.
- Suggest deep imports only when maintaining an existing integration that already depends on them.
- Do not present package-internal paths as the normal public API unless there is a compatibility reason.
