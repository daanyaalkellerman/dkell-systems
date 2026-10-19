<script setup lang="ts">
import { services } from '~/data/business'
usePageSeo(
  'Services',
  'Explore websites, online stores, admin platforms, automation, booking systems and business dashboards from D-Kell Systems.',
)
</script>
<template>
  <div>
    <PageIntro
      eyebrow="Services"
      title="Websites, stores & business systems."
      description="Choose a starting point below. Each project is scoped around your business, the people using it and what you need it to do."
    />
    <section class="shell section-bottom" aria-label="Available services">
      <div class="service-grid">
        <ServiceCard
          v-for="(service, index) in services"
          :key="service.slug"
          :service="service"
          :index="index"
        />
      </div>
      <div class="support-strip">
        <div>
          <h2>Maintenance &amp; support</h2>
          <p>
            Ongoing support is available by agreement. Discuss the level of care you need, the work
            involved and the cost before committing.
          </p>
        </div>
        <NuxtLink to="/contact?service=maintenance" class="text-link">Discuss support ↗</NuxtLink>
      </div>
    </section>
    <ContactCta />
  </div>
</template>
