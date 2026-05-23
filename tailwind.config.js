/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'nfx-black': '#020617',
        'nfx-navy': '#0f172a',
        'nfx-blue': '#3b82f6',
        'nfx-blue-dark': '#2563eb',
        'nfx-red': '#ef4444',
        'nfx-white': '#f8fafc',
        'nfx-slate': '#94a3b8',
        'nfx-slate-light': '#cbd5e1',
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        dm: ['var(--font-dm-sans)', 'sans-serif'],
      },
      animation: { float: 'float 6s ease-in-out infinite' },
      keyframes: {
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
      },
    },
  },
  plugins: [],
}
