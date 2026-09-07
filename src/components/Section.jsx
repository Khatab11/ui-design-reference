import { hrefFor } from '../lib/hooks.js'
import { t } from '../lib/ui.js'
import Asset from './Asset.jsx'
import Callout from './Callout.jsx'
import Markdown from './Markdown.jsx'
import { LinkIcon } from './Icons.jsx'

export function sectionDomId(chapterId, sectionId) {
  return `${chapterId}--${sectionId}`
}

export default function Section({ chapter, section, lang, eagerAssets = false, liveAssets = true }) {
  const domId = sectionDomId(chapter.id, section.id)
  return (
    <section id={domId} data-section-id={section.id} className="scroll-mt-[88px] pt-6">
      <h2 className="group flex items-baseline gap-1 text-xl font-semibold tracking-tight text-ink">
        <span>{section.title[lang]}</span>
        <a
          href={hrefFor(chapter.id, section.id)}
          aria-label={t(lang, 'linkToSection')}
          className="print-hidden self-center text-ink-3 opacity-0 transition-opacity hover:text-accent focus-visible:opacity-100 group-hover:opacity-100"
        >
          <LinkIcon width="16" height="16" />
        </a>
      </h2>
      <div className="mt-2">
        <Markdown>{section.body[lang]}</Markdown>
      </div>
      {section.asset && (
        <Asset chapterId={chapter.id} asset={section.asset} lang={lang} eager={eagerAssets} live={liveAssets} />
      )}
      {section.callout && <Callout callout={section.callout} lang={lang} />}
    </section>
  )
}
