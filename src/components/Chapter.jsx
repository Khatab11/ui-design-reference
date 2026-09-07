import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { chapterIndex } from '../lib/content.js'
import { t } from '../lib/ui.js'
import { useSpeech } from '../context/SpeechContext.jsx'
import { VolumeIcon, PauseIcon, PlayIcon } from './Icons.jsx'
import Section from './Section.jsx'
import PrevNext from './PrevNext.jsx'

export function ChapterHeader({ chapter, lang }) {
  const number = String(chapterIndex(chapter.id) + 1).padStart(2, '0')
  const shouldReduceMotion = useReducedMotion()
  const {
    supported,
    status,
    isPlaying,
    isPaused,
    mode,
    currentChapter,
    playChapter,
    pause,
    resume,
  } = useSpeech()

  const isCurrentChapterActive =
    currentChapter?.id === chapter.id && mode === 'chapter' && status !== 'idle'
  const isCurrentChapterPlaying = isCurrentChapterActive && isPlaying
  const isCurrentChapterPaused = isCurrentChapterActive && isPaused

  const handleToggleSpeech = () => {
    if (isCurrentChapterPlaying) {
      pause()
    } else if (isCurrentChapterPaused) {
      resume()
    } else {
      playChapter(chapter, lang)
    }
  }

  return (
    <motion.header
      initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="min-w-0 border-b border-line pb-5 sm:pb-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="label text-muted">
          {t(lang, 'chapter')} {number}
        </p>

        {supported && (
          <button
            type="button"
            onClick={handleToggleSpeech}
            aria-label={
              isCurrentChapterPlaying
                ? t(lang, 'pause')
                : isCurrentChapterPaused
                  ? t(lang, 'resume')
                  : t(lang, 'listenChapter')
            }
            className={`btn btn--sm inline-flex items-center gap-2 transition-all ${
              isCurrentChapterActive
                ? 'bg-action text-white hover:bg-action-hover'
                : 'btn--secondary text-muted hover:text-ink'
            }`}
          >
            {isCurrentChapterPlaying ? (
              <PauseIcon width="15" height="15" />
            ) : isCurrentChapterPaused ? (
              <PlayIcon width="15" height="15" />
            ) : (
              <VolumeIcon width="15" height="15" />
            )}
            <span className="text-xs font-semibold">
              {isCurrentChapterPlaying
                ? t(lang, 'pause')
                : isCurrentChapterPaused
                  ? t(lang, 'resume')
                  : t(lang, 'listenChapter')}
            </span>
          </button>
        )}
      </div>
      <h1 className="mt-2 break-words text-[30px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink sm:text-[34px] sm:leading-[1.10]">
        {chapter.title[lang]}
      </h1>
      {chapter.intro?.[lang] && (
        <p className="mt-3 max-w-[70ch] break-words text-base leading-[1.7] text-body sm:text-[17px] sm:leading-[1.65]">{chapter.intro[lang]}</p>
      )}
    </motion.header>
  )
}

export default function Chapter({ chapter, lang, onActiveSection }) {
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
      className="mx-auto w-full max-w-prose md:mx-0"
    >
      <ChapterHeader chapter={chapter} lang={lang} />
      {chapter.sections.map((section) => (
        <Section key={section.id} chapter={chapter} section={section} lang={lang} />
      ))}
      <PrevNext chapter={chapter} lang={lang} />
    </motion.article>
  )
}
