import { getCurrentRank } from '../../lib/gamification.js'

export default function XpCounter({ xp = 1240, lang = 'ar', onClick }) {
  const { rank, nextRank, progressInLevel, xpNeeded } = getCurrentRank(xp)

  return (
    <button
      type="button"
      onClick={onClick}
      className="btn btn--secondary btn--sm !rounded-full !px-3 !py-1 !gap-2 text-start transition-transform active:scale-[0.96] hover:border-line-hover"
      style={{ minHeight: '38px' }}
      title={lang === 'ar' ? `انقر لفتح مركز الإنجازات (${xp} XP)` : `Click to open Gamification Hub (${xp} XP)`}
    >
      <div className="flex items-center gap-1.5">
        <span className="w-5 h-5 rounded-full bg-action-tint text-action flex items-center justify-center text-xs font-bold">
          ⚡
        </span>
        <span className="font-bold tabular-nums text-ink text-sm">
          {xp.toLocaleString()}
        </span>
        <span className="text-[11px] font-semibold text-muted">XP</span>
      </div>

      <div className="h-4 w-px bg-line hidden sm:block" />

      <div className="hidden sm:flex items-center gap-1.5">
        <span className="text-xs font-semibold text-ink">
          {rank.title[lang]}
        </span>
        <div className="w-12 h-1.5 bg-line rounded-full overflow-hidden">
          <div
            className="h-full bg-action transition-all duration-300 rounded-full"
            style={{ width: `${progressInLevel}%` }}
          />
        </div>
      </div>
    </button>
  )
}
