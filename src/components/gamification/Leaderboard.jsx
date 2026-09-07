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
    <div className="card space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-ink flex items-center gap-2">
            <span>🏆</span>
            {lang === 'ar' ? 'لوحة شرف مجتمع المصممين' : 'Designers Leaderboard'}
          </h3>
          <p className="text-xs text-muted">
            {lang === 'ar' ? 'تحديث أسبوعي مبني على الاستيعاب والتفاعل' : 'Weekly cohort rankings based on mastery'}
          </p>
        </div>
        <span className="tag tag--info text-xs">
          {lang === 'ar' ? 'دوري هذا الأسبوع' : 'This Week League'}
        </span>
      </div>

      {/* Top 3 Podium Showcase */}
      <div className="pt-2 pb-4 px-2 bg-ground rounded-xl border border-line flex items-end justify-center gap-3 sm:gap-6">
        {podiumOrder.map((peer) => {
          const isFirst = peer.rank === 1
          const height = isFirst ? 'h-32' : peer.rank === 2 ? 'h-24' : 'h-20'
          const crownColor = crownColors[peer.rank]

          return (
            <div key={peer.id} className="flex flex-col items-center">
              <div className="relative mb-2">
                <span className={`absolute -top-3.5 left-1/2 -translate-x-1/2 ${crownColor}`}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
                    <path d="M5 21h14" />
                  </svg>
                </span>
                <img
                  src={peer.avatar}
                  alt={peer.name}
                  className={`rounded-full object-cover border-2 shadow-sm ${
                    isFirst ? 'w-14 h-14 border-[#F59E0B]' : 'w-11 h-11 border-line-strong'
                  }`}
                />
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-surface text-ink text-[10px] font-bold px-1.5 py-0.2 rounded-full border border-line shadow-xs">
                  #{peer.rank}
                </span>
              </div>
              <span className="text-xs font-bold text-ink max-w-[80px] sm:max-w-[100px] truncate text-center">
                {peer.name}
              </span>
              <span className="text-[11px] font-semibold text-action tabular-nums">
                {peer.xp.toLocaleString()} XP
              </span>

              {/* Podium Column Base */}
              <div
                className={`w-16 sm:w-24 mt-2 rounded-t-lg flex items-center justify-center font-bold text-muted text-sm border-t border-x border-line ${height} ${
                  isFirst ? 'bg-action-tint/50 text-action' : 'bg-surface-sunken'
                }`}
              >
                {peer.rank}
              </div>
            </div>
          )
        })}
      </div>

      {/* Rankings List */}
      <div className="divide-y divide-line border border-line rounded-xl overflow-hidden bg-surface">
        {rest.map((peer) => {
          const isMe = peer.isCurrentUser
          return (
            <div
              key={peer.id}
              className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                isMe ? 'bg-action-tint border-l-4 border-action' : 'hover:bg-ground'
              }`}
            >
              {/* Rank Position */}
              <div className="w-7 text-center">
                {peer.rank <= 3 ? (
                  <span className={`font-bold ${crownColors[peer.rank]}`}>#{peer.rank}</span>
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
                className="w-9 h-9 rounded-full object-cover border border-line"
              />

              {/* User details */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className={`text-sm truncate ${isMe ? 'font-bold text-action' : 'font-semibold text-ink'}`}>
                    {peer.name}
                  </p>
                  {isMe && (
                    <span className="tag tag--info !text-[10px] !py-0.2">
                      {lang === 'ar' ? 'موقعك الحالي' : 'You'}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted truncate">
                  {typeof peer.levelTitle === 'object' ? peer.levelTitle[lang] : peer.levelTitle}
                </p>
              </div>

              {/* League Tier */}
              <span className="tag tag--neutral !text-[10px] hidden sm:inline-flex">
                {peer.tier}
              </span>

              {/* Points */}
              <div className="text-end">
                <p className="font-bold text-ink tabular-nums text-sm">
                  {peer.xp.toLocaleString()}
                </p>
                <p className="text-[10px] text-muted font-semibold uppercase">XP</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Table Footer */}
      <div className="flex items-center justify-between text-xs text-muted pt-1">
        <div className="flex items-center gap-2">
          <span>{lang === 'ar' ? 'عرض:' : 'Show:'}</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="select !py-1 min-h-[44px] text-xs"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <p>
          {lang === 'ar' ? 'يتم إعادة تعيين الدوري كل يوم أحد' : 'Leagues reset every Sunday at midnight'}
        </p>
      </div>
    </div>
  )
}
