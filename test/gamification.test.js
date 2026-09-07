import assert from 'node:assert/strict'
import test from 'node:test'
import {
  INITIAL_GAMIFICATION_STATE,
  computeLeaderboard,
  getCurrentRank,
  loadGamificationState,
  saveGamificationState,
} from '../src/lib/gamification.js'

test('rank boundaries and progress are calculated correctly', () => {
  const first = getCurrentRank(0)
  assert.equal(first.rank.level, 1)
  assert.equal(first.nextRank.level, 2)
  assert.equal(first.xpNeeded, 500)

  const second = getCurrentRank(500)
  assert.equal(second.rank.level, 2)
  assert.equal(second.progressInLevel, 0)

  const final = getCurrentRank(5000)
  assert.equal(final.rank.level, 8)
  assert.equal(final.nextRank, null)
  assert.equal(final.progressInLevel, 100)
})

test('leaderboard includes and ranks the current learner by XP', () => {
  const leaderboard = computeLeaderboard(4000, 'Learner')
  assert.equal(leaderboard[0].name, 'Learner')
  assert.equal(leaderboard[0].rank, 1)
  assert.equal(leaderboard.find((entry) => entry.isCurrentUser).tier, 'Diamond')
  assert.ok(leaderboard.every((entry, index) => index === 0 || entry.xp <= leaderboard[index - 1].xp))
})

test('gamification state round-trips through local storage and tolerates invalid data', () => {
  const previousStorage = globalThis.localStorage
  const data = new Map()
  globalThis.localStorage = {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value),
  }

  try {
    const updated = { ...INITIAL_GAMIFICATION_STATE, xp: 1355, completedSections: ['basics--hierarchy'] }
    saveGamificationState(updated)
    assert.deepEqual(loadGamificationState().completedSections, ['basics--hierarchy'])
    assert.equal(loadGamificationState().xp, 1355)

    data.set('ui_ref_gamification_state_v1', '{invalid json')
    assert.equal(loadGamificationState().xp, INITIAL_GAMIFICATION_STATE.xp)
  } finally {
    globalThis.localStorage = previousStorage
  }
})
