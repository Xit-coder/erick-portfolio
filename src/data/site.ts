export const profile = {
  name: 'Erick Hatano',
  title: 'Erick Hatano | Desenvolvimento Full Stack',
  description: 'Portfólio de Erick Hatano. Desenvolvimento Full Stack, inteligência artificial, automações e projetos de software.',
  github: 'https://github.com/Xit-coder',
  linkedin: 'https://www.linkedin.com/in/erick-hatano-106a593a5/',
  email: import.meta.env.VITE_CONTACT_EMAIL?.trim() || '',
}
export const sections = [
  ['inicio', 'Início'], ['sobre', 'Sobre mim'], ['projetos', 'Projetos'],
  ['tecnologias', 'Tecnologias'], ['experiencia', 'Experiência'], ['contato', 'Contato'],
] as const
export const lab = [
  { name: 'LinkFlow', description: 'Encurtador de links com gerenciamento de destinos.', status: 'Planejado' },
  { name: 'Bot de Telegram', description: 'Automação de comandos e notificações em conversas.', status: 'Planejado' },
  { name: 'Dashboard financeiro', description: 'Visão de receitas, despesas e evolução do saldo.', status: 'Planejado' },
  { name: 'Gerenciamento de estoque', description: 'Controle de entradas, saídas e disponibilidade.', status: 'Planejado' },
] as const

type Skill = [name: string, icon: string, applied: boolean]
export const skills: { title: string; items: Skill[] }[] = [
  { title: 'Front-end', items: [['HTML', 'html5', true], ['CSS', 'css', true], ['JavaScript', 'javascript', true], ['TypeScript', 'typescript', true], ['React', 'react', true]] },
  { title: 'Back-end', items: [['Java', 'openjdk', true], ['Spring Boot', 'springboot', true], ['Python', 'python', true], ['Node.js', 'nodedotjs', true], ['APIs REST', '', true]] },
  { title: 'Banco de dados', items: [['SQL', '', true], ['PostgreSQL', 'postgresql', true], ['Neon', 'neon', true], ['Firebase', 'firebase', false]] },
  { title: 'Infraestrutura', items: [['Cloudflare', 'cloudflare', true], ['Render', 'render', true], ['GitHub', 'github', true], ['Git', 'git', true], ['CI/CD', '', true]] },
  { title: 'Outros', items: [['Inteligência artificial', '', false], ['Automações', '', true], ['Integrações MCP', 'modelcontextprotocol', false], ['Engenharia de software', '', true]] },
]
