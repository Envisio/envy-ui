# Usage Patterns

## Typical Integration Shapes

An application usually uses `envy-ui` v1 in one or more of these ways:

- import package exports from `envy-ui`
- apply compiled `envy-ui` class strings through `className` in JSX/TSX markup
- use provided React components or wrappers where they already match the app's pattern
- combine app-specific code with `envy-ui` helpers instead of reimplementing package behavior

## Dominant Pattern in Real Consumer Code

The most common pattern in `envisio-core` is a mixed class-composition approach:

- `ui(...)` is used to build props for elements
- `uiA` is used heavily for utility-style class fragments
- block helpers such as `uiButton`, `uiCard`, `uiFormRow`, `uiTable`, and `uiInputText` are combined with `ui` and `uiMerge`

This means many consumer tasks are not about finding a single React component. They are about composing the right exported helpers together.

## Existing Pattern Wins

In real application code, the best local pattern is usually more important than the full theoretical capability of the library.

If the same kind of screen or interaction already exists nearby:

- prefer copying that composition shape
- keep the same layout strategy
- keep the same utility idioms when they already solve the problem cleanly

This is especially important because many real code paths evolve by adapting existing feature code rather than by inventing a new pattern every time.

## How To Read a Typical Composition

A common `envy-ui` v1 composition has these layers:

- one or more semantic block helpers for structure and meaning
- BEM-style element or modifier fragments attached through those helpers
- `uiA` for layout and utility concerns
- `ui(...)` or `uiMerge(...)` to assemble the final classes

This is the normal way to express things like:

- a card that behaves like a button
- a form row with layout utilities
- a badge or table row with extra positioning, spacing, or state-related utility classes

The composition is often further controlled through the helper DSL:

- conditional fragments
- fallback branches
- grouped class bundles
- interpolated reusable fragments

Helper-template literals belong to JS/JSX helper calls, not raw HTML authoring.

The normal styling delegation is:

- block helper plus modifiers for component-owned styling
- `uiA` for layout and utility adjustments around that component

## Practical Rule of Thumb

Before adding new code, decide which of these is actually needed:

- class-based styling only
- a package utility function
- a package React wrapper or component
- a mixed approach

## Common Consumer Scenarios

- Form screens often use `uiFormRow`, `uiInputText`, `uiButton`, `uiSelect`, and, in older flows, `CheckboxWrapper`
- Table and list screens often use `uiTable`, `uiBadge`, `uiButton`, `uiFocus`, and `OverlayScroll`
- Modal flows often use `uiModal`, `uiMerge`, and button helpers
- Visual and analytics screens often use `visualSettings`, `styleObjectToString`, `Scrollbar`, or `OverlayScroll`
- Filter and picker flows often use `rsSelect`, `rsDropdownMenu`, and documented input helpers

## Prefer Existing Shapes

- If a task is mostly visual, first check whether existing classes are enough.
- If a task needs behavior already covered by a helper or wrapper, prefer the package export over app-local duplication.
- If the package does not expose a clean public hook for a need, keep app glue code local instead of assuming hidden internals are safe.
- If a task needs both semantics and layout, prefer composing a block helper with `uiA` instead of overloading one helper to do both jobs.
- If a task changes a block's intrinsic look, check that block's modifier families before reaching for `uiA` overrides.

## What To Avoid

- Do not ask Copilot to redesign `envy-ui` from the application side.
- Do not assume package-internal SCSS files are meant to be imported directly by the application.
- Do not assume undocumented internals are stable across package updates.
- Do not assume deep imports are the preferred starting point for new integrations.
- Do not choose a rare but supported utility pattern when an established local pattern already exists.
- Do not revive `Legacy` or `Retired` blocks just because they are still available in package exports or existing app code.
