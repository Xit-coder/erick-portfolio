import { useState } from 'react'
import { ArrowRight, ArrowUpRight, SlidersHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { filterProjects, projectPath, projects, shotPath, type Project } from '../data/projects'

const categories = [...new Set(projects.map(project => project.category))]
const techs = [...new Set(projects.flatMap(project => project.stack))].sort((a, b) => a.localeCompare(b, 'pt-BR'))
const statuses = [...new Set(projects.map(project => project.status))]

export function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  const shot = project.shots[0]
  return <article data-reveal className={'project-card project-' + project.slug + (compact ? ' compact' : '')}>
    <Link to={projectPath(project.slug)} className="project-link" aria-label={'Ver projeto ' + project.name}>
      {shot && <div className="card-visual">
        <img src={shotPath(shot.file, true)} srcSet={shotPath(shot.file, true) + ' 640w, ' + shotPath(shot.file) + ' 1200w'}
          sizes={compact ? '(max-width: 560px) 90vw, (max-width: 760px) 45vw, 420px'
            : '(max-width: 560px) 90vw, (max-width: 1500px) 46vw, 740px'}
          alt={shot.alt} loading="lazy" decoding="async" width="640" height="360"/>
      </div>}
      <div className="card-content">
        <div className="card-meta"><span>{project.category}</span><span>{project.status}</span></div>
        <h3>{project.name}</h3><p>{project.summary}</p>
        {!compact && <div className="tags">{project.stack.slice(0, 3).map(tech => <span key={tech}>{tech}</span>)}</div>}
        <span className="card-arrow" aria-hidden="true"><ArrowUpRight size={20}/></span>
      </div>
    </Link>
  </article>
}

export function ProjectList() {
  const [category, setCategory] = useState('')
  const [technology, setTechnology] = useState('')
  const [status, setStatus] = useState('')
  const filtered = filterProjects(projects, category, technology, status)
  const clear = () => { setCategory(''); setTechnology(''); setStatus('') }
  return <>
    <div className="project-heading">
      <h2 id="project-title">Projetos</h2>
      <details className="project-filters">
        <summary><SlidersHorizontal size={16} aria-hidden="true"/> Filtrar projetos</summary>
        <div className="filters">
          <div className="filter-categories" role="group" aria-label="Filtrar por categoria">
            {['', ...categories].map(item => <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item || 'Todos'}</button>)}
          </div>
          <div className="filter-selects">
            <select aria-label="Filtrar por tecnologia" value={technology} onChange={event => setTechnology(event.target.value)}>
              <option value="">Tecnologia</option>{techs.map(item => <option key={item}>{item}</option>)}
            </select>
            <select aria-label="Filtrar por status" value={status} onChange={event => setStatus(event.target.value)}>
              <option value="">Status</option>{statuses.map(item => <option key={item}>{item}</option>)}
            </select>
          </div>
        </div>
      </details>
    </div>
    <p className="sr-only" role="status">{filtered.length} projetos encontrados</p>
    {filtered.length > 0 ? <ul className="project-directory" aria-label="Projetos em destaque">
      {filtered.map(project => <li key={project.slug}>
        <Link to={projectPath(project.slug)} className="project-row" aria-label={'Ver projeto ' + project.name}>
          {project.shots[0] && <img src={shotPath(project.shots[0].file, true)} alt="" loading="lazy" decoding="async" width="128" height="72"/>}
          <div className="project-row-copy"><h3>{project.name}</h3><p>{project.summary}</p></div>
          <span className="project-row-category">{project.category}</span>
          <ArrowRight size={20} aria-hidden="true"/>
        </Link>
      </li>)}
    </ul> : <div className="empty"><p>Nenhum projeto corresponde aos filtros.</p><button className="button secondary" onClick={clear}>Limpar filtros</button></div>}
  </>
}
