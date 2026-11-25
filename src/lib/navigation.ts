import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { prefersReducedMotion } from './browser'

export function usePageMotion(intro: boolean) {
  const { pathname, hash, key } = useLocation()
  const lastPage = useRef('')
  useEffect(() => {
    const previous = lastPage.current
    lastPage.current = pathname
    if (pathname === previous && !hash) return
    const frame = requestAnimationFrame(() => {
      let id: string
      try { id = decodeURIComponent(hash.slice(1)) } catch { id = '' }
      const anchor = id ? document.getElementById(id) : null
      if (anchor) {
        const disclosure = anchor.matches('.profile-note') ? anchor.querySelector(':scope > details') : anchor.closest('details')
        if (disclosure instanceof HTMLDetailsElement && !disclosure.open) {
          disclosure.open = true
        }
        anchor.scrollIntoView({ block: 'start', behavior: previous && !prefersReducedMotion() ? 'smooth' : 'instant' })
        if (previous) {
          anchor.tabIndex = -1
          anchor.focus({ preventScroll: true })
        }
      } else if (pathname !== previous) {
        window.scrollTo({ top: 0, behavior: 'instant' })
        if (previous) {
          const main = document.getElementById('conteudo')
          if (main) { main.tabIndex = -1; main.focus({ preventScroll: true }) }
        }
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, key])

  useEffect(() => {
    if (intro || prefersReducedMotion()) return
    let disposed = false
    let observer: IntersectionObserver | undefined
    let revert: (() => void) | undefined
    void import('gsap').then(({ gsap }) => {
      if (disposed) return
      const context = gsap.context(self => {
        const animate = self.add('reveal', (target: Element) => {
          gsap.fromTo(target, { y: 16, opacity: .45 }, { y: 0, opacity: 1, duration: .47, ease: 'power2.out', clearProps: 'transform,opacity' })
        })
        const hero = [...document.querySelectorAll('[data-hero]')].filter(
          element => element.getBoundingClientRect().top < innerHeight && element.getBoundingClientRect().bottom > 0,
        )
        if (hero.length) gsap.fromTo(hero, { y: 11 }, { y: 0, duration: .55, stagger: .05, clearProps: 'transform' })
        observer = new IntersectionObserver(entries => entries.forEach(entry => {
          if (!entry.isIntersecting) return
          if (entry.boundingClientRect.top >= innerHeight * .25) animate(entry.target)
          observer?.unobserve(entry.target)
        }), { threshold: .12 })
        document.querySelectorAll('[data-reveal]').forEach(target => observer?.observe(target))
      })
      revert = () => context.revert()
    }).catch(() => {})
    return () => { disposed = true; observer?.disconnect(); revert?.() }
  }, [pathname, intro])
}
