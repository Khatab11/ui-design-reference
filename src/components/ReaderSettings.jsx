import { useEffect } from 'react'
import { t } from '../lib/ui.js'

const sizes = [
  { id: 'small', en: 'Small', ar: 'صغير' },
  { id: 'medium', en: 'Default', ar: 'افتراضي' },
  { id: 'large', en: 'Large', ar: 'كبير' },
]

export default function ReaderSettings({ open, onClose, size, onChange, lang }) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-ink/40 p-3 sm:items-center sm:justify-center sm:p-6" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section role="dialog" aria-modal="true" aria-labelledby="reader-settings-title" className="w-full max-w-md rounded-card border border-line bg-surface p-5 shadow-overlay" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 id="reader-settings-title" className="text-xl font-bold text-ink">{lang === 'ar' ? 'إعدادات القراءة' : 'Reading settings'}</h2>
            <p className="mt-1 text-sm text-muted">{lang === 'ar' ? 'اختر حجم النص المناسب لك.' : 'Choose a comfortable text size.'}</p>
          </div>
          <button type="button" onClick={onClose} className="btn btn--secondary btn--sm h-11 w-11 p-0" aria-label={t(lang, 'close')}>×</button>
        </div>
        <fieldset className="mt-5">
          <legend className="label">{lang === 'ar' ? 'حجم النص' : 'Text size'}</legend>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {sizes.map((option) => (
              <button key={option.id} type="button" onClick={() => onChange(option.id)} aria-pressed={size === option.id} className={`btn btn--sm ${size === option.id ? 'btn--primary' : 'btn--secondary'}`}>
                {lang === 'ar' ? option.ar : option.en}
              </button>
            ))}
          </div>
        </fieldset>
      </section>
    </div>
  )
}
