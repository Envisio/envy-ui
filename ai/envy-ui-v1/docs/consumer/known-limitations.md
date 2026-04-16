# Known Limitations

## DSL Complexity Limit

The helper DSL is reliable for simple and moderate usage patterns.

It should not be treated as a fully robust language for large, heavily branched class expressions.

In practice, the risk increases when one helper literal contains:

- many conditional branches
- many ternary-style fragment switches
- many modifiers attached to the same element context
- grouped branches mixed with multiple conditional fragments
- complex combinations of element, modifier, and raw utility fragments in a single expression

## What Works Well

The current tested behavior covers patterns such as:

- simple conditional include
- simple true/false fragment branch
- grouped fragments in one branch
- normal element and modifier binding
- interpolation of valid existing fragments

These are reflected in the current `getBlock` tests.

## What Becomes Risky

In real application code, more complex expressions have exposed bugs or unstable behavior.

This is especially relevant when:

- one element carries many modifier decisions
- multiple ternary-style branches are stacked together
- the literal starts acting like a mini rules engine instead of a readable class composition

The issue is not that these expressions are conceptually invalid. The issue is that the current `getBlock` implementation is not robust enough for arbitrary complexity.

## Practical Rule

Prefer a simple helper literal over a smart helper literal.

If the expression starts becoming dense or difficult to reason about, stop and simplify.

As a baseline, stay close to the currently tested helper patterns whenever possible.

## Preferred Response To Complexity

When a helper literal becomes too complex:

- split the logic into simpler nearby expressions
- precompute a small number of readable fragments
- compose multiple `ui(...)` inputs instead of one overloaded literal
- follow an existing local workaround if the feature area already has one

## Compatibility Workaround

In some real application paths, explicit compiled class names are used as a workaround for helper-DLS limitations.

This is acceptable when:

- the pattern already exists in the application
- the helper-based equivalent is known to be buggy
- the explicit class is a compatibility patch, not a new default style

Example shape:

- use a helper for the parts that remain stable
- inject a known compiled class such as `env-table__row--in-folder`
- keep the workaround narrow and local

## Folder-Row Case

Folder-related table row patterns in the application already use this kind of workaround.

This is a known compatibility exception, not a sign that raw compiled classes should replace helper usage everywhere.

## Copilot Rules

- Do not expand helper literals into highly branched expressions unless the local code already does that safely.
- Prefer readability and stability over packing all logic into one template literal.
- When the DSL becomes fragile, use the smallest proven workaround already established in nearby code.
- Treat explicit compiled classes as compatibility escapes, not as the default authoring model.
