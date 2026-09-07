import { motion, AnimatePresence } from 'framer-motion'

export default function CelebrationToast({ event, lang = 'ar', onClose }) {
  if (!event) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
          className="bg-surface rounded-2xl border border-line shadow-overlay p-6 max-w-sm w-full text-center space-y-4"
        >
          <div className="w-16 h-16 mx-auto rounded-full bg-action-tint text-action flex items-center justify-center text-3xl shadow-xs">
            {event.type === 'level_up' ? '🎖️' : '🏆'}
          </div>

          <div>
            <span className="tag tag--info text-[11px] mb-2">
              {event.type === 'level_up'
                ? lang === 'ar'
                  ? 'ترقية جديدة في الرتبة!'
                  : 'Level Up!'
                : lang === 'ar'
                ? 'وسام إنجاز جديد!'
                : 'New Badge Unlocked!'}
            </span>
            <h3 className="text-xl font-bold text-ink mt-1">{event.title}</h3>
            <p className="text-sm text-muted mt-1">{event.desc}</p>
          </div>

          <div className="p-3 bg-ground rounded-xl border border-line flex items-center justify-center gap-2">
            <span className="text-action font-bold tabular-nums">+{event.xpBonus || 50} XP</span>
            <span className="text-xs text-muted font-medium">
              {lang === 'ar' ? 'مكافأة إضافية مضافة لرصيدك' : 'Bonus XP awarded'}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="btn btn--primary w-full active:scale-[0.96]"
            style={{ minHeight: '44px' }}
          >
            {lang === 'ar' ? 'رائع، استمر في التعلّم' : 'Awesome, Keep Learning'}
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
