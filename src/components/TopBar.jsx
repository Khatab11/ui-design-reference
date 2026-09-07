import { t } from '../lib/ui.js'
import { site } from '../config.js'
import { MenuIcon, MoonIcon, SearchIcon, SunIcon } from './Icons.jsx'

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

export default function TopBar({ lang, theme, onToggleLang, onToggleTheme, onOpenSearch, onOpenMenu }) {
  return (
    <header className="print-hidden sticky top-0 z-30 h-[64px] border-b border-line/70 bg-ground/85 backdrop-blur-xl transition-colors dark:border-line/40 dark:bg-ground/80">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between gap-2 px-3 sm:gap-4 sm:px-6">
        {/* Left / Brand Area */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label={t(lang, 'openMenu')}
            className="btn btn--secondary btn--icon text-ink md:hidden transition-transform active:scale-95"
          >
            <MenuIcon width="18" height="18" />
          </button>

          <a href="#/" className="group flex min-w-0 items-center gap-2.5 py-1 text-ink no-underline hover:text-ink">
            {/* Tech Logo Mark with Apple-grade squircle */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-action text-white shadow-xs transition-transform duration-150 group-hover:scale-105 active:scale-95">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="7" height="7" x="3" y="3" rx="1.5" />
                <rect width="7" height="7" x="14" y="3" rx="1.5" />
                <rect width="7" height="7" x="14" y="14" rx="1.5" />
                <rect width="7" height="7" x="3" y="14" rx="1.5" />
              </svg>
            </div>

            <div className="flex min-w-0 flex-col">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="truncate text-sm sm:text-base font-semibold tracking-tight text-ink">
                  {site.title[lang]}
                </span>
                <span className="hidden sm:inline-flex items-center rounded-full bg-surface-sunken px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted border border-line">
                  v1.0
                </span>
              </div>
              <span className="hidden truncate text-xs text-muted lg:inline">
                {site.subtitle[lang]}
              </span>
            </div>
          </a>
        </div>

        {/* Center / Search Trigger — Full pill on sm+, compact icon on mobile */}
        <div className="hidden sm:flex max-w-[360px] flex-1 justify-center mx-2">
          <button
            type="button"
            onClick={onOpenSearch}
            className="search group flex h-10 w-full cursor-pointer items-center gap-2.5 rounded-full border border-line/80 bg-surface/80 px-3.5 text-start text-xs text-muted shadow-xs transition-all hover:border-line-hover hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action"
          >
            <SearchIcon width="16" height="16" className="shrink-0 text-muted transition-colors group-hover:text-ink" />
            <span className="flex-1 truncate text-sm font-normal text-muted">{t(lang, 'search')}...</span>
            <kbd className="inline-flex items-center gap-0.5 rounded-md border border-line-strong/60 bg-surface-sunken px-1.5 py-0.5 font-mono text-[10px] font-semibold text-muted shadow-2xs">
              {isMac ? '⌘' : 'Ctrl'} K
            </kbd>
          </button>
        </div>

        {/* Right / Controls Area */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Mobile search trigger icon */}
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label={t(lang, 'search')}
            className="btn btn--secondary btn--icon sm:hidden text-muted hover:text-ink transition-transform active:scale-95"
          >
            <SearchIcon width="17" height="17" />
          </button>

          {/* Cards Showcase Direct Link */}
          <a
            href="#cards"
            className="hidden lg:inline-flex items-center gap-1.5 rounded-xl border border-line/80 bg-surface/60 px-3 py-1.5 text-xs font-semibold text-ink shadow-2xs transition-all hover:border-line-hover hover:bg-surface active:scale-95"
            title="Interactive Card Patterns"
          >
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span>{lang === 'ar' ? 'نمط البطاقات' : 'Cards'}</span>
          </a>

          {/* Landing Stage Link */}
          <a
            href={`/education-landing.html${lang === 'ar' ? '?lang=ar' : ''}`}
            className="btn btn--secondary btn--sm hidden md:inline-flex items-center gap-1.5 rounded-xl px-3 text-xs font-semibold transition-transform active:scale-95"
            title={t(lang, 'landing')}
          >
            <span>{t(lang, 'landing')}</span>
            <span className="text-muted text-[10px]" aria-hidden="true">↗</span>
          </a>

          {/* Sign In / Auth Direct Link */}
          <a
            href="#/login"
            className="btn btn--primary btn--sm flex items-center gap-1.5 rounded-xl px-3 text-xs font-semibold shadow-xs transition-all active:scale-95 no-underline"
            title={t(lang, 'signIn')}
          >
            <span>{t(lang, 'signIn')}</span>
          </a>

          {/* Language Switch */}
          <button
            type="button"
            onClick={onToggleLang}
            aria-label={t(lang, 'switchLangLabel')}
            lang={lang === 'en' ? 'ar' : 'en'}
            className={`btn btn--secondary btn--sm flex items-center gap-1.5 rounded-xl px-2.5 sm:px-3 transition-transform active:scale-95 ${
              lang === 'en' ? 'font-arabic' : 'font-sans'
            }`}
          >
            <svg className="h-4 w-4 text-muted shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
            </svg>
            <span className="hidden sm:inline text-xs font-semibold">{t(lang, 'switchLang')}</span>
            <span className="sm:hidden text-xs font-bold font-mono">{lang === 'en' ? 'AR' : 'EN'}</span>
          </button>

          <div className="hidden h-5 w-px bg-line/80 sm:block" />

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={t(lang, 'theme')}
            title={theme === 'dark' ? t(lang, 'light') : t(lang, 'dark')}
            className="btn btn--secondary btn--icon text-ink transition-transform active:scale-95"
          >
            {theme === 'dark' ? <SunIcon width="17" height="17" /> : <MoonIcon width="17" height="17" />}
          </button>
        </div>
      </div>
    </header>
  )
}
