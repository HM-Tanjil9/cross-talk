import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      js: js.configs.recommended.plugins.js,
      'simple-import-sort': require('eslint-plugin-simple-import-sort')
    },
    rules: {
      ...js.configs.recommended.rules,
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error'
    },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node }
  }
]);
