// Gamification Engine for "ما ليس على المصمّم جهله"
// Follows docs/DESIGN_SYSTEM.md and Trophy UI principles

export const RANKS = [
  { level: 1, title: { ar: 'مصمم متدرب', en: 'Apprentice Designer' }, minXp: 0, maxXp: 499, icon: 'shield' },
  { level: 2, title: { ar: 'صانع مبتدئ', en: 'Junior Crafter' }, minXp: 500, maxXp: 999, icon: 'shield-half' },
  { level: 3, title: { ar: 'ممارس واجهات', en: 'UI Practitioner' }, minXp: 1000, maxXp: 1499, icon: 'badge-check' },
  { level: 4, title: { ar: 'مصمم محترف', en: 'Senior Craftsman' }, minXp: 1500, maxXp: 1999, icon: 'shield-check' },
  { level: 5, title: { ar: 'قائد بصري', en: 'Lead Visualist' }, minXp: 2000, maxXp: 2499, icon: 'medal' },
  { level: 6, title: { ar: 'مدير تصميم', en: 'Design Director' }, minXp: 2500, maxXp: 2999, icon: 'trophy' },
  { level: 7, title: { ar: 'معماري الأنظمة', en: 'Master Architect' }, minXp: 3000, maxXp: 3499, icon: 'trophy-gold' },
  { level: 8, title: { ar: 'ملهم التصميم', en: 'Enlightened Virtuoso' }, minXp: 3500, maxXp: 99999, icon: 'sparkles' },
]

export const BADGES_CATALOG = [
  {
    id: 'grid_sentinel',
    title: { ar: 'حارس الشبكات', en: 'Grid Sentinel' },
    desc: { ar: 'إتمام جميع أقسام المسافات والتخطيط على شبكة 4px.', en: 'Complete all spacing & layout sections on the 4px grid.' },
    category: 'layout',
    rarity: 14, // 14% of users have it
    icon: 'grid',
    requiredCount: 5,
  },
  {
    id: 'typography_maven',
    title: { ar: 'سيد المحارف', en: 'Typography Maven' },
    desc: { ar: 'إتقان سلالم الخطوط وأوزان النصوص ومحاذاة الارتفاع.', en: 'Master type scales, font weights, and line-height rhythm.' },
    category: 'type',
    rarity: 9,
    icon: 'type',
    requiredCount: 6,
  },
  {
    id: 'chroma_disciple',
    title: { ar: 'عين الألوان الصقرية', en: 'Chroma Disciple' },
    desc: { ar: 'فهم نسب التباين ودرجات الـ WCAG ومستويات التدرج.', en: 'Understand contrast ratios, WCAG standards, and palettes.' },
    category: 'color',
    rarity: 22,
    icon: 'palette',
    requiredCount: 4,
  },
  {
    id: 'night_owl',
    title: { ar: 'ساهر التصميم', en: 'Night Owl' },
    desc: { ar: 'قراءة وفهم 3 أقسام تصميمية في الوضع الليلي.', en: 'Read and master 3 design sections in dark mode.' },
    category: 'habit',
    rarity: 31,
    icon: 'moon',
    requiredCount: 3,
  },
  {
    id: 'streak_seven',
    title: { ar: 'شعلة الأسبوع', en: '7-Day Flame' },
    desc: { ar: 'المحافظة على سلسلة تعلّم نشطة لمدة 7 أيام متتالية.', en: 'Maintain an active study streak for 7 consecutive days.' },
    category: 'streak',
    rarity: 18,
    icon: 'flame',
    requiredCount: 7,
  },
  {
    id: 'bilingual_scholar',
    title: { ar: 'المصمم ثنائي اللغة', en: 'Bilingual Scholar' },
    desc: { ar: 'مقارنة المصطلحات بالتبديل بين العربية والإنجليزية.', en: 'Compare design nomenclature in both Arabic and English.' },
    category: 'scholarly',
    rarity: 45,
    icon: 'languages',
    requiredCount: 1,
  },
]

export const DEFAULT_PEERS = [
  { id: 'p1', name: 'سارة المنصوري', avatar: 'https://i.pravatar.cc/96?img=32', xp: 2860, rank: 1, tier: 'Diamond', levelTitle: { ar: 'مدير تصميم', en: 'Design Director' } },
  { id: 'p2', name: 'طارق الأحمد', avatar: 'https://i.pravatar.cc/96?img=12', xp: 2430, rank: 2, tier: 'Platinum', levelTitle: { ar: 'قائد بصري', en: 'Lead Visualist' } },
  { id: 'p3', name: 'نور الخالدي', avatar: 'https://i.pravatar.cc/96?img=15', xp: 2180, rank: 3, tier: 'Platinum', levelTitle: { ar: 'قائد بصري', en: 'Lead Visualist' } },
  { id: 'p4', name: 'عمر اليافعي', avatar: 'https://i.pravatar.cc/96?img=29', xp: 1840, rank: 4, tier: 'Gold', levelTitle: { ar: 'مصمم محترف', en: 'Senior Craftsman' } },
  { id: 'p5', name: 'ريم العتيبي', avatar: 'https://i.pravatar.cc/96?img=10', xp: 1620, rank: 5, tier: 'Gold', levelTitle: { ar: 'مصمم محترف', en: 'Senior Craftsman' } },
  { id: 'p6', name: 'كريم الدوسري', avatar: 'https://i.pravatar.cc/96?img=22', xp: 1410, rank: 6, tier: 'Silver', levelTitle: { ar: 'ممارس واجهات', en: 'UI Practitioner' } },
  { id: 'p7', name: 'هدى مصطفى', avatar: 'https://i.pravatar.cc/96?img=47', xp: 1190, rank: 7, tier: 'Silver', levelTitle: { ar: 'ممارس واجهات', en: 'UI Practitioner' } },
  { id: 'p8', name: 'يوسف حسان', avatar: 'https://i.pravatar.cc/96?img=53', xp: 940, rank: 8, tier: 'Bronze', levelTitle: { ar: 'صانع مبتدئ', en: 'Junior Crafter' } },
  { id: 'p9', name: 'فاطمة الزهراء', avatar: 'https://i.pravatar.cc/96?img=26', xp: 780, rank: 9, tier: 'Bronze', levelTitle: { ar: 'صانع مبتدئ', en: 'Junior Crafter' } },
]

export const INITIAL_GAMIFICATION_STATE = {
  xp: 1240,
  streak: 5,
  streakFreezeAvailable: true,
  lastActiveDate: new Date().toISOString().slice(0, 10),
  completedSections: ['foundations-intro', 'spacing-grid', 'tokens-color'],
  unlockedBadgeIds: ['chroma_disciple', 'bilingual_scholar'],
  badgeProgress: {
    grid_sentinel: 3,
    typography_maven: 2,
    chroma_disciple: 4,
    night_owl: 1,
    streak_seven: 5,
    bilingual_scholar: 1,
  },
  quests: [
    { id: 'q1', title: { ar: 'استيعاب مبدأين في التصميم اليوم', en: 'Master 2 design principles today' }, xp: 40, current: 1, target: 2, completed: false },
    { id: 'q2', title: { ar: 'التحقق من مقياس تباين لوني', en: 'Verify a contrast ratio in Colors' }, xp: 30, current: 1, target: 1, completed: true },
    { id: 'q3', title: { ar: 'دراسة قسم في الوضع الليلي', en: 'Study one section in Dark Mode' }, xp: 35, current: 0, target: 1, completed: false },
  ],
  weeklyHistory: [true, true, true, false, true, true, false], // last 7 days checkin
}

export function getCurrentRank(xp) {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (xp >= RANKS[i].minXp) {
      const rank = RANKS[i]
      const nextRank = RANKS[i + 1] || null
      const progressInLevel = nextRank
        ? Math.min(100, Math.round(((xp - rank.minXp) / (nextRank.minXp - rank.minXp)) * 100))
        : 100
      const xpNeeded = nextRank ? nextRank.minXp - xp : 0
      return { rank, nextRank, progressInLevel, xpNeeded }
    }
  }
  return { rank: RANKS[0], nextRank: RANKS[1], progressInLevel: 0, xpNeeded: 500 }
}

export function computeLeaderboard(userXp, userName = 'أنت (المتعلم)') {
  const userEntry = {
    id: 'current_user',
    name: userName,
    avatar: 'https://i.pravatar.cc/96?img=68',
    xp: userXp,
    isCurrentUser: true,
    tier: userXp > 2500 ? 'Diamond' : userXp > 2000 ? 'Platinum' : userXp > 1500 ? 'Gold' : userXp > 1000 ? 'Silver' : 'Bronze',
    levelTitle: getCurrentRank(userXp).rank.title,
  }

  const all = [...DEFAULT_PEERS, userEntry]
  all.sort((a, b) => b.xp - a.xp)

  return all.map((entry, index) => ({
    ...entry,
    rank: index + 1,
  }))
}

const STORAGE_KEY = 'ui_ref_gamification_state_v1'

export function loadGamificationState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return INITIAL_GAMIFICATION_STATE
    return { ...INITIAL_GAMIFICATION_STATE, ...JSON.parse(raw) }
  } catch {
    return INITIAL_GAMIFICATION_STATE
  }
}

export function saveGamificationState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* private browsing ignore */
  }
}
