import { ArrowLeft, ArrowRight, Maximize2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { shotPath, type Shot } from '../data/projects'
import { Dialog } from './Dialog'
import { prefersReducedMotion } from '../lib/browser'

export function Gallery({ shots, name }: { shots: Shot[]; name: string }) {
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const shot = shots[index]
  const step = (direction: number) => setIndex(current => (current + direction + shots.length) % shots.length)

  useEffect(() => {
    if (!open || prefersReducedMotion()) return
    let tween: { kill: () => void } | undefined
    let disposed = false
    void import('gsap').then(({ gsap }) => {
      if (!disposed) tween = gsap.fromTo('.lightbox img', { scale: .98, opacity: .75 }, { scale: 1, opacity: 1, duration: .25 })
    }).catch(() => {})
    return () => { disposed = true; tween?.kill() }
  }, [open, index])
  if (!shot) return null

  const controls = shots.length > 1 && <div className="gallery-controls">
    <button type="button" className="icon-button" onClick={() => step(-1)} aria-label="Captura anterior"><ArrowLeft size={19}/></button>
    <span aria-live="polite">{index + 1} / {shots.length}</span>
    <button type="button" className="icon-button" onClick={() => step(1)} aria-label="Próxima captura"><ArrowRight size={19}/></button>
  </div>

  return <section className="gallery" aria-label={'Capturas de ' + name}>
    <button className="gallery-image" onClick={() => setOpen(true)} aria-label={'Ampliar captura: ' + shot.label}>
      <img src={shotPath(shot.file)} alt={shot.alt} width="1200" height="675" fetchPriority="high"/>
      <span className="gallery-expand"><Maximize2 size={19}/></span>
    </button>
    <div className="gallery-bar"><span>{shot.label}</span>{controls}</div>
    {shots.length > 1 && <div className="gallery-thumbs">{shots.map((entry, position) => <button type="button" key={entry.file}
      onClick={() => setIndex(position)} aria-pressed={position === index} aria-label={entry.label}>
      <img src={shotPath(entry.file, true)} alt="" width="160" height="90" loading="lazy"/>
      <span>{entry.label}</span>
    </button>)}</div>}
    {open && <Dialog label={'Galeria de ' + name} className="lightbox" onClose={() => setOpen(false)}>
      <div onKeyDown={event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault()
          step(event.key === 'ArrowLeft' ? -1 : 1)
        }
      }}>
        <div className="lightbox-top"><span>{shot.label}</span><button className="icon-button" aria-label="Fechar galeria" onClick={() => setOpen(false)} autoFocus><X size={22}/></button></div>
        <img src={shotPath(shot.file)} alt={shot.alt} width="1200" height="675"/>
        {controls}
      </div>
    </Dialog>}
  </section>
}
