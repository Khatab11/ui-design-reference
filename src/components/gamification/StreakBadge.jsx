import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function StreakBadge({ streak = 5, weeklyHistory = [true, true, true, false, true, true, false], streakFreeze = true, lang = 'ar' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const daysLabel = {
    ar: ['سبت', 'أحد', 'إثن', 'ثلا', 'أرب', 'خمي', 'جمع'],
    en: ['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
  }[lang] || ['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr']

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="btn btn--secondary btn--sm !rounded-full !px-3 !gap-1.5 transition-transform active:scale-[0.96]"
        aria-expanded={open}
        aria-label={lang === 'ar' ? `سلسلة استمرارية ${streak} أيام` : `${streak} day study streak`}
        style={{ minHeight: '38px' }}
      >
        <svg
          className="w-4 h-4 text-[#E65100] animate-pulse"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 23c-4.97 0-9-4.03-9-9 0-3.92 2.51-7.25 6-8.5.17 1.63.85 3.12 1.94 4.28.32-.44.7-.85 1.14-1.22 2.45-2.07 3.42-5.32 2.42-8.56 3.8 1.95 6.5 5.86 6.5 10 0 7.18-5.82 13-13 13zm-1-6c0-1.66 1.34-3 3-3 .55 0 1 .45 1 1 0 1.66-1.34 3-3 3-.55 0-1-.45-1-1z" />
        </svg>
        <span className="font-bold tabular-nums text-ink text-sm">{streak}</span>
        <span className="text-xs text-muted font-normal">{lang === 'ar' ? 'أيام' : 'days'}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ type: 'spring', duration: 0.25, bounce: 0 }}
            className={`absolute z-50 mt-2 w-72 p-4 bg-surface rounded-xl border border-line shadow-overlay ${
              lang === 'ar' ? 'left-0' : 'right-0'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-line mb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-[#FFF3E0] text-[#E65100]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 23c-4.97 0-9-4.03-9-9 0-3.92 2.51-7.25 6-8.5.17 1.63.85 3.12 1.94 4.28.32-.44.7-.85 1.14-1.22 2.45-2.07 3.42-5.32 2.42-8.56 3.8 1.95 6.5 5.86 6.5 10 0 7.18-5.82 13-13 13z" />
                  </svg>
                </span>
                <div>
                  <h4 className="text-sm font-bold text-ink leading-tight">
                    {lang === 'ar' ? `${streak} أيام استمرارية` : `${streak} Day Streak`}
                  </h4>
                  <p className="text-xs text-muted">
                    {lang === 'ar' ? 'اقرأ قسماً يومياً لتثبيت السلسلة' : 'Study 1 section daily to keep it'}
                  </p>
                </div>
              </div>
            </div>

            {/* 7-day Activity Matrix */}
            <div className="mb-4">
              <p className="text-[11px] font-semibold text-muted uppercase tracking-wider mb-2">
                {lang === 'ar' ? 'نشاط الأسبوع الحالي' : 'This Week Activity'}
              </p>
              <div className="grid grid-cols-7 gap-1.5 text-center">
                {weeklyHistory.map((active, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <span className="text-[10px] text-muted">{daysLabel[idx]}</span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                        active
                          ? 'bg-[#E65100] text-white shadow-sm'
                          : 'bg-surface-sunken text-muted border border-line'
                      }`}
                    >
                      {active ? '✓' : '•'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Streak Freeze Perk */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-sunken border border-line text-xs">
              <div className="flex items-center gap-2">
                <span className="text-base">🛡️</span>
                <div>
                  <p className="font-semibold text-ink">
                    {lang === 'ar' ? 'درع حماية السلسلة' : 'Streak Freeze'}
                  </p>
                  <p className="text-[11px] text-muted">
                    {streakFreeze
                      ? lang === 'ar'
                        ? 'مفعّل ليوم عطلة واحد'
                        : 'Active for 1 missed day'
                      : lang === 'ar'
                      ? 'غير متاح حالياً'
                      : 'Not available'}
                  </p>
                </div>
              </div>
              <span className={`tag !text-[10px] !py-0.5 ${streakFreeze ? 'tag--success' : 'tag--neutral'}`}>
                {streakFreeze ? (lang === 'ar' ? 'جاهز' : 'Ready') : (lang === 'ar' ? 'مستخدم' : 'Used')}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
