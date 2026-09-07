# tooling

Shared build tooling for lagetech projects.

## Packages

| Package | What it is |
| --- | --- |
| [`packages/ts-config`](packages/ts-config) | Shared TypeScript compiler config |
| [`packages/eslint-config`](packages/eslint-config) | Shared ESLint flat config |

## Requirements

Node version pinned in `.nvmrc`, pnpm version pinned in `package.json`'s `packageManager`
field. `pnpm install` refuses to run under any other package manager (see the `preinstall`
script).

## Development

```sh
pnpm install
pnpm build        # turbo run build, per package
pnpm lint         # turbo run lint, per package
pnpm typecheck    # turbo run typecheck, per package
pnpm verify       # lint + typecheck + build, affected packages only
pnpm verify:all   # same, but every package regardless of what changed
```

A pre-push hook runs `pnpm verify` automatically (see `.gitconfig` and
`scripts/hooks/pre-push`; `git push --no-verify` bypasses it). `pnpm install` wires up the
hook path via the `prepare` script, so nothing manual is needed after cloning.

## Consuming a package from another repo

Nothing here is published yet. Today these packages only exist as workspace members of
this repo. Cross-repo consumption, whether that's a git dependency pinned to a release tag
or a package published somewhere like GHCR, is still being decided.

## Releases

Versioning and changelogs are handled by [release-please](https://github.com/googleapis/release-please),
configured in `.release-please/`. Each package is released independently: a merge to `main`
with commits release-please recognizes opens or updates a release PR, and merging that PR
cuts a tag scoped to the package, like `packages/eslint-config-v0.1.0`.

This means commit messages have to be [Conventional Commits](https://www.conventionalcommits.org/),
strictly, across the whole repo. `feat:` and `fix:` (and a `BREAKING CHANGE:` footer) are
what drive version bumps. `refactor:` shows up in the changelog but doesn't bump anything on
its own; `chore:`, `docs:`, `ci:`, and `test:` don't bump anything and are hidden from the
changelog entirely. See `.release-please/config.json` for the exact mapping.
