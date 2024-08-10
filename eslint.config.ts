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
    react: true,
    typescript: true
  },
  {
    rules: {
      'style/comma-dangle': ['error', 'never']
    }
  },
  ...tailwind.configs['flat/recommended'],
  {
    files: ['**/*.{ts,tsx}'],
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
