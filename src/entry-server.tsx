import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { App } from './App'
import { projects, projectPath } from './data/projects'
import { pageMetadata } from './data/seo'

export const routes = ['/', ...projects.map(project => projectPath(project.slug)), '/404.html']
export const metadata = pageMetadata
export function render(path: string) {
  return renderToString(<StaticRouter location={path}><App/></StaticRouter>)
}
