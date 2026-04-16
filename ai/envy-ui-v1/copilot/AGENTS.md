# Envy UI v1 Agent Notes

These instructions apply only to work related to the exported `envy-ui` v1 documentation bundle.

## Priority

- Keep all `envy-ui` v1 guidance isolated under the `envy-ui-v1` namespace in the consumer repository.
- Treat the consumer application's existing docs and Copilot files as primary for app-specific behavior.
- Use this bundle only to improve work that touches `envy-ui` v1.

## Read First

- `../../docs/envy-ui-v1/overview.md`
- `../../docs/envy-ui-v1/getting-started.md`
- `../../docs/envy-ui-v1/public-api.md`
- `../../docs/envy-ui-v1/composition-model.md`
- `../../docs/envy-ui-v1/class-fragment-dsl.md`
- `../../docs/envy-ui-v1/utility-class-reference.md`
- `../../docs/envy-ui-v1/known-limitations.md`
- `../../docs/envy-ui-v1/tested-patterns.md`
- `../../docs/envy-ui-v1/deprecated-and-retired.md`
- `../../docs/envy-ui-v1/application-conventions.md`
- `../../docs/envy-ui-v1/supported-import-patterns.md`
- `../../docs/envy-ui-v1/usage-patterns.md`
- `../../docs/envy-ui-v1/guardrails.md`

## Working Rules

- Preserve `envy-ui` v1 compatibility.
- Prefer minimal integrations that use the package boundary.
- Prefer established consumer patterns already visible in the application codebase.
- Treat composition of semantic block helpers plus `uiA` as the normal default.
- Treat `uiA` as a finite precompiled vocabulary and do not invent unsupported literals.
- Prefer common local patterns over rare but valid library capabilities.
- Treat helper template literals as a small DSL and preserve their current semantics when editing.
- Treat dense branch-heavy helper literals as risky and preserve existing narrow workarounds for known bugs.
- Treat the tested helper patterns as the safest baseline for new suggestions.
- Treat `Legacy` and `Retired` surfaces as compatibility-only and avoid proposing them for new code.
- Do not switch into maintainer-level implementation advice unless the task requires library changes.
- Do not overwrite existing application-level AI instructions.
- If the app and `envy-ui` guidance conflict, keep the app's rule for app code and keep this bundle for `envy-ui`-specific work.
