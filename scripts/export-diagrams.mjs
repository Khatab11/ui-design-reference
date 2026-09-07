// Renders each design artboard that a chapter references to a 2x PNG at
// public/assets/<chapter>/<name>.png using headless Chrome.
// Run with: npm run diagrams:export  (optionally: -- blur-types)
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'
import { ASSETS_DIR, ROOT, matchAssets } from './diagrams.mjs'

const CANDIDATES = [
  process.env.CHROME,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean)

const chrome = CANDIDATES.find((p) => fs.existsSync(p))
if (!chrome) {
  console.error('Chrome not found. Set CHROME=/path/to/chrome and run again.')
  process.exit(1)
}

const filter = process.argv.slice(2).filter((a) => !a.startsWith('-'))
const { matched, unmatched } = matchAssets()
const todo = matched.filter((m) => filter.length === 0 || filter.some((f) => m.file.includes(f)))
let ok = 0
for (const m of todo) {
  const outDir = path.join(ASSETS_DIR, m.chapterId)
  fs.mkdirSync(outDir, { recursive: true })
  const out = path.join(outDir, m.file)
  if (!fs.existsSync(m.source)) {
    console.error(`failed: ${path.relative(ROOT, m.source)} does not exist (check "file" for "${m.file}" in design/${m.batch}/canvas.json)`)
    continue
  }
  // Remove any previous export first so a stale file can never pass the check below.
  fs.rmSync(out, { force: true })
  const res = spawnSync(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      `--window-size=${m.w},${m.h}`,
      '--force-device-scale-factor=2',
      '--virtual-time-budget=8000',
      `--screenshot=${out}`,
      pathToFileURL(m.source).href,
    ],
    { stdio: 'ignore' },
  )
  if (res.status === 0 && fs.existsSync(out)) {
    ok++
    console.log(`${path.relative(ROOT, m.source)} -> ${path.relative(ROOT, out)}`)
  } else {
    console.error(`failed: ${path.relative(ROOT, m.source)}`)
  }
}
console.log(`\n${ok}/${todo.length} image${todo.length === 1 ? '' : 's'} exported at 2x`)
if (ok < todo.length) process.exitCode = 1
for (const u of unmatched) {
  console.log(`no artboard for ${u.chapterId}/${u.file}; nothing exported`)
}
