import { useMemo, useState } from 'react'
import { computeLeaderboard } from '../../lib/gamification.js'

export default function Leaderboard({ userXp = 1240, userName, lang = 'ar' }) {
  const [pageSize, setPageSize] = useState(10)
  const defaultName = lang === 'ar' ? 'أنت (المتعلم)' : 'You (Learner)'
  const displayName = userName || defaultName
  const leaderboard = useMemo(() => computeLeaderboard(userXp, displayName), [userXp, displayName])

  const top3 = leaderboard.slice(0, 3)
  const rest = leaderboard.slice(0, pageSize)

  const crownColors = {
    1: 'text-[#F59E0B]', // Gold
    2: 'text-[#94A3B8]', // Silver
    3: 'text-[#D97706]', // Bronze
  }

  const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean) // 2nd, 1st, 3rd

  return (
    <div className="card p-6 sm:p-8 space-y-8 rounded-2xl bg-surface border border-line shadow-xs">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 className="text-xl font-bold text-ink flex items-center gap-2">
            <span>🏆</span>
            <span>{lang === 'ar' ? 'لوحة شرف مجتمع المصممين' : 'Designers Leaderboard'}</span>
          </h3>
          <p className="text-xs text-muted mt-1">
            {lang === 'ar' ? 'تحديث دوري وتصنيف أسبوعي مبني على استيعاب المبادئ' : 'Weekly cohort rankings based on verified design mastery'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="tag tag--info text-xs font-bold px-3 py-1">
            {lang === 'ar' ? 'دوري هذا الأسبوع' : 'This Week League'}
          </span>
          <span className="tag tag--neutral text-xs font-mono">
            {leaderboard.length} {lang === 'ar' ? 'مصمم' : 'designers'}
          </span>
        </div>
      </div>

      {/* Spacious Top 3 Podium Showcase */}
      <div className="pt-6 pb-6 px-4 sm:px-8 bg-ground rounded-2xl border border-line flex items-end justify-center gap-4 sm:gap-8">
        {podiumOrder.map((peer) => {
          const isFirst = peer.rank === 1
          const height = isFirst ? 'h-36' : peer.rank === 2 ? 'h-28' : 'h-24'
          const crownColor = crownColors[peer.rank]

          return (
            <div key={peer.id} className="flex flex-col items-center">
              <div className="relative mb-3">
                <span className={`absolute -top-4 left-1/2 -translate-x-1/2 ${crownColor}`}>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
                    <path d="M5 21h14" />
                  </svg>
                </span>
                <img
                  src={peer.avatar}
                  alt={peer.name}
                  className={`rounded-full object-cover border-2 shadow-sm ${
                    isFirst ? 'w-16 h-16 border-[#F59E0B] shadow-raised' : 'w-12 h-12 border-line-strong'
                  }`}
                />
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-surface text-ink text-[11px] font-bold px-2 py-0.5 rounded-full border border-line shadow-xs">
                  #{peer.rank}
                </span>
              </div>
              <span className="text-xs sm:text-sm font-bold text-ink max-w-[90px] sm:max-w-[120px] truncate text-center">
                {peer.name}
              </span>
              <span className="text-xs font-bold text-action tabular-nums mt-0.5">
                {peer.xp.toLocaleString()} XP
              </span>

              {/* Podium Column Base */}
              <div
                className={`w-20 sm:w-32 mt-3 rounded-t-xl flex flex-col items-center justify-center font-bold text-sm border-t border-x border-line ${height} ${
                  isFirst ? 'bg-action-tint/60 text-action shadow-xs' : 'bg-surface-sunken text-muted'
                }`}
              >
                <span className="text-lg">{peer.rank === 1 ? '🥇' : peer.rank === 2 ? '🥈' : '🥉'}</span>
                <span className="text-xs font-mono uppercase tracking-wider">{peer.tier}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Rankings List with generous row padding */}
      <div className="divide-y divide-line border border-line rounded-2xl overflow-hidden bg-surface shadow-xs">
        {rest.map((peer) => {
          const isMe = peer.isCurrentUser
          return (
            <div
              key={peer.id}
              className={`flex items-center gap-3.5 px-5 py-3.5 transition-colors ${
                isMe ? 'bg-action-tint/60 border-l-4 border-action font-semibold' : 'hover:bg-ground/50'
              }`}
            >
              {/* Rank Position */}
              <div className="w-8 text-center shrink-0">
                {peer.rank <= 3 ? (
                  <span className={`font-bold text-base ${crownColors[peer.rank]}`}>#{peer.rank}</span>
                ) : (
                  <span className="text-sm font-semibold tabular-nums text-muted">
                    #{peer.rank}
                  </span>
                )}
              </div>

              {/* Avatar */}
              <img
                src={peer.avatar}
                alt={peer.name}
                className="w-10 h-10 rounded-full object-cover border border-line shrink-0"
              />

              {/* User details */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className={`text-sm truncate ${isMe ? 'font-bold text-action' : 'font-semibold text-ink'}`}>
                    {peer.name}
                  </p>
                  {isMe && (
                    <span className="tag tag--info !text-[10px] !py-0.2 font-bold">
                      {lang === 'ar' ? 'أنت' : 'You'}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted truncate mt-0.5">
                  {typeof peer.levelTitle === 'object' ? peer.levelTitle[lang] : peer.levelTitle}
                </p>
              </div>

              {/* League Tier */}
              <span className="tag tag--neutral !text-xs hidden sm:inline-flex font-mono">
                {peer.tier}
              </span>

              {/* Points */}
              <div className="text-end shrink-0 ps-2">
                <p className="font-bold text-ink tabular-nums text-base">
                  {peer.xp.toLocaleString()}
                </p>
                <p className="text-[10px] text-muted font-bold uppercase tracking-wider">XP</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Table Footer */}
      <div className="flex items-center justify-between text-xs text-muted pt-2 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span>{lang === 'ar' ? 'عرض عدد الصفوف:' : 'Show rows:'}</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="select !py-1 min-h-[44px] text-xs font-semibold"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <p>
          {lang === 'ar' ? 'يتم تحديث وإعادة تعيين الدوري الأسبوعي كل يوم أحد' : 'Weekly leagues reset every Sunday at midnight'}
        </p>
      </div>
    </div>
  )
}
