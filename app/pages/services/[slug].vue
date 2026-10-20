<script setup lang="ts">
import { services, quoteLabel } from '~/data/business'
const route = useRoute()
const service = computed(() => services.find((item) => item.slug === route.params.slug))
if (!service.value) throw createError({ statusCode: 404, statusMessage: 'Service not found' })
usePageSeo(
  () => service.value?.name || 'Service',
  () => service.value?.description || '',
)
</script>
<template>
  <div v-if="service">
    <PageIntro eyebrow="Services" :title="service.name" :description="service.description" />
    <section class="shell service-detail section-bottom">
      <div>
        <NuxtLink to="/services" class="text-link"
          ><SiteIcon name="arrow-left" /> All services</NuxtLink
        >
        <h2>What we can help with</h2>
        <ul class="detail-list">
          <li v-for="(example, index) in service.examples" :key="example">
            <span>0{{ index + 1 }}</span>
            <h3>{{ example }}</h3>
          </li>
        </ul>
        <h2>Planning your project</h2>
        <p>{{ service.planning }}</p>
        <p>
          We will agree on what is included, what you need to supply and how you will review the
          work. Any integrations, third-party subscriptions or ongoing costs are discussed as part
          of the scope.
        </p>
      </div>
      <aside class="quote-panel">
        <p class="eyebrow">Project pricing</p>
        <h2>{{ quoteLabel(service) }}</h2>
        <p v-if="service.priceScope">{{ service.priceScope }}</p>
        <p>
          The final quote depends on your requirements. No fixed package or starting price is
          published until it is confirmed.
        </p>
        <NuxtLink :to="{ path: '/contact', query: { service: service.slug } }" class="button"
          >Discuss {{ service.name.toLowerCase() }}
          <span aria-hidden="true"><SiteIcon name="arrow-up-right" /></span
        ></NuxtLink>
        <p class="small-copy">Maintenance and support can be arranged separately.</p>
      </aside>
    </section>
    <ProjectProcess /><ContactCta :service="service.slug" />
  </div>
</template>
