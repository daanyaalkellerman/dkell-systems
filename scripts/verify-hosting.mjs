import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { publicRoutes, siteOrigin } from '../shared/site.mjs'

const business = JSON.parse(
  await readFile(new URL('../project-brief/business-content.json', import.meta.url), 'utf8'),
)
const config = JSON.parse(await readFile(new URL('../firebase.json', import.meta.url), 'utf8'))
const origin = siteOrigin(process.env.NUXT_PUBLIC_SITE_ORIGIN ?? business.businessSiteOrigin)
const base = process.argv[2] || 'http://127.0.0.1:5000'
const aliases = JSON.parse(await readFile(new URL('../.firebaserc', import.meta.url), 'utf8'))
assert.equal(aliases.projects.default, 'd-kell-systems')
assert.equal(config.hosting.target, 'dkell')
assert.deepEqual(aliases.targets['d-kell-systems'].hosting.dkell, ['dkellsystems'])
assert.equal(origin, 'https://dkellsystems.web.app')
assert.equal(config.hosting.public, '.output/public')
assert.equal(config.hosting.cleanUrls, true)
assert.equal(config.hosting.trailingSlash, false)
assert.equal(config.hosting.rewrites, undefined, 'Static routes must not use SPA rewrites')
assert.ok(origin, 'Production verification requires a confirmed origin')
const routes = publicRoutes(business.services)
for (const route of routes) {
  const response = await fetch(base + route)
  assert.equal(response.status, 200, route)
  const html = await response.text()
  assert.ok(html.includes(`rel="canonical" href="${origin + route}"`), route + ' canonical')
  assert.ok(
    html.includes(`property="og:url" content="${origin + route}"`),
    route + ' Open Graph URL',
  )
  assert.ok(html.includes('name="twitter:title"'), route + ' social title')
  assert.ok(html.includes('name="twitter:description"'), route + ' social description')
  assert.ok(html.includes('name="robots" content="index, follow"'), route + ' indexability')
  assert.ok(html.includes(`"url":"${origin}"`), route + ' organisation URL')
}
for (const path of ['/missing-page', '/services/missing-service']) {
  const response = await fetch(base + path)
  assert.equal(response.status, 404, path)
  const html = await response.text()
  assert.ok(html.includes("We couldn't find that page."))
  assert.ok(html.includes('content="noindex"'))
}
const sitemap = await fetch(base + '/sitemap.xml')
assert.equal(sitemap.status, 200)
const xml = await sitemap.text()
assert.equal((xml.match(/<loc>/g) || []).length, routes.length)
for (const route of routes) assert.ok(xml.includes(`<loc>${origin + route}</loc>`))
const robots = await fetch(base + '/robots.txt')
assert.equal(robots.status, 200)
assert.equal(await robots.text(), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`)
const image = await fetch(base + '/clients/gemsbyw/homepage-desktop.png')
assert.equal(image.status, 200)
assert.match(image.headers.get('content-type'), /image\/png/)
console.log(
  `Verified ${routes.length} routes, canonical/social metadata, sitemap, robots, client screenshot and real custom 404 responses against ${base}.`,
)
