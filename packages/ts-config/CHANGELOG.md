# Changelog

## [2.0.0](https://github.com/lagetech-dev/tooling/compare/ts-config-v1.1.0...ts-config-v2.0.0) (2026-10-14)


### ⚠ BREAKING CHANGES

* code that passed before can now fail lint (no-case-declarations) or typecheck: under verbatimModuleSyntax, type-only imports must use `import type`, and CommonJS packages or .cts files fail on every import/export (TS1295).

### Features

* add stricter lint rules and enable verbatimModuleSyntax ([f04b5c2](https://github.com/lagetech-dev/tooling/commit/f04b5c21dd5b107b05fad55619968a672a4cb175))
* **ts-config:** add Vite preset for React apps ([a7bc04a](https://github.com/lagetech-dev/tooling/commit/a7bc04af5cc62440d12c9e7f6cbc24e145932cb5))

## [1.1.0](https://github.com/lagetech-dev/tooling/compare/ts-config-v1.0.0...ts-config-v1.1.0) (2026-10-14)


### Features

* **ts-config:** publish to npm ([a0ba010](https://github.com/lagetech-dev/tooling/commit/a0ba010eb2eefc39643215be7bc1bec822bf9508))

## 1.0.0 (2026-09-08)


### Features

* document external install via git tag-and-pin ([483b711](https://github.com/lagetech-dev/tooling/commit/483b711b9abf4dca79ea6ea645eee6a36855d63e))
