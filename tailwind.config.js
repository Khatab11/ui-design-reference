/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    // 8pt spacing system strictly adhering to the book's 8pt grid rules.
    // Multiples of 8px, with 4px (0.5) half-step (mobile soft grid base) and
    // 12px (1.5) / 20px (2.5) steps as documented in the book.
    spacing: {
      0: '0',
      px: '1px',
      0.5: '4px',
      1: '8px',
      1.5: '12px',
      2: '16px',
      2.5: '20px',
      3: '24px',
      3.5: '28px',
      4: '32px',
      5: '40px',
      6: '48px',
      7: '56px',
      8: '64px',
      9: '72px',
      10: '80px',
      11: '88px',
      12: '96px',
      14: '112px',
      16: '128px',
      18: '144px',
      20: '160px',
      24: '192px',
      32: '256px',
      35: '280px',
      40: '320px',
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
      arabic: ['Cairo', '"IBM Plex Sans Arabic"', 'Inter', 'system-ui', 'sans-serif'],
      cairo: ['Cairo', 'sans-serif'],
      'ibm-plex': ['"IBM Plex Sans Arabic"', 'sans-serif'],
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
    },
    // One neutral ramp + one accent, exposed through CSS variables so the
    // dark theme only has to swap variable values.
    // Avoid pure black (#000000) by strictly using near-black #1A1A1A per the book.
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#1A1A1A',
      'off-black': '#1A1A1A',
      white: '#FFFFFF',
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
      md: '10px',
      lg: '12px',
      xl: '16px',
      '2xl': '24px',
      full: '9999px',
    },
    extend: {
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.35)',
        glow: '0 0 16px -2px rgb(var(--c-accent) / 0.3)',
      },
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
