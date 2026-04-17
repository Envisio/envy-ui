---
applyTo: "**"
---

Use these instructions only for work related to `envy-ui` version 1.

Treat `envy-ui` v1 as a package dependency used by the current application.

Assume the canonical references are:

- `../../docs/envy-ui-v1/overview.md`
- `../../docs/envy-ui-v1/getting-started.md`
- `../../docs/envy-ui-v1/public-api.md`
- `../../docs/envy-ui-v1/composition-model.md`
- `../../docs/envy-ui-v1/class-fragment-dsl.md`
- `../../docs/envy-ui-v1/utility-class-reference.md`
- `../../docs/envy-ui-v1/modifier-first-styling.md`
- `../../docs/envy-ui-v1/known-limitations.md`
- `../../docs/envy-ui-v1/tested-patterns.md`
- `../../docs/envy-ui-v1/deprecated-and-retired.md`
- `../../docs/envy-ui-v1/application-conventions.md`
- `../../docs/envy-ui-v1/supported-import-patterns.md`
- `../../docs/envy-ui-v1/usage-patterns.md`
- `../../docs/envy-ui-v1/guardrails.md`

When helping inside a consumer application:

- answer from the perspective of a consumer of the package
- prefer real usage patterns already established in the application
- treat composition of block helpers plus `uiA` as the default usage model
- prefer using existing `envy-ui` v1 classes, exports, and patterns
- treat `uiA` literals as precompiled and finite, not open-ended
- treat common application usage as stronger guidance than rarely used library possibilities
- treat helper template literals as DSL expressions with conditional and BEM semantics
- treat branch-heavy helper literals as risky and keep them simple
- treat tested helper patterns as the safest baseline
- treat overlapping utility fragments as coding errors even when the CSS might appear to work
- treat block modifiers as the first place to look for component-owned styling
- treat `Legacy` and `Retired` surfaces as compatibility-only
- keep `envy-ui` guidance isolated from the application's unrelated code conventions
- do not overwrite existing application documentation or Copilot instructions
- treat this file as an additive extension, not a replacement for the app's own AI guidance

When proposing implementation steps:

- start with package usage, imports, classes, wrappers, and composition
- prefer minimal and compatibility-safe integrations
- prefer root imports and published CSS assets for new code
- prefer semantic block helpers for structure and `uiA` for layout and utility concerns
- prefer native block modifiers before utility overrides for component color, size, state, and presentation
- verify `uiA` numeric and unit literals against the known vocabulary before suggesting them
- avoid suggesting two fragments that compete over the same final CSS property
- prefer the nearest existing local composition before reaching for a rarer valid utility pattern
- preserve the current DSL structure when modifying conditional helper literals
- preserve existing raw compiled-class workarounds when they exist for known DSL bugs
- prefer examples already backed by tests when choosing helper syntax
- prefer JSX usage examples with `{...ui([...])}` and canonical helper literals inside template strings
- do not introduce blocks or modifiers listed in `deprecated-and-retired.md` for new work
- only dive into package internals when consumer-facing behavior cannot be explained otherwise
