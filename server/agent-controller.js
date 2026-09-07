import fs from 'node:fs'
import path from 'node:path'

const ROOT_DIR = process.cwd()
const MCP_CARD_PATH = path.join(ROOT_DIR, 'public', '.well-known', 'mcp', 'server-card.json')
const RULES_PATH = path.join(ROOT_DIR, 'public', 'api', 'rules.json')

export function handleMcpServerCard() {
  try {
    if (fs.existsSync(MCP_CARD_PATH)) {
      const data = JSON.parse(fs.readFileSync(MCP_CARD_PATH, 'utf-8'))
      return { status: 200, body: data }
    }
  } catch {}

  return {
    status: 200,
    body: {
      $schema: 'https://modelcontextprotocol.io/schema/server-card.json',
      name: 'ui-design-reference',
      displayName: 'UI Design Reference (ما ليس على المصمّم جهله)',
      version: '1.0.0',
      capabilities: { tools: [], resources: [] },
    },
  }
}

export function handleAgentRules(pathname = '') {
  try {
    if (fs.existsSync(RULES_PATH)) {
      const data = JSON.parse(fs.readFileSync(RULES_PATH, 'utf-8'))
      return { status: 200, body: data }
    }
  } catch {}

  return {
    status: 200,
    body: { meta: { name: 'UI Design Reference Heuristics Index' }, chapters: [] },
  }
}
