import { t } from '../lib/ui.js'
import { site } from '../config.js'
import { MenuIcon, MoonIcon, SearchIcon, SunIcon } from './Icons.jsx'

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

export default function TopBar({ lang, theme, onToggleLang, onToggleTheme, onOpenSearch, onOpenMenu }) {
  return (
    <header className="print-hidden sticky top-0 z-30 h-[64px] border-b border-line bg-bg/90 backdrop-blur">
      <div className="flex h-full items-center gap-1 px-2 sm:px-3">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label={t(lang, 'openMenu')}
          className="rounded p-1 text-ink-2 hover:bg-raised hover:text-ink md:hidden"
        >
          <MenuIcon />
        </button>

        <a href="#/" className="flex min-w-0 items-baseline gap-1 rounded px-0.5">
          <span className="truncate text-base font-semibold text-ink">{site.title[lang]}</span>
          <span className="hidden text-sm text-ink-3 sm:inline">{site.subtitle[lang]}</span>
        </a>

        <div className="flex-1" />

        <button
          type="button"
          onClick={onOpenSearch}
          className="flex items-center gap-1 rounded border border-line bg-surface px-1.5 py-0.5 text-sm text-ink-2 transition-colors hover:border-line-strong hover:text-ink"
        >
          <SearchIcon width="18" height="18" />
          <span className="hidden sm:inline">{t(lang, 'search')}</span>
          <kbd className="hidden rounded-sm border border-line bg-raised px-0.5 text-xs text-ink-3 sm:inline">
            {isMac ? '⌘' : 'Ctrl'} K
          </kbd>
        </button>

        <button
          type="button"
          onClick={onToggleLang}
          aria-label={t(lang, 'switchLangLabel')}
          lang={lang === 'en' ? 'ar' : 'en'}
          className={`rounded px-1.5 py-0.5 text-sm font-medium text-ink-2 hover:bg-raised hover:text-ink ${
            lang === 'en' ? 'font-arabic' : 'font-sans'
          }`}
        >
          {t(lang, 'switchLang')}
        </button>

        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={t(lang, 'theme')}
          title={theme === 'dark' ? t(lang, 'light') : t(lang, 'dark')}
          className="rounded p-1 text-ink-2 hover:bg-raised hover:text-ink"
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  )
}
