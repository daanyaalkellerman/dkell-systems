<script setup lang="ts">
const element = useTemplateRef<HTMLElement>('element')
let observer: IntersectionObserver | undefined
onMounted(() => {
  // Content is visible by default. Observation only adds an entrance animation.
  if (
    !element.value ||
    !('IntersectionObserver' in window) ||
    matchMedia('(prefers-reduced-motion: reduce)').matches
  )
    return
  try {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-enter')
            observer?.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.08 },
    )
    observer.observe(element.value)
  } catch {
    observer?.disconnect()
  }
})
onBeforeUnmount(() => observer?.disconnect())
</script>
<template>
  <div ref="element" class="reveal-block"><slot /></div>
</template>
