module.exports = {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#99572C', // Saddle brown - main brand color
                secondary: '#D2691E', // Chocolate - secondary brand color
                gold: '#DAA520', // Goldenrod - accent color
                beige: {
                    50: '#FAF8F3',
                    100: '#F5F1E8',
                    200: '#E8DCC6',
                    300: '#DBC7A4',
                    400: '#C7A882',
                    500: '#B8956A', // Main beige
                    600: '#A0835D',
                    700: '#7A6347',
                    800: '#5D4A36',
                    900: '#3F3124'
                },
                brown: {
                    50: '#F7F3F0',
                    100: '#EDE5DE',
                    200: '#D4C0AE',
                    300: '#BB9B7E',
                    400: '#A0754C',
                    500: '#8B4513', // Saddle brown
                    600: '#7A3D11',
                    700: '#693510',
                    800: '#4A260B',
                    900: '#2B1807'
                },
                stone: {
                    50: '#F8F6F0',
                    100: '#F1EDE1',
                    200: '#E2DBC3',
                    300: '#D3C9A5',
                    400: '#C4B787',
                    500: '#B5A569', // Stone color from courthouse
                    600: '#9A8E5A',
                    700: '#7F774B',
                    800: '#64603C',
                    900: '#49492D'
                },
                teal: '#6B8E23', // Olive drab for accent
                light: '#FAF8F3',
                dark: '#3F3124'
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
