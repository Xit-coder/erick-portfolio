import { ArrowDown, ArrowUpRight, Braces, Code2, Database, FlaskConical, GitBranch, Layers3, RotateCcw, Terminal } from 'lucide-react'
import { Github } from '../components/BrandIcons'
import { Link } from 'react-router-dom'
import { Contact } from '../components/Contact'
import { GitHubActivity } from '../components/GitHubActivity'
import { ProjectList } from '../components/ProjectList'
import { Workspace } from '../components/Workspace'
import { lab, profile, skills } from '../data/site'

const skillIcons = [Code2, Braces, Database, Layers3, FlaskConical]
const experience = [
  ['Desenvolvimento de sistemas', 'No VÉRTA, trabalhei com catálogo, autenticação, consultas SQL e integração entre interface e API.'],
  ['Infraestrutura e integrações', 'No CodeAtlas, explorei a inspeção de repositórios e a publicação de uma API com Cloudflare Workers e Neon.'],
  ['Interface e acessibilidade', 'No projeto em grupo Colombia Unveiled, a mesma base de conteúdo sustenta leitura, questionários e apresentação.'],
]

export default function Home({ openTerminal, replayIntro }: { openTerminal: () => void; replayIntro: () => void }) {
  return <main id="conteudo">
    <section className="hero shell" id="inicio" aria-labelledby="hero-title">
      <div className="hero-text">
        <p className="hero-label" data-hero><span/> PORTFÓLIO DE DESENVOLVIMENTO</p>
        <h1 id="hero-title" data-hero>Erick <span>Hatano<span className="accent">.</span></span></h1>
        <p className="hero-role" data-hero>Desenvolvimento Full Stack <span>·</span> Inteligência Artificial <span>·</span> Automações</p>
        <p className="hero-description" data-hero>Desenvolvo soluções digitais, sistemas web e automações com foco em funcionalidade, desempenho e resolução de problemas reais.</p>
        <div className="hero-actions" data-hero>
          <Link className="button primary" to="/#projetos">Ver projetos <ArrowUpRight size={18}/></Link>
          <Link className="button secondary" to="/#contato">Entrar em contato</Link>
          <a className="button social-button" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub de Erick Hatano"><Github size={20}/></a>
        </div>
      </div>
      <Workspace/>
      <div className="hero-foot" data-hero>
        <Link to="/#projetos"><ArrowDown size={17}/> Explorar portfólio</Link>
        <div className="hero-tools">
          <button onClick={replayIntro}><RotateCcw size={17}/> Ver introdução</button>
          <button onClick={openTerminal}><Terminal size={17}/> Abrir terminal</button>
        </div>
      </div>
    </section>

    <section className="section projects-section" id="projetos">
      <div className="shell">
        <div className="section-heading" data-reveal>
          <div><p className="eyebrow"><span/> TRABALHOS SELECIONADOS</p><h2>Projetos em destaque<span className="accent">.</span></h2></div>
          <p>Aplicações, ferramentas e experiências digitais. Veja o que cada projeto resolve e como foi construído.</p>
        </div>
        <ProjectList/>
        <GitHubActivity/>
      </div>
    </section>

    <section className="section about-section" id="sobre">
      <div className="shell about-grid">
        <div data-reveal>
          <p className="eyebrow"><span/> SOBRE MIM</p><h2>Da interface<br/>à infraestrutura<span className="accent">.</span></h2>
        </div>
        <div className="about-copy" data-reveal>
          <p>Sou estudante de Tecnologia da Informação e desenvolvedor em formação. Construo projetos próprios para entender como interface, API e banco de dados se encaixam em um sistema que realmente funciona.</p>
          <p>Tenho interesse em desenvolvimento Full Stack, arquitetura de software e infraestrutura. Também exploro inteligência artificial, automações e integrações para reduzir tarefas repetitivas e aprender novas formas de resolver problemas.</p>
          <a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">Conheça meu LinkedIn <ArrowUpRight size={17}/></a>
        </div>
      </div>
    </section>

    <section className="section tech-section" id="tecnologias">
      <div className="shell">
        <div className="section-heading" data-reveal>
          <div><p className="eyebrow"><span/> TECNOLOGIAS</p><h2>Minha caixa de ferramentas<span className="accent">.</span></h2></div>
          <p>Ferramentas aplicadas em projetos e áreas em estudo, com contexto para cada uma.</p>
        </div>
        <div className="skills" data-reveal>{skills.map(({ title, items }, index) => {
          const CategoryIcon = skillIcons[index]
          return <article key={title} className="skill-row">
            <h3><CategoryIcon size={22}/>{title}</h3>
            <ul>{items.map(([name, icon, applied]) => <li key={name} id={'skill-' + name.toLowerCase().replaceAll(' ', '-')}>
              {icon ? <img src={'/media/icons/' + icon + '.svg'} alt="" width="17" height="17" loading="lazy"/> : <Code2 size={17}/>}
              <span>{name}</span>{applied ? <small className="sr-only">Usado em projetos</small> : <small>Em estudo</small>}
            </li>)}</ul>
          </article>
        })}</div>
      </div>
    </section>

    <section className="section" id="experiencia">
      <div className="shell experience-grid">
        <div data-reveal><p className="eyebrow"><span/> EXPERIÊNCIA</p><h2>Aprendizado<br/>na prática<span className="accent">.</span></h2>
          <p className="section-description">O que venho construindo e aprendendo em projetos próprios e em grupo.</p></div>
        <ol className="experience-list" data-reveal>{experience.map(([title, body]) => <li key={title}><GitBranch size={20}/><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol>
      </div>
    </section>

    <section className="section lab-section" id="devlab">
      <div className="shell">
        <div className="section-heading" data-reveal>
          <div><p className="eyebrow"><span/> LABORATÓRIO</p><h2>DevLab<span className="accent">.</span></h2></div>
          <p>Experimentos, protótipos e ideias para os próximos projetos.</p>
        </div>
        <ul className="lab-list" data-reveal>{lab.map(item => <li key={item.name}><FlaskConical size={20}/>
          <div><h3>{item.name}</h3><p>{item.description}</p></div><span className="lab-status">{item.status}</span>
        </li>)}</ul>
      </div>
    </section>
    <Contact/>
  </main>
}
