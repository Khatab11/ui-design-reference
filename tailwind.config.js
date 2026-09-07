/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    // 8pt spacing system. Keys map to multiples of 8px (plus a couple of
    // half-steps for fine alignment).
    spacing: {
      0: '0',
      px: '1px',
      0.5: '4px',
      1: '8px',
      1.5: '12px',
      2: '16px',
      3: '24px',
      4: '32px',
      5: '40px',
      6: '48px',
      7: '56px',
      8: '64px',
      10: '80px',
      12: '96px',
      16: '128px',
      20: '160px',
    },
    // Type scale, ratio ≈ 1.2, with paired line-heights that land on the
    // 8pt grid where practical.
    fontSize: {
      xs: ['12px', { lineHeight: '16px' }],
      sm: ['14px', { lineHeight: '20px' }],
      base: ['17px', { lineHeight: '28px' }],
      lg: ['20px', { lineHeight: '30px' }],
      xl: ['24px', { lineHeight: '32px' }],
      '2xl': ['29px', { lineHeight: '36px' }],
      '3xl': ['35px', { lineHeight: '42px' }],
      '4xl': ['42px', { lineHeight: '48px' }],
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      arabic: ['"IBM Plex Sans Arabic"', 'Inter', 'system-ui', 'sans-serif'],
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
    },
    // One neutral ramp + one accent, exposed through CSS variables so the
    // dark theme only has to swap variable values.
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      bg: 'rgb(var(--c-bg) / <alpha-value>)',
      surface: 'rgb(var(--c-surface) / <alpha-value>)',
      raised: 'rgb(var(--c-raised) / <alpha-value>)',
      line: 'rgb(var(--c-line) / <alpha-value>)',
      'line-strong': 'rgb(var(--c-line-strong) / <alpha-value>)',
      ink: 'rgb(var(--c-ink) / <alpha-value>)',
      'ink-2': 'rgb(var(--c-ink-2) / <alpha-value>)',
      'ink-3': 'rgb(var(--c-ink-3) / <alpha-value>)',
      accent: 'rgb(var(--c-accent) / <alpha-value>)',
      'accent-ink': 'rgb(var(--c-accent-ink) / <alpha-value>)',
      'accent-soft': 'rgb(var(--c-accent-soft) / <alpha-value>)',
      warn: 'rgb(var(--c-warn) / <alpha-value>)',
      'warn-soft': 'rgb(var(--c-warn-soft) / <alpha-value>)',
      note: 'rgb(var(--c-note) / <alpha-value>)',
      'note-soft': 'rgb(var(--c-note-soft) / <alpha-value>)',
    },
    borderRadius: {
      none: '0',
      sm: '4px',
      DEFAULT: '8px',
      lg: '12px',
      full: '9999px',
    },
    extend: {
      maxWidth: {
        prose: '72ch',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.2, 0, 0, 1)',
      },
    },
  },
  plugins: [],
}
