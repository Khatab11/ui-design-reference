import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { chapterIndex } from '../lib/content.js'
import { t } from '../lib/ui.js'
import Section from './Section.jsx'
import PrevNext from './PrevNext.jsx'

export function ChapterHeader({ chapter, lang }) {
  const number = String(chapterIndex(chapter.id) + 1).padStart(2, '0')
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.header
      initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="border-b border-line/70 pb-8"
    >
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center rounded-full border border-line bg-surface-sunken px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-muted">
          {t(lang, 'chapter')} {number}
        </span>
      </div>
      <h1 className="mt-3 text-2xl sm:text-3xl md:text-[38px] font-semibold leading-[1.12] tracking-[-0.025em] text-ink">
        {chapter.title[lang]}
      </h1>
      {chapter.intro?.[lang] && (
        <p className="mt-3.5 max-w-[68ch] text-[16px] sm:text-[17px] leading-[1.7] text-body">{chapter.intro[lang]}</p>
      )}
    </motion.header>
  )
}

export default function Chapter({ chapter, lang, onActiveSection }) {
  const ref = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  // Active-section tracking: topmost section intersecting near top wins
  useEffect(() => {
    const root = ref.current
    if (!root || !('IntersectionObserver' in window)) return
    const nodes = Array.from(root.querySelectorAll('section[data-section-id]'))
    const visible = new Set()
    const update = () => {
      const first = nodes.find((n) => visible.has(n))
      if (first) onActiveSection(first.dataset.sectionId)
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target)
          else visible.delete(e.target)
        }
        update()
      },
      { rootMargin: '-80px 0px -55% 0px', threshold: 0 },
    )
    nodes.forEach((n) => io.observe(n))
    if (nodes[0]) onActiveSection(nodes[0].dataset.sectionId)
    return () => io.disconnect()
  }, [chapter.id, onActiveSection])

  return (
    <motion.article
      key={chapter.id}
      ref={ref}
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="mx-auto w-full max-w-[800px]"
    >
      <ChapterHeader chapter={chapter} lang={lang} />
      <div className="space-y-2">
        {chapter.sections.map((section) => (
          <Section key={section.id} chapter={chapter} section={section} lang={lang} />
        ))}
      </div>
      <PrevNext chapter={chapter} lang={lang} />
    </motion.article>
  )
}
