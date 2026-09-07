const NETLIFY_MARKERS = ['netlify', 'powered-by-netlify', 'powered_by_netlify']

function hasNetlifyIdentity(element) {
  const signature = [
    element.localName,
    element.id,
    element.getAttribute('class'),
    element.getAttribute('title'),
    element.getAttribute('aria-label'),
    element.getAttribute('name'),
    element.getAttribute('src'),
    element.getAttribute('srcdoc'),
    element.getAttribute('data-testid'),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  return NETLIFY_MARKERS.some((marker) => signature.includes(marker))
}

function removeInjectedBadge(element) {
  if (!(element instanceof Element)) return

  const appRoot = document.getElementById('root')
  if (element === appRoot || appRoot?.contains(element)) return

  if (hasNetlifyIdentity(element)) {
    element.remove()
    return
  }

  for (const child of element.querySelectorAll('*')) {
    if (hasNetlifyIdentity(child)) child.remove()
  }
}

/**
 * Netlify adds its public-project badge after the built HTML leaves our app.
 * Observe only DOM outside React's root so course content is never touched.
 */
export function hideNetlifyBadge() {
  if (!import.meta.env.PROD || !document.body) return

  for (const child of Array.from(document.body.children)) removeInjectedBadge(child)

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes') {
        removeInjectedBadge(mutation.target)
      } else {
        for (const node of mutation.addedNodes) removeInjectedBadge(node)
      }
    }
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['id', 'class', 'title', 'aria-label', 'name', 'src', 'srcdoc', 'data-testid'],
  })
}
