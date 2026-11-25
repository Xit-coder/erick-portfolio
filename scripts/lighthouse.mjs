import lighthouse from 'lighthouse'
import { spawn } from 'node:child_process'
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { setTimeout } from 'node:timers/promises'

const port = Number(process.env.EH_TEST_PORT || 4173)
const url = process.env.EH_TEST_URL || 'http://127.0.0.1:' + port
const profile = await mkdtemp(join(tmpdir(), 'eh-lighthouse-'))
const server = process.env.EH_TEST_URL ? null : spawn(process.execPath, ['scripts/serve.mjs'], { stdio: 'ignore' })
const chrome = spawn(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || '/usr/bin/chromium',
  ['--no-sandbox', '--headless=new', '--disable-dev-shm-usage', '--force-prefers-reduced-motion', '--remote-debugging-port=9225', '--user-data-dir=' + profile, 'about:blank'],
  { stdio: 'ignore' })
const output = process.env.EH_REPORT_DIR || 'test-results/lighthouse'
try {
  await mkdir(output, { recursive: true })
  for (let attempt = 0; attempt < 50; attempt++) {
    try { if ((await fetch('http://127.0.0.1:9225/json/version')).ok && (await fetch(url)).ok) break } catch {}
    await setTimeout(200)
  }
  for (const formFactor of ['mobile', 'desktop']) {
    const options = { port: 9225, output: 'json', logLevel: 'error' }
    const config = formFactor === 'desktop' ? { extends: 'lighthouse:default', settings: { formFactor, throttlingMethod: 'provided', screenEmulation: { width: 1366, height: 900, deviceScaleFactor: 1, mobile: false, disabled: false } } } : undefined
    const result = await lighthouse(url, options, config)
    if (!result) throw new Error('Lighthouse não produziu relatório.')
    await writeFile(join(output, formFactor + '.json'), result.report)
    const scores = Object.fromEntries(Object.entries(result.lhr.categories).map(([id, category]) => [id, Math.round((category.score ?? 0) * 100)]))
    const metrics = Object.fromEntries(['largest-contentful-paint', 'cumulative-layout-shift', 'total-blocking-time'].map(id => [id, result.lhr.audits[id]?.displayValue]))
    console.log(JSON.stringify({ formFactor, scores, metrics }))
  }
} finally {
  chrome.kill()
  server?.kill()
  await setTimeout(350)
  await rm(profile, { force: true, recursive: true })
}
