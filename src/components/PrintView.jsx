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
    <div className="print-main mx-auto w-full max-w-prose px-4 py-8">
      <div className="print-hidden mb-8 flex flex-wrap items-center justify-between gap-4 card">
        <div>
          <p className="text-[17px] font-semibold text-ink">{t(lang, 'printView')}</p>
          <p className="text-sm text-body">{t(lang, 'printViewNote')}</p>
        </div>
        <div className="flex items-center gap-2">
          <a href="#/" className="btn btn--secondary btn--sm gap-2">
            <ArrowIcon width="16" height="16" className="rotate-180 rtl:rotate-0" />
            <span>{t(lang, 'backToReference')}</span>
          </a>
          <button
            type="button"
            onClick={() => window.print()}
            className="btn btn--primary btn--sm gap-2"
          >
            <PrintIcon width="16" height="16" />
            <span>PDF</span>
          </button>
        </div>
      </div>

      <h1 className="text-[34px] font-semibold leading-[1.10] tracking-[-0.02em] text-ink">{site.title[lang]}</h1>
      <p className="mt-2 text-[17px] leading-[1.65] text-body">{site.subtitle[lang]}</p>

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
