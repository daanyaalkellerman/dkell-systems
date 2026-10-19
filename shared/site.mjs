/** Reject accidental portfolio, local, path-based or credential-bearing canonical URLs. */
export function siteOrigin(value = '') {
  if (!value.trim()) return ''
  const url = new URL(value)
  if (
    url.protocol !== 'https:' ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== '/' ||
    ['localhost', '127.0.0.1', 'daanyaalkellerman.co.za', 'www.daanyaalkellerman.co.za'].includes(
      url.hostname,
    )
  ) {
    throw new Error(
      'NUXT_PUBLIC_SITE_ORIGIN must be the confirmed business HTTPS origin, without a path, credentials or query.',
    )
  }
  return url.origin
}
export function publicRoutes(services) {
  return [
    '/',
    '/services',
    ...services.map((service) => '/services/' + service.slug),
    '/work',
    '/about',
    '/contact',
    '/privacy',
  ]
}
export function sitemapXml(origin, routes) {
  if (!origin) return ''
  const escape = (value) =>
    value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;')
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    routes.map((route) => '  <url><loc>' + escape(origin + route) + '</loc></url>').join('\n') +
    '\n</urlset>\n'
  )
}
