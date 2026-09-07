import { useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useSpeech } from '../context/SpeechContext.jsx'
import { t } from '../lib/ui.js'
import { sectionDomId } from './Section.jsx'
import {
  PlayIcon,
  PauseIcon,
  CloseIcon,
  SkipBackIcon,
  SkipForwardIcon,
  AlertIcon,
} from './Icons.jsx'

export default function AudioPlayer({ lang }) {
  const {
    supported,
    status,
    isPlaying,
    mode,
    currentChapter,
    currentSectionId,
    currentTitle,
    rate,
    error,
    clearError,
    togglePlayPause,
    cycleRate,
    stop,
    nextSection,
    prevSection,
    hasNextSection,
    hasPrevSection,
  } = useSpeech()

  const shouldReduceMotion = useReducedMotion()

  // Press Escape to dismiss/stop player
  useEffect(() => {
    if (status === 'idle' && !error) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (error) clearError()
        else stop()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [status, error, stop, clearError])

  // Smooth scroll into section when section changes in chapter mode
  useEffect(() => {
    if (status !== 'idle' && mode === 'chapter' && currentChapter && currentSectionId) {
      const el = document.getElementById(sectionDomId(currentChapter.id, currentSectionId))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [currentSectionId, currentChapter, mode, status])

  if (!supported || (status === 'idle' && !error)) {
    return null
  }

  // If speech error occurred (e.g. Linux speech-dispatcher disconnected)
  if (error) {
    return (
      <AnimatePresence>
        <div className="pointer-events-none fixed inset-x-3 bottom-4 z-40 flex justify-center sm:bottom-6">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="pointer-events-auto flex w-full max-w-lg items-center justify-between gap-3 rounded-card border border-warning/40 bg-surface/95 p-3 shadow-overlay backdrop-blur-md"
            role="alert"
          >
            <div className="flex min-w-0 flex-1 items-center gap-2.5">
              <AlertIcon width="20" height="20" className="shrink-0 text-warning" />
              <p className="text-xs text-body leading-relaxed">
                {t(lang, 'ttsServiceUnavailable')}
              </p>
            </div>
            <button
              type="button"
              onClick={clearError}
              aria-label={t(lang, 'close')}
              className="btn btn--secondary btn--sm h-8 w-8 p-0 text-muted hover:text-ink shrink-0"
            >
              <CloseIcon width="16" height="16" />
            </button>
          </motion.div>
        </div>
      </AnimatePresence>
    )
  }

  const modeLabel =
    mode === 'chapter' ? t(lang, 'listeningToChapter') : t(lang, 'nowReading')

  return (
    <AnimatePresence>
      <div className="pointer-events-none fixed inset-x-3 bottom-4 z-40 flex justify-center sm:bottom-6">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="pointer-events-auto flex w-full max-w-lg items-center justify-between gap-3 rounded-card border border-line-strong bg-surface/95 p-2.5 shadow-overlay backdrop-blur-md sm:p-3"
          role="region"
          aria-label="Audio Player"
        >
          {/* Left: Waveform & Track info */}
          <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">
            {/* Animated sound bars */}
            <div
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-control bg-action-tint text-action"
              aria-hidden="true"
            >
              <div className="flex h-4 items-end gap-[3px]">
                <motion.span
                  animate={
                    isPlaying && !shouldReduceMotion
                      ? { height: ['4px', '16px', '6px', '14px', '4px'] }
                      : { height: '8px' }
                  }
                  transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
                  className="w-1 rounded-full bg-action"
                />
                <motion.span
                  animate={
                    isPlaying && !shouldReduceMotion
                      ? { height: ['12px', '4px', '16px', '6px', '12px'] }
                      : { height: '12px' }
                  }
                  transition={{ repeat: Infinity, duration: 0.7, ease: 'easeInOut' }}
                  className="w-1 rounded-full bg-action"
                />
                <motion.span
                  animate={
                    isPlaying && !shouldReduceMotion
                      ? { height: ['6px', '14px', '4px', '16px', '6px'] }
                      : { height: '6px' }
                  }
                  transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
                  className="w-1 rounded-full bg-action"
                />
              </div>
            </div>

            {/* Title & Mode */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold uppercase tracking-wider text-muted">
                {modeLabel}
              </p>
              <p className="truncate text-xs font-semibold text-ink sm:text-sm">
                {currentTitle || currentChapter?.title?.[lang] || ''}
              </p>
            </div>
          </div>

          {/* Right: Controls */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            {mode === 'chapter' && (
              <button
                type="button"
                onClick={prevSection}
                disabled={!hasPrevSection}
                aria-label={t(lang, 'prevSection')}
                title={t(lang, 'prevSection')}
                className="btn btn--secondary btn--sm h-8 w-8 p-0 disabled:opacity-35 rtl:rotate-180 sm:h-9 sm:w-9"
              >
                <SkipBackIcon width="15" height="15" />
              </button>
            )}

            {/* Play/Pause Button */}
            <button
              type="button"
              onClick={togglePlayPause}
              aria-label={isPlaying ? t(lang, 'pause') : t(lang, 'resume')}
              title={isPlaying ? t(lang, 'pause') : t(lang, 'resume')}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-action text-white shadow-sm transition-transform hover:scale-105 hover:bg-action-hover active:scale-95 sm:h-10 sm:w-10"
            >
              {isPlaying ? <PauseIcon width="16" height="16" /> : <PlayIcon width="16" height="16" />}
            </button>

            {mode === 'chapter' && (
              <button
                type="button"
                onClick={nextSection}
                disabled={!hasNextSection}
                aria-label={t(lang, 'nextSection')}
                title={t(lang, 'nextSection')}
                className="btn btn--secondary btn--sm h-8 w-8 p-0 disabled:opacity-35 rtl:rotate-180 sm:h-9 sm:w-9"
              >
                <SkipForwardIcon width="15" height="15" />
              </button>
            )}

            {/* Speed cycling button */}
            <button
              type="button"
              onClick={cycleRate}
              aria-label={`${t(lang, 'playbackSpeed')}: ${rate}x`}
              title={`${t(lang, 'playbackSpeed')}: ${rate}x`}
              className="btn btn--secondary btn--sm h-8 px-2 font-mono text-[11px] font-semibold sm:h-9 sm:text-xs"
            >
              {rate}×
            </button>

            <div className="hidden h-5 w-px bg-line sm:block" />

            {/* Close / Stop */}
            <button
              type="button"
              onClick={stop}
              aria-label={t(lang, 'closePlayer')}
              title={t(lang, 'closePlayer')}
              className="btn btn--secondary btn--sm h-8 w-8 p-0 text-muted hover:text-ink sm:h-9 sm:w-9"
            >
              <CloseIcon width="16" height="16" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
