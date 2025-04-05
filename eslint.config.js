import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';

const jsRules = {
  quotes: [
    'error',
    'single',
    { avoidEscape: true, allowTemplateLiterals: false },
  ],
  // 'import/no-cycle': 'warn',
  'class-methods-use-this': 'off',
  // 'import/prefer-default-export': 'off',
  'comma-dangle': 'off',
  'object-curly-newline': 'off',
  'operator-linebreak': 'off',
  'implicit-arrow-linebreak': 'off',
  'function-paren-newline': 'off',
  'import/no-extraneous-dependencies': 'off',
  'import/extensions': 'off',
  'import/no-absolute-path': 'off',
  'generator-star-spacing': 'off',
  'no-prototype-builtins': 'off',
  'no-underscore-dangle': 'off',
  'no-plusplus': 'off',
  'no-undef': 'warn',
  'no-case-declarations': 'warn',
};

export default defineConfig([
  {
    ignores: ['dist/**', 'node_modules/**', 'eslint.config.js'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      ...jsRules,
      ...pluginPrettier.configs.recommended.rules,

      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'all',
        },
      ],

      'no-async-promise-executor': 'warn',
      'no-console': 'warn',
      'lines-between-class-members': [
        'warn',
        {
          enforce: [
            { blankLine: 'always', prev: '*', next: 'method' },
            { blankLine: 'always', prev: 'method', next: '*' },
          ],
        },
      ],

      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-empty-interface': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',

      'no-unused-vars': 'warn',
      'no-constant-condition': 'off',
      'react/no-children-prop': 'off',
      'react/react-in-jsx-scope': 'off',
    }
  }
]);