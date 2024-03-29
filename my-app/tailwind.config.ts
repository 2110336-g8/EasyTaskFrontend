import type { Config } from 'tailwindcss';

const config = {
    darkMode: ['class'],
    content: [
        './my-app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './pages/**/*.{ts,tsx}',
    ],
    prefix: '',
    theme: {
        screens: {
            tablet: '640px',
            // => @media (min-width: 640px) { ... }

            laptop: '1024px',
            // => @media (min-width: 1024px) { ... }

            desktop: '1280px',
            // => @media (min-width: 1280px) { ... }

            'desktop-l': '1440px',
        },
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            boxShadow: {
                md: '0 4px 6px -1px rgba(0, 0, 0, 0.05),0 2px 4px -2px rgba(0, 0, 0, 0.05)',
            },
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                    100: '#E0E7FF',
                    300: '#98A7ED',
                    500: '#5951E5',
                    700: '#282494',
                    900: '#100E44',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                    100: '#FEF3C7',
                    500: '#F58D13',
                    700: '#B56D17',
                    900: '#814B24',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                error: {
                    100: '#FEE2E2',
                    500: '#EF4444',
                    700: '#DC2626',
                    900: '#7F1D1D',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            fontSize: {
                h1: ['36px', { lineHeight: '44px' }],
                h2: ['30px', { lineHeight: '36px' }],
                h3: ['22px', { lineHeight: '30px' }],
                h4: ['20px', { lineHeight: '26px' }],
                p: ['16px', { lineHeight: '24px' }],
                small: ['14px', { lineHeight: '20px' }],
                smaller: ['12px', { lineHeight: '16px' }],
                button: ['20px', { lineHeight: '28px' }],
                'button-xs': ['14px', { lineHeight: '18px' }],
                'button-s': ['16px', { lineHeight: '24px' }],
                'button-m': ['18px', { lineHeight: '24px' }],
            },
            fontWeight: {
                h1: '600', //semibold
                h2: '500', //medium
                h3: '600', //medium
                h4: '500', //medium
                p: '400', //regular
                small: '400', //regular
                smaller: '400', //regular
                button: '600',
                'button-xs': '500',
                'button-s': '500',
                'button-m': '500',
            },
            letterSpacing: {
                h1: '0.012em',
                h2: '0.0075em',
                h3: '0.03em',
                h4: '0.005em',
                p: '0em',
                small: '0em',
                smaller: '0em',
                button: '-0.005em',
                'button-xs': '-0.005em',
                'button-s': '-0.005em',
                'button-m': '-0.005em',
            },
        },
    },
    plugins: [
        require('tailwindcss-animate'),
        require('tailwindcss-inner-border'),
    ],
} satisfies Config;

export default config;
