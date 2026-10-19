import { toValue, type MaybeRefOrGetter } from 'vue'
import { business } from '~/data/business'

export function usePageSeo(title: MaybeRefOrGetter<string>, description: MaybeRefOrGetter<string>) {
  const route = useRoute()
  const config = useRuntimeConfig()
  const origin = config.public.siteOrigin
  const fullTitle = computed(() => `${toValue(title)} | D-Kell Systems`)
  const canonical = computed(() =>
    origin ? origin + route.path.replace(/\/$/, '') + (route.path === '/' ? '/' : '') : undefined,
  )
  useSeoMeta({
    title: fullTitle,
    description: () => toValue(description),
    ogTitle: fullTitle,
    ogDescription: () => toValue(description),
    ogType: 'website',
    ogSiteName: business.businessName,
    ogLocale: 'en_ZA',
    ogUrl: canonical,
    robots: origin ? 'index, follow' : 'noindex, nofollow',
    twitterCard: 'summary',
    twitterTitle: fullTitle,
    twitterDescription: () => toValue(description),
  })
  useHead(() => ({
    link: canonical.value ? [{ rel: 'canonical', href: canonical.value }] : [],
    script: [
      {
        key: 'organization',
        type: 'application/ld+json',
        textContent: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: business.businessName,
          ...(origin ? { url: origin } : {}),
          telephone: business.contact.whatsappDisplay,
          ...(business.contact.emailConfirmed ? { email: business.contact.emailSupplied } : {}),
          sameAs: [business.contact.instagram],
        }).replaceAll('<', '\\u003c'),
      },
    ],
  }))
}
