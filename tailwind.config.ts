import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          951: '#f2f5f7',
          952: '#474747',
          953: '#474747',
          954:'#5a5a5a',
          955:'#f9f6f7'
        },
        green: {
          951: '#a393eb',
        },
      },
    },
  },
  plugins: [],
};
export default config;
