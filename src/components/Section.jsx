import { hrefFor } from '../lib/hooks.js'
import { t } from '../lib/ui.js'
import Asset from './Asset.jsx'
import Callout from './Callout.jsx'
import Markdown from './Markdown.jsx'
import { LinkIcon, VolumeIcon, PauseIcon, PlayIcon } from './Icons.jsx'
import { motion, useReducedMotion } from 'framer-motion'
import SectionAction from './gamification/SectionAction.jsx'
import { useSpeech } from '../context/SpeechContext.jsx'

export function sectionDomId(chapterId, sectionId) {
  return `${chapterId}--${sectionId}`
}

export default function Section({
  chapter,
  section,
  lang,
  eagerAssets = false,
  liveAssets = true,
  isGamified = false,
  isCompleted = false,
  onComplete,
}) {
  const domId = sectionDomId(chapter.id, section.id)
  const shouldReduceMotion = useReducedMotion()
  const {
    supported,
    status,
    isPlaying,
    isPaused,
    currentChapter,
    currentSectionId,
    playSection,
    pause,
    resume,
  } = useSpeech()

  const isCurrentSectionActive =
    currentChapter?.id === chapter.id && currentSectionId === section.id && status !== 'idle'
  const isCurrentSectionPlaying = isCurrentSectionActive && isPlaying
  const isCurrentSectionPaused = isCurrentSectionActive && isPaused

  const handleToggleSpeech = () => {
    if (isCurrentSectionPlaying) {
      pause()
    } else if (isCurrentSectionPaused) {
      resume()
    } else {
      playSection(chapter, section, lang)
    }
  }

  return (
    <motion.section
      id={domId}
      data-section-id={section.id}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`chapter-section min-w-0 scroll-mt-[88px] border-s-2 ps-3 sm:ps-4 -ms-3 sm:-ms-4 transition-all duration-200 ${
        isCurrentSectionActive
          ? 'border-action bg-action-tint/15 rounded-e-card'
          : 'border-transparent'
      }`}
    >
      <h2 className="group flex min-w-0 items-start gap-1.5 text-[20px] font-semibold leading-[1.3] tracking-[-0.01em] text-ink sm:text-[22px] sm:leading-[1.25]">
        <span className="min-w-0 flex-1 break-words">
          {section.title[lang]}
          {isCurrentSectionActive && (
            <span className="ms-2.5 inline-flex items-center gap-1.5 rounded-tag bg-action-tint px-2 py-0.5 align-middle font-mono text-[11px] font-medium text-action">
              <span
                className={`h-1.5 w-1.5 rounded-full bg-action ${
                  isCurrentSectionPlaying ? 'animate-pulse' : ''
                }`}
              />
              {t(lang, 'nowReading')}
            </span>
          )}
        </span>

        {supported && (
          <button
            type="button"
            onClick={handleToggleSpeech}
            aria-label={
              isCurrentSectionPlaying
                ? t(lang, 'pause')
                : isCurrentSectionPaused
                  ? t(lang, 'resume')
                  : t(lang, 'listenSection')
            }
            title={
              isCurrentSectionPlaying
                ? t(lang, 'pause')
                : isCurrentSectionPaused
                  ? t(lang, 'resume')
                  : t(lang, 'listenSection')
            }
            className={`print-hidden inline-flex h-9 w-9 min-h-[36px] min-w-[36px] shrink-0 items-center justify-center rounded-control transition-all duration-150 ${
              isCurrentSectionActive
                ? 'bg-action-tint text-action opacity-100'
                : 'text-muted opacity-100 hover:text-action sm:opacity-0 sm:focus-visible:opacity-100 sm:group-hover:opacity-100'
            }`}
          >
            {isCurrentSectionPlaying ? (
              <PauseIcon width="16" height="16" />
            ) : isCurrentSectionPaused ? (
              <PlayIcon width="16" height="16" />
            ) : (
              <VolumeIcon width="16" height="16" />
            )}
          </button>
        )}

        <a
          href={hrefFor(chapter.id, section.id)}
          aria-label={t(lang, 'linkToSection')}
          className="print-hidden inline-flex h-9 w-9 min-h-[36px] min-w-[36px] shrink-0 items-center justify-center rounded-control text-muted no-underline opacity-100 transition-all duration-150 hover:text-action sm:opacity-0 sm:focus-visible:opacity-100 sm:group-hover:opacity-100"
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

      {isGamified && (
        <SectionAction
          sectionId={`${chapter.id}--${section.id}`}
          isCompleted={isCompleted}
          lang={lang}
          onComplete={onComplete}
        />
      )}
    </motion.section>
  )
}
