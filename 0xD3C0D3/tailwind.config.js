/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
        'space-mono': ['Space Mono', 'monospace'],
        'terminal': ['"Glass TTY VT220"', '"JetBrains Mono"', '"Fira Code"', '"Courier New"', 'monospace'],
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      scrollbar: {
        'thin': {
          width: '6px',
        },
      },
      screens: {
        '3xl': '1920px',
        '4xl': '2560px',
        '5xl': '3200px',
        '6xl': '3840px',
        '7xl': '4480px',
        '8xl': '5120px'
      }
    },
  },
  plugins: [],
}
