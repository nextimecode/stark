import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import importHelpersPlugin from 'eslint-plugin-import-helpers'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import perfectionistPlugin from 'eslint-plugin-perfectionist'
import prettierPlugin from 'eslint-plugin-prettier'
import reactPlugin from 'eslint-plugin-react'
import unicornPlugin from 'eslint-plugin-unicorn'
import globals from 'globals'

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        ...globals.browser,
        ...globals.es6,
        process: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'jsx-a11y': jsxA11yPlugin,
      prettier: prettierPlugin,
      unicorn: unicornPlugin,
      'import-helpers': importHelpersPlugin,
      perfectionist: perfectionistPlugin
    },
    rules: {
      'space-before-blocks': 'error',
      'keyword-spacing': 'error',
      'arrow-spacing': 'error',
      'semi-spacing': 'error',
      'no-redeclare': 'error',
      'no-console': 'error',
      'no-undef': 'error',
      'comma-dangle': 'off',
      'import-helpers/order-imports': [
        'error',
        {
          newlinesBetween: 'always',
          groups: [
            '/^react/',
            ['/^next/', '/@next/'],
            '/@nextime-ui/preline/',
            '/@chakra-ui/',
            '/components/',
            'module',
            '/^@shared/',
            '/^@\\//',
            '/absolute/',
            ['parent', 'sibling', 'index']
          ],
          alphabetize: {
            order: 'asc',
            ignoreCase: true
          }
        }
      ],
      'prettier/prettier': [
        'error',
        {
          printWidth: 80,
          tabWidth: 2,
          singleQuote: true,
          trailingComma: 'none',
          arrowParens: 'avoid',
          semi: false,
          endOfLine: 'auto'
        }
      ],
      'jsx-a11y/alt-text': [
        'warn',
        {
          elements: ['img'],
          img: ['Image']
        }
      ],
      'react/no-unknown-property': 'error',
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/aria-proptypes': 'warn',
      'jsx-a11y/aria-unsupported-elements': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'jsx-a11y/role-supports-aria-props': 'warn',
      'array-bracket-spacing': ['error', 'never'],
      'computed-property-spacing': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'spaced-comment': ['error', 'always'],
      'template-tag-spacing': 'error',
      'unicorn/prevent-abbreviations': [0, { ignore: ['/.*/ig'] }],
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-object-from-entries': 'off',
      'unicorn/prefer-node-protocol': 'off',
      'unicorn/no-thenable': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/text-encoding-identifier-case': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/prefer-module': 'off',
      'sonarjs/no-duplicate-string': 'off',
      'unicorn/expiring-todo-comments': 'off'
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts']
      }
    }
  }
]
