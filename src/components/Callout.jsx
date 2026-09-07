import { t } from '../lib/ui.js'
import Markdown from './Markdown.jsx'
import { AlertIcon, InfoIcon, PenIcon } from './Icons.jsx'
import { motion, useReducedMotion } from 'framer-motion'

const config = {
  tip: {
    Icon: InfoIcon,
    variant: 'tip',
    iconClass: 'text-success',
  },
  warning: {
    Icon: AlertIcon,
    variant: 'caution',
    iconClass: 'text-warning',
  },
  caution: {
    Icon: AlertIcon,
    variant: 'caution',
    iconClass: 'text-warning',
  },
  note: {
    Icon: PenIcon,
    variant: 'note',
    iconClass: 'text-action',
  },
}

export default function Callout({ callout, lang }) {
  const shouldReduceMotion = useReducedMotion()
  if (!callout) return null
  const text = callout[lang] ?? callout.en
  const type = callout.type || 'tip'

  if (type === 'quote') {
    return (
      <blockquote className="my-5 border-s-2 border-line-strong ps-4 text-ink">
        <Markdown className="text-lg italic leading-[30px] [&_p]:text-lg [&_p]:leading-[30px] [&_p]:text-ink">{text}</Markdown>
      </blockquote>
    )
  }

  const { Icon, variant, iconClass } = config[type] ?? config.tip
  return (
    <motion.aside
      data-callout={type}
      whileHover={shouldReduceMotion ? undefined : { y: -1 }}
      transition={{ duration: 0.2 }}
      className={`callout callout--${variant} my-5 flex gap-3`}
    >
      <Icon className={`mt-0.5 shrink-0 ${iconClass}`} width="20" height="20" />
      <div className="min-w-0 flex-1">
        <p className="callout__title">
          {t(lang, type)}
        </p>
        <div className="text-[17px] leading-[1.65] text-body [&_p]:text-[17px] [&_p]:leading-[1.65] [&_p]:text-body [&_p:last-child]:mb-0">
          <Markdown>{text}</Markdown>
        </div>
      </div>
    </motion.aside>
  )
}

