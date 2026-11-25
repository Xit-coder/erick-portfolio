# Auditoria e validação

## Base revisada

O commit inicial `404a915` contém um portfólio estático com navegação, tema, duas categorias de filtro e carrossel. As três capturas do VÉRTA estavam referenciadas no HTML, mas o repositório não continha os arquivos. O nome de exibição, o perfil do GitHub, o LinkedIn, a descrição de estudante e as áreas de interesse vêm dessa versão e do pedido de reformulação. O arquivo de referência visual mencionado no pedido não estava disponível no ambiente.

## Evidência dos estudos de caso

| Projeto | Revisão auditada | Capturas | Status apresentado |
| --- | --- | --- | --- |
| VÉRTA | `bf00e99`. Java, Spring Boot, HTML/CSS/JS, REST, H2 local e PostgreSQL/Flyway no perfil de produção. | Home, catálogo e painel de startup capturados a partir do build local com dados de demonstração. | Em desenvolvimento |
| CodeAtlas | `3be3866`. Fase 0 com inspeção GitHub e diagnóstico PostgreSQL. | Workspace e inspeção real de um repositório público na versão publicada. | Em desenvolvimento, com Fase 0 pública |
| Bot Discord Premium | `069b162`. O código confirma comandos, automações, licenciamento e painel de consulta. A rota do painel autenticado está desativada. | Página pública executada localmente com FastAPI. | Em desenvolvimento |
| Colombia Unveiled | `b16ac5b`. Revista em grupo com itinerário, apresentação, notas e quizzes. | Capa e questionário a partir das evidências do repositório, com os créditos das fotos mantidos no projeto de origem. | Publicado |

O GitHub informa que VÉRTA, Bot Discord Premium e Colombia Unveiled usam repositórios privados. A página pública só oferece o link de código do CodeAtlas e demonstrações verificáveis.

A imagem da estação de trabalho foi gerada para o hero. O conteúdo visível na tela vem de `apps/api/src/github.ts` do CodeAtlas (MIT), com um trecho no componente `Workspace`. A imagem Open Graph usa a identidade EH e a paleta do portfólio.

## Testes

O build de produção e a checagem TypeScript passaram. A execução registrou 4 testes unitários e 19 testes Playwright aprovados.

- Vitest verifica dados, filtros, metadados, comandos e normalização da busca.
- Playwright verifica as fases da abertura, pular e reproduzir, movimento reduzido, falha do módulo de animação, navegação com e sem JavaScript, filtros, detalhes, galeria, tema, menu de comandos, terminal, rascunho de contato, recursos, console e HTTP 404.
- A integração GitHub tem testes de resposta, cache, exclusão de dados privados e HTTP 429, com respostas controladas. A API pública também é verificada separadamente.
- A responsividade é verificada em 360, 390, 768, 1024, 1366, 1920 e 2560 px.
- O axe-core verifica regras WCAG 2 A/AA e WCAG 2.1 AA na home, tema claro, menu de comandos e página de projeto.

## Limites

A validação automatizada de acessibilidade foi feita no Chromium com axe-core. O LinkedIn pode restringir o acesso a verificações automatizadas ou pedir login. O formato do contato mantém o envio sob controle do visitante. A conta de e-mail profissional só é exibida quando configurada publicamente.

## Resultados medidos

O build de produção foi auditado em 25 de novembro de 2026 com Lighthouse 13.6, Chromium, compressão gzip no servidor local, movimento reduzido e metadados de produção ativos. O perfil móvel usa limitação simulada. A abertura completa foi verificada à parte com Playwright.

| Perfil | Desempenho | Acessibilidade | Boas práticas | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Mobile | 97 | 100 | 100 | 100 | 2,7 s | 0 | 10 ms |
| Desktop | 100 | 100 | 100 | 100 | 0,2 s | 0,002 | 0 ms |

A API pública do GitHub e as demonstrações do CodeAtlas e Colombia Unveiled responderam HTTP 200 na checagem de rede. O perfil do LinkedIn preserva o endereço encontrado na versão anterior. A checagem automatizada do endereço recebeu HTTP 999.

- [Métricas Lighthouse](evidencias/lighthouse.json)
- [Inicialização](evidencias/intro-boot.webp), [autenticação](evidencias/intro-auth.webp) e [acesso](evidencias/intro-access.webp)
- [Home em 360 px](evidencias/inicio-360.webp), [390 px](evidencias/inicio-390.webp), [768 px](evidencias/inicio-768.webp), [1024 px](evidencias/inicio-1024.webp), [1366 px](evidencias/inicio-1366.webp), [1920 px](evidencias/inicio-1920.webp) e [2560 px](evidencias/inicio-2560.webp)
- [Estudo de caso](evidencias/projeto-verta.webp), [terminal](evidencias/terminal.webp), [menu de comandos](evidencias/menu-de-comandos.webp) e [tema claro](evidencias/tema-claro.webp)

## Homologação

A publicação Preview do Cloudflare Pages foi concluída para o commit funcional `bee9cf1`. A verificação no Chromium validou a abertura, as quatro rotas de projeto, o carregamento das capturas, o GitHub com resposta real, o tratamento HTTP 404 e a ausência de exceções de página. O preview inclui `noindex`. [Abrir homologação](https://2a66f6f8.erick-hatano-portfolio.pages.dev) · [Captura do preview](evidencias/cloudflare-preview.webp)

## Revisão da home

A home reúne os quatro projetos em barras com links diretos. Filtros, atividade no GitHub e detalhes do perfil abrem sob demanda. Os 4 testes unitários e 19 testes Playwright passaram após a revisão. O teste de desktop confirma as três etapas da reprodução manual com movimento reduzido. [Desktop](evidencias/home-revisada-desktop.webp) · [Mobile](evidencias/home-revisada-mobile.webp) · [Reprodução com movimento reduzido](evidencias/intro-movimento-reduzido.webp)

## Composição visual e prévia de projetos

A abertura da home usa uma nova imagem ilustrativa de estúdio, com trecho real do CodeAtlas no notebook. A galeria de projetos atualiza a captura no desktop com foco ou passagem do mouse sobre as barras. No mobile, cada barra mostra sua miniatura e abre a página correspondente. Os testes Playwright cobrem foco, mouse, filtros, navegação, responsividade e a introdução com movimento reduzido. [Desktop](evidencias/home-galeria-desktop.webp) · [Mobile](evidencias/home-galeria-mobile.webp)
