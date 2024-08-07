import defaultTheme from 'tailwindcss/defaultTheme'
import tailwindTypography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'
export default <Partial<Config>>{
  content: [
    'components/**/*.{vue,js,ts}',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'composables/**/*.{js,ts}',
    'plugins/**/*.{js,ts}',
    'App.{js,ts,vue}',
    'app.{js,ts,vue}',
    'Error.{js,ts,vue}',
    'error.{js,ts,vue}',
    'content/**/*.md',
    'nuxt.config.ts'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"obviously"', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: {
          600: '#F5FF00'
        },
        dark: {
          500: '#464646',
          600: '#111216',
          700: '#1a1b1f'
        }
      },
      height: {
        sm: '21px'
      }
    }
  },
  plugins: [
    tailwindTypography
  ]
}
