export default function AchievementCard({ badge, unlocked = false, currentProgress = 0, lang = 'ar' }) {
  const percent = Math.min(100, Math.round((currentProgress / badge.requiredCount) * 100))
  const radius = 34
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
      className={`card transition-all relative overflow-hidden flex flex-col items-center text-center p-6 rounded-2xl border ${
        unlocked
          ? 'border-line hover:shadow-raised bg-surface shadow-xs'
          : 'bg-surface-sunken/50 opacity-85 border-line/80'
      }`}
    >
      {/* Top Header: Rarity & Status */}
      <div className="w-full flex justify-between items-center mb-4">
        <span className={`tag text-[11px] font-bold !py-0.5 !px-2.5 ${unlocked ? 'tag--success' : 'tag--neutral'}`}>
          {unlocked ? (lang === 'ar' ? 'مفتوح ✓' : 'Unlocked ✓') : `${percent}%`}
        </span>
        <span className="text-xs text-muted font-medium font-mono">
          {lang === 'ar' ? `أحرزه ${badge.rarity}%` : `${badge.rarity}% of users`}
        </span>
      </div>

      {/* Spacious Trophy Circle with Circular SVG Progress Ring */}
      <div className="relative flex items-center justify-center w-24 h-24 my-2">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 90 90">
          {/* Background track circle */}
          <circle
            cx="45"
            cy="45"
            r={radius}
            fill="none"
            stroke="var(--color-line)"
            strokeWidth="5"
          />
          {/* Animated Progress circle */}
          <circle
            cx="45"
            cy="45"
            r={radius}
            fill="none"
            stroke={unlocked ? 'var(--color-success)' : 'var(--color-action)'}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500 ease-out"
          />
        </svg>

        {/* Central Icon */}
        <div
          className={`absolute inset-0 m-auto w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-xs transition-colors ${
            unlocked
              ? 'bg-action-tint text-action border border-action-tint-line'
              : 'bg-surface-sunken text-muted border border-line'
          }`}
        >
          {iconGlyphs[badge.icon] || '🏆'}
        </div>
      </div>

      {/* Info with generous line height and spacing */}
      <h4 className="text-base font-bold text-ink mt-3 mb-1.5">
        {badge.title[lang]}
      </h4>
      <p className="text-xs text-muted line-clamp-2 max-w-[240px] leading-relaxed">
        {badge.desc[lang]}
      </p>

      {/* Progress Counter Tag */}
      <div className="mt-4 pt-3 border-t border-line/60 w-full flex items-center justify-center">
        <span className="tag tag--neutral text-xs font-semibold tabular-nums">
          {currentProgress} / {badge.requiredCount} {lang === 'ar' ? 'مكتمل' : 'steps done'}
        </span>
      </div>
    </div>
  )
}
