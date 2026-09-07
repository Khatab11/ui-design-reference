// Format-only validation. Nothing here talks to a server, so it can tell you
// an address is well-formed — never that it exists or can receive mail.

// One @, no spaces, and dot-separated labels on both sides ending in a 2+ letter
// TLD. Every class excludes '.', so no label may be empty (no leading, trailing
// or doubled dots) and there is no ambiguous backtracking on long inputs.
const EMAIL_RE = /^[^\s@.]+(?:\.[^\s@.]+)*@[^\s@.]+(?:\.[^\s@.]+)*\.[A-Za-z]{2,}$/

export const EMAIL_MAX = 254
export const EMAIL_LOCAL_MAX = 64

export function isValidEmail(value) {
  const email = String(value ?? '').trim()
  if (!email || email.length > EMAIL_MAX) return false
  if (email.slice(0, email.lastIndexOf('@')).length > EMAIL_LOCAL_MAX) return false
  return EMAIL_RE.test(email)
}

// Returns a t() key, or '' when the field is fine.
export function emailError(value) {
  if (!String(value ?? '').trim()) return 'emailRequired'
  return isValidEmail(value) ? '' : 'emailInvalid'
}
