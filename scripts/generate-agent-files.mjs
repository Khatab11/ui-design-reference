import fs from 'node:fs'
import path from 'node:path'

const ROOT_DIR = process.cwd()
const CONTENT_DIR = path.join(ROOT_DIR, 'content')
const PUBLIC_DIR = path.join(ROOT_DIR, 'public')
const WELL_KNOWN_DIR = path.join(PUBLIC_DIR, '.well-known')
const MCP_DIR = path.join(WELL_KNOWN_DIR, 'mcp')
const API_DIR = path.join(PUBLIC_DIR, 'api')

const SITE_URL = 'https://ui-design-reference.netlify.app'

for (const dir of [PUBLIC_DIR, WELL_KNOWN_DIR, MCP_DIR, API_DIR]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

const chapterFiles = fs
  .readdirSync(CONTENT_DIR)
  .filter((file) => file.endsWith('.json'))
  .sort()

const chapters = chapterFiles.map((file) => {
  const filePath = path.join(CONTENT_DIR, file)
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw)
})

console.log(`Loaded ${chapters.length} chapters from ${CONTENT_DIR}`)

function generateRobotsTxt() {
  return `# robots.txt for UI Design Reference (ما ليس على المصمّم جهله)
# Optimized for Search Engines & Autonomous AI Agents

User-agent: *
Allow: /

# Dedicated AI Agent Directives
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: Bytespider
Allow: /

User-agent: Diffbot
Allow: /

# Discovery Standards
Sitemap: ${SITE_URL}/sitemap.xml
LLMs-Txt: ${SITE_URL}/llms.txt
`
}

function generateSitemapXml() {
  const date = new Date().toISOString().split('T')[0]
  const urls = [
    `  <url>\n    <loc>${SITE_URL}/</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>`,
    `  <url>\n    <loc>${SITE_URL}/#/gamification</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`,
  ]

  for (const ch of chapters) {
    urls.push(
      `  <url>\n    <loc>${SITE_URL}/#/${ch.id}</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.9</priority>\n  </url>`
    )
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`
}

function generateMcpServerCard() {
  return {
    $schema: 'https://modelcontextprotocol.io/schema/server-card.json',
    name: 'ui-design-reference',
    displayName: 'UI Design Reference (ما ليس على المصمّم جهله)',
    version: '1.0.0',
    description:
      'Comprehensive Arabic UI/UX design knowledge base, design system rules, WCAG accessibility benchmarks, and RTL interface heuristics.',
    vendor: {
      name: 'UI Design Reference Open Source Community',
      url: SITE_URL,
    },
    capabilities: {
      tools: [
        {
          name: 'get_design_rule',
          description:
            'Retrieve design rules and heuristics for a specific UI domain (e.g., typography, colors, grid-layout, buttons, forms, shadows, arabic-rtl).',
          inputSchema: {
            type: 'object',
            properties: {
              topic: {
                type: 'string',
                enum: [
                  'basics',
                  'grid-layout',
                  'typography',
                  'colors',
                  'gradients',
                  'shadows',
                  'buttons',
                  'forms',
                  'icons',
                  'photos',
                  'illustrations',
                  'cards',
                  'white-space',
                  'personality',
                  'language',
                  'navigation',
                  'microinteractions',
                  'arabic-rtl',
                ],
                description: 'The design topic to query.',
              },
              lang: {
                type: 'string',
                enum: ['ar', 'en'],
                default: 'ar',
                description: 'Language of output rules.',
              },
            },
            required: ['topic'],
          },
        },
        {
          name: 'list_chapters',
          description:
            'List all 22 chapters of the UI Design Reference with titles, order, summaries, and URLs.',
          inputSchema: {
            type: 'object',
            properties: {
              lang: {
                type: 'string',
                enum: ['ar', 'en'],
                default: 'ar',
              },
            },
          },
        },
        {
          name: 'get_chapter_content',
          description:
            'Fetch complete text, section breakdown, and practical design principles for any chapter.',
          inputSchema: {
            type: 'object',
            properties: {
              chapterId: {
                type: 'string',
                description:
                  "Chapter identifier, e.g. '03-typography', 'grid-layout', 'colors', 'buttons'.",
              },
              lang: {
                type: 'string',
                enum: ['ar', 'en'],
                default: 'ar',
              },
            },
            required: ['chapterId'],
          },
        },
      ],
      resources: [
        {
          uri: `${SITE_URL}/llms.txt`,
          name: 'LLMs Context Manifest',
          mimeType: 'text/markdown',
          description: 'Compact overview and quick reference for AI agents.',
        },
        {
          uri: `${SITE_URL}/llms-full.txt`,
          name: 'Full Knowledge Base Markdown',
          mimeType: 'text/markdown',
          description: 'Complete text of all 22 chapters compiled in a single machine-readable document.',
        },
        {
          uri: `${SITE_URL}/api/rules.json`,
          name: 'Structured Design Rules Index',
          mimeType: 'application/json',
          description: 'JSON catalogue of design principles, WCAG criteria, and token guidelines.',
        },
      ],
    },
    transports: [
      {
        type: 'http',
        endpoint: `${SITE_URL}/api/agent/rules`,
      },
    ],
  }
}

function generateLlmsTxt() {
  const lines = []

  lines.push('# ما ليس على المصمّم جهله (UI Design Reference)')
  lines.push('')
  lines.push(
    '> المرجع الشامل والعملي لقواعد وأسس تصميم واجهات المستخدم (UI/UX) باللغة العربية، مبني ومستوحى من كتاب مايكل فيليبيوك ومنهجيات التصميم العالمية، ومصمم لتمكين المصممين والمطورين ووكلاء الذكاء الاصطناعي (AI Agents) من الاستشهاد بأدق قواعد واجهات المستخدم.'
  )
  lines.push('')
  lines.push('## Overview & Target Architecture')
  lines.push(
    'This open-source educational knowledge base provides 22 comprehensive chapters on user interface design principles with special focus on Arabic Right-to-Left (RTL) localization, accessibility standards (WCAG 2.1 AA), typography scales, 8pt spatial systems, functional color schemes, and micro-interactions.'
  )
  lines.push('')
  lines.push('## Core UI/UX Heuristics for AI Agents')
  lines.push(
    'When generating or evaluating UI designs, adhere strictly to these principles established in the book:'
  )
  lines.push(
    '1. **Spatial Grid:** Use a base 4pt / 8pt grid system. Margin and padding should always be multiples of 4 or 8 (8px, 16px, 24px, 32px, 48px).'
  )
  lines.push(
    '2. **Color Balance (60-30-10):** 60% neutral ground/surface, 30% secondary structure/cards, 10% primary action accent. Never overuse accent colors.'
  )
  lines.push(
    '3. **Accessibility (WCAG AA):** Normal text must have at least 4.5:1 contrast against its background; large text (>=18pt or bold >=14pt) requires 3:1.'
  )
  lines.push(
    '4. **Touch Targets:** Interactive controls (buttons, inputs, clickable icons) must maintain a minimum physical hit target of 44x44 CSS pixels.'
  )
  lines.push(
    '5. **Typography Scale:** Maintain optical hierarchy with at most 3-4 type sizes per view (e.g., Hero 32px, H2 24px, Body 16px, Caption 13px). Line height for body text should be 1.5–1.6x.'
  )
  lines.push(
    '6. **Arabic RTL Conventions:** Mirror horizontal layouts, progress bars, and directional icons (back/forward arrows), but do NOT mirror media playback controls, phone numbers, or math operations.'
  )
  lines.push(
    '7. **Concentric Radii:** When nesting containers, ensure outer border-radius equals inner border-radius plus padding (R_outer = R_inner + padding).'
  )
  lines.push(
    '8. **Tabular Numbers:** Always use `font-variant-numeric: tabular-nums` for counters, timers, XP badges, and pricing tables to prevent layout jitter.'
  )
  lines.push('')
  lines.push('## Chapters Index & Navigation')
  lines.push('')

  for (const ch of chapters) {
    const url = `${SITE_URL}/#/${ch.id}`
    lines.push(`- [${ch.title.ar} (${ch.title.en})](${url}): ${ch.intro.ar.slice(0, 160).replace(/\\n/g, ' ')}...`)
  }

  lines.push('')
  lines.push('## API & Structured Data Endpoints')
  lines.push(`- [MCP Server Card](${SITE_URL}/.well-known/mcp/server-card.json): Model Context Protocol server configuration for autonomous agents.`)
  lines.push(`- [Design Rules JSON](${SITE_URL}/api/rules.json): Machine-readable catalog of rules, tokens, and checklists.`)
  lines.push(`- [XML Sitemap](${SITE_URL}/sitemap.xml): Complete URL directory.`)
  lines.push('')
  lines.push('## Optional')
  lines.push(`- [Full Knowledge Base](${SITE_URL}/llms-full.txt): Complete text, principles, and practical examples of all 22 chapters in a single markdown document.`)

  return lines.join('\n')
}

function generateLlmsFullTxt() {
  const lines = []

  lines.push('# ما ليس على المصمّم جهله: المرجع الكامل والشامل لتصميم واجهات المستخدم')
  lines.push('# UI Design Reference - Full Knowledge Base')
  lines.push('')
  lines.push(
    '> هذا المستند يحتوي على النص الكامل والشامل لكافة فصول وأقسام ومبادئ «ما ليس على المصمّم جهله»، مجهز لوكلاء الذكاء الاصطناعي (LLMs & AI Agents) للاستيعاب السريع والإجابة على أي استفسارات تصميمية دون الحاجة لتصفح كل صفحة بشكل منفصل.'
  )
  lines.push('')
  lines.push('---')
  lines.push('')

  for (const ch of chapters) {
    lines.push(`## الفصل ${ch.order}: ${ch.title.ar} (${ch.title.en})`)
    lines.push(`**المسار (Route):** \`${SITE_URL}/#/${ch.id}\``)
    lines.push('')
    lines.push('### مقدمة الفصل')
    lines.push(ch.intro.ar)
    lines.push('')

    if (ch.sections && ch.sections.length > 0) {
      for (const sec of ch.sections) {
        lines.push(`#### ${sec.title.ar} (${sec.title.en})`)
        lines.push(sec.body.ar)
        lines.push('')
        if (sec.takeaway?.ar) {
          lines.push(`> **الخلاصة العملية:** ${sec.takeaway.ar}`)
          lines.push('')
        }
      }
    }

    lines.push('---')
    lines.push('')
  }

  return lines.join('\n')
}

function generateRulesJson() {
  const rules = chapters.map((ch) => ({
    id: ch.id,
    order: ch.order,
    title: ch.title,
    intro: ch.intro,
    sectionsCount: ch.sections ? ch.sections.length : 0,
    sections: (ch.sections || []).map((s) => ({
      id: s.id,
      title: s.title,
      takeaway: s.takeaway || null,
      summary: s.body.ar.slice(0, 180) + '...',
    })),
  }))

  return {
    meta: {
      name: 'UI Design Reference Heuristics Index',
      version: '1.0.0',
      totalChapters: chapters.length,
      updatedAt: new Date().toISOString(),
      standards: ['WCAG 2.1 AA', 'Material Design 3', 'Apple HIG', 'RTL Arabic Localization'],
    },
    chapters: rules,
  }
}

fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), generateRobotsTxt(), 'utf-8')
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), generateSitemapXml(), 'utf-8')
fs.writeFileSync(path.join(PUBLIC_DIR, 'llms.txt'), generateLlmsTxt(), 'utf-8')
fs.writeFileSync(path.join(PUBLIC_DIR, 'llms-full.txt'), generateLlmsFullTxt(), 'utf-8')

const mcpCard = JSON.stringify(generateMcpServerCard(), null, 2)
fs.writeFileSync(path.join(MCP_DIR, 'server-card.json'), mcpCard, 'utf-8')
fs.writeFileSync(path.join(WELL_KNOWN_DIR, 'mcp.json'), mcpCard, 'utf-8')
fs.writeFileSync(path.join(WELL_KNOWN_DIR, 'mcp-server.json'), mcpCard, 'utf-8')

const agentsJson = {
  $schema: 'https://agents.json.dev/v1/schema.json',
  name: 'ui-design-reference',
  description: 'Arabic UI Design Reference and Heuristics Engine',
  url: SITE_URL,
  llms_txt: `${SITE_URL}/llms.txt`,
  mcp_server: `${SITE_URL}/.well-known/mcp/server-card.json`,
}
fs.writeFileSync(path.join(WELL_KNOWN_DIR, 'agents.json'), JSON.stringify(agentsJson, null, 2), 'utf-8')

fs.writeFileSync(path.join(API_DIR, 'rules.json'), JSON.stringify(generateRulesJson(), null, 2), 'utf-8')

console.log('Successfully generated all AI Agent readiness files!')
