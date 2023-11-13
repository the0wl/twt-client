import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/**/*.{tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        "dark": "#0B3948",
        "semiDark": "#416165",
        "semiLight": "#D0CDD7",
        "light": "#D9DBF1",
        "neutral": "#ACB0BD",
      }
    },
  },
  plugins: [],
}
export default config
