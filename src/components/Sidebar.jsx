import { chapters } from '../lib/content.js'
import { hrefFor } from '../lib/hooks.js'
import { t } from '../lib/ui.js'
import { site } from '../config.js'
import { CloseIcon, PrintIcon } from './Icons.jsx'

export default function Sidebar({ lang, activeChapterId, activeSectionId, open, onClose }) {
  return (
    <>
      {/* Mobile overlay with blur */}
      <div
        aria-hidden
        onClick={onClose}
        className={`print-hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-200 md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Floating Island Sidebar adhering to Apple Design & Nested Radius */}
      <aside
        aria-label={t(lang, 'contents')}
        className={`print-hidden flex flex-col transition-all duration-200 ease-out
          /* Mobile sheet drawer */
          max-md:fixed max-md:z-50 max-md:top-2 max-md:bottom-2 max-md:start-2 max-md:w-[min(300px,calc(100vw-16px))] max-md:rounded-2xl
          ${open ? 'max-md:translate-x-0 max-md:opacity-100' : 'max-md:ltr:-translate-x-[calc(100%+24px)] max-md:rtl:translate-x-[calc(100%+24px)] max-md:pointer-events-none max-md:opacity-0'}
          /* Desktop: Sticky column inside unified container */
          md:sticky md:top-[80px] md:h-[calc(100vh-96px)] md:w-[268px] md:shrink-0 md:z-20 md:rounded-2xl
          border border-line/80 bg-surface/90 backdrop-blur-xl shadow-[0_2px_12px_rgba(0,0,0,0.06),0_12px_28px_rgba(0,0,0,0.04)] dark:border-line/40 dark:bg-surface/80 dark:shadow-[0_2px_12px_rgba(0,0,0,0.4),0_16px_36px_rgba(0,0,0,0.3)]`}
      >
        {/* Mobile Header */}
        <div className="flex h-[56px] shrink-0 items-center justify-between border-b border-line/80 px-3.5 md:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-action text-xs font-semibold text-white shadow-2xs">
              UI
            </div>
            <span className="text-sm font-semibold text-ink">{site.title[lang]}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t(lang, 'closeMenu')}
            className="btn btn--secondary btn--icon text-ink transition-transform active:scale-95"
          >
            <CloseIcon width="16" height="16" />
          </button>
        </div>

        {/* Desktop Header with chapter count badge */}
        <div className="hidden shrink-0 items-center justify-between border-b border-line/80 px-3.5 py-3 md:flex">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-action" />
            <span className="font-mono text-[11px] font-semibold tracking-wider text-muted uppercase">
              {t(lang, 'contents')}
            </span>
          </div>
          <span className="rounded-full bg-surface-sunken px-2 py-0.5 font-mono text-[10px] font-medium text-muted border border-line">
            {chapters.length} {lang === 'ar' ? 'فصل' : 'chapters'}
          </span>
        </div>

        {/* Navigation Items (R_inner = 12px within R_outer = 20px) */}
        <nav className="flex-1 overflow-y-auto p-2">
          <ol className="space-y-1">
            {chapters.map((chapter, i) => {
              const active = chapter.id === activeChapterId
              return (
                <li key={chapter.id} className="group/item">
                  <a
                    href={hrefFor(chapter.id)}
                    onClick={() => onClose?.()}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center gap-2 rounded-xl px-2.5 py-2 text-sm transition-all duration-150 no-underline active:scale-[0.98] ${
                      active
                        ? 'border border-action/25 bg-action/10 font-semibold text-action shadow-xs'
                        : 'border border-transparent text-body hover:border-line/60 hover:bg-surface-sunken/80 hover:text-ink'
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-lg font-mono text-[11px] font-semibold transition-colors ${
                        active
                          ? 'bg-action text-white shadow-2xs'
                          : 'bg-surface-sunken text-muted group-hover/item:text-body border border-line/60'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="truncate">{chapter.title[lang]}</span>
                  </a>

                  {/* Subsections under active chapter */}
                  {active && (
                    <ol className="ms-3.5 mt-1 space-y-0.5 border-s border-line/80 ps-2.5">
                      {chapter.sections.map((section) => {
                        const current = section.id === activeSectionId
                        return (
                          <li key={section.id}>
                            <a
                              href={hrefFor(chapter.id, section.id)}
                              onClick={() => onClose?.()}
                              aria-current={current ? 'location' : undefined}
                              className={`-ms-px block rounded-lg py-1.5 pe-2 ps-2 text-xs leading-relaxed transition-all no-underline ${
                                current
                                  ? 'border-s-2 border-action bg-action/10 font-semibold text-action'
                                  : 'text-muted hover:bg-surface-sunken hover:text-ink'
                              }`}
                            >
                              {section.title[lang]}
                            </a>
                          </li>
                        )
                      })}
                    </ol>
                  )}
                </li>
              )
            })}
          </ol>
        </nav>

        {/* Footer / Print Option */}
        <div className="shrink-0 border-t border-line/80 p-2.5">
          <a
            href="#/print"
            className="btn btn--secondary btn--sm flex w-full items-center justify-center gap-2 rounded-xl text-xs font-semibold transition-transform active:scale-95"
          >
            <PrintIcon width="15" height="15" className="text-muted" />
            <span>{t(lang, 'printAll')}</span>
          </a>
        </div>
      </aside>
    </>
  )
}
