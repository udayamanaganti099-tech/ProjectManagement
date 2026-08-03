/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#14171C', // base background
          panel: '#1D2129',   // card/panel surface
          raised: '#252B35',  // hover/raised surface
          line: '#2E3541',    // hairline borders
        },
        signal: {
          DEFAULT: '#E8A33D', // amber — the one active/CTA accent
          soft: '#3A2E1C',    // amber tint for badges on dark bg
        },
        offer: {
          DEFAULT: '#6FA97E', // sage — success / offer state
          soft: '#20302A',
        },
        rejected: {
          DEFAULT: '#C1666B', // dusty coral — rejected / diverted state
          soft: '#341F22',
        },
        paper: {
          DEFAULT: '#EDEAE3', // warm off-white text
          muted: '#9CA3AF',   // secondary text
          faint: '#5B6270',   // tertiary / disabled text
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        body: ['"Inter"', 'sans-serif'],
      },
      fontFeatureSettings: {
        tabular: '"tnum"',
      },
      boxShadow: {
        panel: '0 1px 0 0 rgba(237,234,227,0.04) inset, 0 8px 24px -12px rgba(0,0,0,0.5)',
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateX(0deg)' },
          '50%': { transform: 'rotateX(90deg)' },
          '100%': { transform: 'rotateX(0deg)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.3 },
        },
      },
      animation: {
        flip: 'flip 0.5s ease-in-out',
        blink: 'blink 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
