import assert from 'node:assert/strict'
import test from 'node:test'
import { routeRequest } from '../server/router.js'

test('AI Agent & MCP endpoints', async (t) => {
  await t.test('GET /.well-known/mcp/server-card.json returns 200 and valid schema', () => {
    const res = routeRequest('GET', '/.well-known/mcp/server-card.json')
    assert.equal(res.status, 200)
    assert.equal(res.body.name, 'ui-design-reference')
    assert.ok(Array.isArray(res.body.capabilities.tools))
    assert.ok(res.body.capabilities.tools.length >= 2)
  })

  await t.test('GET /.well-known/mcp.json backward compatibility returns 200', () => {
    const res = routeRequest('GET', '/.well-known/mcp.json')
    assert.equal(res.status, 200)
    assert.equal(res.body.name, 'ui-design-reference')
  })

  await t.test('GET /api/agent/rules returns structured chapters catalogue', () => {
    const res = routeRequest('GET', '/api/agent/rules')
    assert.equal(res.status, 200)
    assert.ok(res.body.meta)
    assert.ok(Array.isArray(res.body.chapters))
    assert.equal(res.body.chapters.length, 22)
  })

  await t.test('unknown route returns 404', () => {
    const res = routeRequest('GET', '/unknown/route')
    assert.equal(res.status, 404)
    assert.equal(res.body.success, false)
  })
})
