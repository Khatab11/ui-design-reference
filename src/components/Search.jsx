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
      className="print-hidden fixed inset-0 z-[60] flex items-start justify-center bg-black/40 p-2 pt-2 backdrop-blur-xs sm:p-3 sm:pt-[12vh]"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t(lang, 'search')}
        className="modal flex max-h-[calc(100dvh-16px)] w-full max-w-[640px] flex-col overflow-hidden sm:max-h-[70vh]"
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-2 border-b border-line px-3 focus-within:border-action focus-within:ring-2 focus-within:ring-action">
          <SearchIcon className="shrink-0 text-muted" width="20" height="20" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t(lang, 'searchPlaceholder')}
            aria-label={t(lang, 'search')}
            autoComplete="off"
            spellCheck={false}
            className="h-[56px] w-full bg-transparent text-[17px] text-ink placeholder:text-muted focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="hidden tag tag--neutral sm:inline-flex cursor-pointer"
          >
            Esc
          </button>
        </div>

        <div className="overflow-y-auto">
          {query.trim() === '' && (
            <p className="px-4 py-4 text-sm text-muted">{t(lang, 'searchHint')}</p>
          )}
          {query.trim() !== '' && results.length === 0 && (
            <p className="px-4 py-4 text-sm text-muted">{t(lang, 'noResults')}</p>
          )}
          {results.length > 0 && (
            <ul ref={listRef} role="listbox" className="py-2">
              {results.map((r, i) => (
                <li
                  key={`${r.item.chapterId}/${r.item.sectionId}`}
                  role="option"
                  aria-selected={i === cursor}
                  onMouseEnter={() => setCursor(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => go(r)}
                  className={`cursor-pointer border-s-2 px-4 py-2 transition-colors ${
                    i === cursor ? 'border-action bg-action-tint text-ink' : 'border-transparent text-body hover:bg-ground hover:text-ink'
                  }`}
                >
                  <div className="flex min-w-0 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2">
                    <span className="min-w-0 break-words text-[15px] font-semibold text-ink">{r.item.title}</span>
                    {r.item.sectionId && (
                      <span className="truncate text-xs text-muted">
                        {t(lang, 'inChapter')} {r.item.chapterTitle}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm leading-[22px] text-body">{excerpt(r)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="hidden items-center gap-3 border-t border-line px-4 py-2 text-xs text-muted sm:flex">
          <span><kbd className="font-sans font-semibold">↑↓</kbd> {t(lang, 'keyboardHint')}</span>
          <span><kbd className="font-sans font-semibold">↵</kbd> {t(lang, 'keyboardSelect')}</span>
          <span><kbd className="font-sans font-semibold">Esc</kbd> {t(lang, 'keyboardClose')}</span>
        </div>
      </div>
    </div>
  )
}
