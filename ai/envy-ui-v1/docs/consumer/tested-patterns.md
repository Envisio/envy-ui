# Tested Patterns

## Purpose

These patterns are directly based on the current `getBlock` test layer.

They are the safest examples to show Copilot because they are already backed by explicit expected outputs.

## Recommendation

Prefer staying close to these patterns.

In normal application work, these tested shapes are usually enough:

- simple utility composition
- simple conditional include
- simple true/false branch
- grouped branch
- standard block modifier usage
- standard element plus modifier usage

If a new helper literal starts getting much more complex than these examples, treat that as a warning sign.

## Tested `uiA` Patterns

### Simple Utility

Input:

```js
uiA`f`
```

Output:

```text
env-a-f
```

### Conditional Include

Input:

```js
uiA`f:${true}`
```

Output:

```text
env-a-f
```

Input:

```js
uiA`f:${false}`
```

Output:

```text

```

### Simple Utility Composition

Input:

```js
uiA`f f-a-center f-0-0-50`
```

Output:

```text
env-a-f env-a-f-a-center env-a-f-0-0-50
```

### Interpolation

Input:

```js
const iClass = 'color-red';
uiA`f #${iClass} f-0-0-50:${true}`
```

Output:

```text
env-a-f env-a-color-red env-a-f-0-0-50
```

### Mixed Conditions With Fallback

Input:

```js
uiA`f h-10:${4 === 4} z-1:${false} f-0-0-50:f-0-0-40:${4 === 3} w-100%:w-50%:${true}`
```

Output:

```text
env-a-f env-a-h-10 env-a-f-0-0-40 env-a-w-100%
```

### Grouped Branch

Input:

```js
uiA`f (f-b-30 f-s-1):f-0-0-40:${4 === 4} w-100%:w-50%:${false}`
```

Output:

```text
env-a-f env-a-f-b-30 env-a-f-s-1 env-a-w-50%
```

### Grouped Branch Without Leading Base Fragment

Input:

```js
uiA`(f-b-30 f-s-1):f-0-0-40:${4 === 4} w-100%:w-50%:${false}`
```

Output:

```text
env-a-f-b-30 env-a-f-s-1 env-a-w-50%
```

## Tested Block Helper Patterns

### Simple Modifiers

Input:

```js
uiButton`--mint-blue --inactive:${4 === 4} --disabled:${false}`
```

Output:

```text
env-button env-button--mint-blue env-button--inactive
```

### True/False Modifier Branch

Input:

```js
uiButton`--mint-blue --inactive:--disabled:${4 === 3}`
```

Output:

```text
env-button env-button--mint-blue env-button--disabled
```

### Grouped Modifier Branch

Input:

```js
uiButton`--ok (--mint-blue --inactive):${3 === 3}`
```

Output:

```text
env-button env-button--ok env-button--mint-blue env-button--inactive
```

### Element Plus Modifiers

Input:

```js
uiButton`__content --smart --long --inactive:--disabled:${4 === 3}`
```

Output:

```text
env-button__content env-button__content--smart env-button__content--long env-button__content--disabled
```

### Element Plus Grouped Modifier Branch

Input:

```js
uiButton`__content --long (--inactive --disabled --ok):--disabled:${4 === 4}`
```

Output:

```text
env-button__content env-button__content--long env-button__content--inactive env-button__content--disabled env-button__content--ok
```

## Practical Rule For Copilot

If a proposed helper literal is noticeably more complex than these tested patterns:

- simplify it
- split it
- follow a nearby established pattern
- or use an existing narrow workaround if the feature area already has one

These examples are not the only valid possibilities, but they are the most trustworthy baseline because they are already locked into tests.
