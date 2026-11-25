import { useEffect, useRef } from 'react'
import { ArrowRight, Check, LockKeyhole, TerminalSquare, X } from 'lucide-react'
import { Dialog } from './Dialog'

const boot = ['Initializing system...', 'Loading interface modules...', 'Establishing secure connection...', 'Connection established.']

export default function Intro({ close, unavailable, manual }: {
  close: () => void; unavailable: () => void; manual: boolean
}) {
  const stage = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let disposed = false
    let revert: (() => void) | undefined
    let watchdog: number | undefined
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    if (motion.matches && !manual) {
      unavailable()
      return
    }
    const motionChanged = () => { if (motion.matches && !manual) unavailable() }
    motion.addEventListener('change', motionChanged)
    const loadTimeout = window.setTimeout(() => { disposed = true; unavailable() }, 1800)
    import('gsap').then(({ gsap }) => {
      const current = stage.current
      if (disposed || !current) return
      clearTimeout(loadTimeout)
      watchdog = window.setTimeout(unavailable, 5850)
      const distance = motion.matches ? 0 : 1
      const context = gsap.context(() => {
        const timeline = gsap.timeline({ onComplete: close, defaults: { ease: 'power2.out' } })
        function type(node: HTMLElement, value: string, duration: number, at: number) {
          const counter = { count: 0 }
          timeline.to(counter, { count: value.length, duration, ease: 'none',
            onUpdate: () => { node.textContent = value.slice(0, Math.round(counter.count)) } }, at)
        }
        current.querySelectorAll<HTMLElement>('[data-boot]').forEach((line, i) => type(line, boot[i], .34, .22 + i * .39))
        if (distance) timeline.fromTo('.intro-progress i', { scaleX: 0 }, { scaleX: 1, duration: 2.04 }, 0)
        timeline.to('.intro-boot', { autoAlpha: 0, y: -10 * distance, duration: .22 }, 2.18)
          .fromTo('.intro-auth', { y: 10 * distance }, { autoAlpha: 1, y: 0, duration: .27 }, 2.28)
        type(current.querySelector<HTMLElement>('[data-user]')!, 'visitor', .33, 2.48)
        type(current.querySelector<HTMLElement>('[data-pass]')!, '••••••••••••', .47, 2.87)
        timeline.to('.intro-authenticating', { autoAlpha: 1, duration: .18 }, 3.38)
          .to('.intro-auth', { autoAlpha: 0, y: -8 * distance, duration: .25 }, 3.88)
          .fromTo('.intro-success', { y: 10 * distance }, { autoAlpha: 1, y: 0, duration: .25 }, 4.03)
          .to(current, { opacity: 0, scale: 1 + .03 * distance, duration: .32 }, 4.85)
          .to(current.closest('dialog'), { opacity: 0, duration: .31 }, 5.00)
      }, current)
      revert = () => context.revert()
    }).catch(() => { if (!disposed) unavailable() })
    return () => {
      disposed = true
      clearTimeout(loadTimeout)
      clearTimeout(watchdog)
      motion.removeEventListener('change', motionChanged)
      revert?.()
    }
  }, [close, unavailable, manual])
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


export function IntroPreview({ close }: { close: () => void }) {
  return <Dialog label="Introdução do portfólio" className="tool-dialog intro-preview" onClose={close}>
    <div className="tool-heading"><TerminalSquare size={19}/><h2>EH SYSTEMS</h2>
      <button className="icon-button" aria-label="Fechar introdução" onClick={close} autoFocus><X size={20}/></button>
    </div>
    <div className="intro-preview-content">
      <p>A animação não carregou. Veja a versão estática da abertura.</p>
      <ol>
        <li><strong>Inicialização</strong><span>Developer Environment v2.0</span></li>
        <li><strong>Autenticação simulada</strong><span>USERNAME visitor · PASSWORD ••••••••••••</span></li>
        <li><strong>Acesso concedido</strong><span>Welcome to the developer workspace.</span></li>
      </ol>
      <button className="button primary" onClick={close}>Voltar ao portfólio</button>
    </div>
  </Dialog>
}
