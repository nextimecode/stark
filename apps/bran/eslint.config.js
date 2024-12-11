import rocketseatConfig from '@rocketseat/eslint-config/node.js';

export default [
  ...rocketseatConfig,
  {
    files: ['**/*.{js,ts}'],
    rules: {
      'no-useless-constructor': 'off',
      'no-new': 'off'
    }
  }
];
