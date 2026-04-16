# Application Conventions

## Core Rule

The full `envy-ui` v1 utility vocabulary is larger than the subset that is commonly used in real application code.

The same is true for block helpers and wrappers: some still exist for compatibility even though they are no longer good defaults for new code.

For Copilot and application engineers, the preferred strategy is:

- first look for an existing nearby pattern in the application
- copy the established approach when it already fits
- only use a less common utility when there is a clear reason

Being supported by the library does not automatically make a pattern a good default.

Availability is weaker than convention, and convention is weaker than an explicit `Legacy` or `Retired` signal.

## Pattern-First Guidance

In `envisio-core`, many layouts and UI compositions are repeated with only small variations.

That means the safest approach is usually:

- find a similar screen, panel, table row, form row, popup, or filter block
- reuse the same `ui`, `uiA`, block-helper, and wrapper composition
- change only the minimum necessary values

This is often better than building a fresh but theoretically valid composition from scratch.

This applies to DSL workarounds too.

If a feature area already uses a narrow compatibility workaround for a helper limitation, it is usually safer to follow that local pattern than to invent a new complex helper expression.

The same rule applies to helper DSL shape:

- prefer patterns that are already reflected in the test layer
- treat much denser expressions as exceptions that need extra caution

## Observed Usage Profile

Based on current `uiA` usage in `envisio-core`:

- flex-related tokens dominate the codebase
- grid usage is effectively absent
- viewport units exist, but are rare and usually tied to specific overlay or panel constraints
- common recurring utilities include `f`, `f-a-center`, `f-column`, `f-gap`, `m-x`, `m-right-auto`, `ellipsis`, `relative`, and width helpers such as `w-100%`

Observed signals from the application:

- flex-related tokens: very common
- grid tokens: `0` observed in `uiA` literals
- viewport-width tokens: extremely rare
- viewport-height tokens: rare

## What This Means In Practice

### Layout

- prefer flex patterns first
- do not introduce grid just because `envy-ui` supports a grid display utility

### Sizing

- prefer sizes already common in nearby code
- do not introduce viewport-based sizing unless the surrounding feature already uses it or the UI problem clearly needs it

### Positioning

- `relative`, `absolute`, `fixed`, and `sticky` are valid tools
- use them when the local feature pattern already calls for overlays, floating panels, date pickers, sticky side sections, or similar behaviors
- do not add positional complexity when a simpler existing flex/layout pattern already works

### Helper DSL

- keep helper literals simple when possible
- do not assume a technically valid but denser helper expression is better than an established local workaround
- if nearby code already falls back to a raw compiled class for a known bug, preserve that choice unless the underlying library bug is fixed

## Good Default Questions

Before introducing a `uiA` literal, ask:

- Is there a nearby example in the same feature area?
- Is this token already common in the app?
- Is this solving the problem the same way the app usually solves it?
- Am I choosing this because it is available, or because it is actually established?

Before introducing a block helper, wrapper, or modifier, ask:

- Does the name include `Legacy`?
- Is this surface listed in `deprecated-and-retired.md`?
- Is there a nearby active pattern that avoids the retired surface entirely?

## Copilot Rules

- Prefer the nearest existing application pattern over a newly invented but valid utility combination.
- Treat rarely used utilities as exceptions, not defaults.
- Prefer flexbox-oriented compositions unless the code around the task already uses another pattern.
- If a utility is technically valid but uncommon in the app, explain that choice instead of presenting it as the normal default.
- Treat `Legacy` and `Retired` surfaces as compatibility-only even when they are still importable.
