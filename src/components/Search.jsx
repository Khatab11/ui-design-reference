import { useEffect, useMemo, useRef, useState } from 'react'
import { excerpt, getSearchIndex } from '../lib/search.js'
import { navigate } from '../lib/hooks.js'
import { t } from '../lib/ui.js'
import { SearchIcon } from './Icons.jsx'

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
      className="print-hidden fixed inset-0 z-[60] flex items-start justify-center bg-ink/40 p-2 pt-[10vh] sm:p-3 sm:pt-[12vh]"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t(lang, 'search')}
        className="flex max-h-[70vh] w-full max-w-[640px] flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-xl"
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-1.5 border-b border-line px-2">
          <SearchIcon className="shrink-0 text-ink-3" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t(lang, 'searchPlaceholder')}
            aria-label={t(lang, 'search')}
            autoComplete="off"
            spellCheck={false}
            className="h-[56px] w-full bg-transparent text-base text-ink placeholder:text-ink-3 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="hidden rounded-sm border border-line px-0.5 text-xs text-ink-3 sm:block"
          >
            Esc
          </button>
        </div>

        <div className="overflow-y-auto">
          {query.trim() === '' && (
            <p className="px-2 py-3 text-sm text-ink-3">{t(lang, 'searchHint')}</p>
          )}
          {query.trim() !== '' && results.length === 0 && (
            <p className="px-2 py-3 text-sm text-ink-3">{t(lang, 'noResults')}</p>
          )}
          {results.length > 0 && (
            <ul ref={listRef} role="listbox" className="py-1">
              {results.map((r, i) => (
                <li
                  key={`${r.item.chapterId}/${r.item.sectionId}`}
                  role="option"
                  aria-selected={i === cursor}
                  onMouseEnter={() => setCursor(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => go(r)}
                  className={`cursor-pointer border-s-2 px-2 py-1 ${
                    i === cursor ? 'border-accent bg-raised' : 'border-transparent'
                  }`}
                >
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-medium text-ink">{r.item.title}</span>
                    {r.item.sectionId && (
                      <span className="truncate text-xs text-ink-3">
                        {t(lang, 'inChapter')} {r.item.chapterTitle}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-sm leading-[22px] text-ink-2">{excerpt(r)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="hidden items-center gap-2 border-t border-line px-2 py-1 text-xs text-ink-3 sm:flex">
          <span><kbd className="font-sans">↑↓</kbd> {t(lang, 'keyboardHint')}</span>
          <span><kbd className="font-sans">↵</kbd> {t(lang, 'keyboardSelect')}</span>
          <span><kbd className="font-sans">Esc</kbd> {t(lang, 'keyboardClose')}</span>
        </div>
      </div>
    </div>
  )
}
