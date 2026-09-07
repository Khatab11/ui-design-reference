import { stripMarkdown } from './markdown.js'

export function isSpeechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window
}

/**
 * Clean text for natural speech synthesis.
 * Strips markdown, URLs, technical symbols, and excessive formatting.
 */
export function cleanTextForSpeech(text = '') {
  if (!text) return ''
  let clean = stripMarkdown(text)

  // Remove URLs
  clean = clean.replace(/https?:\/\/\S+/gi, '')

  // Remove markdown footnote markers or hash anchors
  clean = clean.replace(/\[\^[0-9]+\]/g, '')

  // Remove horizontal rules / long dash runs
  clean = clean.replace(/[-—_]{2,}/g, ' ')

  // Remove HTML tags if any leaked through
  clean = clean.replace(/<[^>]*>/g, '')

  // Collapse multiple spaces/newlines into single space
  clean = clean.replace(/\s+/g, ' ').trim()

  return clean
}

/**
 * Split text into small sentence/phrase chunks (<= 160 characters).
 * This completely avoids the Chromium/WebKit bug where utterances longer than
 * ~15-20 seconds freeze or cut off silently without triggering 'end'.
 */
export function splitIntoSpeechChunks(text = '') {
  const cleaned = cleanTextForSpeech(text)
  if (!cleaned) return []

  // Split by sentence-ending punctuation: . ! ? ؟ ؛ and newlines
  const rawSentences = cleaned
    .split(/(?<=[.!?؟؛])\s+|\n+/)
    .map((s) => s.trim())
    .filter(Boolean)

  const chunks = []
  for (const sentence of rawSentences) {
    if (sentence.length <= 160) {
      chunks.push(sentence)
    } else {
      // Split long sentence by clauses (, ، : ;)
      const clauses = sentence
        .split(/(?<=[,،:;])\s+/)
        .map((c) => c.trim())
        .filter(Boolean)

      for (const clause of clauses) {
        if (clause.length <= 160) {
          chunks.push(clause)
        } else {
          // Fallback: chunk by word boundary (~ 15-20 words per chunk)
          const words = clause.split(/\s+/)
          let current = ''
          for (const word of words) {
            if ((current + ' ' + word).trim().length > 140) {
              if (current) chunks.push(current.trim())
              current = word
            } else {
              current = (current + ' ' + word).trim()
            }
          }
          if (current) chunks.push(current.trim())
        }
      }
    }
  }

  return chunks
}

/**
 * Select the best available voice for a language ('en' or 'ar').
 */
export function getBestVoice(lang) {
  if (!isSpeechSupported()) return null
  const voices = window.speechSynthesis.getVoices()
  if (!voices || voices.length === 0) return null

  const targetLang = lang === 'ar' ? 'ar' : 'en'
  const matching = voices.filter((v) => {
    const l = (v.lang || '').toLowerCase().replace('_', '-')
    const n = (v.name || '').toLowerCase()
    if (targetLang === 'ar') {
      return l === 'ar' || l.startsWith('ar-') || n.includes('arabic')
    }
    return l === 'en' || l.startsWith('en-') || n.includes('english')
  })

  // Prioritize natural/high-quality voices
  const highQuality = matching.find((v) => {
    const name = (v.name || '').toLowerCase()
    return (
      name.includes('natural') ||
      name.includes('online') ||
      name.includes('google') ||
      name.includes('siri') ||
      name.includes('premium') ||
      name.includes('enhanced')
    )
  })
  if (highQuality) return highQuality

  // If specific default voice exists among matching
  const def = matching.find((v) => v.default)
  if (def) return def

  // For English, prefer en-US if available
  if (targetLang === 'en') {
    const enUS = matching.find((v) => (v.lang || '').toLowerCase().replace('_', '-') === 'en-us')
    if (enUS) return enUS
  }

  if (matching.length > 0) {
    return matching[0]
  }

  // Fallback: return default voice or first available voice
  return voices.find((v) => v.default) || voices[0] || null
}


/**
 * Build speech chunks for an entire chapter (title, intro, all sections and callouts).
 */
export function buildChapterQueue(chapter, lang) {
  if (!chapter) return []
  const queue = []

  // 1. Chapter Title
  if (chapter.title?.[lang]) {
    queue.push({
      text: chapter.title[lang],
      chapterId: chapter.id,
      sectionId: null,
      label: chapter.title[lang],
      isChapterTitle: true,
    })
  }

  // 2. Chapter Intro
  if (chapter.intro?.[lang]) {
    const introChunks = splitIntoSpeechChunks(chapter.intro[lang])
    for (const chunk of introChunks) {
      queue.push({
        text: chunk,
        chapterId: chapter.id,
        sectionId: null,
        label: chapter.title[lang],
      })
    }
  }

  // 3. Sections
  if (Array.isArray(chapter.sections)) {
    for (const section of chapter.sections) {
      // Section Title
      if (section.title?.[lang]) {
        queue.push({
          text: section.title[lang],
          chapterId: chapter.id,
          sectionId: section.id,
          label: section.title[lang],
          isSectionStart: true,
        })
      }

      // Section Body
      if (section.body?.[lang]) {
        const bodyChunks = splitIntoSpeechChunks(section.body[lang])
        for (const chunk of bodyChunks) {
          queue.push({
            text: chunk,
            chapterId: chapter.id,
            sectionId: section.id,
            label: section.title[lang],
          })
        }
      }

      // Section Callout
      if (section.callout) {
        const calloutText = section.callout[lang] ?? section.callout.en
        if (calloutText) {
          const calloutChunks = splitIntoSpeechChunks(calloutText)
          for (const chunk of calloutChunks) {
            queue.push({
              text: chunk,
              chapterId: chapter.id,
              sectionId: section.id,
              label: section.title[lang],
            })
          }
        }
      }
    }
  }

  return queue
}

/**
 * Build speech chunks for a single section (title, body, callout).
 */
export function buildSectionQueue(chapter, section, lang) {
  if (!section) return []
  const queue = []

  // Section Title
  if (section.title?.[lang]) {
    queue.push({
      text: section.title[lang],
      chapterId: chapter?.id,
      sectionId: section.id,
      label: section.title[lang],
      isSectionStart: true,
    })
  }

  // Section Body
  if (section.body?.[lang]) {
    const bodyChunks = splitIntoSpeechChunks(section.body[lang])
    for (const chunk of bodyChunks) {
      queue.push({
        text: chunk,
        chapterId: chapter?.id,
        sectionId: section.id,
        label: section.title[lang],
      })
    }
  }

  // Section Callout
  if (section.callout) {
    const calloutText = section.callout[lang] ?? section.callout.en
    if (calloutText) {
      const calloutChunks = splitIntoSpeechChunks(calloutText)
      for (const chunk of calloutChunks) {
        queue.push({
          text: chunk,
          chapterId: chapter?.id,
          sectionId: section.id,
          label: section.title[lang],
        })
      }
    }
  }

  return queue
}
