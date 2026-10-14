# Changelog

## [2.0.0](https://github.com/lagetech-dev/tooling/compare/eslint-config-v1.1.0...eslint-config-v2.0.0) (2026-10-14)


### ⚠ BREAKING CHANGES

* code that passed before can now fail lint (no-case-declarations) or typecheck: under verbatimModuleSyntax, type-only imports must use `import type`, and CommonJS packages or .cts files fail on every import/export (TS1295).
* **eslint-config:** the root entry point (@lagetech/eslint-config) is removed. Import createNodeConfig from @lagetech/eslint-config/node, and createBaseConfig or the ConfigOptions type from @lagetech/eslint-config/base.

### Features

* add stricter lint rules and enable verbatimModuleSyntax ([f04b5c2](https://github.com/lagetech-dev/tooling/commit/f04b5c21dd5b107b05fad55619968a672a4cb175))
* **eslint-config:** split into base and node entry points ([898b657](https://github.com/lagetech-dev/tooling/commit/898b6575825a15e7874800e141febd0333bf7210))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @lagetech/ts-config bumped to 2.0.0

## [1.1.0](https://github.com/lagetech-dev/tooling/compare/eslint-config-v1.0.0...eslint-config-v1.1.0) (2026-10-14)


### Features

* **eslint-config:** publish to npm, declare eslint/typescript/jiti as peers ([3ad5aca](https://github.com/lagetech-dev/tooling/commit/3ad5aca4e9de97365b35ef09c5c15fb7452d1e20))

## 1.0.0 (2026-09-08)


### Features

* document external install via git tag-and-pin ([483b711](https://github.com/lagetech-dev/tooling/commit/483b711b9abf4dca79ea6ea645eee6a36855d63e))
