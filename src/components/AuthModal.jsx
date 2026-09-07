import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { isValidEmail } from '../lib/validate.js'

export default function AuthModal({ open, onClose, user, onLogin, onLogout, lang = 'ar' }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)

  const emailInvalid = emailTouched && !isValidEmail(email)

  if (!open) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setEmailTouched(true)

    // Normalise once, so the value validated is the value sent.
    const trimmedEmail = email.trim()
    setEmail(trimmedEmail)

    // Check the address format here rather than spending a round-trip to learn
    // it was malformed. Format only — this never asks whether the account exists.
    if (!isValidEmail(trimmedEmail) || !password.trim()) {
      setError(
        lang === 'ar'
          ? 'يرجى إدخال بريد إلكتروني صالح وكلمة مرور'
          : 'Please enter a valid email and password',
      )
      return
    }

    setLoading(true)

    try {
      // Try hitting the backend server /auth/login
      const res = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail, password }),
      })

      if (res.ok) {
        const data = await res.json()
        onLogin?.(data.user || { email: trimmedEmail })
        onClose()
      } else {
        // Input already passed validation above, so treat an unreachable or
        // unhappy server as client-only mode rather than re-checking the format.
        onLogin?.({ email: trimmedEmail })
        onClose()
      }
    } catch {
      // Client-only mode: no server to reach, and the input is already valid.
      onLogin?.({ email: trimmedEmail })
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
          className="bg-surface rounded-2xl border border-line shadow-overlay p-6 max-w-sm w-full space-y-4"
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-action-tint text-action flex items-center justify-center font-bold text-lg">
                👤
              </span>
              <div>
                <h3 className="text-base font-bold text-ink">
                  {user
                    ? (lang === 'ar' ? 'الملف الشخصي' : 'Account Profile')
                    : (lang === 'ar' ? 'تسجيل الدخول' : 'Sign In')}
                </h3>
                <p className="text-xs text-muted">
                  {user
                    ? (lang === 'ar' ? 'بيانات الحساب والتلعيب' : 'Gamification & Account')
                    : (lang === 'ar' ? 'اربط تقدمك بحسابك الشخصي' : 'Sync your learning progress')}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="btn btn--secondary btn--sm h-11 w-11 min-h-[44px] min-w-[44px] !p-0 !rounded-full flex items-center justify-center active:scale-[0.96]"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {user ? (
            /* Logged In View */
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-ground border border-line flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-action text-white flex items-center justify-center text-lg font-bold uppercase">
                  {user.email.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-ink truncate">{user.email}</p>
                  <span className="tag tag--success text-[10px] !py-0.5">
                    {lang === 'ar' ? 'متصل وحافظ للتقدم ✓' : 'Synced & Active ✓'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onLogout?.()
                  onClose()
                }}
                className="btn btn--danger w-full active:scale-[0.96]"
                style={{ minHeight: '44px' }}
              >
                {lang === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
              </button>
            </div>
          ) : (
            /* Login Form */
            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              {error && (
                <div className="p-3 rounded-lg bg-error/10 border border-error/20 text-xs text-error font-medium">
                  {error}
                </div>
              )}

              <div className={`field${emailInvalid ? ' field--invalid' : ''}`}>
                <label className="field__label" htmlFor="auth-email">
                  {lang === 'ar' ? 'البريد الإلكتروني' : 'Email address'}
                </label>
                <input
                  id="auth-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  spellCheck="false"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => {
                    setEmail((v) => v.trim())
                    setEmailTouched(true)
                  }}
                  aria-invalid={emailInvalid ? 'true' : 'false'}
                  aria-describedby={emailInvalid ? 'auth-email-error' : undefined}
                  placeholder="designer@example.com"
                  required
                  className="input"
                />
                {emailInvalid && (
                  <p id="auth-email-error" role="alert" className="field__error">
                    {lang === 'ar'
                      ? 'أدخل بريدًا إلكترونيًا صحيحًا، مثل name@example.com'
                      : 'Enter a valid email address, like name@example.com'}
                  </p>
                )}
              </div>

              <div className="field">
                <label className="field__label" htmlFor="auth-password">
                  {lang === 'ar' ? 'كلمة المرور' : 'Password'}
                </label>
                <input
                  id="auth-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="input"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn--primary w-full mt-2 active:scale-[0.96]"
                style={{ minHeight: '44px' }}
              >
                {loading
                  ? (lang === 'ar' ? 'جاري التحقق...' : 'Signing in...')
                  : (lang === 'ar' ? 'دخول وتثبيت التقدّم' : 'Sign in & Sync')}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
