import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { t } from '../lib/ui.js'
import { emailError } from '../lib/validate.js'
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Grid,
  Maximize2,
  Minimize2,
  ArrowLeft,
  Sun,
  Moon,
  Globe,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'

// Simple password strength calculator
function getPasswordStrength(password) {
  if (!password) return 0
  let score = 0
  if (password.length >= 8) score++
  if (/[0-9]/.test(password)) score++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  return score
}

const STRENGTH_LABELS = {
  en: ['Too short', 'Weak', 'Fair', 'Good', 'Strong'],
  ar: ['قصير جدًا', 'ضعيف', 'مقبول', 'جيد', 'قوي'],
}

const STRENGTH_COLORS = [
  'bg-line-strong',
  'bg-error',
  'bg-warning',
  'bg-action',
  'bg-success',
]

function FieldError({ id, message }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="flex items-center gap-1.5 pt-0.5 text-[11px] font-medium text-error">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </p>
  )
}

export default function Auth({
  initialMode = 'login',
  lang = 'en',
  theme = 'light',
  onToggleLang,
  onToggleTheme,
}) {
  const [mode, setMode] = useState(initialMode)
  const [gridMode, setGridMode] = useState('fixed') // 'fixed' | 'fluid'
  const [showGridOverlay, setShowGridOverlay] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Form states
  const [email, setEmail] = useState('tom_smith@example.com')
  const [password, setPassword] = useState('password123')
  const [fullName, setFullName] = useState('Tom Smith')
  const [rememberMe, setRememberMe] = useState(true)
  const [agreeTerms, setAgreeTerms] = useState(true)

  const [touched, setTouched] = useState({})

  const strength = getPasswordStrength(password)
  const isRtl = lang === 'ar'

  // Format checks only. Nothing here asks a server whether the address exists
  // or whether the account is real — that is deliberately not this page's job.
  // Key order matches DOM order, so the submit guard focuses the first field
  // the reader can actually see rather than the first one declared.
  const errors = {
    ...(mode === 'signup' ? { fullName: fullName.trim() ? '' : 'fullNameRequired' } : null),
    email: emailError(email),
    password: password.trim() ? '' : 'passwordRequired',
    ...(mode === 'signup' ? { agreeTerms: agreeTerms ? '' : 'agreeTermsRequired' } : null),
  }
  const fields = Object.keys(errors)
  const errorFor = (field) => (touched[field] && errors[field] ? t(lang, errors[field]) : '')
  const markTouched = (field) => setTouched((prev) => ({ ...prev, [field]: true }))

  const switchMode = (next) => {
    setMode(next)
    setTouched({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const firstInvalid = fields.find((f) => errors[f])
    if (firstInvalid) {
      setTouched(Object.fromEntries(fields.map((f) => [f, true])))
      document.getElementById(`auth-${firstInvalid}`)?.focus()
      return
    }
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div
      className="relative min-h-screen bg-ground text-ink transition-colors selection:bg-action/20 selection:text-action overflow-x-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* 12-Column Grid Lines Visualizer Overlay */}
      {showGridOverlay && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 mx-auto max-w-[1440px] px-4 sm:px-8 md:px-12 grid grid-cols-12 gap-5"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="h-full bg-action/5 border-x border-action/15 relative flex flex-col justify-between py-4"
            >
              <span className="font-mono text-[10px] font-semibold text-action/50 text-center">
                col {i + 1}
              </span>
              <span className="font-mono text-[9px] text-action/40 text-center">
                75pt
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Top Header & Educational Grid Toolbar */}
      <header className="sticky top-0 z-30 border-b border-line/70 bg-ground/85 backdrop-blur-xl transition-colors dark:border-line/40">
        <div className="mx-auto flex h-[62px] max-w-[1400px] items-center justify-between gap-3 px-3 sm:px-6">
          {/* Back to Course */}
          <a
            href="#/"
            className="group flex items-center gap-2 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-body hover:bg-surface-sunken hover:text-ink transition-all active:scale-95 no-underline min-h-[44px]"
          >
            {isRtl ? (
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            ) : (
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            )}
            <span>{t(lang, 'backToPlatform')}</span>
          </a>

          {/* Grid Mode Switcher (Educational Demonstration) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex items-center rounded-xl border border-line bg-surface p-1 shadow-2xs">
              <button
                type="button"
                onClick={() => setGridMode('fixed')}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all min-h-[36px] ${
                  gridMode === 'fixed'
                    ? 'bg-action text-white shadow-xs'
                    : 'text-muted hover:text-ink'
                }`}
                title="Recommended: Columns stay fixed, extra space becomes margin"
              >
                <Minimize2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{t(lang, 'fixedGridLabel')}</span>
                <span className="sm:hidden">Fixed</span>
              </button>

              <button
                type="button"
                onClick={() => setGridMode('fluid')}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all min-h-[36px] ${
                  gridMode === 'fluid'
                    ? 'bg-warning text-white shadow-xs'
                    : 'text-muted hover:text-ink'
                }`}
                title="Anti-pattern: Form stretches edge-to-edge on large displays"
              >
                <Maximize2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{t(lang, 'fluidGridLabel')}</span>
                <span className="sm:hidden">Fluid</span>
              </button>
            </div>

            {/* Toggle 12-Col Grid Overlay */}
            <button
              type="button"
              onClick={() => setShowGridOverlay((v) => !v)}
              className={`hidden md:flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all active:scale-95 min-h-[44px] ${
                showGridOverlay
                  ? 'border-action bg-action/10 text-action'
                  : 'border-line bg-surface text-muted hover:text-ink hover:border-line-hover shadow-2xs'
              }`}
              title="Show 12-column grid with 20pt gutters"
            >
              <Grid className="h-4 w-4" />
              <span>{t(lang, 'toggleGridLines')}</span>
            </button>

            <div className="hidden sm:block h-5 w-px bg-line/80" />

            {/* Language Switch */}
            {onToggleLang && (
              <button
                type="button"
                onClick={onToggleLang}
                className="btn btn--secondary btn--sm flex min-h-[44px] items-center gap-1.5 rounded-xl px-2.5 text-xs font-semibold transition-transform active:scale-95"
              >
                <Globe className="h-4 w-4 text-muted" />
                <span>{t(lang, 'switchLang')}</span>
              </button>
            )}

            {/* Theme Toggle */}
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                className="btn btn--secondary btn--sm flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-xl p-0 transition-transform active:scale-95"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Educational Banner explaining the Grid state */}
      <div className="relative z-10 border-b border-line/60 bg-surface-sunken/60 py-2.5 px-4 backdrop-blur-xs">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`flex h-2 w-2 rounded-full ${
                gridMode === 'fixed' ? 'bg-success animate-pulse' : 'bg-warning animate-bounce'
              }`}
            />
            <span className="font-medium text-body">
              {gridMode === 'fixed'
                ? t(lang, 'fixedGridDemoNote')
                : t(lang, 'fluidGridDemoNote')}
            </span>
          </div>
          <span className="hidden lg:inline-flex items-center rounded-full bg-surface px-2.5 py-0.5 font-mono text-[10px] font-semibold text-muted border border-line">
            {gridMode === 'fixed' ? 'width: 420px · margin: auto' : 'width: 100% · stretched'}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 flex min-h-[calc(100vh-120px)] items-center justify-center py-8 sm:py-12 md:py-16 px-4">
        {/*
          THE FIXED GRID ARCHITECTURE:
          - When fixed: w-full max-w-[420px] mx-auto (stays at sensible 420px width regardless of monitor size)
          - When fluid: w-full max-w-none px-4 sm:px-12 md:px-24 (stretches across entire screen)
        */}
        <div
          className={`w-full transition-all duration-300 ${
            gridMode === 'fixed'
              ? 'max-w-[420px] mx-auto'
              : 'max-w-[1400px] mx-auto px-4 sm:px-12 md:px-24'
          }`}
        >
          {/* Card Container adhering to Apple Design & Nested Radius ($R_{outer} = 24px$, $R_{inner} = 12px$) */}
          <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-[0_4px_32px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.03)] dark:border-border/40 dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)] backdrop-blur-2xl transition-all">
            {/* Brand Header */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-action text-white shadow-xs mb-3.5">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="7" height="7" x="3" y="3" rx="1.5" />
                  <rect width="7" height="7" x="14" y="3" rx="1.5" />
                  <rect width="7" height="7" x="14" y="14" rx="1.5" />
                  <rect width="7" height="7" x="3" y="14" rx="1.5" />
                </svg>
              </div>

              <h1 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-ink">
                {mode === 'login' ? t(lang, 'logInTitle') : t(lang, 'signUpTitle')}
              </h1>
              <p className="mt-1 text-sm text-muted max-w-[36ch]">
                {mode === 'login' ? t(lang, 'logInSubtitle') : t(lang, 'signUpSubtitle')}
              </p>
            </div>

            {/* Apple-style Sliding Segmented Control ($R_{inner} = 10px$, $R_{outer} = 14px$) */}
            <div className="mt-6 flex rounded-xl border border-line bg-surface-sunken p-1 relative">
              <button
                type="button"
                onClick={() => switchMode('login')}
                className={`relative flex-1 py-2 text-xs font-semibold transition-colors duration-150 z-10 min-h-[40px] flex items-center justify-center ${
                  mode === 'login' ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {mode === 'login' && (
                  <motion.div
                    layoutId="activeAuthTab"
                    transition={{ type: 'spring', stiffness: 500, damping: 36 }}
                    className="absolute inset-0 rounded-lg bg-surface shadow-xs border border-line/60"
                  />
                )}
                <span className="relative z-10">{t(lang, 'logIn')}</span>
              </button>

              <button
                type="button"
                onClick={() => switchMode('signup')}
                className={`relative flex-1 py-2 text-xs font-semibold transition-colors duration-150 z-10 min-h-[40px] flex items-center justify-center ${
                  mode === 'signup' ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {mode === 'signup' && (
                  <motion.div
                    layoutId="activeAuthTab"
                    transition={{ type: 'spring', stiffness: 500, damping: 36 }}
                    className="absolute inset-0 rounded-lg bg-surface shadow-xs border border-line/60"
                  />
                )}
                <span className="relative z-10">{t(lang, 'signUp')}</span>
              </button>
            </div>

            {/* Notification on Simulated Submit */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-4 flex items-center gap-2 rounded-xl border border-success/30 bg-success/10 p-3 text-xs font-medium text-success"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>
                    {mode === 'login'
                      ? (isRtl ? 'تم تسجيل الدخول بنجاح (عرض تجريبي)!' : 'Signed in successfully (demo mode)!')
                      : (isRtl ? 'تم إنشاء الحساب بنجاح (عرض تجريبي)!' : 'Account created successfully (demo mode)!')}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Authentication Form */}
            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
              {/* Full Name field for Sign Up */}
              {mode === 'signup' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1.5"
                >
                  <label htmlFor="auth-fullName" className="block text-xs font-semibold text-ink">
                    {t(lang, 'fullName')}
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                    <input
                      id="auth-fullName"
                      type="text"
                      autoComplete="name"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      onBlur={() => markTouched('fullName')}
                      aria-invalid={errorFor('fullName') ? 'true' : 'false'}
                      aria-describedby={errorFor('fullName') ? 'auth-fullName-error' : undefined}
                      placeholder={t(lang, 'fullNamePlaceholder')}
                      className={`h-12 w-full rounded-xl bg-surface text-sm text-ink placeholder:text-muted transition-all focus:outline-none focus:ring-2 border pe-3.5 ps-10 ${
                        errorFor('fullName') ? 'border-error hover:border-error focus:border-error focus:ring-error' : 'border-line-strong/80 hover:border-line-hover focus:border-action focus:ring-action/20'
                      }`}
                    />
                  </div>
                  <FieldError id="auth-fullName-error" message={errorFor('fullName')} />
                </motion.div>
              )}

              {/* Email / Username field */}
              <div className="space-y-1.5">
                <label htmlFor="auth-email" className="block text-xs font-semibold text-ink">
                  {t(lang, 'email')}
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                  <input
                    id="auth-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    spellCheck="false"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => {
                      // Normalise here so a pasted address with stray spaces is
                      // stored the way a server would receive it.
                      setEmail((v) => v.trim())
                      markTouched('email')
                    }}
                    aria-invalid={errorFor('email') ? 'true' : 'false'}
                    aria-describedby={errorFor('email') ? 'auth-email-error' : undefined}
                    placeholder={t(lang, 'emailPlaceholder')}
                    className={`h-12 w-full rounded-xl bg-surface text-sm text-ink placeholder:text-muted transition-all focus:outline-none focus:ring-2 border pe-3.5 ps-10 ${
                      errorFor('email') ? 'border-error hover:border-error focus:border-error focus:ring-error' : 'border-line-strong/80 hover:border-line-hover focus:border-action focus:ring-action/20'
                    }`}
                  />
                </div>
                <FieldError id="auth-email-error" message={errorFor('email')} />
              </div>

              {/* Password field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="auth-password" className="block text-xs font-semibold text-ink">
                    {t(lang, 'password')}
                  </label>
                  {mode === 'login' && (
                    <a
                      href="#/login"
                      onClick={(e) => {
                        e.preventDefault()
                        alert(isRtl ? 'إعادة ضبط كلمة المرور (عرض تجريبي)' : 'Password reset flow (demo)')
                      }}
                      className="text-xs font-medium text-action hover:text-action-hover transition-colors no-underline"
                    >
                      {t(lang, 'forgotPassword')}
                    </a>
                  )}
                </div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                  <input
                    id="auth-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => markTouched('password')}
                    aria-invalid={errorFor('password') ? 'true' : 'false'}
                    aria-describedby={errorFor('password') ? 'auth-password-error' : undefined}
                    placeholder={t(lang, 'passwordPlaceholder')}
                    className={`h-12 w-full rounded-xl bg-surface text-sm text-ink placeholder:text-muted transition-all focus:outline-none focus:ring-2 border pe-10 ps-10 ${
                      errorFor('password') ? 'border-error hover:border-error focus:border-error focus:ring-error' : 'border-line-strong/80 hover:border-line-hover focus:border-action focus:ring-action/20'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute end-2.5 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:text-ink transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                <FieldError id="auth-password-error" message={errorFor('password')} />

                {/* Real-time Password Strength Meter for Sign Up */}
                {mode === 'signup' && (
                  <div className="pt-1.5 space-y-1">
                    <div className="flex gap-1.5 h-1.5 w-full">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-full flex-1 rounded-full transition-all duration-300 ${
                            i < strength ? STRENGTH_COLORS[strength] : 'bg-line'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-[11px] text-muted">
                      <span>{isRtl ? 'قوة كلمة المرور' : 'Password strength'}</span>
                      <span className="font-semibold text-ink">
                        {STRENGTH_LABELS[lang][strength]}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Remember Me / Agree to Terms Checkbox */}
              <div className="pt-1">
                {mode === 'login' ? (
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded-md border-line-strong text-action focus:ring-action/20 accent-action"
                    />
                    <span className="text-xs text-body font-medium">{t(lang, 'rememberMe')}</span>
                  </label>
                ) : (
                  <>
                    <label className="flex items-start gap-2 cursor-pointer select-none">
                      <input
                        id="auth-agreeTerms"
                        type="checkbox"
                        required
                        checked={agreeTerms}
                        onChange={(e) => {
                          setAgreeTerms(e.target.checked)
                          markTouched('agreeTerms')
                        }}
                        aria-invalid={errorFor('agreeTerms') ? 'true' : 'false'}
                        aria-describedby={errorFor('agreeTerms') ? 'auth-agreeTerms-error' : undefined}
                        className="mt-0.5 h-4 w-4 rounded-md border-line-strong text-action focus:ring-action/20 accent-action"
                      />
                      <span className="text-xs text-body leading-relaxed font-medium">
                        {t(lang, 'agreeTerms')}
                      </span>
                    </label>
                    <FieldError id="auth-agreeTerms-error" message={errorFor('agreeTerms')} />
                  </>
                )}
              </div>

              {/* Primary Submit Button (Apple tactile press active:scale-[0.98]) */}
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-action hover:bg-action-hover text-white font-semibold text-sm shadow-xs transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                <span>{mode === 'login' ? t(lang, 'nextStep') : t(lang, 'signUp')}</span>
                {isRtl ? (
                  <ArrowLeft className="h-4 w-4" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
              </button>
            </form>

            {/* Social Divider */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-line" />
              </div>
              <span className="relative bg-card px-3 text-[11px] font-medium uppercase tracking-wider text-muted">
                {t(lang, 'orContinueWith')}
              </span>
            </div>

            {/* Social Authentication Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => alert('Apple OAuth simulation')}
                className="btn btn--secondary h-11 flex items-center justify-center gap-2 rounded-xl text-xs font-semibold transition-transform active:scale-95 border border-line-strong/70 hover:border-line-hover"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.56.64-1.05 1.7-0.92 2.72 1 .08 2.01-.5 2.63-1.22z" />
                </svg>
                <span>{t(lang, 'continueWithApple')}</span>
              </button>

              <button
                type="button"
                onClick={() => alert('Google OAuth simulation')}
                className="btn btn--secondary h-11 flex items-center justify-center gap-2 rounded-xl text-xs font-semibold transition-transform active:scale-95 border border-line-strong/70 hover:border-line-hover"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.93 6.72-4.93z"
                  />
                </svg>
                <span>{t(lang, 'continueWithGoogle')}</span>
              </button>
            </div>

            {/* Switch Mode Footer Link */}
            <p className="mt-6 text-center text-xs text-muted">
              {mode === 'login' ? (
                <>
                  {t(lang, 'dontHaveAccount')}{' '}
                  <button
                    type="button"
                    onClick={() => switchMode('signup')}
                    className="font-semibold text-action hover:text-action-hover transition-colors cursor-pointer"
                  >
                    {t(lang, 'signUp')}
                  </button>
                </>
              ) : (
                <>
                  {t(lang, 'alreadyHaveAccount')}{' '}
                  <button
                    type="button"
                    onClick={() => switchMode('login')}
                    className="font-semibold text-action hover:text-action-hover transition-colors cursor-pointer"
                  >
                    {t(lang, 'logIn')}
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
