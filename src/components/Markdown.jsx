import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const components = {
  a({ href, children, ...rest }) {
    const external = /^https?:\/\//.test(href || '')
    return (
      <a
        href={href}
        {...rest}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {children}
      </a>
    )
  },
  table({ children, ...rest }) {
    return (
      <div className="table-scroll" tabIndex="0" role="region" aria-label="Scrollable table">
        <table {...rest}>{children}</table>
      </div>
    )
  },
}

export default function Markdown({ children, className = '' }) {
  return (
    <div className={`prose ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  )
}
