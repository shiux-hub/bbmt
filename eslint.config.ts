import antfu from '@antfu/eslint-config'
import tailwind from 'eslint-plugin-tailwindcss'

export default antfu(
  {
    ignores: [
      'node_modules',
      'build',
      '.gitignore',
      '*.d.ts',
      '**/*.d.ts'
    ],
    vue: true,
    typescript: true
  },
  {
    rules: {
      'style/comma-dangle': ['error', 'never'],
      'vue/comma-dangle': ['error', 'never'],
      // Vue组件排序
      'vue/order-in-components': [
        'warn',
        {
          order: [
            'el',
            'name',
            'key',
            'parent',
            'functional',
            ['delimiters', 'comments'],
            ['components', 'directives', 'filters'],
            'extends',
            'mixins',
            ['provide', 'inject'],
            'ROUTER_GUARDS',
            'layout',
            'middleware',
            'validate',
            'scrollToTop',
            'transition',
            'loading',
            'inheritAttrs',
            'model',
            ['props', 'propsData'],
            'emits',
            'setup',
            'fetch',
            'asyncData',
            'data',
            'head',
            'computed',
            'watch',
            'watchQuery',
            'LIFECYCLE_HOOKS',
            'methods',
            ['template', 'render'],
            'renderError'
          ]
        }
      ],
      // Vue属性排序
      'vue/attributes-order': [
        'warn',
        {
          order: [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            'UNIQUE',
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'OTHER_ATTR',
            'EVENTS',
            'CONTENT'
          ],
          alphabetical: true // 字母顺序
        }
      ],
      // Vue组件语言限制
      'vue/block-lang': [
        'error',
        {
          script: {
            lang: 'ts'
          },
          style: {
            lang: 'scss'
          },
          route: {
            lang: 'yaml'
          }
        }
      ]
    }
  },
  ...tailwind.configs['flat/recommended'],
  {
    files: ['**/*.{vue,ts}'],
    settings: {
      tailwindcss: {
        // These are the default values but feel free to customize
        callees: ['classnames', 'clsx', 'ctl'],
        config: 'tailwind.config.ts', // returned from `loadConfig()` utility if not provided
        cssFiles: ['src/scss/**/*.scss'],
        cssFilesRefreshRate: 5_000,
        removeDuplicates: true,
        skipClassAttribute: false,
        whitelist: [],
        tags: [], // can be set to e.g. ['tw'] for use in tw`bg-blue`
        classRegex: '^class(Name)?$' // can be modified to support custom attributes. E.g. "^tw$" for `twin.macro`
      }
    }
  }
)
