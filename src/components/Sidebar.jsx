import { chapters } from '../lib/content.js'
import { hrefFor } from '../lib/hooks.js'
import { t } from '../lib/ui.js'
import { site } from '../config.js'
import { CloseIcon, PrintIcon } from './Icons.jsx'

export default function Sidebar({ lang, activeChapterId, activeSectionId, open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      <div
        aria-hidden
        onClick={onClose}
        className={`print-hidden fixed inset-0 z-40 bg-ink/40 transition-opacity md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        aria-label={t(lang, 'contents')}
        className={`print-hidden fixed inset-y-0 start-0 z-50 flex w-[280px] flex-col border-e border-line bg-surface transition-transform duration-200 ease-out md:top-[64px] md:z-20 ${
          open ? 'translate-x-0' : 'max-md:ltr:-translate-x-full max-md:rtl:translate-x-full'
        }`}
      >
        <div className="flex h-[64px] shrink-0 items-center justify-between px-3 md:hidden">
          <span className="text-base font-semibold text-ink">{site.title[lang]}</span>
          <button
            type="button"
            onClick={onClose}
            aria-label={t(lang, 'closeMenu')}
            className="-me-1 rounded p-1 text-ink-2 hover:bg-raised hover:text-ink"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-3 md:py-4">
          <p className="px-1.5 text-xs font-medium uppercase tracking-wide text-ink-3">
            {t(lang, 'contents')}
          </p>
          <ol className="mt-1.5">
            {chapters.map((chapter, i) => {
              const active = chapter.id === activeChapterId
              return (
                <li key={chapter.id} className="mt-0.5">
                  <a
                    href={hrefFor(chapter.id)}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-baseline gap-1.5 rounded px-1.5 py-1 text-sm transition-colors ${
                      active
                        ? 'bg-accent-soft font-medium text-accent-ink'
                        : 'text-ink-2 hover:bg-raised hover:text-ink'
                    }`}
                  >
                    <span className="w-2 shrink-0 font-mono text-xs text-ink-3">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{chapter.title[lang]}</span>
                  </a>
                  {active && (
                    <ol className="ms-2 mt-0.5 border-s border-line">
                      {chapter.sections.map((section) => {
                        const current = section.id === activeSectionId
                        return (
                          <li key={section.id}>
                            <a
                              href={hrefFor(chapter.id, section.id)}
                              aria-current={current ? 'location' : undefined}
                              className={`-ms-px block border-s-2 py-0.5 pe-1 ps-2 text-sm transition-colors ${
                                current
                                  ? 'border-accent text-ink'
                                  : 'border-transparent text-ink-2 hover:border-line-strong hover:text-ink'
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

        <div className="shrink-0 border-t border-line p-2">
          <a
            href="#/print"
            className="flex items-center gap-1 rounded px-1.5 py-1 text-sm text-ink-2 hover:bg-raised hover:text-ink"
          >
            <PrintIcon width="18" height="18" />
            <span>{t(lang, 'printAll')}</span>
          </a>
        </div>
      </aside>
    </>
  )
}
