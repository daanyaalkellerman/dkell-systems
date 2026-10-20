<script setup lang="ts">
const props = defineProps<{ name: string }>()
const icons: Record<string, string[]> = {
  'arrow-up-right': ['M7 17 17 7M7 7h10v10'],
  'arrow-right': ['M4 12h16m-6-6 6 6-6 6'],
  'arrow-left': ['M20 12H4m6-6-6 6 6 6'],
  'arrow-up': ['M12 20V4m-6 6 6-6 6 6'],
  websites: ['M3 5h18v14H3zM3 9h18M7 7h.01M10 7h.01', 'm9 12-2 2 2 2m6-4 2 2-2 2'],
  'online-stores': ['M5 7h14l2 14H3L5 7Z', 'M8 8V6a4 4 0 0 1 8 0v2'],
  'admin-platforms': ['M4 3h16v18H4zM4 9h16M9 9v12M12 13h5M12 17h5'],
  automation: ['M4 8h15l-4-4m4 4-4 4M20 16H5l4 4m-4-4 4-4'],
  'booking-systems': ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z', 'M12 7v5l3 2'],
  'business-dashboards': ['M4 3v18h17M8 16v-5m5 5V7m5 9v-7'],
  check: ['m5 12 4 4L19 6'],
  menu: ['M4 7h16M4 12h16M4 17h16'],
  close: ['m6 6 12 12M6 18 18 6'],
  dots: ['M4 12h.01M12 12h.01M20 12h.01'],
}
const paths = computed(() => icons[props.name] ?? icons['arrow-right'])
</script>

<template>
  <svg
    class="site-icon"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="name === 'dots' ? 4 : 1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path v-for="path in paths" :key="path" :d="path" />
  </svg>
</template>

<style scoped>
.site-icon {
  display: inline-block;
  width: 1.25em;
  height: 1.25em;
  flex-shrink: 0;
  vertical-align: middle;
}
</style>
