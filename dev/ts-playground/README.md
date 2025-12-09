# TS Playground

This folder hosts the local React+TypeScript harness used to smoke-test `envy-ui` APIs alongside third-party UI libraries (e.g., React Aria). Nothing here ships with the package – it is dev-only.

## Scripts

- `npm run playground:dev` – start the Vite dev server (requires Node 20.19+). Open `http://localhost:5173/`.
- `npm run playground:build` – produce a static build in `dev/ts-playground/dist/`.

## React Aria demo

`src/ui-consumer.tsx` renders both plain `envy-ui` helpers and a couple of components from `react-aria-components`. Use the toggle button or switch to see how React Aria props interoperate with `ui()`/`uiMerge()`.
