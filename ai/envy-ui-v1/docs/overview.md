# Envy UI v1 Documentation Bundle

This bundle contains two different documentation layers for `envy-ui` version 1.

## Consumer Layer

Use this layer for applications that consume the published package.

Files:

- `docs/consumer/overview.md`
- `docs/consumer/getting-started.md`
- `docs/consumer/public-api.md`
- `docs/consumer/usage-patterns.md`
- `docs/consumer/guardrails.md`

This is the only layer that should be exported into a consumer application's repository and used as the default Copilot knowledge source there.

## Maintainer Layer

Use this layer only when working on the `envy-ui` repository itself.

Files:

- `docs/maintainer/architecture.md`
- `docs/maintainer/component-model.md`
- `docs/maintainer/styling-model.md`

This layer explains package internals and should not be treated as the primary documentation set for engineers who only use the package from an application.

## Export Rule

- Export the consumer layer to downstream repositories.
- Keep the maintainer layer inside the library repository unless there is a specific need for internal package debugging.
