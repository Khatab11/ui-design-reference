import { t } from '../lib/ui.js'
import Markdown from './Markdown.jsx'
import { AlertIcon, InfoIcon, PenIcon } from './Icons.jsx'
import { motion, useReducedMotion } from 'framer-motion'

// Visual treatment per callout type. `quote` is rendered separately below.
const styles = {
  tip: {
    Icon: InfoIcon,
    box: 'border-accent/25 bg-accent-soft',
    icon: 'text-accent',
    label: 'text-accent-ink',
  },
  warning: {
    Icon: AlertIcon,
    box: 'border-warn/30 bg-warn-soft',
    icon: 'text-warn',
    label: 'text-warn',
  },
  // Content the course author added that is not in the source book. Cool
  // colour + dashed border so it reads as "different" next to tip/warning,
  // and the dashed edge survives the colour-stripping print stylesheet.
  note: {
    Icon: PenIcon,
    box: 'border-dashed border-note/50 bg-note-soft',
    icon: 'text-note',
    label: 'text-note',
  },
}

export default function Callout({ callout, lang }) {
  const shouldReduceMotion = useReducedMotion()
  if (!callout) return null
  const text = callout[lang] ?? callout.en
  const type = callout.type || 'tip'

  if (type === 'quote') {
    return (
      <blockquote className="callout my-4 border-s-2 border-accent ps-3">
        <Markdown className="text-lg italic leading-[30px] text-ink [&_p]:text-lg [&_p]:leading-[30px]">{text}</Markdown>
      </blockquote>
    )
  }

  const style = styles[type] ?? styles.tip
  const { Icon } = style
  return (
    <motion.aside
      data-callout={type}
      whileHover={shouldReduceMotion ? undefined : { y: -1 }}
      transition={{ duration: 0.2 }}
      className={`callout my-4 flex gap-1.5 rounded-lg border p-2 text-ink shadow-[0_4px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.25)] transition-shadow duration-200 ${style.box}`}
    >
      <Icon className={`mt-0.5 shrink-0 ${style.icon}`} />
      <div>
        <p className={`text-xs font-semibold uppercase tracking-wide ${style.label}`}>
          {t(lang, type)}
        </p>
        <Markdown className="mt-0.5">{text}</Markdown>
      </div>
    </motion.aside>
  )
}
