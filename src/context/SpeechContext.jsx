import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import { isSpeechSupported, getBestVoice, buildChapterQueue, buildSectionQueue } from '../lib/tts.js'

const SpeechContext = createContext(null)

const SPEED_OPTIONS = [1, 1.25, 1.5, 2, 0.75]

export function SpeechProvider({ children, lang, activeChapterId }) {
  const [supported] = useState(() => isSpeechSupported())
  const [status, setStatus] = useState('idle') // 'idle' | 'playing' | 'paused'
  const [mode, setMode] = useState(null) // 'chapter' | 'section' | null
  const [currentChapter, setCurrentChapter] = useState(null)
  const [currentSectionId, setCurrentSectionId] = useState(null)
  const [currentTitle, setCurrentTitle] = useState('')
  const [voicesLoaded, setVoicesLoaded] = useState(false)
  const [error, setError] = useState(null)
  const [rate, setRate] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('ui-ref:tts-rate')
      if (saved) return parseFloat(saved) || 1
    }
    return 1
  })
  const [queue, setQueue] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const statusRef = useRef(status)
  statusRef.current = status

  const queueRef = useRef(queue)
  queueRef.current = queue

  const currentIndexRef = useRef(currentIndex)
  currentIndexRef.current = currentIndex

  const rateRef = useRef(rate)
  rateRef.current = rate

  const langRef = useRef(lang)
  langRef.current = lang

  const isStoppedRef = useRef(false)
  const startTimeoutRef = useRef(null)

  // Listen for voices loading in the browser
  useEffect(() => {
    if (!supported || typeof window === 'undefined') return
    const onVoicesChanged = () => {
      setVoicesLoaded(true)
    }
    if (window.speechSynthesis.getVoices().length > 0) {
      setVoicesLoaded(true)
    }
    window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged)
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged)
    }
  }, [supported])

  // Save rate to local storage
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('ui-ref:tts-rate', String(rate))
    }
  }, [rate])

  // Cancel speech on beforeunload and unmount
  useEffect(() => {
    if (!supported) return
    const handleUnload = () => {
      window.speechSynthesis.cancel()
    }
    window.addEventListener('beforeunload', handleUnload)
    return () => {
      window.removeEventListener('beforeunload', handleUnload)
      if (startTimeoutRef.current) clearTimeout(startTimeoutRef.current)
      window.speechSynthesis.cancel()
    }
  }, [supported])

  // Stop speech if language changes
  const prevLangRef = useRef(lang)
  useEffect(() => {
    if (prevLangRef.current !== lang) {
      prevLangRef.current = lang
      if (statusRef.current !== 'idle') {
        stop()
      }
    }
  }, [lang])

  // Stop speech if chapter changes externally and it's not the one playing
  useEffect(() => {
    if (currentChapter && activeChapterId && currentChapter.id !== activeChapterId) {
      stop()
    }
  }, [activeChapterId, currentChapter])

  const stop = useCallback(() => {
    isStoppedRef.current = true
    if (startTimeoutRef.current) {
      clearTimeout(startTimeoutRef.current)
      startTimeoutRef.current = null
    }
    if (supported && typeof window !== 'undefined') {
      try {
        window.speechSynthesis.cancel()
      } catch (e) {
        // ignore
      }
    }
    setStatus('idle')
    setMode(null)
    setCurrentChapter(null)
    setCurrentSectionId(null)
    setCurrentTitle('')
    setQueue([])
    setCurrentIndex(0)
  }, [supported])

  const playChunk = useCallback(
    (index, activeQueue = queueRef.current, activeRate = rateRef.current) => {
      if (!supported || typeof window === 'undefined') return
      if (!activeQueue || index < 0 || index >= activeQueue.length) {
        stop()
        return
      }

      isStoppedRef.current = false

      const chunk = activeQueue[index]
      setCurrentIndex(index)
      setCurrentSectionId(chunk.sectionId ?? null)
      if (chunk.label) {
        setCurrentTitle(chunk.label)
      }

      const utterance = new SpeechSynthesisUtterance(chunk.text)
      utterance.rate = activeRate

      const currentLang = langRef.current
      const voice = getBestVoice(currentLang)

      if (voice) {
        utterance.voice = voice
        utterance.lang = voice.lang || (currentLang === 'ar' ? 'ar' : 'en-US')
      } else {
        utterance.lang = currentLang === 'ar' ? 'ar' : 'en-US'
      }

      utterance.onend = () => {
        if (isStoppedRef.current || statusRef.current === 'paused') return
        const nextIdx = index + 1
        if (nextIdx < activeQueue.length) {
          playChunk(nextIdx, activeQueue, rateRef.current)
        } else {
          stop()
        }
      }

      utterance.onerror = (e) => {
        if (
          e.error === 'canceled' ||
          e.error === 'interrupted' ||
          isStoppedRef.current ||
          statusRef.current === 'paused'
        ) {
          return
        }
        console.warn('SpeechSynthesis error:', e.error || e)
        setError(e.error || 'synthesis-failed')
        stop()
      }

      // Resume speech engine in case it entered suspended state
      try {
        if (typeof window.speechSynthesis.resume === 'function') {
          window.speechSynthesis.resume()
        }
        window.speechSynthesis.speak(utterance)
      } catch (err) {
        console.warn('SpeechSynthesis speak failed:', err)
        setError('synthesis-failed')
        stop()
      }
    },
    [supported, stop],
  )

  const playChapter = useCallback(
    (chapter, targetLang = langRef.current) => {
      if (!supported || !chapter) return

      // If already playing this chapter
      if (currentChapter?.id === chapter.id && mode === 'chapter') {
        if (status === 'playing') {
          pause()
          return
        }
        if (status === 'paused') {
          resume()
          return
        }
      }

      if (startTimeoutRef.current) clearTimeout(startTimeoutRef.current)
      isStoppedRef.current = false
      setError(null)

      const wasSpeaking =
        typeof window !== 'undefined' &&
        (window.speechSynthesis.speaking || window.speechSynthesis.pending)

      if (wasSpeaking) {
        window.speechSynthesis.cancel()
      }

      const newQueue = buildChapterQueue(chapter, targetLang)
      if (newQueue.length === 0) return

      setQueue(newQueue)
      queueRef.current = newQueue
      setCurrentChapter(chapter)
      setMode('chapter')
      setStatus('playing')
      statusRef.current = 'playing'
      setCurrentIndex(0)
      currentIndexRef.current = 0

      // If cancel was called, give small tick before speak
      if (wasSpeaking) {
        startTimeoutRef.current = setTimeout(() => {
          if (!isStoppedRef.current && statusRef.current === 'playing') {
            playChunk(0, newQueue, rateRef.current)
          }
        }, 50)
      } else {
        playChunk(0, newQueue, rateRef.current)
      }
    },
    [supported, currentChapter, mode, status, playChunk],
  )

  const playSection = useCallback(
    (chapter, section, targetLang = langRef.current) => {
      if (!supported || !section) return

      // If already playing this specific section
      if (
        currentChapter?.id === chapter.id &&
        mode === 'section' &&
        currentSectionId === section.id
      ) {
        if (status === 'playing') {
          pause()
          return
        }
        if (status === 'paused') {
          resume()
          return
        }
      }

      if (startTimeoutRef.current) clearTimeout(startTimeoutRef.current)
      isStoppedRef.current = false
      setError(null)

      const wasSpeaking =
        typeof window !== 'undefined' &&
        (window.speechSynthesis.speaking || window.speechSynthesis.pending)

      if (wasSpeaking) {
        window.speechSynthesis.cancel()
      }

      const newQueue = buildSectionQueue(chapter, section, targetLang)
      if (newQueue.length === 0) return

      setQueue(newQueue)
      queueRef.current = newQueue
      setCurrentChapter(chapter)
      setMode('section')
      setStatus('playing')
      statusRef.current = 'playing'
      setCurrentIndex(0)
      currentIndexRef.current = 0

      // If cancel was called, give small tick before speak
      if (wasSpeaking) {
        startTimeoutRef.current = setTimeout(() => {
          if (!isStoppedRef.current && statusRef.current === 'playing') {
            playChunk(0, newQueue, rateRef.current)
          }
        }, 50)
      } else {
        playChunk(0, newQueue, rateRef.current)
      }
    },
    [supported, currentChapter, mode, currentSectionId, status, playChunk],
  )

  const pause = useCallback(() => {
    if (!supported || statusRef.current !== 'playing') return
    setStatus('paused')
    statusRef.current = 'paused'
    if (typeof window !== 'undefined') {
      window.speechSynthesis.cancel()
    }
  }, [supported])

  const resume = useCallback(() => {
    if (!supported || statusRef.current !== 'paused') return
    setStatus('playing')
    statusRef.current = 'playing'
    playChunk(currentIndexRef.current, queueRef.current, rateRef.current)
  }, [supported, playChunk])

  const togglePlayPause = useCallback(() => {
    if (status === 'playing') {
      pause()
    } else if (status === 'paused') {
      resume()
    }
  }, [status, pause, resume])

  const cycleRate = useCallback(() => {
    const currentIdx = SPEED_OPTIONS.indexOf(rateRef.current)
    const nextIdx = currentIdx === -1 ? 0 : (currentIdx + 1) % SPEED_OPTIONS.length
    const nextRate = SPEED_OPTIONS[nextIdx]

    setRate(nextRate)
    rateRef.current = nextRate

    // If currently playing, cancel current chunk and immediately re-speak at new speed
    if (statusRef.current === 'playing') {
      window.speechSynthesis.cancel()
      setTimeout(() => {
        if (!isStoppedRef.current && statusRef.current === 'playing') {
          playChunk(currentIndexRef.current, queueRef.current, nextRate)
        }
      }, 50)
    }
  }, [playChunk])

  // Navigation helpers across sections in chapter mode
  const nextSection = useCallback(() => {
    if (mode !== 'chapter' || !queueRef.current.length) return
    const curSecId = queueRef.current[currentIndexRef.current]?.sectionId
    // Find next chunk that belongs to a different section
    const nextIdx = queueRef.current.findIndex(
      (chunk, i) => i > currentIndexRef.current && chunk.sectionId && chunk.sectionId !== curSecId,
    )
    if (nextIdx !== -1) {
      window.speechSynthesis.cancel()
      if (statusRef.current === 'paused') {
        setStatus('playing')
        statusRef.current = 'playing'
      }
      setTimeout(() => {
        if (!isStoppedRef.current) {
          playChunk(nextIdx, queueRef.current, rateRef.current)
        }
      }, 50)
    }
  }, [mode, playChunk])

  const prevSection = useCallback(() => {
    if (mode !== 'chapter' || !queueRef.current.length) return
    const curSecId = queueRef.current[currentIndexRef.current]?.sectionId
    let targetSecId = null
    let targetIdx = -1

    for (let i = currentIndexRef.current - 1; i >= 0; i--) {
      const chunk = queueRef.current[i]
      if (chunk.sectionId && chunk.sectionId !== curSecId) {
        targetSecId = chunk.sectionId
        break
      }
    }

    if (targetSecId) {
      targetIdx = queueRef.current.findIndex((chunk) => chunk.sectionId === targetSecId)
    } else {
      targetIdx = 0
    }

    if (targetIdx !== -1) {
      window.speechSynthesis.cancel()
      if (statusRef.current === 'paused') {
        setStatus('playing')
        statusRef.current = 'playing'
      }
      setTimeout(() => {
        if (!isStoppedRef.current) {
          playChunk(targetIdx, queueRef.current, rateRef.current)
        }
      }, 50)
    }
  }, [mode, playChunk])

  const curSec = queue[currentIndex]?.sectionId
  const hasNextSection =
    mode === 'chapter' &&
    queue.some((chunk, i) => i > currentIndex && chunk.sectionId && chunk.sectionId !== curSec)
  const hasPrevSection =
    mode === 'chapter' &&
    (currentIndex > 0 &&
      (queue.some((chunk, i) => i < currentIndex && chunk.sectionId !== curSec) ||
        (curSec && currentIndex > 0)))

  const value = {
    supported,
    status,
    isPlaying: status === 'playing',
    isPaused: status === 'paused',
    mode,
    currentChapter,
    currentSectionId,
    currentTitle,
    rate,
    voicesLoaded,
    error,
    clearError: () => setError(null),
    playChapter,
    playSection,
    pause,
    resume,
    stop,
    togglePlayPause,
    cycleRate,
    setRate,
    nextSection,
    prevSection,
    hasNextSection,
    hasPrevSection,
  }

  return <SpeechContext.Provider value={value}>{children}</SpeechContext.Provider>
}

export function useSpeech() {
  const context = useContext(SpeechContext)
  if (!context) {
    throw new Error('useSpeech must be used within a SpeechProvider')
  }
  return context
}
