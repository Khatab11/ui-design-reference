import Fuse from 'fuse.js'
import { chapters } from './content.js'
export { stripMarkdown } from './markdown.js'
import { stripMarkdown } from './markdown.js'

// Normalize Arabic text for robust search (diacritics, alef forms, taa marbuta, etc.)
export function normalizeArabic(text = '') {
  return text
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '') // strip tashkeel / harakat, dagger alif, and tatweel
    .replace(/[إأآٱ]/g, 'ا') // normalize alef with hamza / madda / wasla to bare alef
    .replace(/ة/g, 'ه') // normalize taa marbuta to haa
    .replace(/ى/g, 'ي') // normalize alef maksura to yaa
}

// Generate search query variants for Arabic (e.g. handling definite article "ال")
export function getArabicSearchVariants(query = '') {
  const norm = normalizeArabic(query).trim()
  if (!norm) return []
  const variants = [norm]

  // Try stripping "ال" prefix from words if present
  const withoutAl = norm
    .split(/\s+/)
    .map((w) => (w.startsWith('ال') && w.length > 3 ? w.slice(2) : w))
    .join(' ')
  if (withoutAl !== norm && withoutAl.length >= 2) {
    variants.push(withoutAl)
  }

  // Try adding "ال" prefix to single word if missing
  if (!norm.includes(' ') && !norm.startsWith('ال') && norm.length >= 3) {
    variants.push('ال' + norm)
  }

  return variants
}

// Map a character index in a diacritic-stripped normalized string back to the original index.
export function findOriginalOffset(original = '', targetOffset = 0) {
  let normIdx = 0
  for (let origIdx = 0; origIdx < original.length; origIdx++) {
    const ch = original[origIdx]
    const isDiacritic = /[\u064B-\u065F\u0670\u0640]/.test(ch)
    if (!isDiacritic) {
      if (normIdx === targetOffset) return origIdx
      normIdx += 1
    }
  }
  return original.length
}

const cache = new Map()

export function getSearchIndex(lang) {
  if (cache.has(lang)) return cache.get(lang)
  const docs = []
  for (const chapter of chapters) {
    docs.push({
      chapterId: chapter.id,
      sectionId: '',
      chapterTitle: chapter.title[lang],
      title: chapter.title[lang],
      body: stripMarkdown(chapter.intro?.[lang]),
    })
    for (const section of chapter.sections) {
      docs.push({
        chapterId: chapter.id,
        sectionId: section.id,
        chapterTitle: chapter.title[lang],
        title: section.title[lang],
        // Callout text is part of the section for search purposes: the
        // course-only guidance in "note" callouts lives nowhere else.
        body: [stripMarkdown(section.body[lang]), stripMarkdown(section.callout?.[lang] ?? '')]
          .filter(Boolean)
          .join(' '),
      })
    }
  }

  const fuseOptions = {
    keys: [
      { name: 'title', weight: 0.6 },
      { name: 'body', weight: 0.3 },
      { name: 'chapterTitle', weight: 0.1 },
    ],
    includeMatches: true,
    includeScore: true,
    ignoreLocation: true,
    threshold: 0.35,
    minMatchCharLength: 2,
  }

  if (lang === 'ar') {
    fuseOptions.getFn = (obj, path) => {
      const val = Fuse.config.getFn(obj, path)
      return typeof val === 'string' ? normalizeArabic(val) : val
    }
  }

  const fuse = new Fuse(docs, fuseOptions)

  if (lang === 'ar') {
    const originalSearch = fuse.search.bind(fuse)
    fuse.search = (pattern, options) => {
      if (typeof pattern !== 'string') {
        return originalSearch(pattern, options)
      }
      const variants = getArabicSearchVariants(pattern)
      if (variants.length === 0) return []

      const map = new Map()
      for (const v of variants) {
        const res = originalSearch(v, options)
        for (const r of res) {
          const key = `${r.item.chapterId}#${r.item.sectionId}`
          if (!map.has(key) || (r.score ?? 1) < (map.get(key).score ?? 1)) {
            map.set(key, r)
          }
        }
      }

      const merged = Array.from(map.values()).sort((a, b) => (a.score ?? 0) - (b.score ?? 0))
      if (options?.limit && merged.length > options.limit) {
        return merged.slice(0, options.limit)
      }
      return merged
    }
  }

  cache.set(lang, fuse)
  return fuse
}

// Returns a short excerpt around the first body match, or the body start.
export function excerpt(result, radius = 60) {
  const body = result.item?.body || ''
  const match = result.matches?.find((m) => m.key === 'body')
  if (!match || !match.indices?.length) return body.slice(0, radius * 2)
  const [start, end] = match.indices[0]

  let actualStart = start
  let actualEnd = end
  if (match.value && match.value.length !== body.length) {
    actualStart = findOriginalOffset(body, start)
    actualEnd = findOriginalOffset(body, end)
  }

  const from = Math.max(0, actualStart - radius)
  const to = Math.min(body.length, actualEnd + radius)
  return (from > 0 ? '…' : '') + body.slice(from, to) + (to < body.length ? '…' : '')
}
