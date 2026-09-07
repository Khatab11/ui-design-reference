import { hrefFor } from '../lib/hooks.js'
import { t } from '../lib/ui.js'
import Asset from './Asset.jsx'
import Callout from './Callout.jsx'
import Markdown from './Markdown.jsx'
import { LinkIcon } from './Icons.jsx'
import { motion, useReducedMotion } from 'framer-motion'
import IncidentStatusTimeline from './ui/incident-status-timeline'

export function sectionDomId(chapterId, sectionId) {
  return `${chapterId}--${sectionId}`
}

export default function Section({ chapter, section, lang, eagerAssets = false, liveAssets = true }) {
  const domId = sectionDomId(chapter.id, section.id)
  const shouldReduceMotion = useReducedMotion()

  const isCardsAnatomy = chapter.id === 'cards' && (section.id === 'anatomy-of-a-card' || section.id === 'affordance-and-elevation')
  const isFixedGridSection = (chapter.id === 'grid-layout' || chapter.id === '02-grid-layout') && section.id === 'fixed-grid'

  return (
    <motion.section
      id={domId}
      data-section-id={section.id}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="scroll-mt-[88px] pt-6 sm:pt-8"
    >
      <div className="rounded-2xl border border-border/80 bg-card p-4 sm:p-6 md:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_16px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_12px_28px_rgba(0,0,0,0.04)] dark:border-border/40 dark:shadow-[0_1px_3px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.25)]">
        <h2 className="group flex items-center justify-between gap-2 border-b border-line/70 pb-3.5 text-lg sm:text-xl md:text-[22px] font-semibold leading-[1.25] tracking-[-0.01em] text-ink">
          <span>{section.title[lang]}</span>
          <a
            href={hrefFor(chapter.id, section.id)}
            aria-label={t(lang, 'linkToSection')}
            className="print-hidden inline-flex h-8 w-8 items-center justify-center rounded-xl text-muted no-underline opacity-100 sm:opacity-0 transition-all duration-150 hover:bg-surface-sunken hover:text-action focus-visible:opacity-100 group-hover:opacity-100"
          >
            <LinkIcon width="16" height="16" />
          </a>
        </h2>

        <div className="mt-4 text-[16px] sm:text-[17px] leading-[1.65] text-body">
          <Markdown>{section.body[lang]}</Markdown>
        </div>

        {/* Live Interactive Incident Status Timeline Card ("cards like this") */}
        {isCardsAnatomy && (
          <div className="my-6 rounded-2xl border border-border/80 bg-surface-sunken/60 p-3 sm:p-6 backdrop-blur-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-success" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink">
                  {lang === 'ar' ? 'نمط بطاقة حية معيارية (shadcn + Apple)' : 'Live Interactive Card Pattern (shadcn + Apple)'}
                </span>
              </div>
              <span className="rounded-full bg-background px-2.5 py-0.5 font-mono text-[10px] font-semibold text-muted border border-border">
                {lang === 'ar' ? 'تفاعلي مباشر' : 'Live Interactive'}
              </span>
            </div>
            <div className="flex justify-center py-2">
              <IncidentStatusTimeline />
            </div>
          </div>
        )}

        {/* Live Interactive Fixed Grid Login & Signup Demo */}
        {isFixedGridSection && (
          <div className="my-6 rounded-2xl border border-border/80 bg-surface-sunken/60 p-4 sm:p-6 backdrop-blur-sm">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-action animate-pulse" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink">
                  {lang === 'ar' ? 'نموذج الجريد الثابت التفاعلي (تسجيل الدخول وإنشاء الحساب)' : 'Interactive Fixed Grid Model (Login & Sign Up)'}
                </span>
              </div>
              <span className="rounded-full bg-background px-2.5 py-0.5 font-mono text-[10px] font-semibold text-muted border border-border">
                {lang === 'ar' ? 'تفاعلي مباشر' : 'Live Interactive'}
              </span>
            </div>
            <p className="text-sm text-body leading-relaxed mb-4">
              {lang === 'ar'
                ? 'شاهد كيف يحافظ فورم تسجيل الدخول على عرض ثابت (420px) مع هوامش مرنة على الشاشات الكبيرة، بدلاً من التمدد العشوائي عبر الشاشة.'
                : 'Experience how a real login and signup form stays locked to a sensible 420px width on desktop displays while margins expand, preventing the fluid grid anti-pattern.'}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#/login"
                className="btn btn--primary flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold shadow-xs transition-all active:scale-95 no-underline"
              >
                <span>{lang === 'ar' ? 'فتح صفحة تسجيل الدخول بالجريد الثابت ↗' : 'Open Fixed Grid Login Page ↗'}</span>
              </a>
              <a
                href="#/signup"
                className="btn btn--secondary flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all active:scale-95 no-underline"
              >
                <span>{lang === 'ar' ? 'فتح صفحة إنشاء الحساب ↗' : 'Open Sign Up Page ↗'}</span>
              </a>
            </div>
          </div>
        )}

        {section.asset && (
          <Asset chapterId={chapter.id} asset={section.asset} lang={lang} eager={eagerAssets} live={liveAssets} />
        )}
        {section.callout && <Callout callout={section.callout} lang={lang} />}
      </div>
    </motion.section>
  )
}
