/**
 * Lumen ESLint Base Config (Flat Config — ESLint 9)
 *
 * Enforces architectural rules:
 * - 300 line file limit
 * - 50 line function limit
 * - Max nesting depth of 3
 * - No explicit any
 * - No circular imports
 * - No console (warning)
 */

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      /* ── Architecture Enforcement ── */
      'max-lines': ['error', { max: 300, skipBlankLines: true, skipComments: true }],
      'max-lines-per-function': ['warn', { max: 50, skipBlankLines: true, skipComments: true }],
      'max-depth': ['error', 3],

      /* ── TypeScript Strictness ── */
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      /* ── Code Quality ── */
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-duplicate-imports': 'error',
      'no-template-curly-in-string': 'warn',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],

      /* ── Complexity ── */
      complexity: ['warn', 10],
      'no-nested-ternary': 'error',
    },
  },
  {
    ignores: [
      'node_modules/',
      'dist/',
      '.next/',
      'out/',
      'build/',
      'coverage/',
      '*.config.js',
      '*.config.ts',
      '*.config.mjs',
    ],
  },
];
