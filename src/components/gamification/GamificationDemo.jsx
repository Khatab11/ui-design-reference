import { useState } from 'react'
import {
  BADGES_CATALOG,
  getCurrentRank,
  INITIAL_GAMIFICATION_STATE,
} from '../../lib/gamification.js'
import StreakBadge from './StreakBadge.jsx'
import XpCounter from './XpCounter.jsx'
import Leaderboard from './Leaderboard.jsx'
import QuestsList from './QuestsList.jsx'
import AchievementCard from './AchievementCard.jsx'
import SectionAction from './SectionAction.jsx'
import GamificationHub from './GamificationHub.jsx'
import CelebrationToast from './CelebrationToast.jsx'

export default function GamificationDemo({ lang = 'ar' }) {
  const [state, setState] = useState(INITIAL_GAMIFICATION_STATE)
  const [hubOpen, setHubOpen] = useState(false)
  const [toastEvent, setToastEvent] = useState(null)

  const { rank, nextRank, progressInLevel, xpNeeded } = getCurrentRank(state.xp)

  // Add XP action
  const addXp = (amount, reason = '') => {
    setState((prev) => {
      const newXp = prev.xp + amount
      const oldRank = getCurrentRank(prev.xp).rank
      const newRank = getCurrentRank(newXp).rank

      if (newRank.level > oldRank.level) {
        setToastEvent({
          type: 'level_up',
          title: lang === 'ar' ? `ترقية إلى «${newRank.title[lang]}»!` : `Promoted to "${newRank.title[lang]}"!`,
          desc: lang === 'ar' ? 'أحسنت! واصل التعلّم والتطبيق للوصول لأعلى المراتب.' : 'Great job! Keep learning to reach top mastery.',
          xpBonus: 50,
        })
      }
      return { ...prev, xp: newXp }
    })
  }

  // Complete a section
  const handleCompleteSection = (secId) => {
    addXp(15)
    setState((prev) => ({
      ...prev,
      completedSections: [...new Set([...prev.completedSections, secId])],
      badgeProgress: {
        ...prev.badgeProgress,
        grid_sentinel: Math.min(5, (prev.badgeProgress.grid_sentinel || 0) + 1),
      },
    }))
  }

  // Claim quest reward
  const handleClaimQuest = (questId) => {
    setState((prev) => {
      const q = prev.quests.find((item) => item.id === questId)
      if (!q || q.completed) return prev
      addXp(q.xp)
      return {
        ...prev,
        quests: prev.quests.map((item) =>
          item.id === questId ? { ...item, completed: true } : item
        ),
      }
    })
  }

  // Add +1 streak day
  const handleAddStreak = () => {
    setState((prev) => ({ ...prev, streak: prev.streak + 1 }))
  }

  // Unlock sample badge
  const handleUnlockBadge = () => {
    const locked = BADGES_CATALOG.find((b) => !state.unlockedBadgeIds.includes(b.id))
    if (!locked) return
    setState((prev) => ({
      ...prev,
      unlockedBadgeIds: [...prev.unlockedBadgeIds, locked.id],
      badgeProgress: {
        ...prev.badgeProgress,
        [locked.id]: locked.requiredCount,
      },
    }))
    setToastEvent({
      type: 'badge_unlocked',
      title: locked.title[lang],
      desc: locked.desc[lang],
      xpBonus: 100,
    })
  }

  // Reset to initial
  const handleReset = () => {
    setState(INITIAL_GAMIFICATION_STATE)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header / Intro */}
      <div className="text-center space-y-3 pb-6 border-b border-line">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-action-tint text-action text-xs font-bold">
          <span>✨</span>
          <span>{lang === 'ar' ? 'عرض تجريبي تفاعلي مستلهم من Trophy UI' : 'Interactive Demo Inspired by Trophy UI'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-ink">
          {lang === 'ar' ? 'نظام التحفيز والتلعيب في المرجع' : 'Gamification & Learning Engine'}
        </h1>
        <p className="text-muted text-base max-w-2xl mx-auto">
          {lang === 'ar'
            ? 'نموذج حي متكامل يوضح كيف ستعمل السلاسل اليومية، لوحة الشرف، نقاط الخبرة، والأوسمة داخل صفحات المرجع وبنفس هوية التصميم الحالية.'
            : 'A live interactive prototype demonstrating how streaks, leaderboards, XP levels, and badges blend into the reference guide.'}
        </p>

        <div className="pt-2 flex items-center justify-center gap-3">
          <a href="#/" className="btn btn--secondary btn--sm">
            ← {lang === 'ar' ? 'العودة للمرجع الأساسي' : 'Back to Reference Guide'}
          </a>
          <button
            type="button"
            onClick={() => setHubOpen(true)}
            className="btn btn--primary btn--sm !gap-2 shadow-xs"
          >
            <span>🏆</span>
            <span>{lang === 'ar' ? 'فتح مركز التحفيز (Modal Hub)' : 'Open Gamification Hub'}</span>
          </button>
        </div>
      </div>

      {/* 1. TOPBAR HUD PREVIEW */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted">
            1. {lang === 'ar' ? 'معاينة شريط الهيدر العلوي (TopBar HUD)' : 'TopBar HUD Preview'}
          </h2>
          <span className="text-xs text-muted">
            {lang === 'ar' ? 'انقر على الشعلة أو الـ XP للتجربة' : 'Click the flame or XP to interact'}
          </span>
        </div>

        <div className="p-4 bg-surface rounded-2xl border border-line shadow-xs flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-ink">
              {lang === 'ar' ? '«ما ليس على المصمّم جهله»' : 'UI Reference'}
            </span>
            <span className="tag tag--info text-xs hidden sm:inline-block">v1.0</span>
          </div>

          <div className="flex items-center gap-2.5">
            <StreakBadge
              streak={state.streak}
              weeklyHistory={state.weeklyHistory}
              streakFreeze={state.streakFreezeAvailable}
              lang={lang}
            />

            <XpCounter
              xp={state.xp}
              lang={lang}
              onClick={() => setHubOpen(true)}
            />

            <button
              type="button"
              onClick={() => setHubOpen(true)}
              className="btn btn--quiet btn--sm !rounded-full !px-3 font-bold"
            >
              🏆 {lang === 'ar' ? 'المركز' : 'Hub'}
            </button>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE SECTION ACTION DEMO */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted">
          2. {lang === 'ar' ? 'زر التفاعل داخل كل قسم في المقال (In-Article Action)' : 'In-Article Mastery Action'}
        </h2>

        <div className="card p-6 bg-surface border border-line rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-action">
            <span>§ 02</span>
            <span>·</span>
            <span>{lang === 'ar' ? 'قواعد التخطيط والمسافات' : 'Layout & Spacing Rhythm'}</span>
          </div>

          <h3 className="text-xl font-bold text-ink">
            {lang === 'ar' ? 'مبدأ شبكة الـ 4px وتضاعف المسافات' : 'The 4px Grid and Spacing Multiples'}
          </h3>

          <p className="text-body text-sm leading-relaxed max-w-3xl">
            {lang === 'ar'
              ? 'العناصر المرتبطة ببعضها تُوضع قريبة، بينما تنفصل المجموعات غير المترابطة بمسافات أكبر. جميع قيم المسافات تتضاعف تقريباً: 4px، 8px، 16px، 24px، 48px، 88px. لا تستخدم قيماً عشوائية مثل 13px أو 19px أبداً.'
              : 'Related elements sit close; unrelated elements sit far. Spacing values roughly double: 4px, 8px, 16px, 24px, 48px, 88px. Never introduce arbitrary spacing like 13px or 19px.'}
          </p>

          <div className="p-3 bg-ground rounded-xl border border-line text-xs font-mono text-ink">
            --space-1: 4px; /* icon → label */<br />
            --space-2: 8px; /* label → field */<br />
            --space-3: 16px; /* inside a card */
          </div>

          {/* Real Section Action Button */}
          <SectionAction
            sectionId="spacing-grid-demo"
            isCompleted={state.completedSections.includes('spacing-grid-demo')}
            lang={lang}
            onComplete={handleCompleteSection}
          />
        </div>
      </section>

      {/* 3. SIMULATION PLAYGROUND TOOLBAR */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted">
          3. {lang === 'ar' ? 'لوحة تحكم التجربة السريعة (Simulation Controls)' : 'Simulation Controls'}
        </h2>

        <div className="p-4 bg-ground rounded-xl border border-line flex items-center flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => addXp(15, 'قراءة قسم')}
            className="btn btn--secondary btn--sm !text-xs font-bold active:scale-[0.96]"
          >
            +15 XP ({lang === 'ar' ? 'قراءة قسم' : 'Read Section'})
          </button>
          <button
            type="button"
            onClick={() => addXp(100, 'إتمام فصل')}
            className="btn btn--secondary btn--sm !text-xs font-bold active:scale-[0.96]"
          >
            +100 XP ({lang === 'ar' ? 'إتمام فصل' : 'Finish Chapter'})
          </button>
          <button
            type="button"
            onClick={handleAddStreak}
            className="btn btn--secondary btn--sm !text-xs font-bold active:scale-[0.96]"
          >
            🔥 +1 {lang === 'ar' ? 'يوم سلسلة' : 'Streak Day'}
          </button>
          <button
            type="button"
            onClick={handleUnlockBadge}
            className="btn btn--secondary btn--sm !text-xs font-bold active:scale-[0.96]"
          >
            🎖️ {lang === 'ar' ? 'فك وسام جديد' : 'Unlock Badge'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="btn btn--quiet btn--sm !text-xs text-muted hover:text-ink ms-auto"
          >
            🔄 {lang === 'ar' ? 'إعادة تعيين الحالة' : 'Reset State'}
          </button>
        </div>
      </section>

      {/* 4. LEADERBOARD & QUESTS SIDE-BY-SIDE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <Leaderboard userXp={state.xp} lang={lang} />
        </div>
        <div className="lg:col-span-5 space-y-6">
          <QuestsList
            quests={state.quests}
            lang={lang}
            onClaimQuest={handleClaimQuest}
          />

          {/* Level Progress Summary Card */}
          <div className="card p-5 bg-surface border border-line rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="tag tag--info text-xs">{lang === 'ar' ? 'المستوى الحالي' : 'Current Level'}</span>
              <span className="text-xs font-bold tabular-nums text-action">
                {state.xp.toLocaleString()} XP
              </span>
            </div>
            <h4 className="text-base font-bold text-ink">{rank.title[lang]}</h4>
            <div className="w-full h-2 bg-surface-sunken rounded-full overflow-hidden border border-line">
              <div
                className="h-full bg-action rounded-full transition-all duration-300"
                style={{ width: `${progressInLevel}%` }}
              />
            </div>
            <p className="text-xs text-muted">
              {nextRank
                ? lang === 'ar'
                  ? `متبقي ${xpNeeded.toLocaleString()} XP للوصول إلى «${nextRank.title[lang]}»`
                  : `${xpNeeded.toLocaleString()} XP remaining to reach "${nextRank.title[lang]}"`
                : lang === 'ar'
                ? 'أعلى رتبة مكتملة!'
                : 'Pinnacle level reached!'}
            </p>
          </div>
        </div>
      </div>

      {/* 5. ACHIEVEMENTS & BADGES GRID */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-ink">
              {lang === 'ar' ? 'أوسمة الإتقان التصميمي (Trophy Badges)' : 'Mastery Badges'}
            </h2>
            <p className="text-xs text-muted">
              {lang === 'ar'
                ? 'حلقات تقدم دائرية كودية SVG توضح مدى التقدم مع نسبة ندرة الوسام بين المتعلمين'
                : 'Concentric circular SVG progress rings showing criteria completion and rarity'}
            </p>
          </div>
          <span className="tag tag--info text-xs">
            {state.unlockedBadgeIds.length} / {BADGES_CATALOG.length} {lang === 'ar' ? 'مفتوح' : 'unlocked'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {BADGES_CATALOG.map((badge) => {
            const isUnlocked = state.unlockedBadgeIds.includes(badge.id)
            const progress = state.badgeProgress[badge.id] || 0
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
      </section>

      {/* Popups & Drawers */}
      <GamificationHub
        open={hubOpen}
        onClose={() => setHubOpen(false)}
        state={state}
        lang={lang}
        onClaimQuest={handleClaimQuest}
      />

      <CelebrationToast
        event={toastEvent}
        lang={lang}
        onClose={() => setToastEvent(null)}
      />
    </div>
  )
}
