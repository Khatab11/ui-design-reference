import { chapters } from '../lib/content.js'
import { hrefFor } from '../lib/hooks.js'
import { t } from '../lib/ui.js'
import { site } from '../config.js'
import { CloseIcon, PrintIcon } from './Icons.jsx'

export default function Sidebar({ lang, activeChapterId, activeSectionId, open, onClose }) {
  return (
    <>
      {/* Mobile overlay with blur and #1A1A1A tinted backdrop */}
      <div
        aria-hidden
        onClick={onClose}
        className={`print-hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-200 md:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Floating Glassmorphic Sidebar */}
      <aside
        aria-label={t(lang, 'contents')}
        className={`print-hidden fixed z-50 flex flex-col transition-all duration-200 ease-out
          /* Mobile: floating sheet */
          max-md:top-2 max-md:bottom-2 max-md:start-2 max-md:w-[min(296px,calc(100vw-16px))] max-md:rounded-2xl
          ${open ? 'max-md:translate-x-0 max-md:opacity-100' : 'max-md:ltr:-translate-x-[calc(100%+24px)] max-md:rtl:translate-x-[calc(100%+24px)] max-md:opacity-0 max-md:pointer-events-none'}
          /* Desktop: floating glass sidebar adhering to 8pt grid */
          md:top-[80px] md:bottom-2 md:start-2 md:w-[256px] md:z-20 md:rounded-2xl
          /* Glassmorphism visual effect */
          bg-surface/75 dark:bg-surface/70 backdrop-blur-xl backdrop-saturate-150
          border border-line/70 dark:border-line/40
          shadow-xl shadow-ink/5 dark:shadow-black/40
          ring-1 ring-white/30 dark:ring-white/5`}
      >
        {/* Mobile Header */}
        <div className="flex h-[56px] shrink-0 items-center justify-between border-b border-line/60 px-3 md:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent font-semibold text-xs">
              UI
            </div>
            <span className="text-sm font-semibold text-ink">{site.title[lang]}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t(lang, 'closeMenu')}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-line/70 bg-surface/60 text-ink-2 hover:border-line-strong hover:bg-raised hover:text-ink active:scale-95"
          >
            <CloseIcon width="16" height="16" />
          </button>
        </div>

        {/* Desktop Header Badge */}
        <div className="hidden shrink-0 items-center justify-between border-b border-line/50 px-3 py-2.5 md:flex">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-3">
              {t(lang, 'contents')}
            </span>
          </div>
          <span className="rounded-md border border-line/70 bg-raised/80 px-1.5 py-0.2 font-mono text-[10px] font-medium text-ink-3">
            {chapters.length} {lang === 'ar' ? 'أقسام' : 'chapters'}
          </span>
        </div>

        {/* Navigation Content */}
        <nav className="flex-1 overflow-y-auto px-2 py-2.5">
          <ol className="space-y-1">
            {chapters.map((chapter, i) => {
              const active = chapter.id === activeChapterId
              return (
                <li key={chapter.id} className="group/item">
                  <a
                    href={hrefFor(chapter.id)}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center gap-2 rounded-xl px-2 py-1.5 text-xs font-medium transition-all ${
                      active
                        ? 'bg-accent/15 text-accent-ink font-semibold border border-accent/25 shadow-2xs backdrop-blur-xs'
                        : 'text-ink-2 hover:bg-raised/70 hover:text-ink border border-transparent hover:border-line/50'
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md font-mono text-[10px] font-semibold transition-colors ${
                        active
                          ? 'bg-accent/20 text-accent-ink'
                          : 'bg-raised/90 text-ink-3 group-hover/item:text-ink-2'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="truncate">{chapter.title[lang]}</span>
                  </a>

                  {/* Subsections under active chapter */}
                  {active && (
                    <ol className="ms-3 mt-1 space-y-0.5 border-s border-line/80 ps-2.5">
                      {chapter.sections.map((section) => {
                        const current = section.id === activeSectionId
                        return (
                          <li key={section.id}>
                            <a
                              href={hrefFor(chapter.id, section.id)}
                              aria-current={current ? 'location' : undefined}
                              className={`-ms-px block border-s-2 py-1 pe-1.5 ps-2 text-[11px] leading-relaxed transition-all rounded-e-md ${
                                current
                                  ? 'border-accent font-semibold text-accent-ink bg-accent/10 shadow-2xs'
                                  : 'border-transparent text-ink-2 hover:border-line-strong hover:bg-raised/60 hover:text-ink'
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
        <div className="shrink-0 border-t border-line/60 p-2 bg-surface/40 backdrop-blur-sm rounded-b-2xl">
          <a
            href="#/print"
            className="flex items-center justify-center gap-1.5 rounded-xl border border-line/70 bg-surface/60 px-2.5 py-1.5 text-xs font-medium text-ink-2 shadow-2xs transition-all hover:border-line-strong hover:bg-raised hover:text-ink active:scale-98"
          >
            <PrintIcon width="16" height="16" className="text-ink-3" />
            <span>{t(lang, 'printAll')}</span>
          </a>
        </div>
      </aside>
    </>
  )
}
