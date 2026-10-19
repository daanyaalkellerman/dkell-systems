import { test, expect } from '@playwright/test'
const slugs = [
  'websites',
  'online-stores',
  'admin-platforms',
  'automation',
  'booking-systems',
  'business-dashboards',
]
test('public pages and generated service routes have HTML, metadata and a real 404', async ({
  request,
}) => {
  const titles = new Set<string>()
  for (const path of [
    '/',
    '/services',
    '/work',
    '/about',
    '/contact',
    '/privacy',
    ...slugs.map((slug) => '/services/' + slug),
  ]) {
    const response = await request.get(path)
    expect(response.status(), path).toBe(200)
    const html = await response.text()
    expect(html).toMatch(/<h1[^>]*>.+?<\/h1>/s)
    expect(html).toContain('property="og:title"')
    const title = html.match(/<title>(.*?)<\/title>/)?.[1]
    expect(title).toBeTruthy()
    expect(titles.has(title!)).toBe(false)
    titles.add(title!)
  }
  const missing = await request.get('/this-page-does-not-exist')
  expect(missing.status()).toBe(404)
  expect(await missing.text()).toContain("We couldn't find that page.")
})
test('service journey, validation, encoded draft and confirmed contact details', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/services/online-stores')
  await page.getByRole('link', { name: 'Discuss online stores' }).click()
  await expect(page.getByLabel("I'm interested in")).toHaveValue('online-stores')
  await page.getByRole('button', { name: 'Review WhatsApp message' }).click()
  await expect(page.getByRole('alert')).toBeVisible()
  await expect(page.getByLabel('Your name (required)')).toBeFocused()
  await expect(page.getByRole('link', { name: 'Open WhatsApp to send' })).toHaveCount(0)
  await page.getByLabel('Your name (required)').fill('Zoë & Ali')
  await page.getByLabel('Business name (required)').fill('Gifts + Goods')
  await page
    .getByLabel('Project description (required)')
    .fill('A shop for handmade products & gifts.')
  await page.getByRole('button', { name: 'Review WhatsApp message' }).click()
  const href = await page.getByRole('link', { name: 'Open WhatsApp to send' }).getAttribute('href')
  const url = new URL(href!)
  expect(url.origin + url.pathname).toBe('https://wa.me/27680071963')
  expect(url.searchParams.get('text')).toContain('Zoë & Ali')
  expect(url.searchParams.get('text')).toContain('Service: Online stores')
  await expect(
    page.locator('main').getByRole('link', { name: 'dkellsystems@gmail.com' }),
  ).toHaveAttribute('href', 'mailto:dkellsystems@gmail.com')
  await page.getByLabel('Project description (required)').fill('An updated project description.')
  await expect(page.getByRole('link', { name: 'Open WhatsApp to send' })).toHaveCount(0)
  expect(await page.evaluate(() => localStorage.length)).toBe(0)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  expect(errors).toEqual([])
})
test('responsive navigation, client assets and keyboard access', async ({ page }, testInfo) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
  if (testInfo.project.name !== 'desktop') {
    await page.getByRole('button', { name: 'Menu' }).click()
    await page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'About', exact: true })
      .focus()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('button', { name: 'Menu' })).toBeFocused()
    await page.getByRole('button', { name: 'Menu' }).click()
  }
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Our Work' })
    .click()
  await expect(page).toHaveURL(/\/work$/)
  if (testInfo.project.name !== 'desktop')
    await expect(page.getByRole('button', { name: 'Menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  await expect(page.getByRole('img', { name: 'Gemsbyw' })).toHaveCount(1)
  await expect(page.getByRole('button', { name: 'Next client' })).toHaveCount(0)
  await page.goto('/')
  for (const img of await page.locator('img').all()) {
    await img.scrollIntoViewIfNeeded()
    await expect
      .poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0))
      .toBe(true)
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.evaluate(() => document.fonts.ready)
  expect(await page.evaluate(() => document.fonts.check('400 16px Manrope'))).toBe(true)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.screenshot({
    path: `test-results/${testInfo.project.name}-home.png`,
    fullPage: true,
    scale: 'css',
  })
  expect(errors).toEqual([])
})

test('without JavaScript, contact remains usable through direct links', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto('http://127.0.0.1:3100/contact')
  await expect(page.getByRole('button', { name: 'Review WhatsApp message' })).toBeDisabled()
  await expect(page.getByText('This message builder needs JavaScript.')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Chat directly on WhatsApp' })).toHaveAttribute(
    'href',
    'https://wa.me/27680071963',
  )
  await context.close()
})

test('shared layouts, reduced motion and observer fallback remain readable', async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.addInitScript(() => {
    Object.defineProperty(window, 'IntersectionObserver', { value: undefined, configurable: true })
  })
  for (const route of ['/', '/services', '/services/websites', '/about', '/work', '/contact']) {
    await page.goto(route)
    await page.evaluate(() => document.fonts.ready)
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      route,
    ).toBe(true)
    await expect(page.locator('main h1')).toBeVisible()
    expect(
      await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior),
    ).toBe('auto')
    for (const block of await page.locator('.reveal-block').all()) {
      expect(await block.evaluate((el) => getComputedStyle(el).opacity)).toBe('1')
      expect(await block.evaluate((el) => getComputedStyle(el).animationName)).toBe('none')
    }
    const header = page.locator('.site-header')
    const before = await header.boundingBox()
    await page.evaluate(() => window.scrollTo(0, 400))
    await expect(header).toHaveClass(/is-scrolled/)
    expect((await header.boundingBox())?.height).toBe(before?.height)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.screenshot({
      path: `test-results/${testInfo.project.name}-${route === '/' ? 'home' : route.slice(1).replaceAll('/', '-')}-redesign.png`,
      fullPage: true,
      scale: 'css',
    })
  }
  await page.goto('/')
  for (const slug of slugs)
    await expect(
      page
        .locator('.service-grid')
        .getByRole('link', { name: 'Explore ' + slug.replaceAll('-', ' '), exact: true }),
    ).toHaveAttribute('href', '/services/' + slug)
  await expect(
    page
      .getByRole('navigation', { name: 'Footer contact' })
      .getByRole('link', { name: 'WhatsApp', exact: false }),
  ).toHaveAttribute('href', 'https://wa.me/27680071963')
})
