import { createServer as createHttpServer } from 'node:http'
import { routeRequest } from './router.js'

function sendJson(response, status, body) {
  const payload = JSON.stringify(body)
  response.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'content-length': Buffer.byteLength(payload),
  })
  response.end(payload)
}

async function readJson(request) {
  let rawBody = ''
  for await (const chunk of request) rawBody += chunk
  if (!rawBody) return undefined
  return JSON.parse(rawBody)
}

export function createServer() {
  return createHttpServer(async (request, response) => {
    try {
      const body = await readJson(request)
      const result = routeRequest(request.method, request.url, body)
      sendJson(response, result.status, result.body)
    } catch {
      sendJson(response, 400, {
        success: false,
        message: 'Invalid email or password',
      })
    }
  })
}

if (process.argv[1] && new URL(import.meta.url).pathname === new URL(`file://${process.argv[1].replaceAll('\\', '/')}`).pathname) {
  const port = Number(process.env.PORT) || 3000
  createServer().listen(port, () => {
    console.log(`Auth server listening on http://localhost:${port}`)
  })
}