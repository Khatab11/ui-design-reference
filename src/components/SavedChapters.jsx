import { chapters } from '../lib/content.js'
import { hrefFor } from '../lib/hooks.js'

export default function SavedChapters({ savedChapterIds, lang }) {
  const saved = chapters.filter((chapter) => savedChapterIds.includes(chapter.id))
  return (
    <main className="mx-auto max-w-prose py-4">
      <p className="label text-muted">{lang === 'ar' ? 'مكتبتي' : 'My library'}</p>
      <h1 className="mt-2 text-3xl font-bold text-ink">{lang === 'ar' ? 'الفصول المحفوظة' : 'Saved chapters'}</h1>
      {saved.length === 0 ? (
        <p className="mt-4 text-body">{lang === 'ar' ? 'لم تحفظ أي فصل بعد. استخدم زر الحفظ في عنوان الفصل.' : 'You have not saved a chapter yet. Use the save button in a chapter header.'}</p>
      ) : (
        <ol className="mt-6 space-y-3">
          {saved.map((chapter) => (
            <li key={chapter.id}>
              <a href={hrefFor(chapter.id)} className="block rounded-card border border-line bg-surface p-4 no-underline transition hover:border-action-tint-line hover:bg-action-tint">
                <h2 className="text-lg font-semibold text-ink">{chapter.title[lang]}</h2>
                <p className="mt-1 text-sm text-body">{chapter.intro?.[lang]}</p>
              </a>
            </li>
          ))}
        </ol>
      )}
    </main>
  )
}
