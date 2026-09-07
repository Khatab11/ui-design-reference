import { chapters } from '../lib/content.js'
import { hrefFor } from '../lib/hooks.js'
import { t } from '../lib/ui.js'
import { ArrowIcon } from './Icons.jsx'

function Card({ chapter, lang, direction }) {
  const isNext = direction === 'next'
  return (
    <a
      href={hrefFor(chapter.id)}
      className={`group flex items-center gap-1.5 rounded-lg border border-line bg-surface p-2 transition-colors hover:border-line-strong ${
        isNext ? 'text-end sm:col-start-2' : ''
      }`}
    >
      {!isNext && <ArrowIcon className="shrink-0 rotate-180 text-ink-3 transition-colors group-hover:text-accent rtl:rotate-0" />}
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-medium uppercase tracking-wide text-ink-3">
          {t(lang, isNext ? 'next' : 'previous')}
        </span>
        <span className="block truncate text-base font-medium text-ink">{chapter.title[lang]}</span>
      </span>
      {isNext && <ArrowIcon className="shrink-0 text-ink-3 transition-colors group-hover:text-accent rtl:rotate-180" />}
    </a>
  )
}

export default function PrevNext({ chapter, lang }) {
  const i = chapters.findIndex((c) => c.id === chapter.id)
  const prev = chapters[i - 1]
  const next = chapters[i + 1]
  if (!prev && !next) return null
  return (
    <nav aria-label="Chapter navigation" className="print-hidden mt-10 grid grid-cols-1 gap-2 border-t border-line pt-4 sm:grid-cols-2">
      {prev && <Card chapter={prev} lang={lang} direction="prev" />}
      {next && <Card chapter={next} lang={lang} direction="next" />}
    </nav>
  )
}
