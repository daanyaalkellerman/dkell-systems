<script setup lang="ts">
defineProps<{ eyebrow: string; title: string; description: string }>()
</script>
<template>
  <header class="shell page-intro">
    <p class="eyebrow">{{ eyebrow }}</p>
    <h1>{{ title }}</h1>
    <p class="intro">{{ description }}</p>
  </header>
</template>
