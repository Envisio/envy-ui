# Utility Class Reference

## Core Rule

`uiA` is not a free-form utility DSL.

It is a finite, precompiled vocabulary of utility-class fragments.

That means Copilot should not invent literals by analogy.

If a class fragment is not part of the compiled vocabulary, it may silently fail because the CSS class does not exist.

There is a second rule as well:

- even if a utility exists in compiled CSS, it should not automatically be treated as a recommended default in application code

Example:

- `uiA\`w-10\`` is valid because `10` exists in the width iterator
- `uiA\`w-29\`` is not safe because `29` is not part of the general width iterator

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

- `uiA\`w-10\`` -> `width: 10px`
- `uiA\`w-100%\`` -> `width: 100%`
- `uiA\`w-50vw\`` -> `width: 50vw`
- `uiA\`w-min-25\`` -> `min-width: 25px`
- `uiA\`h-max-100vh\`` -> `max-height: 100vh`
- `uiA\`w-auto\`` -> `width: auto`
- `uiA\`w-max-auto\`` -> `max-width: none`

Unsafe example:

- `uiA\`w-29\`` should be treated as invalid unless verified in compiled CSS

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

- `uiA\`m-10\`` -> `margin: 10px`
- `uiA\`m-top-5-\`` -> `margin-top: -5px`
- `uiA\`m-x-auto\`` -> horizontal auto margins
- `uiA\`p-small\`` -> default small padding token
- `uiA\`p-y-15\`` -> vertical padding `15px`
- `uiA\`p-none\`` -> `padding: 0`

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

- `uiA\`top\`` -> `top: 0`
- `uiA\`top-10\`` -> `top: 10px`
- `uiA\`top-10-\`` -> `top: -10px`
- `uiA\`left-50%\`` -> `left: 50%`

Important restriction:

- negative top/right/bottom/left values are only generated for the small iterator, not the full px iterator
- `uiA\`top-125-\`` is not safe

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

- `uiA\`f\`` -> `display: flex`
- `uiA\`inline-block\`` -> `display: inline-block`
- `uiA\`absolute\`` -> `position: absolute`

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

- `uiA\`f f-column f-gap-small\``
- `uiA\`f-j-space-between f-a-center\``
- `uiA\`f-1-1-auto\``
- `uiA\`f-0-0-100%\``

Important note:

- flex utilities are also precompiled and finite
- aliases such as `small`, `large`, and the default gap variant are explicitly defined, not inferred

## Text Utilities

Supported text families:

- `font-size-*`
- `line-height-*`
- `text-align-*`

Examples:

- `uiA\`font-size-14\`` -> `font-size: 14px`
- `uiA\`font-size-12em\`` -> `font-size: 1.2em`
- `uiA\`font-size-95%\`` -> `font-size: 95%`
- `uiA\`line-height-12\`` -> `line-height: 1.2`
- `uiA\`line-height-normal\``
- `uiA\`text-align-center\``

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
