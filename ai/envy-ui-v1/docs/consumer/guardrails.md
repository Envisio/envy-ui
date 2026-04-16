# Guardrails

## For Application Engineers

- Keep `envy-ui` usage at the package boundary whenever possible.
- Prefer additive app code around `envy-ui` instead of editing package assumptions in place.
- Treat `envy-ui` v1 guidance as package-specific, not as a replacement for the application's own engineering rules.
- Prefer `envy-ui` root imports and published CSS assets for new work.
- Use block helpers for semantic structure and `uiA` for utility concerns.
- Do not assume arbitrary `uiA` numeric literals exist; use only known precompiled values.
- Prefer the existing application pattern over a new but merely valid `envy-ui` composition.
- Treat helper template literals as DSL expressions with semantics, not as arbitrary strings.
- Keep helper DSL expressions simple; do not pack too many branch conditions into one literal.
- Prefer helper shapes already covered by the current test layer.
- Treat `Legacy` and `Retired` surfaces as compatibility-only, not as defaults for new code.

## For Copilot

- Answer from the point of view of a consumer of the package.
- Focus on imports, usage, composition, and safe integration.
- Only dive into package internals when they are necessary to explain a consumer-facing behavior.
- Recognize that real app usage is heavily centered on `ui`, `uiA`, block helpers, wrappers, and utility exports.
- Assume composition is the default pattern unless the code clearly uses a dedicated wrapper or component.
- Treat `uiA` as a constrained vocabulary and verify value availability before proposing new literals.
- Treat common app usage as stronger guidance than low-frequency possibilities supported by the library.
- Respect conditional and element/modifier semantics when editing existing helper literals.
- Respect known DSL limitations and preserve narrow raw-class workarounds where they already exist.
- Do not suggest `Legacy` or `Retired` blocks as fresh solutions just because they remain exported or already appear in the app.

## Do Not Default To

- internal architecture explanations
- SCSS implementation details
- build-pipeline details
- maintainer workflows inside the `envy-ui` repository
- deep imports unless maintaining an existing deep-import call site
- invented `uiA` literals such as unsupported width, spacing, or offset values
- switching to a rare layout method such as grid when the surrounding code is already flex-based
- turning one helper literal into a dense branch-heavy expression when a simpler workaround already exists
- `Legacy` block helpers and classes for new UI
- blocks and modifiers marked `Retired:` in the Styleguide source

## Escalation Rule

If a request is really about changing `envy-ui` itself rather than using it, switch to the maintainer layer and say so explicitly.
