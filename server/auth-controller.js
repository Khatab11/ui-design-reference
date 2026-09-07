import { login } from './auth-service.js'
import { validateLoginInput } from './validation.js'

export function handleLogin(body) {
  if (!validateLoginInput(body)) {
    return {
      status: 400,
      body: { success: false, message: 'Invalid email or password' },
    }
  }

  return {
    status: 200,
    body: {
      success: true,
      message: 'Login successful',
      user: login(body.email),
    },
  }
}