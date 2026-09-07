export default function QuestsList({ quests = [], lang = 'ar', onClaimQuest }) {
  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-ink flex items-center gap-2">
            <span>🎯</span>
            {lang === 'ar' ? 'المهام اليومية (Daily Quests)' : 'Daily Quests'}
          </h3>
          <p className="text-xs text-muted">
            {lang === 'ar' ? 'تتجدد المهام يومياً عند منتصف الليل' : 'Quests reset daily at midnight'}
          </p>
        </div>
        <span className="tag tag--info text-xs">
          {quests.filter((q) => q.completed).length} / {quests.length} {lang === 'ar' ? 'منجز' : 'done'}
        </span>
      </div>

      <div className="space-y-3">
        {quests.map((quest) => {
          const percent = Math.min(100, Math.round((quest.current / quest.target) * 100))
          const isFinished = quest.current >= quest.target

          return (
            <div
              key={quest.id}
              className={`p-4 rounded-xl border transition-all ${
                quest.completed
                  ? 'bg-success-tint/40 border-success-line'
                  : isFinished
                  ? 'bg-action-tint/30 border-action-tint-line'
                  : 'bg-surface border-line'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h4 className={`text-sm font-bold ${quest.completed ? 'line-through text-muted' : 'text-ink'}`}>
                    {quest.title[lang]}
                  </h4>
                  <p className="text-xs text-muted tabular-nums mt-0.5">
                    {quest.current} / {quest.target} {lang === 'ar' ? 'خطوة مكتملة' : 'steps completed'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="tag tag--info font-bold tabular-nums !text-xs">
                    +{quest.xp} XP
                  </span>

                  {isFinished && !quest.completed && (
                    <button
                      type="button"
                      onClick={() => onClaimQuest?.(quest.id)}
                      className="btn btn--primary btn--sm min-h-[44px] !px-3.5 !text-xs font-bold active:scale-[0.96]"
                    >
                      {lang === 'ar' ? 'استلام المكافأة' : 'Claim'}
                    </button>
                  )}

                  {quest.completed && (
                    <span className="tag tag--success !text-xs">
                      {lang === 'ar' ? 'تم الاستلام ✓' : 'Claimed ✓'}
                    </span>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-surface-sunken rounded-full overflow-hidden border border-line/60">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    quest.completed ? 'bg-success' : 'bg-action'
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
