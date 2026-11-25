import { describe, expect, it } from 'vitest'
import { filterProjects, projects, projectPath } from '../src/data/projects'
import { pageMetadata } from '../src/data/seo'
import { matchesQuery, matchCommands, parseCommand } from '../src/lib/commands'

describe('dados do portfólio', () => {
  it('aplica os filtros em conjunto e permite limpar todos', () => {
    expect(filterProjects(projects, 'Full Stack', 'Java', 'Em desenvolvimento').map(item => item.slug)).toEqual(['verta'])
    expect(filterProjects(projects, 'Full Stack', 'React', '')).toEqual([])
    expect(filterProjects(projects, '', '', '')).toEqual(projects)
  })
  it('gera títulos específicos e exclui páginas inválidas do índice', () => {
    expect(pageMetadata(projectPath('codeatlas')).title).toContain('CodeAtlas')
    expect(pageMetadata('/projetos/ausente/').index).toBe(false)
    expect(pageMetadata('/').index).toBe(true)
  })
  it('mantém os estudos de caso distintos, sem links de fontes privadas', () => {
    expect(new Set(projects.map(item => item.slug)).size).toBe(4)
    expect(projects.filter(item => item.repository).map(item => item.slug)).toEqual(['codeatlas'])
    expect(projects.every(item => item.shots.length > 0)).toBe(true)
  })
  it('normaliza comandos e busca sem acentos', () => {
    expect(parseCommand('  WhoAmI  ')).toBe('whoami')
    expect(parseCommand('help extra')).toBeUndefined()
    expect(matchCommands('pr')).toEqual(['projects'])
    expect(matchesQuery('verta stack', 'VÉRTA · Full Stack')).toBe(true)
  })
})
