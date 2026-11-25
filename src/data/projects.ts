export type Shot = { file: string; label: string; alt: string }
export type Project = {
  slug: string; name: string; category: string; status: string; summary: string
  overview: string; problem: string; solution: string; architecture: string
  challenge: string; lesson: string; stack: string[]; features: string[]; shots: Shot[]
  repository?: string; demo?: string; note: string
}

export const projects: Project[] = [
  {
    slug: 'verta', name: 'VÉRTA', category: 'Full Stack', status: 'Em desenvolvimento',
    summary: 'Marketplace B2B que conecta empresas, startups e oportunidades de negócios.',
    overview: 'A VÉRTA reúne a descoberta de soluções empresariais e as conversas entre empresas e startups em um mesmo ambiente.',
    problem: 'Encontrar fornecedores adequados e levar uma negociação adiante exige organizar informações que costumam ficar dispersas.',
    solution: 'Reunir catálogo, autenticação, perfis de empresa e startup, propostas e comunicação em uma aplicação com áreas dedicadas a cada papel.',
    architecture: 'Interface em HTML, CSS e JavaScript, API REST em Spring Boot e persistência com JPA. O desenvolvimento local usa H2. O perfil de produção prevê PostgreSQL com migrações Flyway.',
    challenge: 'Coordenar as permissões entre os diferentes perfis e manter os dados consistentes ao migrar do H2 para PostgreSQL.',
    lesson: 'Separar regras de domínio dos controladores e testar os fluxos com bancos isolados facilita evoluir o produto e as migrações.',
    stack: ['Java', 'Spring Boot', 'JavaScript', 'HTML', 'CSS', 'PostgreSQL', 'Neon', 'Flyway'],
    features: ['Marketplace e catálogo de produtos e serviços', 'Autenticação e papéis de empresa, startup e administração', 'Painéis administrativos e por perfil', 'Conversas, notificações, propostas e reuniões'],
    shots: [
      { file: 'verta-home', label: 'Página inicial', alt: 'Página inicial do VÉRTA Marketplace' },
      { file: 'verta-catalog', label: 'Catálogo', alt: 'Catálogo do VÉRTA com filtros e soluções cadastradas' },
      { file: 'verta-dashboard', label: 'Painel de startup', alt: 'Painel da startup de demonstração no VÉRTA' },
    ],
    note: 'Capturas do ambiente local com dados de demonstração. Código em repositório privado.',
  },
  {
    slug: 'codeatlas', name: 'CodeAtlas', category: 'Ferramentas', status: 'Em desenvolvimento',
    summary: 'Workspace para explorar a arquitetura de repositórios de código.',
    overview: 'A primeira versão do CodeAtlas valida a inspeção de origem e a disponibilidade da infraestrutura do workspace.',
    problem: 'Entender o ponto de entrada e a estrutura de um projeto novo costuma exigir várias consultas manuais.',
    solution: 'Na Fase 0, o workspace inspeciona metadados reais de repositórios GitHub e identifica o commit da branch padrão. A análise do código é prevista para fases posteriores.',
    architecture: 'Interface React e TypeScript com Vite e Tailwind CSS. API Hono em Cloudflare Workers, com diagnóstico PostgreSQL e migrações transacionais no Neon.',
    challenge: 'Tratar origem inválida, repositório inexistente, limites da API e banco indisponível sem interromper a interface.',
    lesson: 'Validar a conexão e o contrato de dados antes de adicionar o motor de análise torna cada etapa mais fácil de testar.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Hono', 'Cloudflare', 'PostgreSQL', 'Neon', 'Node.js'],
    features: ['Inspeção de metadados de repositórios públicos', 'Identificação do commit da branch padrão', 'Diagnóstico da API e do PostgreSQL', 'Migrações versionadas e testes'],
    shots: [
      { file: 'codeatlas-home', label: 'Workspace', alt: 'Workspace do CodeAtlas na Fase 0' },
      { file: 'codeatlas-inspect', label: 'Inspeção de origem', alt: 'Resultado da inspeção de um repositório GitHub no CodeAtlas' },
    ],
    repository: 'https://github.com/Xit-coder/Code-Atlas',
    demo: 'https://codeatlas.erickhatano.workers.dev',
    note: 'Fase 0 publicada. Grafos, análise de símbolos e orquestração de ambientes estão pendentes.',
  },
  {
    slug: 'discord-bot-premium', name: 'Bot Discord Premium', category: 'Automação', status: 'Em desenvolvimento',
    summary: 'Moderação, tickets e automações para comunidades no Discord.',
    overview: 'Projeto de bot com comandos de gerenciamento, automações de comunidade e licenciamento por servidor.',
    problem: 'Manter uma comunidade organizada demanda repetir tarefas de moderação, atendimento e configuração.',
    solution: 'Concentrar as tarefas em comandos do Discord e oferecer uma interface web para consultar os servidores autorizados.',
    architecture: 'Bot em Python e discord.py, dashboard FastAPI, persistência com SQLAlchemy e módulo de autenticação Discord OAuth, desativado na versão revisada.',
    challenge: 'Aplicar permissões de moderação e licenças no contexto de cada servidor.',
    lesson: 'Isolar as regras de licenciamento e testar os estados de autenticação facilita validar a administração do bot.',
    stack: ['Python', 'discord.py', 'FastAPI', 'SQLAlchemy', 'PostgreSQL'],
    features: ['Comandos de moderação', 'Abertura e fechamento de tickets privados', 'Boas-vindas, economia e níveis', 'Licenciamento por servidor', 'Painel de consulta implementado, com acesso desativado nesta versão'],
    shots: [
      { file: 'discord-home', label: 'Página do bot', alt: 'Página inicial real do Bot Discord Premium' },
    ],
    note: 'Captura local da página pública. O painel possui implementação de consulta, mas permanece indisponível no estado atual do código.',
  },
  {
    slug: 'colombia-unveiled', name: 'Colombia Unveiled', category: 'Front-end', status: 'Publicado',
    summary: 'Revista digital interativa de turismo e cultura colombiana.',
    overview: 'Projeto em grupo criado para apresentar a Colômbia em inglês, como revista digital e material de apresentação.',
    problem: 'O mesmo conteúdo precisava funcionar para a leitura individual e para uma apresentação em sala.',
    solution: 'Criar uma revista responsiva com roteiro, destinos e questionários, acompanhada de um conjunto de slides com notas para quem apresenta.',
    architecture: 'HTML semântico, CSS responsivo e módulos JavaScript para navegação, slides e quiz. Um service worker prepara os recursos para uso offline.',
    challenge: 'Sincronizar slides, notas e controles de apresentação, inclusive em telas pequenas e no modo tela cheia.',
    lesson: 'Compartilhar as perguntas entre os quizzes permite reutilizar conteúdo e preservar o estado independente de cada modo.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Nginx', 'Render'],
    features: ['Revista em inglês com destinos, cultura e gastronomia', 'Planejamento de itinerário interativo', 'Modo apresentação com notas sincronizadas', 'Questionários e ajustes de leitura', 'Cache para consulta offline'],
    shots: [
      { file: 'colombia-home', label: 'Capa da revista', alt: 'Capa real da revista digital Colombia Unveiled' },
      { file: 'colombia-quiz', label: 'Questionário', alt: 'Interface de questionário da revista Colombia Unveiled' },
    ],
    demo: 'https://colombia-unveiled.onrender.com',
    note: 'Capturas da revista e do questionário. Código em repositório privado.',
  },
]

export const projectPath = (slug: string) => '/projetos/' + slug + '/'
export const shotPath = (file: string, thumbnail = false) => '/media/' + file + (thumbnail ? '-thumb' : '') + '.webp'

export function filterProjects(list: Project[], category: string, technology: string, status: string) {
  return list.filter(project => (!category || project.category === category)
    && (!technology || project.stack.includes(technology))
    && (!status || project.status === status))
}
