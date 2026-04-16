---
name: envy-ui-v1-use-components
description: Use Envy UI v1 safely inside the current application without changing the library architecture.
argument-hint: Describe the UI task or paste the target file path.
---

You are helping with a task that depends on `envy-ui` version 1.

Before suggesting code:

1. Read [overview](../../docs/envy-ui-v1/overview.md), [getting started](../../docs/envy-ui-v1/getting-started.md), [public API](../../docs/envy-ui-v1/public-api.md), [composition model](../../docs/envy-ui-v1/composition-model.md), [class fragment DSL](../../docs/envy-ui-v1/class-fragment-dsl.md), [utility class reference](../../docs/envy-ui-v1/utility-class-reference.md), [known limitations](../../docs/envy-ui-v1/known-limitations.md), [tested patterns](../../docs/envy-ui-v1/tested-patterns.md), [deprecated and retired surfaces](../../docs/envy-ui-v1/deprecated-and-retired.md), [application conventions](../../docs/envy-ui-v1/application-conventions.md), and [supported import patterns](../../docs/envy-ui-v1/supported-import-patterns.md).
2. Infer whether the request is mainly about composing block helpers and `uiA`, editing an existing helper DSL expression, using a package utility, using a wrapper/component, or maintaining compatibility with an existing deep import.
3. Prefer the smallest integration that matches existing `envy-ui` v1 usage patterns.

When answering:

- explain which public `envy-ui` v1 surface you are using
- make the composition model explicit when it helps the engineer choose the right helpers
- prefer existing classes or public exports over invention
- verify that any suggested `uiA` literal actually exists in the precompiled vocabulary
- prefer the nearest existing application pattern over a rarer but technically valid alternative
- preserve the current conditional DSL style when updating helper literals
- avoid making helper literals more branch-heavy when a simpler local workaround already exists
- prefer helper shapes already backed by tests
- avoid proposing `Legacy` or `Retired` surfaces for new code
- prefer root imports unless maintaining an established compatibility exception
- avoid switching into library-maintainer guidance unless the task is really about changing `envy-ui`
- keep any app-specific glue code separate from `envy-ui` bundle assumptions

Task:

`$ARGUMENTS`
