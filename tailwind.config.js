/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                void: '#050505',
                charcoal: '#1A1A1A',
                cyan: {
                    DEFAULT: '#00E5FF',
                    dim: 'rgba(0,229,255,0.15)',
                    glow: 'rgba(0,229,255,0.4)',
                },
                amber: {
                    DEFAULT: '#FFB300',
                    dim: 'rgba(255,179,0,0.15)',
                },
                magma: {
                    DEFAULT: '#FF4500',
                    dim: 'rgba(255,69,0,0.15)',
                    glow: 'rgba(255,69,0,0.5)',
                },
                glass: 'rgba(255,255,255,0.07)',
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
                mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'Fira Code', 'monospace'],
            },
            animation: {
                ripple: 'ripple 2s ease-out infinite',
                'ripple-delay': 'ripple 2s ease-out 0.6s infinite',
                'ripple-delay2': 'ripple 2s ease-out 1.2s infinite',
                pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'ticker-scroll': 'tickerScroll 40s linear infinite',
                'border-pulse': 'borderPulse 1.5s ease-in-out infinite',
                'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
            },
            keyframes: {
                ripple: {
                    '0%': { transform: 'scale(1)', opacity: '0.8' },
                    '100%': { transform: 'scale(4)', opacity: '0' },
                },
                tickerScroll: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                borderPulse: {
                    '0%, 100%': { boxShadow: '0 0 0 0 rgba(255,69,0,0.4)' },
                    '50%': { boxShadow: '0 0 0 6px rgba(255,69,0,0)' },
                },
                heartbeat: {
                    '0%, 100%': { transform: 'scaleX(1)' },
                    '50%': { transform: 'scaleX(1.04)' },
                },
            },
            backdropBlur: {
                glass: '20px',
            },
        },
    },
    plugins: [],
};
