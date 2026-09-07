// Loads every chapter from /content/*.json at build time and sorts by `order`.
// Nothing here knows what the chapters contain.
const modules = import.meta.glob('../../content/*.json', { eager: true })

export const CALLOUT_TYPES = ['tip', 'warning', 'quote', 'note']

function validate(chapter, path) {
  const problems = []
  if (!chapter.id) problems.push('missing "id"')
  if (typeof chapter.order !== 'number') problems.push('"order" must be a number')
  if (!chapter.title?.en || !chapter.title?.ar) problems.push('"title" needs en + ar')
  if (!Array.isArray(chapter.sections) || chapter.sections.length === 0) {
    problems.push('"sections" must be a non-empty array')
  } else {
    chapter.sections.forEach((s, i) => {
      if (!s.id) problems.push(`section ${i}: missing "id"`)
      if (!s.title?.en || !s.title?.ar) problems.push(`section ${i}: "title" needs en + ar`)
      if (!s.body?.en || !s.body?.ar) problems.push(`section ${i}: "body" needs en + ar`)
      if (s.asset) {
        if (!s.asset.file) problems.push(`section ${i}: asset needs "file"`)
        if (!s.asset.alt?.en || !s.asset.alt?.ar) problems.push(`section ${i}: asset "alt" needs en + ar`)
        if (!/^\d+:\d+$/.test(String(s.asset.ratio))) problems.push(`section ${i}: asset "ratio" must look like 16:9`)
        if (!s.asset.brief) problems.push(`section ${i}: asset needs "brief"`)
      }
      if (s.callout && !CALLOUT_TYPES.includes(s.callout.type)) {
        problems.push(`section ${i}: unknown callout type "${s.callout.type}" (use ${CALLOUT_TYPES.join(' | ')})`)
      }
    })
  }
  if (problems.length && import.meta.env.DEV) {
    console.warn(`[content] ${path}: ${problems.join('; ')}`)
  }
  return problems.length === 0
}

export const chapters = Object.entries(modules)
  .map(([path, mod]) => ({ path, chapter: mod.default ?? mod }))
  .filter(({ path, chapter }) => validate(chapter, path))
  .map(({ chapter }) => chapter)
  .sort((a, b) => a.order - b.order)

export const chapterById = new Map(chapters.map((c) => [c.id, c]))

export function chapterIndex(id) {
  return chapters.findIndex((c) => c.id === id)
}

export function assetUrl(chapterId, file) {
  return `${import.meta.env.BASE_URL}assets/${chapterId}/${file}`
}
