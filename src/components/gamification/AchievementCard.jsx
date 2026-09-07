export default function AchievementCard({ badge, unlocked = false, currentProgress = 0, lang = 'ar' }) {
  const percent = Math.min(100, Math.round((currentProgress / badge.requiredCount) * 100))
  const radius = 28
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (circumference * (unlocked ? 100 : percent)) / 100

  const iconGlyphs = {
    grid: '📐',
    type: '🔤',
    palette: '🎨',
    moon: '🌙',
    flame: '🔥',
    languages: '🌐',
  }

  return (
    <div
      className={`card transition-all relative overflow-hidden flex flex-col items-center text-center p-5 ${
        unlocked
          ? 'border-line hover:shadow-raised bg-surface'
          : 'bg-surface-sunken/60 opacity-80 border-line/70'
      }`}
    >
      {/* Rarity Pill Badge */}
      <div className="w-full flex justify-between items-center mb-3">
        <span className={`tag !text-[10px] !py-0.5 ${unlocked ? 'tag--success' : 'tag--neutral'}`}>
          {unlocked ? (lang === 'ar' ? 'مكتمل ✓' : 'Unlocked ✓') : `${percent}%`}
        </span>
        <span className="text-[10px] text-muted font-medium">
          {lang === 'ar' ? `أحرزه ${badge.rarity}%` : `${badge.rarity}% of users`}
        </span>
      </div>

      {/* Trophy Circle with Circular SVG Progress Ring */}
      <div className="relative flex items-center justify-center w-20 h-20 my-1">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 72 72">
          {/* Background circle */}
          <circle
            cx="36"
            cy="36"
            r={radius}
            fill="none"
            stroke="var(--color-line)"
            strokeWidth="4"
          />
          {/* Progress circle */}
          <circle
            cx="36"
            cy="36"
            r={radius}
            fill="none"
            stroke={unlocked ? 'var(--color-success)' : 'var(--color-action)'}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500 ease-out"
          />
        </svg>

        {/* Central Icon */}
        <div
          className={`absolute inset-0 m-auto w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-xs transition-colors ${
            unlocked
              ? 'bg-action-tint text-action'
              : 'bg-surface-sunken text-muted'
          }`}
        >
          {iconGlyphs[badge.icon] || '🏆'}
        </div>
      </div>

      {/* Info */}
      <h4 className="text-sm font-bold text-ink mt-2 mb-1">
        {badge.title[lang]}
      </h4>
      <p className="text-xs text-muted line-clamp-2 max-w-[200px]">
        {badge.desc[lang]}
      </p>

      {/* Progress counter */}
      <div className="mt-3 text-[11px] font-semibold text-muted tabular-nums">
        {currentProgress} / {badge.requiredCount} {lang === 'ar' ? 'مكتمل' : 'completed'}
      </div>
    </div>
  )
}
