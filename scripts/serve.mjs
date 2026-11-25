import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, resolve, sep } from 'node:path'
import { gzipSync } from 'node:zlib'

const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.xml': 'application/xml', '.txt': 'text/plain' }
const root = resolve('dist')
const compressed = new Map()
const port = Number(process.env.EH_TEST_PORT || 4173)
createServer(async (request, response) => {
  try {
    const path = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
    const file = path === '/404.html' ? resolve(root, '404.html') : resolve(root, '.' + path, ...(extname(path) ? [] : ['index.html']))
    let status = path === '/404.html' ? 404 : 200
    let body
    if (file.startsWith(root + sep)) body = await readFile(file).catch(() => undefined)
    if (!body) { status = 404; body = await readFile(resolve(root, '404.html')) }
    const type = status === 404 ? mime['.html'] : mime[extname(file)] || 'application/octet-stream'
    const headers = { 'Content-Type': type, Vary: 'Accept-Encoding' }
    if (body.length >= 1024 && /gzip/.test(request.headers['accept-encoding'] || '') && /^(text|application)/.test(type)) {
      if (!compressed.has(file)) compressed.set(file, gzipSync(body))
      body = compressed.get(file)
      headers['Content-Encoding'] = 'gzip'
    }
    response.writeHead(status, headers)
    response.end(body)
  } catch {
    response.writeHead(400)
    response.end('Requisição inválida')
  }
}).listen(port, '127.0.0.1')
