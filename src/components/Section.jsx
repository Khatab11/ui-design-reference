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
      className="scroll-mt-[88px] pt-10"
    >
      <h2 className="group flex items-center gap-1.5 text-[22px] font-semibold leading-[1.25] tracking-[-0.01em] text-ink">
        <span>{section.title[lang]}</span>
        <a
          href={hrefFor(chapter.id, section.id)}
          aria-label={t(lang, 'linkToSection')}
          className="print-hidden inline-flex h-9 w-9 min-h-[36px] min-w-[36px] items-center justify-center text-muted no-underline opacity-0 transition-all duration-150 hover:text-action focus-visible:opacity-100 group-hover:opacity-100 rounded-control"
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
