import tailwindcss from '@tailwindcss/vite'
import source from './project-brief/business-content.json'
import { publicRoutes, siteOrigin } from './shared/site.mjs'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-16',
  devtools: { enabled: false },
  telemetry: false,
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  typescript: { strict: true },
  runtimeConfig: {
    public: {
      siteOrigin: siteOrigin(process.env.NUXT_PUBLIC_SITE_ORIGIN ?? source.businessSiteOrigin),
    },
  },
  nitro: {
    preset: 'static',
    output: { publicDir: '.output/public' },
    prerender: { routes: publicRoutes(source.services), crawlLinks: true, failOnError: true },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en-ZA' },
      meta: [{ name: 'theme-color', content: '#123C3A' }],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
})
