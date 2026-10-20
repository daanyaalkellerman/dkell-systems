<script setup lang="ts">
import { business } from '~/data/business'
const menuOpen = ref(false)
const hydrated = ref(false)
const scrolled = ref(false)
const menuButton = useTemplateRef<HTMLButtonElement>('menuButton')
const header = useTemplateRef<HTMLElement>('header')
const route = useRoute()
watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  },
)
function closeMenu() {
  menuOpen.value = false
  menuButton.value?.focus()
}
function onScroll() {
  scrolled.value = window.scrollY > 12
}
function onOutside(event: PointerEvent) {
  if (menuOpen.value && !header.value?.contains(event.target as Node)) menuOpen.value = false
}
function onFocusOut(event: FocusEvent) {
  if (event.relatedTarget && !header.value?.contains(event.relatedTarget as Node))
    menuOpen.value = false
}
onMounted(() => {
  hydrated.value = true
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('pointerdown', onOutside)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('pointerdown', onOutside)
})
const links = [
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Our Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]
</script>
<template>
  <header
    ref="header"
    class="site-header"
    :class="{ 'is-scrolled': scrolled, 'menu-ready': hydrated }"
    @keydown.esc="closeMenu"
    @focusout="onFocusOut"
  >
    <div class="shell header-inner">
      <NuxtLink to="/" class="brand" aria-label="D-Kell Systems home"
        ><img
          src="/brand/dkell-logo-horizontal-transparent-generated.png"
          alt="D-Kell Systems"
          width="2172"
          height="724" /></NuxtLink
      ><button
        ref="menuButton"
        class="menu-toggle"
        :aria-expanded="menuOpen"
        aria-controls="navigation"
        @click="menuOpen = !menuOpen"
      >
        {{ menuOpen ? 'Close' : 'Menu' }} <SiteIcon :name="menuOpen ? 'close' : 'menu'" />
      </button>
      <nav id="navigation" aria-label="Main navigation" :class="{ open: menuOpen }">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to">{{ link.label }}</NuxtLink
        ><a :href="business.contact.whatsappUrl" class="button button-small"
          >WhatsApp enquiry <span aria-hidden="true"><SiteIcon name="arrow-up-right" /></span
        ></a>
      </nav>
    </div>
  </header>
</template>
