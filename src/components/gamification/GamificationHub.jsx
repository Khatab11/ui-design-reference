import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BADGES_CATALOG, getCurrentRank } from '../../lib/gamification.js'
import Leaderboard from './Leaderboard.jsx'
import QuestsList from './QuestsList.jsx'
import AchievementCard from './AchievementCard.jsx'

export default function GamificationHub({
  open = false,
  onClose,
  state,
  lang = 'ar',
  onClaimQuest,
}) {
  const [tab, setTab] = useState('overview') // 'overview' | 'quests' | 'leaderboard' | 'badges'
  const { rank, nextRank, progressInLevel, xpNeeded } = getCurrentRank(state.xp)

  if (!open) return null

  const tabs = [
    { id: 'overview', label: { ar: 'نظرة عامة', en: 'Overview' }, icon: '📊' },
    { id: 'quests', label: { ar: 'المهام', en: 'Quests' }, icon: '🎯' },
    { id: 'leaderboard', label: { ar: 'المتصدرين', en: 'Leaderboard' }, icon: '🏆' },
    { id: 'badges', label: { ar: 'الأوسمة', en: 'Badges' }, icon: '🎖️' },
  ]

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-ink/40 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
          className="bg-surface rounded-2xl border border-line shadow-overlay w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-line flex items-center justify-between bg-ground/50">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-action-tint text-action flex items-center justify-center text-xl shadow-xs">
                ⚡
              </span>
              <div>
                <h2 className="text-lg font-bold text-ink leading-tight">
                  {lang === 'ar' ? 'مركز التحفيز والإنجازات' : 'Gamification Hub'}
                </h2>
                <p className="text-xs text-muted">
                  {lang === 'ar' ? 'متابعة التقدّم، الرتب، ولوحة المتصدرين' : 'Track your progress, ranks, and cohort standings'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="btn btn--secondary btn--sm !p-2 !min-h-[36px] !rounded-full"
              aria-label={lang === 'ar' ? 'إغلاق' : 'Close'}
            >
              ✕
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-line px-4 sm:px-6 bg-surface gap-2 sm:gap-4 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`py-3 px-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  tab === t.id
                    ? 'border-action text-action font-bold'
                    : 'border-transparent text-muted hover:text-ink'
                }`}
              >
                <span>{t.icon}</span>
                <span>{t.label[lang]}</span>
              </button>
            ))}
          </div>

          {/* Body Content */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
            {/* 1. OVERVIEW TAB */}
            {tab === 'overview' && (
              <div className="space-y-6">
                {/* Level Card */}
                <div className="card p-6 bg-ground border border-line rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4 text-center sm:text-start">
                    <div className="w-20 h-20 rounded-2xl bg-action-tint text-action flex items-center justify-center text-3xl border border-action-tint-line shrink-0 shadow-sm">
                      🛡️
                    </div>
                    <div>
                      <div className="flex items-center gap-2 justify-center sm:justify-start">
                        <span className="tag tag--info text-xs">{lang === 'ar' ? `المستوى ${rank.level}` : `Level ${rank.level}`}</span>
                        <span className="text-xs text-muted">{lang === 'ar' ? 'رتبتك الحالية' : 'Current Rank'}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-ink mt-1">
                        {rank.title[lang]}
                      </h3>
                      <p className="text-xs text-muted mt-1">
                        {nextRank
                          ? lang === 'ar'
                            ? `متبقي ${xpNeeded.toLocaleString()} XP للترقية إلى «${nextRank.title[lang]}»`
                            : `${xpNeeded.toLocaleString()} XP to reach "${nextRank.title[lang]}"`
                          : lang === 'ar'
                          ? 'لقد بلغت أعلى رتبة تصميمية!'
                          : 'You reached the pinnacle of design mastery!'}
                      </p>
                    </div>
                  </div>

                  <div className="w-full sm:w-64 space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-ink tabular-nums">{state.xp.toLocaleString()} XP</span>
                      <span className="text-muted tabular-nums">{nextRank ? `${nextRank.minXp.toLocaleString()} XP` : 'MAX'}</span>
                    </div>
                    <div className="w-full h-3 bg-surface-sunken rounded-full overflow-hidden border border-line">
                      <div
                        className="h-full bg-action rounded-full transition-all duration-500"
                        style={{ width: `${progressInLevel}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-muted text-center sm:text-end">
                      {progressInLevel}% {lang === 'ar' ? 'إنجاز المستوى' : 'completed'}
                    </p>
                  </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="card p-4 text-center">
                    <span className="text-2xl">🔥</span>
                    <p className="text-2xl font-bold text-ink tabular-nums mt-1">{state.streak}</p>
                    <p className="text-xs text-muted">{lang === 'ar' ? 'أيام الاستمرارية' : 'Day Streak'}</p>
                  </div>
                  <div className="card p-4 text-center">
                    <span className="text-2xl">⚡</span>
                    <p className="text-2xl font-bold text-action tabular-nums mt-1">{state.xp.toLocaleString()}</p>
                    <p className="text-xs text-muted">{lang === 'ar' ? 'مجموع النقاط' : 'Total XP'}</p>
                  </div>
                  <div className="card p-4 text-center">
                    <span className="text-2xl">📖</span>
                    <p className="text-2xl font-bold text-ink tabular-nums mt-1">{state.completedSections?.length || 0}</p>
                    <p className="text-xs text-muted">{lang === 'ar' ? 'أقسام مكتملة' : 'Mastered Sections'}</p>
                  </div>
                  <div className="card p-4 text-center">
                    <span className="text-2xl">🎖️</span>
                    <p className="text-2xl font-bold text-ink tabular-nums mt-1">{state.unlockedBadgeIds?.length || 0}</p>
                    <p className="text-xs text-muted">{lang === 'ar' ? 'أوسمة مفتوحة' : 'Unlocked Badges'}</p>
                  </div>
                </div>

                {/* Sneak peek of daily quests */}
                <QuestsList quests={state.quests} lang={lang} onClaimQuest={onClaimQuest} />
              </div>
            )}

            {/* 2. QUESTS TAB */}
            {tab === 'quests' && (
              <QuestsList quests={state.quests} lang={lang} onClaimQuest={onClaimQuest} />
            )}

            {/* 3. LEADERBOARD TAB */}
            {tab === 'leaderboard' && (
              <Leaderboard userXp={state.xp} lang={lang} />
            )}

            {/* 4. BADGES TAB */}
            {tab === 'badges' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-ink">
                      {lang === 'ar' ? 'خزانة الأوسمة والإنجازات' : 'Badges & Trophies'}
                    </h3>
                    <p className="text-xs text-muted">
                      {lang === 'ar' ? 'تفتح الأوسمة تدريجياً مع تطبيقك العملي للمبادئ' : 'Unlocked by actively studying and applying UI principles'}
                    </p>
                  </div>
                  <span className="tag tag--info text-xs">
                    {state.unlockedBadgeIds?.length || 0} / {BADGES_CATALOG.length} {lang === 'ar' ? 'مفتوح' : 'unlocked'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {BADGES_CATALOG.map((badge) => {
                    const isUnlocked = state.unlockedBadgeIds?.includes(badge.id)
                    const progress = state.badgeProgress?.[badge.id] || 0
                    return (
                      <AchievementCard
                        key={badge.id}
                        badge={badge}
                        unlocked={isUnlocked}
                        currentProgress={progress}
                        lang={lang}
                      />
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
