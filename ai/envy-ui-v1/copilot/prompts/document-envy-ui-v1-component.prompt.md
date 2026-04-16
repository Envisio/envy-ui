---
name: envy-ui-v1-document-usage
description: Produce consumer-facing documentation for how to use an Envy UI v1 export, class pattern, wrapper, or component.
argument-hint: Provide the export name, component name, class pattern, or relevant usage file paths.
---

Create concise consumer-facing documentation for an `envy-ui` v1 API surface or usage pattern.

Use these references first:

- [overview](../../docs/envy-ui-v1/overview.md)
- [getting started](../../docs/envy-ui-v1/getting-started.md)
- [public API](../../docs/envy-ui-v1/public-api.md)
- [composition model](../../docs/envy-ui-v1/composition-model.md)
- [class fragment DSL](../../docs/envy-ui-v1/class-fragment-dsl.md)
- [utility class reference](../../docs/envy-ui-v1/utility-class-reference.md)
- [modifier-first styling](../../docs/envy-ui-v1/modifier-first-styling.md)
- [known limitations](../../docs/envy-ui-v1/known-limitations.md)
- [tested patterns](../../docs/envy-ui-v1/tested-patterns.md)
- [deprecated and retired surfaces](../../docs/envy-ui-v1/deprecated-and-retired.md)
- [application conventions](../../docs/envy-ui-v1/application-conventions.md)
- [supported import patterns](../../docs/envy-ui-v1/supported-import-patterns.md)
- [usage patterns](../../docs/envy-ui-v1/usage-patterns.md)
- [guardrails](../../docs/envy-ui-v1/guardrails.md)

Output format:

## Purpose

One short paragraph.

## Consumer surface

- Explain whether the target is used through package imports, CSS classes, wrappers, components, or a mixed approach.
- Explain whether the target is usually part of a block-helper plus `uiA` composition.
- Explain whether the target should be styled primarily through block modifiers rather than utility overrides.
- Explain whether helper DSL branches or element/modifier semantics are part of the usage shape.

## Safe usage

- Show the safest integration approach for an application engineer.
- Prefer the established application pattern when one already exists.
- Call out conflicting helper fragments if the target pattern would set the same CSS property more than once.
- If the target already has native modifiers for the requested concern, say that utilities should not be the first choice.

## Boundaries

- Explain what should be treated as public API and what should not.
- Call out when the target is compatibility-only because it is `Legacy` or marked `Retired:`.

## Notes for Copilot

- Explain how Copilot should reason about this target in a consumer app.
- Call out known DSL or helper limitations if the target already depends on a workaround.
- Mention when a proposed shape is directly aligned with the tested helper patterns.
- Say explicitly when the safest recommendation is to avoid this surface for new code.

Target:

`$ARGUMENTS`
