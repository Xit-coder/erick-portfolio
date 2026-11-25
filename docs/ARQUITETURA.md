# Arquitetura e manutenção

## Estrutura

| Caminho | Responsabilidade |
| --- | --- |
| `src/App.tsx` | Rotas, tema, sessão de introdução e ferramentas globais. |
| `src/pages/` | Página inicial, estudos de caso e erro 404. |
| `src/components/` | Cabeçalho, galeria, formulário, terminal, menu de comandos, identidade e atividade do GitHub. |
| `src/data/` | Perfil, projetos, tecnologias, DevLab e metadados. |
| `src/lib/` | Navegação, animações, comandos, armazenamento e GitHub. |
| `public/` | Fontes e licenças, mídias locais, favicon e cabeçalhos de cache. |
| `scripts/` | Pré-renderização, servidor de teste, ícones e auditoria Lighthouse. |
| `tests/` | Testes unitários, navegador e acessibilidade automatizada. |

React e TypeScript operam sobre rotas do React Router. O Vite gera os arquivos para navegador e um módulo usado apenas durante a pré-renderização. `scripts/prerender.mjs` gera HTML para a página inicial, os estudos de caso e a página de erro. Esse HTML é entregue com títulos, descrições e conteúdo para leitura e indexação. A hidratação ativa as interações. O Cloudflare Pages serve apenas arquivos estáticos.

As fontes Manrope, Space Grotesk e JetBrains Mono são locais e variáveis. As capturas foram comprimidas em WebP. O hero tem uma versão reduzida para telas estreitas. A galeria é exibida nas páginas de projeto e os cartões carregam miniaturas responsivas. GSAP, terminal, configurações e menu de comandos são carregados sob demanda. A interface de entrada faz parte do bundle inicial. A coleção de ícones de marcas é do Simple Icons e os ícones de interface são do Lucide.

## Animação e ferramentas

`Intro.tsx` usa uma timeline do GSAP para digitação, validação e revelação. A sequência leva aproximadamente 5,3 segundos. Há um limite de 1,8 segundo para carregar o GSAP e um temporizador de segurança de 5,85 segundos após a inicialização da timeline. O diálogo nativo mantém o foco no botão de pular. Escape também fecha a abertura. A autenticação é cenográfica e suas credenciais são texto decorativo.

A conclusão ou a dispensa da abertura registra a sessão em `sessionStorage`. O botão Ver introdução na página inicial, as configurações, o rodapé, o menu de comandos e `reboot` permitem voltar à sequência. Com movimento reduzido, o site pula a exibição automática e apresenta as três etapas em uma janela estática quando solicitadas. Se o GSAP estiver indisponível, o visitante pode seguir navegando e abrir a versão estática manualmente. `navigation.ts` coordena a entrada das páginas e as animações de rolagem. A limpeza cancela observadores, listeners e contextos GSAP na desmontagem.

O terminal interpreta uma lista fixa de comandos e não executa código externo. Seu histórico é local ao painel e preservado ao minimizar. O menu de comandos usa busca sem acentos e navegação por setas, Enter e Escape. Os atalhos Ctrl + K e Cmd + K funcionam em toda a interface.

## Atualizar o conteúdo

- **Perfil e contatos**. Edite `src/data/site.ts`. Para publicar um endereço de e-mail, configure `VITE_CONTACT_EMAIL`. O formulário usa somente estado local durante a preparação e confirma a cópia separadamente do envio.
- **Projetos**. Adicione um objeto em `src/data/projects.ts`. Use um `slug` único e estável, uma categoria, status, stack e capturas verificadas. A lista, os filtros, o menu de comandos, a rota e o sitemap derivam desses dados.
- **Imagens**. Coloque capturas reais em `public/media/`, em WebP, com nome sem extensão no campo `file`, descrição alternativa e rótulo. Use 1200 px de largura para a captura e gere uma versão de 640 px com o sufixo `-thumb`. Exclua dados pessoais e do ambiente de produção. A imagem da estação do hero é uma composição ilustrativa com um trecho público do CodeAtlas exibido em HTML.
- **Tecnologias e DevLab**. Edite as listas em `src/data/site.ts`. Marque evidência de uso em projetos em `skills` e mantenha o status de cada item do DevLab atualizado. Os quatro itens iniciais estão planejados.
- **GitHub**. `src/lib/github.ts` consulta a API pública com timeout de 4,5 segundos, cache local de 30 minutos e pausa para HTTP 403/429. Em falha, usa a última resposta em cache ou o link para o perfil. A seção apresenta repositórios públicos, linguagem principal e data do último push.

## Homologação e publicação

O projeto Pages `erick-hatano-portfolio` foi criado para receber a homologação da branch `feat/portfolio-complete-redesign`. A configuração usa `main` como ramo de produção. Na homologação, o build deve ser compilado com `SITE_URL` vazio e enviado como **Preview** da branch de trabalho.

1. Execute `npm ci`, `npm test`, `npm run build` e `npm run test:e2e`.
2. No projeto Pages, utilize Direct Upload para enviar o conteúdo de `dist/` para a branch de homologação. O arquivo `404.html` permite que o Pages responda com HTTP 404 para caminhos inválidos. `_headers` define cache e cabeçalhos de segurança.
3. Valide a URL retornada, uma rota de caso acessada diretamente e o HTTP 404.
4. Após aprovação, defina `SITE_URL` para a origem pública final e gere o build de produção. Vincule domínio e publique na branch de produção conforme a aprovação do responsável.

O site estático inclui suporte ao contato por rascunho. A entrega automática exigiria um canal profissional configurado, um serviço de entrega e controles no servidor.
