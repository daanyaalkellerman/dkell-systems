<script setup lang="ts">
import type { NuxtError } from '#app'
defineProps<{ error: NuxtError }>()
useHead({
  title: 'Page unavailable | D-Kell Systems',
  meta: [{ name: 'robots', content: 'noindex' }],
})
</script>
<template>
  <div>
    <SiteHeader />
    <main id="main" class="shell section-space error-page">
      <p class="eyebrow">{{ error.statusCode }}</p>
      <h1>{{ error.statusCode === 404 ? 'Page not found.' : 'Something went wrong.' }}</h1>
      <p>
        The page may have moved, or the address may be incorrect. Explore our services or get in
        touch for help.
      </p>
      <div class="flex flex-wrap gap-5">
        <a href="/" class="button">Back to home ↗</a
        ><a href="/services" class="text-link">Explore services →</a
        ><a href="/contact" class="text-link">Contact us →</a>
      </div>
    </main>
    <SiteFooter />
  </div>
</template>
