# Composition Model

## Core Mental Model

`envy-ui` v1 is primarily a composition system built around BEM-style class assembly.

For consumer applications, the most important idea is:

- do not start by searching for a single React component for every UI task
- start by composing the right exported block helpers and utility helpers

## Main Roles

### Block Helpers

Exports such as `uiButton`, `uiBadge`, `uiCard`, `uiFormRow`, `uiTable`, and similar helpers represent semantic UI blocks.

These helpers are used to build block, element, and modifier class fragments.

They describe what the UI piece is.

## Utility Layer

`uiA` is the utility-class layer.

It is a precompiled, finite vocabulary of utility literals, not an open-ended Tailwind-style free-form language.

It is typically used for:

- layout
- spacing
- positioning
- sizing
- display and flex behavior
- other utility-style adjustments

It describes how the UI piece is arranged or adjusted.

It should not be the default way to replace intrinsic block styling when the block already has a modifier family for that concern.

## Assembly Layer

`ui(...)` is the standard assembly point used in application code.

It combines class fragments and returns a `className` prop object.

`uiMerge(...)` combines class fragments and returns a raw class string.

The fragments passed into block helpers and `uiA` are not plain strings. They use a small DSL for elements, modifiers, conditional branches, grouping, and interpolation.

## Practical Composition Pattern

A common pattern is:

- semantic block helper for the base UI meaning
- optional block or element modifiers
- `uiA` for spacing, layout, or behavioral utility classes
- `ui(...)` or `uiMerge(...)` to assemble the final result

Examples of the mindset:

- `uiButton` gives button semantics
- `uiCard` gives card semantics
- `uiA` adds layout or spacing behavior
- `uiButton` plus `uiCard` can create a card that behaves like a button

## Consumer Rule

When using `envy-ui` v1 in an application:

- think in compositions, not in isolated components
- treat block helpers as semantic structure
- treat `uiA` as the utility adjustment layer
- prefer block modifiers over utility overrides when the concern belongs to the block itself
- treat `uiA` literals as constrained to the compiled vocabulary
- filter candidate helpers through `deprecated-and-retired.md` before using them in new code
- prefer extending an existing composition pattern already used in the app

## Copilot Guidance

- If a task sounds visual, first infer the likely composition of block helpers plus `uiA`.
- Prefer existing composition patterns already present in the consumer app.
- Do not jump to package internals or redesign the abstraction unless the task is actually about changing `envy-ui`.
