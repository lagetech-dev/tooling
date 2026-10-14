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

For React apps built with Vite, extend `tsconfig.vite.json` and add Node types (from
`@types/node`):

```json
{
  "extends": "@lagetech/ts-config/tsconfig.vite.json",
  "compilerOptions": {
    "types": ["vite/client", "node"]
  }
}
```

The app's `eslint.config.ts` and `vite.config.ts` run in Node. Without `node` types,
`import.meta.dirname` in `eslint.config.ts` is untyped and lint fails. `types` replaces the
preset's list rather than extending it, so repeat `vite/client`.

## What's inside

`tsconfig.base.json` targets es2022, resolves modules as `nodenext`, and turns on `strict`
plus a few checks stricter projects tend to want: `noUncheckedIndexedAccess`,
`forceConsistentCasingInFileNames`, and `stripInternal`. `verbatimModuleSyntax` is on, so
imports used only as types must be written `import type`, and packages must be ESM
(`"type": "module"`): in a CommonJS file, including any `.cts`, every `import`/`export` fails
with TS1295. `skipLibCheck` is on so a dependency's own type errors don't become this
project's problem.

`tsconfig.node.json` is the same config with `"types": ["node"]` added, for packages that
are Node code rather than library code meant to run anywhere.

`tsconfig.vite.json` extends the base for Vite-bundled React apps: the base's `lib` plus DOM,
`module: esnext` with `moduleResolution: bundler`, `jsx: react-jsx`, `noEmit`, and
`"types": ["vite/client"]`, so the consuming app needs `vite` installed. It inherits
`verbatimModuleSyntax` from the base, which turns on `isolatedModules` too. The preset
itself leaves out `node` types. Adding them, as shown above, also lets Node globals typecheck
in browser code; to avoid that, give the config files a tsconfig of their own instead.

## What's published

Only `tsconfig.base.json`, `tsconfig.node.json` and `tsconfig.vite.json` (see the `files`
field in `package.json`). Add a new preset by creating the file and listing it there.

## Installing

```sh
pnpm add -D @lagetech/ts-config
```

## License

[PolyForm Noncommercial 1.0.0](https://github.com/lagetech-dev/tooling/blob/main/LICENSE). Commercial use is not permitted.
