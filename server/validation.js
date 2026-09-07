const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateLoginInput(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return false

  return (
    typeof body.email === 'string' &&
    emailPattern.test(body.email) &&
    typeof body.password === 'string' &&
    body.password.trim().length > 0
  )
}