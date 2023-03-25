import type {Config} from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
    purge: {
        enabled: process.env.NODE_ENV === 'production',
        content: [
            'components/**/*.vue',
            'layouts/**/*.vue',
            'pages/**/*.vue',
            'plugins/**/*.js',
            'nuxt.config.js',
            // TypeScript
            'plugins/**/*.ts',
            'nuxt.config.ts'
        ]
        },    
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Sora', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    600: '#F5FF00',
                },
                dark: {
                    500: '#464646',
                    600: '#111216'
                }
            }
        }
    },
    plugins: [
        require('@tailwindcss/typography'),
    ]
}