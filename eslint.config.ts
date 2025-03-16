import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: [
      'node_modules',
      'build',
      '.gitignore',
      '*.d.ts',
      '**/*.d.ts',
    ],
    react: true,
    typescript: true,
  },
)
