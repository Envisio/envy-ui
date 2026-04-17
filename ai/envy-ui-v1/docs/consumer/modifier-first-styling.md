# Modifier-First Styling

## Core Rule

Block helpers own the intrinsic styling of the component they represent.

`uiA` should mostly describe external layout and utility concerns that are not already encoded in the block.

That means:

- block modifiers should control the normal visual identity of a button, badge, card, or view
- `uiA` should mostly control layout, spacing, positioning, sizing, flex behavior, and similar utility concerns

## Why This Matters

`uiA` utilities are compiled with `!important`.

In practice, that means a utility class can override block styling very aggressively.

This is useful for narrow exceptions, but it is a poor default authoring strategy.

If a block already owns a visual concern, overriding that concern with `uiA` usually creates fragile code:

- the design-system modifier model is bypassed
- component states such as hover, focus, active, and disabled may no longer stay coherent
- later refactors become harder because the intent is split between the block and unrelated utility overrides

## Decision Order

When a request changes the visual meaning of a block, use this order:

1. Check whether the block already has a native modifier for that concern.
2. Check whether nearby application code already uses a modifier-based pattern for the same case.
3. Only use a utility override if the case is truly exceptional and there is no clean block-level answer.

Example:

- request: make a button red
- first check `uiButton` modifiers such as `--red`, `--warning`, `--default`, `--mint-blue`, `--content-*`
- do not start by adding `uiA` color utilities to force the button text or background red

## What Utilities Are Good For

Typical good uses of `uiA`:

- spacing around a block
- flex and layout composition
- width and height constraints
- positioning
- one-off layout behavior in a local feature

Typical bad uses of `uiA`:

- changing the semantic color system of a button when button modifiers already exist
- overriding text color inside a block just because the current modifier was not checked first
- replacing block-level shape, state, or focus behavior with ad hoc utilities

## Good And Bad Patterns

Good:

```jsx
<button type="button" {...ui([uiButton`--default --small`, uiA`m-right`])}>
  <span {...ui([uiButton`__content`])}>Save</span>
</button>
```

```jsx
<button type="button" {...ui([uiButton`--clean --content-link`, uiA`m-left-auto`])}>
  <span {...ui([uiButton`__content`])}>Open</span>
</button>
```

```jsx
<span {...ui([uiBadge`--warning --small`, uiA`m-right-small`])}>Warning</span>
```

Bad as a default:

```jsx
<button type="button" {...ui([uiButton`--default`, uiA`color-red`])}>
  <span {...ui([uiButton`__content`])}>Save</span>
</button>
```

```jsx
<button type="button" {...ui([uiButton`--mint-blue`, uiA`color-white color-bg-red`])}>
  <span {...ui([uiButton`__content`])}>Save</span>
</button>
```

```jsx
<span {...ui([uiBadge`--info`, uiA`color-orange`])}>Info</span>
```

Those utility overrides may appear to work, but they bypass the block's own visual contract.

## Modifier Map For Common Blocks

### uiButton

Use `uiButton` modifiers first for button appearance and states.

Canonical modifier families from the library:

- container/color: `--clean`, `--default`, `--mint-blue`, `--light-blue`, `--green`, `--red`, `--warning`, `--complete`
- content color: `--content-link`, `--content-gray`, `--content-inverse`
- size: `--xsmall`, `--small`, `--large`
- shape: `--circle`, `--round`
- presentation/state: `--covered`, `--inline`, `--map`, `--menu`, `--menu-top`, `--menu-bottom`, `--menu-stack`, `--loading`, `--inactive`

Observed common patterns in `envisio-core`:

- very common: `__content`
- common: `--clean`, `--default`, `--content-link`, `--content-gray`, `--small`, `--mint-blue`, `--circle`
- recurring specialized patterns: `--map`, `--covered`, `--content-inverse`, `--focus`, `--active`

Notes:

- `--round-hover` exists in real app code, but it is retired and should not be used for new work.
- if the request is about button identity, color, or state, stay in `uiButton` modifiers first.

### uiBadge

Use `uiBadge` modifiers first for badge type, size, and semantic status.

Canonical modifier families from the library:

- color/status: `--info`, `--ok`, `--error`, `--warning`, `--status-pending`, `--status-on-track`, `--status-minor-disruption`, `--status-major-disruption`, `--status-upcoming`, `--status-discontinued`, `--status-completed`
- size: `--xsmall`, `--small`, `--large`, `--xlarge`
- presentation: `--tag`, `--circle`, `--round`, `--counter`, `--counter-light`

Observed common patterns in `envisio-core`:

- common: `--small`, `--counter`, `--xsmall`, `--tag`, `--circle`, `--counter-light`
- present but less common: `--warning`, `--info`, `--error`, `--status-*`

### uiCard

Use `uiCard` modifiers first for card mood, emphasis, status, and shadow.

Canonical modifier families from the library:

- look/state: `--plain`, `--brand-border`, `--brand`, `--muted`, `--active`, `--selected`, `--no-border`
- alert/status: `--alert-warning`, `--status-pending`, `--status-on-track`, `--status-minor-disruption`, `--status-major-disruption`, `--status-upcoming`, `--status-discontinued`, `--status-completed`
- shadow: `--shadow-strong`, `--shadow-xstrong`, `--no-shadow`

Observed common patterns in `envisio-core`:

- common elements: `__header`, `__content`, `__footer`
- common modifiers: `--shadow-xstrong`, `--plain`, `--selected`

### uiView

`uiView` is mostly a structural block.

Its main power comes from elements rather than a large modifier family.

Common structural elements:

- `__header`
- `__header-title`
- `__main-wrapper1`
- `__main-wrapper2`
- `__main`

Known modifier:

- `--darker`

Observed common patterns in `envisio-core`:

- the element layer dominates
- `--darker` exists, but is much less common than the structural elements

## Consumer Rule

When block modifiers already express the component concern, prefer the block modifier.

Reach for `uiA` when the concern is outside the block's semantic styling contract.

## Copilot Rules

- treat block modifiers as the first place to look for component color, size, state, and semantic presentation
- treat `uiA` as a local override and layout layer, not as the default way to restyle a component's intrinsic design-system behavior
- before suggesting a utility override, check whether the block already has a native modifier family for that concern
- if a utility override is proposed anyway, call it out as an exception rather than as the standard pattern
