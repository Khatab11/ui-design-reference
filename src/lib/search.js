import Fuse from 'fuse.js'
import { chapters } from './content.js'

// Very small markdown → text stripper so search matches prose, not syntax.
export function stripMarkdown(md = '') {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/^\s*>\s?/gm, '')
    .replace(/\|/g, ' ')
    .replace(/[*_~]{1,3}/g, '')
    .replace(/\s+/g, ' ')
    .trim()
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
  const fuse = new Fuse(docs, {
    keys: [
      { name: 'title', weight: 0.6 },
      { name: 'body', weight: 0.3 },
      { name: 'chapterTitle', weight: 0.1 },
    ],
    includeMatches: true,
    ignoreLocation: true,
    threshold: 0.35,
    minMatchCharLength: 2,
  })
  cache.set(lang, fuse)
  return fuse
}

// Returns a short excerpt around the first body match, or the body start.
export function excerpt(result, radius = 60) {
  const body = result.item.body || ''
  const match = result.matches?.find((m) => m.key === 'body')
  if (!match || !match.indices.length) return body.slice(0, radius * 2)
  const [start, end] = match.indices[0]
  const from = Math.max(0, start - radius)
  const to = Math.min(body.length, end + radius)
  return (from > 0 ? '…' : '') + body.slice(from, to) + (to < body.length ? '…' : '')
}
