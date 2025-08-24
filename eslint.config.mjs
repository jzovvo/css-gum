import js from '@eslint/js'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import stylistic from '@stylistic/eslint-plugin'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,ts,tsx}'],
    plugins: {
      'import': importPlugin,
      '@stylistic': stylistic
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      }
    },
    rules: {
      'prefer-const': 'error',
      'no-var': 'error',
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      '@stylistic/quotes': ['error', 'single', { allowTemplateLiterals: 'always', avoidEscape: true }],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/object-curly-spacing': ['error', 'never'],
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/indent': [
        'error',
        2,
        {
          VariableDeclarator: 'first',
          SwitchCase: 1,
          outerIIFEBody: 1,
          MemberExpression: 1,
          FunctionDeclaration: {
            parameters: 'first',
            body: 1,
          },
          StaticBlock: {
            body: 1,
          },
          CallExpression: {
            arguments: 'first',
          },
          ArrayExpression: 1,
          ObjectExpression: 'first',
          ImportDeclaration: 1,
          flatTernaryExpressions: true,
          offsetTernaryExpressions: true,
          ignoreComments: true,
        },
      ],
      '@stylistic/padding-line-between-statements': [
        'error',
        // Import 語句後要空行（但 import 之間不要）
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'never', prev: 'import', next: 'import' },

        // Export 語句前要空行（但連續 export 不要）
        { blankLine: 'always', prev: 'export', next: 'export' },

        // Return 語句前要空行
        { blankLine: 'always', prev: '*', next: 'return' },

        // 控制結構後要空行
        { blankLine: 'always', prev: 'if', next: '*' },
        { blankLine: 'always', prev: 'for', next: '*' },
        { blankLine: 'always', prev: 'while', next: '*' },
        { blankLine: 'always', prev: 'do', next: '*' },
        { blankLine: 'always', prev: 'switch', next: '*' },
        { blankLine: 'always', prev: 'try', next: '*' },

        // 函式聲明後要空行
        { blankLine: 'always', prev: 'function', next: '*' },

        // 變數聲明群組後要空行
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        { blankLine: 'never', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      ],
    }
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      '@typescript-eslint/triple-slash-reference': 'off',
      'no-unused-vars': 'off',
      'no-undef': 'off',
    }
  },
  {
    files: ['tests/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
    }
  },
  {
    ignores: [
      'dist/**',
      'coverage/**',
      'node_modules/**',
      '*.config.js',
      '*.config.ts',
      '*.config.mjs',
      'test.mjs',
      '.eslintrc.json',
      '**/.next/**',
    ]
  }
]
