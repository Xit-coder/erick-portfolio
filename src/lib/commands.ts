import { normalize } from './browser'

export const commands = ['help', 'whoami', 'projects', 'skills', 'github', 'contact', 'about', 'theme', 'clear', 'reboot'] as const
export function parseCommand(value: string) {
  const command = value.trim().toLowerCase()
  return commands.find(item => item === command)
}
export function matchCommands(value: string) {
  return value.trim() ? commands.filter(item => item.startsWith(value.trim().toLowerCase())) : []
}
export function matchesQuery(query: string, value: string) {
  const text = normalize(value)
  return normalize(query).split(/\s+/).every(word => text.includes(word))
}
