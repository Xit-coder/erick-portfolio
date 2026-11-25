import { useEffect, useRef } from 'react'
import { ArrowRight, Check, LockKeyhole, TerminalSquare } from 'lucide-react'
import { Dialog } from './Dialog'

const boot = ['Initializing system...', 'Loading interface modules...', 'Establishing secure connection...', 'Connection established.']

export default function Intro({ close }: { close: () => void }) {
  const stage = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let disposed = false
    let revert: (() => void) | undefined
    const watchdog = window.setTimeout(close, 5850)
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    const motionChanged = () => { if (motion.matches) close() }
    motion.addEventListener('change', motionChanged)
    import('gsap').then(({ gsap }) => {
      const current = stage.current
      if (disposed || !current) return
      const context = gsap.context(() => {
        const timeline = gsap.timeline({ onComplete: close, defaults: { ease: 'power2.out' } })
        function type(node: HTMLElement, value: string, duration: number, at: number) {
          const counter = { count: 0 }
          timeline.to(counter, { count: value.length, duration, ease: 'none',
            onUpdate: () => { node.textContent = value.slice(0, Math.round(counter.count)) } }, at)
        }
        current.querySelectorAll<HTMLElement>('[data-boot]').forEach((line, i) => type(line, boot[i], .34, .22 + i * .39))
        timeline.fromTo('.intro-progress i', { scaleX: 0 }, { scaleX: 1, duration: 2.04 }, 0)
          .to('.intro-boot', { autoAlpha: 0, y: -10, duration: .22 }, 2.18)
          .fromTo('.intro-auth', { y: 10 }, { autoAlpha: 1, y: 0, duration: .27 }, 2.28)
        type(current.querySelector<HTMLElement>('[data-user]')!, 'visitor', .33, 2.48)
        type(current.querySelector<HTMLElement>('[data-pass]')!, '••••••••••••', .47, 2.87)
        timeline.to('.intro-authenticating', { autoAlpha: 1, duration: .18 }, 3.38)
          .to('.intro-auth', { autoAlpha: 0, y: -8, duration: .25 }, 3.88)
          .fromTo('.intro-success', { y: 10 }, { autoAlpha: 1, y: 0, duration: .25 }, 4.03)
          .to(current, { opacity: 0, scale: 1.03, duration: .32 }, 4.85)
          .to(current.closest('dialog'), { opacity: 0, duration: .31 }, 5.00)
      }, current)
      revert = () => context.revert()
    }).catch(close)
    return () => {
      disposed = true
      clearTimeout(watchdog)
      motion.removeEventListener('change', motionChanged)
      revert?.()
    }
  }, [close])
  return <Dialog label="Introdução do portfólio" className="intro-dialog" onClose={close}>
    <p className="sr-only">Sequência ilustrativa de entrada. O portfólio está disponível ao pular ou ao final da introdução.</p>
    <div className="intro-stage" ref={stage} aria-hidden="true">
      <div className="intro-window">
        <header><TerminalSquare size={17}/> EH SYSTEMS <span>SESSION / 01</span></header>
        <div className="intro-window-body">
          <div className="intro-boot"><h2>EH SYSTEMS<span className="cursor"/></h2>
            <p>Developer Environment v2.0</p>
            <ul>{boot.map(line => <li key={line}><span>›</span> <b data-boot/></li>)}</ul>
          </div>
          <div className="intro-auth"><LockKeyhole size={22}/><h2>RESTRICTED ENVIRONMENT</h2>
            <p>USERNAME <b data-user/></p><p>PASSWORD <b data-pass/></p>
            <strong className="intro-authenticating">[ AUTHENTICATING ]</strong>
          </div>
          <div className="intro-success"><Check size={32}/><p>IDENTITY VERIFIED</p>
            <h2>ACCESS GRANTED</h2><p>Welcome to the developer workspace.</p>
          </div>
        </div>
        <div className="intro-progress"><i/></div>
      </div>
    </div>
    <button className="intro-skip" onClick={close} autoFocus>Pular introdução <ArrowRight size={16}/></button>
  </Dialog>
}
