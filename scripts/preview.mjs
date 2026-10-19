import { serve } from 'srvx'
import { staticMiddleware } from 'srvx/static'
import { readFile, access } from 'node:fs/promises'
import { parseArgs } from 'node:util'
const { values } = parseArgs({
  options: {
    port: { type: 'string', default: '3000' },
    host: { type: 'string', default: '127.0.0.1' },
  },
})
await access('.output/public/index.html')
const notFound = await readFile('.output/public/404.html', 'utf8')
const server = serve({
  hostname: values.host,
  port: Number(values.port),
  middleware: [staticMiddleware({ dir: '.output/public' })],
  fetch: () =>
    new Response(notFound, {
      status: 404,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    }),
})
await server.ready()
console.log(`Local static preview: http://${values.host}:${server.port}`)
