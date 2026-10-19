<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Client } from '~/data/business'
const props = defineProps<{ clients: Client[] }>()
const index = ref(0)
watch(
  () => props.clients.length,
  () => {
    index.value = 0
  },
)
const current = computed(() => props.clients[index.value])
function move(direction: number) {
  index.value = (index.value + direction + props.clients.length) % props.clients.length
}
</script>
<template>
  <section v-if="current" class="client-section" aria-label="Clients">
    <div class="shell client-layout">
      <div>
        <p class="eyebrow">Clients</p>
        <h2>Businesses we work with.</h2>
      </div>
      <div class="client-banner-display">
        <div aria-live="polite" aria-atomic="true">
          <div class="client-logo">
            <img
              v-if="current.logoPath"
              :src="current.logoPath"
              :alt="current.name"
              width="1280"
              height="1280"
              loading="lazy"
            /><span v-else>{{ current.name }}</span>
          </div>
          <p v-if="clients.length > 1" class="client-count">
            {{ current.name }} · {{ index + 1 }} of {{ clients.length }}
          </p>
        </div>
        <div v-if="clients.length > 1" class="carousel-controls">
          <button type="button" aria-label="Previous client" @click="move(-1)">←</button
          ><button type="button" aria-label="Next client" @click="move(1)">→</button>
        </div>
      </div>
    </div>
  </section>
</template>
