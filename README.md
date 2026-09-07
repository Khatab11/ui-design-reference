# UI Design Reference

A bilingual (Arabic / English) documentation-style reference site for the UI Design course. Students open it from a link and come back to it throughout the course. It is a static site: Vite + React + Tailwind, no backend, no router library.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # static output in dist/
npm run preview    # serve dist/ locally
```

## How it works

- **Content** lives in `content/*.json`, one file per chapter. The app never hardcodes course content. On boot it glob-imports every file in `content/` and sorts by the `order` field.
- **Assets** live in `public/assets/<chapterId>/<file>`. If a file is missing the site renders a dashed placeholder at the right aspect ratio showing the `brief` text and the expected path. That is deliberate: write the content first, add images later.
- **Navigation** is hash based: `#/typography`, `#/typography/type-scale`, and `#/print` for the all-chapters print view.
- **Language and theme** are stored in `localStorage` (`uiref:lang`, `uiref:theme`). Arabic switches the page to `dir="rtl"`, flips the sidebar to the right and uses IBM Plex Sans Arabic. Code, hex values and anything inside backticks stays left-to-right in both languages.
- **Search** is client-side fuzzy search (Fuse.js) across all titles, bodies and callouts in the active language. Open it with the header button or `Cmd K` / `Ctrl K`.

## Adding a chapter

1. Create `content/NN-slug.json`. The file name is only for humans; ordering comes from the `order` field inside the file.
2. Give it a unique `id` (lowercase letters, digits, hyphens). The id becomes the URL: `#/<id>`.
3. Fill in `title`, `intro` and at least one section. Every user-facing string is an object with `en` and `ar` keys.
4. Save. The dev server reloads and the chapter appears in the sidebar in its `order` position. If a brand-new file does not show up, restart `npm run dev`.

```json
{
  "$schema": "../schema/chapter.schema.json",
  "id": "typography",
  "order": 4,
  "title": { "en": "Typography", "ar": "التايبوجرافي" },
  "intro": { "en": "One or two sentences.", "ar": "جملة أو جملتان." },
  "sections": [
    {
      "id": "type-scale",
      "title": { "en": "Type scale", "ar": "مقياس الخطوط" },
      "body": {
        "en": "Markdown. **Bold**, lists, tables, fenced code and links all work.",
        "ar": "ماركداون. تعمل **الخطوط الغامقة** والقوائم والجداول والكود."
      },
      "asset": {
        "file": "type-scale.png",
        "alt": { "en": "A modular scale from 12 to 48px.", "ar": "مقياس معياري من 12 إلى 48 بكسل." },
        "ratio": "16:9",
        "brief": "What this image must show. Shown inside the placeholder until the file exists."
      },
      "callout": {
        "type": "tip",
        "en": "Tip, warning, quote or note.",
        "ar": "نصيحة أو تحذير أو اقتباس أو إضافة."
      }
    }
  ]
}
```

Notes:

- `asset` and `callout` are optional per section. `callout.type` is one of `tip`, `warning`, `quote`, `note`.
- `note` marks content added by the course author that is not from the source book (mostly Arabic and Turkish typography and RTL guidance); it renders with its own border colour and the label "Added for this course" / "إضافة خاصة بالكورس".
- `body` is Markdown (GitHub flavoured: tables, task lists, strikethrough). Keep design terms, hex values and code in backticks so they stay Latin and left-to-right in Arabic mode, for example `` `#1A1A1A` `` or `` `line-height` ``. Callout text supports the same inline Markdown (backticks, bold, italics), which matters in Arabic callouts that mention Latin letters or terms.
- Section `id`s only need to be unique within their chapter.
- `schema/chapter.schema.json` gives you validation and autocomplete in VS Code when the `$schema` line is present. In development the console also warns about missing required fields.
- The site title and subtitle (chrome, not content) are in `src/config.js`. Interface strings such as "Search" and "Next" are in `src/lib/ui.js`.

## Adding an asset

1. Note the chapter `id` and the `asset.file` value in the section.
2. Drop the file at `public/assets/<chapterId>/<file>`, for example `public/assets/typography/type-scale.png`.
3. Reload. The placeholder is replaced by the image automatically; nothing else changes.

The `ratio` field (for example `16:9`, `4:3`, `1:1`) sizes both the placeholder and the image container, so the page does not jump when the image arrives. Export images at 2x the displayed width (about 1400px wide for `16:9`) and keep them under 300 KB where you can; half the class is on phones.

## Live diagrams

A figure can be a live HTML diagram instead of a flat image. If `public/assets/<chapterId>/<name>.html` exists next to `<name>.png`, the site shows the HTML version on screen, scaled to the column, and uses the PNG when printing. If only the PNG exists, the PNG is shown. If neither exists, the placeholder is shown.

The diagrams for the current chapters were drawn as design artboards in `design/batch-01/`, one `.dc.html` file per image, with `canvas.json` naming which asset each artboard produces (its `title`). Two scripts keep the site in step with them:

```bash
npm run diagrams
```

That runs both steps. `npm run diagrams:sync` copies every artboard a chapter references to `public/assets/<chapterId>/<name>.html`, stripping the design-tool script and adding a small fit-to-width script plus the `ui-reference-diagram` marker the site looks for. `npm run diagrams:export` renders the same artboards to 2x PNGs with headless Chrome. Pass a name to export one file, for example `npm run diagrams:export -- blur-types`. Chrome is found automatically on macOS; elsewhere set `CHROME=/path/to/chrome`.

To edit a diagram, change the `.dc.html` source (or the design canvas it came from), then run `npm run diagrams` and commit the results under `public/assets/`. The export writes 3200px-wide PNGs; that is fine for these diagrams because on screen the HTML is shown instead and the PNG only serves print and fallback.

Hand-written diagrams work too, with three rules. The site treats any HTML file whose `<head>` contains the exact text `name="ui-reference-diagram"` as live. The frame is sized to the column width and the section's `ratio`, does not scroll, and clips whatever overflows, so the document must fit itself to its viewport: either lay it out in viewport units (`100vw` wide at the section's ratio), or use a fixed-size root inside `<x-dc><div style="width: 1600px; height: 900px">` and copy the fit script from `scripts/sync-diagrams.mjs`. And keep it self-contained (inline CSS and SVG; Google Fonts are the one external resource that works), because it runs in a sandboxed frame. If a section has an `.html` but no `.png`, the screen shows the diagram and print shows the placeholder, so keep both files.

## Printing to PDF

Open **Print the whole reference** at the bottom of the sidebar (or go to `#/print`), then use the browser's Print command and choose "Save as PDF". The print stylesheet hides the navigation, starts each chapter on a new page and keeps figures, code and callouts from splitting across pages. Printing a single chapter from its normal page also works.

## Deploying to Vercel

The repo is a standard Vite project, so Vercel needs no special setup.

Option A, from the dashboard:

1. Push the project to GitHub, GitLab or Bitbucket.
2. In Vercel choose **Add New Project**, import the repository, and accept the detected settings (framework: Vite, build: `npm run build`, output: `dist`). `vercel.json` in the repo already pins these.
3. Deploy. Every push to the default branch redeploys.

Option B, from the terminal:

```bash
npx vercel
```

Follow the prompts, then run `npx vercel --prod` for the production URL.

Any other static host works too: run `npm run build` and upload the `dist/` folder. Because navigation uses URL hashes, no rewrite rules are required.

## Project layout

```
content/            chapter JSON files (the only place course content lives)
public/assets/      images and live diagrams, grouped by chapter id
design/             design canvases the diagrams are drawn in (source of public/assets/*.html and *.png)
docs/               image briefs
schema/             JSON schema for chapter files
scripts/            diagrams:sync and diagrams:export
src/
  App.jsx           layout, routing, language/theme state
  config.js         site title/subtitle
  index.css         palette, type, prose and print styles
  lib/content.js    glob import + sort of content/*.json
  lib/search.js     Fuse.js index per language
  lib/hooks.js      hash routing, localStorage, media queries
  lib/ui.js         interface strings (en/ar)
  components/       Sidebar, TopBar, Chapter, Section, Asset (image / live diagram / placeholder), Callout, Search, PrintView
tailwind.config.js  8pt spacing scale, type scale, colour tokens
```

## License

The site's code is MIT licensed (see `LICENSE`). The course text, diagrams and briefs under `content/`, `design/`, `docs/` and `public/assets/` are the course author's teaching material, based on *UI Design Principles* by Michael Filipiuk, and are not part of the MIT grant.

## Design tokens

- Spacing: 8px base (`p-1` = 8px, `p-2` = 16px, `p-3` = 24px, and so on) with 4px and 12px half-steps.
- Type: 12 / 14 / 17 / 20 / 24 / 29 / 35 / 42px, ratio about 1.2, line-heights on the 8pt grid.
- Colour: one warm neutral ramp (`bg`, `surface`, `raised`, `line`, `ink`) plus one copper accent, with amber reserved for warnings and teal for course notes, defined as CSS variables in `src/index.css` and swapped for dark mode.
- Fonts: Inter for English, IBM Plex Sans Arabic for Arabic, both loaded from Google Fonts in `index.html`.
