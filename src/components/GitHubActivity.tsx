import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Github } from './BrandIcons'
import { profile } from '../data/site'
import { loadGitHub } from '../lib/github'

const date = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' })

export function GitHubActivity() {
  const area = useRef<HTMLElement>(null)
  const [ready, setReady] = useState(false)
  const [data, setData] = useState<Awaited<ReturnType<typeof loadGitHub>>>()
  useEffect(() => {
    const controller = new AbortController()
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return
      observer.disconnect()
      setReady(true)
      void loadGitHub(controller.signal).then(result => { if (!controller.signal.aborted) setData(result) })
    })
    if (area.current) observer.observe(area.current)
    return () => { observer.disconnect(); controller.abort() }
  }, [])
  return <aside className="activity" ref={area} aria-labelledby="github-activity">
    <div className="activity-header"><Github size={21}/><h3 id="github-activity">Atividade pública</h3>
      <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">Ver perfil <ArrowUpRight size={16}/></a>
    </div>
    {data?.repos.length ? <ul>{data.repos.map(repo => <li key={repo.name}>
      <a href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a>
      <span>{repo.language || 'Linguagem não informada'}</span>
      <time dateTime={repo.pushed_at}>{date.format(new Date(repo.pushed_at))}</time>
    </li>)}</ul> : <p>{!ready ? 'Repositórios públicos no GitHub.' : !data ? 'Consultando o GitHub…'
      : data.stale ? 'A consulta está indisponível. Os repositórios continuam acessíveis pelo perfil.' : 'Nenhum repositório público encontrado.'}</p>}
    {data?.stale && data.repos.length > 0 && <p>Exibindo a última consulta salva neste navegador.</p>}
  </aside>
}
