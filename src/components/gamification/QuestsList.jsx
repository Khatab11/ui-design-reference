export default function QuestsList({ quests = [], lang = 'ar', onClaimQuest }) {
  const completedCount = quests.filter((q) => q.completed).length

  return (
    <div className="card p-6 sm:p-8 space-y-6 rounded-2xl bg-surface border border-line shadow-xs">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 className="text-xl font-bold text-ink flex items-center gap-2.5">
            <span>🎯</span>
            <span>{lang === 'ar' ? 'المهام اليومية (Daily Quests)' : 'Daily Quests'}</span>
          </h3>
          <p className="text-xs text-muted mt-1">
            {lang === 'ar' ? 'مهام تصميمية سريعة تتجدد تلقائياً كل يوم عند منتصف الليل' : 'Daily micro-challenges that reset automatically at midnight'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="tag tag--info text-xs font-bold px-3 py-1">
            {completedCount} / {quests.length} {lang === 'ar' ? 'مكتمل' : 'completed'}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {quests.map((quest) => {
          const percent = Math.min(100, Math.round((quest.current / quest.target) * 100))
          const isFinished = quest.current >= quest.target

          return (
            <div
              key={quest.id}
              className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                quest.completed
                  ? 'bg-success-tint/40 border-success-line'
                  : isFinished
                  ? 'bg-action-tint/30 border-action-tint-line shadow-xs'
                  : 'bg-ground/60 border-line hover:border-line-hover'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 border transition-colors ${
                      quest.completed
                        ? 'bg-success text-white border-success'
                        : isFinished
                        ? 'bg-action text-white border-action shadow-xs animate-bounce'
                        : 'bg-surface text-muted border-line'
                    }`}
                  >
                    {quest.completed ? '✓' : isFinished ? '!' : '•'}
                  </div>
                  <div>
                    <h4 className={`text-base font-bold ${quest.completed ? 'line-through text-muted' : 'text-ink'}`}>
                      {quest.title[lang]}
                    </h4>
                    <p className="text-xs text-muted tabular-nums mt-0.5">
                      {quest.current} / {quest.target} {lang === 'ar' ? 'خطوة تم إنجازها' : 'steps completed'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
                  <span className="tag tag--info font-bold tabular-nums text-xs !py-1 !px-2.5">
                    +{quest.xp} XP
                  </span>

                  {isFinished && !quest.completed && (
                    <button
                      type="button"
                      onClick={() => onClaimQuest?.(quest.id)}
                      className="btn btn--primary btn--sm min-h-[44px] !px-4 !text-xs font-bold active:scale-[0.96] shadow-xs"
                    >
                      {lang === 'ar' ? 'استلام المكافأة ⚡' : 'Claim Reward ⚡'}
                    </button>
                  )}

                  {quest.completed && (
                    <span className="tag tag--success text-xs !py-1 !px-2.5 font-bold">
                      {lang === 'ar' ? 'تم الاستلام ✓' : 'Claimed ✓'}
                    </span>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] text-muted font-semibold">
                  <span>{percent}%</span>
                  <span>{isFinished ? (lang === 'ar' ? 'جاهز للاستلام' : 'Ready') : `${quest.target - quest.current} ${lang === 'ar' ? 'متبقي' : 'left'}`}</span>
                </div>
                <div className="w-full h-2.5 bg-surface-sunken rounded-full overflow-hidden border border-line">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${
                      quest.completed ? 'bg-success' : 'bg-action'
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
