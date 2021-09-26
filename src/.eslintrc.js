const path = require('path');

module.exports = {
  extends: ['../.eslintrc.js'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '.yaml', '.json', '.yml', '.html'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'react-hooks', 'react'],
      extends: [
        '../.eslintrc.js',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
      ],
      parserOptions: {
        project: [path.resolve(__dirname, '..', 'tsconfig.json')],
        sourceType: 'module',
        extraFileExtensions: ['.yaml', '.json', '.yml', '.html'],
        ecmaFeatures: { jsx: true },
      },
      env: { node: true },
      settings: { react: { version: 'detect' } },
    },
  ],
};
