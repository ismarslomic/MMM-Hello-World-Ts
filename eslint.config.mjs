import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import typescriptEslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier/flat'
import globals from 'globals'

export default defineConfig(
  {
    ignores: [
      'node_modules/**',
      '.husky/**',
      'coverage/**',
      'playwright-report/**',
      'test-results/**',
      'MagicMirror/**',
      'MMM-Hello-World-Ts.js',
      'node_helper.js',
    ],
  },
  {
    files: ['**/*.{js,mjs,ts,mts}'],
    extends: [js.configs.recommended],
    languageOptions: { ecmaVersion: 'latest' },
  },
  {
    files: ['**/*.{ts,mts}'],
    extends: [typescriptEslint.configs.recommended],
    languageOptions: { sourceType: 'module' },
    rules: { '@typescript-eslint/no-require-imports': ['error', { allowAsImport: true }] },
  },
  {
    files: ['src/frontend/**/*.ts'],
    languageOptions: { globals: { ...globals.browser, Module: 'readonly' } },
  },
  {
    files: ['src/backend/**/*.ts', 'scripts/**/*.mjs', '*.mjs', '*.js', 'playwright.config.ts'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
  },
  {
    files: ['__tests__/unit/**/*.ts', 'vitest.config.mts'],
    languageOptions: { globals: { ...globals.node, Module: 'writable', Log: 'writable' } },
  },
  prettier
)
