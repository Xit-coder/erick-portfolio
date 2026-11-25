import { mkdir, writeFile } from 'node:fs/promises'
import * as icons from 'simple-icons'

const names = ['Html5', 'Css', 'Javascript', 'Typescript', 'React', 'Openjdk', 'Springboot', 'Python', 'Nodedotjs', 'Postgresql', 'Neon', 'Firebase', 'Cloudflare', 'Render', 'Github', 'Git', 'Modelcontextprotocol']
await mkdir('public/media/icons', { recursive: true })
for (const name of names) {
  const { slug, path } = icons['si' + name]
  await writeFile('public/media/icons/' + slug + '.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#9777b7" d="' + path + '"/></svg>\n')
}
