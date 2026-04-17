# Utility Class Reference

## Core Rule

`uiA` is not a free-form utility DSL.

It is a finite, precompiled vocabulary of utility-class fragments.

That means Copilot should not invent literals by analogy.

If a class fragment is not part of the compiled vocabulary, it may silently fail because the CSS class does not exist.

There is a second rule as well:

- even if a utility exists in compiled CSS, it should not automatically be treated as a recommended default in application code

There is a third rule as well:

- do not combine utility literals that set the same CSS property twice or that overlap on the same CSS property group

## JSX Usage Form

`uiA` fragments are used inside JS/JSX helper composition.

Canonical shape:

```jsx
<div {...ui([uiCard`--plain`, uiA`f f-column w-100% p-small`])}>
  ...
</div>
```

`uiA` literals are not a standalone HTML syntax and should not be documented as plain HTML classes for consumer usage.

Example:

- `w-10` is valid because `10` exists in the width iterator
- `w-29` is not safe because `29` is not part of the general width iterator

## Conflict-Free Composition

`uiA` literals should be internally consistent.

Do not combine fragments that compete over the same final CSS property.

This matters because many compiled utility classes have the same specificity.

If two classes set the same property, the winner is often just the class that appears later in the compiled bundle.

That makes the result fragile.

It may look correct today and break after a rebuild or after unrelated CSS generation changes.

## Unsafe Conflict Patterns

Avoid exact duplicates for the same CSS intent:

- `m-right-5 m-right-15`
- `w-100 w-150`
- `top-5 top-10`

Avoid overlapping shorthand and side-specific combinations when they touch the same property:

- `m-x-large m-right-large` because both affect `margin-right`
- `m-10 m-left-5` because both affect `margin-left`
- `p-y-small p-top-large` because both affect `padding-top`
- `w-100% w-min-100` is not a conflict because `width` and `min-width` are different properties

## Safe Composition Principle

Within one helper expression, each final CSS property should usually be decided once.

Good direction:

- `m-right-15` when only right margin is intended
- `m-x-large` when the same left and right margin is intended
- `p-y-small p-x-large` because vertical and horizontal padding target different property pairs

If a value needs to change conditionally, prefer a single branch over two competing fragments:

- prefer `m-right-5:m-right-15:${isLarge}`
- avoid `m-right-5 m-right-15:${isLarge}`

## Named Spacing Tokens

Common spacing aliases are used as shorthand values:

- `small` is typically `5px`
- an omitted size in the default spacing shorthands is typically `10px`
- `large` is typically `15px`

These are still spacing values, not separate property families.

That means combinations such as `m-x-large` plus `m-right-large` are still overlapping even when the numbers happen to match.

The issue is not just the numeric value. The issue is declaring the same property twice.

## Size Iterator Sets

The most important precompiled numeric sets are:

- General px iterator: `0` to `15` step `1`, then `20` to `250` step `5`, then `275` to `1700` step `25`
- Small iterator: `1` to `15` step `1`, then `20` to `100` step `5`
- Percent iterator: `1` to `15` step `1`, then `20` to `100` step `5`
- Font size px iterator: `5` to `36`
- Font size percent iterator: `50` to `150` step `5`
- Line-height iterator: `5` to `15`, plus `normal`

## What The Iterators Mean

- In most width, height, margin, and padding classes, bare numbers mean pixels
- `%`, `vw`, `vh`, `em`, and `rem` must be expressed through the supported literal suffixes
- Not every property supports every unit
- Negative values are only supported in specific utility families

## High-Value Shorthand Map

- `w`: `width`
- `w-min`: `min-width`
- `w-max`: `max-width`
- `h`: `height`
- `h-min`: `min-height`
- `h-max`: `max-height`
- `m`: `margin`
- `m-top`: `margin-top`
- `m-right`: `margin-right`
- `m-bottom`: `margin-bottom`
- `m-left`: `margin-left`
- `m-x`: `margin-left` and `margin-right`
- `m-y`: `margin-top` and `margin-bottom`
- `p`: `padding`
- `p-top`: `padding-top`
- `p-right`: `padding-right`
- `p-bottom`: `padding-bottom`
- `p-left`: `padding-left`
- `p-x`: `padding-left` and `padding-right`
- `p-y`: `padding-top` and `padding-bottom`
- `top`, `right`, `bottom`, `left`: positional offsets

## Width and Height

Supported utility families:

- `w-*`, `w-min-*`, `w-max-*`
- `h-*`, `h-min-*`, `h-max-*`

Supported value shapes:

- pixel values from the general px iterator
- percent values from the percent iterator
- viewport values from the percent iterator with `vw` or `vh`
- `auto`

Examples:

- `w-10` -> `width: 10px`
- `w-100%` -> `width: 100%`
- `w-50vw` -> `width: 50vw`
- `w-min-25` -> `min-width: 25px`
- `h-max-100vh` -> `max-height: 100vh`
- `w-auto` -> `width: auto`
- `w-max-auto` -> `max-width: none`

Unsafe example:

- `w-29` should be treated as invalid unless verified in compiled CSS

## Margin and Padding

Supported utility families:

- margin: `m`, `m-top`, `m-right`, `m-bottom`, `m-left`, `m-x`, `m-y`
- padding: `p`, `p-top`, `p-right`, `p-bottom`, `p-left`, `p-x`, `p-y`

Named values:

- `small`
- `large`
- `none`
- `auto` for margin only

Negative values:

- margin supports negative values through a trailing `-`
- padding does not support negative values

Examples:

- `m-10` -> `margin: 10px`
- `m-top-5-` -> `margin-top: -5px`
- `m-x-auto` -> horizontal auto margins
- `p-small` -> default small padding token
- `p-y-15` -> vertical padding `15px`
- `p-none` -> `padding: 0`

Conflict reminders:

- avoid `m-right-5 m-right-15`
- avoid `m-x-large m-right-large`
- prefer one margin decision per side

## Positional Offsets

Supported utility families:

- `top-*`
- `right-*`
- `bottom-*`
- `left-*`

Supported value shapes:

- pixel values from the general px iterator
- negative pixel values only from the small iterator
- percent values from the percent iterator
- zero shortcuts without a number

Examples:

- `top` -> `top: 0`
- `top-10` -> `top: 10px`
- `top-10-` -> `top: -10px`
- `left-50%` -> `left: 50%`

Important restriction:

- negative top/right/bottom/left values are only generated for the small iterator, not the full px iterator
- `top-125-` is not safe

## Display and Position

Display literals:

- `f`
- `f-inline`
- `block`
- `inline`
- `inline-block`
- `hide`
- `table`
- `inline-table`
- `table-row`
- `table-cell`
- `g`
- `g-inline`

Position literals:

- `static`
- `fixed`
- `absolute`
- `relative`
- `sticky`

Examples:

- `f` -> `display: flex`
- `inline-block` -> `display: inline-block`
- `absolute` -> `position: absolute`

## Flex Utilities

Common flex families:

- `f-row`, `f-column`, `f-wrap`, `f-nowrap`
- `f-j-*` for `justify-content`
- `f-a-*` for `align-items`
- `f-a-content-*` for `align-content`
- `f-a-self-*` for `align-self`
- `f-gap*` for flex gap
- `f-g-*` for `flex-grow`
- `f-s-*` for `flex-shrink`
- `f-b-*` for `flex-basis`
- `f-<grow>-<shrink>-<basis>` for `flex`

Examples:

- `f f-column f-gap-small`
- `f-j-space-between f-a-center`
- `f-1-1-auto`
- `f-0-0-100%`

Important note:

- flex utilities are also precompiled and finite
- aliases such as `small`, `large`, and the default gap variant are explicitly defined, not inferred

## Text Utilities

Supported text families:

- `font-size-*`
- `line-height-*`
- `text-align-*`

Examples:

- `font-size-14` -> `font-size: 14px`
- `font-size-12em` -> `font-size: 1.2em`
- `font-size-95%` -> `font-size: 95%`
- `line-height-12` -> `line-height: 1.2`
- `line-height-normal`
- `text-align-center`

Additional precompiled text helpers also exist, such as:

- `ellipsis`
- `text-default`
- `text-link`
- `nowrap`
- `wrap`
- `bold`
- `semibold`
- `italic`

## Color Utilities

Color utilities are also token-based and precompiled.

Common family shapes:

- `color-*`
- `color-hover-*`
- `color-bg-*`
- `color-bg-hover-*`

These use named color tokens, not arbitrary CSS color literals.

## Copilot Rules

- Never invent numeric `uiA` literals by analogy.
- Prefer copying an existing nearby pattern from the application.
- If an exact numeric value is needed, verify it against the known iterator set before suggesting it.
- Treat `uiA` as a constrained vocabulary, not as open-ended utility CSS.
- Treat rare but valid utilities as exceptions unless the local feature already uses them.
- Avoid suggesting overlapping utility fragments that compete over the same CSS property.
- Prefer one clear property decision over multiple same-specificity classes that happen to override each other.
