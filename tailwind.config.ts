import daisyui from 'daisyui'
import type { Config } from 'tailwindcss'

export default {
  mode: 'jit',
  darkMode: 'media',
  content: ['./src/**/*.{vue,ts}'],
  theme: {
    extend: {}
  },
  daisyui: {
    themes: ['light', 'dark']
  },
  plugins: [daisyui]
} satisfies Config
