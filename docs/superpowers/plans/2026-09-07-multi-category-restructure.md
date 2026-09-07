# Multi-Category Restructure & Arabic Book Import — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the single-category "UI Design Reference" into the multi-category Arabic-first reference «ما ليس على المصمّم جهله», seeded with 18 new Arabic chapters imported from markdown.

**Architecture:** Content moves from flat `/content/*.json` to `/content/<category>/<chapter>.json` with a top-level `/content/categories.json` registry, exactly as PRD §2 specifies. A pure-function markdown importer (`scripts/lib/book-import.mjs`) converts the three Arabic markdown files into schema-valid JSON; it is unit-tested in isolation and driven by a thin CLI. The schema drops the hard `en` requirement so Arabic-only content is first-class, matching PRD §4's "الموقع عربي أولًا، والإنجليزي مصاحب". Routing gains a category segment with a backward-compatible redirect for existing two-segment links.

**Tech Stack:** Vite 5, React 18, Tailwind 3, Fuse.js, ajv-cli (validation), Vitest (new — no test runner exists today).

**Spec:** `/Users/emirbayraktar/Downloads/files (3)/` — files `00-project-brief.md` through `08-content-pipeline.md`. Primary drivers: `02-prd.md` (§2 architecture, §4 language, §5 quality), `03-content-categories.md` (category waves, editor-note rule), `08-content-pipeline.md` (validation gate).

**Content source:** `/Users/emirbayraktar/Downloads/chapters1-7arabic.md`, `chapters8-14arabic.md`, `chapters15-21arabic.md`.

## Global Constraints

Every task's requirements implicitly include this section.

- **Arabic-first.** Default `lang` is `ar`, default `dir` is `rtl`. English is the accompanying language, not the default. (PRD §4)
- **Logical properties only.** Spacing and alignment use `start`/`end`, never `left`/`right`. Any hardcoded `margin-left` breaks the layout on flip. (PRD §4)
- **Design tokens only.** No literal colour, spacing, or size values in styles — tokens only. (PRD §5)
- **WCAG AA minimum** for every text-on-background pair. (PRD §5)
- **Full keyboard navigation** must keep working. (PRD §5)
- **Latin stays LTR inside Arabic.** Code, hex values, and Latin technical terms remain LTR inside Arabic paragraphs — do not strip parenthetical Latin terms from Arabic titles or bodies; that bilingual form is idiomatic Arabic technical writing. (PRD §4)
- **Arabic line height 1.7–1.8**, Latin 1.6. (PRD §4)
- **Fonts:** IBM Plex Sans Arabic (Arabic), Inter (Latin). (PRD §4)
- **`note` callout** renders with the label «إضافة خاصة بالكورس» and means "our addition, not from the source". (PRD §2, `03` editor-note rule)
- **Every chapter must pass** `npx --yes ajv-cli@5 validate --spec=draft7 -s schema/chapter.schema.json -d "content/*/*.json"` before commit. Failing automated validation means it goes back immediately — no human review of content that fails the machine check. (`08` §1)
- **Do not push to `origin`.** The remote is `Khatab11/ui-design-reference`, not ours. Work on a local branch.

## Out of Scope (deferred to a second plan)

These are PRD §3 "required before public launch" items. They depend on the category URL shape landing first, so building them now means building them twice:

- Home page with suggested path
- Newsletter signup
- Section-level share affordance
- Arabic meta + Open Graph tags
- Arabic search normalization (hamza/alef/tashkeel) — PRD §8
- Load-speed work (render-blocking Google Fonts)

## File Structure

**Created:**
- `scripts/lib/book-import.mjs` — pure functions: heading-level detection, chapter/section splitting, note extraction, slugging, chapter assembly. No file I/O.
- `scripts/import-book.mjs` — CLI wrapper: reads the three markdown files, writes JSON.
- `scripts/lib/book-import.test.mjs` — Vitest unit tests for the importer.
- `src/lib/categories.js` — category registry loading and lookup.
- `src/lib/content.test.mjs` — tests for category-aware loading.
- `src/lib/hooks.test.mjs` — tests for three-segment hash parsing.
- `content/categories.json` — category registry.
- `content/ui-design/*.json` — 22 chapters (4 moved + 18 imported).
- `vitest.config.js`

**Modified:**
- `schema/chapter.schema.json` — `en` becomes optional inside `localized`.
- `src/lib/content.js` — glob `content/*/*.json`, attach `categoryId`.
- `src/lib/hooks.js` — three-segment routes + legacy redirect.
- `src/components/Sidebar.jsx` — group chapters under category headings.
- `src/App.jsx` — resolve category + chapter from route.
- `src/config.js` — rebrand.
- `index.html` — `lang="ar" dir="rtl"`, default-lang bootstrap.
- `package.json` — add `vitest`, `test` script.

**Deleted (moved, not lost):**
- `content/00-introduction.json`, `content/01-basics.json`, `content/02-grid-layout.json`, `content/03-typography.json` → `content/ui-design/`.

## Curated Chapter Map

The importer does **not** guess chapter ids or English titles. This map is the single source of truth; it lives in `scripts/lib/book-import.mjs` and is copied verbatim into Task 4.

| # | Arabic title | `id` | `en` title | `order` |
|---|---|---|---|---|
| 4 | الألوان | `color` | Colour | 4 |
| 5 | التدرجات اللونية | `gradients` | Gradients | 5 |
| 6 | الظلال | `shadows` | Shadows | 6 |
| 7 | الأزرار | `buttons` | Buttons | 7 |
| 8 | النماذج | `forms` | Forms | 8 |
| 9 | الأيقونات | `icons` | Icons | 9 |
| 10 | الصور | `photos` | Photos | 10 |
| 11 | الرسوم التوضيحية | `illustrations` | Illustrations | 11 |
| 12 | البطاقات | `cards` | Cards | 12 |
| 13 | المساحة البيضاء | `white-space` | White space | 13 |
| 14 | الشخصية | `personality` | Personality | 14 |
| 15 | اللغة والنصوص في التصميم | `language` | Language | 15 |
| 16 | التنقل | `navigation` | Navigation | 16 |
| 17 | التفاعلات الدقيقة | `microinteractions` | Microinteractions | 17 |
| 18 | إيه اللي بعد كده؟ | `whats-next` | What's next | 18 |
| 19 | عملية التصميم بتاعتي | `design-process` | My design process | 19 |
| 20 | إزاي تجذب عملاء ومتابعين بتصميماتك | `attracting-clients` | Attracting clients | 20 |
| 21 | الخاتمة | `ending` | Ending | 21 |

Chapters 1–3 of the markdown are **deliberately not imported** — the repo's existing `basics` (18 sections), `grid-layout` (10) and `typography` (15) are finer-grained, bilingual, and already carry assets and callouts. Harvesting the unique material out of markdown chapters 1–3 (notably **طول السطر / line length**, and their 9 Arabic-context notes) into the existing chapters is a separate content task, tracked in Task 9's follow-up note.

---

### Task 1: Test infrastructure and Arabic-only schema

Vitest does not exist in this repo yet. Nothing downstream can be tested without it, and the schema change gates every imported chapter, so they land together.

**Files:**
- Modify: `package.json`
- Create: `vitest.config.js`
- Modify: `schema/chapter.schema.json:56-63` (the `localized` definition)
- Create: `schema/__fixtures__/arabic-only.json`
- Create: `schema/schema.test.mjs`

**Interfaces:**
- Consumes: nothing.
- Produces: `npm test` runs Vitest. `localized` accepts `{ ar }` without `en`.

- [ ] **Step 1: Create a branch**

```bash
cd /Users/emirbayraktar/Downloads/ui-design-reference
git checkout -b feat/multi-category-restructure
```

- [ ] **Step 2: Install Vitest**

```bash
npm install -D vitest@^2.1.8 ajv@^8.17.1 ajv-formats@^3.0.1
```

- [ ] **Step 3: Add the test script**

In `package.json`, add to `"scripts"`:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Create `vitest.config.js`**

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.mjs', 'scripts/**/*.test.mjs', 'schema/**/*.test.mjs'],
  },
})
```

- [ ] **Step 5: Write the fixture — an Arabic-only chapter**

Create `schema/__fixtures__/arabic-only.json`:

```json
{
  "id": "color",
  "order": 4,
  "title": { "ar": "الألوان", "en": "Colour" },
  "intro": { "ar": "اللون أقوى أداة بصرية عندك." },
  "sections": [
    {
      "id": "s01",
      "title": { "ar": "قوة اللون" },
      "body": { "ar": "اللون بيغيّر الإحساس بالمنتج قبل ما القارئ يقرا كلمة." },
      "callout": { "type": "note", "ar": "معاني الألوان بتختلف ثقافيًا." }
    }
  ]
}
```

- [ ] **Step 6: Write the failing test**

Create `schema/schema.test.mjs`:

```js
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import Ajv from 'ajv'

const schema = JSON.parse(readFileSync(new URL('./chapter.schema.json', import.meta.url)))
const arabicOnly = JSON.parse(readFileSync(new URL('./__fixtures__/arabic-only.json', import.meta.url)))

function makeValidator() {
  const ajv = new Ajv({ allErrors: true, strict: false })
  return ajv.compile(schema)
}

describe('chapter schema', () => {
  it('accepts a chapter with Arabic text and no English', () => {
    const validate = makeValidator()
    const ok = validate(arabicOnly)
    expect(validate.errors ?? []).toEqual([])
    expect(ok).toBe(true)
  })

  it('still rejects a chapter with no Arabic text', () => {
    const validate = makeValidator()
    const noArabic = structuredClone(arabicOnly)
    delete noArabic.title.ar
    expect(validate(noArabic)).toBe(false)
  })

  it('still rejects an unknown callout type', () => {
    const validate = makeValidator()
    const badCallout = structuredClone(arabicOnly)
    badCallout.sections[0].callout.type = 'banana'
    expect(validate(badCallout)).toBe(false)
  })
})
```

- [ ] **Step 7: Run the test to verify it fails**

Run: `npm test -- schema`
Expected: FAIL — the first case reports `must have required property 'en'`, because `localized` currently requires both languages.

- [ ] **Step 8: Make `en` optional in the schema**

In `schema/chapter.schema.json`, change the `localized` definition so only `ar` is required:

```json
"definitions": {
  "localized": {
    "type": "object",
    "required": ["ar"],
    "additionalProperties": false,
    "properties": {
      "en": { "type": "string" },
      "ar": { "type": "string" }
    }
  }
}
```

Then change the `callout` object's `required` from `["type", "en", "ar"]` to `["type", "ar"]`, leaving its `properties` block unchanged.

- [ ] **Step 9: Run the test to verify it passes**

Run: `npm test -- schema`
Expected: PASS, 3 tests.

- [ ] **Step 10: Confirm existing bilingual content still validates**

Run: `npx --yes ajv-cli@5 validate --spec=draft7 -s schema/chapter.schema.json -d "content/*.json"`
Expected: all 4 existing chapters report valid. Relaxing a `required` list cannot reject anything that passed before; this step confirms no typo was introduced.

- [ ] **Step 11: Commit**

```bash
git add package.json package-lock.json vitest.config.js schema/
git commit -m "feat: add vitest, make English optional in chapter schema

Arabic-only content is first-class per PRD section 4 (Arabic first,
English accompanying). Imported book chapters have no English yet.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 2: Importer — heading-level detection and chapter splitting

The three markdown files disagree on heading levels: files 1 and 3 use `##` for chapters, file 2 uses `#`. Getting this wrong silently produces one giant chapter, so it is isolated and tested first.

**Files:**
- Create: `scripts/lib/book-import.mjs`
- Create: `scripts/lib/book-import.test.mjs`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `detectLevels(md: string) => { chapter: number, section: number }`
  - `splitChapters(md: string, levels: {chapter:number, section:number}) => Array<{ number: number, heading: string, body: string }>`

- [ ] **Step 1: Write the failing test**

Create `scripts/lib/book-import.test.mjs`:

```js
import { describe, it, expect } from 'vitest'
import { detectLevels, splitChapters } from './book-import.mjs'

const FILE_1_STYLE = `# ما ليس على المصمّم جهله — الفصول ١ إلى ٧

## الفصل الرابع: الألوان (Color)

### قوة اللون

اللون بيغيّر الإحساس.

## الفصل الخامس: التدرجات اللونية (Gradients)

### إيه هو التدرج؟

التدرج هو انتقال.
`

const FILE_2_STYLE = `# ما ليس على المصمّم جهله — الفصول ٨ إلى ١٤

# الفصل ٨: النماذج (Forms)

## إيه هي النماذج وليه بنستخدمها؟

النماذج هي وسيلة جمع البيانات.

# الفصل ٩: الأيقونات (Icons)

## ليه الأيقونات مهمة؟

الأيقونات بتوفر مساحة.
`

describe('detectLevels', () => {
  it('puts chapters at H2 when no H1 chapter heading exists', () => {
    expect(detectLevels(FILE_1_STYLE)).toEqual({ chapter: 2, section: 3 })
  })

  it('puts chapters at H1 when the file uses "# الفصل"', () => {
    expect(detectLevels(FILE_2_STYLE)).toEqual({ chapter: 1, section: 2 })
  })
})

describe('splitChapters', () => {
  it('splits an H2-chapter file and ignores the document title', () => {
    const chapters = splitChapters(FILE_1_STYLE, detectLevels(FILE_1_STYLE))
    expect(chapters.map((c) => c.number)).toEqual([4, 5])
    expect(chapters[0].heading).toBe('الألوان (Color)')
    expect(chapters[0].body).toContain('قوة اللون')
    expect(chapters[0].body).not.toContain('التدرجات')
  })

  it('splits an H1-chapter file and ignores the document title', () => {
    const chapters = splitChapters(FILE_2_STYLE, detectLevels(FILE_2_STYLE))
    expect(chapters.map((c) => c.number)).toEqual([8, 9])
    expect(chapters[1].heading).toBe('الأيقونات (Icons)')
  })

  it('reads both Arabic-word and Arabic-Indic chapter numbers', () => {
    const chapters = splitChapters(FILE_1_STYLE, detectLevels(FILE_1_STYLE))
    expect(chapters[0].number).toBe(4)
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- book-import`
Expected: FAIL — `Failed to resolve import "./book-import.mjs"`.

- [ ] **Step 3: Implement detection and splitting**

Create `scripts/lib/book-import.mjs`:

```js
// Converts the Arabic book markdown into chapter JSON. Pure functions only —
// all file I/O lives in scripts/import-book.mjs.

// Chapter headings are written two ways across the source files:
//   "الفصل الرابع: ..."  (Arabic ordinal word)
//   "الفصل ٨: ..."       (Arabic-Indic digit)
const ARABIC_ORDINALS = {
  الأول: 1, الثاني: 2, الثالث: 3, الرابع: 4, الخامس: 5, السادس: 6, السابع: 7,
  الثامن: 8, التاسع: 9, العاشر: 10, 'الحادي عشر': 11, 'الثاني عشر': 12,
  'الثالث عشر': 13, 'الرابع عشر': 14, 'الخامس عشر': 15, 'السادس عشر': 16,
  'السابع عشر': 17, 'الثامن عشر': 18, 'التاسع عشر': 19, العشرون: 20,
  'الحادي والعشرون': 21,
}

const ARABIC_INDIC = '٠١٢٣٤٥٦٧٨٩'

export function parseArabicNumber(text) {
  const trimmed = text.trim()
  if (ARABIC_ORDINALS[trimmed] !== undefined) return ARABIC_ORDINALS[trimmed]
  const digits = [...trimmed]
    .map((ch) => {
      const i = ARABIC_INDIC.indexOf(ch)
      return i === -1 ? ch : String(i)
    })
    .join('')
  const n = Number.parseInt(digits, 10)
  return Number.isNaN(n) ? null : n
}

// File 2 promotes chapters to H1; files 1 and 3 keep them at H2 under a
// document title. Detect rather than assume — guessing wrong yields one
// giant chapter with no error.
export function detectLevels(md) {
  return /^#\s+الفصل\s/m.test(md) ? { chapter: 1, section: 2 } : { chapter: 2, section: 3 }
}

export function splitChapters(md, levels) {
  const hashes = '#'.repeat(levels.chapter)
  const re = new RegExp(`^${hashes}\\s+الفصل\\s+([^:：\\n]+)[:：]\\s*(.+)$`, 'gm')
  const starts = []
  let m
  while ((m = re.exec(md)) !== null) {
    starts.push({ index: m.index, end: m.index + m[0].length, rawNumber: m[1], heading: m[2].trim() })
  }
  return starts.map((start, i) => ({
    number: parseArabicNumber(start.rawNumber),
    heading: start.heading,
    body: md.slice(start.end, i + 1 < starts.length ? starts[i + 1].index : md.length).trim(),
  }))
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- book-import`
Expected: PASS, 5 tests.

- [ ] **Step 5: Verify against the real source files**

```bash
node -e "
import('./scripts/lib/book-import.mjs').then(async (m) => {
  const { readFileSync } = await import('node:fs')
  const dir = '/Users/emirbayraktar/Downloads/'
  for (const f of ['chapters1-7arabic.md','chapters8-14arabic.md','chapters15-21arabic.md']) {
    const md = readFileSync(dir + f, 'utf8')
    const chs = m.splitChapters(md, m.detectLevels(md))
    console.log(f, '->', chs.map(c => c.number).join(','))
  }
})
"
```

Expected exactly:
```
chapters1-7arabic.md -> 1,2,3,4,5,6,7
chapters8-14arabic.md -> 8,9,10,11,12,13,14
chapters15-21arabic.md -> 15,16,17,18,19,20,21
```
If any number is `null` or a chapter is missing, fix `ARABIC_ORDINALS` before continuing — every later task depends on this being exact.

- [ ] **Step 6: Commit**

```bash
git add scripts/lib/
git commit -m "feat: detect heading levels and split book chapters

Source files disagree on heading depth: files 1 and 3 put chapters at
H2, file 2 at H1. Detected per-file rather than assumed.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 3: Importer — section splitting, note extraction, section ids

**Files:**
- Modify: `scripts/lib/book-import.mjs`
- Modify: `scripts/lib/book-import.test.mjs`

**Interfaces:**
- Consumes: `splitChapters` from Task 2.
- Produces:
  - `splitSections(chapterBody: string, levels) => Array<{ heading: string, body: string }>`
  - `extractNotes(body: string) => { body: string, notes: string[] }`
  - `sectionId(heading: string, index: number, taken: Set<string>) => string`

- [ ] **Step 1: Write the failing test**

Append to `scripts/lib/book-import.test.mjs`:

```js
import { splitSections, extractNotes, sectionId } from './book-import.mjs'

const CHAPTER_BODY = `### قوة اللون

اللون بيغيّر الإحساس بالمنتج.

**[ملاحظة للسياق العربي]** معاني الألوان بتختلف ثقافيًا. الأخضر ليه دلالة دينية قوية.

### المصطلحات الأساسية (Terminology)

درجة اللون (Hue) هي اللون نفسه.

### أهم النقاط

- ابدأ بالأبيض والأسود.
`

describe('splitSections', () => {
  it('splits on the section heading level', () => {
    const sections = splitSections(CHAPTER_BODY, { chapter: 2, section: 3 })
    expect(sections.map((s) => s.heading)).toEqual([
      'قوة اللون',
      'المصطلحات الأساسية (Terminology)',
      'أهم النقاط',
    ])
  })

  it('keeps section body text with its own heading', () => {
    const sections = splitSections(CHAPTER_BODY, { chapter: 2, section: 3 })
    expect(sections[1].body).toContain('درجة اللون')
    expect(sections[1].body).not.toContain('اللون بيغيّر')
  })
})

describe('extractNotes', () => {
  it('pulls the Arabic-context note out of the body', () => {
    const { body, notes } = extractNotes(
      'اللون بيغيّر الإحساس.\n\n**[ملاحظة للسياق العربي]** معاني الألوان بتختلف ثقافيًا.\n\nتمام.',
    )
    expect(notes).toEqual(['معاني الألوان بتختلف ثقافيًا.'])
    expect(body).not.toContain('ملاحظة للسياق العربي')
    expect(body).toContain('اللون بيغيّر الإحساس.')
    expect(body).toContain('تمام.')
  })

  it('joins multiple notes into one, since a section carries one callout', () => {
    const { notes } = extractNotes(
      '**[ملاحظة للسياق العربي]** أول ملاحظة.\n\nنص.\n\n**[ملاحظة للسياق العربي]** تانية.',
    )
    expect(notes).toEqual(['أول ملاحظة.', 'تانية.'])
  })

  it('returns no notes and an untouched body when there are none', () => {
    const { body, notes } = extractNotes('نص عادي.')
    expect(notes).toEqual([])
    expect(body).toBe('نص عادي.')
  })
})

describe('sectionId', () => {
  it('derives the id from a Latin parenthetical', () => {
    expect(sectionId('المصطلحات الأساسية (Terminology)', 0, new Set())).toBe('terminology')
  })

  it('uses the last Latin parenthetical when there are several', () => {
    expect(sectionId('التسلسل البصري (Visual Hierarchy) والجشطالت (Gestalt)', 0, new Set())).toBe('gestalt')
  })

  it('falls back to a positional id when there is no Latin term', () => {
    expect(sectionId('قوة اللون', 0, new Set())).toBe('s01')
  })

  it('gives the key-points section a stable id', () => {
    expect(sectionId('أهم النقاط', 6, new Set())).toBe('key-points')
    expect(sectionId('النقاط المفتاحية', 6, new Set())).toBe('key-points')
  })

  it('de-duplicates ids within a chapter', () => {
    const taken = new Set(['terminology'])
    expect(sectionId('حاجة تانية (Terminology)', 1, taken)).toBe('terminology-2')
  })

  it('always produces a schema-legal id', () => {
    const id = sectionId('قوة اللون', 2, new Set())
    expect(id).toMatch(/^[a-z0-9-]+$/)
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- book-import`
Expected: FAIL — `splitSections is not a function` (and the other two new imports).

- [ ] **Step 3: Implement section splitting, note extraction and ids**

Append to `scripts/lib/book-import.mjs`:

```js
export function splitSections(chapterBody, levels) {
  const hashes = '#'.repeat(levels.section)
  const re = new RegExp(`^${hashes}\\s+(.+)$`, 'gm')
  const starts = []
  let m
  while ((m = re.exec(chapterBody)) !== null) {
    starts.push({ index: m.index, end: m.index + m[0].length, heading: m[1].trim() })
  }
  return starts.map((start, i) => ({
    heading: start.heading,
    body: chapterBody
      .slice(start.end, i + 1 < starts.length ? starts[i + 1].index : chapterBody.length)
      .trim(),
  }))
}

// "**[ملاحظة للسياق العربي]** ..." marks our own addition rather than the
// source book's text. It becomes a `note` callout, labelled
// «إضافة خاصة بالكورس» in the UI. See 03-content-categories.md.
const NOTE_LINE = /^\*\*\[ملاحظة للسياق العربي\]\*\*\s*(.+)$/gm

export function extractNotes(body) {
  const notes = []
  const stripped = body.replace(NOTE_LINE, (_match, text) => {
    notes.push(text.trim())
    return ' '
  })
  const cleaned = stripped
    .split('\n')
    .filter((line) => line.trim() !== ' ')
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
  return { body: cleaned, notes }
}

const KEY_POINTS_HEADINGS = ['أهم النقاط', 'النقاط المفتاحية']

function slugify(latin) {
  return latin
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Section ids appear in shareable URLs, so prefer a meaningful Latin slug
// from the heading's parenthetical term. Arabic headings without one fall
// back to a position, which the schema's ^[a-z0-9-]+$ pattern requires.
export function sectionId(heading, index, taken) {
  let base
  if (KEY_POINTS_HEADINGS.some((h) => heading.includes(h))) {
    base = 'key-points'
  } else {
    const latin = [...heading.matchAll(/\(([A-Za-z][^)]*)\)/g)].pop()
    base = latin ? slugify(latin[1]) : ''
  }
  if (!base) base = `s${String(index + 1).padStart(2, '0')}`
  let id = base
  let n = 2
  while (taken.has(id)) id = `${base}-${n++}`
  taken.add(id)
  return id
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- book-import`
Expected: PASS, 17 tests.

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/
git commit -m "feat: split sections, extract Arabic-context notes, derive ids

Arabic-context notes become 'note' callouts per the editor-note rule in
03-content-categories.md.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 4: Importer — chapter assembly and CLI

**Files:**
- Modify: `scripts/lib/book-import.mjs`
- Modify: `scripts/lib/book-import.test.mjs`
- Create: `scripts/import-book.mjs`
- Modify: `package.json` (add `import:book` script)

**Interfaces:**
- Consumes: `splitChapters`, `splitSections`, `extractNotes`, `sectionId`.
- Produces: `buildChapter(raw, levels) => object | null` (null for chapters 1–3, which are not imported), and `CHAPTER_MAP`.

- [ ] **Step 1: Write the failing test**

Append to `scripts/lib/book-import.test.mjs`:

```js
import { buildChapter, CHAPTER_MAP } from './book-import.mjs'

const RAW_COLOR = {
  number: 4,
  heading: 'الألوان (Color)',
  body: `### مقدمة

اللون أقوى أداة بصرية.

### قوة اللون

اللون بيغيّر الإحساس بالمنتج.

**[ملاحظة للسياق العربي]** الأخضر ليه دلالة دينية قوية.

### أهم النقاط

- ابدأ بالأبيض والأسود.
`,
}

describe('buildChapter', () => {
  it('uses the curated id, English title and order', () => {
    const ch = buildChapter(RAW_COLOR, { chapter: 2, section: 3 })
    expect(ch.id).toBe('color')
    expect(ch.order).toBe(4)
    expect(ch.title).toEqual({ ar: 'الألوان (Color)', en: 'Colour' })
  })

  it('promotes a leading "مقدمة" section into the chapter intro', () => {
    const ch = buildChapter(RAW_COLOR, { chapter: 2, section: 3 })
    expect(ch.intro.ar).toBe('اللون أقوى أداة بصرية.')
    expect(ch.sections.map((s) => s.title.ar)).toEqual(['قوة اللون', 'أهم النقاط'])
  })

  it('turns an Arabic-context note into a note callout', () => {
    const ch = buildChapter(RAW_COLOR, { chapter: 2, section: 3 })
    expect(ch.sections[0].callout).toEqual({
      type: 'note',
      ar: 'الأخضر ليه دلالة دينية قوية.',
    })
    expect(ch.sections[0].body.ar).not.toContain('ملاحظة للسياق')
  })

  it('omits English rather than inventing it', () => {
    const ch = buildChapter(RAW_COLOR, { chapter: 2, section: 3 })
    expect(ch.sections[0].title.en).toBeUndefined()
    expect(ch.intro.en).toBeUndefined()
  })

  it('skips chapters 1-3, which the repo already covers in more depth', () => {
    expect(buildChapter({ number: 1, heading: 'الأساسيات', body: '### أ\n\nنص.' }, { chapter: 2, section: 3 })).toBeNull()
  })

  it('maps all 18 imported chapters', () => {
    expect(Object.keys(CHAPTER_MAP).map(Number).sort((a, b) => a - b)).toEqual(
      Array.from({ length: 18 }, (_, i) => i + 4),
    )
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- book-import`
Expected: FAIL — `buildChapter is not a function`.

- [ ] **Step 3: Implement chapter assembly**

Append to `scripts/lib/book-import.mjs`:

```js
// Curated: ids appear in shareable URLs and English titles drive the
// English sidebar, so neither is guessed from the source text.
// Chapters 1-3 are intentionally absent — the repo's existing basics,
// grid-layout and typography chapters are finer-grained and bilingual.
export const CHAPTER_MAP = {
  4: { id: 'color', en: 'Colour' },
  5: { id: 'gradients', en: 'Gradients' },
  6: { id: 'shadows', en: 'Shadows' },
  7: { id: 'buttons', en: 'Buttons' },
  8: { id: 'forms', en: 'Forms' },
  9: { id: 'icons', en: 'Icons' },
  10: { id: 'photos', en: 'Photos' },
  11: { id: 'illustrations', en: 'Illustrations' },
  12: { id: 'cards', en: 'Cards' },
  13: { id: 'white-space', en: 'White space' },
  14: { id: 'personality', en: 'Personality' },
  15: { id: 'language', en: 'Language' },
  16: { id: 'navigation', en: 'Navigation' },
  17: { id: 'microinteractions', en: 'Microinteractions' },
  18: { id: 'whats-next', en: "What's next" },
  19: { id: 'design-process', en: 'My design process' },
  20: { id: 'attracting-clients', en: 'Attracting clients' },
  21: { id: 'ending', en: 'Ending' },
}

const INTRO_HEADINGS = ['مقدمة']

export function buildChapter(raw, levels) {
  const meta = CHAPTER_MAP[raw.number]
  if (!meta) return null

  const parsed = splitSections(raw.body, levels)
  let intro = ''
  let sections = parsed

  if (parsed.length && INTRO_HEADINGS.includes(parsed[0].heading.trim())) {
    intro = extractNotes(parsed[0].body).body
    sections = parsed.slice(1)
  }

  const taken = new Set()
  return {
    $schema: '../../schema/chapter.schema.json',
    id: meta.id,
    order: raw.number,
    title: { ar: raw.heading, en: meta.en },
    intro: { ar: intro },
    sections: sections.map((section, i) => {
      const { body, notes } = extractNotes(section.body)
      const out = {
        id: sectionId(section.heading, i, taken),
        title: { ar: section.heading },
        body: { ar: body },
      }
      if (notes.length) out.callout = { type: 'note', ar: notes.join('\n\n') }
      return out
    }),
  }
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- book-import`
Expected: PASS, 23 tests.

- [ ] **Step 5: Write the CLI**

Create `scripts/import-book.mjs`:

```js
#!/usr/bin/env node
// Converts the Arabic book markdown into content/ui-design/*.json.
// Usage: node scripts/import-book.mjs <dir-holding-the-three-md-files>
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { detectLevels, splitChapters, buildChapter } from './lib/book-import.mjs'

const SOURCES = ['chapters1-7arabic.md', 'chapters8-14arabic.md', 'chapters15-21arabic.md']
const OUT_DIR = resolve(process.cwd(), 'content/ui-design')

const srcDir = process.argv[2]
if (!srcDir) {
  console.error('usage: node scripts/import-book.mjs <dir-with-markdown>')
  process.exit(1)
}

mkdirSync(OUT_DIR, { recursive: true })

let written = 0
let skipped = 0
for (const file of SOURCES) {
  const md = readFileSync(join(srcDir, file), 'utf8')
  const levels = detectLevels(md)
  for (const raw of splitChapters(md, levels)) {
    const chapter = buildChapter(raw, levels)
    if (!chapter) {
      skipped += 1
      continue
    }
    const name = `${String(chapter.order).padStart(2, '0')}-${chapter.id}.json`
    writeFileSync(join(OUT_DIR, name), JSON.stringify(chapter, null, 2) + '\n', 'utf8')
    console.log(`wrote ${name}  (${chapter.sections.length} sections)`)
    written += 1
  }
}
console.log(`\n${written} chapters written, ${skipped} skipped (already covered in more depth).`)
```

Add to `package.json` scripts:

```json
"import:book": "node scripts/import-book.mjs"
```

- [ ] **Step 6: Run the importer**

```bash
npm run import:book -- "/Users/emirbayraktar/Downloads"
```

Expected: 18 chapters written, 3 skipped. Verify the count and that every chapter reports a non-zero section count.

- [ ] **Step 7: Validate the generated JSON against the schema**

```bash
npx --yes ajv-cli@5 validate --spec=draft7 -s schema/chapter.schema.json -d "content/ui-design/*.json"
```

Expected: all 18 valid. If any fail, fix the importer — never hand-edit generated JSON, or the next run silently reverts the fix.

- [ ] **Step 8: Spot-check one chapter by eye**

```bash
node -e "const c=require('./content/ui-design/13-white-space.json'); console.log(c.title, c.sections.length); console.log(c.sections.find(s=>s.callout))"
```

Confirm the Arabic reads correctly, the note callout carries real text, and no `**[ملاحظة` marker survived into a body.

- [ ] **Step 9: Commit**

```bash
git add scripts/ package.json content/ui-design/
git commit -m "feat: import 18 Arabic chapters from book markdown

Chapters 4-21 of the source book. Chapters 1-3 skipped: the existing
basics, grid-layout and typography chapters cover the same ground with
finer sections and both languages.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 5: Move existing chapters into the category folder

**Files:**
- Move: `content/00-introduction.json` → `content/ui-design/00-introduction.json`
- Move: `content/01-basics.json` → `content/ui-design/01-basics.json`
- Move: `content/02-grid-layout.json` → `content/ui-design/02-grid-layout.json`
- Move: `content/03-typography.json` → `content/ui-design/03-typography.json`
- Create: `content/categories.json`
- Create: `schema/categories.schema.json`
- Modify: `scripts/sync-diagrams.mjs`, `scripts/export-diagrams.mjs` (content glob paths)

**Interfaces:**
- Consumes: nothing.
- Produces: `content/categories.json` shaped as `{ categories: [{ id, order, title: {ar, en}, summary: {ar, en}, status }] }`.

- [ ] **Step 1: Move the four chapters with git**

```bash
cd /Users/emirbayraktar/Downloads/ui-design-reference
git mv content/00-introduction.json content/ui-design/00-introduction.json
git mv content/01-basics.json content/ui-design/01-basics.json
git mv content/02-grid-layout.json content/ui-design/02-grid-layout.json
git mv content/03-typography.json content/ui-design/03-typography.json
```

- [ ] **Step 2: Fix the `$schema` pointer inside each moved file**

Each moved chapter is now one directory deeper, so a relative `$schema` of `../schema/...` no longer resolves.

```bash
node -e "
const {readFileSync,writeFileSync,readdirSync}=require('fs');
for (const f of readdirSync('content/ui-design')) {
  const p='content/ui-design/'+f;
  const j=JSON.parse(readFileSync(p,'utf8'));
  if (j.\$schema) { j.\$schema='../../schema/chapter.schema.json'; writeFileSync(p, JSON.stringify(j,null,2)+'\n'); }
}
console.log('rewrote \$schema in', readdirSync('content/ui-design').length, 'files');
"
```

- [ ] **Step 3: Write the category registry**

Create `content/categories.json`. Wave-one categories from `03-content-categories.md` are listed as `planned` so the UI can show what is coming without needing content:

```json
{
  "$schema": "../schema/categories.schema.json",
  "categories": [
    {
      "id": "ui-design",
      "order": 1,
      "status": "published",
      "title": { "ar": "تصميم الواجهات", "en": "UI Design" },
      "summary": {
        "ar": "المرجع الكامل لتصميم واجهات المستخدم: الأساسيات، الشبكة، الخطوط، الألوان، والمكوّنات.",
        "en": "The complete UI design reference: fundamentals, grid, type, colour and components."
      }
    },
    {
      "id": "arabic-typography",
      "order": 2,
      "status": "planned",
      "title": { "ar": "التايبوجرافي العربي", "en": "Arabic Typography" },
      "summary": {
        "ar": "تشريح الحرف العربي، اختيار الخط، التشكيل، والإقران بخط لاتيني.",
        "en": "Arabic letterforms, typeface selection, diacritics and Latin pairing."
      }
    },
    {
      "id": "ux-basics",
      "order": 3,
      "status": "planned",
      "title": { "ar": "أساسيات الـ UX", "en": "UX Basics" },
      "summary": {
        "ar": "البحث، الـ personas، رحلة المستخدم، معمارية المعلومات، واختبار الاستخدام.",
        "en": "Research, personas, journeys, information architecture and usability testing."
      }
    },
    {
      "id": "designing-for-arabic",
      "order": 4,
      "status": "planned",
      "title": { "ar": "التصميم للعربية", "en": "Designing for Arabic" },
      "summary": {
        "ar": "قلب التخطيط، الأيقونات، الأرقام، وخلط العربي باللاتيني.",
        "en": "Layout mirroring, icons, numerals and mixing Arabic with Latin."
      }
    }
  ]
}
```

- [ ] **Step 4: Write the category schema**

Create `schema/categories.schema.json`:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Categories",
  "type": "object",
  "required": ["categories"],
  "additionalProperties": false,
  "properties": {
    "$schema": { "type": "string" },
    "categories": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "required": ["id", "order", "status", "title", "summary"],
        "additionalProperties": false,
        "properties": {
          "id": { "type": "string", "pattern": "^[a-z0-9-]+$" },
          "order": { "type": "number" },
          "status": { "enum": ["published", "planned"] },
          "title": { "$ref": "#/definitions/localized" },
          "summary": { "$ref": "#/definitions/localized" }
        }
      }
    }
  },
  "definitions": {
    "localized": {
      "type": "object",
      "required": ["ar"],
      "additionalProperties": false,
      "properties": {
        "en": { "type": "string" },
        "ar": { "type": "string" }
      }
    }
  }
}
```

- [ ] **Step 5: Update the diagram scripts' content paths**

```bash
grep -rn "content/" scripts/sync-diagrams.mjs scripts/export-diagrams.mjs scripts/diagrams.mjs
```

Change every glob or path that reads `content/*.json` to `content/*/*.json`, and every place that derives an asset directory from a chapter id so it still resolves. Run `npm run diagrams:sync` afterwards and confirm it reports the same chapters it did before the move.

- [ ] **Step 6: Validate everything**

```bash
npx --yes ajv-cli@5 validate --spec=draft7 -s schema/chapter.schema.json -d "content/*/*.json"
npx --yes ajv-cli@5 validate --spec=draft7 -s schema/categories.schema.json -d "content/categories.json"
```

Expected: 22 chapters valid, categories valid.

- [ ] **Step 7: Commit**

```bash
git add -A content/ schema/ scripts/
git commit -m "refactor: move content into per-category folders

Adopts the /content/<category>/<chapter>.json layout from PRD section 2.
Adds a category registry with wave-one categories marked planned.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 6: Category-aware content loader

**Files:**
- Modify: `src/lib/content.js`
- Create: `src/lib/categories.js`
- Create: `src/lib/content.test.mjs`

**Interfaces:**
- Consumes: `content/categories.json`, `content/*/*.json`.
- Produces:
  - `categories: Array<Category>` — published first, sorted by `order`.
  - `chapters: Array<Chapter & { categoryId: string }>` — sorted by category order then chapter order.
  - `chaptersByCategory: Map<string, Chapter[]>`
  - `findChapter(categoryId, chapterId) => Chapter | undefined`
  - `categoryOfChapter(chapterId) => string | undefined` (for the legacy-URL redirect in Task 7)

- [ ] **Step 1: Write the failing test**

Create `src/lib/content.test.mjs`. It tests the pure helpers against injected data, so it needs no Vite glob:

```js
import { describe, it, expect } from 'vitest'
import { indexChapters } from './content.js'

const CATEGORIES = [
  { id: 'ui-design', order: 1, status: 'published', title: { ar: 'تصميم الواجهات' }, summary: { ar: 'x' } },
  { id: 'ux-basics', order: 3, status: 'planned', title: { ar: 'أساسيات' }, summary: { ar: 'y' } },
]

const CHAPTERS = [
  { categoryId: 'ui-design', id: 'color', order: 4, title: { ar: 'الألوان' }, sections: [] },
  { categoryId: 'ui-design', id: 'basics', order: 1, title: { ar: 'الأساسيات' }, sections: [] },
]

describe('indexChapters', () => {
  const idx = indexChapters(CATEGORIES, CHAPTERS)

  it('sorts chapters by order within a category', () => {
    expect(idx.chaptersByCategory.get('ui-design').map((c) => c.id)).toEqual(['basics', 'color'])
  })

  it('finds a chapter by category and id', () => {
    expect(idx.findChapter('ui-design', 'color').title.ar).toBe('الألوان')
  })

  it('returns undefined for a chapter in the wrong category', () => {
    expect(idx.findChapter('ux-basics', 'color')).toBeUndefined()
  })

  it('resolves a bare chapter id to its category, for legacy links', () => {
    expect(idx.categoryOfChapter('basics')).toBe('ui-design')
    expect(idx.categoryOfChapter('nope')).toBeUndefined()
  })

  it('lists published categories before planned ones', () => {
    expect(idx.categories.map((c) => c.id)).toEqual(['ui-design', 'ux-basics'])
  })

  it('reports a planned category as having no chapters', () => {
    expect(idx.chaptersByCategory.get('ux-basics')).toEqual([])
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- content`
Expected: FAIL — `indexChapters is not a function`.

- [ ] **Step 3: Rewrite the loader**

Replace `src/lib/content.js`:

```js
// Loads every category and chapter at build time. Nothing here knows what
// the chapters contain. Layout: content/categories.json is the registry,
// content/<category>/<chapter>.json are the chapters. The chapter glob is
// two levels deep, so it never picks up categories.json.
const chapterModules = import.meta.glob('../../content/*/*.json', { eager: true })
import categoriesFile from '../../content/categories.json'

export const CALLOUT_TYPES = ['tip', 'warning', 'quote', 'note']

function validate(chapter, path) {
  const problems = []
  if (!chapter.id) problems.push('missing "id"')
  if (typeof chapter.order !== 'number') problems.push('"order" must be a number')
  // Arabic is required; English is optional (PRD section 4).
  if (!chapter.title?.ar) problems.push('"title" needs ar')
  if (!Array.isArray(chapter.sections) || chapter.sections.length === 0) {
    problems.push('"sections" must be a non-empty array')
  } else {
    chapter.sections.forEach((s, i) => {
      if (!s.id) problems.push(`section ${i}: missing "id"`)
      if (!s.title?.ar) problems.push(`section ${i}: "title" needs ar`)
      if (!s.body?.ar) problems.push(`section ${i}: "body" needs ar`)
      if (s.asset) {
        if (!s.asset.file) problems.push(`section ${i}: asset needs "file"`)
        if (!s.asset.alt?.ar) problems.push(`section ${i}: asset "alt" needs ar`)
        if (!/^\d+:\d+$/.test(String(s.asset.ratio))) problems.push(`section ${i}: asset "ratio" must look like 16:9`)
        if (!s.asset.brief) problems.push(`section ${i}: asset needs "brief"`)
      }
      if (s.callout && !CALLOUT_TYPES.includes(s.callout.type)) {
        problems.push(`section ${i}: unknown callout type "${s.callout.type}"`)
      }
    })
  }
  if (problems.length && import.meta.env.DEV) {
    console.warn(`[content] ${path}: ${problems.join('; ')}`)
  }
  return problems.length === 0
}

// Exported for tests: pure, takes data rather than reading globs.
export function indexChapters(categoryList, chapterList) {
  const categories = [...categoryList].sort((a, b) => {
    if (a.status !== b.status) return a.status === 'published' ? -1 : 1
    return a.order - b.order
  })
  const chaptersByCategory = new Map(categories.map((c) => [c.id, []]))
  for (const chapter of chapterList) {
    if (!chaptersByCategory.has(chapter.categoryId)) continue
    chaptersByCategory.get(chapter.categoryId).push(chapter)
  }
  for (const list of chaptersByCategory.values()) list.sort((a, b) => a.order - b.order)

  const chapters = categories.flatMap((c) => chaptersByCategory.get(c.id))
  const byKey = new Map(chapters.map((c) => [`${c.categoryId}/${c.id}`, c]))
  const categoryOf = new Map()
  for (const c of chapters) if (!categoryOf.has(c.id)) categoryOf.set(c.id, c.categoryId)

  return {
    categories,
    chapters,
    chaptersByCategory,
    findChapter: (categoryId, chapterId) => byKey.get(`${categoryId}/${chapterId}`),
    categoryOfChapter: (chapterId) => categoryOf.get(chapterId),
  }
}

const loaded = Object.entries(chapterModules)
  .map(([path, mod]) => {
    const chapter = mod.default ?? mod
    // ../../content/<category>/<file>.json
    const categoryId = path.split('/').at(-2)
    return { path, chapter: { ...chapter, categoryId } }
  })
  .filter(({ path, chapter }) => validate(chapter, path))
  .map(({ chapter }) => chapter)

const index = indexChapters(categoriesFile.categories, loaded)

export const categories = index.categories
export const chapters = index.chapters
export const chaptersByCategory = index.chaptersByCategory
export const findChapter = index.findChapter
export const categoryOfChapter = index.categoryOfChapter
export const chapterById = new Map(chapters.map((c) => [c.id, c]))

export function chapterIndex(categoryId, id) {
  return chapters.findIndex((c) => c.categoryId === categoryId && c.id === id)
}

export function assetUrl(chapterId, file) {
  return `${import.meta.env.BASE_URL}assets/${chapterId}/${file}`
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- content`
Expected: PASS, 6 tests.

- [ ] **Step 5: Check the dev server still boots**

```bash
npm run dev -- --port 4100 --strictPort --host 127.0.0.1
```

Open `http://127.0.0.1:4100/` and confirm the console shows no `[content]` warnings. The sidebar will still be flat — Task 8 handles grouping. Stop the server before continuing.

- [ ] **Step 6: Commit**

```bash
git add src/lib/content.js src/lib/content.test.mjs
git commit -m "feat: load chapters per category

Arabic required, English optional, matching the relaxed schema.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 7: Category-aware routing with legacy redirect

Existing shared links look like `#/basics/border-radius`. PRD §3 calls section links the cheapest growth channel, so they must not break.

**Files:**
- Modify: `src/lib/hooks.js:31-58`
- Create: `src/lib/hooks.test.mjs`

**Interfaces:**
- Consumes: `categoryOfChapter` from Task 6.
- Produces:
  - `parseHash(hash) => { category, chapter, section }`
  - `hrefFor(categoryId, chapterId, sectionId?) => string`
  - `resolveLegacyRoute(route, categoryOfChapter) => route | null`

- [ ] **Step 1: Write the failing test**

Create `src/lib/hooks.test.mjs`:

```js
import { describe, it, expect } from 'vitest'
import { parseHash, hrefFor, resolveLegacyRoute } from './hooks.js'

describe('parseHash', () => {
  it('parses category, chapter and section', () => {
    expect(parseHash('#/ui-design/color/terminology')).toEqual({
      category: 'ui-design', chapter: 'color', section: 'terminology',
    })
  })

  it('parses a category-only route', () => {
    expect(parseHash('#/ui-design')).toEqual({ category: 'ui-design', chapter: '', section: '' })
  })

  it('parses the empty route', () => {
    expect(parseHash('#/')).toEqual({ category: '', chapter: '', section: '' })
  })

  it('keeps the print route reachable', () => {
    expect(parseHash('#/print')).toEqual({ category: 'print', chapter: '', section: '' })
  })

  it('decodes Arabic segments', () => {
    expect(parseHash('#/ui-design/' + encodeURIComponent('الألوان')).chapter).toBe('الألوان')
  })
})

describe('hrefFor', () => {
  it('builds a three-segment link', () => {
    expect(hrefFor('ui-design', 'color', 'terminology')).toBe('#/ui-design/color/terminology')
  })

  it('omits the section when absent', () => {
    expect(hrefFor('ui-design', 'color')).toBe('#/ui-design/color')
  })
})

describe('resolveLegacyRoute', () => {
  const categoryOf = (id) => (id === 'basics' ? 'ui-design' : undefined)

  it('upgrades a two-segment legacy link to include its category', () => {
    expect(resolveLegacyRoute({ category: 'basics', chapter: 'border-radius', section: '' }, categoryOf))
      .toEqual({ category: 'ui-design', chapter: 'basics', section: 'border-radius' })
  })

  it('upgrades a bare legacy chapter link', () => {
    expect(resolveLegacyRoute({ category: 'basics', chapter: '', section: '' }, categoryOf))
      .toEqual({ category: 'ui-design', chapter: 'basics', section: '' })
  })

  it('leaves a valid category route alone', () => {
    expect(resolveLegacyRoute({ category: 'ui-design', chapter: 'color', section: '' }, categoryOf)).toBeNull()
  })

  it('leaves the print route alone', () => {
    expect(resolveLegacyRoute({ category: 'print', chapter: '', section: '' }, categoryOf)).toBeNull()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- hooks`
Expected: FAIL — `parseHash` returns `{ chapter, section }` with no `category`.

- [ ] **Step 3: Update the routing helpers**

In `src/lib/hooks.js`, replace `parseHash`, `hrefFor` and `navigate`, and add `resolveLegacyRoute`:

```js
// Hash routes: "#/", "#/<category>", "#/<category>/<chapter>",
// "#/<category>/<chapter>/<section>", "#/print".
export function parseHash(hash = window.location.hash) {
  const clean = hash.replace(/^#\/?/, '')
  const [category = '', chapter = '', section = ''] = clean.split('/').map(decodeURIComponent)
  return { category, chapter, section }
}

export function hrefFor(categoryId, chapterId, sectionId) {
  const parts = [categoryId, chapterId, sectionId].filter(Boolean)
  return `#/${parts.join('/')}`
}

export function navigate(categoryId, chapterId, sectionId) {
  const next = hrefFor(categoryId, chapterId, sectionId)
  if (window.location.hash === next) {
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  } else {
    window.location.hash = next
  }
}

// Links shared before the category segment existed look like
// "#/basics/border-radius". If the first segment names a known chapter
// rather than a category, shift everything right. Returns null when the
// route needs no rewrite.
export function resolveLegacyRoute(route, categoryOfChapter) {
  if (!route.category || route.category === 'print') return null
  const owner = categoryOfChapter(route.category)
  if (!owner) return null
  return { category: owner, chapter: route.category, section: route.chapter }
}
```

Also update `useHashRoute` so its state carries the new shape — it spreads `parseHash()`, so it needs no change beyond keeping the `n` counter.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- hooks`
Expected: PASS, 11 tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/hooks.js src/lib/hooks.test.mjs
git commit -m "feat: add category segment to routes, redirect legacy links

Two-segment links shared before this change keep working.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 8: Wire categories through App and Sidebar

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/Sidebar.jsx`
- Modify: `src/components/PrevNext.jsx`
- Modify: `src/components/Search.jsx`
- Modify: `src/lib/ui.js` (new UI strings)

**Interfaces:**
- Consumes: `categories`, `chaptersByCategory`, `findChapter`, `categoryOfChapter` (Task 6); `parseHash`, `hrefFor`, `resolveLegacyRoute` (Task 7).
- Produces: a sidebar grouped by category; every internal link three-segment.

- [ ] **Step 1: Add the UI strings**

In `src/lib/ui.js`, add to the string table (matching the existing shape — check the file and follow it exactly):

```js
comingSoon: { en: 'Coming soon', ar: 'قريبًا' },
categories: { en: 'Categories', ar: 'الأقسام' },
```

- [ ] **Step 2: Resolve the route in App.jsx**

In `src/App.jsx`, replace the chapter resolution:

```js
import { categories, chaptersByCategory, findChapter, categoryOfChapter, chapters } from './lib/content.js'
import { useHashRoute, useLocalStorage, resolveLegacyRoute, hrefFor } from './lib/hooks.js'
```

and inside the component, replace `const chapter = chapterById.get(route.chapter) ?? chapters[0]` with:

```js
const isPrint = route.category === 'print'

// Rewrite pre-category links before rendering anything.
useEffect(() => {
  if (isPrint) return
  const upgraded = resolveLegacyRoute(route, categoryOfChapter)
  if (upgraded) {
    window.location.replace(hrefFor(upgraded.category, upgraded.chapter, upgraded.section))
  }
}, [route.category, route.chapter, route.section, isPrint])

const fallback = chapters[0]
const chapter = findChapter(route.category, route.chapter) ?? fallback
const activeCategoryId = chapter?.categoryId
```

Pass `activeCategoryId` into `<Sidebar>` and into `<Chapter>` wherever it builds section links.

- [ ] **Step 3: Group the sidebar by category**

In `src/components/Sidebar.jsx`, replace the flat `chapters.map(...)` list with a category-grouped list. Import `categories, chaptersByCategory` instead of `chapters`, accept an `activeCategoryId` prop, and render:

```jsx
<ol className="mt-1.5">
  {categories.map((category) => {
    const list = chaptersByCategory.get(category.id) ?? []
    const planned = category.status === 'planned'
    return (
      <li key={category.id} className="mt-3 first:mt-1.5">
        <p className="flex items-baseline gap-1.5 px-1.5 text-xs font-semibold uppercase tracking-wide text-ink-3">
          <span>{category.title[lang] ?? category.title.ar}</span>
          {planned && <span className="font-normal normal-case">{t(lang, 'comingSoon')}</span>}
        </p>
        <ol className="mt-1">
          {list.map((chapter, i) => {
            const active = chapter.id === activeChapterId && chapter.categoryId === activeCategoryId
            return (
              <li key={chapter.id} className="mt-0.5">
                <a
                  href={hrefFor(category.id, chapter.id)}
                  aria-current={active ? 'page' : undefined}
                  className={`flex items-baseline gap-1.5 rounded px-1.5 py-1 text-sm transition-colors ${
                    active
                      ? 'bg-accent-soft font-medium text-accent-ink'
                      : 'text-ink-2 hover:bg-raised hover:text-ink'
                  }`}
                >
                  <span className="w-2 shrink-0 font-mono text-xs text-ink-3">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{chapter.title[lang] ?? chapter.title.ar}</span>
                </a>
                {active && (
                  <ol className="ms-2 mt-0.5 border-s border-line">
                    {chapter.sections.map((section) => {
                      const current = section.id === activeSectionId
                      return (
                        <li key={section.id}>
                          <a
                            href={hrefFor(category.id, chapter.id, section.id)}
                            aria-current={current ? 'location' : undefined}
                            className={`-ms-px block border-s-2 py-0.5 pe-1 ps-2 text-sm transition-colors ${
                              current
                                ? 'border-accent text-ink'
                                : 'border-transparent text-ink-2 hover:border-line-strong hover:text-ink'
                            }`}
                          >
                            {section.title[lang] ?? section.title.ar}
                          </a>
                        </li>
                      )
                    })}
                  </ol>
                )}
              </li>
            )
          })}
        </ol>
      </li>
    )
  })}
</ol>
```

Note the `?? chapter.title.ar` fallback on every localized read — imported chapters have no English section titles, and a bare `title[lang]` would render `undefined` in English mode.

- [ ] **Step 4: Fix the remaining link builders**

```bash
grep -rn "hrefFor(\|navigate(" src/
```

Every call must now pass a category. Update `src/components/PrevNext.jsx` and `src/components/Search.jsx` — the search index must carry `categoryId` on each document so its result links resolve. In `src/lib/search.js`, add `categoryId: chapter.categoryId` to both `docs.push({...})` calls, and use it in the result link.

- [ ] **Step 5: Verify in the browser**

```bash
npm run dev -- --port 4100 --strictPort --host 127.0.0.1
```

Check each of these by hand:
1. `http://127.0.0.1:4100/#/ui-design/color` renders the Colour chapter.
2. The sidebar shows "تصميم الواجهات" with 22 chapters, then three "قريبًا" categories with none.
3. `http://127.0.0.1:4100/#/basics/border-radius` redirects to `#/ui-design/basics/border-radius`.
4. `http://127.0.0.1:4100/#/print` still renders the print view.
5. ⌘K search finds «الألوان» and its result link navigates correctly.
6. No console errors, and no `undefined` rendered in the sidebar in either language.

- [ ] **Step 6: Commit**

```bash
git add src/
git commit -m "feat: group sidebar by category, thread category through links

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 9: Rebrand and Arabic-first default

**Files:**
- Modify: `src/config.js`
- Modify: `index.html:2,7,20-24`
- Modify: `src/App.jsx` (default lang)
- Modify: `README.md`

**Interfaces:**
- Consumes: nothing.
- Produces: the site identifies as «ما ليس على المصمّم جهله» and loads in Arabic RTL by default.

- [ ] **Step 1: Rebrand the site config**

Replace the `site` block in `src/config.js`:

```js
export const site = {
  title: { ar: 'ما ليس على المصمّم جهله', en: "What a Designer Must Know" },
  subtitle: { ar: 'مرجع عربي مفتوح المصدر للتصميم', en: 'An open-source Arabic design reference' },
}
```

Keep `STORAGE_KEYS` as-is — changing the keys would silently reset every existing reader's saved language and theme.

- [ ] **Step 2: Flip the HTML default to Arabic RTL**

In `index.html`, change the opening tag to `<html lang="ar" dir="rtl">`, set `<title>ما ليس على المصمّم جهله</title>`, and change the pre-paint bootstrap's default language from `'en'` to `'ar'`:

```js
var lang = localStorage.getItem('uiref:lang') || 'ar';
```

- [ ] **Step 3: Flip the React default**

In `src/App.jsx`, change `useLocalStorage(STORAGE_KEYS.lang, 'en')` to `useLocalStorage(STORAGE_KEYS.lang, 'ar')`. This must match the `index.html` bootstrap exactly, or the page flips direction after hydration.

- [ ] **Step 4: Verify Arabic-first with a clean profile**

```bash
npm run dev -- --port 4100 --strictPort --host 127.0.0.1
```

In a private window (so `localStorage` is empty), open `http://127.0.0.1:4100/` and confirm: the page loads in Arabic, `dir="rtl"`, the sidebar sits on the right, and there is **no visible flip** between first paint and hydration. Then switch to English, reload, and confirm the choice persists.

- [ ] **Step 5: Check the RTL layout for hardcoded directions**

```bash
grep -rn "ml-\|mr-\|pl-\|pr-\|left-\|right-\|text-left\|text-right" src/ --include=*.jsx --include=*.css
```

Every hit must be either logical (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`) or deliberately physical with a comment saying why. Fix any physical value that is not deliberate — PRD §4 names this as the thing that breaks the layout on flip.

- [ ] **Step 6: Update the README**

Rewrite the README's opening so it describes «ما ليس على المصمّم جهله», the category layout, `npm run import:book`, and `npm test`. Keep the existing licensing and attribution section for the source book intact — the project is open source and must stay clean on rights (`06` §المصادر المرجعية).

- [ ] **Step 7: Full verification**

```bash
npm test
npx --yes ajv-cli@5 validate --spec=draft7 -s schema/chapter.schema.json -d "content/*/*.json"
npx --yes ajv-cli@5 validate --spec=draft7 -s schema/categories.schema.json -d "content/categories.json"
npm run build
```

Expected: all tests pass, 22 chapters valid, categories valid, build succeeds.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: rebrand to «ما ليس على المصمّم جهله», default to Arabic RTL

Arabic is the default language and direction per PRD section 4.
Storage keys unchanged so existing readers keep their preferences.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

**Follow-up content task (not code, do not block this plan):** harvest from markdown chapters 1–3 into the existing bilingual chapters — the unique **طول السطر (line length)** section into `typography`, and the 9 Arabic-context notes into `basics`, `grid-layout` and `typography` as `note` callouts. These are the highest-priority content per `03`'s ranking (§أولوية المحتوى: sections carrying Arabic context that exists nowhere else rank third of four, above plain definitions).

---

## Self-Review

**Spec coverage.** PRD §2 content/code separation and the `/content/<category>/<chapter>.json` path — Task 5. §2 callout types including `note` — Tasks 3, 4. §4 language and direction — Task 9. §4 Latin-stays-LTR — honoured by not stripping parentheticals (Task 3, Global Constraints). §3 existing features preserved — Tasks 7, 8 verification steps. §8 sidebar growth risk — partly addressed by category grouping in Task 8; the 250-section scale problem is not solved and stays open. `03` editor-note rule — Tasks 3, 4. `08` automated gate — every task's validation step. **Known gaps, deliberate and listed under Out of Scope:** home page, newsletter, share, OG tags, Arabic search normalization, load speed. §5 quality bar (WCAG AA, bilingual alt, keyboard nav) is asserted in Global Constraints and spot-checked in Task 9 Step 5, but has no dedicated audit task — it belongs in the second plan alongside the launch features.

**Placeholder scan.** No TBDs. Every code step carries real code. Task 5 Step 5 and Task 8 Step 4 direct the engineer to `grep` and then edit — the exact edits depend on file contents I did not fully enumerate, so the grep command and the acceptance criterion are both given rather than a fabricated diff.

**Type consistency.** `detectLevels` returns `{chapter, section}` and every caller destructures those names. `splitChapters` returns `{number, heading, body}`, consumed by `buildChapter(raw, levels)`. `sectionId(heading, index, taken)` takes a `Set` and mutates it; `buildChapter` creates one `taken` per chapter, so ids are unique within a chapter and may repeat across chapters — which is correct, since the URL is scoped by category and chapter. `indexChapters(categories, chapters)` returns the five members used in Tasks 7 and 8. `resolveLegacyRoute(route, categoryOfChapter)` takes the function, not the Map, matching what Task 6 exports.
