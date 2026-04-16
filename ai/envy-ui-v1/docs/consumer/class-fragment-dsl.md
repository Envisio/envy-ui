# Class Fragment DSL

## Purpose

`envy-ui` v1 block helpers and `uiA` use template literals with a small DSL for building compiled class strings.

This DSL is part of the consumer-facing usage model.

It is not plain free-form text.

## Mental Model

A helper such as `uiButton`, `uiCard`, or `uiA` reads a string template and converts each fragment into one or more compiled class names.

Examples:

- `uiButton\`--mint-blue\``
- `uiButton\`__content --long\``
- `uiA\`f f-a-center w-100%\``

## Core Syntax

### Space-Separated Fragments

Fragments are separated by spaces.

Example:

- `uiA\`f f-a-center f-0-0-50\``

Result shape:

- one compiled class per fragment

### Elements

For block helpers, `__...` means a BEM element.

Example:

- `uiButton\`__content\``

Result shape:

- `env-button__content`

### Modifiers

For block helpers, `--...` means a BEM modifier.

Example:

- `uiButton\`--mint-blue --inactive\``

Result shape:

- `env-button env-button--mint-blue env-button--inactive`

Important rule:

- after an element fragment such as `__content`, following modifiers bind to that element

Example:

- `uiButton\`__content --long --disabled\``

Result shape:

- `env-button__content env-button__content--long env-button__content--disabled`

### Utility Fragments

For `uiA`, fragments are utility literals that receive the `env-a-` prefix when compiled.

Example:

- `uiA\`f f-a-center w-100%\``

Result shape:

- `env-a-f env-a-f-a-center env-a-w-100%`

## Conditional Syntax

### Include If True

Pattern:

- `fragment:${condition}`

Behavior:

- if condition is truthy, include `fragment`
- if condition is falsy, include nothing

Examples:

- `uiA\`f:${true}\`` -> include `f`
- `uiA\`f:${false}\`` -> include nothing

### True/False Branches

Pattern:

- `truthyFragment:falsyFragment:${condition}`

Behavior:

- if condition is truthy, include the left fragment
- if condition is falsy, include the right fragment

Examples:

- `uiA\`w-100%:w-50%:${true}\`` -> use `w-100%`
- `uiA\`w-100%:w-50%:${false}\`` -> use `w-50%`
- `uiButton\`--inactive:--disabled:${isDisabled}\`` -> choose one modifier branch

## Grouping

Parentheses allow multiple fragments to be treated as one branch.

Pattern:

- `(fragmentA fragmentB):fallback:${condition}`

Behavior:

- the grouped branch can expand into multiple compiled classes

Examples:

- `uiA\`(f-b-30 f-s-1):f-0-0-40:${true}\``
- `uiButton\`--ok (--mint-blue --inactive):${true}\``

This is useful when one condition should enable a whole composition rather than a single class.

## Interpolation

### Raw Fragment Injection

Pattern:

- `#${value}`

Behavior:

- inject the interpolated fragment into the helper pipeline
- if the value is falsy, nothing is added

Example:

- if `colorFragment = 'color-red'`, then `uiA\`f #${colorFragment}\`` includes the compiled utility for `color-red`

## Important Semantic Rules

### Predicates Are Consumed In Order

Conditions are evaluated in the order the DSL encounters them.

That means each conditional branch should be written clearly and locally.

### Element Context Changes Modifier Target

Once a block helper enters an element such as `__content`, later modifiers apply to that element context.

This is one of the most important BEM behaviors in the DSL.

### Grouped Branches Can Expand To Multiple Classes

A single condition can enable multiple compiled classes at once.

This is common in `uiA` compositions and in block-helper modifier groups.

## Good Consumer Usage

- keep fragments readable
- prefer short local conditions over dense nested expressions
- reuse nearby patterns from the application
- use grouped branches when a whole class bundle should turn on or off together

## What To Avoid

- do not write clever DSL expressions when a simple nearby pattern already exists
- do not assume every interpolated fragment is safe; it still has to match the helper vocabulary
- do not use the DSL to invent new `uiA` literals outside the precompiled vocabulary
- do not overload one helper literal with too many conditional modifier branches

## Stability Note

The DSL has practical complexity limits.

Simple and moderate expressions are fine. Large branch-heavy expressions can expose implementation bugs.

If a helper literal becomes too dense, prefer simplifying it or using an existing local workaround instead of making the DSL more clever.

## Copilot Rules

- Read the DSL as a constrained class-assembly language, not as plain strings.
- Preserve existing branch patterns when editing nearby code.
- Respect BEM element and modifier semantics when using block helpers.
- Respect `uiA` vocabulary limits when interpolating or branching utility fragments.
- Avoid turning one helper literal into a large rules engine.
- Prefer the tested patterns reference as the baseline for safe helper authoring.
