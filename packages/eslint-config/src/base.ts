import { defineConfig } from 'eslint/config';
import { configs as tseslintConfigs } from 'typescript-eslint';
import { flatConfigs as importXFlatConfigs } from 'eslint-plugin-import-x';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
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
