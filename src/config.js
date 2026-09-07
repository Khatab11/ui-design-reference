// Site chrome (not course content). Course content lives in /content/*.json.
export const site = {
  title: { en: 'UI Design Reference', ar: 'مرجع تصميم الواجهات' },
  subtitle: { en: 'Course companion', ar: 'مرجع الدورة' },
  description: {
    en: 'A comprehensive bilingual reference for UI design principles, layout, typography, and visual hierarchy.',
    ar: 'مرجع شامل ومفصل لمبادئ وأساسيات تصميم واجهات المستخدم، التخطيط، والتايبوجرافي، والهيراركي البصري.',
  },
}

export const DEFAULT_LANG = 'ar'
export const DEFAULT_THEME = 'light'

export const STORAGE_KEYS = {
  lang: 'uiref:lang',
  theme: 'uiref:theme',
}
