import { ArrowDown, Braces, Code2, Database, FlaskConical, Layers3, Plus, RotateCcw, Terminal } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Contact } from '../components/Contact'
import { GitHubActivity } from '../components/GitHubActivity'
import { ProjectList } from '../components/ProjectList'
import { Workspace } from '../components/Workspace'
import { lab, skills } from '../data/site'

const skillIcons = [Code2, Braces, Database, Layers3, FlaskConical]

function ProfileNote({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section id={id} className="profile-note">
    <details>
      <summary>{title}<Plus size={18} aria-hidden="true"/></summary>
      {children}
    </details>
  </section>
}

export default function Home({ openTerminal, replayIntro }: { openTerminal: () => void; replayIntro: () => void }) {
  return <main id="conteudo" className="home">
    <section className="hero shell" id="inicio" aria-labelledby="hero-title">
      <div className="hero-text" data-hero>
        <h1 id="hero-title">Erick Hatano<span className="accent">.</span></h1>
        <p>Estudante de tecnologia. Desenvolvo sistemas web e automações.</p>
        <Link className="hero-link" to="/#projetos">Ver projetos <ArrowDown size={16}/></Link>
      </div>
      <Workspace/>
      <div className="hero-tools" data-hero>
        <button onClick={replayIntro}><RotateCcw size={15}/> Ver introdução</button>
        <button onClick={openTerminal}><Terminal size={15}/> Abrir terminal</button>
      </div>
    </section>

    <section className="shell projects-section" id="projetos" aria-labelledby="project-title">
      <ProjectList/>
      <details className="github-disclosure">
        <summary>Atividade no GitHub <Plus size={16} aria-hidden="true"/></summary>
        <GitHubActivity/>
      </details>
    </section>

    <section className="shell profile-section" id="sobre">
      <div className="profile-intro" data-reveal>
        <h2>Sobre mim</h2>
        <p>Estudo Tecnologia da Informação e trabalho em projetos próprios de desenvolvimento Full Stack. Tenho interesse em inteligência artificial, integrações e infraestrutura.</p>
      </div>
      <div className="profile-notes">
        <ProfileNote id="tecnologias" title="Tecnologias">
          <div className="skills">{skills.map(({ title, items }, index) => {
            const CategoryIcon = skillIcons[index]
            return <article key={title} className="skill-row">
              <h3><CategoryIcon size={19}/>{title}</h3>
              <ul>{items.map(([name, icon, applied]) => <li key={name} id={'skill-' + name.toLowerCase().replaceAll(' ', '-')}>
                {icon ? <img src={'/media/icons/' + icon + '.svg'} alt="" width="16" height="16" loading="lazy"/> : <Code2 size={16}/>}
                {name}{applied ? <small className="sr-only">Usado em projetos</small> : <small>Em estudo</small>}
              </li>)}</ul>
            </article>
          })}</div>
        </ProfileNote>
        <ProfileNote id="experiencia" title="Experiência em projetos">
          <ul className="experience-list">
            <li>No VÉRTA, trabalhei com catálogo, autenticação e integração entre interface e API.</li>
            <li>No CodeAtlas, explorei a inspeção de repositórios e a publicação de uma API com Cloudflare Workers e Neon.</li>
            <li>Em grupo, desenvolvi a revista interativa Colombia Unveiled.</li>
          </ul>
        </ProfileNote>
        <ProfileNote id="devlab" title="DevLab">
          <ul className="lab-list">{lab.map(item => <li key={item.name}>
            <div><h3>{item.name}</h3><p>{item.description}</p></div><span className="lab-status">{item.status}</span>
          </li>)}</ul>
        </ProfileNote>
      </div>
    </section>
    <Contact/>
  </main>
}
