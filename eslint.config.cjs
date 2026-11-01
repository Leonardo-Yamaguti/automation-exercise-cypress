const cypress = require('eslint-plugin-cypress');

module.exports = [
  {
    ignores: [
      'node_modules/**', 'cypress/reports/**', 'cypress/screenshots/**',
      'cypress/videos/**', 'dist/**', 'evidencias/**',
    ],
  },
  {
    files: ['**/*.js', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        console: 'readonly', process: 'readonly', Buffer: 'readonly', __dirname: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-undef': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
    },
  },
  {
    ...cypress.configs.recommended,
    files: ['cypress/**/*.js'],
    languageOptions: {
      ...cypress.configs.recommended.languageOptions,
      sourceType: 'commonjs',
      globals: {
        ...cypress.configs.recommended.languageOptions.globals,
        describe: 'readonly', it: 'readonly',
        before: 'readonly', after: 'readonly',
        beforeEach: 'readonly', afterEach: 'readonly',
      },
    },
    rules: {
      ...cypress.configs.recommended.rules,
      'cypress/no-force': 'error',
    },
  },
];

