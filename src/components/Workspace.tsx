import { Terminal } from 'lucide-react'

// Trecho de apps/api/src/github.ts do repositório público Code-Atlas (MIT).
const snippet = [
  'export async function inspectRepository(',
  '  value: string,',
  '  fetcher: typeof fetch = (input, init) => fetch(input, init),',
  '): Promise<RepositoryInfo> {',
  '  const parsed = parseRepository(value);',
  '  const path = `/repos/${encodeURIComponent(parsed.owner)}/${encodeURIComponent(parsed.repo)}`;',
  '  const repo = metadata.parse(await githubJson(path, fetcher));',
  '  const commit = commitSchema.parse(',
  '    await githubJson(',
  '      `${path}/commits/${encodeURIComponent(repo.default_branch)}`,',
  '      fetcher,',
  '    ),',
  '  );',
  '  return {',
  '    ...parsed,',
  '    description: repo.description,',
  '    defaultBranch: repo.default_branch,',
]

export function Workspace() {
  return <figure className="hero-frame" data-hero>
    <div className="frame-heading"><span aria-hidden="true"><i/><i/><i/></span><span><Terminal size={15}/> Estação de desenvolvimento</span><span className="frame-id" aria-hidden="true">EH</span></div>
    <div className="workspace">
      <picture>
        <source media="(max-width: 760px)" srcSet="/media/workspace-small.webp"/>
        <img src="/media/workspace.webp" alt="Notebook em uma estação de desenvolvimento, exibindo código TypeScript do projeto CodeAtlas" width="1280" height="853" fetchPriority="high"/>
      </picture>
      <div className="workspace-code" aria-hidden="true">
        <span className="editor-title">CodeAtlas / apps / api / src / github.ts</span>
        <pre>{snippet.map((line, index) => <span key={index}><span className="line-number">{71 + index}</span>
          {line.split(/(\b(?:export|async|function|const|await|return|typeof|string)\b|`[^`]+`)/g).map((token, n) =>
            n % 2 ? <span key={n} className={token.startsWith('`') ? 'string' : 'keyword'}>{token}</span> : token)}
          {'\n'}</span>)}</pre>
      </div>
    </div>
    <figcaption><span><span className="activity-dot"/> CodeAtlas</span><span>TypeScript · GitHub API</span></figcaption>
  </figure>
}
