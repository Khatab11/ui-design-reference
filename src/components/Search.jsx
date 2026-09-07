import { useEffect, useMemo, useRef, useState } from 'react'
import { excerpt, getSearchIndex } from '../lib/search.js'
import { navigate } from '../lib/hooks.js'
import { t } from '../lib/ui.js'
import { CloseIcon, SearchIcon } from './Icons.jsx'

const MAX = 12

export default function Search({ lang, open, onClose }) {
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const results = useMemo(() => {
    const q = query.trim()
    if (!q) return []
    return getSearchIndex(lang).search(q, { limit: MAX })
  }, [query, lang])

  useEffect(() => {
    if (open) {
      setQuery('')
      setCursor(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => setCursor(0), [results])

  useEffect(() => {
    const el = listRef.current?.children[cursor]
    el?.scrollIntoView?.({ block: 'nearest' })
  }, [cursor])

  if (!open) return null

  const go = (r) => {
    onClose()
    navigate(r.item.chapterId, r.item.sectionId)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setCursor((c) => Math.min(c + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setCursor((c) => Math.max(c - 1, 0))
    } else if (e.key === 'Enter' && results[cursor]) {
      e.preventDefault()
      go(results[cursor])
    }
  }

  return (
    <div
      className="print-hidden fixed inset-0 z-[60] flex items-start justify-center bg-black/40 backdrop-blur-md p-2 pt-4 sm:p-4 sm:pt-[10vh]"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t(lang, 'search')}
        className="flex max-h-[85vh] sm:max-h-[75vh] w-full max-w-[640px] flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/95 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.18),0_24px_64px_rgba(0,0,0,0.22)] dark:border-border/40"
        onKeyDown={onKeyDown}
      >
        <div className="flex h-[58px] items-center gap-2.5 sm:gap-3 border-b border-line/70 px-3 sm:px-4 focus-within:border-action">
          <SearchIcon className="shrink-0 text-muted" width="18" height="18" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t(lang, 'searchPlaceholder')}
            aria-label={t(lang, 'search')}
            autoComplete="off"
            spellCheck={false}
            className="h-full w-full bg-transparent text-[16px] text-ink placeholder:text-muted focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="hidden rounded-lg border border-line-strong/60 bg-surface-sunken px-2 py-0.5 font-mono text-[11px] font-semibold text-muted shadow-2xs sm:inline-flex cursor-pointer hover:text-ink active:scale-95"
          >
            Esc
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label={t(lang, 'closeMenu')}
            className="btn btn--secondary btn--icon h-9 w-9 min-h-[36px] min-w-[36px] text-muted hover:text-ink sm:hidden"
          >
            <CloseIcon width="16" height="16" />
          </button>
        </div>

        <div className="overflow-y-auto p-2">
          {query.trim() === '' && (
            <p className="px-4 py-6 text-center text-sm text-muted">{t(lang, 'searchHint')}</p>
          )}
          {query.trim() !== '' && results.length === 0 && (
            <p className="px-4 py-6 text-center text-sm text-muted">{t(lang, 'noResults')}</p>
          )}
          {results.length > 0 && (
            <ul ref={listRef} role="listbox" className="space-y-1">
              {results.map((r, i) => (
                <li
                  key={`${r.item.chapterId}/${r.item.sectionId}`}
                  role="option"
                  aria-selected={i === cursor}
                  onMouseEnter={() => setCursor(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => go(r)}
                  className={`cursor-pointer rounded-xl px-3.5 py-2.5 transition-all duration-120 ${
                    i === cursor
                      ? 'border border-action/25 bg-action/10 text-ink shadow-xs'
                      : 'border border-transparent text-body hover:bg-surface-sunken hover:text-ink'
                  }`}
                >
                  <div className="flex items-baseline gap-2">
                    <span className="text-[15px] font-semibold text-ink">{r.item.title}</span>
                    {r.item.sectionId && (
                      <span className="truncate text-xs text-muted">
                        {t(lang, 'inChapter')} {r.item.chapterTitle}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-body">{excerpt(r)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="hidden items-center gap-3 border-t border-line/60 bg-surface-sunken/40 px-4 py-2.5 text-xs text-muted sm:flex">
          <span><kbd className="rounded bg-surface px-1.5 py-0.5 font-mono text-[10px] font-semibold border border-line">↑↓</kbd> {t(lang, 'keyboardHint')}</span>
          <span><kbd className="rounded bg-surface px-1.5 py-0.5 font-mono text-[10px] font-semibold border border-line">↵</kbd> {t(lang, 'keyboardSelect')}</span>
          <span><kbd className="rounded bg-surface px-1.5 py-0.5 font-mono text-[10px] font-semibold border border-line">Esc</kbd> {t(lang, 'keyboardClose')}</span>
        </div>
      </div>
    </div>
  )
}
