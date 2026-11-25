import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react'
import { Github } from '../components/BrandIcons'
import { Link, useParams } from 'react-router-dom'
import { Gallery } from '../components/Gallery'
import { ProjectCard } from '../components/ProjectList'
import { projects } from '../data/projects'
import { NotFound } from './NotFound'

export function ProjectPage() {
  const { slug } = useParams()
  const project = projects.find(item => item.slug === slug)
  if (!project) return <NotFound/>
  const facts = [
    ['O problema', project.problem], ['A solução', project.solution], ['Arquitetura', project.architecture],
    ['Desafios', project.challenge], ['Aprendizados', project.lesson],
  ]
  return <main id="conteudo" className="detail shell">
    <Link className="text-link back-link" to="/#projetos"><ArrowLeft size={18}/> Todos os projetos</Link>
    <div className="detail-heading" data-hero>
      <div className="detail-meta"><p className="eyebrow"><span/> {project.category}</p><span className="status">{project.status}</span></div>
      <h1>{project.name}<span className="accent">.</span></h1><p>{project.overview}</p>
      {(project.demo || project.repository) && <div className="detail-links">
        {project.demo && <a className="button primary" href={project.demo} target="_blank" rel="noreferrer">Ver demonstração <ArrowUpRight size={18}/></a>}
        {project.repository && <a className="button secondary" href={project.repository} target="_blank" rel="noreferrer"><Github size={18}/> Repositório público</a>}
      </div>}
    </div>
    <Gallery key={project.slug} shots={project.shots} name={project.name}/>
    <p className="detail-note">{project.note}</p>
    <div className="detail-grid">
      <div className="case-copy" data-reveal>{facts.map(([title, copy]) => <article key={title}><h2>{title}</h2><p>{copy}</p></article>)}</div>
      <aside className="project-aside" data-reveal>
        <h2>Funcionalidades</h2>
        <ul>{project.features.map(feature => <li key={feature}><Check size={16}/>{feature}</li>)}</ul>
        <h2>Tecnologias</h2><div className="tags">{project.stack.map(tech => <span key={tech}>{tech}</span>)}</div>
        <h2>Status atual</h2><p>{project.status}</p>
      </aside>
    </div>
    <section className="related section">
      <h2>Projetos relacionados<span className="accent">.</span></h2>
      <div className="related-grid">{projects.filter(item => item.slug !== project.slug).map(item => <ProjectCard project={item} key={item.slug} compact/>)}</div>
    </section>
  </main>
}
