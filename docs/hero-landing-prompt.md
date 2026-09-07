# Prompt — Landing hero for UI Design Reference

Retarget of the "Built for Intelligent Performance" spec onto **this** repo
(`ui-design-reference`, Vite + React, bilingual EN/AR) under the token set in
`DESIGN_SYSTEM.md`.

---

## 0. Deliverable

Build ONE standalone file: **`public/hero.html`** — no frameworks, no build step,
no extra files. Embedded `<style>` and `<script>` only.

> **Do not write `index.html`.** The repo root already has one; it is the Vite
> entry point (`<div id="root">` + `/src/main.jsx`). Overwriting it kills the app.
> Ship the prototype at `public/hero.html`, verify it, then port (§12).

Every value below is either a `DESIGN_SYSTEM.md` token or derived from one.
Do not invent colors, radii, sizes, spacing, or copy. Where a value is specified,
use it exactly. Where a string is marked **TODO(ar)**, leave the marker in — do
not machine-translate it.

---

## 1. What changed from the source spec, and why

The source spec was written for an AI-infrastructure product: saturated gradient
cards, white-on-dark type, autoplay video, card-relative type sizing. This design
system is warm, light, text-first, and absolute. These are the reconciliations —
each one is traceable to a numbered rule.

| Source spec | Here | Rule |
|---|---|---|
| CloudFront `.mp4` backgrounds ×4 | Removed. Stage is `--color-ground`; cards use the repo's own diagram PNGs | Off-brand for a docs site; DS specifies no motion media. Hooks kept — see §2.4 to restore |
| Card bg = 19-stop radial-gradient stacks, white text | `--color-surface` on `--color-ground`, `--color-line` border | §10 — dark mode "needs its own token set"; white-on-gradient is off-system |
| Card radius `calc(--card-w * 17 / 429)` | `var(--radius-card)` = **12px**, constant | §1 — radii are absolute (6 / 8 / 12 / 999). They do not scale |
| Card type `calc(22.95 * var(--u))` | DS scale, absolute: 22px / 17px / 14px | §3 — "Six sizes only." Fluid type is a seventh, eighth, ninth size |
| Card padding via `--u` | `var(--space-4)` = 24px | §8 — 4px grid is absolute |
| Dot-word in `#ad314d` | `--color-ink`. **Never `--color-action`** | §6 — "Never color body text blue for emphasis. Readers will try to click it" |
| 3 × "Learn More" | 1 × `.btn--primary .btn--lg` in masthead; cards are `.card--interactive` links | §4 — "One primary per view"; "Labels name the outcome" |
| Button `height: calc(45 * var(--u))` | `min-height: 44px` **floor**, never scaled below | §9 — 44px minimum in every dimension, always |
| Focus `3px solid rgba(255,255,255,.78)` | `2px solid var(--color-action)` at `2px` offset | §9 / §11 |
| `object-fit: fill` on media | `object-fit: cover` | `fill` distorts. Diagrams are content; content is not stretched |
| Gauge / tile-wall / network-map SVGs (~200 lines) | One `.card__figure` slot per card | Those visualise inference latency, token windows and data sources. None exist here |
| Monolingual, `margin-left` / `left` / `text-align: center` | Logical properties throughout, `dir`-aware | §10 — "Use CSS logical properties throughout so the retrofit is RTL-ready". This site is already bilingual |

**Kept intact from the source spec**, because it is good and DS-compatible:
the rigid card unit, the `--u` optical scale (now figures + metrics only), the
container-query card row, the entrance choreography, the LED-dot numerals,
`prefers-reduced-motion` handling, desktop-no-scroll / mobile-stack.

---

## 2. Assets

### 2.1 Fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap">
```

- Latin: `--font-sans` = `'Public Sans', Helvetica, Arial, sans-serif` (§2)
- Arabic: `'IBM Plex Sans Arabic'` — already loaded by this repo's `index.html`
- Weights 400 / 500 / 600 / 700 only (§2). Do not load 300 or 800.
- `-webkit-font-smoothing: antialiased` (§3). Do **not** set
  `text-rendering: geometricPrecision` — it degrades Arabic shaping.

### 2.2 Card figures — use these repo paths only

| Card | Path |
|---|---|
| 1 | `/assets/basics/hierarchy-size.png` |
| 2 | `/assets/basics/proximity-alignment.png` |
| 3 | `/assets/basics/px-vs-pt.png` |

Served from `public/`, so the leading `/assets/…` path is correct in dev and build.
Each is `<img class="card__figure" alt="" loading="lazy" decoding="async">`.
`alt=""` — the figures are decorative here; the card title carries the meaning.

### 2.3 Stage background

No video, no image. `background: var(--color-ground)` (`#FAF9F7`).

### 2.4 Restoring motion (only if brand requires it)

Keep this hook in the stylesheet so the decision stays reversible:

```css
.stage-motion { position: absolute; inset: 0; z-index: -2; width: 100%; height: 100%;
  object-fit: cover; pointer-events: none; display: none; }
@media (prefers-reduced-motion: reduce) { .stage-motion { display: none !important; } }
```

Set `display: block` and add a `<video autoplay muted loop playsinline>` to enable.
Ships disabled.

---

## 3. Tokens

Declare once. **No hard-coded hex outside this block** (§11).

```css
:root {
  /* Brand — action */
  --color-action:            #1F5AE0;
  --color-action-hover:      #1747B8;
  --color-action-pressed:    #123A96;
  --color-action-tint:       #EAF1FE;
  --color-action-tint-line:  #C7DBFB;

  /* Neutrals — warm */
  --color-ink:               #1A1A17;
  --color-body:              #4A4842;
  --color-muted:             #7A776F;
  --color-line:              #E6E3DD;
  --color-line-strong:       #CFCBC2;
  --color-line-hover:        #A8A49B;
  --color-surface:           #FFFFFF;
  --color-surface-sunken:    #F0EEE9;
  --color-ground:            #FAF9F7;

  /* Type */
  --font-sans: 'Public Sans', Helvetica, Arial, sans-serif;
  --font-ar:   'IBM Plex Sans Arabic', 'Public Sans', sans-serif;

  --text-display: 56px;  --lh-display: 1.02;  --ls-display: -0.03em;  --fw-display: 700;
  --text-h2:      34px;  --lh-h2:      1.10;  --ls-h2:      -0.02em;  --fw-h2:      600;
  --text-h3:      22px;  --lh-h3:      1.25;  --ls-h3:      -0.01em;  --fw-h3:      600;
  --text-body:    17px;  --lh-body:    1.65;
  --text-small:   14px;  --lh-small:   1.55;
  --text-label:   11px;  --lh-label:   1.40;  --ls-label:   0.14em;   --fw-label:   600;

  /* Space — 4px grid */
  --space-1: 4px; --space-2: 8px; --space-3: 16px;
  --space-4: 24px; --space-5: 48px; --space-6: 88px;

  /* Radius */
  --radius-tag: 6px; --radius-control: 8px; --radius-card: 12px; --radius-pill: 999px;

  /* Elevation */
  --shadow-raised:  0 2px 6px rgba(26,26,23,0.07);
  --shadow-overlay: 0 12px 28px rgba(26,26,23,0.14);

  /* Motion */
  --duration-fast: 140ms;
  --ease: ease;

  /* Stage geometry */
  --card-ref-w: 429;
  --card-ref-h: 554;
  --card-min-w: 280px;
  --card-count: 3;
  --gap: var(--space-3);
  --gutter: clamp(var(--space-4), 3.6vw, var(--space-5));
  --content-max: calc(var(--card-count) * var(--card-ref-w) * 1px + (var(--card-count) - 1) * var(--gap));
  --pad-top: clamp(var(--space-5), 9.6vh, var(--space-6));
  --pad-bottom: clamp(var(--space-4), 3vh, var(--space-5));
  --masthead-gap: clamp(var(--space-4), 3vw, var(--space-5));
  --cards-offset: clamp(var(--space-4), 9.4vh, var(--space-6));
}
```

### 3.1 Dark mode

`DESIGN_SYSTEM.md` §10 lists dark mode as out of scope — **but this repo ships
one.** `index.html` sets `.dark` on `<html>` before first paint from
`localStorage['uiref:theme']`, and `src/index.css` defines a full dark ramp.
The hero must honour it or it will flash light inside a dark app.

Map onto the repo's existing `--c-*` ramp rather than inventing a second one:

```css
.dark {
  --color-ink:            rgb(236 233 227);
  --color-body:           rgb(176 172 163);
  --color-muted:          rgb(128 124 116);
  --color-line:           rgb(55 53 49);
  --color-line-strong:    rgb(82 79 73);
  --color-line-hover:     rgb(110 106 99);
  --color-surface:        rgb(30 29 27);
  --color-surface-sunken: rgb(40 39 36);
  --color-ground:         rgb(23 22 21);
  --shadow-raised:  0 2px 6px rgba(0,0,0,0.32);
  --shadow-overlay: 0 12px 28px rgba(0,0,0,0.46);
}
```

`--color-action` and its tints are **not** overridden here — see §14 Q2. This is a
mapping, not a designed dark palette. Flag it for a token pass before launch.

---

## 4. Document shell

```html
<!doctype html>
<html lang="en" dir="ltr">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#FAF9F7">
<title>UI Design Reference — Built on principles, not walkthroughs</title>
```

```css
* { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
html, body { margin: 0; min-width: 100%; height: 100%; overflow: hidden; }
body {
  background: var(--color-ground);
  color: var(--color-body);
  font-family: var(--font-sans);
  font-size: var(--text-body);
  line-height: var(--lh-body);
  -webkit-font-smoothing: antialiased;
}
html[lang="ar"] body { font-family: var(--font-ar); }
button, a { font: inherit; }
h1, h2, h3 { color: var(--color-ink); margin: 0; text-wrap: pretty; }
```

In-head script, before paint:

```js
document.documentElement.classList.add("entrance-active");
window.__entranceFailsafe = setTimeout(
  () => document.documentElement.classList.remove("entrance-active"), 3200);
```

Mirror the repo's own pre-paint block so the prototype matches the app:

```js
try {
  var t = localStorage.getItem('uiref:theme') ||
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  if (t === 'dark') document.documentElement.classList.add('dark');
  var l = localStorage.getItem('uiref:lang') || 'en';
  document.documentElement.lang = l;
  document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
} catch (e) {}
```

---

## 5. Layout

`<main class="stage">` — `position: relative; isolation: isolate;`
`display: flex; flex-direction: column; height: 100svh; overflow: hidden;`
`padding: var(--pad-top) var(--gutter) var(--pad-bottom);`

`.masthead` and `.cards`: `width: min(100%, var(--content-max)); margin-inline: auto;`

**Short-viewport release valve** — the source spec clipped content below ~620px tall:

```css
@media (max-height: 620px) {
  html, body { overflow: auto; }
  .stage { height: auto; min-height: 100svh; overflow: visible; }
}
```

### Masthead

```css
.masthead {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, clamp(280px, 32vw, 483px));
  gap: var(--masthead-gap);
  align-items: start;
  z-index: 2; flex: 0 0 auto;
}
```

**`h1.headline`** — two `.headline__line` rows (`display: flex; flex-wrap: nowrap; align-items: center;`)

- Line 1: `Built on ` + `<span class="dot-word" data-dots="principles" aria-label="principles"></span>`
- Line 2: `not walkthroughs`

```css
.headline {
  max-width: 100%;
  color: var(--color-ink);
  font-size: clamp(var(--text-h2), min(3.1vw, 5.9vh), var(--text-display));
  font-weight: var(--fw-display);
  letter-spacing: var(--ls-display);
  line-height: var(--lh-display);
}
```

> The source spec used weight 400 / `+.015em` tracking. DS `--text-display` is
> 700 / `-0.03em` (§1). Use the token.

```css
.dot-word {
  display: inline-block; flex: 0 0 auto;
  width: 4.752em; height: .766em;
  margin-inline-start: .319em;
  color: var(--color-ink);
  transform: translateY(.085em);
}
.dot-svg { display: block; overflow: visible; color: inherit; }
```

`4.752em` is derived, not chosen — see §11.3.

**`p.intro`**

```css
.intro {
  container-type: inline-size;
  width: 100%; max-width: 70ch;
  margin: var(--space-3) 0 0;
  color: var(--color-body);
  font-size: var(--text-body);
  line-height: var(--lh-body);
}
```

Copy — **condensed** from `content/00-introduction.json` § "Why this book exists".
Not verbatim: the source runs three paragraphs, the hero needs three lines. The
condensation may drop material but must introduce no claim the source does not make.

Proposed:

> Most UI courses show you *how* someone designs, but never *why*.<br class="desktop-break">
> This one is built the other way around — so you can defend a<br class="desktop-break">
> choice, not just repeat it.

Source, for the diff (`body.en`):

> Michael Filipiuk wrote this eBook because most UI courses are just videos of
> someone designing a landing page step by step. The creator shows you *how* he
> designs, but never explains *why*.
>
> This book is built the other way around. The goal is not only that you can design
> a good interface, but that you understand the decision-making behind it — so you
> can defend a choice, not just repeat it.

Arabic source for the same section exists (`body.ar`) — see §8.

```css
.desktop-break { display: none; }
@container (min-width: 26.5em) { .desktop-break { display: inline; } }
```

**CTA — the one primary button on the page** (§4):

```html
<a class="btn btn--primary btn--lg" href="/#introduction">Start reading</a>
```

Sits below `.intro` at `margin-top: var(--space-4)`. There is exactly one
`.btn--primary` in the whole document (§11).

### Cards row

```html
<section class="cards" aria-label="What the reference covers">
```

```css
.cards {
  flex: 1 1 auto; container-type: size;
  display: flex; justify-content: space-between; align-items: center;
  gap: var(--gap); min-height: 0;
  margin-top: var(--cards-offset);
  --card-w: max(var(--card-min-w), min(
    (100cqw - (var(--card-count) - 1) * var(--gap)) / var(--card-count),
    100cqh * var(--card-ref-w) / var(--card-ref-h),
    var(--card-ref-w) * 1px
  ));
}
```

The `max(--card-min-w, …)` floor is the addition. The source formula let cards
shrink without limit; with absolute DS type that overflows. At the floor the
layout steps down (§9) instead of crushing.

---

## 6. Cards

Three cards. Each is a link to a chapter — the whole card is the hit target.

```css
.card {
  position: relative; flex: 0 0 auto; overflow: hidden;
  display: flex; flex-direction: column;
  width: var(--card-w);
  aspect-ratio: var(--card-ref-w) / var(--card-ref-h);
  padding: var(--space-4);
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-card);
  text-decoration: none;
  --u: calc(100cqw / 429);   /* optical scale — figures + metric only, never spacing */
  container-type: inline-size;
}
.card--interactive { transition: box-shadow var(--duration-fast) var(--ease); }
.card--interactive:hover { box-shadow: var(--shadow-raised); }
.card:focus-visible { outline: 2px solid var(--color-action); outline-offset: 2px; }
```

`--u` survives from the source spec but its remit shrinks: it sizes the metric
numerals and the figure only. **Padding, radii, borders, type and control heights
are absolute DS tokens.** Mixing the two is what produced the "seventh type size"
problem the DS forbids.

`.card__figure` — `flex: 0 0 auto; width: 100%; aspect-ratio: 16 / 10;
object-fit: cover; border-radius: var(--radius-control);
background: var(--color-surface-sunken);`

`.card__title` — `font-size: var(--text-h3); line-height: var(--lh-h3);
letter-spacing: var(--ls-h3); font-weight: var(--fw-h3); color: var(--color-ink);
margin-top: var(--space-4);`

`.metric` — `display: flex; align-items: flex-end; gap: var(--space-1);
color: var(--color-ink); margin-top: auto;`
`.metric__unit` — `font-size: var(--text-h3); font-weight: var(--fw-h3);
color: var(--color-muted); padding-bottom: .18em;`

`.caption` — `font-size: var(--text-small); line-height: var(--lh-small);
color: var(--color-muted); margin-top: var(--space-2);`

`.card__cta` — `.btn .btn--quiet .btn--sm`, `margin-top: var(--space-3)`,
`align-self: start`. Not `.btn--primary` (§4: one per view).

No `::before` sheen, no `.card__grain` noise filter, no `mix-blend-mode`. Those
existed to make gradient cards read as glass. There are no gradient cards.

### Card content — all figures verified against this repo

| | Card 1 | Card 2 | Card 3 |
|---|---|---|---|
| class | `.card--coverage` | `.card--bilingual` | `.card--figures` |
| title | Every principle, one section | English and Arabic, one source | Diagrams, not screenshots |
| `data-dots` | `49` | `100` | `16` |
| unit | — | `%` | — |
| caption | Across four chapters — Introduction, The Basics, Grid and Layout, Typography | Every section translated, RTL layout included | Drawn for the book, not captured from a tool |
| CTA | Browse the sections | Switch to العربية | See the diagrams |
| href | `/#basics` | `/#basics` | `/#basics` |

Counts are live as of this spec: `content/*.json` holds 4 chapters and
6 + 18 + 10 + 15 = **49** sections; `public/assets/` holds **16** diagram PNGs.
Re-count before shipping — do not let these drift.

---

## 7. Controls

Lift §4 of `DESIGN_SYSTEM.md` verbatim. The relevant subset:

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

.btn--primary { color: #FFF; background: var(--color-action); border-color: var(--color-action); }
.btn--primary:hover { background: var(--color-action-hover); border-color: var(--color-action-hover); }
.btn--primary:active { background: var(--color-action-pressed); border-color: var(--color-action-pressed); }

.btn--quiet { color: var(--color-action); background: transparent; padding: 0 16px; }
.btn--quiet:hover { background: var(--color-action-tint); }
.btn--quiet:active { background: #D7E5FC; }

.btn--lg { min-height: 56px; padding: 0 30px; font-size: 17px; border-radius: 10px; }
.btn--sm { min-height: 44px; padding: 0 14px; font-size: 13px; border-radius: 7px; }
```

`#FFF` and `#D7E5FC` are the only hexes outside `:root` — they are quoted from the
source system as-is. Everything else resolves through a token.

**`.btn--sm` is still 44px tall.** Small means narrower and smaller text, never a
smaller hit target (§4). Do not reintroduce `height: calc(45 * var(--u))`.

---

## 8. Bilingual / RTL

This site ships Arabic. It is not a future concern — `index.html` already sets
`dir="rtl"` for `lang="ar"`, and `src/index.css` already uses logical properties.
The hero must match.

- **Logical properties only.** `margin-inline-start`, `padding-inline`,
  `inset-inline-start`, `text-align: start`. No `left` / `right` / `margin-left`.
- **The LED dot-word does not render Arabic.** A 7-row bitmap grid cannot express
  connected Arabic script — it would produce disconnected, wrong letterforms.
  In `html[lang="ar"]`, hide `.dot-word` and show a plain `<span class="dot-word__ar">`
  set in `var(--font-ar)` at `font-weight: 600`:

  ```css
  html[lang="ar"] .dot-word { display: none; }
  .dot-word__ar { display: none; }
  html[lang="ar"] .dot-word__ar { display: inline; font-weight: 600; }
  ```

- **Dot numerals are safe in both directions.** `49`, `100`, `16` render as Western
  Arabic numerals in both locales — that matches this repo, which keeps Latin
  design terms and figures LTR in Arabic mode (`src/index.css`, `unicode-bidi: isolate`).
  Wrap `.metric` in `direction: ltr; unicode-bidi: isolate;` so the unit stays
  on the correct side.
- **`.desktop-break` is LTR-tuned.** Suppress it in Arabic:
  `html[lang="ar"] .desktop-break { display: none !important; }`

**Arabic copy — TODO(ar), needs a native pass.** The chapter titles below exist
verbatim in `content/*.json` and can be used as-is:

| English | Arabic (verified in repo) |
|---|---|
| UI Design Reference | مرجع تصميم الواجهات |
| Course companion | مرجع الدورة |
| Introduction | المقدمة |
| The Basics | الأساسيات |
| Grid and Layout | الجريد والتخطيط |
| Typography | التايبوجرافي |

**The intro also has Arabic source.** `content/00-introduction.json` §
"Why this book exists" carries a full `body.ar`, written in Egyptian Arabic by the
course author:

> مايكل فيليبيوك كتب الإيبوك ده لأن معظم كورسات الـ UI عبارة عن فيديوهات لحد بيصمّم لاندنج بيدج خطوة بخطوة. بيوريك **إزاي** بيصمّم، لكن عمره ما بيشرح **ليه**.
>
> الكتاب ده معمول بالعكس. الهدف مش بس إنك تعرف تصمّم واجهة كويسة، لكن إنك تفهم القرار اللي وراها — عشان تقدر تدافع عن اختيارك، مش بس تقلّده.

Condense this for the Arabic hero the same way §5 condenses the English — reusing
the author's own phrasing and register. Do **not** translate the English
condensation back into Arabic; the two must both descend from their own source.
The register is colloquial Egyptian, not Modern Standard — preserve it.

**Genuinely missing Arabic — mark `TODO(ar)`:** the headline
("Built on principles, not walkthroughs"), the three card titles, the three
captions, and all four CTA labels. Nothing in this repo covers them. Render the
English and leave the marker until a native writer supplies them; do not
machine-translate. `DESIGN_SYSTEM.md` §10 also leaves the Arabic type scale
undefined — see §14 Q3.

---

## 9. Responsive

**Portrait tablet** — `@media (min-width: 768px) and (max-width: 1180px) and (max-aspect-ratio: 6/7)`

```css
.cards { display: grid; grid-template-columns: repeat(2, max-content);
  justify-content: center; align-content: center;
  --card-w: max(var(--card-min-w), min(
    (100cqw - var(--gap)) / 2,
    (100cqh - var(--gap)) / 2 * var(--card-ref-w) / var(--card-ref-h),
    var(--card-ref-w) * 1px)); }
.card:last-child { grid-column: 1 / -1; justify-self: center; }
```

**Mobile** — `@media (max-width: 767px)`

```css
html, body { height: auto; overflow: visible; }
.stage { height: auto; min-height: 100svh; overflow: visible; }
.masthead { grid-template-columns: minmax(0, 1fr); }
.cards { container-type: inline-size; flex: 0 0 auto;
  flex-direction: column; align-items: center;
  --card-w: min(100cqw, var(--card-ref-w) * 1px); }
.card { aspect-ratio: auto; }
```

`aspect-ratio: auto` on stacked cards is the addition — with absolute type, a
forced 429/554 box either clips the caption or strands whitespace.

---

## 10. Entrance animation

One-shot, then the class is removed. Applied while `html.entrance-active` is set,
to: `.headline__line`, `.intro`, `.btn--primary`, `.card`, `.card__figure`,
`.card__title`, `.metric`, `.caption`, `.card__cta`.
`will-change: opacity, translate, scale, clip-path, filter`.

```
headline-reveal   .84s cubic-bezier(.16,1,.3,1) both
  line 1 delay .08s · line 2 delay .17s
  from { opacity:0; translate:0 .52em; clip-path:inset(0 0 56% 0); }
  to   { opacity:1; translate:none;    clip-path:inset(-8% -2% -8% -2%); }

support-reveal    .72s cubic-bezier(.22,1,.36,1) both
  from { opacity:0; translate:0 8px; } to { opacity:1; translate:none; }
  .intro delay .25s

control-settle    .52s cubic-bezier(.16,1,.3,1) both
  from { opacity:0; translate:0 6px; scale:.975; } to { opacity:1; translate:none; scale:none; }
  masthead .btn--primary delay .34s
```

Cards — `--entrance-delay`: card 1 `.46s`, card 2 `.58s`, card 3 `.70s`.
On mobile **all** cards use `.40s` (the first card is the opening composition;
the rest must not wait on a scroll that already happened).

```
card-establish    .76s cubic-bezier(.16,1,.3,1) var(--entrance-delay) both
  from { opacity:.52; translate:0 10px; scale:.985; } to { opacity:1; translate:none; scale:none; }
```

Card children inherit their card's `--entrance-delay`, then add:

| Element | Animation | Offset |
|---|---|---|
| `.card__figure` | `figure-resolve` `.82s cubic-bezier(.16,1,.3,1)` | +.30s |
| `.card__title` | `card-title-reveal` `.62s cubic-bezier(.22,1,.36,1)` | +.14s |
| `.metric` | `metric-resolve` `.66s cubic-bezier(.16,1,.3,1)` | +.48s |
| `.caption` | `support-reveal` `.54s cubic-bezier(.22,1,.36,1)` | +.64s |
| `.card__cta` | `control-settle` `.52s cubic-bezier(.16,1,.3,1)` | +.80s |

```
figure-resolve  from { opacity:0; translate:0 9px; scale:.972; clip-path:inset(8% 4% 8% 4%); }
                to   { opacity:1; translate:none; scale:none; clip-path:inset(-3%); }
card-title-reveal from { opacity:0; translate:0 8px; clip-path:inset(0 0 48% 0); }
                to   { opacity:1; translate:none; clip-path:inset(-8% -2% -8% -2%); }
metric-resolve  from { opacity:0; translate:0 7px; scale:.985; filter:blur(2.5px); }
                to   { opacity:1; translate:none; scale:none; filter:none; }
```

Translate distances are **px, not `--u`**. At the 280px card floor, `9 * var(--u)`
collapses to ~5.9px and the choreography loses its read.

**Teardown JS**

```js
const done = matchMedia('(max-width: 767px)').matches
  ? document.querySelector('.card--coverage .card__cta')
  : document.querySelector('.card--figures .card__cta');

if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
  clearTimeout(window.__entranceFailsafe);
  document.documentElement.classList.remove('entrance-active');
} else {
  done.addEventListener('animationend', () => {
    clearTimeout(window.__entranceFailsafe);
    document.documentElement.classList.remove('entrance-active');
  }, { once: true });
}
```

**Reduced motion** (§9, non-negotiable):

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
  }
}
```

---

## 11. LED dot type

Replace every `[data-dots]` with an SVG of filled circles built from 7-row bitmap
glyphs. Vanilla JS, no library.

### 11.1 Geometry

```
pitchX    = 4 for .dot-word, else 5
pitchY    = 4
gap       = 1 column between glyphs (no trailing gap)
dotRadius = 1.8 for .dot-word; 2.32 inside .metric; else 1.55
circle    = cx: x + col * pitchX + 1.55   cy: row * pitchY + 1.55
viewBox   = `0 0 ${x} 28`   class="dot-svg"   fill="currentColor"
```

`x` accumulates `(cols + gap) * pitchX` per glyph, minus one trailing gap.

### 11.2 Glyphs

Digits (5 wide, except `1` at 3) — unchanged from the source spec:

```
"0": 01110 10001 10011 10101 11001 10001 01110
"1": 010 110 010 010 010 010 111
"2": 01110 10001 00001 00010 00100 01000 11111
"3": 11110 00001 00001 01110 00001 00001 11110
"4": 00010 00110 01010 10010 11111 00010 00010
"5": 11111 10000 10000 11110 00001 00001 11110
"6": 01110 10000 10000 11110 10001 10001 01110
"7": 11111 00001 00010 00100 01000 01000 01000
"8": 01110 10001 10001 01110 10001 10001 01110
"9": 01110 10001 10001 01111 00001 00001 01110
".": 0 0 0 0 0 0 1
```

Lowercase — rows 1–2 blank, letterform occupies rows 3–7. `r`, `i`, `n`, `l`, `e`
are from the source spec; `p`, `c`, `s` are **new**, required by "principles",
and drawn to match the existing set's weight and x-height:

```
"r": 00000 00000 10110 11001 10000 10000 10000
"i": 1 0 1 1 1 1 1
"n": 00000 00000 11110 10001 10001 10001 10001
"l": 10 10 10 10 10 10 01
"e": 00000 00000 01110 10001 11111 10000 01110
"p": 00000 00000 11110 10001 11110 10000 10000   ← new
"c": 00000 00000 01110 10001 10000 10001 01110   ← new
"s": 00000 00000 01111 10000 01110 00001 11110   ← new
```

Retain `a`, `g`, `t`, `I` from the source set so the word can change without a
redraw. Any glyph not in the table must be added here, never approximated.

### 11.3 Derived widths — do not hard-code percentages

The source spec hard-coded `.dot-number { width: 31.2% }` etc. Those percentages
were tuned to `118` / `2.4` / `16` and silently break on any other value. Have the
JS write the measured width back as a custom property:

```js
el.style.setProperty('--dot-w', x);          /* the computed viewBox width */
```

```css
.dot-word   { width: 4.752em; }                               /* see below */
.dot-number { width: calc(var(--dot-w) * var(--u) * 2.06); }  /* constant cap height */
```

`2.06` is the source spec's own ratio, recovered from card 1
(`133.8px ÷ 65 units`). Holding it constant is what keeps the three numerals
optically the same size — the original percentages only approximated that.

Check values:

| Token | cols | gaps | `x` | Result |
|---|---|---|---|---|
| `principles` | 39 | 9 | 192 | `4.851em × 192/196` = **4.752em** |
| `49` | 10 | 1 | 55 | ≈ 26.4% of card width |
| `100` | 13 | 2 | 75 | ≈ 36.0% |
| `16` | 8 | 1 | 45 | ≈ 21.6% |

`4.851em` was the source spec's width for `Intelligent` (`x` = 196). The new word
is 192 wide, hence the ratio.

### 11.4 Accessibility

Every `[data-dots]` keeps its `aria-label`; the generated `<svg>` gets
`aria-hidden="true"` and `focusable="false"`. The dots are a rendering of text,
not an image of one.

---

## 12. Porting into the React app

Once `public/hero.html` is verified:

1. `src/components/Hero.jsx` — markup, with `useLang()` from `src/lib/hooks.js`
   driving the EN/AR strings.
2. Tokens go in `src/index.css` under the existing `:root` / `.dark` blocks.
   Reconcile with the `--c-*` ramp already there — do not run two systems.
3. Card figures move to `<Asset>` (`src/components/Asset.jsx`) so they inherit the
   repo's existing image handling.
4. The entrance script becomes a `useEffect` with the same failsafe teardown.
5. Delete `public/hero.html`. It is a prototype, not a route.

---

## 13. Acceptance checklist

Ship-blocking. Merges §11 of `DESIGN_SYSTEM.md` with this spec's own constraints.

**Tokens**
- [ ] No hard-coded hex outside `:root`, except `#FFF` and `#D7E5FC` in §7
- [ ] No token named after a colour (`--blue`, `--grey-500`)
- [ ] Public Sans loads; weights limited to 400 / 500 / 600 / 700
- [ ] `.dark` block present; hero does not flash light inside the dark app

**Type**
- [ ] Six sizes only — every `font-size` resolves to a `--text-*` token
- [ ] No `calc(N * var(--u))` on any `font-size`
- [ ] `.intro` capped at `70ch`
- [ ] `h1` is the only heading at display scale; no level skipped

**Controls**
- [ ] Exactly one `.btn--primary` in the document
- [ ] Every button ≥ 44px tall, `.btn--sm` included, at every card width
- [ ] Every interactive element shows a 2px `--color-action` ring at 2px offset
- [ ] No `outline: none` without a replacement
- [ ] CTA labels name the outcome — no "Learn More"

**Layout**
- [ ] Sibling groups use flex/grid `gap`, never per-element margins
- [ ] Cards never narrower than `--card-min-w`; layout steps down instead
- [ ] Radii are 6 / 8 / 12 / 999 — none computed from `--u`
- [ ] Padding resolves to a `--space-*` token
- [ ] Desktop ≥768px: no page scroll; short-viewport valve (§5) verified at 600px tall
- [ ] Mobile <768px: page scrolls, cards stack, `aspect-ratio: auto`

**Bilingual**
- [ ] No physical direction properties anywhere (`left`, `right`, `margin-left`, …)
- [ ] Layout verified at `dir="rtl"` — nothing mirrors wrongly, nothing overlaps
- [ ] `.dot-word` hidden in Arabic; `.dot-word__ar` shown in IBM Plex Sans Arabic
- [ ] `.metric` isolated LTR; unit on the correct side in both directions
- [ ] Untranslated strings carry a visible `TODO(ar)` marker in source

**Access**
- [ ] Body-text contrast ≥ 4.5:1 on `--color-ground` and `--color-surface`, both themes
- [ ] Headline-scale type ≥ 3:1
- [ ] Keyboard-only walk: CTA → card 1 → card 2 → card 3, ring visible throughout
- [ ] `prefers-reduced-motion` honoured; entrance class removed immediately
- [ ] Generated dot SVGs are `aria-hidden`; `aria-label` carries the text

**Content**
- [ ] `49` / `16` re-counted against `content/*.json` and `public/assets/`
- [ ] Intro condensation introduces no claim absent from `content/00-introduction.json`

---

## 14. Open questions — flag, do not guess

Extends §12 of `DESIGN_SYSTEM.md`. Two of its four are now answered by this repo.

1. **Which accent wins?** `DESIGN_SYSTEM.md` sets `--color-action: #1F5AE0` (blue).
   This repo's `src/index.css` sets `--c-accent: 163 81 43` (copper) and uses it for
   links, selection and focus rings. A blue hero above a copper site is a visible
   seam. This spec defaults to DS blue as instructed; aliasing back is one line —
   `--color-action: rgb(var(--c-accent-ink));` — but that is a brand decision, not
   an implementation one. **Needs a call before merge.**

2. **Dark mode** — `DESIGN_SYSTEM.md` §10 defers it; this repo already ships it.
   §3.1 is a *mapping onto existing values*, not a designed palette. The action
   colour in particular is unverified for contrast on `rgb(23 22 21)`.
   **Answers DS §12 Q1: yes, required — it already exists.**

3. **Arabic type scale** — `DESIGN_SYSTEM.md` §10 leaves it undefined. IBM Plex
   Sans Arabic at Public Sans's metrics runs optically small; Arabic generally
   wants ~+1px body and looser leading. The hero currently reuses the Latin scale.
   **Answers DS §12 Q2: yes, this site is localised to Arabic today.** Needs its
   own scale.

4. **Are the CloudFront videos brand-mandatory?** They were struck (§1) as
   off-system for a docs site. If they must stay, §2.4 restores them in two lines —
   but the card treatment then needs its own dark token set (`DESIGN_SYSTEM.md` §10),
   which does not exist.
