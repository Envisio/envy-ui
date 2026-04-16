# Deprecated And Retired Surfaces

## Core Rule

Some `envy-ui` v1 exports and classes still exist for compatibility, but they should not be introduced into new application code.

Treat these as compatibility-only surfaces:

- anything with `Legacy` in the helper or class name
- any block or modifier marked `Retired:` in the library Styleguide/KSS metadata

Existing usage can remain until there is an intentional migration. Presence in the codebase does not make it a good default for new work.

## Legacy-Named Block Helpers

These names are explicit signals that the block should not be chosen for new code:

- `uiCheckboxLegacy` -> `.env-checkbox-legacy`
- `uiInputGroupLegacy` -> `.env-input-group-legacy`

Notes:

- `CheckboxWrapper` still exists and internally uses `uiCheckboxLegacy`.
- Treat `CheckboxWrapper` as a compatibility surface when working in an area that already uses it.
- Do not reach for `uiCheckboxLegacy` or `uiInputGroupLegacy` as a starting point for a new feature.

## Retired Blocks Marked In Styleguide Source

These blocks are marked `Retired:` in the library source and should not be introduced in new application code:

- `uiForm` -> `.env-form`
- `uiPanel` -> `.env-panel`
- `uiVisual` -> `.env-visual`
- `uiMenuDropdown` -> `.env-menu-dropdown`
- `uiIconStack` -> `.env-icon-stack`
- `uiCheckboxLegacy` -> `.env-checkbox-legacy`
- `uiInputGroupLegacy` -> `.env-input-group-legacy`

## Retired Modifier Patterns

The following modifier patterns are also marked `Retired:` and should not be proposed for new work:

- `.env-button--round-hover`
- `.env-button2--round-hover`

## Safe Consumer Behavior

- If existing code already uses one of these surfaces, preserve compatibility unless the task is explicitly about migration.
- If you need to extend an existing feature that already depends on a retired surface, stay consistent locally and avoid mixing in a second new pattern.
- If you are writing net-new UI, search for an active nearby pattern and copy that instead.

## Copilot Rule

When a helper, wrapper, or class path looks available but maps to a `Legacy` or `Retired` surface:

- do not suggest it as the default answer
- mention that it is compatibility-only if it appears in the current code
- prefer active neighboring patterns over reviving an older block
