/**
 * Lumen ESLint Next.js Config
 *
 * Extends base config with Next.js-specific rules.
 * Used by Next.js apps (marketing, booking-portal).
 */

import baseConfig from './base.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,
  {
    rules: {
      /* Next.js specific overrides */
      /* Allow default exports for pages/layouts */
    },
  },
];
