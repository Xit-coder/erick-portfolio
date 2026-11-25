import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { loadEnv } from 'vite'
import { routes, render, metadata } from '../.prerender/entry-server.js'

const env = loadEnv('production', process.cwd(), '')
const origin = (process.env.SITE_URL || env.SITE_URL || '').replace(/\/$/, '')
if (origin && !/^https:\/\/[a-z\d.-]+(?::\d+)?$/i.test(origin)) throw new Error('SITE_URL deve ser uma origem HTTPS.')
const input = await readFile('dist/index.html', 'utf8')
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const attr = (key, name, value) => '<meta ' + key + '="' + name + '" content="' + escape(value) + '">'
const localImage = '/media/erick-hatano-og.jpg'
const sitemap = []

for (const route of routes) {
  const page = metadata(route)
  const image = origin + localImage
  const tags = [
    '<title>' + escape(page.title) + '</title>',
    attr('name', 'description', page.description),
    attr('property', 'og:title', page.title),
    attr('property', 'og:description', page.description),
    attr('property', 'og:type', 'website'),
    attr('property', 'og:locale', 'pt_BR'),
    attr('property', 'og:image', image),
    attr('property', 'og:image:width', '1200'),
    attr('property', 'og:image:height', '630'),
    attr('property', 'og:image:alt', 'Erick Hatano · Desenvolvimento Full Stack'),
    attr('name', 'twitter:card', 'summary_large_image'),
  ]
  const index = Boolean(origin && page.index)
  if (index) {
    const canonical = origin + page.path
    sitemap.push(canonical)
    tags.push('<link rel="canonical" href="' + escape(canonical) + '">', attr('property', 'og:url', canonical))
  } else tags.push(attr('name', 'robots', 'noindex, nofollow'))
  if (route === '/') tags.push('<link rel="preload" as="font" href="/fonts/space-grotesk.woff2" type="font/woff2" crossorigin>')
  const target = join('dist', route === '/404.html' ? '404.html' : route, route === '/404.html' ? '' : 'index.html')
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, input.replace('<!--metadata-->', () => tags.join('\n    ')).replace('<!--app-->', () => render(route)))
}
await writeFile('dist/sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
  sitemap.map(url => '\n  <url><loc>' + escape(url) + '</loc></url>').join('') + '\n</urlset>\n')
await writeFile('dist/robots.txt', origin ? 'User-agent: *\nAllow: /\nSitemap: ' + origin + '/sitemap.xml\n' : 'User-agent: *\nDisallow: /\n')
