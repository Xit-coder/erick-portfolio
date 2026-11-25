import { ArrowUp, RotateCcw, Terminal } from 'lucide-react'
import { Component, Suspense, lazy, useCallback, useEffect, useState, type ReactNode } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { Brand, Header } from './components/Header'
import Intro, { IntroPreview } from './components/Intro'
import { pageMetadata } from './data/seo'
import { introKey, prefersReducedMotion, readStorage, writeStorage } from './lib/browser'
import { usePageMotion } from './lib/navigation'
import Home from './pages/Home'
import { ProjectPage } from './pages/Project'
import { NotFound } from './pages/NotFound'

const Palette = lazy(() => import('./components/Palette'))
const Settings = lazy(() => import('./components/Settings'))
const TerminalPanel = lazy(() => import('./components/TerminalPanel'))
type Panel = 'palette' | 'settings' | 'terminal' | null
type Theme = 'dark' | 'light'
type IntroMode = 'automatic' | 'manual' | 'unavailable' | null

class ToolBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch() { this.props.onFailure() }
  render() { return this.state.failed ? null : this.props.children }
}

export function App() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [intro, setIntro] = useState<IntroMode>(null)
  const [panel, setPanel] = useState<Panel>(null)
  const [terminalState, setTerminalState] = useState<'closed' | 'open' | 'minimized'>('closed')
  const [feedback, setFeedback] = useState('')
  const { pathname } = useLocation()
  const animatedIntro = intro === 'automatic' || intro === 'manual'
  usePageMotion(intro !== null)

  const finishIntro = useCallback(() => {
    writeStorage(introKey, '1', true)
    setIntro(null)
  }, [])
  const introUnavailable = useCallback(() => {
    setIntro(mode => mode === 'manual' ? 'unavailable' : null)
  }, [])
  const toggleTheme = useCallback(() => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'
    document.documentElement.dataset.theme = next
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'light' ? '#f7f4f2' : '#151416')
    writeStorage('portfolio-theme', next)
    setTheme(next)
  }, [])
  const openTerminal = () => { setTerminalState('open'); setPanel('terminal') }
  const closeTerminal = () => { setTerminalState('closed'); setPanel(null) }
  const minimizeTerminal = () => { setTerminalState('minimized'); setPanel(null) }
  const replayIntro = useCallback(() => {
    setPanel(null)
    setTerminalState('closed')
    setIntro('manual')
  }, [])

  useEffect(() => {
    const stored = readStorage('portfolio-theme')
    setTheme(stored === 'light' ? 'light' : 'dark')
    if (pageMetadata(window.location.pathname).index && !readStorage(introKey, true) && !prefersReducedMotion()) {
      setIntro('automatic')
    }
  }, [])
  useEffect(() => {
    const metadata = pageMetadata(pathname)
    document.title = metadata.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description)
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (canonical && metadata.index) canonical.href = new URL(metadata.path, canonical.href).href
  }, [pathname])
  useEffect(() => {
    const openPalette = (event: KeyboardEvent) => {
      if (intro || event.key.toLowerCase() !== 'k' || (!event.metaKey && !event.ctrlKey)) return
      event.preventDefault()
      setPanel(current => current === 'palette' ? null : 'palette')
    }
    window.addEventListener('keydown', openPalette)
    return () => window.removeEventListener('keydown', openPalette)
  }, [intro])
  useEffect(() => {
    if (!feedback) return
    const timer = setTimeout(() => setFeedback(''), 3800)
    return () => clearTimeout(timer)
  }, [feedback])

  const terminalVisible = terminalState === 'open' && panel === 'terminal'
  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <Header theme={theme} toggleTheme={toggleTheme} open={setPanel}/>
    <Routes>
      <Route path="/" element={<Home openTerminal={openTerminal} replayIntro={replayIntro}/>}/>
      <Route path="/projetos/:slug" element={<ProjectPage/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    <footer className="footer">
      <div className="shell footer-inner">
        <Brand/>
        <div><button className="text-link" onClick={replayIntro}><RotateCcw size={16}/> Reproduzir introdução</button>
          <Link className="icon-button" to="/#inicio" aria-label="Voltar ao início"><ArrowUp size={19}/></Link></div>
      </div>
    </footer>
    {terminalState !== 'closed' && !terminalVisible && <button className="terminal-dock button secondary" onClick={openTerminal}><Terminal size={17}/> Retomar terminal</button>}
    {feedback && <div className="toast" role="status">{feedback}</div>}
    {animatedIntro && <ToolBoundary onFailure={introUnavailable}>
      <Intro close={finishIntro} unavailable={introUnavailable} manual={intro === 'manual'}/>
    </ToolBoundary>}
    {intro === 'unavailable' && <IntroPreview close={finishIntro}/>}
    {(panel || terminalState !== 'closed') && <ToolBoundary onFailure={() => { closeTerminal(); setFeedback('A ferramenta está temporariamente indisponível.') }}>
      <Suspense fallback={<div className="toast" role="status">Carregando ferramenta…</div>}>
        {panel === 'palette' && <Palette close={() => setPanel(null)} theme={toggleTheme} terminal={openTerminal} reboot={replayIntro}/>}
        {panel === 'settings' && <Settings close={() => setPanel(null)} theme={theme} toggleTheme={toggleTheme} terminal={openTerminal} reboot={replayIntro}/>}
        {terminalState !== 'closed' && <TerminalPanel visible={terminalVisible} close={closeTerminal} minimize={minimizeTerminal} reboot={replayIntro} toggleTheme={toggleTheme} theme={theme}/>}
      </Suspense>
    </ToolBoundary>}
  </>
}
