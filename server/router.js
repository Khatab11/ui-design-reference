import { handleLogin } from './auth-controller.js'
import { handleMcpServerCard, handleAgentRules } from './agent-controller.js'

export function routeRequest(method, pathname, body) {
  if (method === 'POST' && pathname === '/auth/login') return handleLogin(body)

  const normalizedPath = pathname ? pathname.split('?')[0] : ''
  if (
    method === 'GET' &&
    (normalizedPath === '/.well-known/mcp/server-card.json' ||
      normalizedPath === '/.well-known/mcp.json' ||
      normalizedPath === '/.well-known/mcp-server.json')
  ) {
    return handleMcpServerCard()
  }

  if (method === 'GET' && (normalizedPath === '/api/agent/rules' || normalizedPath === '/api/rules')) {
    return handleAgentRules(pathname)
  }

  return {
    status: 404,
    body: { success: false, message: 'Not found' },
  }
}