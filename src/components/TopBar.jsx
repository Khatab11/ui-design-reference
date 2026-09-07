import { t } from '../lib/ui.js'
import { site } from '../config.js'
import { MenuIcon, MoonIcon, SearchIcon, SunIcon } from './Icons.jsx'

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

export default function TopBar({ lang, theme, onToggleLang, onToggleTheme, onOpenSearch, onOpenMenu }) {
  return (
    <header className="print-hidden sticky top-0 z-30 h-[64px] border-b border-line/70 bg-bg/80 backdrop-blur-xl backdrop-saturate-150 transition-colors">
      <div className="flex h-full items-center justify-between gap-2 px-3 sm:px-4 md:px-6">
        {/* Left / Brand Area */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label={t(lang, 'openMenu')}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-line/70 bg-surface/60 text-ink-2 transition-all hover:border-line-strong hover:bg-raised hover:text-ink active:scale-95 md:hidden"
          >
            <MenuIcon width="18" height="18" />
          </button>

          <a href="#/" className="group flex min-w-0 items-center gap-2.5 rounded-lg py-1 transition-opacity hover:opacity-90">
            {/* Tech Logo Mark */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-gradient-to-br from-accent/20 to-accent/5 text-accent shadow-xs transition-transform group-hover:scale-105">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="7" height="7" x="3" y="3" rx="1.5" />
                <rect width="7" height="7" x="14" y="3" rx="1.5" />
                <rect width="7" height="7" x="14" y="14" rx="1.5" />
                <rect width="7" height="7" x="3" y="14" rx="1.5" />
              </svg>
            </div>

            <div className="flex min-w-0 flex-col">
              <div className="flex items-center gap-2">
                <span className="truncate text-base font-semibold tracking-tight text-ink">
                  {site.title[lang]}
                </span>
                <span className="hidden rounded-full border border-line-strong/50 bg-raised/80 px-1.5 py-0.2 font-mono text-[10px] font-medium uppercase tracking-wider text-ink-3 sm:inline-block">
                  v1.0
                </span>
              </div>
              <span className="hidden truncate text-xs text-ink-3 lg:inline">
                {site.subtitle[lang]}
              </span>
            </div>
          </a>
        </div>

        {/* Center / Search Trigger (Modern Command Bar Look) */}
        <div className="flex flex-1 justify-center max-w-[360px] mx-2">
          <button
            type="button"
            onClick={onOpenSearch}
            className="group flex w-full items-center justify-between gap-2 rounded-xl border border-line/80 bg-surface/60 px-3 py-1.5 text-xs text-ink-2 shadow-xs backdrop-blur-sm transition-all hover:border-accent/40 hover:bg-surface hover:text-ink hover:shadow-sm"
          >
            <div className="flex items-center gap-2 truncate">
              <SearchIcon width="16" height="16" className="shrink-0 text-ink-3 transition-colors group-hover:text-accent" />
              <span className="truncate font-normal">{t(lang, 'search')}...</span>
            </div>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-md border border-line/90 bg-raised/80 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-ink-3 shadow-2xs group-hover:border-line-strong group-hover:text-ink-2">
              {isMac ? '⌘' : 'Ctrl'} K
            </kbd>
          </button>
        </div>

        {/* Right / Controls Area */}
        <div className="flex items-center gap-1.5">
          {/* Language Switch */}
          <button
            type="button"
            onClick={onToggleLang}
            aria-label={t(lang, 'switchLangLabel')}
            lang={lang === 'en' ? 'ar' : 'en'}
            className={`flex items-center gap-1 rounded-lg border border-line/70 bg-surface/60 px-2.5 py-1 text-xs font-medium text-ink-2 shadow-xs transition-all hover:border-line-strong hover:bg-raised hover:text-ink active:scale-95 ${
              lang === 'en' ? 'font-arabic' : 'font-sans'
            }`}
          >
            <svg className="h-3.5 w-3.5 text-ink-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
            </svg>
            <span>{t(lang, 'switchLang')}</span>
          </button>

          <div className="hidden h-4 w-px bg-line/70 sm:block mx-0.5" />

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={t(lang, 'theme')}
            title={theme === 'dark' ? t(lang, 'light') : t(lang, 'dark')}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-line/70 bg-surface/60 text-ink-2 shadow-xs transition-all hover:border-line-strong hover:bg-raised hover:text-ink active:scale-95"
          >
            {theme === 'dark' ? <SunIcon width="17" height="17" /> : <MoonIcon width="17" height="17" />}
          </button>
        </div>
      </div>
    </header>
  )
}
