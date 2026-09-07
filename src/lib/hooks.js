import { useCallback, useEffect, useState } from 'react'

export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ?? (typeof initial === 'function' ? initial() : initial)
    } catch {
      return typeof initial === 'function' ? initial() : initial
    }
  })
  const set = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? next(prev) : next
        try {
          localStorage.setItem(key, resolved)
        } catch {
          /* private mode, ignore */
        }
        return resolved
      })
    },
    [key],
  )
  return [value, set]
}

// Hash routes: "#/", "#/chapterId", "#/chapterId/sectionId", "#/print".
export function parseHash(hash = window.location.hash) {
  const clean = hash.replace(/^#\/?/, '')
  const [chapter = '', section = ''] = clean.split('/').map(decodeURIComponent)
  return { chapter, section }
}

export function useHashRoute() {
  const [route, setRoute] = useState(() => ({ ...parseHash(), n: 0 }))
  useEffect(() => {
    const onChange = () => setRoute({ ...parseHash(), n: Date.now() })
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

export function hrefFor(chapterId, sectionId) {
  return sectionId ? `#/${chapterId}/${sectionId}` : `#/${chapterId}`
}

export function navigate(chapterId, sectionId) {
  const next = hrefFor(chapterId, sectionId)
  if (window.location.hash === next) {
    // Same hash: hashchange will not fire, so scroll manually.
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  } else {
    window.location.hash = next
  }
}

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = (e) => setMatches(e.matches)
    mq.addEventListener('change', onChange)
    setMatches(mq.matches)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return matches
}
