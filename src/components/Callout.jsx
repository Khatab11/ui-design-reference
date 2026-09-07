import { t } from '../lib/ui.js'
import Markdown from './Markdown.jsx'
import { Info, AlertTriangle, PenLine, Quote } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

const config = {
  tip: {
    Icon: Info,
    variant: 'tip',
    iconClass: 'text-success',
    containerClass: 'border-success/30 bg-success/10 dark:bg-success/15 text-foreground',
    badgeClass: 'bg-success/20 text-success border-success/30',
  },
  warning: {
    Icon: AlertTriangle,
    variant: 'caution',
    iconClass: 'text-warning',
    containerClass: 'border-warning/30 bg-warning/10 dark:bg-warning/15 text-foreground',
    badgeClass: 'bg-warning/20 text-warning border-warning/30',
  },
  caution: {
    Icon: AlertTriangle,
    variant: 'caution',
    iconClass: 'text-warning',
    containerClass: 'border-warning/30 bg-warning/10 dark:bg-warning/15 text-foreground',
    badgeClass: 'bg-warning/20 text-warning border-warning/30',
  },
  note: {
    Icon: PenLine,
    variant: 'note',
    iconClass: 'text-action',
    containerClass: 'border-action/30 bg-action/10 dark:bg-action/15 text-foreground',
    badgeClass: 'bg-action/20 text-action border-action/30',
  },
}

export default function Callout({ callout, lang }) {
  const shouldReduceMotion = useReducedMotion()
  if (!callout) return null
  const text = callout[lang] ?? callout.en
  const type = callout.type || 'tip'

  if (type === 'quote') {
    return (
      <blockquote className="my-6 flex gap-3.5 rounded-2xl border border-line-strong/60 bg-surface/80 p-5 shadow-xs backdrop-blur-sm dark:border-line/40 dark:bg-surface/50">
        <Quote className="mt-1 size-5 shrink-0 text-muted" />
        <div className="min-w-0 flex-1">
          <Markdown className="text-[17px] italic leading-[28px] text-ink">{text}</Markdown>
        </div>
      </blockquote>
    )
  }

  const { Icon, iconClass, containerClass, badgeClass } = config[type] ?? config.tip
  return (
    <motion.aside
      data-callout={type}
      whileHover={shouldReduceMotion ? undefined : { y: -1 }}
      transition={{ duration: 0.15 }}
      className={`my-6 flex gap-3.5 rounded-2xl border p-4 sm:p-5 shadow-xs backdrop-blur-sm transition-all ${containerClass}`}
    >
      <div className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl border ${badgeClass}`}>
        <Icon className={`size-4 ${iconClass}`} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink">
            {t(lang, type)}
          </span>
        </div>
        <div className="mt-1 text-[16px] leading-[1.65] text-body [&_p]:text-[16px] [&_p]:leading-[1.65] [&_p]:text-body [&_p:last-child]:mb-0">
          <Markdown>{text}</Markdown>
        </div>
      </div>
    </motion.aside>
  )
}
