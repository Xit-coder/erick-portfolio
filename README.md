# Erick Hatano

Portfólio profissional de Erick Hatano, estudante de tecnologia e desenvolvedor Full Stack. O site apresenta quatro estudos de caso, tecnologias aplicadas em projetos, o DevLab, um terminal simulado e um menu de comandos.

[Abrir a homologação no Cloudflare Pages](https://feat-portfolio-complete-rede.erick-hatano-portfolio.pages.dev)

## Executar

Use Node.js 24 LTS e npm.

```sh
npm ci
npm run dev
```

Abra http://localhost:5173. O build estático inclui páginas pré-renderizadas e respostas HTTP 404. Use o servidor local para conferir.

```sh
npm run build
node scripts/serve.mjs
```

O servidor de verificação usa http://127.0.0.1:4173. O build é gerado em `dist/`.

## Configurar

Copie `.env.example` para `.env.local` para alterar as opções públicas abaixo.

| Variável | Uso |
| --- | --- |
| `SITE_URL` | Origem HTTPS final, sem caminho. Gera URLs canônicas, Open Graph absoluto e sitemap. Em branco, a compilação usa `noindex` para homologação. |
| `VITE_CONTACT_EMAIL` | Endereço profissional opcional e público. Habilita cópia do e-mail e abertura do aplicativo de e-mail com o rascunho. |

O formulário valida e prepara um rascunho no navegador. O visitante copia a mensagem e conclui o envio pelo LinkedIn ou pelo seu aplicativo de e-mail, quando configurado.

## Verificar

```sh
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
npm run test:lighthouse
```

Para usar o Chromium do sistema, defina `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. Para salvar capturas do Playwright, defina `EH_SCREENSHOTS` para um diretório. Os relatórios Lighthouse ficam em `test-results/lighthouse/` por padrão. Use `SITE_URL` no build de auditoria SEO.

- [Arquitetura, manutenção e deploy](docs/ARQUITETURA.md)
- [Auditoria, testes e evidências](docs/VALIDACAO.md)
