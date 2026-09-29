import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00ff88",
        dark: "#050505",
      },
      fontFamily: {
        'ceo-display': ['Archivo', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'ceo-sans': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'cto-sans': ['Inter', 'system-ui', 'sans-serif'],
        'cto-mono': ["'JetBrains Mono'", 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('light', ':is([data-theme="light"] &)');
    }),
  ],
}
