// Copies each design artboard that a chapter references into
// public/assets/<chapter>/<name>.html so the site can show it as a live
// figure. Run with: npm run diagrams:sync
import fs from 'node:fs'
import path from 'node:path'
import { ASSETS_DIR, ROOT, baseName, matchAssets } from './diagrams.mjs'

// Injected into every copy: a marker the site checks for, and a fit-to-width
// script so a fixed-size artboard scales to whatever width it is shown at.
const HEAD_INJECT = (source, w, h) => `
  <meta name="ui-reference-diagram" content="${w}x${h}">
  <!-- Generated from ${source} by scripts/sync-diagrams.mjs. Edit the source, then re-run npm run diagrams:sync. -->
  <style>html, body { margin: 0; overflow: hidden; }</style>
  <script>
    (function () {
      function fit() {
        var frame = document.querySelector('x-dc > div');
        if (!frame) return;
        var width = frame.offsetWidth || ${w};
        frame.style.transformOrigin = '0 0';
        frame.style.transform = 'scale(' + window.innerWidth / width + ')';
      }
      window.addEventListener('resize', fit);
      window.addEventListener('load', fit);
      document.addEventListener('DOMContentLoaded', fit);
    })();
  </script>`

function transform(html, source, w, h) {
  source = source.replace(/--/g, '- -') // keep the generated HTML comment well-formed
  let out = html.replace(/[ \t]*<script src="\.\/support\.js"><\/script>\r?\n?/, '')
  out = out.replace(/<html>/i, '<html lang="en">')
  if (out.includes('<meta charset="utf-8">')) {
    out = out.replace('<meta charset="utf-8">', '<meta charset="utf-8">' + HEAD_INJECT(source, w, h))
  } else {
    out = out.replace(/<head>/i, '<head>' + HEAD_INJECT(source, w, h))
  }
  return out
}

const { matched, unmatched, orphans } = matchAssets()
let written = 0
for (const m of matched) {
  const outDir = path.join(ASSETS_DIR, m.chapterId)
  fs.mkdirSync(outDir, { recursive: true })
  const out = path.join(outDir, `${baseName(m.file)}.html`)
  const source = path.relative(ROOT, m.source)
  fs.writeFileSync(out, transform(fs.readFileSync(m.source, 'utf8'), source, m.w, m.h))
  written++
  console.log(`${source} -> ${path.relative(ROOT, out)}`)
}
console.log(`\n${written} live diagram${written === 1 ? '' : 's'} written`)
for (const u of unmatched) {
  console.log(`no artboard for ${u.chapterId}/${u.file} (section "${u.sectionId}"); the site will use the image or the placeholder`)
}
for (const o of orphans) {
  console.log(`artboard "${o}" is not referenced by any chapter`)
}
