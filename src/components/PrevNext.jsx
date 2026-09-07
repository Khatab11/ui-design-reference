import { chapters } from '../lib/content.js'
import { hrefFor } from '../lib/hooks.js'
import { t } from '../lib/ui.js'
import { ArrowIcon } from './Icons.jsx'

function Card({ chapter, lang, direction }) {
  const isNext = direction === 'next'
  return (
    <a
      href={hrefFor(chapter.id)}
      className={`card card--interactive group flex items-center gap-3 p-4 no-underline transition-colors hover:border-line-hover min-h-[56px] ${
        isNext ? 'text-end sm:col-start-2' : ''
      }`}
    >
      {!isNext && <ArrowIcon className="shrink-0 rotate-180 text-muted transition-colors group-hover:text-action rtl:rotate-0" width="18" height="18" />}
      <span className="min-w-0 flex-1">
        <span className="block label text-muted">
          {t(lang, isNext ? 'next' : 'previous')}
        </span>
        <span className="block truncate text-[17px] font-semibold text-ink group-hover:text-action transition-colors">{chapter.title[lang]}</span>
      </span>
      {isNext && <ArrowIcon className="shrink-0 text-muted transition-colors group-hover:text-action rtl:rotate-180" width="18" height="18" />}
    </a>
  )
}

export default function PrevNext({ chapter, lang }) {
  const i = chapters.findIndex((c) => c.id === chapter.id)
  const prev = chapters[i - 1]
  const next = chapters[i + 1]
  if (!prev && !next) return null
  return (
    <nav aria-label="Chapter navigation" className="print-hidden mt-12 grid grid-cols-1 gap-4 border-t border-line pt-6 sm:grid-cols-2">
      {prev && <Card chapter={prev} lang={lang} direction="prev" />}
      {next && <Card chapter={next} lang={lang} direction="next" />}
    </nav>
  )
}
