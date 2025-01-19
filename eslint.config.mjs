import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import importConfigs from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import reactHookPlugin from "eslint-plugin-react-hooks";
import {fixupPluginRules} from "@eslint/compat";
import stylistic from '@stylistic/eslint-plugin'
import unusedConfig from "eslint-plugin-unused-imports";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  importConfigs.flatConfigs.recommended,
  reactPlugin.configs.flat.recommended,
  stylistic.configs["recommended-flat"],
  {
    plugins: {
      "react-hooks": fixupPluginRules(reactHookPlugin),
      "unused-imports": unusedConfig
    },
    rules: {
      "@stylistic/brace-style": "off",
      "react/react-in-jsx-scope": "off",
      "import/no-unresolved": "off",
      "@stylistic/arrow-parens": "off",
      'import/order': [
        'warn',
        {
          'newlines-between': 'always',
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          pathGroupsExcludedImportTypes: ['react'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'internal',
              position: 'before',
            },
          ],
        },
      ],
      'arrow-parens': ['warn', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'array-bracket-newline': ['warn', 'consistent'],
      'object-curly-spacing': ['error', 'always'],
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': ['warn', { before: false, after: true }],
      'object-shorthand': 'error',
      'prefer-const': 'warn',
      curly: ['error', 'all'],
      'dot-notation': 'error',
      eqeqeq: 'off',
      'eol-last': 'error',
      'jsx-quotes': 'error',
      'key-spacing': ['error', { beforeColon: false, mode: 'minimum' }],
      'keyword-spacing': 'error',
      'max-len': [
        'error',
        {
          code: 140,
          ignoreComments: true,
          ignoreStrings: false,
          ignoreTemplateLiterals: true,
        },
      ],
      'max-params': ['error', 7],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-else-return': 'error',
      'no-dupe-keys': 'error',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-extra-semi': 'error',
      'no-implicit-coercion': [
        'error',
        { 'boolean': false, string: true, number: true },
      ],
      'no-nested-ternary': 'error',
      'no-mixed-spaces-and-tabs': 'error',
      'no-multi-spaces': 'error',
      'no-multi-str': 'error',
      'no-multiple-empty-lines': ['error', { max: 2 }],
      'no-trailing-spaces': 'error',
      'no-with': 'error',
      'no-whitespace-before-property': 'error',
      'no-restricted-imports': [
        'error',
        {
          paths: ['lodash', 'lodash-es'],
          patterns: ['!lodash-es/*', 'lodash/*'],
        },
      ],
      'one-var': ['error', 'never'],
      'quote-props': ['warn', 'as-needed', { keywords: true }],
      quotes: ['error', 'single', 'avoid-escape'],
      'space-before-blocks': ['error', 'always'],
      'space-infix-ops': 'error',
      'space-in-parens': ['error', 'never'],
      'space-unary-ops': ['error', { words: false, nonwords: false }],
      'spaced-comment': ['error', 'always'],
      'wrap-iife': 'error',
      yoda: ['error', 'never'],
      
      // Rules for React
      'react/no-multi-comp': 'warn',
      'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
      'react/jsx-curly-brace-presence': ['error', 'never'],
      'react/jsx-equals-spacing': ['error', 'never'],
      'react/jsx-indent-props': ['error', 2],
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-undef': 'error',
      'react/jsx-pascal-case': 'error',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react/jsx-tag-spacing': 'warn',
      'react/jsx-closing-tag-location': 'error',
      'react/jsx-first-prop-new-line': 'error',
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@stylistic/type-annotation-spacing': [
        'error',
        {
          before: false,
          after: true,
          overrides: {
            arrow: { before: true, after: true },
          },
        },
      ],
      'unused-imports/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'warn',
      indent: 'off',
      
      semi: 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@stylistic/semi': ['off'],
      '@typescript-eslint/no-var-requires': 'off',
      '@stylistic/member-delimiter-style': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'inline-type-imports' },
      ],
      '@/indent': [
        'warn',
        2,
        {
          SwitchCase: 1,
          ArrayExpression: 1,
          ObjectExpression: 1,
          ignoredNodes: [
            'JSXAttribute',
            'JSXSpreadAttribute',
            'TSTypeParameterInstantiation',
          ],
        },
      ],
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: true,
        },
      ],
    },
  }
];