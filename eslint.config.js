import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import prettierConfig from 'eslint-config-prettier';
import perfectionist from 'eslint-plugin-perfectionist';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import sonarjs from 'eslint-plugin-sonarjs';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import vitest from 'eslint-plugin-vitest';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/public/**',
      '**/node_modules/**',
      '**/.react-router/**',
      '**/.wrangler/**',
      '**/.husky/**',
      '**/.cursor/**',
      '**/.next/**',
      '**/.turbo/**',
      '**/.vercel/**',
      '**/pnpm-lock.yaml',
      '**/test-results/**',
      '**/playwright-report/**',
      '**/*.config.{js,ts,mjs}',
      '**/next-env.d.ts'
    ]
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactPlugin.configs.flat['jsx-runtime'],
      reactHooks.configs['recommended-latest'],
      perfectionist.configs['recommended-natural'],
      sonarjs.configs.recommended,
      eslintPluginUnicorn.configs.recommended,
      prettierConfig
    ],
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.builtin
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      '@next/next': nextPlugin,
      prettier: prettierPlugin
    },
    settings: {
      next: {
        rootDir: ['apps/*/']
      }
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      // Core rules
      curly: ['error', 'all'],
      'eol-last': ['error', 'always'],
      eqeqeq: [
        'error',
        'always',
        {
          null: 'ignore'
        }
      ],
      'lines-between-class-members': [
        'error',
        'always',
        {
          exceptAfterSingleLine: true
        }
      ],
      'no-async-promise-executor': 'off',
      'no-console': 'off',
      'no-fallthrough': 'off',
      'no-redeclare': 'error',
      'no-restricted-imports': [
        'error',
        {
          paths: [],
          patterns: [
            {
              group: ['lodash', 'lodash/*'],
              message: 'Please use "lodash-es" instead.'
            }
          ]
        }
      ],
      'no-restricted-syntax': [
        'error',
        {
          message: 'Wildcard imports from @fortawesome/* are not allowed.',
          selector:
            "ImportDeclaration[source.value=/^@fortawesome/][specifiers.0.type='ImportNamespaceSpecifier']"
        }
      ],
      'no-undef': 'off',
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          next: [
            'block',
            'block-like',
            'for',
            'if',
            'try',
            'while',
            'function'
          ],
          prev: '*'
        },
        {
          blankLine: 'never',
          next: 'import',
          prev: 'import'
        }
      ],
      semi: 'off',

      // Next.js rules
      '@next/next/google-font-display': 'warn',
      '@next/next/google-font-preconnect': 'warn',
      '@next/next/next-script-for-ga': 'warn',
      '@next/next/no-async-client-component': 'error',
      '@next/next/no-before-interactive-script-outside-document': 'warn',
      '@next/next/no-css-tags': 'warn',
      '@next/next/no-head-element': 'warn',
      '@next/next/no-head-import-in-document': 'error',
      '@next/next/no-html-link-for-pages': 'off',
      '@next/next/no-img-element': 'warn',
      '@next/next/no-page-custom-font': 'warn',
      '@next/next/no-styled-jsx-in-document': 'warn',
      '@next/next/no-sync-scripts': 'warn',
      '@next/next/no-title-in-document-head': 'warn',
      '@next/next/no-typos': 'warn',
      '@next/next/no-unwanted-polyfillio': 'warn',

      // Perfectionist rules
      'perfectionist/sort-imports': 'off',
      'perfectionist/sort-jsx-props': [
        'error',
        {
          customGroups: {
            as: 'as',
            callback: 'on*',
            class: 'class',
            className: 'className',
            css: 'css',
            height: 'height',
            id: 'id',
            key: 'key',
            name: 'name',
            ref: 'ref',
            style: 'style',
            width: 'width'
          },
          groups: [
            'key',
            'ref',
            'as',
            'id',
            'name',
            'css',
            'class',
            'className',
            'style',
            'width',
            'height',
            'unknown',
            'shorthand',
            'callback'
          ],
          order: 'asc',
          type: 'natural'
        }
      ],

      // Prettier rules
      'prettier/prettier': 'error',

      // React rules
      'react-hooks/exhaustive-deps': 'warn',
      'react/display-name': 'error',
      'react/jsx-key': 'error',
      'react/jsx-no-comment-textnodes': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-target-blank': 'error',
      'react/jsx-no-undef': 'error',
      'react/jsx-sort-props': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
      'react/no-children-prop': 'error',
      'react/no-danger-with-children': 'error',
      'react/no-deprecated': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/no-find-dom-node': 'error',
      'react/no-is-mounted': 'error',
      'react/no-render-return-value': 'error',
      'react/no-string-refs': 'error',
      'react/no-unescaped-entities': 'off',
      'react/no-unknown-property': 'error',
      'react/no-unsafe': 'off',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/require-render-return': 'error',

      // SonarJS rules
      'sonarjs/cognitive-complexity': 'off',
      'sonarjs/no-commented-code': 'off',
      'sonarjs/no-dead-store': 'off',
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/no-nested-conditional': 'off',
      'sonarjs/no-redundant-assignments': 'off',
      'sonarjs/no-unused-vars': 'off',
      'sonarjs/prefer-single-boolean-return': 'off',
      'sonarjs/pseudo-random': 'off',
      'sonarjs/slow-regex': 'off',

      // Unicorn rules
      'unicorn/consistent-function-scoping': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-thenable': 'off',
      'unicorn/prefer-add-event-listener': 'off',
      'unicorn/prefer-dom-node-append': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/prefer-node-protocol': 'off',
      'unicorn/prefer-object-from-entries': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/prevent-abbreviations': [0, { ignore: ['/.*/ig'] }],
      'unicorn/text-encoding-identifier-case': 'off'
    }
  },
  {
    files: ['**/*.{test,spec}.{js,ts,tsx}', '**/tests/**/*.{js,ts,tsx}'],
    plugins: {
      vitest: vitest
    },
    rules: {
      ...vitest.configs.recommended.rules,
      'vitest/consistent-test-it': ['error', { fn: 'test' }],
      'vitest/no-focused-tests': 'error',
      'vitest/no-disabled-tests': 'warn',
      'vitest/prefer-to-be': 'error',
      'vitest/prefer-to-have-length': 'error'
    },
    settings: {
      vitest: {
        typecheck: true
      }
    }
  }
);
