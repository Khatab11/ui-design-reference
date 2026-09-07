import { readdir, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import Ajv from 'ajv'

const root = resolve(import.meta.dirname, '..')
const contentDir = resolve(root, 'content')
const schema = JSON.parse(await readFile(resolve(root, 'schema/chapter.schema.json'), 'utf8'))
const validate = new Ajv({ allErrors: true, strict: false }).compile(schema)
const files = (await readdir(contentDir)).filter((file) => file.endsWith('.json')).sort()
let hasErrors = false

for (const file of files) {
  const content = JSON.parse(await readFile(resolve(contentDir, file), 'utf8'))
  if (validate(content)) {
    console.log(`content/${file} valid`)
    continue
  }

  hasErrors = true
  console.error(`content/${file} invalid`)
  for (const error of validate.errors || []) {
    console.error(`  ${error.instancePath || '/'} ${error.message}`)
  }
}

if (hasErrors) process.exitCode = 1
