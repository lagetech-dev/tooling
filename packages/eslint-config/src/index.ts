import { defineConfig } from 'eslint/config';
import { configs as tseslintConfigs } from 'typescript-eslint';
import { flatConfigs as importXFlatConfigs } from 'eslint-plugin-import-x';
import n from 'eslint-plugin-n';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';

export interface ConfigOptions {
  tsconfigRootDir: string;
}

export function createBaseConfig({ tsconfigRootDir }: ConfigOptions) {
  return defineConfig([
    { ignores: ['dist/**', '.turbo/**'] },
    ...tseslintConfigs.recommendedTypeChecked,
    importXFlatConfigs.recommended,
    importXFlatConfigs.typescript,
    prettierRecommended,
    {
      languageOptions: {
        parserOptions: {
          projectService: {
            allowDefaultProject: ['*.config.ts', 'vitest.*.ts'],
          },
          tsconfigRootDir,
        },
      },
      settings: {
        'import-x/resolver-next': [createTypeScriptImportResolver({ project: tsconfigRootDir })],
      },
    },
    {
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            args: 'all',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
      },
    },
  ]);
}

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
