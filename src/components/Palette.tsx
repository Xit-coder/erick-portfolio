import { ArrowDown, ArrowUp, Command, FolderOpen, Hash, RotateCcw, Search, SunMoon, Terminal, X } from 'lucide-react'
import { useId, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { projectPath, projects } from '../data/projects'
import { sections, skills } from '../data/site'
import { matchesQuery } from '../lib/commands'
import { Dialog } from './Dialog'

const entries = [
  ...sections.map(([id, label]) => ({ label, group: 'Seção', icon: Hash, to: '/#' + id, keywords: '' })),
  { label: 'DevLab', group: 'Seção', icon: Hash, to: '/#devlab', keywords: 'laboratório' },
  ...projects.map(project => ({ label: project.name, group: 'Projeto', icon: FolderOpen, to: projectPath(project.slug), keywords: project.stack.join(' ') })),
  ...skills.flatMap(category => category.items.map(([name]) => ({
    label: name, group: 'Tecnologia', icon: Hash, to: '/#skill-' + name.toLowerCase().replaceAll(' ', '-'), keywords: category.title,
  }))),
]

export default function Palette({ close, theme, terminal, reboot }: {
  close: () => void; theme: () => void; terminal: () => void; reboot: () => void
}) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const id = useId()
  const actions = [
    { label: 'Alternar tema', group: 'Ação', icon: SunMoon, run: theme, keywords: 'claro escuro' },
    { label: 'Abrir terminal', group: 'Ação', icon: Terminal, run: terminal, keywords: 'comandos' },
    { label: 'Reproduzir introdução', group: 'Ação', icon: RotateCcw, run: reboot, keywords: 'reboot entrada' },
  ]
  const all = query.trim() ? [...entries.map(({ to, ...entry }) => ({ ...entry, run: () => navigate(to) })), ...actions]
    : [...entries.slice(0, 6).map(({ to, ...entry }) => ({ ...entry, run: () => navigate(to) })), ...actions]
  const results = all.filter(entry => matchesQuery(query, [entry.label, entry.group, entry.keywords].join(' ')))
  const choose = (position: number) => {
    const item = results[position]
    if (!item) return
    close()
    item.run()
  }
  return <Dialog label="Menu de comandos" className="tool-dialog palette" onClose={close}>
    <div className="palette-input"><Search size={21}/><input aria-label="Buscar comandos" autoFocus
      role="combobox" aria-autocomplete="list" aria-controls={id} aria-expanded="true"
      aria-activedescendant={results[index] ? id + '-' + index : undefined}
      placeholder="Procurar projetos, tecnologias ou ações…"
      value={query} onChange={event => { setQuery(event.target.value); setIndex(0) }}
      onKeyDown={event => {
        if (event.key === 'Enter') { event.preventDefault(); choose(index) }
        if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && results.length) {
          event.preventDefault()
          const next = (index + (event.key === 'ArrowDown' ? 1 : -1) + results.length) % results.length
          setIndex(next)
          document.getElementById(id + '-' + next)?.scrollIntoView({ block: 'nearest' })
        }
      }}/>
      <button className="icon-button" aria-label="Fechar menu de comandos" onClick={close}><X size={20}/></button>
    </div>
    <div className="palette-results" id={id} role="listbox" aria-label="Comandos encontrados">
      {results.map(({ label, group, icon: Icon }, position) => <div key={label + group}
        role="option" id={id + '-' + position} aria-selected={index === position}
        onMouseMove={() => setIndex(position)} onMouseDown={event => event.preventDefault()} onClick={() => choose(position)}>
        <Icon size={17}/><span>{label}</span><small>{group}</small></div>)}
    </div>
    {!results.length && <p className="palette-empty" role="status">Nenhum resultado.</p>}
    <footer className="palette-footer"><span><ArrowUp size={13}/><ArrowDown size={13}/> Navegar</span><span>Enter para abrir</span><span><Command size={13}/> K</span></footer>
  </Dialog>
}
