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
        <div className="hidden shrink-0 items-center justify-between border-b border-line px-4 py-4 md:flex">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-action text-white rounded-lg grid grid-cols-2 gap-0.5 p-1 shadow-sm">
                <div className="bg-white/90 rounded-[2px]"></div>
                <div className="bg-white rounded-[2px]"></div>
                <div className="border border-white/60 rounded-[2px]"></div>
                <div className="border border-white/60 rounded-[2px]"></div>
            </div>
            <div>
              <div className="font-bold text-[15px] leading-tight tracking-tight text-ink">UI Design Reference</div>
              <div className="flex items-center mt-0.5">
                <span className="text-[9px] text-muted uppercase tracking-wider font-medium">Course companion</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Content */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <a href="#/" className={`flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition-colors no-underline ${!activeChapterId ? 'bg-action-tint text-action' : 'text-body hover:bg-ground hover:text-ink'}`}>
            <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.99 8.99a.75.75 0 1 1-1.06 1.06L20 13.432V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6.568l-.46.46a.75.75 0 1 1-1.06-1.06l8.99-8.99Z"/></svg>
            <span>{lang === 'ar' ? 'نظرة عامة' : 'Overview'}</span>
          </a>
          <a href="#/" className="flex items-center gap-3 px-3 py-2 text-muted hover:bg-ground hover:text-ink rounded-lg transition-colors font-medium no-underline">
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16l-7-3.5L5 21V5Z"/></svg>
            <span>{lang === 'ar' ? 'الفصول المحفوظة' : 'Saved chapters'}</span>
          </a>
          <a href="#/" className="flex items-center gap-3 px-3 py-2 text-muted hover:bg-ground hover:text-ink rounded-lg transition-colors font-medium no-underline">
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/></svg>
            <span>{lang === 'ar' ? 'إعدادات القراءة' : 'Reading settings'}</span>
          </a>

          <div className="mt-8 mb-2 px-3 text-[11px] font-semibold text-muted uppercase tracking-wider">
            {lang === 'ar' ? 'الفصول' : 'Chapters'}
          </div>

          <ol className="space-y-1">
            {chapters.map((chapter, i) => {
              const active = chapter.id === activeChapterId
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
                          ? 'text-action'
                          : 'text-muted group-hover/item:text-body'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="truncate">{chapter.title[lang]}</span>
                  </a>

                  {/* Subsections under active chapter */}
                  {active && (
                    <ol className="ms-3 mt-1 space-y-0.5 border-s border-line ps-2.5">
                      {chapter.sections.map((section) => {
                        const current = section.id === activeSectionId
                        return (
                          <li key={section.id}>
                            <a
                              href={hrefFor(chapter.id, section.id)}
                              aria-current={current ? 'location' : undefined}
                              className={`-ms-px block border-s-2 py-1.5 pe-1.5 ps-2 text-xs leading-relaxed transition-all rounded-e no-underline ${
                                current
                                  ? 'border-action font-semibold text-action bg-action-tint/50'
                                  : 'border-transparent text-muted hover:border-line-strong hover:bg-ground hover:text-ink'
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
