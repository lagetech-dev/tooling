# @lagetech/eslint-config

Shared ESLint flat config for lagetech projects, built on typescript-eslint's
type-checked rules.

## Usage

In a package's `eslint.config.ts`:

```ts
import { createNodeConfig } from '@lagetech/eslint-config';

export default createNodeConfig({ tsconfigRootDir: import.meta.dirname });
```

For code that isn't Node-specific (no `node:*` imports, no Node globals), use
`createBaseConfig` instead. It skips the Node globals, the `eslint-plugin-n` rules, and the
naming-convention rules described below.

```ts
import { createBaseConfig } from '@lagetech/eslint-config';

export default createBaseConfig({ tsconfigRootDir: import.meta.dirname });
```

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

`dist/**` and `.turbo/**`, in both `createBaseConfig` and `createNodeConfig`.
