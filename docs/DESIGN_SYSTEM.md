# Design System — Implementation Handoff

**Target:** existing documentation platform (currently unstyled / basic default styling)
**Goal:** apply this token set without redesigning the platform's information architecture
**Reference implementation:** `Foundations.dc.html` in this project — open it for the visual source of truth

---

## 0. How to use this document

This is a **retrofit**, not a rebuild. Do not change page structure, routing, or component composition. Replace values only: colors, fonts, sizes, spacing, radii, and control styling.

Recommended order of work:

1. Ship the token layer (§1–§2). Nothing changes visually yet.
2. Apply base/reset + typography (§3). This alone fixes ~60% of the "basic design" feel.
3. Apply controls: buttons, inputs, links (§4–§6).
4. Apply surfaces: cards, code blocks, callouts, tables (§7).
5. Apply layout rhythm (§8).
6. Run the acceptance checklist (§11).

Steps 1–3 are safe to ship independently. Do not ship §4 partially — half-restyled buttons look worse than none.

---

## 1. Design tokens

Declare once, globally. Every value below is used verbatim in the reference file.

```css
:root {
  /* Brand — action */
  --color-action:            #1F5AE0;
  --color-action-hover:      #1747B8;
  --color-action-pressed:    #123A96;
  --color-action-tint:       #EAF1FE;
  --color-action-tint-line:  #C7DBFB;

  /* Neutrals — warm */
  --color-ink:               #1A1A17;  /* headings */
  --color-body:              #4A4842;  /* paragraphs */
  --color-muted:             #7A776F;  /* labels, meta, captions */
  --color-line:              #E6E3DD;  /* borders, dividers */
  --color-line-strong:       #CFCBC2;  /* control borders */
  --color-line-hover:        #A8A49B;  /* control border on hover */
  --color-surface:           #FFFFFF;  /* cards, panels */
  --color-surface-sunken:    #F0EEE9;  /* disabled fills, inset rows */
  --color-ground:            #FAF9F7;  /* page background */

  /* Feedback */
  --color-success:           #0E7A5F;
  --color-success-tint:      #F0F7F4;
  --color-success-line:      #CDE6DD;
  --color-warning:           #A45B00;
  --color-warning-tint:      #FDF4E8;
  --color-warning-line:      #F0DFC4;
  --color-error:             #C0271C;
  --color-error-hover:       #A11F16;

  /* Type */
  --font-sans: 'Public Sans', Helvetica, Arial, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

  --text-display: 56px;  --lh-display: 1.02;  --ls-display: -0.03em;  --fw-display: 700;
  --text-h2:      34px;  --lh-h2:      1.10;  --ls-h2:      -0.02em;  --fw-h2:      600;
  --text-h3:      22px;  --lh-h3:      1.25;  --ls-h3:      -0.01em;  --fw-h3:      600;
  --text-body:    17px;  --lh-body:    1.65;
  --text-small:   14px;  --lh-small:   1.55;
  --text-label:   11px;  --lh-label:   1.40;  --ls-label:   0.14em;   --fw-label:   600;

  /* Space — 4px grid */
  --space-1:  4px;   /* icon → label */
  --space-2:  8px;   /* label → field */
  --space-3:  16px;  /* within a card */
  --space-4:  24px;  /* card padding */
  --space-5:  48px;  /* block → block */
  --space-6:  88px;  /* section → section */

  /* Radius */
  --radius-tag:     6px;
  --radius-control: 8px;
  --radius-card:    12px;
  --radius-pill:    999px;

  /* Elevation */
  --shadow-raised:  0 2px 6px rgba(26,26,23,0.07);
  --shadow-overlay: 0 12px 28px rgba(26,26,23,0.14);

  /* Motion */
  --duration-fast: 140ms;
  --ease: ease;
}
```

### Token naming rule

Tokens are named by **role**, not by appearance. Never introduce `--color-blue` or `--color-grey-400`. If a new need arises, name the job it does (`--color-action-disabled`), not the hue.

---

## 2. Font loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

Weights used: 400, 500, 600, 700. Do not load others.

**Self-hosting is preferred** for a docs platform (offline builds, no third-party request). Public Sans is OFL-licensed — vendor the woff2 files and declare `@font-face` with `font-display: swap`.

Code blocks and inline code stay on `--font-mono`. Do not restyle code font size below 14px.

---

## 3. Base + typography

```css
html { -webkit-text-size-adjust: 100%; }

body {
  margin: 0;
  background: var(--color-ground);
  color: var(--color-body);
  font-family: var(--font-sans);
  font-size: var(--text-body);
  line-height: var(--lh-body);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4 { color: var(--color-ink); margin: 0; text-wrap: pretty; }

h1 { font-size: var(--text-display); line-height: var(--lh-display); letter-spacing: var(--ls-display); font-weight: var(--fw-display); }
h2 { font-size: var(--text-h2);      line-height: var(--lh-h2);      letter-spacing: var(--ls-h2);      font-weight: var(--fw-h2); }
h3 { font-size: var(--text-h3);      line-height: var(--lh-h3);      letter-spacing: var(--ls-h3);      font-weight: var(--fw-h3); }
h4 { font-size: var(--text-body);    font-weight: 600; }

p { margin: 0 0 var(--space-3); max-width: 70ch; }

small, .caption { font-size: var(--text-small); line-height: var(--lh-small); color: var(--color-muted); }

.label {
  font-size: var(--text-label); line-height: var(--lh-label);
  letter-spacing: var(--ls-label); font-weight: var(--fw-label);
  text-transform: uppercase; color: var(--color-muted);
}
```

### Documentation-specific overrides

Docs pages rarely need 56px headings. Inside the article body, step the scale down one notch:

| Element | Marketing page | Docs article body |
|---|---|---|
| Page title | 56px / 700 | 34px / 600 |
| Section heading | 34px / 600 | 22px / 600 |
| Subsection | 22px / 600 | 17px / 600 |
| Body | 17px | 17px — **do not shrink** |

Body text stays 17px everywhere. Docs are read, not skimmed.

### Type rules

- Six sizes only. If you need a seventh, you have a layout problem.
- Hierarchy comes from **size and weight**, never from color.
- Measure caps at 70 characters (`max-width: 70ch`) for prose. Code blocks and tables are exempt.
- Never center-align a paragraph longer than two lines.

---

## 4. Buttons

Four variants. One primary per view — the intended next step.

```css
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 9px;
  min-height: 44px; padding: 0 22px;
  font-family: inherit; font-size: 15px; font-weight: 600;
  border: 1px solid transparent; border-radius: var(--radius-control);
  cursor: pointer; text-decoration: none;
  transition: background var(--duration-fast) var(--ease);
}
.btn:focus-visible { outline: 2px solid var(--color-action); outline-offset: 2px; }

/* Primary */
.btn--primary { color: #FFF; background: var(--color-action); border-color: var(--color-action); }
.btn--primary:hover { background: var(--color-action-hover); border-color: var(--color-action-hover); }
.btn--primary:active { background: var(--color-action-pressed); border-color: var(--color-action-pressed); }

/* Secondary */
.btn--secondary { color: var(--color-ink); background: var(--color-surface); border-color: var(--color-line-strong); }
.btn--secondary:hover { background: var(--color-ground); border-color: var(--color-line-hover); }
.btn--secondary:active { background: var(--color-surface-sunken); }

/* Quiet */
.btn--quiet { color: var(--color-action); background: transparent; padding: 0 16px; }
.btn--quiet:hover { background: var(--color-action-tint); }
.btn--quiet:active { background: #D7E5FC; }

/* Destructive */
.btn--danger { color: #FFF; background: var(--color-error); border-color: var(--color-error); }
.btn--danger:hover { background: var(--color-error-hover); border-color: var(--color-error-hover); }
.btn--danger:focus-visible { outline-color: var(--color-error); }

/* Disabled — all variants */
.btn:disabled, .btn[aria-disabled="true"] {
  color: var(--color-muted); background: var(--color-surface-sunken);
  border-color: var(--color-line); cursor: not-allowed;
}

/* Sizes */
.btn--lg { min-height: 56px; padding: 0 30px; font-size: 17px; border-radius: 10px; }
.btn--sm { min-height: 44px; padding: 0 14px; font-size: 13px; border-radius: 7px; }
```

### Button rules

- **44px minimum height, always** — including the small size. Small means narrower and smaller text, not a smaller hit target.
- Width is content-driven. Never `width: 100%` except as the sole control in a mobile-width row.
- Labels name the outcome: "Copy snippet", not "Submit". "Save changes", not "OK".
- Disabled buttons stay visible and stay readable. Adjacent helper text explains why.
- Loading state keeps the label and adds a 13px spinner at `--space-2` gap. Never replace the label with a bare spinner.

### Docs platform mapping

| Existing element | Apply |
|---|---|
| "Get started" / hero CTA | `.btn .btn--primary .btn--lg` |
| Sidebar "Edit this page" | `.btn .btn--quiet .btn--sm` |
| "Copy" on code blocks | `.btn .btn--secondary .btn--sm` |
| Version switcher trigger | `.btn .btn--secondary .btn--sm` |
| Feedback "Yes / No" pair | both `.btn--secondary` — neither is primary |

---

## 5. Inputs

Label above the field, permanently visible. Placeholder is an example, never a label.

```css
.field { display: grid; gap: var(--space-2); }

.field__label { font-size: 13px; font-weight: 600; color: var(--color-ink); }

.input, .select, .textarea {
  width: 100%; box-sizing: border-box;
  min-height: 44px; padding: 0 14px;
  font-family: inherit; font-size: 15px; color: var(--color-ink);
  background: var(--color-surface);
  border: 1px solid var(--color-line-strong);
  border-radius: var(--radius-control);
}
.textarea { padding: 11px 14px; line-height: 1.55; resize: vertical; min-height: 88px; }
.select { padding: 0 12px; appearance: none; }

.input:hover, .select:hover, .textarea:hover { border-color: var(--color-line-hover); }

.input:focus, .select:focus, .textarea:focus {
  outline: 2px solid var(--color-action); outline-offset: 1px;
  border-color: var(--color-action);
}

.input::placeholder, .textarea::placeholder { color: var(--color-line-hover); }

.input:disabled, .textarea:disabled, .select:disabled {
  color: var(--color-muted); background: var(--color-surface-sunken);
  border-color: var(--color-line); cursor: not-allowed;
}

/* Help & error */
.field__help  { font-size: 13px; color: var(--color-muted); }
.field__error { font-size: 13px; font-weight: 500; color: var(--color-error); }
.field--invalid .input { border-color: var(--color-error); }
.field--invalid .input:focus { outline-color: var(--color-error); }

/* Search — pill shape reserved for search only */
.search {
  display: flex; align-items: center; gap: 10px;
  min-height: 44px; padding: 0 14px; box-sizing: border-box;
  background: var(--color-ground);
  border: 1px solid var(--color-line-strong);
  border-radius: var(--radius-pill);
}
.search input {
  flex: 1; min-width: 0; padding: 0;
  border: none; background: transparent;
  font-family: inherit; font-size: 15px; color: var(--color-ink);
  outline: none;
}
.search:focus-within { border-color: var(--color-action); outline: 2px solid var(--color-action); outline-offset: 1px; }

/* Choice controls */
.choice { display: flex; align-items: center; gap: 10px; min-height: 28px; font-size: 15px; color: var(--color-body); cursor: pointer; }
.choice input { width: 18px; height: 18px; margin: 0; accent-color: var(--color-action); }
```

### Input rules

- Error text **replaces** help text and says what to do: "Add the domain ending, e.g. .com" — not "Invalid email".
- Validate on blur, not on keystroke. Re-validate on submit.
- Never rely on color alone for the error state — the message text carries it.
- Required fields get a visible "Required" or the optional ones get "Optional". Pick one convention; asterisks alone are not enough.

---

## 6. Links

Docs are mostly links. Get these exactly right.

```css
a { color: var(--color-action); text-decoration: none; }
a:hover { color: var(--color-action-hover); text-decoration: underline; }
a:focus-visible { outline: 2px solid var(--color-action); outline-offset: 2px; border-radius: 3px; }

/* Prose links — underlined by default, because they sit inside sentences */
.prose a { text-decoration: underline; text-underline-offset: 2px; text-decoration-thickness: 1px; }
.prose a:hover { text-decoration-thickness: 2px; }
```

**Never color body text blue for emphasis.** Readers will try to click it. Use `font-weight: 600` and `--color-ink`.

Sidebar nav links are not prose — no underline; active state uses `--color-action-tint` background plus `--color-action` text.

---

## 7. Surfaces

```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-card);
  padding: var(--space-4);
}
.card--interactive { transition: box-shadow var(--duration-fast) var(--ease); }
.card--interactive:hover { box-shadow: var(--shadow-raised); }

.modal, .popover, .dropdown {
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-overlay);
}

/* Tags & badges */
.tag {
  display: inline-flex; align-items: center;
  font-size: 12px; font-weight: 600;
  border: 1px solid; border-radius: var(--radius-tag);
  padding: 5px 10px;
}
.tag--info    { color: var(--color-action-hover); background: var(--color-action-tint);  border-color: var(--color-action-tint-line); }
.tag--success { color: var(--color-success);      background: var(--color-success-tint); border-color: var(--color-success-line); }
.tag--warning { color: var(--color-warning);      background: var(--color-warning-tint); border-color: var(--color-warning-line); }
.tag--neutral { color: var(--color-body);         background: var(--color-ground);       border-color: var(--color-line); }
```

> **Layout gotcha:** when a tag row sits inside a CSS grid cell, add `align-items: flex-start` to the row and `align-content: start` to the cell. Default stretch alignment inflates tag height.

### Docs-specific surfaces

**Code blocks** — sunken, not raised. They are content, not controls.

```css
.code-block {
  background: var(--color-surface-sunken);
  border: 1px solid var(--color-line);
  border-radius: 10px;
  padding: var(--space-3);
  font-family: var(--font-mono);
  font-size: 14px; line-height: 1.6;
  overflow-x: auto;
}
code:not(pre code) {
  font-family: var(--font-mono); font-size: 0.9em;
  background: var(--color-surface-sunken);
  border: 1px solid var(--color-line);
  border-radius: 4px; padding: 1px 5px;
}
```

**Callouts** — tint fill, tinted border, full-opacity ink. Left-border-only accents are not part of this system.

```css
.callout { border: 1px solid; border-radius: 10px; padding: var(--space-3) var(--space-4); }
.callout__title { font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: var(--space-2); }
.callout--note    { background: var(--color-action-tint);  border-color: var(--color-action-tint-line); }
.callout--note .callout__title    { color: var(--color-action-hover); }
.callout--tip     { background: var(--color-success-tint); border-color: var(--color-success-line); }
.callout--tip .callout__title     { color: var(--color-success); }
.callout--caution { background: var(--color-warning-tint); border-color: var(--color-warning-line); }
.callout--caution .callout__title { color: var(--color-warning); }
```

Callout body text stays `--color-body`. Never tint the body copy.

**Tables**

```css
.table { width: 100%; border-collapse: collapse; font-size: var(--text-small); }
.table th {
  text-align: start; font-size: var(--text-label); font-weight: var(--fw-label);
  letter-spacing: var(--ls-label); text-transform: uppercase; color: var(--color-muted);
  padding: var(--space-2) var(--space-3);
  border-bottom: 1px solid var(--color-line);
}
.table td { padding: var(--space-3); border-bottom: 1px solid #F0EEE9; color: var(--color-body); }
.table tr:last-child td { border-bottom: none; }
```

No zebra striping. The row divider is enough.

---

## 8. Layout & spacing

Spacing steps roughly double. Related things sit close; unrelated things sit far.

| Token | Value | Use for |
|---|---|---|
| `--space-1` | 4px | icon → label |
| `--space-2` | 8px | label → field, tag gaps |
| `--space-3` | 16px | inside a card, paragraph spacing |
| `--space-4` | 24px | card padding, page gutter |
| `--space-5` | 48px | block → block |
| `--space-6` | 88px | section → section |

```css
.page   { max-width: 1120px; margin: 0 auto; padding: 0 var(--space-4); }
.stack  { display: grid; gap: var(--space-3); }
.stack--loose { gap: var(--space-5); }
```

**Use flex/grid with `gap` for every sibling group** — nav items, button rows, tag rows, toolbars. Do not space siblings with per-element margins or source whitespace.

### Docs shell

Three columns at desktop, collapsing predictably:

| Breakpoint | Layout |
|---|---|
| ≥1280px | sidebar 260px · content `minmax(0,1fr)` max 70ch · TOC 220px |
| 960–1279px | sidebar 260px · content — TOC hidden |
| <960px | single column, sidebar behind a toggle |

```css
.docs-shell {
  display: grid;
  gap: var(--space-5);
  grid-template-columns: 260px minmax(0, 1fr) 220px;
}
@media (max-width: 1279px) { .docs-shell { grid-template-columns: 260px minmax(0, 1fr); } .docs-toc { display: none; } }
@media (max-width: 959px)  { .docs-shell { grid-template-columns: minmax(0, 1fr); } }
```

Content column must use `minmax(0, 1fr)` — plain `1fr` lets wide code blocks blow out the grid.

---

## 9. Accessibility requirements — non-negotiable

- **Contrast:** body text ≥ 4.5:1 against its background; headline-scale type ≥ 3:1. Every pairing in §1 is compliant. If you introduce a new pairing, verify it.
- **Focus:** every interactive element shows a `2px` ring at `2px` offset (`1px` for inputs). Never `outline: none` without a replacement.
- **Hit targets:** 44px minimum in every dimension for anything clickable.
- **Do not signal with color alone.** Errors carry text; required fields carry words; active nav carries a background change, not just a color shift.
- **Motion:** honour reduced-motion.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

- **Headings are sequential.** Docs pages must not skip from `h2` to `h4`.

---

## 10. Not in scope

Explicitly not specified here — ask before inventing:

- Dark mode. The neutrals are warm-tinted and do not invert cleanly. This needs its own token set.
- RTL / Arabic typography. Use CSS logical properties (`padding-inline`, `margin-inline`, `text-align: start`) throughout so the retrofit is RTL-ready, but the Arabic type scale is undefined.
- Syntax highlighting theme for code blocks.
- Data visualisation palette.
- Icon set and icon sizing rules.
- Empty, loading, and error page states.

---

## 11. Acceptance checklist

Ship-blocking. Verify each before merge.

**Tokens**
- [ ] No hard-coded hex values outside the `:root` block
- [ ] No token named after a color (`--blue`, `--grey-500`)
- [ ] Public Sans loads; weights limited to 400/500/600/700

**Type**
- [ ] Body text is 17px everywhere; no prose below 14px
- [ ] Prose measure capped at 70ch
- [ ] No heading levels skipped on any docs page

**Controls**
- [ ] Every button ≥ 44px tall, including small
- [ ] Exactly one primary button per view
- [ ] Every interactive element has a visible focus ring
- [ ] No `outline: none` anywhere without a replacement ring
- [ ] Disabled controls remain readable and are explained

**Inputs**
- [ ] Every field has a persistent visible label
- [ ] No placeholder used as a label
- [ ] Error text replaces help text and states the fix
- [ ] Pill radius used only on search

**Layout**
- [ ] Sibling groups use flex/grid `gap`, not margins
- [ ] Content grid track is `minmax(0, 1fr)`
- [ ] Wide code blocks scroll internally; no horizontal page scroll
- [ ] Tag rows inside grid cells have `align-items: flex-start`

**Access**
- [ ] Body-text contrast ≥ 4.5:1 spot-checked on ground, surface, and all tint fills
- [ ] Keyboard-only walk through search → nav → article → feedback works
- [ ] `prefers-reduced-motion` respected

---

## 12. Open questions for the design side

Flag these back rather than guessing:

1. Is dark mode required for launch? If yes, it needs a separate token pass before dev starts.
2. Are docs pages ever localised to Arabic? Logical properties cost nothing now and are painful to retrofit later.
3. Which syntax-highlighting theme should code blocks use — the tokens above only define the container.
4. Does the platform have an existing icon set to keep, or should one be specified?
