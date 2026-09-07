import { chapters } from '../lib/content.js'
import { hrefFor } from '../lib/hooks.js'
import { t } from '../lib/ui.js'
import { site } from '../config.js'
import { CloseIcon, PrintIcon } from './Icons.jsx'

export default function Sidebar({
  lang,
  activeChapterId,
  activeSectionId,
  open,
  onClose,
  gamifiedChapterIds = ['introduction', 'basics', 'grid-layout'],
  completedSections = [],
}) {
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

      {/* Floating Sidebar adhering to 260px width in DESIGN_SYSTEM.md §8 */}
      <aside
        aria-label={t(lang, 'contents')}
        className={`print-hidden fixed z-50 flex flex-col transition-all duration-200 ease-out
          /* Mobile: floating sheet */
          max-md:top-2 max-md:bottom-2 max-md:start-2 max-md:w-[min(280px,calc(100vw-16px))] max-md:rounded-card
          ${open ? 'max-md:translate-x-0 max-md:opacity-100' : 'max-md:ltr:-translate-x-[calc(100%+24px)] max-md:rtl:translate-x-[calc(100%+24px)] max-md:opacity-0 max-md:pointer-events-none'}
          /* Desktop: 260px sidebar */
          md:top-[76px] md:bottom-3 md:start-3 md:w-[260px] md:z-20 md:rounded-card
          bg-surface border border-line shadow-overlay`}
      >
        {/* Mobile Header */}
        <div className="flex h-[56px] shrink-0 items-center justify-between border-b border-line px-3 md:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-action text-white font-semibold text-xs">
              UI
            </div>
            <span className="text-sm font-semibold text-ink">{site.title[lang]}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t(lang, 'closeMenu')}
            className="btn btn--secondary btn--sm flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center p-0"
          >
            <CloseIcon width="16" height="16" />
          </button>
        </div>

        {/* Desktop Header Badge */}
        <div className="hidden shrink-0 items-center justify-between border-b border-line px-3 py-3 md:flex">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-action" />
            <span className="label text-muted">
              {t(lang, 'contents')}
            </span>
          </div>
          <span className="tag tag--neutral py-0 px-1.5 font-mono text-[10px]">
            {chapters.length} {lang === 'ar' ? 'فصل' : 'chapters'}
          </span>
        </div>

        {/* Navigation Content */}
        <nav className="flex-1 overflow-y-auto px-2 py-2">
          <ol className="space-y-1">
            {chapters.map((chapter, i) => {
              const active = chapter.id === activeChapterId
              const isGamified = gamifiedChapterIds.includes(chapter.id)
              return (
                <li key={chapter.id} className="group/item">
                  <a
                    href={hrefFor(chapter.id)}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center gap-2 rounded-control px-2.5 py-2 text-sm font-medium transition-all no-underline ${
                      active
                        ? 'bg-action-tint text-action font-semibold border border-action-tint-line'
                        : 'text-body hover:bg-ground hover:text-ink border border-transparent'
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded font-mono text-[11px] font-semibold transition-colors ${
                        active
                          ? 'bg-action text-white'
                          : 'bg-surface-sunken text-muted group-hover/item:text-body'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="truncate flex-1">{chapter.title[lang]}</span>
                    {isGamified && (
                      <span className="text-[11px] font-bold text-action" title={lang === 'ar' ? 'فصل تفاعلي لنقاط الخبرة' : 'Interactive XP chapter'}>
                        ⚡
                      </span>
                    )}
                  </a>

                  {/* Subsections under active chapter */}
                  {active && (
                    <ol className="ms-3 mt-1 space-y-0.5 border-s border-line ps-2.5">
                      {chapter.sections.map((section) => {
                        const current = section.id === activeSectionId
                        const done = completedSections.includes(`${chapter.id}--${section.id}`)
                        return (
                          <li key={section.id}>
                            <a
                              href={hrefFor(chapter.id, section.id)}
                              aria-current={current ? 'location' : undefined}
                              className={`-ms-px flex items-center justify-between border-s-2 py-1.5 pe-1.5 ps-2 text-xs leading-relaxed transition-all rounded-e no-underline ${
                                current
                                  ? 'border-action font-semibold text-action bg-action-tint/50'
                                  : 'border-transparent text-muted hover:border-line-strong hover:bg-ground hover:text-ink'
                              }`}
                            >
                              <span className="truncate">{section.title[lang]}</span>
                              {done && (
                                <span className="ms-2 font-bold text-success text-[11px]" title={lang === 'ar' ? 'مكتمل' : 'Completed'}>
                                  ✓
                                </span>
                              )}
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
        <div className="shrink-0 border-t border-line p-2">
          <a
            href="#/print"
            className="btn btn--secondary btn--sm w-full gap-2 text-xs"
          >
            <PrintIcon width="16" height="16" className="text-muted" />
            <span>{t(lang, 'printAll')}</span>
          </a>
        </div>
      </aside>
    </>
  )
}
