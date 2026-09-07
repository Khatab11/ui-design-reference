import { t } from '../lib/ui.js'
import { site } from '../config.js'
import { MenuIcon, MoonIcon, SearchIcon, SunIcon } from './Icons.jsx'

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

export default function TopBar({ lang, theme, onToggleLang, onToggleTheme, onOpenSearch, onOpenMenu }) {
  return (
    <header className="print-hidden sticky top-0 z-30 h-[64px] border-b border-line bg-ground/90 backdrop-blur-md transition-colors">
      <div className="flex h-full min-w-0 items-center gap-2 px-2 sm:gap-3 sm:px-4 md:px-6">
        {/* Left / Brand Area */}
        <div className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label={t(lang, 'openMenu')}
            className="btn btn--secondary btn--sm flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center p-0 md:hidden"
          >
            <MenuIcon width="18" height="18" />
          </button>

          <a href="#/" aria-label={site.title[lang]} className="group flex min-w-0 items-center gap-2.5 py-1 text-ink no-underline hover:text-ink">
            {/* Tech Logo Mark */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-action text-white transition-transform group-hover:scale-105">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="7" height="7" x="3" y="3" rx="1.5" />
                <rect width="7" height="7" x="14" y="3" rx="1.5" />
                <rect width="7" height="7" x="14" y="14" rx="1.5" />
                <rect width="7" height="7" x="3" y="14" rx="1.5" />
              </svg>
            </div>

            <div className="hidden min-w-0 flex-col lg:flex">
              <div className="flex items-center gap-2">
                <span className="truncate text-[17px] font-semibold tracking-tight text-ink">
                  {site.title[lang]}
                </span>
                <span className="tag tag--neutral hidden px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider xl:inline-flex">
                  v1.0
                </span>
              </div>
              <span className="hidden truncate text-xs text-muted xl:inline">
                {site.subtitle[lang]}
              </span>
            </div>
          </a>
        </div>

        {/* Center / Search Trigger — strictly pill shaped per §5 */}
        <div className="flex min-w-0 flex-1 justify-end sm:justify-center md:mx-2 md:max-w-[360px]">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label={t(lang, 'search')}
            className="search h-11 w-11 shrink-0 cursor-pointer justify-center p-0 text-start text-xs text-muted hover:border-line-hover sm:w-full sm:min-w-0 sm:justify-start sm:px-3"
          >
            <SearchIcon width="16" height="16" className="shrink-0 text-muted" />
            <span className="hidden min-w-0 flex-1 truncate text-sm font-normal text-muted sm:block">{t(lang, 'search')}...</span>
            <kbd className="hidden items-center gap-0.5 rounded border border-line-strong bg-surface-sunken px-1.5 py-0.5 font-mono text-[10px] font-semibold text-muted md:inline-flex">
              {isMac ? '⌘' : 'Ctrl'} K
            </kbd>
          </button>
        </div>

        {/* Right / Controls Area */}
        <div className="flex shrink-0 items-center gap-2">
          {/* Language Switch */}
          <button
            type="button"
            onClick={onToggleLang}
            aria-label={t(lang, 'switchLangLabel')}
            lang={lang === 'en' ? 'ar' : 'en'}
            className={`btn btn--secondary btn--sm h-11 w-11 min-h-[44px] min-w-[44px] gap-0 p-0 sm:w-auto sm:gap-2 sm:px-3.5 ${
              lang === 'en' ? 'font-arabic' : 'font-sans'
            }`}
          >
            <svg className="hidden h-4 w-4 text-muted sm:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
            </svg>
            <span className="text-[11px] font-bold uppercase sm:hidden">{lang === 'en' ? 'AR' : 'EN'}</span>
            <span className="hidden text-xs font-semibold sm:inline">{t(lang, 'switchLang')}</span>
          </button>

          {/* Gamification Demo Shortcut */}
          <a
            href="#/gamification"
            className="btn btn--primary btn--sm !min-h-[44px] !px-3 !gap-1.5 font-bold text-xs !rounded-full shadow-xs active:scale-[0.96]"
            title={lang === 'ar' ? 'استعراض نظام التلعيب التفاعلي' : 'View Gamification Showcase'}
          >
            <span>🏆</span>
            <span className="hidden sm:inline">{lang === 'ar' ? 'نظام التلعيب' : 'Gamification'}</span>
          </a>

          <div className="hidden h-5 w-px bg-line sm:block" />

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={t(lang, 'theme')}
            title={theme === 'dark' ? t(lang, 'light') : t(lang, 'dark')}
            className="btn btn--secondary btn--sm flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center p-0"
          >
            {theme === 'dark' ? <SunIcon width="18" height="18" /> : <MoonIcon width="18" height="18" />}
          </button>
        </div>
      </div>
    </header>
  )
}
