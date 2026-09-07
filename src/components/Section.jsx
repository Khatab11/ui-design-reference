import { hrefFor } from '../lib/hooks.js'
import { t } from '../lib/ui.js'
import Asset from './Asset.jsx'
import Callout from './Callout.jsx'
import Markdown from './Markdown.jsx'
import { LinkIcon } from './Icons.jsx'
import { motion, useReducedMotion } from 'framer-motion'

export function sectionDomId(chapterId, sectionId) {
  return `${chapterId}--${sectionId}`
}

export default function Section({ chapter, section, lang, eagerAssets = false, liveAssets = true }) {
  const domId = sectionDomId(chapter.id, section.id)
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.section
      id={domId}
      data-section-id={section.id}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="scroll-mt-[88px] pt-6"
    >
      <h2 className="group flex items-baseline gap-1 text-xl font-semibold tracking-tight text-ink">
        <span>{section.title[lang]}</span>
        <a
          href={hrefFor(chapter.id, section.id)}
          aria-label={t(lang, 'linkToSection')}
          className="print-hidden self-center text-ink-3 opacity-0 transition-all duration-150 hover:text-accent hover:scale-110 active:scale-95 focus-visible:opacity-100 group-hover:opacity-100"
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
    </motion.section>
  )
}
