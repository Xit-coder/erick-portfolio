import { projectPath, projects } from './projects'
import { profile } from './site'

export function pageMetadata(path: string) {
  if (path === '/') return { path, title: profile.title, description: profile.description, index: true }
  const project = projects.find(project => projectPath(project.slug) === path || projectPath(project.slug) === path + '/')
  if (project) return { path: projectPath(project.slug), title: project.name + ' | Erick Hatano', description: project.summary, index: true }
  return { path: '/404.html', title: 'Página não encontrada | Erick Hatano', description: 'Página não encontrada no portfólio de Erick Hatano.', index: false }
}
