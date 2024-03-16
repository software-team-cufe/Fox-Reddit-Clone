import { off } from 'process';

module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],

  overrides: [],

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  rules: {
    'no-console': 'warn',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars-experimental': 'error',
    'no-unused-vars': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under <root>@types directory even it doesn't contain any source code, like @types/unist
        // Choose from one of the "project" options below or omit to use tsconfig.json

        project: './tsconfig.json',
      },
    },
  },
};

/*
eslint:recommended: This configuration sets up ESLint with a set of recommended rules that promote good practices and code quality. It includes rules such as no-unused-vars, no-undef, no-extra-semi, etc. You can find the full list of rules here.

@typescript-eslint/recommended: This configuration extends ESLint with recommended rules specifically tailored for TypeScript codebases. It includes rules such as @typescript-eslint/no-unused-vars, @typescript-eslint/explicit-module-boundary-types, etc. You can find the full list of rules here.

prettier/recommended: This configuration integrates ESLint with Prettier, a code formatter. It ensures that ESLint and Prettier work well together by disabling ESLint rules that might conflict with Prettier. You can find more about this configuration here.

airbnb-base: This configuration is provided by Airbnb and includes their ESLint rules for JavaScript. It enforces a popular set of standards for coding style and best practices. You can find the rules here.

plugin:import/errors: This configuration is from the eslint-plugin-import plugin. It enables rules that catch common issues with import statements in JavaScript, such as missing imports, non-existent paths, etc. You can find more about it here.

plugin:import/warnings: Similar to the previous one, this configuration enables import-related rules but sets them as warnings instead of errors. It allows for a more lenient approach to import linting issues.

plugin:import/typescript: This configuration provides additional rules for TypeScript files related to imports. It enhances the import linting capabilities specifically for TypeScript. More about it can be found here.

prettier/prettier: "error" - This rule enforces code formatting using Prettier. If any code doesn't adhere to the formatting rules specified in your .prettierrc or prettier.config.js file, ESLint will raise an error.

no-console: "off" - This rule disables the ESLint no-console rule. It means you're allowing the usage of console statements in your code. This is often useful during development but should be used cautiously in production code.

no-use-before-define: ["error", { "functions": false, "classes": true, "variables": true }] - This rule prevents the usage of variables, functions, and classes before they are defined. Specifically, it allows the usage of classes and variables before their definitions but disallows the usage of functions before their definitions.

@typescript-eslint/no-use-before-define: ["error", { "functions": false, "classes": true, "variables": true, "typedefs": true }] - This rule is similar to the previous one but is specifically for TypeScript code. It allows the usage of classes, variables, and type definitions before their definitions but disallows the usage of functions before their definitions.

These rules collectively enforce coding standards, improve code quality, and catch potential bugs early in the development process. They encourage clean, organized, and readable code while also ensuring consistency across your TypeScript project.

 */
