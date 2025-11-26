module.exports = {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#1a3a52',
                gold: '#b8860b',
                teal: '#008b8b',
                light: '#f5f5f5',
                dark: '#333333'
            },
            boxShadow: {
                small: '0 2px 4px rgba(0,0,0,0.1)',
                medium: '0 4px 8px rgba(0,0,0,0.15)',
                large: '0 10px 30px rgba(0,0,0,0.2)'
            },
            spacing: {
                '3xl': '64px'
            },
            fontFamily: {
                sans: ['Open Sans', 'Inter', 'system-ui', 'sans-serif'],
                heading: ['Montserrat', 'sans-serif']
            }
        }
    },
    plugins: [
        function ({ addUtilities }) {
            const newUtilities = {
                '.line-clamp-3': {
                    display: '-webkit-box',
                    '-webkit-line-clamp': '3',
                    '-webkit-box-orient': 'vertical',
                    overflow: 'hidden'
                }
            }
            addUtilities(newUtilities)
        }
    ]
}
