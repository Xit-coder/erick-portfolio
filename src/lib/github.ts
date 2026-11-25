import { readStorage, writeStorage } from './browser'

export type Repo = { name: string; html_url: string; language: string | null; pushed_at: string }
const key = 'eh-github-v1'
const ttl = 30 * 60 * 1000

export async function loadGitHub(signal: AbortSignal) {
  let cached: { at: number; repos: Repo[] } | undefined
  try {
    const raw = readStorage(key)
    if (raw) cached = JSON.parse(raw)
  } catch {}
  if (cached && Date.now() - cached.at < ttl) return { repos: cached.repos, stale: false }
  const retryAt = Number(readStorage(key + '-retry'))
  if (retryAt > Date.now()) return { repos: cached?.repos || [], stale: true }
  try {
    const response = await fetch('https://api.github.com/users/Xit-coder/repos?type=owner&sort=pushed&per_page=8', {
      signal: AbortSignal.any([signal, AbortSignal.timeout(4500)]),
      headers: { Accept: 'application/vnd.github+json' },
    })
    if (!response.ok) {
      if (response.status === 403 || response.status === 429) {
        const reset = Number(response.headers.get('X-RateLimit-Reset')) * 1000
        writeStorage(key + '-retry', String(Math.max(Date.now() + 5 * 60 * 1000, reset || 0)))
      }
      throw new Error('GitHub indisponível')
    }
    const raw: (Repo & { private: boolean })[] = await response.json()
    const repos = raw.filter(repo => !repo.private && /^https:\/\/github\.com\/Xit-coder\//i.test(repo.html_url))
      .slice(0, 4).map(({ name, html_url, language, pushed_at }) => ({ name, html_url, language, pushed_at }))
    writeStorage(key, JSON.stringify({ at: Date.now(), repos }))
    return { repos, stale: false }
  } catch {
    return { repos: cached?.repos || [], stale: true }
  }
}
