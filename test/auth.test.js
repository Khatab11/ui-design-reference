import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { handleLogin } from '../server/auth-controller.js'

describe('POST /auth/login', () => {
  it('accepts a valid email and non-empty password', async () => {
    const response = handleLogin({ email: 'user@example.com', password: 'anything' })

    assert.deepEqual(response, {
      status: 200,
      body: {
        success: true,
        message: 'Login successful',
        user: { email: 'user@example.com' },
      },
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
      const response = handleLogin(body)

      assert.deepEqual(response, {
        status: 400,
        body: { success: false, message: 'Invalid email or password' },
      })
    })
  }
})
