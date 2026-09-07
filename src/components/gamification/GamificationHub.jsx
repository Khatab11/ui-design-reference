import { useEffect, useState } from 'react'
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

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event) => event.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  const tabs = [
    {
      id: 'overview',
      label: { ar: 'نظرة عامة', en: 'Overview' },
      icon: '📊',
      badge: null,
    },
    {
      id: 'quests',
      label: { ar: 'المهام اليومية', en: 'Daily Quests' },
      icon: '🎯',
      badge: `${state.quests?.filter((q) => !q.completed && q.current >= q.target).length || 0}`,
    },
    {
      id: 'leaderboard',
      label: { ar: 'لوحة الشرف', en: 'Leaderboard' },
      icon: '🏆',
      badge: 'TOP',
    },
    {
      id: 'badges',
      label: { ar: 'خزانة الأوسمة', en: 'Badges' },
      icon: '🎖️',
      badge: `${state.unlockedBadgeIds?.length || 0}/${BADGES_CATALOG.length}`,
    },
  ]

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/50 p-0 pt-16 backdrop-blur-sm sm:items-center sm:p-6" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="gamification-hub-title"
          className="flex min-h-[calc(100dvh-4rem)] w-full max-w-5xl flex-col overflow-hidden rounded-t-2xl border border-line bg-surface shadow-overlay sm:min-h-0 sm:max-w-6xl sm:rounded-2xl sm:h-[90vh] sm:max-h-[920px]"
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-line flex items-center justify-between bg-ground/60 backdrop-blur-xs">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-action-tint text-action flex items-center justify-center text-2xl border border-action-tint-line shadow-xs">
                ⚡
              </div>
              <div>
                <h2 id="gamification-hub-title" className="text-xl font-bold text-ink leading-tight flex items-center gap-2">
                  <span>{lang === 'ar' ? 'مركز التحفيز والإنجازات' : 'Gamification Hub'}</span>
                  <span className="tag tag--info text-[11px] font-mono uppercase">Mastery</span>
                </h2>
                <p className="text-xs text-muted mt-0.5">
                  {lang === 'ar'
                    ? 'منظومة التعلّم التفاعلية المبنية على معايير Trophy UI وهندسة التصميم'
                    : 'Interactive habit-forming design mastery engine built on Trophy UI standards'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="btn btn--secondary btn--sm h-11 w-11 min-h-[44px] min-w-[44px] !p-0 !rounded-full flex items-center justify-center active:scale-[0.96] hover:bg-surface-sunken"
              aria-label={lang === 'ar' ? 'إغلاق' : 'Close'}
            >
              ✕
            </button>
          </div>

          {/* Elevated Segmented Navigation Tabs — adhering to concentric radii: 12px outer container, 8px buttons */}
          <div className="px-6 py-3.5 bg-ground/30 border-b border-line">
            <nav className="flex items-center gap-2 p-1.5 bg-surface-sunken rounded-xl border border-line overflow-x-auto">
              {tabs.map((t) => {
                const isActive = tab === t.id
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    className={`min-h-[44px] px-5 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2.5 whitespace-nowrap active:scale-[0.96] flex-1 justify-center ${
                      isActive
                        ? 'bg-surface text-ink shadow-sm border border-line font-bold'
                        : 'text-muted hover:text-ink hover:bg-surface/50 border border-transparent'
                    }`}
                    aria-selected={isActive}
                  >
                    <span className="text-lg leading-none">{t.icon}</span>
                    <span className="tracking-tight">{t.label[lang]}</span>
                    {t.badge && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-action-tint text-action'
                            : 'bg-surface text-muted border border-line'
                        }`}
                      >
                        {t.badge}
                      </span>
                    )}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Body Content with generous spacing */}
          <div className="p-6 sm:p-8 lg:p-10 overflow-y-auto flex-1 space-y-8 bg-ground/20">
            {/* 1. OVERVIEW TAB */}
            {tab === 'overview' && (
              <div className="space-y-8">
                {/* Hero Level Progress Card */}
                <div className="card p-6 sm:p-8 bg-surface border border-line rounded-2xl shadow-xs flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-start">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-2xl bg-action-tint text-action flex items-center justify-center text-4xl border border-action-tint-line shrink-0 shadow-raised">
                        🛡️
                      </div>
                      <span className="absolute -bottom-2 -right-2 tag tag--info !text-[11px] !py-0.5 !px-2 font-bold shadow-xs">
                        {lang === 'ar' ? `مستوى ${rank.level}` : `Lvl ${rank.level}`}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 justify-center sm:justify-start">
                        <span className="tag tag--neutral text-xs font-semibold uppercase tracking-wider">
                          {lang === 'ar' ? 'الرتبة المهنية الحالية' : 'Current Mastery Rank'}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                        {rank.title[lang]}
                      </h3>
                      <p className="text-sm text-muted max-w-md">
                        {nextRank
                          ? lang === 'ar'
                            ? `تحتاج إلى ${xpNeeded.toLocaleString()} XP إضافية للترقية إلى «${nextRank.title[lang]}»`
                            : `${xpNeeded.toLocaleString()} XP remaining to achieve "${nextRank.title[lang]}"`
                          : lang === 'ar'
                          ? 'أنت الآن في قمة الإتقان التصميمي!'
                          : 'You reached the pinnacle of design mastery!'}
                      </p>
                    </div>
                  </div>

                  <div className="w-full lg:w-80 space-y-3 p-5 bg-ground rounded-xl border border-line">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-ink font-bold tabular-nums text-sm">{state.xp.toLocaleString()} XP</span>
                      <span className="text-muted tabular-nums">
                        {nextRank ? `${nextRank.minXp.toLocaleString()} XP` : 'MAX'}
                      </span>
                    </div>
                    <div className="w-full h-3.5 bg-surface-sunken rounded-full overflow-hidden border border-line">
                      <div
                        className="h-full bg-action rounded-full transition-all duration-500"
                        style={{ width: `${progressInLevel}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[11px] text-muted">
                      <span>{progressInLevel}% {lang === 'ar' ? 'مكتمل' : 'progress'}</span>
                      <span className="font-semibold text-action">
                        {nextRank ? `${nextRank.title[lang]}` : '★'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Spacious 4 Quick Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  <div className="card p-6 bg-surface border border-line rounded-2xl hover:shadow-raised transition-all flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl bg-[#FFF3E0] text-[#E65100] flex items-center justify-center text-2xl mb-3 shadow-xs">
                      🔥
                    </div>
                    <p className="text-3xl sm:text-4xl font-bold text-ink tabular-nums tracking-tight">
                      {state.streak}
                    </p>
                    <p className="text-xs font-semibold text-muted uppercase tracking-wider mt-1">
                      {lang === 'ar' ? 'أيام الاستمرارية' : 'Day Streak'}
                    </p>
                  </div>

                  <div className="card p-6 bg-surface border border-line rounded-2xl hover:shadow-raised transition-all flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl bg-action-tint text-action flex items-center justify-center text-2xl mb-3 shadow-xs">
                      ⚡
                    </div>
                    <p className="text-3xl sm:text-4xl font-bold text-action tabular-nums tracking-tight">
                      {state.xp.toLocaleString()}
                    </p>
                    <p className="text-xs font-semibold text-muted uppercase tracking-wider mt-1">
                      {lang === 'ar' ? 'نقاط الخبرة (XP)' : 'Total XP'}
                    </p>
                  </div>

                  <div className="card p-6 bg-surface border border-line rounded-2xl hover:shadow-raised transition-all flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl bg-success-tint text-success flex items-center justify-center text-2xl mb-3 shadow-xs">
                      📖
                    </div>
                    <p className="text-3xl sm:text-4xl font-bold text-ink tabular-nums tracking-tight">
                      {state.completedSections?.length || 0}
                    </p>
                    <p className="text-xs font-semibold text-muted uppercase tracking-wider mt-1">
                      {lang === 'ar' ? 'مبادئ استوعبتها' : 'Mastered Principles'}
                    </p>
                  </div>

                  <div className="card p-6 bg-surface border border-line rounded-2xl hover:shadow-raised transition-all flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-2xl mb-3 shadow-xs">
                      🎖️
                    </div>
                    <p className="text-3xl sm:text-4xl font-bold text-ink tabular-nums tracking-tight">
                      {state.unlockedBadgeIds?.length || 0}
                    </p>
                    <p className="text-xs font-semibold text-muted uppercase tracking-wider mt-1">
                      {lang === 'ar' ? 'أوسمة مفتوحة' : 'Unlocked Badges'}
                    </p>
                  </div>
                </div>

                {/* Quests Preview Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-ink flex items-center gap-2">
                      <span>🎯</span>
                      <span>{lang === 'ar' ? 'مهام اليوم النشطة' : 'Active Daily Quests'}</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setTab('quests')}
                      className="btn btn--quiet btn--sm text-xs font-bold text-action"
                    >
                      {lang === 'ar' ? 'عرض كافة المهام ←' : 'View all quests →'}
                    </button>
                  </div>
                  <QuestsList quests={state.quests} lang={lang} onClaimQuest={onClaimQuest} />
                </div>
              </div>
            )}

            {/* 2. QUESTS TAB */}
            {tab === 'quests' && (
              <div className="space-y-6 max-w-4xl mx-auto">
                <div className="flex items-center justify-between pb-2 border-b border-line">
                  <div>
                    <h3 className="text-2xl font-bold text-ink">
                      {lang === 'ar' ? 'المهام اليومية وتحديات الإتقان' : 'Daily Quests & Mastery Challenges'}
                    </h3>
                    <p className="text-sm text-muted mt-0.5">
                      {lang === 'ar'
                        ? 'أكمل هذه المهام خلال دراستك لتكسب نقاط خبرة إضافية ترفع رتبتك'
                        : 'Complete these learning actions to earn bonus XP and climb ranks'}
                    </p>
                  </div>
                  <span className="tag tag--info text-xs font-bold px-3 py-1">
                    {lang === 'ar' ? 'تتجدد عند منتصف الليل' : 'Resets at midnight'}
                  </span>
                </div>
                <QuestsList quests={state.quests} lang={lang} onClaimQuest={onClaimQuest} />
              </div>
            )}

            {/* 3. LEADERBOARD TAB */}
            {tab === 'leaderboard' && (
              <div className="space-y-6 max-w-4xl mx-auto">
                <div className="flex items-center justify-between pb-2 border-b border-line">
                  <div>
                    <h3 className="text-2xl font-bold text-ink">
                      {lang === 'ar' ? 'لوحة شرف متصدري الدفعة' : 'Cohort Leaderboard & League Rankings'}
                    </h3>
                    <p className="text-sm text-muted mt-0.5">
                      {lang === 'ar'
                        ? 'تنافس شريف وإيجابي مع زملائك المصممين في دفعة التعلّم الحالية'
                        : 'Friendly peer benchmarking based on consistent learning and application'}
                    </p>
                  </div>
                  <span className="tag tag--success text-xs font-bold px-3 py-1">
                    {lang === 'ar' ? 'دوري هذا الأسبوع نشط' : 'Weekly League Active'}
                  </span>
                </div>
                <Leaderboard userXp={state.xp} userName={state.userName} lang={lang} />
              </div>
            )}

            {/* 4. BADGES TAB */}
            {tab === 'badges' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-line">
                  <div>
                    <h3 className="text-2xl font-bold text-ink">
                      {lang === 'ar' ? 'خزانة الأوسمة والإنجازات' : 'Badges & Trophy Showcase'}
                    </h3>
                    <p className="text-sm text-muted mt-0.5">
                      {lang === 'ar'
                        ? 'أوسمة دائرية كودية توضح نسبة الندرة المجتمعية ومدى تقدمك في كل تخصص'
                        : 'Concentric SVG circular badges displaying criteria completion and global rarity'}
                    </p>
                  </div>
                  <span className="tag tag--info text-xs font-bold px-3 py-1">
                    {state.unlockedBadgeIds?.length || 0} / {BADGES_CATALOG.length} {lang === 'ar' ? 'مفتوح' : 'unlocked'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
