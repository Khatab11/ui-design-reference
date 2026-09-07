import assert from 'node:assert/strict'
import test from 'node:test'
import { buildChapterQueue, cleanTextForSpeech, getBestVoice, splitIntoSpeechChunks } from '../src/lib/tts.js'

test('speech cleaning removes markup and URL noise', () => {
  assert.equal(
    cleanTextForSpeech('**Hello** [world](https://example.com) -- [^1]'),
    'Hello world',
  )
})

test('Arabic text splits safely at Arabic sentence punctuation', () => {
  const chunks = splitIntoSpeechChunks('هذا اختبار أول. هل يعمل التقسيم؟ نعم، يعمل بشكل جيد؛ بالتأكيد.')
  assert.deepEqual(chunks, ['هذا اختبار أول.', 'هل يعمل التقسيم؟', 'نعم، يعمل بشكل جيد؛', 'بالتأكيد.'])
})

test('chapter queue retains the selected language and includes callouts', () => {
  const chapter = {
    id: 'test',
    title: { en: 'English title', ar: 'عنوان عربي' },
    intro: { en: 'English introduction.', ar: 'مقدمة عربية.' },
    sections: [{
      id: 'section',
      title: { en: 'English section', ar: 'قسم عربي' },
      body: { en: 'English body.', ar: 'نص عربي.' },
      callout: { en: 'English tip.', ar: 'نصيحة عربية.' },
    }],
  }
  const queue = buildChapterQueue(chapter, 'ar')
  assert.deepEqual(queue.map((item) => item.text), ['عنوان عربي', 'مقدمة عربية.', 'قسم عربي', 'نص عربي.', 'نصيحة عربية.'])
  assert.ok(queue.every((item) => item.chapterId === 'test'))
})

test('voice selection prefers a matching Arabic voice', () => {
  const previousWindow = globalThis.window
  globalThis.window = {
    SpeechSynthesisUtterance: class {},
    speechSynthesis: {
      getVoices: () => [
        { name: 'English', lang: 'en-US', default: true },
        { name: 'Arabic Natural', lang: 'ar-SA', default: false },
      ],
    },
  }

  try {
    assert.equal(getBestVoice('ar').lang, 'ar-SA')
    assert.equal(getBestVoice('en').lang, 'en-US')
  } finally {
    globalThis.window = previousWindow
  }
})
