import assert from 'node:assert/strict'
import { after, before, describe, it } from 'node:test'
import { createServer } from '../server/app.js'

describe('POST /auth/login', () => {
  let server
  let baseUrl

  before(async () => {
    server = createServer()
    await new Promise((resolve) => server.listen(0, resolve))
    baseUrl = `http://127.0.0.1:${server.address().port}`
  })

  after(async () => {
    await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())))
  })

  async function login(body) {
    return fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
  }

  it('accepts a valid email and non-empty password', async () => {
    const response = await login({ email: 'user@example.com', password: 'anything' })

    assert.equal(response.status, 200)
    assert.deepEqual(await response.json(), {
      success: true,
      message: 'Login successful',
      user: { email: 'user@example.com' },
    })
  })

  for (const [name, body] of [
    ['an invalid email format', { email: 'not-an-email', password: 'anything' }],
    ['a missing email', { password: 'anything' }],
    ['a missing password', { email: 'user@example.com' }],
    ['an empty password', { email: 'user@example.com', password: '' }],
    ['a whitespace-only password', { email: 'user@example.com', password: '   ' }],
    ['incorrect request types', { email: 42, password: true }],
  ]) {
    it(`rejects ${name}`, async () => {
      const response = await login(body)

      assert.equal(response.status, 400)
      assert.deepEqual(await response.json(), {
        success: false,
        message: 'Invalid email or password',
      })
    })
  }
})