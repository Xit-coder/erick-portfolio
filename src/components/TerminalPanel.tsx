import { Minus, Terminal, X } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { projectPath, projects } from '../data/projects'
import { profile, skills } from '../data/site'
import { commands, matchCommands, parseCommand } from '../lib/commands'
import { Dialog } from './Dialog'

type Line = { input: string; result: ReactNode }
export default function TerminalPanel({ close, minimize, reboot, toggleTheme, theme, visible }: {
  close: () => void; minimize: () => void; reboot: () => void; toggleTheme: () => void; theme: string; visible: boolean
}) {
  const [lines, setLines] = useState<Line[]>([])
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [position, setPosition] = useState(0)
  const [draft, setDraft] = useState('')
  const end = useRef<HTMLDivElement>(null)
  const completions = matchCommands(value)
  useEffect(() => { end.current?.scrollIntoView({ block: 'nearest' }) }, [lines, visible])

  function run(event: FormEvent) {
    event.preventDefault()
    const input = value.trim()
    if (!input) return
    setHistory([...history, input].slice(-50))
    setPosition(Math.min(history.length + 1, 50))
    setDraft('')
    setValue('')
    let result: ReactNode
    switch (parseCommand(input)) {
      case 'help': result = commands.join(' · '); break
      case 'whoami': result = 'Erick Hatano · Estudante de tecnologia e desenvolvedor em formação.'; break
      case 'projects': result = <ul>{projects.map(project => <li key={project.slug}><Link onClick={close} to={projectPath(project.slug)}>{project.name}</Link></li>)}</ul>; break
      case 'skills': result = skills.map(category => category.items.map(([name]) => name).join(', ')).join(' · '); break
      case 'github': result = <a href={profile.github} target="_blank" rel="noreferrer">github.com/Xit-coder</a>; break
      case 'contact': result = <Link to="/#contato" onClick={close}>Abrir a seção de contato</Link>; break
      case 'about': result = <Link to="/#sobre" onClick={close}>Ler sobre Erick Hatano</Link>; break
      case 'theme': toggleTheme(); result = 'Tema ' + (theme === 'dark' ? 'claro' : 'escuro') + ' ativado.'; break
      case 'clear': setLines([]); return
      case 'reboot': reboot(); return
      default: result = 'Comando desconhecido. Digite help para ver a lista.'
    }
    setLines([...lines, { input, result }].slice(-80))
  }
  if (!visible) return null
  return <Dialog label="Terminal interativo" className="tool-dialog terminal-dialog" onClose={close}>
    <div className="tool-heading"><Terminal size={19}/><h2>Terminal</h2>
      <button className="icon-button" aria-label="Minimizar terminal" onClick={minimize}><Minus size={20}/></button>
      <button className="icon-button" aria-label="Fechar terminal" onClick={close}><X size={20}/></button>
    </div>
    <div className="terminal-output" role="log" aria-label="Respostas do terminal" tabIndex={0}>
      <p>Ambiente simulado. Digite <strong>help</strong> para listar os comandos.</p>
      {lines.map((line, index) => <div key={index} className="terminal-line"><div className="terminal-user">visitor@eh:~$ <span>{line.input}</span></div><div>{line.result}</div></div>)}
      <div ref={end}/>
    </div>
    <form className="terminal-form" onSubmit={run}>
      <label htmlFor="terminal-input">visitor@eh:~$</label>
      <input id="terminal-input" aria-label="Comando do terminal" autoComplete="off" autoCapitalize="none" spellCheck={false}
        maxLength={120} autoFocus value={value} onChange={event => setValue(event.target.value)}
        onKeyDown={event => {
          if (event.key === 'Tab' && !event.shiftKey && completions.length && completions[0] !== value) {
            event.preventDefault()
            setValue(completions[0])
          }
          if ((event.key === 'ArrowUp' || event.key === 'ArrowDown') && history.length) {
            event.preventDefault()
            if (position === history.length) setDraft(value)
            const next = Math.max(0, Math.min(history.length, position + (event.key === 'ArrowUp' ? -1 : 1)))
            setPosition(next)
            setValue(next === history.length ? (position === history.length ? value : draft) : history[next])
          }
        }}/>
      <button type="submit" className="button secondary">Executar</button>
    </form>
    {completions.length > 0 && completions[0] !== value && <div className="terminal-completions">{completions.map(command =>
      <button key={command} type="button" onClick={() => { setValue(command); document.getElementById('terminal-input')?.focus() }}>{command}</button>
    )}</div>}
  </Dialog>
}
