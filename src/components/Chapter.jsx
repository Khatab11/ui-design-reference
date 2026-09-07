import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { chapterIndex } from '../lib/content.js'
import { t } from '../lib/ui.js'
import { useSpeech } from '../context/SpeechContext.jsx'
import { VolumeIcon, PauseIcon, PlayIcon } from './Icons.jsx'
import Section from './Section.jsx'
import PrevNext from './PrevNext.jsx'

export function ChapterHeader({ chapter, lang, isGamified = false, isSaved = false, onToggleSaved }) {
  const number = String(chapterIndex(chapter.id) + 1).padStart(2, '0')
  const shouldReduceMotion = useReducedMotion()
  const { supported, status, isPlaying, isPaused, mode, currentChapter, playChapter, pause, resume } = useSpeech()
  const isCurrentChapter = currentChapter?.id === chapter.id && mode === 'chapter' && status !== 'idle'
  const toggleSpeech = () => {
    if (isCurrentChapter && isPlaying) pause()
    else if (isCurrentChapter && isPaused) resume()
    else playChapter(chapter, lang)
  }

  return (
    <motion.header
      initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="border-b border-line pb-6"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="label text-muted">{t(lang, 'chapter')} {number}</p>
        <div className="flex items-center gap-2">
          {isGamified && <span className="tag tag--info text-xs font-bold">⚡ +15 XP</span>}
          <button type="button" onClick={onToggleSaved} className="btn btn--secondary btn--sm" aria-pressed={isSaved}>{isSaved ? (lang === 'ar' ? '★ محفوظ' : '★ Saved') : (lang === 'ar' ? '☆ حفظ الفصل' : '☆ Save chapter')}</button>
          {supported && (
            <button
              type="button"
              onClick={toggleSpeech}
              className={`btn btn--sm ${isCurrentChapter ? 'btn--primary' : 'btn--secondary'}`}
              aria-label={isCurrentChapter && isPlaying ? t(lang, 'pause') : isCurrentChapter && isPaused ? t(lang, 'resume') : t(lang, 'listenChapter')}
            >
              {isCurrentChapter && isPlaying ? <PauseIcon width="15" height="15" /> : isCurrentChapter && isPaused ? <PlayIcon width="15" height="15" /> : <VolumeIcon width="15" height="15" />}
              <span>{isCurrentChapter && isPlaying ? t(lang, 'pause') : isCurrentChapter && isPaused ? t(lang, 'resume') : t(lang, 'listenChapter')}</span>
            </button>
          )}
        </div>
      </div>
      <h1 className="mt-2 text-[34px] font-semibold leading-[1.10] tracking-[-0.02em] text-ink">
        {chapter.title[lang]}
      </h1>
      {chapter.intro?.[lang] && (
        <p className="mt-3 max-w-[70ch] text-[17px] leading-[1.65] text-body">{chapter.intro[lang]}</p>
      )}
    </motion.header>
  )
}

export default function Chapter({ chapter, lang, onActiveSection, isGamified, completedSections = [], onCompleteSection, isSaved, onToggleSaved }) {
  const ref = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  // Active-section tracking: the topmost section intersecting a band near the
  // top of the viewport wins.
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
      className="mx-auto w-full max-w-prose"
    >
      <ChapterHeader chapter={chapter} lang={lang} isGamified={isGamified} isSaved={isSaved} onToggleSaved={onToggleSaved} />
      {chapter.sections.map((section) => (
        <Section
          key={section.id}
          chapter={chapter}
          section={section}
          lang={lang}
          isGamified={isGamified}
          isCompleted={completedSections.includes(`${chapter.id}--${section.id}`)}
          onComplete={onCompleteSection}
        />
      ))}
      <PrevNext chapter={chapter} lang={lang} />
    </motion.article>
  )
}
