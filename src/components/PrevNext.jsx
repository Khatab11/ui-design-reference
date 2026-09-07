import { chapters } from '../lib/content.js'
import { hrefFor } from '../lib/hooks.js'
import { t } from '../lib/ui.js'
import { ArrowIcon } from './Icons.jsx'

function Card({ chapter, lang, direction }) {
  const isNext = direction === 'next'
  return (
    <a
      href={hrefFor(chapter.id)}
      className={`group flex items-center gap-3.5 rounded-2xl border border-border/80 bg-card p-4 text-start no-underline shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_16px_rgba(0,0,0,0.02)] transition-all duration-150 hover:border-action/40 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_12px_28px_rgba(0,0,0,0.04)] active:scale-[0.98] dark:border-border/40 dark:shadow-[0_1px_3px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.25)] min-h-[64px] ${
        isNext ? 'text-end sm:col-start-2' : ''
      }`}
    >
      {!isNext && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface-sunken text-muted transition-colors group-hover:bg-action/10 group-hover:text-action">
          <ArrowIcon className="rotate-180 rtl:rotate-0" width="16" height="16" />
        </div>
      )}
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[10px] font-semibold uppercase tracking-wider text-muted">
          {t(lang, isNext ? 'next' : 'previous')}
        </span>
        <span className="block truncate text-[16px] font-semibold text-ink transition-colors group-hover:text-action">
          {chapter.title[lang]}
        </span>
      </span>
      {isNext && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface-sunken text-muted transition-colors group-hover:bg-action/10 group-hover:text-action">
          <ArrowIcon className="rtl:rotate-180" width="16" height="16" />
        </div>
      )}
    </a>
  )
}

export default function PrevNext({ chapter, lang }) {
  const i = chapters.findIndex((c) => c.id === chapter.id)
  const prev = chapters[i - 1]
  const next = chapters[i + 1]
  if (!prev && !next) return null
  return (
    <nav aria-label="Chapter navigation" className="print-hidden mt-12 grid grid-cols-1 gap-4 border-t border-line/80 pt-6 sm:grid-cols-2">
      {prev && <Card chapter={prev} lang={lang} direction="prev" />}
      {next && <Card chapter={next} lang={lang} direction="next" />}
    </nav>
  )
}
