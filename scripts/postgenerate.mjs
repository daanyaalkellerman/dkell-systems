import { readFile, writeFile, access } from 'node:fs/promises'
import { resolve } from 'node:path'
import { siteOrigin, publicRoutes, sitemapXml } from '../shared/site.mjs'

const business = JSON.parse(
  await readFile(new URL('../project-brief/business-content.json', import.meta.url), 'utf8'),
)
const output = resolve('.output/public')
const origin = siteOrigin(process.env.NUXT_PUBLIC_SITE_ORIGIN ?? business.businessSiteOrigin)
const routes = publicRoutes(business.services)
for (const route of routes) await access(resolve(output, '.' + route, 'index.html'))
await writeFile(
  resolve(output, 'robots.txt'),
  origin
    ? `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n',
)
// Empty origin deliberately produces no invented absolute URLs.
await writeFile(
  resolve(output, 'sitemap.xml'),
  sitemapXml(origin, routes) ||
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>\n',
)
// Firebase serves this document with a real 404 status; no SPA rewrite is needed.
await writeFile(
  resolve(output, '404.html'),
  `<!doctype html><html lang="en-ZA"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page not found | D-Kell Systems</title><link rel="icon" href="/favicon.svg"><style>@font-face{font-family:Manrope;src:url('/fonts/manrope-latin.woff2')}body{margin:0;background:#F5F1E8;color:#123C3A;font-family:Manrope,Arial,sans-serif}main{max-width:800px;margin:12vh auto;padding:32px}h1{font-size:clamp(40px,8vw,72px);letter-spacing:-2px;line-height:1.1}p{line-height:1.8;max-width:540px}a{color:inherit;display:inline-block;margin:12px 24px 12px 0;padding:12px 0}a:focus-visible{outline:3px solid #123C3A;outline-offset:5px}.button{background:#123C3A;color:#F5F1E8;padding:16px 24px;border-radius:4px}</style></head><body><main><a href="/">D-Kell Systems</a><p>404 / PAGE NOT FOUND</p><h1>We couldn't find that page.</h1><p>The address may be incorrect or the page may have moved. Explore our services or contact us for help.</p><nav aria-label="Helpful links"><a class="button" href="/">Back to home</a><a href="/services">Explore services</a><a href="/contact">Contact us</a></nav></main></body></html>`,
)
console.log(
  `Verified ${routes.length} generated routes. ${origin ? 'Canonical origin: ' + origin : 'Local-only SEO: indexing disabled; canonical URLs await a confirmed business origin.'}`,
)
