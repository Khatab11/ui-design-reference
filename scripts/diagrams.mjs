// Shared helpers for the diagram scripts.
//
// A design canvas lives in design/<batch>/ as one .dc.html artboard per
// image plus a canvas.json. Each artboard's `title` in canvas.json names the
// asset file it produces (for example "blur-types.png"). Chapters reference
// that same file name in their `asset.file`, which is how an artboard is
// matched to the chapter folder it belongs in.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Project root, resolved from this file so the scripts work from any cwd.
export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
export const CONTENT_DIR = path.join(ROOT, 'content')
export const DESIGN_DIR = path.join(ROOT, 'design')
export const ASSETS_DIR = path.join(ROOT, 'public', 'assets')

export function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

export function loadChapters() {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .map((f) => readJson(path.join(CONTENT_DIR, f)))
}

// title -> { file: absolute .dc.html path, w, h, batch }
export function loadArtboards() {
  const map = new Map()
  if (!fs.existsSync(DESIGN_DIR)) return map
  for (const batch of fs.readdirSync(DESIGN_DIR).sort()) {
    const canvas = path.join(DESIGN_DIR, batch, 'canvas.json')
    if (!fs.existsSync(canvas)) continue
    for (const a of readJson(canvas).artboards ?? []) {
      if (!a.title) continue
      const file = path.join(DESIGN_DIR, batch, a.file)
      if (!fs.existsSync(file)) {
        console.warn(`warning: ${batch}/canvas.json lists "${a.file}" for "${a.title}" but the file does not exist; skipped`)
        continue
      }
      if (map.has(a.title)) {
        console.warn(`warning: artboard title "${a.title}" appears in more than one canvas; using ${map.get(a.title).batch}`)
        continue
      }
      map.set(a.title, {
        file,
        w: a.w ?? 1600,
        h: a.h ?? 900,
        batch,
      })
    }
  }
  return map
}

// Every (chapter, asset) pair, with its artboard when one matches.
export function matchAssets() {
  const artboards = loadArtboards()
  const matched = []
  const unmatched = []
  const used = new Set()
  for (const chapter of loadChapters()) {
    for (const section of chapter.sections ?? []) {
      const asset = section.asset
      if (!asset?.file) continue
      const art = artboards.get(asset.file)
      if (art) {
        used.add(asset.file)
        matched.push({ chapterId: chapter.id, sectionId: section.id, file: asset.file, source: art.file, w: art.w, h: art.h, batch: art.batch })
      } else {
        unmatched.push({ chapterId: chapter.id, sectionId: section.id, file: asset.file })
      }
    }
  }
  const orphans = [...artboards.keys()].filter((title) => !used.has(title))
  return { matched, unmatched, orphans }
}

export function baseName(file) {
  return file.replace(/\.[a-z0-9]+$/i, '')
}
