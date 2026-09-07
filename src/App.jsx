import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { chapters, chapterById } from './lib/content.js'
import { useHashRoute, useLocalStorage } from './lib/hooks.js'
import { STORAGE_KEYS, site, DEFAULT_LANG, DEFAULT_THEME } from './config.js'
import { t } from './lib/ui.js'
import { stripMarkdown } from './lib/search.js'
import { sectionDomId } from './components/Section.jsx'
import TopBar from './components/TopBar.jsx'
import Sidebar from './components/Sidebar.jsx'
import Chapter from './components/Chapter.jsx'
import Search from './components/Search.jsx'
import PrintView from './components/PrintView.jsx'

function setMetaTag(attrName, attrValue, content) {
  if (content === undefined || content === null) return
  let el = document.querySelector(`meta[${attrName}="${attrValue}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attrName, attrValue)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLinkTag(rel, href) {
  if (!href) return
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function truncate(text = '', max = 160) {
  const clean = text.replace(/\s+/g, ' ').trim()
  return clean.length > max ? clean.slice(0, max - 1) + '…' : clean
}

export default function App() {
  const [lang, setLang] = useLocalStorage(STORAGE_KEYS.lang, DEFAULT_LANG)
  const [theme, setTheme] = useLocalStorage(STORAGE_KEYS.theme, DEFAULT_THEME)
  const route = useHashRoute()
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const isPrint = route.chapter === 'print'
  const chapter = chapterById.get(route.chapter) ?? chapters[0]

  // <html lang dir> + theme class
  useLayoutEffect(() => {
    const el = document.documentElement
    el.lang = lang
    el.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  // Document title and dynamic SEO & Open Graph Meta Tags
  useEffect(() => {
    const section = route.section
      ? chapter?.sections?.find((s) => s.id === route.section)
      : null

    const pageTitle = isPrint
      ? `${t(lang, 'printView')} · ${site.title[lang]}`
      : section
        ? `${section.title[lang]} · ${chapter?.title[lang]} · ${site.title[lang]}`
        : chapter
          ? `${chapter.title[lang]} · ${site.title[lang]}`
          : site.title[lang]

    document.title = pageTitle

    const rawDesc = isPrint
      ? t(lang, 'printViewNote')
      : section
        ? section.body[lang]
        : chapter?.intro?.[lang] || site.description?.[lang]

    const pageDesc = truncate(stripMarkdown(rawDesc || ''))

    // Image resolution: section asset -> first chapter asset
    const assetObj = section?.asset?.file
      ? section.asset
      : chapter?.sections?.find((s) => s.asset?.file)?.asset

    const imgUrl = assetObj?.file
      ? new URL(`/assets/${chapter.id}/${assetObj.file}`, window.location.origin).href
      : ''
    const imgAlt = assetObj?.alt?.[lang] || section?.title?.[lang] || chapter?.title?.[lang] || ''

    const currentUrl = window.location.href

    // Standard Meta
    setMetaTag('name', 'description', pageDesc)

    // Open Graph
    setMetaTag('property', 'og:site_name', site.title[lang])
    setMetaTag('property', 'og:title', pageTitle)
    setMetaTag('property', 'og:description', pageDesc)
    setMetaTag('property', 'og:type', isPrint ? 'website' : 'article')
    setMetaTag('property', 'og:url', currentUrl)
    setMetaTag('property', 'og:locale', lang === 'ar' ? 'ar_AR' : 'en_US')
    setMetaTag('property', 'og:locale:alternate', lang === 'ar' ? 'en_US' : 'ar_AR')

    if (imgUrl) {
      setMetaTag('property', 'og:image', imgUrl)
      setMetaTag('property', 'og:image:alt', imgAlt)
    }

    // Twitter Card
    setMetaTag('name', 'twitter:card', imgUrl ? 'summary_large_image' : 'summary')
    setMetaTag('name', 'twitter:title', pageTitle)
    setMetaTag('name', 'twitter:description', pageDesc)
    if (imgUrl) {
      setMetaTag('name', 'twitter:image', imgUrl)
      setMetaTag('name', 'twitter:image:alt', imgAlt)
    }

    // Canonical link
    setLinkTag('canonical', currentUrl)
  }, [lang, chapter, route.section, isPrint])

  // Scroll on navigation (chapter or section). route.n changes on every
  // navigation, including repeats of the same hash.
  useEffect(() => {
    setMenuOpen(false)
    if (isPrint || !chapter) return
    if (route.section) {
      const el = document.getElementById(sectionDomId(chapter.id, route.section))
      if (el) {
        el.scrollIntoView({ block: 'start' })
        setActiveSection(route.section)
        return
      }
    }
    window.scrollTo({ top: 0 })
  }, [route.chapter, route.section, route.n, isPrint, chapter])

  // Cmd/Ctrl+K opens search
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Lock body scroll while a layer is open on top of the page.
  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen, searchOpen])

  const onActiveSection = useCallback((id) => setActiveSection(id), [])
  const toggleLang = () => setLang((l) => (l === 'en' ? 'ar' : 'en'))
  const toggleTheme = () => setTheme((th) => (th === 'dark' ? 'light' : 'dark'))

  if (chapters.length === 0) {
    return (
      <main className="mx-auto max-w-prose p-4 text-ink">
        <p>No chapters found. Add a JSON file to <code>/content</code>.</p>
      </main>
    )
  }

  return (
    <div className="min-h-screen" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <TopBar
        lang={lang}
        theme={theme}
        onToggleLang={toggleLang}
        onToggleTheme={toggleTheme}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenMenu={() => setMenuOpen(true)}
      />

      {isPrint ? (
        <main>
          <PrintView lang={lang} />
        </main>
      ) : (
        <>
          <Sidebar
            lang={lang}
            activeChapterId={chapter.id}
            activeSectionId={activeSection}
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
          />
          <main className="min-w-0 md:ms-[272px]">
            <div className="px-3 pb-12 pt-5 min-[360px]:px-4 sm:px-6 sm:pb-16 sm:pt-6 md:pe-8 md:ps-[150px]">
              <Chapter key={chapter.id} chapter={chapter} lang={lang} onActiveSection={onActiveSection} />
            </div>
          </main>
        </>
      )}

      <Search lang={lang} open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
