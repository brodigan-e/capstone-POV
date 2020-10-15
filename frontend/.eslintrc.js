const prettierConfig = require('./prettier.config');

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', 'react', 'import'],
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parserOptions: { ecmaVersion: 2020, sourceType: 'module', ecmaFeatures: { jsx: true } },
  settings: { react: { version: 'detect' } },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-use-before-define': ['error', 'nofunc'],
    '@typescript-eslint/no-var-requires': 'off',
    'prettier/prettier': ['warn', prettierConfig],
    'react/prop-types': 'off',
    eqeqeq: 'warn',
    'guard-for-in': 'error',
    'no-console': 'off',
    'no-multiple-empty-lines': ['warn', { max: 1 }],
    'no-duplicate-imports': 'warn',
    'no-shadow': 'error',
    'no-unused-vars': 'warn',
    'no-var': 'error',
    'object-shorthand': 'warn',
    'one-var': ['warn', 'never'],
    'prefer-const': 'warn',
    'prefer-template': 'warn',
    'sort-imports': ['warn', { ignoreDeclarationSort: true }],
    'spaced-comment': ['warn', 'always', { markers: ['/'] }],
    'import/first': 'warn',
    'import/newline-after-import': 'warn',
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        groups: ['builtin', 'external', ['internal', 'parent'], 'sibling', 'index'],
        alphabetize: { order: 'asc', caseInsensitive: false },
      },
    ],
  },
};