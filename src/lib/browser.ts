export function readStorage(key: string, session = false) {
  try { return (session ? sessionStorage : localStorage).getItem(key) } catch { return null }
}

export function writeStorage(key: string, value: string, session = false) {
  try { (session ? sessionStorage : localStorage).setItem(key, value) } catch {}
}

export const introKey = 'eh-intro-seen-v2'
export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches
export const normalize = (value: string) => value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim()

export async function copyText(text: string) {
  await navigator.clipboard.writeText(text)
}
