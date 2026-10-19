import { describe, expect, it } from 'vitest'
import { siteOrigin, sitemapXml } from '../../shared/site.mjs'
describe('site identity', () => {
  it('does not invent an origin and rejects the portfolio domain', () => {
    expect(siteOrigin()).toBe('')
    expect(() => siteOrigin('https://daanyaalkellerman.co.za')).toThrow()
    expect(() => siteOrigin('https://example.com/path')).toThrow()
    expect(() => siteOrigin('http://example.com')).toThrow()
    expect(siteOrigin('https://example.com/')).toBe('https://example.com')
  })
  it('generates absolute sitemap URLs only for a configured origin', () => {
    expect(sitemapXml('', ['/'])).toBe('')
    expect(sitemapXml('https://example.com', ['/', '/services'])).toContain(
      '<loc>https://example.com/services</loc>',
    )
  })
})
