import { defineConfig } from 'eslint/config';
import n from 'eslint-plugin-n';
import globals from 'globals';
import { createBaseConfig, type ConfigOptions } from './base.js';

export function createNodeConfig(options: ConfigOptions) {
  return defineConfig([
    ...createBaseConfig(options),
    {
      languageOptions: {
        globals: globals.node,
      },
      settings: {
        node: {
          version: '>=24.16.0',
        },
      },
    },
    n.configs['flat/recommended-module'],
    {
      rules: {
        'n/no-process-env': ['warn', {}],
        '@typescript-eslint/naming-convention': [
          'warn',
          {
            selector: 'typeLike',
            format: ['StrictPascalCase'],
          },
          {
            selector: 'typeParameter',
            format: ['PascalCase', 'StrictPascalCase'],
          },
          {
            selector: 'import',
            format: ['camelCase', 'PascalCase'],
          },
          {
            selector: 'classMethod',
            format: ['camelCase'],
          },
          {
            selector: 'classProperty',
            format: ['snake_case', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
          },
          {
            selector: 'variable',
            format: ['snake_case', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
          },
          {
            selector: 'variable',
            format: [],
            modifiers: ['destructured'],
          },
          {
            selector: 'function',
            format: ['camelCase', 'snake_case'],
          },
          {
            selector: 'parameter',
            format: ['snake_case'],
          },
        ],
      },
    },
  ]);
}
