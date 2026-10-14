# @lagetech/eslint-config

Shared ESLint flat config for lagetech projects, built on typescript-eslint's
type-checked rules.

## Usage

Each environment has its own entry point, so runtime-agnostic code never loads
`eslint-plugin-n`. There is no root entry point. For React apps, use
[`@lagetech/eslint-config-react`](https://github.com/lagetech-dev/tooling/tree/main/packages/eslint-config-react), which builds on `/base`.

| Entry point | Factory | For |
| --- | --- | --- |
| `@lagetech/eslint-config/node` | `createNodeConfig` | Code that runs under Node (`node:*` imports, Node globals) |
| `@lagetech/eslint-config/base` | `createBaseConfig` | Runtime-agnostic code; also what `/node` and `@lagetech/eslint-config-react` build on |

In a package's `eslint.config.ts`:

```ts
import { createNodeConfig } from '@lagetech/eslint-config/node';

export default createNodeConfig({ tsconfigRootDir: import.meta.dirname });
```

Swap in `createBaseConfig` from `/base` for code that isn't Node-specific.
`ConfigOptions`, the options type, is exported from `/base`.

`tsconfigRootDir` has to point at a directory whose `tsconfig.json` includes every file being
linted. Type-checked rules use it to build the project service; a file outside that project
is either unlinted or produces a parser error, not a silently weaker check.

## What's inside

- `typescript-eslint`'s `recommendedTypeChecked` rule set.
- `eslint-plugin-import-x`, recommended plus the TypeScript rules, resolved through
  `eslint-import-resolver-typescript` so path aliases and `exports` maps resolve correctly.
- `eslint-plugin-prettier`, so formatting problems show up as lint errors instead of a
  separate `prettier --check` step.
- `@typescript-eslint/no-unused-vars` as a warning rather than the default error, with a
  leading-underscore escape hatch (`_foo`) for args, caught errors, destructured array
  entries, and variables.
- Rules beyond the recommended sets. Error: `no-case-declarations`. Warnings: `curly`
  (`all`), `no-else-return` (`allowElseIf: false`, so an `else if` after a `return` is flagged
  too), `prefer-template`, `no-useless-catch`, `@typescript-eslint/no-unnecessary-condition`,
  `@typescript-eslint/no-unnecessary-boolean-literal-compare`. `require-await` comes from
  `recommendedTypeChecked`'s `@typescript-eslint/require-await` (error), not the core rule.

`createNodeConfig` adds on top of that:

- Node globals and `eslint-plugin-n`'s `flat/recommended-module`, targeting Node `>=24.16.0`.
- `n/no-process-env` as a warning, nudging toward a typed env module over reading
  `process.env` directly at the call site.
- A `@typescript-eslint/naming-convention` rule set that is intentionally not the TS
  default: types are `StrictPascalCase`, class methods and imports are camelCase, but
  **variables, function parameters, and class properties are `snake_case`** (leading
  underscore allowed, e.g. `_unused`). Destructured variables are exempt, since the shape
  being destructured isn't something the destructuring site controls. This is a deliberate
  house style, not an oversight, so don't "fix" it in a consuming package without
  discussing it first.

## Files ignored by default

`dist/**` and `.turbo/**`, in both factories.

## Installing

```sh
pnpm add -D @lagetech/eslint-config eslint jiti
```

The package ships TypeScript source, not compiled JS. It loads through the consumer's
`eslint.config.ts`, which ESLint transpiles with `jiti`. Node's native type stripping won't
work here: it refuses `.ts` files inside `node_modules`.

## License

[PolyForm Noncommercial 1.0.0](https://github.com/lagetech-dev/tooling/blob/main/LICENSE). Commercial use is not permitted.
