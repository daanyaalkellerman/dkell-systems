<script setup lang="ts">
import { quoteLabel, type Service } from '~/data/business'
defineProps<{ service: Service; index: number }>()
</script>
<template>
  <article class="service-card">
    <div class="service-top">
      <span class="service-number">0{{ index + 1 }}</span
      ><span class="service-symbol" aria-hidden="true">{{
        ['↗', '▧', '▦', '⇄', '◷', '▥'][index]
      }}</span>
    </div>
    <h3>
      <NuxtLink :to="'/services/' + service.slug">{{ service.name }}</NuxtLink>
    </h3>
    <p>{{ service.description }}</p>
    <ul>
      <li v-for="example in service.examples" :key="example">{{ example }}</li>
    </ul>
    <p class="price-note">{{ quoteLabel(service) }}</p>
    <NuxtLink
      :to="'/services/' + service.slug"
      class="service-link"
      :aria-label="'Explore ' + service.name.toLowerCase()"
      >Explore service <span aria-hidden="true">↗</span></NuxtLink
    >
  </article>
</template>
