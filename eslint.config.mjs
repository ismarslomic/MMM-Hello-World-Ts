import typescriptEslint from '@typescript-eslint/eslint-plugin'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: ['**/node_modules', '**/.husky', '**/*.js', '**/*.mjs'],
  },
  ...compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },

    rules: {
      '@typescript-eslint/no-require-imports': [
        'error',
        {
          allowAsImport: true,
        },
      ],
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2015,
        ...globals.jest,
        Module: true,
        Log: true,
      },

      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'commonjs',

      parserOptions: {
        project: 'tsconfig.lint.json',
      },
    },
  },
]
