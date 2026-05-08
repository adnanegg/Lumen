/**
 * Lumen ESLint React Config
 *
 * Extends base config with React-specific rules.
 * Used by Vite + React apps (dashboard, platform-admin).
 */

import baseConfig from './base.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,
  {
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      /* React-specific rules will be added when eslint-plugin-react is installed */
    },
  },
];
