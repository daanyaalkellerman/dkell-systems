<script setup lang="ts">
import { services, clients } from '~/data/business'
usePageSeo(
  'Websites & business technology',
  'Websites, online stores and business systems for small businesses in South Africa and internationally.',
)
</script>
<template>
  <div>
    <HomeHero /><ClientBanner :clients="clients" />
    <section id="services" class="services-section section-space">
      <div class="shell">
        <RevealBlock class="section-heading"
          ><div>
            <p class="eyebrow">What we build</p>
            <h2>Start with what<br />your business needs.</h2>
          </div>
          <p>
            A website, an online store or a better way to manage your work. Explore the services and
            find your starting point.
          </p></RevealBlock
        >
        <div class="service-grid">
          <ServiceCard
            v-for="(service, index) in services"
            :key="service.slug"
            :service="service"
            :index="index"
          />
        </div>
      </div>
    </section>
    <HomeSystemsFeature /><HomeStoreFeature /><ProjectProcess /><MaintenanceSection /><ContactCta />
  </div>
</template>
