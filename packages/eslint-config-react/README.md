# @lagetech/eslint-config-react

ESLint flat config for React apps, built on
[`@lagetech/eslint-config`](https://github.com/lagetech-dev/tooling/tree/main/packages/eslint-config)'s base config. A separate package so Node-only
projects don't install the React plugins (about 170 packages).

## Usage

In the app's `eslint.config.ts`:

```ts
import { createReactConfig } from '@lagetech/eslint-config-react';

export default createReactConfig({ tsconfigRootDir: import.meta.dirname });
```

Pair it with `@lagetech/ts-config/tsconfig.vite.json` for Vite apps, adding Node types so
`eslint.config.ts` (which runs in Node and uses `import.meta.dirname`) typechecks:

```json
{
  "extends": "@lagetech/ts-config/tsconfig.vite.json",
  "compilerOptions": {
    "types": ["vite/client", "node"]
  }
}
```

Without `node` in `types`, linting `eslint.config.ts` fails with
`@typescript-eslint/no-unsafe-assignment` on `import.meta.dirname`.

## What's inside

Everything in `@lagetech/eslint-config/base`, plus:

- Browser globals.
- `eslint-plugin-react`'s `recommended` and `jsx-runtime` flat configs (the latter turns off
  `react/react-in-jsx-scope` for the new JSX transform), with `react/prop-types` off since
  TypeScript covers prop types. The React version is pinned to `19` rather than detected:
  the plugin's detection calls an API ESLint 10 removed, and crashes.
- `eslint-plugin-react-hooks`' `recommended` flat config.
- `eslint-plugin-jsx-a11y-x`'s `recommended` config. This is the maintained fork of
  `eslint-plugin-jsx-a11y` in the eslint-community org, so rules are named `jsx-a11y-x/…`
  (e.g. `jsx-a11y-x/alt-text`) and settings go under a `jsx-a11y-x` key.
- No naming-convention rule: React components are PascalCase and hooks camelCase, which
  `@lagetech/eslint-config/node`'s snake_case rule would fight.

## Installing

```sh
pnpm add -D @lagetech/eslint-config-react eslint jiti typescript @types/node
```

Like `@lagetech/eslint-config`, it ships TypeScript source and loads through your
`eslint.config.ts` via `jiti`.

`eslint-plugin-react` caps its `eslint` peer range at `^9.7` but works under ESLint 10.
Accept that in `pnpm-workspace.yaml`:

```yaml
peerDependencyRules:
  allowedVersions:
    'eslint-plugin-react>eslint': '10'
```

## License

[PolyForm Noncommercial 1.0.0](https://github.com/lagetech-dev/tooling/blob/main/LICENSE). Commercial use is not permitted.
