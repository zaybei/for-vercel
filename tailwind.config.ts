import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'hue-rotate': 'hue-rotate 6s ease-in-out infinite',
      },
      keyframes: {
        'hue-rotate': {
          '0%': { filter: 'hue-rotate(0deg) saturate(0.8)' },
          '100%': { filter: 'hue-rotate(360deg) saturate(0.8)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
