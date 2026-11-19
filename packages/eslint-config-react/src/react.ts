import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11yX from 'eslint-plugin-jsx-a11y-x';
import globals from 'globals';
import type { Linter } from 'eslint';
import { createBaseConfig, type ConfigOptions } from '@lagetech/eslint-config/base';

/**
 * eslint-plugin-react types `configs.flat` as `Record<string, ReactFlatConfig>`, so under
 * `noUncheckedIndexedAccess` every lookup is `| undefined`. Narrow at runtime instead of
 * asserting, so a renamed config fails loudly rather than silently dropping out.
 */
function reactFlatConfig(name: string) {
  const config = react.configs.flat[name];
  if (config === undefined) {
    throw new Error(`eslint-plugin-react has no flat config named "${name}"`);
  }
  return config;
}

/**
 * React variant for browser apps (Vite, TanStack). Builds on `createBaseConfig` (NOT
 * `createNodeConfig`): React components are PascalCase and hooks are camelCase, so the Node
 * factory's snake_case naming-convention rule would fight React idioms, and the browser has
 * no `process.env`, so `eslint-plugin-n` and `n/no-process-env` are omitted too. Layers the
 * React, React Hooks, and jsx-a11y-x configs on top of the shared TypeScript + import-x +
 * prettier base.
 */
export function createReactConfig(options: ConfigOptions): Linter.Config[] {
  return [
    ...createBaseConfig(options),
    {
      languageOptions: {
        globals: globals.browser,
      },
    },
    reactFlatConfig('recommended'),
    reactFlatConfig('jsx-runtime'),
    reactHooks.configs.flat.recommended,
    jsxA11yX.configs.recommended,
    {
      settings: {
        react: {
          /**
           * Pinned, not 'detect': eslint-plugin-react's version detection calls
           * `context.getFilename()`, removed in ESLint 10, and crashes. An explicit
           * version short-circuits detection.
           */
          version: '19',
        },
      },
      rules: {
        /**
         * TypeScript covers prop types. (`react-in-jsx-scope` is already off via the
         * `jsx-runtime` config above.)
         */
        'react/prop-types': 'off',
      },
    },
  ];
}
