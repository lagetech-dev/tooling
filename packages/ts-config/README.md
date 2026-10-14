# @lagetech/ts-config

Shared TypeScript compiler configuration for lagetech projects.

## Usage

In a package's `tsconfig.json`:

```json
{
  "extends": "@lagetech/ts-config/tsconfig.base.json"
}
```

For code that runs under Node (has access to `node:*` modules and Node globals), extend
`tsconfig.node.json` instead. It extends the base config and adds the `node` type package.

```json
{
  "extends": "@lagetech/ts-config/tsconfig.node.json"
}
```

## What's inside

`tsconfig.base.json` targets es2022, resolves modules as `nodenext`, and turns on `strict`
plus a few checks stricter projects tend to want: `noUncheckedIndexedAccess`,
`forceConsistentCasingInFileNames`, and `stripInternal`. `skipLibCheck` is on so a
dependency's own type errors don't become this project's problem.

`tsconfig.node.json` is the same config with `"types": ["node"]` added, for packages that
are Node code rather than library code meant to run anywhere.

## What's published

Only `tsconfig.base.json` and `tsconfig.node.json` (see the `files` field in
`package.json`). Add a new preset by creating the file and listing it there.

## Installing

```sh
pnpm add -D @lagetech/ts-config
```

## License

[PolyForm Noncommercial 1.0.0](https://github.com/lagetech-dev/tooling/blob/main/LICENSE). Commercial use is not permitted.
