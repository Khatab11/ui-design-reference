import { handleLogin } from './auth-controller.js'

export function routeRequest(method, pathname, body) {
  if (method === 'POST' && pathname === '/auth/login') return handleLogin(body)

  return {
    status: 404,
    body: { success: false, message: 'Not found' },
  }
}