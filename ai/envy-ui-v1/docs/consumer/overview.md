# Envy UI v1 for Consumer Applications

This is the external AI documentation layer for applications that use `envy-ui` version 1 as a dependency.

## Purpose

- Help engineers use the published package correctly inside an application.
- Give Copilot a focused knowledge source for `envy-ui` v1 usage.
- Keep `envy-ui` guidance isolated from the application's own docs and conventions.

## What This Layer Covers

- How to think about `envy-ui` v1 as a dependency.
- Which package surfaces are safe to use from an application.
- Which import patterns are preferred in real application code.
- How block helpers, `uiA`, `ui(...)`, and `uiMerge(...)` fit together.
- Which `uiA` utility fragments are precompiled and safe to use.
- How the template-literal DSL works for elements, modifiers, conditions, grouping, and interpolation.
- Which helper DSL limits are known and when compatibility workarounds are acceptable.
- Which helper patterns are already guaranteed by the current test layer.
- How block modifiers should be preferred over utility overrides for intrinsic component styling.
- Which library capabilities are actually common in the application and which are rare exceptions.
- Which exports and class patterns exist only for compatibility and should not be used for new work.
- How to ask Copilot for help with `envy-ui`-related tasks.
- What not to assume about the package.

## What This Layer Does Not Cover

- Internal build architecture of the library.
- SCSS folder structure for package development.
- Dictionary generation flow.
- KSS authoring workflow inside the library repository.

Those topics belong to the maintainer layer under `docs/maintainer/`.

## Read Next

- `getting-started.md`
- `public-api.md`
- `composition-model.md`
- `class-fragment-dsl.md`
- `utility-class-reference.md`
- `modifier-first-styling.md`
- `known-limitations.md`
- `tested-patterns.md`
- `deprecated-and-retired.md`
- `application-conventions.md`
- `supported-import-patterns.md`
- `usage-patterns.md`
- `guardrails.md`
