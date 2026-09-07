import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SectionAction({ sectionId = 'intro', isCompleted = false, lang = 'ar', onComplete }) {
  const [done, setDone] = useState(isCompleted)
  const [showFloat, setShowFloat] = useState(false)

  const handleComplete = () => {
    if (done) return
    setDone(true)
    setShowFloat(true)
    onComplete?.(sectionId)
    setTimeout(() => setShowFloat(false), 1200)
  }

  return (
    <div className="relative mt-8 pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-ground border border-line">
      <div className="flex items-center gap-3">
        <span className="w-10 h-10 rounded-full bg-action-tint text-action flex items-center justify-center text-lg shrink-0">
          💡
        </span>
        <div>
          <h4 className="text-sm font-bold text-ink">
            {lang === 'ar' ? 'هل استوعبت هذا المبدأ التصميمي؟' : 'Did you master this principle?'}
          </h4>
          <p className="text-xs text-muted">
            {lang === 'ar'
              ? 'تأكيد الفهم يضيف نقاط خبرة ويثبت إنجازك في ملفك الشخصي'
              : 'Confirming adds XP and marks this principle as completed in your profile'}
          </p>
        </div>
      </div>

      <div className="relative shrink-0">
        {/* Floating XP Animation */}
        <AnimatePresence>
          {showFloat && (
            <motion.div
              initial={{ opacity: 0, y: 0, scale: 0.8 }}
              animate={{ opacity: 1, y: -36, scale: 1.1 }}
              exit={{ opacity: 0, y: -48, scale: 0.9 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none z-30 tag tag--info !font-bold !text-xs !py-1 !px-2.5 shadow-sm"
            >
              +15 XP ⚡
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={handleComplete}
          disabled={done}
          className={`btn !gap-2 transition-all active:scale-[0.96] ${
            done ? 'btn--secondary !text-success !border-success-line !bg-success-tint/40' : 'btn--primary'
          }`}
          style={{ minHeight: '44px' }}
        >
          {done ? (
            <>
              <svg className="w-4 h-4 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{lang === 'ar' ? 'تم الاستيعاب والتطبيق ✓' : 'Mastered & Applied ✓'}</span>
            </>
          ) : (
            <>
              <span>{lang === 'ar' ? 'تم الاستيعاب والتطبيق' : 'Mark as Mastered'}</span>
              <span className="tag !bg-white/20 !text-white !border-transparent !text-[11px] !py-0.5 !px-1.5 font-bold">
                +15 XP
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
