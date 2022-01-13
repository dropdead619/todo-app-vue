module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    camelcase: ['off'],
    quotes: ['error', 'single'],
    indent: ['error', 2, { SwitchCase: 1 }], // Отступы для JS
    semi: [2, 'always', { omitLastInOneLineBlock: true }], // Точки с запятой
    'comma-dangle': ['error', 'always-multiline'], // Запятые после многострочных свойств объекта
    'object-curly-spacing': ['error', 'always'], // { пробелы между }
    'arrow-spacing': 'error', // пробелы в стрелочной функции
    'space-infix-ops': 'error',
    'no-multi-spaces': ['error'],
    'no-trailing-spaces': 'error',
    'padded-blocks': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'func-call-spacing': ['error', 'never'],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    'object-curly-newline': ['error', { multiline: true, consistent: true }],
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: ['function', 'try', 'if'], next: 'return' },

      { blankLine: 'always', prev: '*', next: 'function' },
      { blankLine: 'always', prev: 'function', next: '*' },

      { blankLine: 'always', prev: '*', next: 'try' },

      { blankLine: 'always', prev: 'import', next: '*' },
      { blankLine: 'always', prev: '*', next: 'import' },
      { blankLine: 'any', prev: 'import', next: 'import' },
    ],
    'space-before-function-paren': [
      'error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }, // Пробел после названия функции
    ],
    'keyword-spacing': ['error'],
    'comma-spacing': ['error'],
    'spaced-comment': ['error'],

    'vue/html-indent': ['error', 2], // Отступы для HTML
    'vue/html-self-closing': [
      'error',
      {
        html: { void: 'never', normal: 'never', component: 'always' },
        svg: 'always',
        math: 'always',
      },
    ],

    'vue/html-closing-bracket-newline': [
      'error', {
        singleline: 'never',
        multiline: 'never',
      },
    ],
    'vue/multiline-html-element-content-newline': ['error', {
      ignoreWhenEmpty: true,
      ignores: ['pre', 'textarea'],
    }],
    'vue/max-attributes-per-line': [
      'error', {
        singleline: 2,
        multiline: { max: 1, allowFirstLine: false },
      },
    ],
    'vue/order-in-components': ['off'],
    'vue/attributes-order': ['error', {
      order: [
        'DEFINITION',
        'LIST_RENDERING',
        'CONDITIONALS',
        'RENDER_MODIFIERS',
        'GLOBAL',
        ['UNIQUE', 'SLOT'],
        'TWO_WAY_BINDING',
        'OTHER_DIRECTIVES',
        'OTHER_ATTR',
        'EVENTS',
        'CONTENT',
      ],
      alphabetical: true,
    }],
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      registeredComponentsOnly: true,
    }],
    'vue/html-closing-bracket-spacing': ['error'],
    "vue/no-multiple-template-root": 0,
  },
};
