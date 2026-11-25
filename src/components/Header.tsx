import { Command, Menu, Moon, Settings2, Sun, X } from 'lucide-react'
import { Github, Linkedin } from './BrandIcons'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { profile, sections } from '../data/site'

export function Brand() {
  return <Link className="brand" to="/#inicio" aria-label="Erick Hatano, início">
    <span className="monogram" aria-hidden="true">EH</span><span>Erick Hatano</span>
  </Link>
}

export function Header({ theme, toggleTheme, open }: {
  theme: string; toggleTheme: () => void; open: (panel: 'palette' | 'settings') => void
}) {
  const [menu, setMenu] = useState(false)
  const [active, setActive] = useState('inicio')
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (pathname !== '/') return
    const anchors = [...document.querySelectorAll<HTMLElement>('main section[id]')]
      .filter(anchor => sections.some(([id]) => id === anchor.id))
    let frame = 0
    const update = () => {
      const line = Math.min(innerHeight * .35, 210)
      const visible = anchors.filter(anchor => anchor.getBoundingClientRect().top <= line).at(-1)
      setActive(visible?.id || 'inicio')
    }
    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [pathname, hash])
  useEffect(() => {
    if (!menu) return
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenu(false)
        document.getElementById('menu-toggle')?.focus()
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [menu])
  const selected = pathname === '/' ? active : 'projetos'
  return <header className="header" data-hero>
    <div className="shell header-inner">
      <Brand/>
      <nav id="primary-navigation" aria-label="Navegação principal" className={menu ? 'nav-open' : ''}>
        {sections.map(([id, label]) => <Link key={id} to={'/#' + id} onClick={() => setMenu(false)}
          aria-current={selected === id ? 'location' : undefined}>{label}</Link>)}
        <div className="mobile-socials">
          <a href={profile.github} target="_blank" rel="noreferrer"><Github size={17}/> GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn</a>
        </div>
      </nav>
      <div className="header-tools">
        <a className="icon-button top-social" aria-label="GitHub" href={profile.github} target="_blank" rel="noreferrer"><Github size={18}/></a>
        <a className="icon-button top-social" aria-label="LinkedIn" href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18}/></a>
        <span className="tool-separator" aria-hidden="true"/>
        <button className="icon-button" onClick={toggleTheme} aria-label="Alternar tema" aria-pressed={theme === 'light'}>
          <span className="theme-dark"><Sun size={18}/></span><span className="theme-light"><Moon size={18}/></span>
        </button>
        <button className="shortcut" onClick={() => open('palette')} aria-label="Abrir menu de comandos"><Command size={14}/><kbd>K</kbd></button>
        <button className="icon-button settings-trigger" onClick={() => open('settings')} aria-label="Configurações"><Settings2 size={18}/></button>
        <button id="menu-toggle" className="icon-button menu-toggle" aria-label={menu ? 'Fechar menu' : 'Abrir menu'}
          aria-controls="primary-navigation" aria-expanded={menu} onClick={() => setMenu(!menu)}>
          {menu ? <X size={21}/> : <Menu size={21}/>}
        </button>
      </div>
    </div>
  </header>
}
