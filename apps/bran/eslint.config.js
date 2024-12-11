import { FlatCompat } from '@eslint/eslintrc';
import rocketseatConfig from '@rocketseat/eslint-config/node.js';

const compat = new FlatCompat();

export default [
  ...compat.config(rocketseatConfig), // Converte para flat config
  {
    files: ['**/*.{js,ts}'], // Define os arquivos a serem analisados
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: {
      'no-useless-constructor': 'off',
      'no-new': 'off'
    }
  }
];
