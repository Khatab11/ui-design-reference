import { chapters } from '../lib/content.js'
import { t } from '../lib/ui.js'
import { site } from '../config.js'
import { ChapterHeader } from './Chapter.jsx'
import Section from './Section.jsx'
import { ArrowIcon, PrintIcon } from './Icons.jsx'

// Renders every chapter in order with eager images. Pair with the @media
// print rules in index.css to get a clean PDF from the browser.
export default function PrintView({ lang }) {
  return (
    <div className="print-main mx-auto w-full max-w-prose px-2 py-4 sm:px-3">
      <div className="print-hidden mb-6 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-line bg-surface p-2">
        <div>
          <p className="text-base font-medium text-ink">{t(lang, 'printView')}</p>
          <p className="text-sm text-ink-2">{t(lang, 'printViewNote')}</p>
        </div>
        <div className="flex gap-1">
          <a href="#/" className="flex items-center gap-1 rounded border border-line px-1.5 py-0.5 text-sm text-ink-2 hover:text-ink">
            <ArrowIcon width="16" height="16" className="rotate-180 rtl:rotate-0" />
            {t(lang, 'backToReference')}
          </a>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-1 rounded bg-accent px-1.5 py-0.5 text-sm font-medium text-bg hover:bg-accent-ink"
          >
            <PrintIcon width="16" height="16" />
            PDF
          </button>
        </div>
      </div>

      <h1 className="text-3xl font-semibold tracking-tight text-ink">{site.title[lang]}</h1>
      <p className="mt-1 text-lg text-ink-2">{site.subtitle[lang]}</p>

      {chapters.map((chapter, i) => (
        <article key={chapter.id} className={`mt-10 ${i > 0 ? 'print-break' : ''}`}>
          <ChapterHeader chapter={chapter} lang={lang} />
          {chapter.sections.map((section) => (
            <Section key={section.id} chapter={chapter} section={section} lang={lang} eagerAssets liveAssets={false} />
          ))}
        </article>
      ))}
    </div>
  )
}
